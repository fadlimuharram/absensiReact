import React from "react";
import { NavLink } from "react-router-dom";
const withMenu = WrappedComponent => {
  class Menu extends React.Component {
    render() {
      return (
        <React.Fragment>
          <div className="ui fixed inverted menu">
            <div className="ui container">
              <NavLink to="/" exact className="item">
                <img
                  className="logo"
                  src="https://semantic-ui.com/examples/assets/images/logo.png"
                />
                &nbsp; Absensi App
              </NavLink>
              <NavLink to="/dosen" className="item">
                Dosen
              </NavLink>
              <NavLink to="/mahasiswa" className="item">
                Mahasiswa
              </NavLink>
              <NavLink to="/jurusan" className="item">
                Jurusan
              </NavLink>
              <NavLink to="/matapelajaran" className="item">
                Matapelajaran
              </NavLink>
              <NavLink to="/jadwal" className="item">
                Jadwal Mahasiswa
              </NavLink>
            </div>
          </div>
          <div style={{ marginTop: 80 }}>
            <WrappedComponent
              {...this.props}
              handlerChange={this.handlerChange}
              style={{ marginTop: "200px" }}
            />
          </div>
        </React.Fragment>
      );
    }
  }

  return Menu;
};

export default withMenu;
