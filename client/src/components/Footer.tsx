import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        fontSize: "1.15rem",
        color: "#ccac70",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        marginTop: "auto"
      }}
    >
      &copy; {year}{" "}
      {language === "fr"
        ? "Photographe Mariage. Tous droits réservés."
        : "Wedding Photographer. All rights reserved."}
    </footer>
  );
};

export default Footer;
