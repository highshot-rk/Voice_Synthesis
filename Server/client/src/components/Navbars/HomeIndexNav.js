
import React, { Component } from "react";
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
  Col,
  Row
} from "reactstrap";
import Member from '../../views/HomePage/Member';
import Billing from '../../views/HomePage/Billing';
import Cryhistory from '../../views/HomePage/Cryhistory';
import Resort from '../../views/HomePage/Resort';
class HomeIndexNav extends Component {

  state = {
      homestatus:'member'
  }
  homePageChagne = (status) => {
    switch (status){
        case "member":
            this.setState({
                homestatus:'member'
            })
            break;
        case "billing":
            this.setState({
                homestatus:'billing'
            })
            break;
        case "cryhistory":
            this.setState({
                homestatus:'cryhistory'
            })
            break;
        case "resort":
            this.setState({
                homestatus:'resort'
            })
            break;
        default:
    }
  }
  render(){
    let homePageContent = (<Member></Member>);
    switch (this.state.homestatus){
        case "member":
            homePageContent = <Member/>
            break;
        case "billing":
            homePageContent = <Billing/>
            break;
        case "cryhistory":
            homePageContent = <Cryhistory/>
            break;
        case "resort":
            homePageContent = <Resort/>
            break;
        default:
    }
    return (
        <>
        <Navbar expand="lg" >
        <Container>
            {/* <div className="navbar-translate"> */}
            <NavbarBrand
                data-placement="bottom"
                href="/index"
                title="Coded by Creative Tim"
                style = {{color:'black'}}
            >
                SOSサーバ
            </NavbarBrand>
            
            {/* </div> */}
            {/* <Collapse
            className="justify-content-end"
            navbar
            > */}
            <Nav navbar>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                href="/login"
              >
                <i className="nc-icon nc-spaceship"></i> ログアウト
              </Button>
            </NavItem>
            </Nav>
            {/* </Collapse> */}
        </Container>
        </Navbar>
        <Container className="mt-5">
            <Row>
                <Col md={3}>
                    <Button className="btn-round p-3"
                    color="success"
                    onClick={()=>this.homePageChagne('member')}
                    >
                        ユーザー管理
                    </Button>
                </Col>
                <Col md={3}>
                    <Button className="btn-round p-3"
                        color="success"
                        onClick={()=>this.homePageChagne('billing')}
                        >
                        課金と広告収入
                    </Button>
                </Col>
                <Col md={3}>
                    <Button className="btn-round p-3"
                        color="success"
                        onClick={()=>this.homePageChagne('cryhistory')}
                        >
                        心の叫び
                    </Button>
                </Col>
                <Col md={3}>
                    <Button className="btn-round p-3"
                        color="success"
                        onClick={()=>this.homePageChagne('resort')}
                        >
                        シーン追加
                    </Button>
                </Col>
            </Row>
        </Container>
        {homePageContent}
        </>
    );
    }
}

export default HomeIndexNav;
