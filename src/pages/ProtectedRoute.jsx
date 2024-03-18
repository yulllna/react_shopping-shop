import { useAuthContext } from 'components/context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin }) {
    const { user } = useAuthContext();

    if (!user || (requireAdmin && !user.isAdmin)) {
        return <Navigate to='/' replace></Navigate>
    }

    return children;
}

export default ProtectedRoute;