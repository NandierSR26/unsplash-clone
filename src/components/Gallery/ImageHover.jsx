import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UserWithoutPicture from '../../assets/blank-profile-picture.svg'
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
                <a href={img} download className="btn-download-picture">
                    <i className="fa-solid fa-arrow-down"></i>
                </a>
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
