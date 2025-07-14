import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [expiryMinutes, setExpiryMinutes] = useState(30);
  const [shortcode, setShortcode] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/shorten", {
        longUrl,
        shortcode,
        expiryMinutes,
      });

      alert("Short URL: " + res.data.shortUrl);
    } catch (err) {
      console.error("❌ ERROR:", err.response?.data || err.message);
      alert("Failed to shorten the URL");
    }
  };

  return (
    <div>
      <h2>Shorten a URL</h2>
      <p>Long URL:</p>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <p>Validity (minutes):</p>
      <input
        type="number"
        value={expiryMinutes}
        onChange={(e) => setExpiryMinutes(e.target.value)}
      />
      <p>Custom Shortcode (optional):</p>
      <input
        type="text"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Shorten</button>
    </div>
  );
};

export default Home;
