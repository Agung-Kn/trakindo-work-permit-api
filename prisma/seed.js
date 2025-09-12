import { PrismaClient } from '@prisma/client';
import { slugify } from '../src/utilities/slugify.js';

const prisma = new PrismaClient();

async function main() {
	const formName = 'Work Permit A';
  const formSlug = slugify(formName, { lower: true, strict: true });

  const form = await prisma.form.upsert({
    where: { slug: formSlug },
    update: {},
    create: {
      name: formName,
      slug: formSlug,
      sections: {
        create: [
          {
            name: 'Informasi Umum',
            index_number: 1,
            questions: {
              create: [
                { index_number: 1, value: 'Nomor Izin Bekerja', type: 'PARAGRAPH' },
                { index_number: 2, value: 'Nama Perusahaan', type: 'PARAGRAPH' },
                { index_number: 3, value: 'Cabang Lokasi Pekerjaan', type: 'PARAGRAPH' },
                { index_number: 4, value: 'Penanggung Jawab Pekerjaan', type: 'PARAGRAPH' },
                { index_number: 5, value: 'Lokasi Pekerjaan', type: 'PARAGRAPH' },
                { index_number: 6, value: 'Seksi / Departemen / Sub-Kontraktor', type: 'PARAGRAPH' },
                { index_number: 7, value: 'Pemilik Pekerjaan', type: 'PARAGRAPH' },
                { index_number: 8, value: 'Tanggal Penerbitan Izin Bekerja', type: 'PARAGRAPH' },
                { index_number: 9, value: 'Jam Penerbitan', type: 'PARAGRAPH' },
                { index_number: 10, value: 'Lamanya', type: 'PARAGRAPH' },
                { index_number: 11, value: 'Mulai', type: 'PARAGRAPH' },
                { index_number: 12, value: 'Sampai', type: 'PARAGRAPH' },
                { index_number: 13, value: 'Deskripsi tugas yang harus dikerjakan', type: 'PARAGRAPH' },
                { index_number: 14, value: 'Nama Orang yang diberikan Izin ini', type: 'PARAGRAPH' },
                { index_number: 15, value: 'Seksi / Departemen / Sub-Kontraktor', type: 'PARAGRAPH' },
                { index_number: 16, value: 'Nama Supervisor', type: 'PARAGRAPH' },
                { index_number: 17, value: 'Jumlah Karyawan Sub-Kontraktor', type: 'PARAGRAPH' },
              ],
            },
          },
          {
            name: 'Daftar Periksa',
            index_number: 2,
            questions: {
              create: [
                {
                  index_number: 1,
                  value: 'Apakah pekerjaan ini memiliki Standar Operating Procedure (SOP) atau Instruksi Kerja ?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 2,
                  value: 'Apakah Penilaian Resiko (JSA) telah dilakukan? (lampirkan)',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 3,
                  value: 'Apakah Peralatan Kerja dan Peralatan Keselamatan dalam kondisi layak dan aman untuk digunakan?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 4,
                  value: 'Apakah daerah telah diperiksa & diamankan?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 5,
                  value: 'Apakah benda / mesin telah di lock-out?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 6,
                  value: 'Apakah daerah/benda telah dibersihkan/diventilasi?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 7,
                  value: 'Apakah telah diuji untuk memastikan tegangan nol?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 8,
                  value: 'Apakah uji gas diperlukan pada saat bekerja?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 9,
                  value: 'Apakah pekerjaan ini telah dikomunikasikan dengan pengawas dan karyawan ?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                {
                  index_number: 10,
                  value: 'Apakah pekerjaan yang dilakukan menghasilkan limbah baik domestik maupun limbah B3?',
                  type: 'OPTION',
                  options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] },
                },
                { index_number: 11, value: 'Jika YA, bagaimana cara penanganannya?', type: 'PARAGRAPH' },
              ],
            },
          },
          {
            name: 'Klasifikasi Pekerjaan',
            index_number: 3,
            questions: {
              create: [
                { index_number: 1, value: 'Pekerjaan Panas', type: 'OPTION', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
                { index_number: 2, value: 'Pekerjaan Ruang Terbatas', type: 'OPTION', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
                { index_number: 3, value: 'Pekerjaan di Ketinggian', type: 'OPTION', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
                { index_number: 4, value: 'Pekerjaan di atas atau dekat air', type: 'OPTION', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
              ],
            },
          },
          {
            name: 'Perlengkapan Kerja',
            index_number: 4,
            questions: {
              create: [
                { index_number: 1, value: 'Alat', type: 'PARAGRAPH' },
                { index_number: 2, value: 'Jumlah Alat', type: 'PARAGRAPH' },
                { index_number: 3, value: 'Mesin', type: 'PARAGRAPH' },
                { index_number: 4, value: 'Jumlah Mesin', type: 'PARAGRAPH' },
                { index_number: 5, value: 'Material', type: 'PARAGRAPH' },
                { index_number: 6, value: 'Jumlah Material', type: 'PARAGRAPH' },
              ],
            },
          },
          {
            name: 'Peralatan Keselamatan',
            index_number: 5,
            questions: {
              create: [
                { index_number: 1, value: 'Alat Pelindung Diri (APD)', type: 'CHECKBOXFROMMASTER' },
                { index_number: 2, value: 'Perlengkapan Keselamatan & Darurat', type: 'CHECKBOXFROMMASTER' },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Seed data (Work Permit A) inserted:', form.name);
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

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
