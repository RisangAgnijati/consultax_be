const https = require("https");
const OpenAI = require("openai");

// Agent untuk menjaga koneksi HTTPS tetap hidup
const keepAliveAgent = new https.Agent({ keepAlive: true });

// Inisialisasi client OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "User-Agent": "ConsultaxAI/1.0",
  },
  fetch: (url, opts) => fetch(url, { ...opts, agent: keepAliveAgent }),
});

// Fungsi warm-up untuk menjaga koneksi tetap aktif
async function warmUpOpenRouter() {
  try {
    await openai.models.list();
    console.log("✅ OpenRouter warm-up successful");
  } catch (err) {
    console.error("⚠️ OpenRouter warm-up failed:", err.message);
  }
}

// Jalankan warm-up setiap 10 menit
setInterval(warmUpOpenRouter, 2 * 60 * 1000);

module.exports = openai;
