import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { startRegister } from '../../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'
import * as Yup from 'yup'
import './RegisterPage.css'
import '../login/LoginPage.css'

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.auth );
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            first_name: Yup.string().required('This field is required'),
            last_name: Yup.string().required('This field id required'),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "Username cannot have spaces").required('The username Is Required'),
            email: Yup.string().email('Invalid E-mail').required('The E-mail is required'),
            password: Yup.string().required('The password is required')
        }),
        onSubmit: ( formData ) => {
            const newUser = formData;
            newUser.avatar = "";

            dispatch( startRegister(newUser) )
            if(status === 'authenticated') navigate('/auth/login');
        }
    })

    return (
        <AuthLayout title="Join to Unsplash" >
            <form className="form__register" onSubmit={ formik.handleSubmit }>
                <div className="form__field form__field--fn">
                    <label htmlFor="first_name" className="field__label">First Name</label>
                    <input
                        type="text"
                        className="field__input"
                        name="first_name"
                        placeholder="First Name"
                        onChange={ formik.handleChange }
                        value={ formik.values.first_name }
                    />
                    <div className="error__message">{ formik.errors.first_name }</div>
                </div>

                <div className="form__field form__field--ln">
                    <label htmlFor="last_name" className="field__label">Last Name</label>
                    <input
                        type="text"
                        className="field__input"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={ formik.handleChange }
                        value={ formik.values.last_name }
                    />
                    <div className="error__message">{ formik.errors.last_name }</div>

                </div>

                <div className="form__field">
                    <label htmlFor="email" className="field__label">E-mail</label>
                    <input
                        type="text"
                        className="field__input"
                        name="email"
                        placeholder="E-mail"
                        onChange={ formik.handleChange }
                        value={ formik.values.email }
                    />
                    <div className="error__message">{ formik.errors.email }</div>

                </div>

                <div className="form__field">
                    <label htmlFor="username" className="field__label">Username</label>
                    <input
                        type="text"
                        className="field__input"
                        name="username"
                        placeholder="Username"
                        onChange={ formik.handleChange }
                        value={ formik.values.username }
                    />
                    <div className="error__message">{ formik.errors.username }</div>

                </div>

                <div className="form__field">
                    <label htmlFor="password" className="field__label">Password</label>
                    <input
                        type="password"
                        className="field__input"
                        name="password"
                        placeholder="Password"
                        onChange={ formik.handleChange }
                        value={ formik.values.password }
                    />
                    <div className="error__message">{ formik.errors.password }</div>

                    <Link to="/auth/login" className="field__link" >I already have an account, Sign In</Link>
                </div>

                <input
                    type="submit"
                    className="form__submit form__submit--register"
                    value="Sign Up"
                    disabled={ (status === 'checking' ? true : false) }
                />
            </form>
        </AuthLayout>
    )
}

function initialValues() {
    return {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    }
}