import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { BackButton, Navbar } from "../components";
import toast, { Toaster } from 'react-hot-toast';

export const ProductPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = "http://127.0.0.1:8000/api";

  const notify = (status, message) => status
    ? toast.success(message, { duration: 2000, position: "top-center" })
    : toast.error(message, { duration: 3000, position: "top-center" });


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL}/product/${id}`);
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
      const { data } = await axios.get(`${URL}/product`);
      setProducts(data.data);
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
        <h1 className="font-weight-bold">LISTA DE PRODUCTOS</h1>
      </header>
      <div className="p-3 mb-3">
        <Link className="btn btn-success btn-lg" to={"/product/create"}>Agregar Producto</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover bg-light">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Caracteristicas</th>
              <th>Precio</th>
              <th>Empresa</th>
              <th colSpan={2} className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {
              loading ? <div>Espere...</div> : products.length === 0 ? <div>No hay empresas registradas</div> :
                products.map(product => (
                  <tr key={product.code}>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.characteristics}</td>
                    <td>{product.price}</td>
                    <td>{product.enterprise_id}</td>
                    <td colSpan={2}>
                      <Link className="btn btn-success mr-1" to={`/product/${product.code}`}>Editar</Link>
                      <button className="btn btn-danger ml-1" onClick={() => handleDelete(product.code)}>Eliminar</button>
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
