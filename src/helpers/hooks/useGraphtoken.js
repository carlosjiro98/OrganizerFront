import { loginRequest } from '../authConfig';
import { useMsal } from '@azure/msal-react';

 export default function useGraphToken () {
    const { instance, accounts } = useMsal();

    async function requestAccesToken() {
        try {
            const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            });
            
            //setToken(response.accessToken);
            return response.accessToken;

        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la adquisición del token o la llamada a la API
            console.error(error);
            return null;
        }
    }

    return {requestAccesToken}

 }