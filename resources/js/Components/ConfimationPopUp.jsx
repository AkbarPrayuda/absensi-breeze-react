export const ConfirmationPopUp = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg">
                <p>{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={onConfirm}
                    >
                        Konfirmasi
                    </button>
                    <button
                        className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={onCancel}
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};
