import { Link } from "react-router-dom"

export const AdminView = () => {
  return (
    <div className="admin-container">
        <header className="mt-5 mb-3">
            <h1 className="font-weight-bold">ADMINISTRADOR</h1>
            <small className="font-weight-bold">¿Que desea hacer?</small>
        </header>
        <div className="mt-3 buttons-container">
            <Link className="btn btn-primary p-3" to={"/enterprise"}>
              <i className="fa fa-building icon-button mr-2" aria-hidden="true"></i>Empresas
            </Link>
            <Link className="btn btn-primary p-3" to={"/product"}>
              <i className="fas fa-shopping-cart icon-button mr-2" aria-hidden="true"></i>Productos
            </Link>
            <Link className="btn btn-primary p-3" to={"/inventory"}>
              <i className="fa fa-list icon-button mr-2" aria-hidden="true"></i> Inventario
            </Link>
        </div>
    </div>
  )
}
