import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import './ModalCustom.css'

const ModalCustom = (props) => {
    const {
        isShowModal,
        title,
        content,
        isShowButtonCloseIcon,
        isShowButtonFunction,
        isShowButtonClose,
        contentButtonFunction,
        contentButtonClose,
        handleFunction
    } = props.modalData;

    const modalContext = useContext(ModalContext)

    function HandleCloseModal() {
        const newData = {
            isShowModal: false,
            title,
            content,
            isShowButtonCloseIcon,
            isShowButtonFunction,
            isShowButtonClose,
            contentButtonFunction,
            contentButtonClose,
            handleFunction
        }
        modalContext.HandleSetModalData(newData)
    }

    return (
        <React.Fragment>
            <div className={`custom-modal ${isShowModal ? "show" : ""}`}>
                <div className="modal-header">
                    <span className="modal-header__title" dangerouslySetInnerHTML={{ __html: title }}></span>
                    {isShowButtonCloseIcon ? <i className="bi bi-x-square btn-close-modal" onClick={HandleCloseModal}></i> : ""}
                </div>
                <div className="modal-content">
                    <div className="modal-content-wrap" dangerouslySetInnerHTML={{ __html: content }} >

                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        {isShowButtonFunction ? <button className="btn btn-primary" onClick={handleFunction}>{contentButtonFunction}</button> : <div></div>}
                        {isShowButtonClose ? <button className="btn btn-outline-secondary" onClick={HandleCloseModal}>{contentButtonClose}</button> : ""}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};



export default ModalCustom;
