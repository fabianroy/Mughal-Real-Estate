import { Navigate, useLocation } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';

const AgentRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAgent, isAgentLoading] = useAgent();
    const location = useLocation();

    if(loading || isAgentLoading){
        return <div className="w-fit mx-auto my-80"><span className="loading loading-dots loading-lg bg-orange-600"></span></div>
    }

    if(user && isAgent){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AgentRoute;

AgentRoute.propTypes = {
    children: PropTypes.node
};