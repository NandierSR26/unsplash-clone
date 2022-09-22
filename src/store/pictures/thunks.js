import { toast } from "react-toastify";
import { clienteAxios } from "../../config/axios"
import { onCloseModal } from "../ui/uiSlice";
import { addNewPicture, deletePicture, savingNewPicture, searchImages, setAllImages, setImagesByUser, setSaving } from "./picturesSlice"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const startNewPicture = (title, picture) => {
    return async( dispatch, getState ) => {
        dispatch( savingNewPicture() );
        const { allImages } = getState().pictures

        const formData = new FormData()
        formData.append('title', title)
        formData.append('picture', picture)

        try {
            const {data} = await clienteAxios.post('/pictures/upload', formData)
            dispatch( addNewPicture( data.picture ) )
            dispatch( startLoadingPictures( allImages ) )
            toast.success(data.msg)
            dispatch( onCloseModal() );
        } catch (error) {
            if( error ){
                const errors = error.response.data.errors;
                errors?.forEach( error => {
                    toast.error(error.msg)
                })
            }
        }
    }
}

export const startLoadingPictures = () => {
    return async(dispatch) => {
        const { data } = await clienteAxios.get('/pictures')

        dispatch( setAllImages(data.pictures) );
    }
}

export const startLoadingPicturesByUser = ( username ) => {
    return async(dispatch) => {
        const { data } = await clienteAxios.get(`/pictures/${ username }`);

        dispatch( setImagesByUser(data.picturesByUser) )
    }
}

export const startDeletePictures = (id) => {
    return async( dispatch ) => {
        dispatch( setSaving() )

        Swal.fire({
            title: 'Estas Seguro?',
            text: "Una imagen Eliminada No Se Puede Recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // eliminar en la rest API
                const { data } = await clienteAxios.delete(`/pictures/delete/${ id }`)
                toast.success(data.msg)
                dispatch( deletePicture( id ) )
            }
        })
    }
}

export const startSeachImages = ( term ) => {
    return async( dispatch ) => {

        const { data } = await clienteAxios.get(`/pictures/search/${ term }`)
        dispatch( searchImages( data.pictures ) )
    }
}