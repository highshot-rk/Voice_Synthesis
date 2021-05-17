import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userActions } from '../../actions';
import {
    Button,
    Card,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from 'reactstrap';
import validateInput from '../../components/validator/login';
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import SectionDark from 'views/index-sections/SectionDark';
import "./LoginPage.css";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.props.logout();
        this.state = {
            email: '',
            password: '',
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        if (this.isValid()) {
            this.props.login(email, password, this.props.history);
        }
    }
    keySubmit = (e) => {
        if (e.key == "Enter"){
            this.handleSubmit(e);
        }
    }
    isValid = () => {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
          this.setState({ errors });
        }
        return isValid;
      }
    render() {
        const { email, password, errors } = this.state;
        return (
            <>
            <IndexNavbar/>
            <SectionDark className = "mt-5"/>
            <div
                className="section section-image section-login"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/login-image.jpg").default + ")",
                }}
            >
            <Container  id="special-card">
                <Row>
                    <Col className="mx-auto" lg="4" md="6">
                    <Card className="card-register card-color">
                        <h3 className="title mx-auto">ようこそ</h3>
                        <div className="social-line text-center">
                        <Button
                            className="btn-neutral btn-just-icon mt-0"
                            color="facebook"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="fa fa-facebook-square" />
                        </Button>
                        <Button
                            className="btn-neutral btn-just-icon mt-0 ml-1"
                            color="google"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="fa fa-google-plus" />
                        </Button>
                        <Button
                            className="btn-neutral btn-just-icon mt-0 ml-1"
                            color="twitter"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="fa fa-twitter" />
                        </Button>
                        </div>
                        <Form className="register-form">
                        <label>Email</label>
                        <InputGroup className="form-group-no-border">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="nc-icon nc-email-85" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder='入力してください email'
                            type='email'
                            value = {email}
                            onChange={this.handleChange}
                            name='email'
                            onKeyDown = {(e) => {
                                this.keySubmit(e)
                            }}
                            />
                        </InputGroup>
                        <label>パスワード</label>
                        <InputGroup className="form-group-no-border">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="nc-icon nc-key-25" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            placeholder='パスワードを入力してください'
                            type='password'
                            value = {password}
                            onChange={this.handleChange}
                            name='password'
                            onKeyDown = {(e) => {
                                this.keySubmit(e)
                            }}
                            />
                        </InputGroup>
                        <p className = "mb-0" style={{color:'red', fontSize:'0.8rem', 'fontWeight':'600'}}>{errors.email}</p>
                        <p className = "mb-0" style={{color:'red', fontSize:'0.8rem', 'fontWeight': '600'}}>{errors.password}</p>
                        <Button
                            block
                            className="btn-round"
                            color="danger"
                            type="button"
                            onClick = {this.handleSubmit}
                        >
                            サインイン
                        </Button>
                        </Form>
                    </Card>
                    </Col>
                </Row>
                </Container>
                </div>
            </>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    // const { message } = state.alert;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

 
export default connect(mapState, actionCreators)(withRouter(LoginPage));