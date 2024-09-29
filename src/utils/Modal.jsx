/* eslint-disable react/prop-types */

import ReactDOM from "react-dom";
import { HiOutlineX } from "react-icons/hi";

const Modal = ({ isOpen, onClose, children, title, footer, ...props }) => {
  if (!isOpen) return null;

  // Create a portal to render the modal outside the root div
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96 relative"
        {...props}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <HiOutlineX size={25} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
