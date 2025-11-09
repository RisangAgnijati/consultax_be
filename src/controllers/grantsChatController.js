const openai = require("../config/openai");
const systemPrompt = require("../prompts/systemPrompt");
const examples = require("../prompts/examples");

const grantsChatController = async (req, res) => {
    const {
        name,
        npwpStatus,
        NoD,
        maritalStatus,
        jobs,
        typeOfIncome,
        sourceOfIncome,
        relationWithGrantor,
        assetType,
        assetValue,
        dataReceived,
        addNotes
    } = req.body;

    console.log("================== START GRANTS CHAT ==================");

    const messageContent = `Kamu adalah konsultan pajak Indonesia. Berdasarkan data berikut, hitung apakah hibah ini termasuk 
        objek pajak, dan jika ya, berapa besar pajak yang harus dibayar.
        
        Data Hibah: 
        - Nama penerima : ${name}
        - NPWP : ${npwpStatus}
        - Status Pernikahan : ${maritalStatus}
        - Jumlah Tanggungan : ${NoD}
        - Pekerjaan : ${jobs}
        - Jenis Penghasilan : ${typeOfIncome}
        - Sumber Hibah : ${sourceOfIncome}
        - Hubungan dengan pemberi hibah : ${relationWithGrantor}
        - Jenis Asset : ${assetType}
        - Nilai Asset : ${assetValue}
        - Tanggal Diterima : ${dataReceived}
        - Catatan Tambahan : ${addNotes}

        Berikan hasil berupa:
        1. Status pajak (kena pajak / tidak kena pajak) dan alasan hukumnya.
        2. Jenis pajak yang berlaku (PPh atau BPHTB).
        3. Dasar hukum (Pasal dan UU yang relevan).
        4. Jika kena pajak, tampilkan perhitungan detail pajaknya.
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
        console.log("================== SUCCESS GRANTS CHAT ==================\n");
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

module.exports = grantsChatController;
