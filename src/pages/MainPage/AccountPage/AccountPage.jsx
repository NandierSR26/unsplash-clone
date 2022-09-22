import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../../components/Header/Header'
import UserWithoutPicture from '../../../assets/blank-profile-picture.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './accountPage.css'
import { useState } from 'react'
import { startUpdateAvatar, startUpdateProfile } from '../../../store/auth/thunks'
import { previewImage } from '../../../helpers/previewImage'

export const AccountPage = () => {

    const dispatch = useDispatch();
    const { first_name, last_name, email, username, avatar, status } = useSelector(state => state.auth)
    const [picture, setPicture] = useState(null);


    const formik = useFormik({
        initialValues: initialValues(first_name, last_name, email, username),
        validationSchema: Yup.object({
            first_name: Yup.string().required('This field is required'),
            last_name: Yup.string().required('This field id required'),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "Username cannot have spaces").required('The username Is Required'),
            email: Yup.string().email('Invalid E-mail').required('The E-mail is required'),
        }),
        onSubmit: (formData) => {
            const newData = formData;

            if (picture) {
                newData.avatar = picture
            }

            // dispatch(startRegister(newData))
            dispatch(startUpdateProfile(newData))
        }
    })

    const changeImage = (e) => {
        dispatch(startUpdateAvatar(e.target.files[0]))
    }

    const handleRemoveProfilePhoto = () => {
        dispatch( startUpdateAvatar() )
    }

    return (
        <>
            <Header searchInput={false} />

            <div className="main__container">
                <h1>Edit Profile</h1>

                <div className="profile__photo update__photo">
                    {
                        (avatar === '')
                            ? <img src={UserWithoutPicture} className="profile__photo__img" />
                            : <img src={avatar} className="profile__photo__img" />
                    }
                </div>

                <div className="upload__profile__photo__options">
                    <p className="remove__profile__photo" onClick={ handleRemoveProfilePhoto }>Remove Picture Profile</p>

                    <div className="upload__profile__photo">
                        <p className="change__profile__photo">Change Picture Profile</p>
                        <input
                            type="file"
                            className="input__file"
                            name='avatar'
                            onChange={e => {
                                changeImage(e)
                            }}
                        />
                    </div>

                </div>

                <form className="form__register form__update__profile" onSubmit={formik.handleSubmit}>
                    <div className="form__field form__field--fn">
                        <label htmlFor="first_name" className="field__label">First Name</label>
                        <input
                            type="text"
                            className="field__input"
                            name="first_name"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                        <div className="error__message">{formik.errors.first_name}</div>
                    </div>

                    <div className="form__field form__field--ln">
                        <label htmlFor="last_name" className="field__label">Last Name</label>
                        <input
                            type="text"
                            className="field__input"
                            name="last_name"
                            placeholder="Last Name"
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                        />
                        <div className="error__message">{formik.errors.last_name}</div>

                    </div>

                    <div className="form__field">
                        <label htmlFor="email" className="field__label">E-mail</label>
                        <input
                            type="text"
                            className="field__input"
                            name="email"
                            placeholder="E-mail"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <div className="error__message">{formik.errors.email}</div>

                    </div>

                    <div className="form__field">
                        <label htmlFor="username" className="field__label">Username</label>
                        <input
                            type="text"
                            className="field__input"
                            name="username"
                            placeholder="Username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <div className="error__message">{formik.errors.username}</div>

                    </div>

                    <input
                        type="submit"
                        className="form__submit form__submit--register"
                        value="Save Changes"
                        disabled={(status === 'checking' ? true : false)}
                    />
                </form>

            </div>
        </>
    )
}

function initialValues(first_name, last_name, email, username) {
    return {
        first_name,
        last_name,
        username,
        email,
    }
}