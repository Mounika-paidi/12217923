import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/${shortcode}`)
      .then((res) => {
        window.location.href = res.request.responseURL;
      })
      .catch((err) => {
        alert("Shortcode not found or expired");
      });
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
