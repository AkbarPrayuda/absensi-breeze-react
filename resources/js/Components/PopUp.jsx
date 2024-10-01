import React from "react";

export const PopUp = ({ onConfirm, onCancel, message }) => {
    return (
        <div className="fixed top-0 right-0 z-10 m-4">
            <div className="p-4 rounded-lg shadow-lg bg-gray-50">
                <h3 className="mb-2 text-lg font-medium text-red-500">
                    Notification!
                </h3>
                <p className="mb-4 text-gray-700">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 mr-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        Close
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        Confirmation
                    </button>
                </div>
            </div>
        </div>
    );
};
