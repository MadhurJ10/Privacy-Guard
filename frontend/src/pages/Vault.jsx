import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import VaultReg from "../components/VaultReg";
import VaultLogin from "../components/VaultLogin";
import VaultDashboard from "../components/VaultDashboard";
import VaultList from "../components/VaultList";

const Vault = () => {
    const { isVault, isVaultLogged } = useContext(UserContext);

    return (
        <div>
            {/* Show Vault Registration if not registered */}
            {!isVault && <VaultReg />}

            {/* Show Vault Login if registered but not logged in */}
            {isVault && !isVaultLogged && <VaultLogin />}

            {/* Show Vault Dashboard and List if logged in */}
            {isVaultLogged && (
                <div className="p-6 bg-gray-100 min-h-screen">
                    <VaultDashboard />
                    <VaultList />
                </div>
            )}
        </div>
    );
};

export default Vault;
