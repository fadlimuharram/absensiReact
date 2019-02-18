import React from "react";
import { getDosen, postDosen, deleteDosen } from "../../_actions";
import { connect } from "react-redux";
import { Table, Tab, Select, Form } from "semantic-ui-react";
import PostDosen from "./PostDosen";

class Dosen extends React.Component {
  state = {
    nama: "",
    fakultas_id: "",
    fakultas_nama: ""
  };

  componentDidMount() {
    this.props.getDosen();
  }

  renderDaftarDosen = () => {
    const { dataDosen } = this.props;
    console.log("dt", dataDosen);
    if (dataDosen) {
      let no = 1;
      return Object.keys(dataDosen).map(id => {
        return (
          <Table.Row>
            <Table.Cell>{no++}</Table.Cell>
            <Table.Cell>{dataDosen[id].nama}</Table.Cell>
            <Table.Cell>{dataDosen[id].email}</Table.Cell>
            <Table.Cell>{dataDosen[id].nid}</Table.Cell>

            <Table.Cell>
              <Form.Button onClick={() => this._onDelete(id)}>
                delete
              </Form.Button>
            </Table.Cell>
          </Table.Row>
        );
      });
    }
  };

  _onDelete = id => {
    this.props.deleteDosen(id);
    this.props.getDosen();
  };

  render() {
    return (
      <React.Fragment>
        <div className="ui main container">
          <div className="ui stackable grid">
            <div className="nine wide column">
              <div className="ui stacked segment">
                <a className="ui olive ribbon label">Daftar Dosen</a>

                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Nama</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>NID</Table.HeaderCell>
                      <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.renderDaftarDosen()}</Table.Body>
                </Table>
              </div>
            </div>
            <PostDosen
              postDosen={this.props.postDosen}
              getDosen={this.props.getDosen}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataDosen: state.dosen.data
  };
};

export default connect(
  mapStateToProps,
  { getDosen, postDosen, deleteDosen }
)(Dosen);
