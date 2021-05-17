
import React from "react";
import { Container, Row, Col } from "reactstrap";

function SectionDark() {
  return (
    <>
      <div className="section section-dark">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="description pt-5">
                ストレスアウトのためのサーバーホームページ
                私のホームページにようこそ！
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionDark;
