import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Gallery } from "../../../components/Gallery/Gallery"
import { Header } from "../../../components/Header/Header"
import { startLoadingPictures } from "../../../store/pictures/thunks"
import './Home.css'

export const Home = () => {

    const dispatch = useDispatch()
    const { allImages } = useSelector( state => state.pictures );

    useEffect(() => {
        dispatch(startLoadingPictures())
    }, [])

    return (
        <div>
            <Header />

            <div className="banner">
                <div className="banner__container">
                    <h2 className="banner__title">Unsplash</h2>
                    <p className="banner__subtitle">
                        The Internet's source for free-to-use images.
                        With resources from creators around the world.
                    </p>

                    <form 
                        className="search-input search-input--banner"
                        // onSubmit={handleSubmit}
                    >
                        <span>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input 
                            type="text" 
                            className="input" 
                            name='term'
                            placeholder="Search by name"
                            // onChange={ handleInputChange }
                        />
                    </form>
                </div>
            </div>

            <Gallery images={ allImages } />
        </div>
    )
}
