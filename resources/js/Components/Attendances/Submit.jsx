import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { SelectBox } from "@/Components/SelectBox";
import { Transition } from "@headlessui/react";
import TextInput from "../TextInput";
import Notification from "../Notification";
import axios from "axios";

export default function SubmitAttendance({ auth }) {
    const [status, setStatus] = useState(false);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const { data, setData, post, processing, errors, transform } = useForm({
        status: "attend",
        description: "",
        latitude: "",
        longitude: "",
        address: "",
        prepareData: {},
    });

    const getAddress = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/reverse",
                {
                    params: {
                        format: "jsonv2",
                        lat: latitude,
                        lon: longitude,
                    },
                }
            );
            return response.data.display_name;
        } catch (err) {
            console.error("Error fetching address:", err);
            return "Alamat tidak dapat ditemukan";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            navigator.geolocation.getCurrentPosition(
                async function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const address = await getAddress(latitude, longitude);
                    setData("prepareData", {
                        latitude,
                        longitude,
                        address,
                    });
                },
                function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            );
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    };

    useEffect(() => {
        if (
            data.prepareData.hasOwnProperty("latitude") &&
            data.prepareData.hasOwnProperty("longitude") &&
            data.prepareData.hasOwnProperty("address")
        ) {
            transform((data) => ({
                ...data.prepareData,
                status: data.status,
                description: data.description,
            }));
            post(route("attendance.store"), {
                onSuccess: () => {
                    setNotificationMessage("Attendance created successfully!");
                    setShowNotification(true);
                    setTimeout(() => {
                        router.visit(route("dashboard"));
                    }, 500);
                },
            });
        }
    }, [data.prepareData]);

    useEffect(() => {
        if (data.status === "attend") {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }, [data.status]);

    return (
        <>
            {showNotification && (
                <Notification type="success" message={notificationMessage} />
            )}
            <form onSubmit={handleSubmit} className="w-full md:w-1/2">
                <div className="mb-4">
                    <InputLabel
                        htmlFor="status"
                        value="Silahkan lakukan absensi"
                    />
                    <SelectBox
                        id="status"
                        currentValue={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        options={[
                            { value: "attend", label: "Hadir" },
                            { value: "leave", label: "Cuti" },
                            { value: "sick", label: "Sakit" },
                            { value: "permit", label: "Izin" },
                            {
                                value: "business_trip",
                                label: "Perjalanan Dinas",
                            },
                            {
                                value: "remote",
                                label: "Kerja Remote (Diluar Kantor)",
                            },
                        ]}
                        className="w-full mt-1"
                    />
                </div>

                <Transition
                    show={status}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div className="mb-4">
                        <InputLabel htmlFor="description" value="Deskripsi" />
                        <TextInput
                            id="description"
                            type="text"
                            className="block w-full mt-1"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        <InputError message={errors.description} />
                    </div>
                </Transition>

                <PrimaryButton disabled={processing}>
                    {processing ? "Submitting..." : "Submit"}
                </PrimaryButton>
            </form>
        </>
    );
}
