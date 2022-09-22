import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserWithoutPicture from '../../assets/blank-profile-picture.svg'
import { clienteAxios } from '../../config/axios';
import { startDeletePictures } from '../../store/pictures/thunks';

export const ImageHover = ({ image, visibility }) => {

    const dispatch = useDispatch()
    const { username } = useSelector( state => state.auth )
    const { username:userProfile } = useParams()

    const { _id, image: img, user } = image;
    const classname = `detalles-hover ${visibility}`;

    const handleDeleteImage = (id) => {
        dispatch( startDeletePictures( id ) )
    }

    const handleDownload = async (id) => {
        const { data } = await clienteAxios.get(`/pictures/download/${ id }`)
        toast.success( data.msg )
    }

    return (
        <div className={classname} >

            <div className="overlay__buttons">

                {
                    (userProfile && username === userProfile) &&
                    <button
                        className="btn-delete"
                        onClick={ () => handleDeleteImage(_id) }
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>

                }
                <button className="btn-download-picture" onClick={ () => handleDownload(_id) }>
                    <i className="fa-solid fa-arrow-down"></i>
                </button>
            </div>
            <div className="picture__profile">
                {
                    (user.avatar === '')
                        ? <img src={UserWithoutPicture} className="author__picture" />
                        : <img src={user.avatar} className="author__picture" />
                }
                <Link to={`/${ user.username }`} className="profile__link" >{user.username}</Link>
            </div>
        </div>
    )
}
