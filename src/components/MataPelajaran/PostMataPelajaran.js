import React from "react";
import { Form } from "semantic-ui-react";
import { getDosen, postMataPelajaran, getMataPelajaran } from "../../_actions";
import { connect } from "react-redux";

class PostMataPelajaran extends React.Component {
  state = {
    jam: "00:00",
    hari: "",
    nama: "",
    sks: "",
    dosen: {
      id: "",
      nama: "",
      email: "",
      nid: ""
    },
    kelas: ""
  };

  handlerChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectChangeHari = (event, data) => {
    this.setState({
      hari: data.value
    });
  };

  handleSelectChangeDosen = (event, data) => {
    const filterData = data.options.find(o => o.value === data.value);
    const { dataDosen } = this.props;
    const getSelectedDosen = dataDosen[filterData.keys];
    console.log("sel", getSelectedDosen);
    this.setState({
      dosen: {
        id: filterData.keys,
        nama: getSelectedDosen.nama,
        email: getSelectedDosen.email,
        nid: getSelectedDosen.nid
      }
    });
  };

  componentDidMount() {
    this.props.getDosen();
  }

  renderSelectHari = () => {
    let options = [
      { keys: "senin", value: "senin", text: "Senin" },
      { keys: "selasa", value: "selasa", text: "Selasa" },
      { keys: "rabu", value: "rabu", text: "Rabu" },
      { keys: "kamis", value: "kamis", text: "Kamis" },
      { keys: "jumat", value: "jumat", text: "Jumat" },
      { keys: "sabtu", value: "sabtu", text: "Sabtu" }
    ];

    return (
      <Form.Select
        placeholder="pilih hari"
        options={options}
        onChange={this.handleSelectChangeHari}
        value={this.state.hari}
      />
    );
  };

  generateOptionDosen = () => {
    let opt = [];
    const { dataDosen } = this.props;

    Object.keys(dataDosen).forEach(id => {
      opt.push({
        keys: id,
        value: dataDosen[id].nama,
        text: dataDosen[id].nama
      });
    });

    return opt;
  };

  renderSelectDosen = () => (
    <Form.Select
      name="dosen"
      options={this.generateOptionDosen()}
      placeholder="Pilih Salah Satu Dosen"
      onChange={this.handleSelectChangeDosen}
      value={this.state.dosen.nama}
    />
  );

  _onSubmit = e => {
    e.preventDefault();
    const { nama, hari, jam, sks, dosen, kelas } = this.state;
    this.props.postMataPelajaran(nama, hari, jam, sks, dosen, kelas);
    this.props.getMataPelajaran();
    this.setState({
      jam: "00:00",
      hari: "",
      nama: "",
      sks: "",
      dosen: {
        id: "",
        nama: "",
        email: "",
        nid: ""
      },
      kelas: ""
    });
  };

  render() {
    return (
      <div className="six wide column">
        <div className="ui stacked segment">
          <a className="ui olive ribbon label">Buat Mata Pelajaran</a>

          <Form onSubmit={this._onSubmit}>
            <br />
            <Form.Field>
              <label>Nama Mata Pelajaran</label>
              <Form.Input
                name="nama"
                placeholder="Masukan Nama Matapelajaran"
                onChange={this.handlerChange}
                value={this.state.nama}
              />
            </Form.Field>
            <Form.Field>
              <label>Jam</label>
              <Form.Input
                name="jam"
                placeholder="00:00"
                onChange={this.handlerChange}
                value={this.state.jam}
              />
            </Form.Field>

            <Form.Field>
              <label>Hari</label>
              {this.renderSelectHari()}
            </Form.Field>

            <Form.Field>
              <label>SKS</label>
              <Form.Input
                name="sks"
                placeholder="Masukan Jumlas SKS"
                type="number"
                onChange={this.handlerChange}
                value={this.state.sks}
              />
            </Form.Field>

            <Form.Field>
              <label>Dosen</label>
              {this.renderSelectDosen()}
            </Form.Field>

            <Form.Field>
              <label>Kelas</label>
              <Form.Input
                name="kelas"
                onChange={this.handlerChange}
                value={this.state.kelas}
              />
            </Form.Field>

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
    dataDosen: state.dosen.data
  };
};
export default connect(
  mapStateToProps,
  { getDosen, postMataPelajaran, getMataPelajaran }
)(PostMataPelajaran);
