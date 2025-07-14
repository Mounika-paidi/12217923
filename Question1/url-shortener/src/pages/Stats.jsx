import React, { useState } from "react";
import axios from "axios";

const Stats = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);

  const getStats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/stats/${code}`);
      setStats(res.data);
    } catch (err) {
      alert("No stats found for this shortcode");
      setStats(null);
    }
  };

  return (
    <div>
      <h2>Shortcode Stats</h2>
      <input
        type="text"
        placeholder="Enter shortcode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={getStats}>Get Stats</button>

      {stats && (
        <div>
          <p>Original URL: {stats.longUrl}</p>
          <p>Created At: {stats.createdAt}</p>
          <p>Expiry At: {stats.expiryAt}</p>
          <p>Total Clicks: {stats.hits}</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
