import { useState } from "react";
import { useForm } from "../hooks/useForm";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const [form, setForm] = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = form;
  const URL = "http://127.0.0.1:8000/api";

  const notify = (status) => status
    ? toast.success("Inicio de sesion exitoso", { duration: 4000, position: "top-center" })
    : toast.error("No fue posible iniciar sesion", { duration: 4000, position: "top-center" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/login`, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      notify(response.data.ok);

      const credentials = response.data.user;
      localStorage.setItem("user", JSON.stringify(credentials));
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      console.error(error.message);
      notify(false);
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form method="POST" onSubmit={handleSubmit} className="form">
        <div className="icon-container">
          <i className="fa fa-user-circle icon" aria-hidden="true"></i>
        </div>
        <header className="p-3 text-center">
          <h2 className="font-weight-bold">Login</h2>
        </header>
        <div className="input-group mb-3">
          <input
            type="email"
            placeholder="Correo Electronico"
            className="form-control"
            name="email"
            onChange={setForm}
            value={email}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="password"
            placeholder="Contraseña"
            className="form-control"
            name="password"
            onChange={setForm}
            value={password}
          />
        </div>
        <div className="mt-2">
          <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>Iniciar sesion</button>
        </div>
      </form>
      <Toaster />
    </div>
  )
}
