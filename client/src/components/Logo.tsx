import "../index.css";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        height: "100%",
      }}
    >
      <div
        className="logo-div"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "350px",
          textAlign: "center",
        }}
      >
        <img
          src="/logo.jpeg"
          alt="logo"
          className="image-container"
          style={{
            maxHeight: "85px",
            width: "85px",
            opacity: 0.8,
            margin: "0 auto", // ✅ Centre l'image horizontalement
            display: "block", // nécessaire pour que margin auto fonctionne
          }}
        />

        <p
          className="logo-title"
          style={{
            fontFamily: "Anavio",
            fontSize: "2.8rem",
            color: "#f0e6d5",
            margin: 0,
          }}
        >
          Flash Story
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <div
            style={{ flex: 0.5, height: "1px", backgroundColor: "#ccac70" }}
          />
          <p
            className="logo-subtitle"
            style={{
              fontFamily: "Pantai Bali, cursive",
              fontSize: "3rem",
              fontWeight: "lighter",
              color: "#ccac70",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Wedding Photography
          </p>
          <div
            style={{ flex: 0.5, height: "1px", backgroundColor: "#ccac70" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
