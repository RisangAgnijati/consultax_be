const openai = require("../config/openai");
const systemPrompt = require("../prompts/systemPrompt");
const examples = require("../prompts/examples");

const chatController = async (req, res) => {
  const { userMessage, historyChat } = req.body;

  console.log("================== START BASIC CHAT ==================");

  try {
    console.time("OpenRouter Response Time");

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...examples,
        { role: "user", content: `chat sebelumnya : ${historyChat}` },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      // max_tokens: 10000,
    });

    console.timeEnd("OpenRouter Response Time");
    console.log("================== SUCCESS BASIC CHAT ==================\n");

    res.json({
      reply: response.choices[0].message.content,
      model: response.model,
      usage: response.usage,
    });

  } catch (error) {
    console.error("❌ Error di chatController:", error.message);

    // Coba 1x retry jika error koneksi
    if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
      console.log("🔁 Retry sekali...");
      try {
        const response = await openai.chat.completions.create({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: "Kamu adalah asisten pajak dengan nama Consultax." },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          // max_tokens: 10000,
        });
        return res.json({ reply: response.choices[0].message.content });
      } catch (retryError) {
        console.error("Retry gagal:", retryError.message);
      }
    }

    res.status(error.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
};

module.exports = chatController;
