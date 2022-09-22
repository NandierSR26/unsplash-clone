import { Image } from './image';
import './gallery.css';

export const Gallery = ({ images }) => {

    return (
        <div className="gallery">
            {
                images.map((image) => (
                    <Image
                        key={image._id}
                        image={image}
                    />
                ))
            }
        </div >
    )
}
