import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import firebase from "./_constants/config.firebase";
import { setUser, logout } from "./_actions";
import { connect } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import Jurusan from "./components/Jurusan/Jurusan";
import Dosen from "./components/Dosen/Dosen";
import Mahasiswa from "./components/Mahasiswa/Mahasiswa";
import MataPelajaran from "./components/MataPelajaran/MataPelajaran";
import JadwalMahasiswa from "./components/JadwalMahasiswa/JadwalMahasiswa";
import withMenu from "./components/Menu";
import Login from "./components/Login/Login";
import Spinner from "./components/Spinner";
import logo from "./logo.svg";
import "./sass/main.scss";
import "./App.css";

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("loggedin2", user);
      if (user) {
        this.props.setUser(user);
      } else {
        this.props.logout();
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route path="/jurusan" component={withMenu(Jurusan)} />
        <Route path="/dosen" component={withMenu(Dosen)} />
        <Route path="/mahasiswa" component={withMenu(Mahasiswa)} />
        <Route path="/matapelajaran" component={withMenu(MataPelajaran)} />
        <Route path="/jadwal" component={withMenu(JadwalMahasiswa)} />
        <Route exact path="/" component={withMenu(Dashboard)} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setUser, logout }
  )(App)
);
