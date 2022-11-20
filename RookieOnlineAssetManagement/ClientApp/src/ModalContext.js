import { useState, createContext } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [modalData, setModalData] = useState({
        isShowModal: false,
        title: "",
        content: "",
        isShowButtonCloseIcon: false,
        isShowButtonClose: false,
        isShowButtonFunction: true,
        contentButtonClose: "Cancel",
        contentButtonFunction: "OK",
        handleFunction: null,
    });

    const HandleSetModalData = (data) => {
        setModalData(data);
    };

    const value = {
        modalData,
        HandleSetModalData,
    };
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}

export { ModalContext, ModalProvider };
