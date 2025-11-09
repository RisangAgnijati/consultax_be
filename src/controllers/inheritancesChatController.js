const openai = require("../config/openai");
const systemPrompt = require("../prompts/systemPrompt");
const examples = require("../prompts/examples");

const inheritancesChatController = async (req, res) => {
    console.log("================== START INHERITANCES CHAT ==================");

    const {
        nameOfDeceased,
        npwpOfDeceased,
        unpaidTaxes,
        nameOfHeirs,
        npwpOfHeirs,
        typeOfInheritance,
        titleTransferred,
        cashReported,
        businessIncome,
        assetSold,
        foreignAssets,
        reportedInSPT,
        testamentaryGift,
        cryptoOrSecurities,
        assetValue,
        additionalNotes
    } = req.body;

    const messageContent = `
        Kamu adalah konsultan pajak Indonesia profesional. Berdasarkan data berikut, analisis dan hitung apakah warisan ini termasuk objek pajak, dan jika iya, berapa besar pajak yang harus dibayar oleh ahli waris.

        Data Warisan:
        - Nama Pewaris: ${nameOfDeceased || "-"}
        - NPWP Pewaris: ${npwpOfDeceased || "-"}
        - Apakah Pewaris Meninggalkan Utang Pajak: ${unpaidTaxes || "-"}
        - Nama Ahli Waris: ${nameOfHeirs || "-"}
        - NPWP Ahli Waris: ${npwpOfHeirs || "-"}
        - Jenis Warisan: ${typeOfInheritance || "-"}
        - Jika warisan berupa tanah/bangunan, apakah sertifikat sudah dialihkan: ${titleTransferred || "-"}
        - Jika warisan berupa uang/deposito, apakah telah dilaporkan: ${cashReported || "-"}
        - Jika warisan berupa usaha, apakah menghasilkan pendapatan setelah diwariskan: ${businessIncome || "-"}
        - Apakah ada aset yang telah dijual oleh ahli waris: ${assetSold || "-"}
        - Apakah terdapat aset luar negeri yang diwariskan: ${foreignAssets || "-"}
        - Apakah semua ahli waris telah melaporkan aset warisan dalam SPT mereka: ${reportedInSPT || "-"}
        - Apakah terdapat hibah wasiat (testamentary gift): ${testamentaryGift || "-"}
        - Apakah ada aset warisan dalam bentuk surat berharga asing/kripto: ${cryptoOrSecurities || "-"}
        - Nilai Aset Warisan (perkiraan): ${assetValue ? "Rp" + assetValue.toLocaleString("id-ID") : "-"}
        - Catatan Tambahan: ${additionalNotes || "-"}

        Berikan hasil analisis dalam format berikut:
        1. **Status Pajak** — apakah warisan ini termasuk objek pajak (kena pajak / tidak kena pajak) dan jelaskan alasannya berdasarkan ketentuan.
        2. **Jenis Pajak yang Berlaku** — PPh, BPHTB, atau lainnya.
        3. **Dasar Hukum** — cantumkan pasal dan undang-undang (contoh: Pasal 4 ayat (3) huruf a UU PPh, UU No. 20 Tahun 2000 tentang BPHTB).
        4. **Perhitungan Pajak (jika kena)** — tampilkan langkah dan nominalnya secara rinci.
        5. **Kewajiban Pelaporan** — jelaskan kewajiban pelaporan SPT ahli waris.
        6. **Kesimpulan** — ringkasan hasil akhir.
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
        console.log("================== SUCCESS INHERITANCES CHAT ==================\n");
        res.json({
            reply: response.choices[0].message.content,
            model: response.model,
            usage: response.usage,
        });
    } catch (error) {
        console.error("❌ Error di chatController:", error);
        res.status(error.status || 500).json({
            error: error.message,
            details: error.response?.data || null,
        });
    }
};

module.exports = inheritancesChatController;
