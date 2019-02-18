import React from "react";
import { logout } from "../../_actions";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  handleOnClick = event => {
    this.props.logout();
  };

  toJurusan = () => {
    this.props.history.push("/jurusan");
  };
  render() {
    return (
      // <div>
      //   <h1>dashboard</h1>
      //   <button onClick={this.handleOnClick}>logout</button>
      // </div>

      <div className="ui main container">
        <div className="ui stackable grid">
          <div className="nine wide column">
            <div className="ui stacked segment">
              <a className="ui olive ribbon label">Reg</a>
              <div className="ui form">
                <div className="two fields">
                  <div className="field">
                    <label>Tes</label>
                    <div class="ui right labeled input">
                      <input type="text" placeholder="Skriv mengde" />
                      <button onClick={this.handleOnClick}>logout</button>
                      <button onClick={this.toJurusan}>jurusan</button>
                      <div class="ui basic label">Tonn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="six wide column">
            <div className="ui stacked segment">
              <a className="ui olive ribbon label">Reg</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "",
  { logout }
)(Dashboard);
