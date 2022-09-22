import { useSelector } from "react-redux"
import { Gallery } from "../../../components/Gallery/Gallery"
import { Header } from "../../../components/Header/Header"

export const SearchResults = () => {

    const { searchResults } = useSelector( state => state.pictures )

    return (
        <>
            <Header />
            <Gallery images={ searchResults } />
        </>
    )
}
