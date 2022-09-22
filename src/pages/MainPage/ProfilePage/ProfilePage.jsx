import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { Header } from "../../../components/Header/Header";
import UserWithoutPicture from '../../../assets/blank-profile-picture.svg'
import { Gallery } from "../../../components/Gallery/Gallery";
import { clienteAxios } from "../../../config/axios";
import { startLoadingPicturesByUser } from "../../../store/pictures/thunks";
import './profilePage.css'

export const ProfilePage = () => {

    const dispatch = useDispatch()
    const { status, username } = useSelector(state => state.auth)
    const { imagesByUser } = useSelector( state => state.pictures )

    const [ dataProfile, setDataProfile ] = useState({})
    const { username:user } = useParams();

    const searchUser = async( username ) => {
        const { data } = await clienteAxios.get(`/users/${ username }`)
        setDataProfile(data.user)
    }

    useEffect(() => {
        searchUser( user )
    }, [ user ])

    useEffect(() => {
        dispatch(startLoadingPicturesByUser( user ))
    }, [])

    return (
        <>
            <Header />

            <div className="banner__profile">
                <div 
                    className="profile__photo" 
                >
                    {
                        (dataProfile.avatar === '')
                            ? <img src={UserWithoutPicture} className="profile__photo__img" />
                            : <img src={dataProfile.avatar} className="profile__photo__img" />
                    }
                </div>

                <div className="banner__profile__texts">
                    <div className="profile__names">
                        <h1>{ dataProfile.first_name } { dataProfile.last_name }</h1>
                        {
                            (
                                (status === 'authenticated' && username === user ) &&
                                <Link to="/account" className="btn__edit__profile" >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    Edit Profile
                                </Link>
                            )

                        }
                    </div>
                    <p className="profile__username">{ dataProfile.username }</p>
                    <p>Download free high quality beautiful photos selected by { dataProfile.username }.</p>
                </div>
            </div>

            <div className="title__section">Pictures</div>

            <Gallery images={ imagesByUser } />
        </>
    )
}


