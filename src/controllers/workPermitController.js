import prisma from '../configurations/database.js'
import serializeBigInt from "../helpers/serializeBigInt.js"
import response from '../response.js';

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
        createdById: req.user.id,

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

    return res.json(response(res, 200, serializeBigInt(workPermit), "Work Permit berhasil dibuat"));
  } catch (error) {
    console.error(error);
    return res.json(response(res, 500, null, "Terjadi kesalahan saat membuat Work Permit"));
  }
};
