import { useState, useEffect } from "react";
import { subscribe, unsubscribe, SHOW_TOAST } from "../utils/Event";
import Toast from "./Toast";

const ToastManager = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(null);

  useEffect(() => {
    subscribe(SHOW_TOAST, handleShowToast);

    return () => unsubscribe(SHOW_TOAST, handleShowToast);
  }, []);

  const handleShowToast = (event) => {
    setShowToast(true);
    setMessage(event.detail.message);
    setType(event.detail.type);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return <>{showToast && <Toast message={message} type={type} closeCallback={() => setShowToast(false)} />};</>;
};

export default ToastManager;
