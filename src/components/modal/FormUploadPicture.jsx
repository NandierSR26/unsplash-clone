import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal'
import { onCloseModal } from '../../store/ui/uiSlice';
import './FormUploadPicture.css'
import { startNewPicture } from '../../store/pictures/thunks';
import { previewImage } from '../../helpers/previewImage';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
    },
};

Modal.setAppElement('#root');

export const FormUploadPicture = () => {

    const [picture, setPicture] = useState(null);
    const { modalOpen } = useSelector(state => state.ui)
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(onCloseModal())
        setPicture(null)
        formik.values.title = ''
    }

    const changeImage = (e) => {
        const element = "img__preview"
        setPicture(e.target.files[0]);
        previewImage(e.target.files[0], element)
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            title: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "The picture's  title can't have spaces, use hyphens").required("The picture's title is required"),
        }),
        onSubmit: (data) => {
            if (!picture) {
                toast.error('You must upload a picture')
            } else {
                dispatch(startNewPicture(data.title, picture))
                setPicture(null)
                formik.values.title = ''

            }
        }
    })

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >


            <form className="container" onSubmit={formik.handleSubmit}>
                <p className="title">Upload your image</p>
                <p className="subtitle">File should be Jpeg, Png...</p>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="picture__title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <div className="error__message">{formik.errors.title}</div>

                <div className="image-input">
                    {
                        (!picture)
                            ? (
                                <div className="without-img">
                                    <div className="img-placeholder"></div>
                                    <div className="text-placeholder">
                                        <p>
                                            Drag & Drop your image here
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <img src="" alt="" className="img__preview" />
                            )
                    }

                    <input
                        type="file"
                        className="drag-file"
                        name="picture"
                        onChange={e => {
                            changeImage(e)
                        }}
                    />

                </div>
                <input type="submit" className="submit__upload" value="upload" />
            </form>

        </Modal>
    )
}

function initialValues() {
    return {
        title: '',
    }
}