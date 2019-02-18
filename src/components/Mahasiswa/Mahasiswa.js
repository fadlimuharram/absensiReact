import React from "react";
import { getMahasiswa, postMahasiswa, deleteMahasiswa } from "../../_actions";
import { connect } from "react-redux";
import { Table, Tab, Select, Form } from "semantic-ui-react";
import PostMahasiswa from "./PostMahasiswa";
var QRCode = require("qrcode-react");

class Mahasiswa extends React.Component {
  componentDidMount() {
    this.props.getMahasiswa();
  }

  renderDaftarMahasiswa = () => {
    const { dataMahasiswa } = this.props;
    if (dataMahasiswa) {
      let no = 1;
      return Object.keys(dataMahasiswa).map(id => {
        return (
          <Table.Row>
            <Table.Cell>{no++}</Table.Cell>
            <Table.Cell>{dataMahasiswa[id].nama}</Table.Cell>
            <Table.Cell>{dataMahasiswa[id].email}</Table.Cell>
            <Table.Cell>{dataMahasiswa[id].npm}</Table.Cell>
            <Table.Cell>{dataMahasiswa[id].jurusan.nama}</Table.Cell>
            <Table.Cell>
              <QRCode value={dataMahasiswa[id].npm} />
            </Table.Cell>
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
    this.props.deleteMahasiswa(id);
    this.props.getMahasiswa();
  };

  render() {
    return (
      <React.Fragment>
        <div className="ui main container">
          <div className="ui stackable grid">
            <PostMahasiswa />
            <div className="sixteen wide column">
              <div className="ui stacked segment">
                <a className="ui olive ribbon label">Daftar Mahasiswa</a>

                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Nama</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>NPM</Table.HeaderCell>
                      <Table.HeaderCell>Jurusan</Table.HeaderCell>
                      <Table.HeaderCell>QRCode</Table.HeaderCell>
                      <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.renderDaftarMahasiswa()}</Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataMahasiswa: state.mahasiswa.data
  };
};

export default connect(
  mapStateToProps,
  { getMahasiswa, postMahasiswa, deleteMahasiswa }
)(Mahasiswa);
