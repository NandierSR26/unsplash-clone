import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import * as Yup from 'yup'
import { startLogin } from '../../../store/auth/thunks'


export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.auth );


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid E-mail').required('The E-mail is required'),
            password: Yup.string().required('The password is required')
        }),
        onSubmit: ( formData ) => {
            dispatch( startLogin(formData) )
        }
    })

    return (
        <AuthLayout title="Log In" >
            <form className="form__login" onSubmit={ formik.handleSubmit }>
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
                    <Link to="/auth/register" className="field__link" >You don't have an account? Sign up</Link>
                </div>

                <input 
                    type="submit" 
                    className="form__submit"
                    value="Log In" 
                    disabled={ (status === 'checking' ? true : false) }
                />
            </form>
        </AuthLayout>
    )
}

function initialValues() {
    return {
        email: '',
        password: '',
    }
}
