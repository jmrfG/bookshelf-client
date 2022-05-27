import React, { createContext, useContext, useState } from 'react';


const Context = createContext({})

const Provider = ({ children }) => {
    const [modalState, setState] = useState({ visible: false })
    const openModal = (payload) => setState({ ...payload, visible: true })
    const closeModal = () => setState({ visible: false })
    return (<Context.Provider value={{ modalState, openModal, closeModal }}>
        {children}
    </Context.Provider>);
};


const useThisContext = () => {
    const context = useContext(Context);
    return context;
}

export { useThisContext, Provider }