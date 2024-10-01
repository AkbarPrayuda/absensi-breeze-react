import React, { useState } from "react";
import { Pagination } from "./Pagination";
import { Link, router, useForm } from "@inertiajs/react";
import { ConfirmationPopUp } from "./ConfimationPopUp";
import Notification from "./Notification";

const Table = ({ data, theads = [], routeName, tbody = [], edit = false }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { delete: destroy } = useForm({});

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmation(true);
    };

    const onConfirmDelete = () => {
        destroy(route(`${routeName}.destroy`, deleteId), {
            preserveState: true,
            preserveScroll: true,

            onSuccess: () => {
                setShowConfirmation(false);

                setShowNotification(true);
                setTimeout(() => {
                    router.visit(route(`${routeName}.index`));
                }, 500);
            },
        });
        setShowConfirmation(false);
    };

    const onCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            {showNotification && (
                <Notification
                    message="Data berhasil dihapus!"
                    type="success"
                    onClose={() => setShowNotification(false)}
                />
            )}
            {showConfirmation && (
                <ConfirmationPopUp
                    message="Apakah anda yakin ingin menghapus data ini?"
                    onConfirm={onConfirmDelete}
                    onCancel={onCancelDelete}
                />
            )}
            <div className="max-h-[500px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHeader theads={theads} />
                    <TableBody
                        data={data.data}
                        handleDelete={handleDelete}
                        tbody={tbody}
                        edit={edit}
                    />
                </table>
                <div className="sticky bottom-0 flex justify-between py-2 mt-4 bg-white">
                    <Pagination links={data.links} />
                </div>
            </div>
        </>
    );
};

export default Table;

// TableHeader.jsx
const TableHeader = ({ theads }) => (
    <thead className="sticky top-0 z-10 bg-gray-50">
        <tr>
            {theads.map((thead, index) => (
                <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                    {thead}
                </th>
            ))}
        </tr>
    </thead>
);

// TableBody.jsx
const TableBody = ({ data, handleDelete, tbody, edit }) => (
    <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
            <tr
                key={rowIndex}
                className="transition-colors duration-200 hover:bg-gray-50 even:bg-gray-100"
            >
                {tbody.map((field, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                        {field.includes(".")
                            ? field
                                  .split(".")
                                  .reduce((obj, key) => obj && obj[key], row)
                            : row[field]}
                    </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                    {edit && (
                        <span>
                            <Link
                                href={`/users/${row.id}/edit`}
                                className="text-yellow-600"
                            >
                                Edit
                            </Link>{" "}
                            |{" "}
                        </span>
                    )}
                    <button
                        className="text-red-600"
                        onClick={() => handleDelete(row.id)}
                    >
                        Hapus
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
);
