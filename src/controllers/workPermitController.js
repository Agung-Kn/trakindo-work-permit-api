// controllers/workPermitController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create new Work Permit
export const createWorkPermit = async (req, res, next) => {
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
      equipments,
      machines,
      materials,
      ppes,
      safetyEquipments,
    } = req.body;

    const workPermit = await prisma.workPermit.create({
      data: {
        company,
        branch,
        pic,
        location,
        department,
        owner,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        equipments: {
          create: equipments || [],
        },
        machines: {
          create: machines || [],
        },
        materials: {
          create: materials || [],
        },
        ppes: {
          create: (ppes || []).map((item) => ({ name: item })),
        },
        safetyEquipments: {
          create: (safetyEquipments || []).map((item) => ({ name: item })),
        },
      },
      include: {
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        safetyEquipments: true,
      },
    });

    res.status(201).json(workPermit);
  } catch (err) {
    next(err);
  }
};

// Get all Work Permits
export const getWorkPermits = async (req, res, next) => {
  try {
    const permits = await prisma.workPermit.findMany({
      include: {
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        safetyEquipments: true,
      },
    });
    res.json(permits);
  } catch (err) {
    next(err);
  }
};

// Get Work Permit by ID
export const getWorkPermitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permit = await prisma.workPermit.findUnique({
      where: { id: Number(id) },
      include: {
        equipments: true,
        machines: true,
        materials: true,
        ppes: true,
        safetyEquipments: true,
      },
    });

    if (!permit) return res.status(404).json({ message: 'Permit not found' });
    res.json(permit);
  } catch (err) {
    next(err);
  }
};

// Delete Work Permit
export const deleteWorkPermit = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.workPermit.delete({ where: { id: Number(id) } });
    res.json({ message: 'Permit deleted successfully' });
  } catch (err) {
    next(err);
  }
};
