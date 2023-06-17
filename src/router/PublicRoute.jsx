import { Navigate } from "react-router-dom";

export const PublicRoute = ({children}) => {

  const auth = JSON.parse(localStorage.getItem("user"));

  return (auth === null) ? children : <Navigate to="/" />;
}
