import React, { useContext, useState } from 'react';
import './ModalChangePassword.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import axios from 'axios';
import { ModalContext } from '../../context/ModalContext';

const ModalChangePassword = () => {
    const modalContext = useContext(ModalContext)


    const [errorMsg, setErrorMsg] = useState("");

    const passwordSchema = yup.object().shape({
        oldPassword: yup.string().required('Please enter your old password.'),
        newPassword: yup.string()
            .required('Please enter your new password.'),
        confirmPassword: yup.string().required('Please enter confirm password.').oneOf([yup.ref('newPassword'), null], 'Confirm password must match')
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(passwordSchema),
    });


    const HandleTypingFormInput = (event) => {
        const btnSubmit = document.querySelector("#form-changePassword button[type='submit']");
        const formPassword = document.querySelector('#form-changePassword')
        formPassword && formPassword.addEventListener('input', function () {
            setErrorMsg("");
            if (formPassword.oldPassword.value.length > 0 &&
                formPassword.newPassword.value.length > 0 &&
                formPassword.confirmPassword.value.length > 0) {
                btnSubmit.removeAttribute('disabled')
            }
            else
                btnSubmit.setAttribute('disabled', 'disabled')

        })
    }

    const onSubmit = data => {
        reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        })

        const payload = {
            OldPassword: data.oldPassword,
            NewPassword: data.newPassword
        }
        axios.post("/api/Users/ChangePassword", payload)
            .then((res) => {
                // Remove changed password modal
                const modalChangePassword = document.querySelector('.modal-ChangePassword');
                modalChangePassword && modalChangePassword.classList.remove('show')

                // Show alert modal
                const newDataModal = {
                    isShowModal: true,
                    title: 'Change password',
                    content: 'Your password has been changed successfully!',
                    isShowButtonCloseIcon: false,
                    isShowButtonClose: true,
                    isShowButtonFunction: false,
                    contentButtonFunction: '',
                    contentButtonClose: 'Close',
                    handleFunction: null
                }
                modalContext.HandleSetModalData(newDataModal)
            })
            .catch(res => {
                setErrorMsg(res.response.data);
            });
    };

    function HandleCloseModal(event) {
        // If form have any errors then unabled close modal
        if (Object.keys(errors).length > 0)
            return;

        const wrapModal = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        wrapModal.classList.contains('modal-ChangePassword') && wrapModal.classList.remove("show");

        setErrorMsg("");
        reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        })
    }


    function HandleShowPassword(event) {
        const inputPassword = event.target.parentNode.querySelector('.form-control');
        const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        inputPassword.setAttribute('type', type);

        event.target.classList.toggle('bi-eye-slash-fill');
    }

    return (
        <React.Fragment>
            <div className="modal-ChangePassword">
                <div className="modal-header">
                    <h5 className="modal-header__title m-0">Change password</h5>
                </div>
                <div className="modal-content">
                    <form id='form-changePassword' onSubmit={handleSubmit(onSubmit)} onInput={HandleTypingFormInput}>
                        <div className="row mb-3 align-items-center">
                            <div className="col-5 p-0">
                                <label htmlFor="old-password" className="form-label_custom">Old password</label>
                            </div>
                            <div className="col-7 pe-0 position-relative">
                                <input type="password" id="old-password" className={`form-control form-control_custom ${errors.oldPassword ? "form-control_error" : ""}`} {...register("oldPassword")} />
                                <i className="bi bi-eye-fill input-password_icon" onClick={HandleShowPassword}></i>
                            </div>
                            <div className='col-5'></div> <div className='col-7'>
                                <small className='text-danger'>{errors.oldPassword?.message} {errorMsg}</small>
                            </div>

                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-5 p-0">
                                <label htmlFor="cur-password" className="form-label_custom">New password</label>
                            </div>
                            <div className="col-7 pe-0 position-relative">
                                <input type="password" id="cur-password" className={`form-control form-control_custom ${errors.newPassword ? "form-control_error" : ""}`} {...register("newPassword")} />
                                <i className="bi bi-eye-fill input-password_icon" onClick={HandleShowPassword}></i>
                            </div>
                            <div className='col-5'></div> <div className='col-7'>
                                <small className='text-danger'>{errors.newPassword?.message}</small>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-5 p-0">
                                <label htmlFor="new-password" className="form-label_custom">Confirm password</label>
                            </div>
                            <div className="col-7 pe-0 position-relative">
                                <input type="password" id="new-password" className={`form-control form-control_custom ${errors.confirmPassword ? "form-control_error" : ""}`} {...register("confirmPassword")} />
                                <i className="bi bi-eye-fill input-password_icon" onClick={HandleShowPassword}></i>
                            </div>
                            <div className='col-5'></div> <div className='col-7'>
                                <small className='text-danger'>{errors.confirmPassword?.message}</small>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="p-0 text-end">
                                <button type='submit' className="btn btn-primary me-4" disabled>Save</button>
                                <button type='button' className="btn btn-outline-secondary" onClick={HandleCloseModal}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};



export default ModalChangePassword;
