import React from "react";
import { Form } from "semantic-ui-react";
import { getJurusan, postMahasiswa, getMahasiswa } from "../../_actions";
import { connect } from "react-redux";

class PostMahasiswa extends React.Component {
  state = {
    email: "",
    nama: "",
    npm: "",
    jurusan: {
      id: "",
      nama: ""
    }
  };

  componentDidMount() {
    this.props.getJurusan();
  }

  handlerChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectChange = (event, data) => {
    const filterData = data.options.find(o => o.value === data.value);
    this.setState({
      jurusan: {
        id: filterData.keys,
        nama: filterData.value
      }
    });
  };

  generateJurusanOption = () => {
    let opt = [];
    const { dataJurusan } = this.props;
    Object.keys(dataJurusan).forEach(id => {
      opt.push({
        keys: id,
        value: dataJurusan[id].nama,
        text: dataJurusan[id].nama
      });
    });
    return opt;
  };

  renderSelectJurusan = () => (
    <Form.Select
      placeholder="Pilih Jurusan"
      options={this.generateJurusanOption()}
      onChange={this.handleSelectChange}
      value={this.state.jurusan.nama}
    />
  );

  _onSubmit = e => {
    e.preventDefault();
    const { email, nama, npm, jurusan } = this.state;
    if (email && nama && npm && jurusan) {
      this.props.postMahasiswa(nama, email, npm, this.state.jurusan);
      this.props.getMahasiswa();
      this.setState({
        email: "",
        nama: "",
        npm: "",
        jurusan: {
          id: "",
          nama: ""
        }
      });
    }
  };

  render() {
    return (
      <div className="sixteen wide column">
        <div className="ui stacked segment">
          <a className="ui olive ribbon label">Buat Mahasiswa Baru</a>

          <Form onSubmit={this._onSubmit}>
            <br />
            <Form.Field>
              <label>Nama Mahasiswa</label>
              <Form.Input
                placeholder="Nama Lengkap Mahasiswa"
                name="nama"
                onChange={this.handlerChange}
                value={this.state.nama}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                type="email"
                placeholder="Email Mahasiswa"
                name="email"
                onChange={this.handlerChange}
                value={this.state.email}
              />
            </Form.Field>
            <Form.Field>
              <label>NPM</label>
              <Form.Input
                placeholder="NPM Mahasiswa"
                name="npm"
                onChange={this.handlerChange}
                value={this.state.npm}
              />
            </Form.Field>
            <Form.Field>
              <label>Jurusan</label>
              {this.renderSelectJurusan()}
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
    dataJurusan: state.jurusan.data
  };
};
export default connect(
  mapStateToProps,
  { getJurusan, postMahasiswa, getMahasiswa }
)(PostMahasiswa);
