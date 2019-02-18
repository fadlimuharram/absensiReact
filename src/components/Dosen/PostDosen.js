import React from "react";
import { Form } from "semantic-ui-react";

class PostDosen extends React.Component {
  state = {
    email: "",
    nama: "",
    nid: "",
    password: ""
  };

  handlerChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _onSubmit = e => {
    e.preventDefault();
    const { email, nama, nid, password } = this.state;
    if (email && nama && nid) {
      this.props.postDosen(nama, email, nid, password);
      this.props.getDosen();
      this.setState({
        email: "",
        nama: "",
        nid: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <div className="seven wide column">
        <div className="ui stacked segment">
          <a className="ui olive ribbon label">Buat Dosen Baru</a>

          <Form onSubmit={this._onSubmit}>
            <br />
            <Form.Field>
              <label>Nama Dosen</label>
              <Form.Input
                placeholder="Nama Lengkap Dosen"
                name="nama"
                onChange={this.handlerChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                type="email"
                placeholder="Email Dosen"
                name="email"
                onChange={this.handlerChange}
              />
            </Form.Field>
            <Form.Field>
              <label>NID</label>
              <Form.Input
                placeholder="NID Dosen"
                name="nid"
                onChange={this.handlerChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password Sementara Dosen</label>
              <Form.Input
                placeholder="Password Dosen"
                name="password"
                onChange={this.handlerChange}
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

export default PostDosen;
