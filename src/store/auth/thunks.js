import { toast } from 'react-toastify'
import { clienteAxios } from "../../config/axios";
import { clearImagesLogout } from '../pictures/picturesSlice';
import { onHideHeaderOptions } from '../ui/uiSlice';
import { checkingCredentials, login, logout } from "./authSlice"


export const startLogin = ({ email, password }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() )

        try {
            const { data } = await clienteAxios.post('/auth/login', {email, password});
            const { user } = data;
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( login(user) );
        } catch (error) {
            toast.error(error.response.data.msg)
            dispatch( logout() )
        }
    }
}

export const startRegister = ({ first_name, last_name, username, email, password, avatar }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());

        try {
            await clienteAxios.post('/auth/register', { first_name, last_name, username, email, password, avatar });
            toast.success('Registered Successfully, Log In')
            dispatch( logout() )
        } catch (error) {
            toast.error(error.response.data.msg)
            dispatch( logout() )
        }
    }
}

export const startUpdateProfile = ({ first_name, last_name, username, email }) => {
    return async( dispatch, getState ) => {
        dispatch( checkingCredentials() )

        const { _id } = getState().auth
        
        const formData = new FormData()
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('username', username)
        formData.append('email', email)

        try {
            const { data } = await clienteAxios.put(`/users/update/${ _id }`, formData)
            dispatch( login( data.user ) )
            toast.success(`${data.msg}`)
        } catch (error) {
            toast.error(error.response.data.msg)
            dispatch( login( getState().auth ) )
        }
    }
}

export const startUpdateAvatar = ( avatar = '' ) => {
    return async( dispatch, getState ) => {
        dispatch( checkingCredentials() )

        const { _id } = getState().auth

        const formData = new FormData()
        formData.append('avatar', avatar)
        try {
            const { data } = await clienteAxios.put(`/users/update/${ _id }`, formData)
            dispatch( login( data.user ) )
            toast.success(`${data.msg}`)
        } catch (error) {
            toast.error(error.response.data.msg)
            dispatch( login( getState().auth ) )
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch( clearImagesLogout() )
        dispatch( onHideHeaderOptions() )
        dispatch( logout() )
        toast.success('Successfully closed session')
    }
}

export const checkAuthToken = () => {
    return async(dispatch) => {
        
        const token = localStorage.getItem('token');
        if(!token) return dispatch( logout() );

        try {
            const { data } = await clienteAxios.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( login(data.user) )
        } catch (error) {
            
        }
    }
}