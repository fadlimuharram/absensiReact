import React from "react";
import { connect } from "react-redux";
import { Table, Form } from "semantic-ui-react";
import { getJadwalMahasiswa, deleteJadwalMahasiswa } from "../../_actions";
import PostJadwalMahasiswa from "./PostJadwalMahasiswa";

class JadwalMahasiswa extends React.Component {
  componentDidMount() {
    this.props.getJadwalMahasiswa();
  }

  renderDaftarJadwal = () => {
    const { dataJadwal } = this.props;
    if (dataJadwal) {
      let no = 1;
      return Object.keys(dataJadwal).map(id => {
        return (
          <Table.Row>
            <Table.Cell>{no++}</Table.Cell>
            <Table.Cell>{dataJadwal[id].mahasiswa.nama}</Table.Cell>
            <Table.Cell>{dataJadwal[id].mahasiswa.npm}</Table.Cell>
            <Table.Cell>{dataJadwal[id].matapelajaran.nama}</Table.Cell>
            <Table.Cell>{dataJadwal[id].matapelajaran.jam}</Table.Cell>
            <Table.Cell>{dataJadwal[id].matapelajaran.sks}</Table.Cell>
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
    this.props.deleteJadwalMahasiswa(id);
    this.props.getJadwalMahasiswa();
  };
  render() {
    return (
      <React.Fragment>
        <div className="ui main container">
          <div className="ui stackable grid">
            <div className="ten wide column">
              <div className="ui stacked segment">
                <a className="ui olive ribbon label">Daftar Jurusan</a>

                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Nama</Table.HeaderCell>
                      <Table.HeaderCell>NPM</Table.HeaderCell>
                      <Table.HeaderCell>Matapelajaran</Table.HeaderCell>
                      <Table.HeaderCell>Jam</Table.HeaderCell>
                      <Table.HeaderCell>SKS</Table.HeaderCell>
                      <Table.HeaderCell>Aksi</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.renderDaftarJadwal()}</Table.Body>
                </Table>
              </div>
            </div>
            <PostJadwalMahasiswa />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataJadwal: state.jadwalMahasiswa.data
  };
};

export default connect(
  mapStateToProps,
  { getJadwalMahasiswa, deleteJadwalMahasiswa }
)(JadwalMahasiswa);
