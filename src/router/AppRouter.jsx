import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { AuthRoutes } from "../pages/auth/routes/AuthRoutes"
import { UnsplashRoutes } from "../pages/MainPage/routes/UnsplashRoutes"
import { useEffect } from "react"
import { checkAuthToken } from "../store/auth/thunks"
import { Home } from "../pages/MainPage/Home"
import { ProfilePage } from "../pages/MainPage/ProfilePage/ProfilePage"
import { SearchResults } from "../pages/MainPage/search/SearchResults"

export const AppRouter = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthToken())
    }, [])

    if (status === 'checking') {
        return <h1>loading...</h1>
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? (
                        <>
                            <Route path="/*" element={<UnsplashRoutes />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/auth/*" element={<AuthRoutes />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                            <Route path="/:username" element={<ProfilePage />} />
                            <Route path="/search/:term" element={<SearchResults />} />
                        </>
                    )
            }


        </Routes>
    )
}
