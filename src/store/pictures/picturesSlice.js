import { createSlice } from '@reduxjs/toolkit';

export const picturesSlice = createSlice({
    name: 'pictures',
    initialState: {
        isSaving: false,
        allImages: [],
        imagesByUser: [],
        searchResults: [],
        messageSaved: null
    },
    reducers: {
        savingNewPicture: (state) => {
            state.isSaving = true
        },
        addNewPicture: (state, action) => {
            state.allImages.push(action.payload);
            state.imagesByUser.push(action.payload)
            state.isSaving = false
        },
        setAllImages: (state, action) => {
            state.allImages = action.payload
        },
        setImagesByUser: (state, action) => {
            state.imagesByUser = action.payload
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updatePicture: (state, action) => {
            state.isSaving = false;
            state.allImages = state.allImages.map(image => {
                if (image.id === action.payload.id) {
                    return action.payload
                }

                return image
            })

            state.messageSaved = 'Picture Uploaded Successfully'
        },
        deletePicture: ( state, action ) => {
            state.isSaving = false
            state.allImages = state.allImages.filter( image => image._id !== action.payload )
            state.imagesByUser = state.imagesByUser.filter( image => image._id !== action.payload )
        },
        searchImages: ( state, action ) => {
            state.searchResults = action.payload
        },
        clearImagesLogout: (state, action) => {
            state.isSaving = false
            state.allImages = []
            state.imagesByUser = []
            state.messageSaved = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewPicture,
    addNewPicture,
    setAllImages,
    setImagesByUser,
    setSaving,
    updatePicture,
    deletePicture,
    clearImagesLogout,
    searchImages,
} = picturesSlice.actions;