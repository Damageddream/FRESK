import React, { useEffect, useContext } from 'react';
import axiosInstance from './AxiosInstance';
import { useNavigate} from "react-router-dom";
import AuthContext from '../Utilities/Context';

    const Logout = () => {

	//hook for setting context that user is logged in
	const authCtx = useContext(AuthContext);
    
    let navigate = useNavigate();

	useEffect(() => {
		const response = axiosInstance.post('/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		authCtx.logout()
        navigate('/');
	});
	return <div>Logout</div>;
}

export default Logout;