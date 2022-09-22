import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { onHideHeaderOptions, onOpenModal, onShowHeaderOptions } from '../../store/ui/uiSlice'
import { HeaderOptions } from './HeaderOptions'
import logo from '../../assets/my_unsplash_logo.svg'
import UserWithoutPicture from '../../assets/blank-profile-picture.svg'
import { FormUploadPicture } from '../modal'
import './header.css'
import { toast } from 'react-toastify'
import { startSeachImages } from '../../store/pictures/thunks'

export const Header = ({ searchInput = true }) => {

    const { status, avatar } = useSelector(state => state.auth)
    const { headerOptions } = useSelector(state => state.ui)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')

    const handleClick = () => {
        navigate('/')
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (searchTerm.length === 0) {
            toast.error('You must enter a search term')
        } else {
            dispatch(startSeachImages(searchTerm))
            navigate(`/search/${searchTerm}`)
        }
    }

    const handleOpenModal = () => {
        dispatch(onOpenModal())
    }

    const handleShowOptions = () => {
        headerOptions ? dispatch(onHideHeaderOptions()) : dispatch(onShowHeaderOptions())
    }

    return (
        <header className='header'>
            <div className="header-section">
                <div className="logo" onClick={handleClick}>
                    <img src={logo} alt="logo" />
                </div>
                {
                    searchInput &&
                    <form
                        className="search-input search-input--header"
                        onSubmit={handleSubmit}
                    >
                        <span>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="text"
                            className="input"
                            name='term'
                            placeholder="Search by name"
                            onChange={handleInputChange}
                        />
                    </form>
                }
            </div>

            <div className="header-section header-section--2">
                {
                    (status === 'authenticated' && searchInput) &&
                    <button
                        className="btn__upload__picture"
                        onClick={handleOpenModal}
                    >
                        Upload Picture
                    </button>
                }
                {
                    (
                        status === 'authenticated' &&
                        <div className="picture__profile--header" onClick={handleShowOptions}>
                            {
                                (avatar === '')
                                    ? <img src={UserWithoutPicture} className="author__picture author__picture--header" />
                                    : <img src={avatar} className="author__picture" />
                            }
                        </div>
                    )
                }


                {
                    (
                        status === 'not-authenticated' &&
                        <div className="authentication__options">
                            <Link to="auth/login" className="authentication__option" >Log In</Link>
                            <Link to="auth/register" className="authentication__option" >Sign Up</Link>
                        </div>
                    )
                }
            </div>

            <HeaderOptions />
            <FormUploadPicture />
        </header>
    )
}
