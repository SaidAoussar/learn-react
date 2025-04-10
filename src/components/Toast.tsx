
export enum ToastType {
  Success = "success",
  Error = "error",
  Warning = "warning"

}

const colorMap: Record<ToastType, { border: string; text: string }> = {
  [ToastType.Success]: {
    border: "border-green-500",
    text: "text-green-500"
  },
  [ToastType.Error]: {
    border: "border-red-500",
    text: "text-red-500"
  },
  [ToastType.Warning]: {
    border: "border-yellow-500",
    text: "text-yellow-500"
  },
}

type ToastProps = {
  type: ToastType,
  isVisible: boolean,
  message: string,
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ isVisible = true, type = ToastType.Success, message = "success", onClose }) => {
  return <div className={`fixed top-4 right-4 z-50 max-w-sm ${!isVisible && 'hidden'}`}>
    <div className={`flex overflow-hidden rounded-lg border-l-4 ${colorMap[type].border} bg-white shadow-lg`}>
      <div className="flex items-center justify-center bg-green-50 p-3">
        <svg className={`h-6 w-6 ${colorMap[type].text}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-grow px-4 py-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-900">{type}</h3>
          <button className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  </div>
}


export default Toast;