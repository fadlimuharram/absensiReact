import React from "react";
import {
  getJurusan,
  getFakultas,
  postJurusan,
  deleteJurusan
} from "../../_actions";
import { connect } from "react-redux";
import { Table, Tab, Select, Form } from "semantic-ui-react";

class Jurusan extends React.Component {
  state = {
    nama: "",
    fakultas_id: "",
    fakultas_nama: ""
  };

  componentDidMount() {
    this.props.getJurusan();
    this.props.getFakultas();
  }

  handlerChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectChange = (event, data) => {
    const filterData = data.options.find(o => {
      return o.value === data.value;
    });
    this.setState({
      fakultas_id: filterData.keys,
      fakultas_nama: filterData.value
    });
  };

  renderDaftarJurusan = () => {
    const { dataJurusan } = this.props;
    if (dataJurusan) {
      let no = 1;
      return Object.keys(dataJurusan).map(id => {
        return (
          <Table.Row>
            <Table.Cell>{no++}</Table.Cell>
            <Table.Cell>{dataJurusan[id].nama}</Table.Cell>
            <Table.Cell>{dataJurusan[id].fakultas.nama}</Table.Cell>
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

  generateFakultasOption = () => {
    let opt = [];
    const { dataFakultas } = this.props;
    Object.keys(dataFakultas).forEach(id => {
      opt.push({
        keys: id,
        value: dataFakultas[id].nama,
        text: dataFakultas[id].nama
      });
    });
    return opt;
  };

  renderSelectFakultas = () => (
    <Form.Select
      placeholder="pilih fakultas"
      options={this.generateFakultasOption()}
      name="fakultas_id"
      onChange={this.handleSelectChange}
      value={this.state.fakultas_nama}
    />
  );

  _onSubmit = e => {
    e.preventDefault();
    const { nama, fakultas_id, fakultas_nama } = this.state;
    this.props.postJurusan(nama, fakultas_id, fakultas_nama);
    this.props.getJurusan();
    this.setState({
      nama: "",
      fakultas_id: "",
      fakultas_nama: ""
    });
  };

  _onDelete = id => {
    this.props.deleteJurusan(id);
    this.props.getJurusan();
    // alert(id);
  };

  render() {
    return (
      <React.Fragment>
        <div className="ui main container">
          <div className="ui stackable grid">
            <div className="nine wide column">
              <div className="ui stacked segment">
                <a className="ui olive ribbon label">Daftar Jurusan</a>

                <Form>
                  <br />
                  <Form.Group widths="equal" onSubmit={this._onSubmit}>
                    <Form.Input
                      fluid
                      placeholder="masukan jurusan"
                      onChange={this.handlerChange}
                      name="nama"
                      value={this.state.nama}
                    />
                    {this.renderSelectFakultas()}
                    <Form.Button onClick={this._onSubmit} type="submit">
                      Tambah Jurusan
                    </Form.Button>
                  </Form.Group>
                </Form>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Nama Jurusan</Table.HeaderCell>
                      <Table.HeaderCell>Fakultas</Table.HeaderCell>
                      <Table.HeaderCell>Aksi</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.renderDaftarJurusan()}</Table.Body>
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
    dataJurusan: state.jurusan.data,
    dataFakultas: state.fakultas.data,
    dataJurusanFakultas: state.jurusan.dataFakultas
  };
};

export default connect(
  mapStateToProps,
  { getJurusan, getFakultas, postJurusan, deleteJurusan }
)(Jurusan);
