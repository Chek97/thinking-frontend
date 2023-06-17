import { useState, useEffect } from "react";
import axios from 'axios';

export const ExternalView = () => {

    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = "http://127.0.0.1:8000/api";


    const Message = () => {

        return (
            <div className="message">
                <p className="message-content">No hay Empresas Registradas</p>
            </div>
        )
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${URL}/enterprise`);
                setEnterprises(data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <div className="table-container">
            <header className="mb-5">
                <h1 className="font-weight-bold">LISTA DE EMPRESAS</h1>
            </header>
            {
                loading ? <Message />
                    : (
                        <div className="table-responsive table-content">
                            <table className="table table-hover bg-light">
                                <thead>
                                    <tr>
                                        <th>NIT</th>
                                        <th>Nombre Empresa</th>
                                        <th>Direccion</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        enterprises.map(enterprise => (
                                            <tr key={enterprise.NIT}>
                                                <td>{enterprise.NIT}</td>
                                                <td>{enterprise.name}</td>
                                                <td>{enterprise.email}</td>
                                                <td>{enterprise.phone}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </div>
    )
}
