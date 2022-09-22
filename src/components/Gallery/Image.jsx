import { useState } from 'react';
import './gallery.css'
import { ImageHover } from './ImageHover';

export const Image = ({ image }) => {

    const { image:img, title, user } = image;
    const [hover, setHover] = useState(false)

    const handleHover = () => {
        setHover(true);
    }

    const handleExit = () => {
        setHover(false);
    }

    return (
        <div className="gallery-img">
            <img
                src={`${img}`}
                className="gallery-img__image"
                onMouseEnter={handleHover}
                onMouseOut={ handleExit }
            />

            {
                ( hover ) ? <ImageHover image={ image } visibility={ 'visible' }/> : <ImageHover image={ image } visibility={ 'hidden' }/>
            }
        </div>
    )
}
