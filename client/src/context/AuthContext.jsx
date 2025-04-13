/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useContext } from "react";
import { registerUser, loginUser, getUserProfile } from "../services/api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already logged in
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // Get user profile with token
                    const userData = await getUserProfile();
                    setUser(userData);
                }
            } catch (err) {
                // If token is invalid, remove it
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    // Register a new user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await registerUser(userData);

            // Save token and user
            localStorage.setItem("token", response.token);
            setUser({
                id: response.id,
                username: response.username,
                email: response.email,
            });

            return response;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await loginUser(credentials);

            // Save token and user
            localStorage.setItem("token", response.token);
            setUser({
                id: response.id,
                username: response.username,
                email: response.email,
            });

            return response;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
