import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContextes/AuthContextes';


const useAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo;
};

export default useAuth;