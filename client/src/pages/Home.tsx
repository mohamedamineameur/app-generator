import React from "react";
import "../index.css";

const Home = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",          
        }}
      >
      

        <img
        src="./bague.jpg"
        alt="wedding ring"
        style={{
          width: "100%",
          
          borderRadius: "10px",
          marginTop: "20px",
        }}
      />
      </div>
    </main>
  );
};

export default Home;
