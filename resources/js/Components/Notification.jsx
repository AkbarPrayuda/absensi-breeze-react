import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case "success":
                return "bg-green-500";
            case "error":
                return "bg-red-500";
            case "warning":
                return "bg-yellow-500";
            default:
                return "bg-blue-500";
        }
    };

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className={`fixed top-4 right-4 max-w-sm w-full ${getBackgroundColor()} text-white rounded-lg shadow-md`}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <p className="text-sm font-medium">{message}</p>
                    <button
                        onClick={() => {
                            setShow(false);
                            onClose();
                        }}
                        className="text-white hover:text-gray-100 focus:outline-none"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </Transition>
    );
};

export default Notification;
