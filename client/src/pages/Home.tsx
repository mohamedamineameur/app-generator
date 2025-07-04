// @ts-nocheck
import React from "react";
import "../index.css";
import { useLanguage } from "../contexts/LanguageContext";
import useInView from "../hooks/useInView";

const Home = () => {
  const { language } = useLanguage();

  const [left1Ref, inViewLeft1] = useInView();
  const [right1Ref, inViewRight1] = useInView();
  const [left2Ref, inViewLeft2] = useInView();
  const [right2Ref, inViewRight2] = useInView();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        marginTop: "2rem",
        marginBottom: "2rem",
        marginLeft: "1rem",
        marginRight: "1rem",
      }}
    >
      

      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ overflow: "hidden", width: "95%", margin: "5rem" }}>
        <img
  src="/bague.webp"
  alt="wedding ring"
  loading="eager" // CHANGER ça !
  decoding="async"
  style={{
    display: "block",
    width: "100%",
    borderRadius: "10px",
    transform: "translateY(-2px)",
  }}
/>


        </div>

        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
        <span lang="fr">Photographe de mariage à Ottawa – Thiziri</span> | <span lang="en">Wedding Photographer in Ottawa – Thiziri</span>
      </h1>

        <div className="responsive-section">
          <div
            ref={left1Ref}
            className={`animate-left ${inViewLeft1 ? "animate-visible" : ""}`}
            style={{ flex: 1, padding: "2rem" }}
          >
            <h2 style={{ fontFamily: "Anavio", fontSize: "2.5rem", color: "#ccac70", marginBottom: "2.5rem" }}>
              {language === "fr" ? "A PROPOS DE MOI" : "ABOUT ME"}
            </h2>
            <h3 style={{ fontFamily: "Anavio", fontSize: "1.7rem", color: "#fff", textAlign: "left" }}>
              {language === "fr" ? (
                <>Hello ! Je suis <span style={{ color: "#ccac70" }}>Thiziri !</span></>
              ) : (
                <>Hello! I'm <span style={{ color: "#ccac70" }}>Thiziri!</span></>
              )}
            </h3>
            <p style={{ color: "#fff", textAlign: "justify", fontFamily: "Anavio", fontSize: "13px", textIndent: "3rem" }}>
              {language === "fr"
                ? "Photographe de mariage passionnée et maman de trois petits bouts de chou qui me gardent sur les pieds 24/7 ! Je vis à Ottawa, où je trouve l'inspiration pour mes photos dans la beauté de la ville et de ses alentours."
                : "I'm a passionate wedding photographer and a mom of three little ones who keep me on my toes 24/7! I live in Ottawa, where I find inspiration for my photos in the beauty of the city and its surroundings."}
            </p>
            <p style={{ color: "#fff", textAlign: "justify", fontFamily: "Anavio", fontSize: "13px" }}>
              {language === "fr"
                ? "J’ai eu la chance de capturer les moments les plus précieux des couples qui se marient. Je suis fan de la joie qui émane de ces jours spéciaux. Et oui, je pleure souvent derrière mon appareil photo... mais c'est juste parce que je suis trop émue !"
                : "I've had the chance to capture the most precious moments of couples getting married. I love the joy that radiates from these special days. And yes, I often cry behind my camera... but it’s just because I’m so moved!"}
            </p>
            <p style={{ color: "#fff", textAlign: "justify", fontFamily: "Anavio", fontSize: "13px" }}>
              {language === "fr"
                ? "Quand je ne suis pas derrière mon appareil photo, tu peux me trouver à explorer les parcs et les musées d'Ottawa avec mes enfants, à siroter un café avec des amis ou à faire de la pâtisserie dans ma cuisine. Oui, j'adore les gâteaux et je trouve que la pâtisserie est un excellent moyen de se détendre et de créer quelque chose de beau !"
                : "When I’m not behind my camera, you can find me exploring Ottawa’s parks and museums with my kids, sipping coffee with friends, or baking in my kitchen. Yes, I love cakes and find baking a great way to relax and create something beautiful!"}
            </p>
            <h4 style={{ color: "#fff", fontFamily: "Anavio", fontSize: "1.08rem", marginInline: "2.5rem", marginTop: "1rem", fontWeight: "bold" }}>
              {language === "fr"
                ? "Je suis ravie de partager mon amour de la photographie avec toi et de t'aider à capturer les moments les plus précieux de ta vie. Alors, dis-moi, comment puis-je t'aider?"
                : "I'm excited to share my love of photography with you and help capture the most precious moments of your life. So tell me, how can I help you?"}
            </h4>
          </div>

          <div
            ref={right1Ref}
            className={`animate-right ${inViewRight1 ? "animate-visible" : ""}`}
            style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="image-wrapper" style={{
              width: "100%",
              maxWidth: "100%",
              aspectRatio: "4 / 3",
              position: "relative",
              overflow: "hidden",
            }}>
             <img src="/3.webp" alt="mariage" loading="lazy" width="100%" height="auto" style={{objectFit: "cover"}} />

            </div>
          </div>
        </div>

        <div className="responsive-section" style={{ marginTop: "-50px" }}>
          <div
            ref={left2Ref}
            className={`animate-left ${inViewLeft2 ? "animate-visible" : ""}`}
            style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="video-wrapper" style={{
              width: "100%",
              maxWidth: "100%",
              aspectRatio: "4 / 3",
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
            }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/sB_v94agJ1Y?si=8hG5WE_ylWHG8BFZ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              ></iframe>
            </div>
          </div>

          <div
            ref={right2Ref}
            className={`animate-right ${inViewRight2 ? "animate-visible" : ""}`}
            style={{ flex: 1, padding: "2rem" }}
          >
            <h2 style={{ fontSize: "2rem", textAlign: "left" }}>❝</h2>
            <h3 style={{ fontFamily: "Anavio", fontSize: "1.7rem", textAlign: "center", fontStyle: "italic", marginTop: "-40px", marginBottom: "-40px" }}>
              {language === "fr"
                ? <>Car des images valent mille mots, je vous invite à découvrir mon univers photographique. Au plaisir de te rencontrer !</>
                : <>Because a picture is worth a thousand words, I invite you to discover my photographic universe. Looking forward to meeting you!</>}
            </h3>
            <h2 style={{ fontSize: "2rem", textAlign: "right" }}>❞</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
