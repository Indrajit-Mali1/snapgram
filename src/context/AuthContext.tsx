import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";

export const INITITAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
};

const INITITAL_STATE = {
    user: INITITAL_USER,
    isLoading: true, // Initialize to true since we're about to check auth
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITITAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITITAL_USER);
    const [isLoading, setIsLoading] = useState(true); // Start in loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false); // Stop loading after auth check completes
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true); // Start loading
            const isAuthenticated = await checkAuthUser();
            if (!isAuthenticated) navigate('/sign-in'); // Redirect if not authenticated
            setIsLoading(false); // Stop loading after redirect or auth confirmation
        };

        initializeAuth();
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
