const openai = require("../config/openai");
const systemPrompt = require("../prompts/systemPrompt");
const examples = require("../prompts/examples");

const pphChatController = async (req, res) => {
    const {
        name,
        npwp,
        numberOfDependents,
        maritalStatus,
        jobs,
        salaryPerMonthOrDay,
        allowances,
        runBusiness,
        professionalIncome,
        rentalIncome,
        dividend,
        foreignIncome,
        assetSold,
        prize,
        donation,
        pensionContribution,
        jobExpenses,
        officialContribution,
        withheldTax,
        installmentPayments,
        royalties,
        additionalNotes
    } = req.body;

    console.log("================== START PPH CHAT ==================");

    const messageContent = `
        Kamu adalah konsultan pajak profesional di Indonesia. Berdasarkan data berikut, lakukan analisis dan perhitungan Pajak Penghasilan (PPh) orang pribadi sesuai ketentuan pajak Indonesia yang berlaku.

        Data Wajib Pajak:
        - Nama: ${name}
        - NPWP: ${npwp}
        - Jumlah tanggungan: ${numberOfDependents}
        - Status pernikahan: ${maritalStatus}
        - Pekerjaan: ${jobs}
        - Gaji atau upah per bulan/hari: ${salaryPerMonthOrDay}
        - Tunjangan yang diterima: ${allowances}
        - Apakah menjalankan usaha: ${runBusiness}
        - Apakah memiliki penghasilan profesional: ${professionalIncome}
        - Apakah memiliki penghasilan sewa: ${rentalIncome}
        - Apakah menerima dividen: ${dividend}
        - Apakah memiliki penghasilan dari luar negeri: ${foreignIncome}
        - Apakah menjual aset: ${assetSold}
        - Apakah menerima hadiah atau penghargaan: ${prize}
        - Apakah menerima donasi: ${donation}
        - Iuran pensiun atau BPJS Ketenagakerjaan: ${pensionContribution}
        - Biaya jabatan (untuk pegawai): ${jobExpenses}
        - Iuran wajib ke organisasi resmi: ${officialContribution}
        - Apakah sudah ada pajak yang dipotong pihak lain: ${withheldTax}
        - Pembayaran angsuran pajak: ${installmentPayments}
        - Penerimaan royalti: ${royalties}
        - Catatan tambahan: ${additionalNotes}

        Berikan hasil perhitungan dan penjelasan secara sistematis dengan format sebagai berikut:
        1. **Identifikasi Jenis Pajak** — Tentukan jenis PPh yang relevan (misalnya PPh 21, PPh 23, atau PPh 25) sesuai data wajib pajak.
        2. **Analisis Status Pajak** — Apakah wajib pajak terkena PPh? Jelaskan dasar penilaiannya (kena pajak / tidak kena pajak).
        3. **Perhitungan Detail PPh:**
        - Hitung total penghasilan bruto per tahun.
        - Kurangi dengan pengurang yang sesuai (biaya jabatan, iuran pensiun, dsb).
        - Tentukan Penghasilan Kena Pajak (PKP) berdasarkan status PTKP (TK/0, K/1, dst).
        - Terapkan tarif progresif PPh (5%, 15%, 25%, 30%, dan 35%).
        - Tampilkan langkah per langkah perhitungan.
        4. **Pajak Terutang dan Potongan:** Hitung total PPh terutang dikurangi pajak yang sudah dipotong oleh pihak lain (jika ada).
        5. **Dasar Hukum dan Referensi:** Sebutkan pasal dan UU yang menjadi dasar perhitungan (misalnya UU No. 36 Tahun 2008 tentang Pajak Penghasilan, dan peraturan turunannya).
        6. **Kesimpulan Akhir:** Jumlah pajak yang masih harus dibayar atau lebih bayar, disertai penjelasan singkat dan saran profesional.

        Pastikan hasil disajikan dalam format yang rapi, logis, dan mudah dipahami oleh wajib pajak awam.
        Jika memungkinkan, tampilkan hasil perhitungan PPh dengan angka (bukan hanya penjelasan), disertai rumus dan komponen perhitungan yang digunakan.
    `;

    try {
        console.time("OpenRouter Response Time");
        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                ...examples,
                { role: "user", content: messageContent },
            ],
            temperature: 0.7,
        });

        console.timeEnd("OpenRouter Response Time");
        console.log("================== SUCCESS PPH CHAT ==================\n");

        res.json({
            reply: response.choices[0].message.content,
            model: response.model,
            usage: response.usage,
        });
    } catch (error) {
        console.error("❌ Error di pphChatController:", error);
        res.status(error.status || 500).json({
            error: error.message,
            details: error.response?.data || null,
        });
    }
};

module.exports = pphChatController;
