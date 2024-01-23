import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [registerError, setRegisterError] = useState(null);
    const [registerLoading, setRegisterLoading] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async e => {
        e.preventDefault();

        setRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

        console.log(response, 'post resp')


        setRegisterLoading(false);

        if (response.error) {
            setRegisterError(response.message);
            return;
        }

        localStorage.setItem('User', JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    console.log(registerInfo, 'registerInfo')

    return <AuthContext.Provider value={{ 
        user, 
        registerInfo, 
        updateRegisterInfo,
        registerUser,
        registerError,
        registerLoading
    }}>
        { children }
    </AuthContext.Provider>
}