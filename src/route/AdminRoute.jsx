import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="w-fit mx-auto my-80"><span className="loading loading-dots loading-lg bg-orange-600"></span></div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;

AdminRoute.propTypes = {
    children: PropTypes.node
};