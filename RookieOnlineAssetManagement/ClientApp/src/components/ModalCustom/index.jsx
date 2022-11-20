import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ModalContext } from '../../ModalContext';
import './ModalCustom.css'

const ModalCustom = (props) => {
    const modalContext = useContext(ModalContext)

    function HandleCloseModal() {
        const newData = {
            isShowModal: false,
        }
        modalContext.HandleSetModalData(newData)
        
    }

    return (
        <React.Fragment>
            <div className={`custom-modal ${props.modalData.isShowModal ? "show" : ""}`}>
                <div className="modal-header">
                    <span className="modal-header__title">{props.modalData.title}</span>
                    {props.modalData.isShowButtonCloseIcon ? <i className="bi bi-x-square btn-close-modal" onClick={HandleCloseModal}></i> : "" }
                </div>
                <div className="modal-content">
                    <div className="modal-content-wrap">
                        { props.modalData.content }
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        {props.modalData.isShowButtonFunction ? <button className="btn btn-primary" onClick={props.modalData.handleFunction}>{props.modalData.contentButtonFunction}</button> : <div></div>}
                        {props.modalData.isShowButtonClose ? <button className="btn btn-outline-secondary" onClick={HandleCloseModal}>{props.modalData.contentButtonClose}</button> : ""}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};



export default ModalCustom;
