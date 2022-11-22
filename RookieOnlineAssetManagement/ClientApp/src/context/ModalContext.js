import { useState, createContext } from "react";

const ModalContext = createContext()

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
        handleFunction: null
    });

    const HandleSetModalData = (data) => {
        HandleShowOverlay(data.isShowModal)
        setModalData(data)
    }

    const HandleShowOverlay = (isShowModal) => {
        const overlay = document.querySelector('.overlay')

        if (overlay) {
            if (isShowModal)
                overlay.classList.add('show')
            else
                overlay.classList.remove('show')
        }
    }

    const value = {
        modalData,
        HandleSetModalData
    }
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider } 