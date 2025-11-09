
const examples = [
    {
        role: "assistant",
        content: `**Latar Belakang**\n
- Diterbitkan berdasar PP No. 58 Tahun 2023 dan PMK No. 168 Tahun 2023.\n
- Tujuannya: menyederhanakan skema pemotongan PPh 21, mengganti sistem lama yang kompleks.\n
- Berlaku mulai 1 Januari 2024.\n
- Dikenalkan Tarif Efektif Rata-rata (TER) untuk kemudahan penghitungan bulanan dan harian.\n\n
**Pemotong PPh Pasal 21/26**\n
*Pihak wajib memotong:*\n
- Pemberi kerja (perorangan atau badan).\n
- Instansi pemerintah.\n
- Dana pensiun, BPJSTK, TASPEN, ASABRI.\n
- Orang pribadi/badan yang membayar jasa.\n
- Penyelenggara kegiatan (event, lomba, seminar, dll).\n\n
*Yang tidak wajib memotong:*\n
- Kantor perwakilan negara asing.\n
- Organisasi internasional tertentu.\n
- Orang pribadi yang tidak memiliki usaha atau pekerja bebas.\n
*Kewajiban pemotong:*\n
1. Mendaftar di KPP.\n
2. Menghitung dan memotong pajak setiap bulan.
3. Membuat dan menyimpan bukti potong (termasuk tarif 0%).
4. Menyetor ke kas negara.
5. Melapor meski nihil.
6. Mengembalikan kelebihan potongan (jika ada).\n\n
**Pihak yang Dipotong**
- Pegawai tetap & tidak tetap.
- Pensiunan.
- Anggota dewan komisaris/pengawas.
- Bukan pegawai: pengacara, dokter, influencer, pelatih, seniman, dll.
- Peserta kegiatan: lomba, seminar, magang, dll.
- Peserta program pensiun.
- Mantan pegawai.\n
Tidak dipotong: pejabat diplomatik & organisasi internasional yang memenuhi syarat.`,
    },
    {
        role: "assistant",
        content: `**Objek Pemotongan (Penghasilan Kena PPh 21/26)**
- Gaji, upah, tunjangan, bonus, THR, lembur, tantiem, gratifikasi, premi, dll.
- Iuran jaminan sosial yang dibayar pemberi kerja.
- Natura dan kenikmatan (misal fasilitas mobil, rumah dinas).\n
**Tidak termasuk objek PPh 21:**
- Asuransi kesehatan/jiwa.
- Natura tertentu (makanan, fasilitas kerja, fasilitas APBN/APBD).
- Zakat/sumbangan wajib keagamaan.
- Hibah keluarga sedarah.
- Beasiswa memenuhi syarat.
- Bagian laba firma/CV.
- PPh yang ditanggung pemerintah.\n
**Dasar Pengenaan Pajak (DPP)**
Kategori
Dasar Pengenaan
Pegawai tetap/pensiunan
PKP (masa terakhir), bruto (selain masa terakhir)
Dewan komisaris/pengawas
Bruto
Pegawai tidak tetap
Bruto ≤2,5 jt → penghasilan sehari; >2,5 jt → 50% bruto
Bukan pegawai
50% bruto
Peserta kegiatan
Bruto
Peserta program pensiun
Bruto
Mantan pegawai
Bruto
WNA (Pasal 26)
Bruto (tarif 20% final, kecuali P3B)\n
**Tarif Pemotongan**\n
a. Tarif Umum (Pasal 17 UU PPh):
- 0–60 jt: 5%
- 60–250 jt: 15%
- 250–500 jt: 25%
- 500 jt–5 M: 30%
- 5 M: 35%
b. Tarif Efektif Rata-rata (TER):
Digunakan untuk pegawai tetap & tidak tetap:
- TER Bulanan Kategori A: TK/0–K/0
- TER Bulanan Kategori B: TK/2–K/2
- TER Bulanan Kategori C: K/3
- TER Harian: ≤450 rb (0%), 450 rb–2,5 jt (0,5%)
c. Tarif Pasal 26:
20% final, dengan pengecualian berdasarkan P3B jika ada SKD WPLN.\n
**Penghasilan Tidak Kena Pajak (PTKP)**
Berdasarkan PMK No. 101/PMK.010/2016:
Keterangan
PTKP (Rp)
TK/0
Tidak kawin, 0 tanggungan
54.000.000
TK/1–3
Tidak kawin, 1–3 tanggungan
+4.500.000/tanggungan
K/0–3
Kawin, 0–3 tanggungan
58.500.000 – 72.000.000
K/I/0–3
Penghasilan suami-istri digabung
112.500.000 – 126.000.000
Tanggungan yang diakui: keluarga sedarah/semenenda garis lurus dan anak angkat (maks. 3 orang).\n
**Ketentuan Khusus PTKP Wanita*
Wanita lajang: sama seperti pria (TK/0–3).
Wanita kawin:
Jika suami berpenghasilan → PTKP = TK/0.
Jika suami tidak berpenghasilan (dibuktikan surat lurah) → bisa tambah PTKP kawin/tanggungan.
Jika bekerja di 1 pemberi kerja dan dipotong PPh 21 → pajaknya bersifat final.
Jika bekerja di >1 tempat → tidak final, digabung di SPT suami.
Jika pisah harta atau memilih terpisah (PH/MT) → punya NPWP sendiri, PTKP = TK/0.
**PPh 21 Ditanggung Pemerintah**\n
Dalam kondisi tertentu (misal pandemi, insentif khusus), PPh 21 dapat ditanggung pemerintah dan tidak dipotong dari karyawan.
**Pemotongan Lain**
- Peserta kegiatan: hadiah, uang saku, uang rapat → PPh 21 final sesuai DPP.
- Pensiunan: uang pensiun dan penghasilan sejenis → pakai skema TER.
- Bukan pegawai: penghitungan 50% bruto, tanpa akumulasi bulan sebelumnya.
**FAQ dan Implementasi**\n
- DJP menyediakan kalkulator PPh 21 online di pajak.go.id .
- Setiap bukti potong wajib dibuat meski tarifnya 0%.
- SPT Masa wajib dilaporkan walau nihil.
- Kelebihan potong dikembalikan paling lambat akhir bulan berikutnya.
**Kesimpulan Utama**
Tujuan utama regulasi baru (PP 58/2023 & PMK 168/2023):
Simplifikasi perhitungan.
Kepastian hukum bagi pemotong dan penerima.
Penggunaan Tarif Efektif Rata-rata (TER) untuk semua jenis pegawai.
Administrasi lebih efisien dan mudah diotomasi.`,
    },
];

module.exports = examples;
