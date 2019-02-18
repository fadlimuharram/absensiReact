import React from "react";
import { Form } from "semantic-ui-react";
import {
  getMahasiswa,
  getMataPelajaran,
  postJadwalMahasiswa,
  getJadwalMahasiswa
} from "../../_actions";
import { connect } from "react-redux";

class PostJadwalMahasiswa extends React.Component {
  state = {
    mahasiswa: {
      id: "",
      nama: "",
      npm: ""
    },
    matapelajaran: {
      id: "",
      nama: "",
      hari: "",
      jam: "",
      sks: ""
    }
  };

  componentDidMount() {
    this.props.getMahasiswa();
    this.props.getMataPelajaran();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelectChangeMahasiswa = (event, data) => {
    const filterData = data.options.find(o => o.value === data.value);
    const { dataMahasiswa } = this.props;
    this.setState({
      mahasiswa: {
        id: filterData.keys,
        nama: dataMahasiswa[filterData.keys].nama,
        npm: dataMahasiswa[filterData.keys].npm
      }
    });
  };

  handleSelectChangeMatapelajaran = (event, data) => {
    const filterData = data.options.find(o => o.value === data.value);
    const { dataMataPelajaran } = this.props;
    const id = filterData.keys;
    this.setState({
      matapelajaran: {
        id: id,
        nama: dataMataPelajaran[id].nama,
        hari: dataMataPelajaran[id].hari,
        jam: dataMataPelajaran[id].jam,
        sks: dataMataPelajaran[id].sks
      }
    });
  };

  generateMahasiswaOption = () => {
    let opt = [];
    const { dataMahasiswa } = this.props;
    Object.keys(dataMahasiswa).forEach(id => {
      opt.push({
        keys: id,
        value: dataMahasiswa[id].npm,
        text: dataMahasiswa[id].npm
      });
    });

    return opt;
  };

  renderSelectMahasiswa = () => (
    <Form.Select
      placeholder="Pilih NPM Mahasiswa"
      options={this.generateMahasiswaOption()}
      onChange={this.handleSelectChangeMahasiswa}
    />
  );

  renderMahasiswaDescription = () => (
    <React.Fragment>
      <Form.Field>
        <label>Nama</label>
        <Form.Input disabled value={this.state.mahasiswa.nama} />
      </Form.Field>
      <Form.Field>
        <label>NPM</label>
        <Form.Input disabled value={this.state.mahasiswa.npm} />
      </Form.Field>
    </React.Fragment>
  );

  renderMatapelajaranDescription = () => (
    <React.Fragment>
      <Form.Field>
        <label>Hari</label>
        <Form.Input disabled value={this.state.matapelajaran.hari} />
      </Form.Field>
      <Form.Field>
        <label>Jam</label>
        <Form.Input disabled value={this.state.matapelajaran.jam} />
      </Form.Field>
      <Form.Field>
        <label>SKS</label>
        <Form.Input disabled value={this.state.matapelajaran.sks} />
      </Form.Field>
    </React.Fragment>
  );

  generateMatapelajaranOption = () => {
    let opt = [];
    const { dataMataPelajaran } = this.props;
    Object.keys(dataMataPelajaran).forEach(id => {
      opt.push({
        keys: id,
        value:
          dataMataPelajaran[id].nama +
          " - " +
          dataMataPelajaran[id].hari +
          " - " +
          dataMataPelajaran[id].jam +
          " - " +
          dataMataPelajaran[id].dosen.nama,
        text:
          dataMataPelajaran[id].nama +
          " - " +
          dataMataPelajaran[id].hari +
          " - " +
          dataMataPelajaran[id].jam +
          " - " +
          dataMataPelajaran[id].dosen.nama
      });
    });
    return opt;
  };

  renderSelectMatapelajaran = () => (
    <Form.Select
      placeholder="Pilih Salah Satu Matapelajaran"
      options={this.generateMatapelajaranOption()}
      onChange={this.handleSelectChangeMatapelajaran}
    />
  );

  _onSubmit = e => {
    e.preventDefault();
    const { mahasiswa, matapelajaran } = this.state;
    this.props.postJadwalMahasiswa(mahasiswa, matapelajaran);
    this.props.getJadwalMahasiswa();
  };

  render() {
    return (
      <div className="six wide column">
        <div className="ui stacked segment">
          <a className="ui olive ribbon label">Buat Mahasiswa Baru</a>

          <Form onSubmit={this._onSubmit}>
            <br />
            <Form.Field>
              <label>Pilih Mahasiswa</label>
              {this.renderSelectMahasiswa()}
            </Form.Field>
            {this.state.mahasiswa.nama && this.renderMahasiswaDescription()}
            <Form.Field>
              <label>Pilih Matapelajaran</label>
              {this.renderSelectMatapelajaran()}
            </Form.Field>
            {this.state.matapelajaran.nama &&
              this.renderMatapelajaranDescription()}

            <Form.Field>
              <Form.Button type="submit">Tambah</Form.Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    dataMahasiswa: state.mahasiswa.data,
    dataMataPelajaran: state.mataPelajaran.data
  };
};
export default connect(
  mapStateToProps,
  { getMahasiswa, getMataPelajaran, postJadwalMahasiswa, getJadwalMahasiswa }
)(PostJadwalMahasiswa);
