const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const database = {};

// Optional welcome message
app.get("/", (req, res) => {
  res.send("✅ Welcome to the URL Shortener API");
});

// 🔗 POST /shorten
app.post("/shorten", (req, res) => {
  console.log("Received Data:", req.body); // Debug print

  const { longUrl, shortcode, expiryMinutes } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  const short = shortcode || Math.random().toString(36).substring(2, 8);
  const expiryTime = Date.now() + (expiryMinutes || 30) * 60 * 1000;

  database[short] = {
    longUrl,
    expiryTime,
    createdAt: Date.now(),
    hits: 0,
  };

  res.json({ shortUrl: `http://localhost:3000/${short}` });
});

// 🧭 Redirect to original URL
app.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const entry = database[shortcode];

  if (!entry) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (Date.now() > entry.expiryTime) {
    delete database[shortcode];
    return res.status(410).json({ error: "Shortcode expired" });
  }

  entry.hits++;
  res.redirect(entry.longUrl);
});

// 📊 Stats API
app.get("/stats/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const entry = database[shortcode];

  if (!entry) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  res.json({
    longUrl: entry.longUrl,
    createdAt: new Date(entry.createdAt).toLocaleString(),
    expiryAt: new Date(entry.expiryTime).toLocaleString(),
    hits: entry.hits,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
