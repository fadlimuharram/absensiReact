import React from "react";
import { connect } from "react-redux";
import { getMataPelajaran, deleteMataPelajaran } from "../../_actions";
import { Table, Form } from "semantic-ui-react";
import PostMataPelajaran from "./PostMataPelajaran";

class MataPelajaran extends React.Component {
  componentDidMount() {
    this.props.getMataPelajaran();
  }

  _onDelete = id => {
    this.props.deleteMataPelajaran(id);
    this.props.getMataPelajaran();
  };

  renderDaftarMatapelajaran = () => {
    const { dataMataPelajaran } = this.props;
    if (dataMataPelajaran) {
      let no = 1;
      return Object.keys(dataMataPelajaran).map(id => {
        return (
          <Table.Row>
            <Table.Cell>{no++}</Table.Cell>
            <Table.Cell>{dataMataPelajaran[id].nama}</Table.Cell>
            <Table.Cell>{dataMataPelajaran[id].jam}</Table.Cell>
            <Table.Cell>{dataMataPelajaran[id].hari}</Table.Cell>
            <Table.Cell>{dataMataPelajaran[id].sks}</Table.Cell>
            <Table.Cell>{dataMataPelajaran[id].kelas}</Table.Cell>
            <Table.Cell>{dataMataPelajaran[id].dosen.nama}</Table.Cell>
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

  render() {
    return (
      <React.Fragment>
        <div className="ui main container">
          <div className="ui stackable grid">
            <div className="ten wide column">
              <div className="ui stacked segment">
                <a className="ui olive ribbon label">Daftar Mata Pelajaran</a>

                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Nama</Table.HeaderCell>
                      <Table.HeaderCell>Jam</Table.HeaderCell>
                      <Table.HeaderCell>Hari</Table.HeaderCell>
                      <Table.HeaderCell>SKS</Table.HeaderCell>
                      <Table.HeaderCell>Kelas</Table.HeaderCell>
                      <Table.HeaderCell>Dosen</Table.HeaderCell>
                      <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.renderDaftarMatapelajaran()}</Table.Body>
                </Table>
              </div>
            </div>
            <PostMataPelajaran />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataMataPelajaran: state.mataPelajaran.data
  };
};

export default connect(
  mapStateToProps,
  { getMataPelajaran, deleteMataPelajaran }
)(MataPelajaran);
