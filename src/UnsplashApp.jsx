import React from 'react'
import { HashRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store'
import { ToastContainer } from 'react-toastify'

export const UnsplashApp = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <AppRouter />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </HashRouter>
        </Provider>
    )
}
