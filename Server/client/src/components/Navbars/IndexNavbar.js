
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        {/* <div className="navbar-translate"> */}
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            title="Coded by Creative Tim"
            style = {{color:'red'}}
          >
            SOSサーバ
          </NavbarBrand>
          <Nav navbar>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                href="/login"
                style = {{float:'right'}}
              >
                <i className="nc-icon nc-spaceship"></i> 管理者としてログイン
              </Button>
            </NavItem>
          </Nav>
        {/* </Collapse> */}
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
