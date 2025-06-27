import "../index.css";

const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "100%" }}>
      <img
        src="/logo.jpeg"
        alt="logo"
        className="image-container"
        style={{
          height: "100%",
          maxHeight: "250px",
          width: "auto"
        }}
      />
      <div className="logo-div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "350px", textAlign: "center" }}>
        <h1
          className="logo-title"
          style={{
            fontFamily: "Anavio",
            fontSize: "2.8rem",
            color: "#f0e6d5",
            margin: 0,
          }}
        >
          Flash Story
        </h1>
        <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
  }}
>
  <div style={{ flex: 0.5, height: '1px', backgroundColor: '#ccac70' }} />
  <h2
    className="logo-subtitle"
    style={{
      fontFamily: 'Pantai Bali, cursive',
      fontSize: '3rem',
      fontWeight: 'lighter',
      color: '#ccac70',
      margin: 0,
      whiteSpace: 'nowrap',
    }}
  >
    Wedding Photography
  </h2>
  <div style={{ flex: 0.5, height: '1px', backgroundColor: '#ccac70' }} />
</div>



      </div>
    </div>
  );
};

export default Logo;
