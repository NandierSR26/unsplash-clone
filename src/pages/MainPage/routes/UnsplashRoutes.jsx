import { Navigate, Route, Routes } from 'react-router-dom'
import { AccountPage } from '../AccountPage/AccountPage'
import { Home } from '../Home'
import { ProfilePage } from '../ProfilePage/ProfilePage'
import { SearchResults } from '../search/SearchResults'

export const UnsplashRoutes = () => {

    return (
        <Routes>
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/search/:term" element={<SearchResults />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
