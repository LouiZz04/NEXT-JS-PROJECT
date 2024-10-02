'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
    username: string;
    isLoggedIn: boolean;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (newUsername: string) => {
        setUsername(newUsername);
        setIsLoggedIn(true);
        localStorage.setItem('username', newUsername);
    };

    const logout = () => {
        setUsername('');
        setIsLoggedIn(false);
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ username, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
