import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "./BackButton"
import { Navbar } from "./Navbar"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export const ProductForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    code: "",
    name: "",
    characteristics: "",
    price: 0,
    enterprise_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [enterprises, setEnterprises] = useState([]);
  const navigate = useNavigate();

  const { code, name, characteristics, price, enterprise_id } = form;
  const URL = "http://127.0.0.1:8000/api";

  const notify = (status, message) => status
    ? toast.success(message, { duration: 4000, position: "top-center" })
    : toast.error(message, { duration: 4000, position: "top-center" }
    );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const path = id ? `${URL}/product/${id}` : `${URL}/product`;
      const response = id ? await axios.put(path, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      }) : await axios.post(path, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      notify(response.data.ok, response.data.message);
      setTimeout(() => {
        navigate("/product");
      }, 4000);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      notify(false, "no fue posible guardar el registro, intentalo mas tarde");
    }
  }

  useEffect(() => {
    const getEnterprise = async () => {
      try {
        const { data } = await axios.get(`${URL}/product/${id}`);
        const newValues = {
          code: data.data.code,
          name: data.data.name,
          characteristics: data.data.characteristics,
          price: data.data.price,
          enterprise_id: data.data.enterprise_id
        }
        setForm(newValues);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (id !== undefined) getEnterprise();
  }, []);

  useEffect(() => {
    const getEnterprises = async () => {
      try {
        const { data } = await axios.get(`${URL}/enterprise`);
        setEnterprises(data.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getEnterprises();
  }, []);

  return (
    <div>
      <Navbar />
      <BackButton route={"/product"} />
      <form method="POST" onSubmit={handleSubmit} className="form-container">
        <div className="icon-container">
          <i className="fa fa-building icon" aria-hidden="true"></i>
        </div>
        <header className="p-3 text-center">
          <h2 className="font-weight-bold">{id ? "Actualizar Producto" : "Crear Producto"}</h2>
        </header>
        <div className="input-group mb-3">
          <input
            type="number"
            placeholder="codigo"
            className="form-control"
            name="code"
            onChange={handleChange}
            value={code}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Nombre producto"
            className="form-control"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div className="input-group mb-3">
          <textarea
            cols="30"
            rows="10"
            placeholder="Caracteristicas"
            className="form-control"
            name="characteristics"
            onChange={handleChange}
            value={characteristics}
          ></textarea>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Precio en monedas"
            className="form-control"
            name="price"
            onChange={handleChange}
            value={price}
          />
        </div>
        <div className="input-group">
          <select
            name="enterprise_id"
            className="form-control"
            onChange={handleChange}
            value={enterprise_id}
            id="">
            {enterprises.map(enterprise => (
              <option value={enterprise.NIT} key={enterprise.NIT}>{enterprise.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}><i className="fa fa-plus-circle" aria-hidden="true"></i> {id ? "Actualizar" : "Crear"}</button>
        </div>
      </form>
      <Toaster />
    </div>
  )
}
