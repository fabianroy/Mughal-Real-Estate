import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <div className="w-fit mx-auto my-80"><span className="loading loading-dots loading-lg bg-orange-600"></span></div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
};