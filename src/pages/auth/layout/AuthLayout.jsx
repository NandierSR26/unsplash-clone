import './authLayout.css'

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <section className="auth-page">

            <div className="form__container">
                <div className="form__header">
                    <p className="form__title">{title}</p>
                </div>
                {children}
            </div>
        </section>
    )
}
