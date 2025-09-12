import prisma from "../configurations/database.js";

export const getFormBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const form = await prisma.form.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { index_number: 'asc' },
          include: {
            questions: {
              orderBy: { index_number: 'asc' },
              include: {
                options: true
              }
            }
          }
        }
      }
    });

    if (!form) return res.status(404).json({ error: 'Form not found' });

    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
