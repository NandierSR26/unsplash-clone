import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../store/auth/thunks';
import { onHideHeaderOptions, onOpenModal } from '../../store/ui/uiSlice';
import './header.css';

export const HeaderOptions = () => {

    const { headerOptions } = useSelector( state => state.ui )
    const { username } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const hideOptions = () => {
        dispatch( onHideHeaderOptions() )
    }

    const handleOpenModal = () => {
        dispatch(onOpenModal())
        dispatch( onHideHeaderOptions() )
    }

    return (
        <div className={( !headerOptions ) ? "header__options none" : "header__options" }>
            <div className="header__options__container">
                <Link to={`/${ username }`} className="header__option" onClick={ hideOptions }>View Profile</Link>

                <Link to="/account" className="header__option"  onClick={ hideOptions }>Account Settings</Link>

                <div className="header__option header__option--show  none" onClick={handleOpenModal}>Upload Picture</div>

                <div 
                    className="header__option header__option--last"
                    onClick={ handleLogout }
                >
                    Logout
                </div>
            </div>
        </div>
    )
}
