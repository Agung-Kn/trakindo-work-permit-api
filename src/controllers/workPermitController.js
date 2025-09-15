import prisma from '../configurations/database.js'
import serializeBigInt from "../helpers/serializeBigInt.js"
import response from '../response.js';
import { paginate } from '../utilities/paginate.js';

export const getWorkPermits = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await paginate(prisma.workPermit, {
        page,
        limit,
        where: {
          createdById: req.user.id
        },
        include: {
          approvals: { select: { role: true, status: true } }
        },
        orderBy: { createdAt: "desc" },
    });

    const formattedData = result.data.map((item) => {
      let status = "PENDING";
      if (item.approvals.some((a) => a.status === "REJECTED")) {
        status = "REJECTED";
      } else if (item.approvals.every((a) => a.status === "APPROVED")) {
        status = "APPROVED";
      }

      return {
        id: item.id,
        no: item.no,
        company: item.company,
        branch: item.branch,
        startDate: item.startDate,
        endDate: item.endDate,
        createdAt: item.createdAt,
        status,
      };
    });

    res.json({
        data: formattedData,
        pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);
    return res.json(response(res, 500, null, "An error occurred while retrieving Work Permits"));
  }
};

export const getWorkPermitById = async (req, res) => {
  try {
    const { id } = req.params;
    const workPermit = await prisma.workPermit.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        emergencies: true,
        checklists: true
      }
    });
    if (!workPermit) {
      return res.json(response(res, 404, null, "Work Permit not found"));
    }
    if (workPermit.createdById !== req.user.id) {
      return res.json(response(res, 403, null, "You do not have permission to view this Work Permit"));
    }
    return res.json(response(res, 200, serializeBigInt(workPermit), "Work Permit retrieved successfully"));
  } catch (error) {
    console.error(error);
    return res.json(response(res, 500, null, "An error occurred while retrieving the Work Permit"));
  }
};

export const createWorkPermit = async (req, res) => {
  try {
    const {
      company,
      branch,
      pic,
      location,
      department,
      owner,
      startDate,
      endDate,
      equipments = [],
      machines = [],
      materials = [],
      ppes = [],
      emergencies = [],
      checklists = []
    } = req.body;

    const createdById = BigInt(req.user.id);

    const workPermit = await prisma.workPermit.create({
      data: {
        no: `WP-${Date.now()}`,
        company,
        branch,
        pic,
        location,
        department,
        owner,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdById,

        equipments: {
          create: equipments.map((item) => ({
            name: item.name,
            qty: parseInt(item.qty)
          }))
        },
        machines: {
          create: machines.map((item) => ({
            name: item.name,
            qty: parseInt(item.qty)
          }))
        },
        materials: {
          create: materials.map((item) => ({
            name: item.name,
            qty: parseInt(item.qty)
          }))
        },
        ppes: {
          create: ppes.map((item) => ({
            name: item.name,
            selected: item.selected
          }))
        },
        emergencies: {
          create: emergencies.map((item) => ({
            name: item.name,
            selected: item.selected
          }))
        },
        checklists: {
          create: checklists.map((item) => ({
            question: item.question,
            answer: item.answer,
            additional: item.additional || null
          }))
        }
      },
      include: {
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        emergencies: true,
        checklists: true
      }
    });

    await prisma.workPermitApproval.createMany({
      data: [
        {
          workPermitId: workPermit.id,
          approverId: createdById,
          role: "SHE",
          status: "PENDING"
        },
        {
          workPermitId: workPermit.id,
          approverId: createdById,
          role: "JRP",
          status: "PENDING"
        }
      ]
    });

    return res.json(
      response(res, 200, serializeBigInt(workPermit), "Work Permit berhasil dibuat dengan 2 approval awal (SHE & JRP)")
    );
  } catch (error) {
    console.error(error);
    return res.json(
      response(res, 500, null, "Terjadi kesalahan saat membuat Work Permit")
    );
  }
};

export const updateWorkPermit = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company,
      branch,
      pic,
      location,
      department,
      owner,
      startDate,
      endDate,
      equipments = [],
      machines = [],
      materials = [],
      ppes = [],
      emergencies = [],
      checklists = []
    } = req.body;

    const workPermitId = parseInt(id);

    const existingWorkPermit = await prisma.workPermit.findUnique({
      where: { id: workPermitId },
      include: {
        approvals: true,
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        emergencies: true,
        checklists: true
      }
    });

    if (!existingWorkPermit) {
      return res
        .status(404)
        .json(response(res, 404, null, "Work Permit not found"));
    }

    if (existingWorkPermit.createdById !== req.user.id) {
      return res
        .status(403)
        .json(response(res, 403, null, "You do not have permission to update this Work Permit"));
    }

    const approved = existingWorkPermit.approvals.some(
      (a) => a.status === "APPROVED"
    );
    if (approved) {
      return res
        .status(400)
        .json(
          response(
            res,
            400,
            null,
            "Work Permit cannot be updated because one of the approvers has already approved it"
          )
        );
    }

    const updated = await prisma.workPermit.update({
      where: { id: workPermitId },
      data: {
        company,
        branch,
        pic,
        location,
        department,
        owner,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        updatedById: req.user.id,

        equipments: {
          deleteMany: { workPermitId },
          create: equipments.map((item) => ({
            name: item.name,
            qty: parseInt(item.qty)
          }))
        },
        machines: {
          deleteMany: { workPermitId },
          create: machines.map((item) => ({
            name: item.name,
            qty: parseInt(item.qty)
          }))
        },
        materials: {
          deleteMany: { workPermitId },
          create: materials.map((item) => ({
            name: item.name,
            qty: parseInt(item.qty)
          }))
        },
        ppes: {
          deleteMany: { workPermitId },
          create: ppes.map((item) => ({
            name: item.name,
            selected: item.selected
          }))
        },
        emergencies: {
          deleteMany: { workPermitId },
          create: emergencies.map((item) => ({
            name: item.name,
            selected: item.selected
          }))
        },
        checklists: {
          deleteMany: { workPermitId },
          create: checklists.map((item) => ({
            question: item.question,
            answer: item.answer,
            additional: item.additional || null
          }))
        }
      },
      include: {
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        emergencies: true,
        checklists: true,
        approvals: true
      }
    });

    return res.json(
      response(res, 200, serializeBigInt(updated), "Work Permit updated successfully")
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(response(res, 500, null, "An error occurred while updating the Work Permit"));
  }
};


export const deleteWorkPermit = async (req, res) => {
  try {
    const { id } = req.params;
    const existingWorkPermit = await prisma.workPermit.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingWorkPermit) {
      return res.json(response(res, 404, null, "Work Permit not found"));
    }

    if (Number(existingWorkPermit.createdById) !== Number(req.user.id)) {
      return res.json(response(res, 403, null, "You do not have permission to delete this Work Permit"));
    }
    
    await prisma.workPermit.delete({
      where: { id: parseInt(id) }
    });
    return res.json(response(res, 200, null, "Work Permit deleted successfully"));
  } catch (error) {
    console.error(error);
    return res.json(response(res, 500, null, "An error occurred while deleting the Work Permit"));
  }
};