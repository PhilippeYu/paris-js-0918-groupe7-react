import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class ActivationAccount extends Component {
  state = {
    status: 0,
    redirect: false
  };

  componentDidMount = () => {
    const Url = `http://localhost:3002/users/activate/${
      this.props.match.params.activation_token
    }`;

    axios
      .post(Url)
      .then(res => {
        this.setState({ status: res.status });
      })
      .catch(err => {
        this.setState({ status: err.response.status });
      });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    if (this.state.status === 409) {
      return <Redirect to="/error" />;
    }

    if (this.state.status === 500) {
      return (
        <div>
           500  <Link to="/login">Redirecting to home</Link>
        </div>
      );
    }

    return (
      <div>
        <Grid
          container
          style={{
            backgroundColor: "rgb(125, 146, 177)",
            position: "absolute",
            minHeight: "100%"
          }}
        >
          <Card
            className="card"
            style={{
              width: "50%",
              height: "60%",
              alignContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              paddingBottom:"2%",
              paddingRight:"1%",
              borderRadius: "5%"
            }}
          >
            <CardContent className="cardContent">
              <Typography
                gutterBottom
                style={{
                  fontFamily: "Raleway, sans-serif",
                  marginTop: "5%",
                  marginLeft: "1%",
                  fontSize: "calc(1vw + 1vh + 0.8vmin)"
                }}
              >
                Activation of your account
              </Typography>

              <p>
                Your account has been created! You can now connect with your
                login.
              </p>

              <div style={{float:"right"}}>
                <Button
                  onClick={this.handleClick}
                  className="BtnSend"
                  type="submit"
                  value="Login"
                  style={{
                    backgroundColor: "rgb(186, 28, 58)",
                    color: "white",
                    fontFamily: "Raleway",
                    borderRadius: "15px",
                  }}
                >
                  <Typography
                    gutterBottom
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "calc(0.4vw + 0.4vh + 0.6vmin)",
                      padding: "8px 30px",
                      fontFamily: "Raleway",
                    }}
                  >
                    Login
                  </Typography>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default ActivationAccount;
