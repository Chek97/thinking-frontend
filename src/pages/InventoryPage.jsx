import { useEffect } from "react";
import { useState } from "react";
import { BackButton } from "../components/BackButton";
import { Navbar } from "../components/Navbar";
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";

export const InventoryPage = () => {

  const [enterprises, setEnterprises] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const componentPDF = useRef();

  const URL = "http://127.0.0.1:8000/api";

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Inventory_Data",
  });

  useEffect(() => {
    const getEnterprises = async () => {
      try {
        const { data } = await axios.get(`${URL}/enterprise`);
        setEnterprises(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${URL}/product`);
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }
    getEnterprises();
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <BackButton route={"/"} />
      <header className="text-center pt-2 pb-2">
        <h1 className="font-weight-bold">INVENTARIO</h1>
      </header>
      {
        loading ? <p>Espere....</p> : (
          <>
            <div className="p-3 mb-3">
              <button className="btn btn-success btn-lg mr-3" onClick={generatePDF}>
              <i className="fa fa-download" aria-hidden="true"></i>  Descargar
            </button>
              <button className="btn btn-success btn-lg">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>  Enviar por Correo
              </button>
            </div>
            <form method="" className="p-3 text-center">
              <input type="email" placeholder="Escriba una direccion de correo" className="form-control" />
              <button type="submit" className="btn btn-primary btn-lg mt-2">Enviar</button>
            </form>
            <div ref={componentPDF} style={{width: '100%'}}>
              <table className="table table-hover bg-light">
                <thead>
                  <tr>
                    <th className="text-center">Empresa</th>
                    <th className="text-center" colSpan={4}>Productos</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    enterprises.map(enterprise => (
                      <tr key={enterprise.NIT}>
                        <td>{enterprise.name}</td>
                        <td>
                          <table className="table-bordered bg-light">
                            <thead>
                              <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Caracteristicas</th>
                                <th>Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map(product => product.enterprise_id === enterprise.NIT && (
                                <tr key={product.code}>
                                  <td>{product.code}</td>
                                  <td>{product.name}</td>
                                  <td>{product.characteristics}</td>
                                  <td>{product.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        )
      }
    </div>
  )
}
