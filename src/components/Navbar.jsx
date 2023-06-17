import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Thinking App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesion</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
