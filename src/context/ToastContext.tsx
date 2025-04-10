import { createContext, ReactNode, useContext, useState } from "react";
import Toast, { ToastType } from "../components/Toast";


type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void
}



const toastContext = createContext<ToastContextType | undefined>(undefined);


export function ToastProvider({ children }: { children: ReactNode }) {

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(ToastType.Success);

  const showToast = (msg: string, type: ToastType = ToastType.Success) => {
    setMessage(msg);
    setType(type);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  }

  return <toastContext.Provider value={{ showToast }}>
    {children}
    <Toast isVisible={isVisible} type={type} message={message} onClose={() => setIsVisible(false)} />
  </toastContext.Provider>
}


export const useToast = () => {
  const context = useContext(toastContext);
  if (!context) {
    throw new Error("useToast must be used within a toastProvider");
  }
  return context;
}


