import React, {createContext, useState, useContext, ReactNode} from 'react';

interface IAuthContext {
    token: string;
    name: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [token, setToken] = useState<string>('');
    const [name, setName] = useState<string>('');

    return (
        <AuthContext.Provider value={{token, setToken, name, setName}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}