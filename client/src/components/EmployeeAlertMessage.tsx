import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeAlertMessage: React.FC = () => {
    useEffect(() => {
        notifyError();
    }, []);

    const notifyError = () => toast.error("Dans le cas où la date limite d'une tâche est proche, un e-mail vous sera envoyé à titre de rappel");

    return (
        <ToastContainer />
    );
}

export default EmployeeAlertMessage;
