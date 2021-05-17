import React from "react";
import { Container } from "reactstrap";
function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg").default + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">SOS</h1>
              <div className="fog-low">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
              </div>
              <div className="fog-low right">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center" style = {{color:'yellow'}}>
              ストレスを解消！
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage:
              "url(" + require("assets/img/clouds.png").default + ")",
          }}
        />
        <h6 className="category category-absolute">
          によって設計およびコーディングされた{" "}
          <a
            href="/index"
          >
            <img
              alt="..."
              className="creative-tim-logo"
              src={require("assets/img/creative-Hara.png").default}
            />
          </a>
        </h6>
      </div>
    </>
  );
}

export default IndexHeader;
