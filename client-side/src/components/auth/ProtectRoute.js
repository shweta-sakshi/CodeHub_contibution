/**
 * @description: This file is used to protect the routes and redirect the user to the login page if the user is not authenticated.
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useSelector((state) => state.auth); // Get the user and loading state from the store.
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch(); //

    // Check if the user is authenticated.
    useEffect(() => {
        async function check() {
            if (!loading) {
                await dispatch(checkAuth());
                setInitializing(false);
            }
            else {
                setInitializing(false);
            }
        }
        check();
    }, []);

    // Show Spinner while authentication check is in progress.
    if (initializing) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    // If the user is not authenticated, redirect to the login page.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If the user is authenticated, return the children components.
    return children;
};

export default ProtectedRoute;
