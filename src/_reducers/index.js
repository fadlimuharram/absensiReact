import { combineReducers } from "redux";
import Auth from "./authentication.reducer";
import Fakultas from "./fakultas.reducers";
import Jurusan from "./jurusan.reducer";
import Dosen from "./dosen.reducer";
import Mahasiswa from "./mahasiswa.reducer";
import JadwalMahasiswa from "./jadwalmahasiswa.reducer";
import MataPelajaran from "./matapelajaran.reducer";

export default combineReducers({
  auth: Auth,
  jurusan: Jurusan,
  fakultas: Fakultas,
  dosen: Dosen,
  mahasiswa: Mahasiswa,
  jadwalMahasiswa: JadwalMahasiswa,
  mataPelajaran: MataPelajaran
});
