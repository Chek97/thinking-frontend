import { useState } from "react";
import { BackButton } from "./BackButton"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { Navbar } from "./Navbar";

export const EnterpriseForm = () => {

    const { id } = useParams();
    const [form, setForm] = useState({
        nit: "",
        name: "",
        address: "",
        phone: 0
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { nit, name, address, phone } = form;
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
            const path = id ? `${URL}/enterprise/${id}` :`${URL}/enterprise`; 
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
                navigate("/enterprise");
            }, 4000);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
            notify(false, "no fue posible guardar el registro, intentalo mas tarde");
        }
    }

    useEffect(() => {
        const getEnterprise = async() => {
            try {
                const { data } = await axios.get(`${URL}/enterprise/${id}`);
                const newValues = {
                    nit: data.data.NIT,
                    name: data.data.name,
                    address: data.data.email,
                    phone: data.data.phone
                }
                setForm(newValues);
            } catch (error) {
                console.error(error.message);
            }
        }
        
        if(id !== undefined) getEnterprise();
    }, []);

    return (
        <div>
            <Navbar />
            <BackButton route={"/enterprise"} />
            <form method="POST" onSubmit={handleSubmit} className="form-container">
                <div className="icon-container">
                    <i className="fa fa-building icon" aria-hidden="true"></i>
                </div>
                <header className="p-3 text-center">
                    <h2 className="font-weight-bold">Empresa{id && ": " + form.name}</h2>
                </header>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        placeholder="NIT"
                        className="form-control"
                        name="nit"
                        onChange={handleChange}
                        value={nit }
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Nombre empresa"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        value={name}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Direccion"
                        className="form-control"
                        name="address"
                        onChange={handleChange}
                        value={address}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        placeholder="Telefono"
                        className="form-control"
                        name="phone"
                        onChange={handleChange}
                        value={phone}
                    />
                </div>
                <div className="mt-2">
                    <button className="btn btn-primary btn-lg btn-block" disabled={loading}>
                        <i className={id ? "fa fa-pencil" : "fa-solid fa-save"} aria-hidden="true"></i> {id ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}
