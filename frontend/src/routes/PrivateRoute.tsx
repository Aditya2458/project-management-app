import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: Props) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;