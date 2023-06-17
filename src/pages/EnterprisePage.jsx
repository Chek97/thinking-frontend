import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { BackButton, Navbar } from "../components";
import toast, { Toaster } from 'react-hot-toast';

export const EnterprisePage = () => {

  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = "http://127.0.0.1:8000/api";

  const notify = (status, message) => status
    ? toast.success(message, { duration: 2000, position: "top-center" })
    : toast.error(message, { duration: 3000, position: "top-center" });


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL}/enterprise/${id}`);
      console.log(response);
      notify(response.data.ok, response.data.message);
      getData();
    } catch (error) {
      console.error(error.message);
      notify(false, "El registro no se pudo borrar");
    }
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(`${URL}/enterprise`);
      setEnterprises(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <BackButton route={"/"} />
      <header className="text-center mt-2 mb-2">
        <h1 className="font-weight-bold">LISTA DE EMPRESAS</h1>
      </header>
      <div className="p-3 mb-3">
        <Link className="btn btn-success btn-lg" to={"/enterprise/create"}>
          <i className="fa fa-plus" aria-hidden="true"></i> Agregar Empresa
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hovered bg-light">
          <thead>
            <tr>
              <th>NIT</th>
              <th>Nombre Empresa</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th colSpan={2} className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? <div>Espere...</div> : enterprises.length === 0 ? <div>No hay empresas registradas</div> :
                enterprises.map(enterprise => (
                  <tr key={enterprise.NIT}>
                    <td>{enterprise.NIT}</td>
                    <td>{enterprise.name}</td>
                    <td>{enterprise.email}</td>
                    <td>{enterprise.phone}</td>
                    <td>
                      <Link className="btn btn-success mr-1" to={`/enterprise/${enterprise.NIT}`}>Editar</Link>
                      <button className="btn btn-danger ml-1" onClick={() => handleDelete(enterprise.NIT)}>Eliminar</button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  )
}
