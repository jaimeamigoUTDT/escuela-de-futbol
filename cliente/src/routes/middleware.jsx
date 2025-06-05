import { Navigate } from 'react-router-dom';

const Middleware = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default Middleware;