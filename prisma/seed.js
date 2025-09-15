import { PrismaClient } from '@prisma/client';
import { slugify } from '../src/utilities/slugify.js';

const prisma = new PrismaClient();

async function main() {
}

await prisma.safetyEquipment.createMany({
	data: [
		// APD
		{ name: 'Helm', category: 'APD' },
		{ name: 'Masker kain', category: 'APD' },
		{ name: 'Masker kimia', category: 'APD' },
		{ name: 'Sarung tangan katun', category: 'APD' },
		{ name: 'Sarung tangan kulit', category: 'APD' },
		{ name: 'Sarung tangan karet', category: 'APD' },
		{ name: 'Sarung tangan las', category: 'APD' },
		{ name: 'Sepatu', category: 'APD' },
		{ name: 'Safety Boots', category: 'APD' },
		{ name: 'Kacamata', category: 'APD' },
		{ name: 'Goggles', category: 'APD' },
		{ name: 'Tameng muka', category: 'APD' },
		{ name: 'Kap Las', category: 'APD' },
		{ name: 'Apron', category: 'APD' },
		{ name: 'Ear Plug / Ear Muff', category: 'APD' },
		{ name: 'Rompi', category: 'APD' },
		{ name: 'Pelampung', category: 'APD' },
		{ name: 'Full Body Harness', category: 'APD' },
		{ name: 'Lainnya', category: 'APD' },

		// Emergency
		{ name: 'Pemadam Api', category: 'EMERGENCY' },
		{ name: 'Barikade', category: 'EMERGENCY' },
		{ name: 'Rambu K3L', category: 'EMERGENCY' },
		{ name: 'LOTO', category: 'EMERGENCY' },
		{ name: 'Radio Komunikasi', category: 'EMERGENCY' },
		{ name: 'Lainnya', category: 'EMERGENCY' },
	],
	skipDuplicates: true,
});

await prisma.role.createMany({
	data: [
		{ name: 'User' },
		{ name: 'Admin' },
		{ name: 'SHE' },
		{ name: 'JRP' }
	],
	skipDuplicates: true,
});

await prisma.workPermit.create({
  data: {
    company: "PT Maju Jaya",
    branch: "Jakarta Selatan",
    pic: "Budi Santoso",
    location: "Workshop Area 2",
    department: "Maintenance",
    owner: "PT Outsource Indo",
    startDate: new Date("2025-09-15T08:00:00.000Z"),
    endDate: new Date("2025-09-17T17:00:00.000Z"),
    createdById: 2,

    equipments: {
      create: [
        { name: "Tangga", qty: 2 },
        { name: "Bor Listrik", qty: 1 }
      ]
    },

    machines: {
      create: [
        { name: "Mesin Las", qty: 1 }
      ]
    },

    materials: {
      create: [
        { name: "Pipa PVC", qty: 5 },
        { name: "Baut & Mur", qty: 20 }
      ]
    },

    ppes: {
      create: [
        { name: "Helm", selected: true },
        { name: "Sepatu / Safety Shoes", selected: true },
        { name: "Sarung tangan katun / Cotton Gloves", selected: false }
      ]
    },

    emergencies: {
      create: [
        { name: "Pemadam Api / Fire Extinguisher", selected: true },
        { name: "Barikade / Barricades", selected: false }
      ]
    },

    checklists: {
      create: [
        {
          question: "Apakah pekerjaan ini memiliki Standar Operating Procedure (SOP) atau Instruksi Kerja ?",
          answer: "Ya"
        },
        {
          question: "Apakah Penilaian Resiko (JSA) telah dilakukan ?",
          answer: "Ya",
          additional: "uploads/jsa-dokumen.pdf"
        },
        {
          question: "Apakah pekerjaan yang dilakukan menghasilkan limbah baik domestik maupun limbah B3 ?",
          answer: "Ya",
          additional: "Limbah dikumpulkan dalam drum tertutup dan diserahkan ke petugas limbah B3"
        }
      ]
    }
  }
});


main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
