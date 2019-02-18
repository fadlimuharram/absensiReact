import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import firebase from "../../_constants/config.firebase";
import { connect } from "react-redux";
import { login } from "../../_actions";

class LoginForm extends React.PureComponent {
  state = {
    email: "",
    password: ""
  };

  handlerChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSUbmit = event => {
    event.preventDefault();
    if (this.isFormFalid(this.state)) {
      this.props.login(this.state.email, this.state.password);
    }
  };

  isFormFalid = ({ email, password }) => email && password;

  renderError = error => {
    console.log("aa", error);
    return <div className="ui error message">{error.pesan}</div>;
  };
  static getDerivedStateFromProps(props) {
    if (props.isLoginSuccess) {
      props.history.push("/");
    }
  }

  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="/logo.png" /> Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.handleSUbmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  onChange={this.handlerChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handlerChange}
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            {this.props.error && this.renderError(this.props.error)}
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    isLoginSuccess: state.auth.isSuccess
  };
};

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
