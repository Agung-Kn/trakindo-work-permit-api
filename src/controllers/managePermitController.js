import prisma from '../configurations/database.js'
import serializeBigInt from "../helpers/serializeBigInt.js"
import response from '../response.js';

export const getPermits = async (req, res) => {
  try {
    const permits = await prisma.permit.findMany();

    return res.json(response(res, 200, serializeBigInt(permits), "Permits retrieved successfully"));
  } catch (error) {
    console.error(error);
    return res.json(response(res, 500, null, "An error occurred while retrieving Permits"));
  }
};

export const getPermitById = async (req, res) => {
	try {
		const { id } = req.params;
		const permit = await prisma.permit.findUnique({
			where: {
				id: parseInt(id)
			}
		});
		if (!permit) {
			return res.json(response(res, 404, null, "Permit not found"));
		}
		return res.json(response(res, 200, serializeBigInt(permit), "Permit retrieved successfully"));
	} catch (error) {
		console.error(error);
		return res.json(response(res, 500, null, "An error occurred while retrieving the Permit"));
	}
};

export const approvePermit = async (req, res) => {
  try {
    const workPermitId = parseInt(req.params.id, 10);
    const { status, reason } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json(response(res, 400, null, "Status harus APPROVED atau REJECTED"));
    }

    const userRoles = req.user.roles || [];
    const approverRole = userRoles.find((r) => ["SHE", "JRP"].includes(r));
    if (!approverRole) {
      return res.status(403).json(response(res, 403, null, "Anda tidak memiliki hak approval SHE/JRP"));
    }

    if (status === "REJECTED" && !reason) {
      return res.status(400).json(response(res, 400, null, "Alasan harus diisi jika menolak (REJECTED)"));
    }

    const updated = await prisma.workPermitApproval.updateMany({
      where: {
        workPermitId,
        role: approverRole,
      },
      data: {
        status,
        reason: status === "REJECTED" ? reason : null,
        approverId: BigInt(req.user.id),
        updatedAt: new Date()
      }
    });

    if (updated.count === 0) {
      return res.status(404).json(response(res, 404, null, "Approval tidak ditemukan atau sudah diproses"));
    }

    const workPermit = await prisma.workPermit.findUnique({
      where: { id: workPermitId },
      include: { approvals: true }
    });

    return res.json(
      response(res, 200, serializeBigInt(workPermit), `Work Permit ${status} oleh ${approverRole}`)
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(response(res, 500, null, "Terjadi kesalahan saat memproses approval"));
  }
};