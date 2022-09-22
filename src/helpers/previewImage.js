
export const previewImage = ( file, element ) => {
    let reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onload = function() {
        let image = document.querySelector(`.${element}`)
        image.src = reader.result
    }
}