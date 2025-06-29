import React, { useState, createContext } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
const UserProvider = ({ children }) => {
    const [ userDetails, setUserDetails ] = useState(null);
    const [ isUserValid, setIsUserValid ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [isVault, setIsVault] = useState(false);
    const [isVaultLogged, setIsVaultLogged] = useState(false);
    // React.useEffect(() => {
    //     console.log('UserContext initialized');
    //     console.log('isUserValid:', isUserValid);
    // }, []);

    return (
        <UserContext.Provider
            value={{
                userDetails,
                setUserDetails,
                isUserValid,
                setIsUserValid,
                isLoading,
                setIsLoading,
                isVault,
                setIsVault
                ,isVaultLogged,
                setIsVaultLogged
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
