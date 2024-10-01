import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Notification from "@/Components/Notification";
import { useState } from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { SelectBox } from "@/Components/SelectBox";

export default function UserCreate({ user, auth }) {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.name,
        role: user.role,
        email: user.email,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("users.update", user.id), {
            onSuccess: () => {
                reset("password", "password_confirmation");
                setNotificationMessage("User update successfully!");
                setShowNotification(true);
                setTimeout(() => {
                    router.visit(route("users.index"));
                }, 500);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Create User
                </h1>
            }
        >
            <Head title="Create user" />

            {showNotification && (
                <Notification
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    type="success"
                />
            )}

            <main className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <header className="w-full mb-8 md:w-1/2">
                                <h2 className="mb-3 text-xl font-semibold">
                                    Edit User
                                </h2>
                                <p className="mb-6 text-sm text-gray-600">
                                    Edit user details
                                </p>
                            </header>
                            <form
                                onSubmit={handleSubmit}
                                className="w-full md:w-1/2"
                            >
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="block w-full mt-1"
                                        placeholder="Enter user's full name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        autoFocus
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="role" value="Role" />
                                    <SelectBox
                                        id="role"
                                        currentValue={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        options={[
                                            { value: "admin", label: "Admin" },
                                            { value: "user", label: "User" },
                                        ]}
                                    />
                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="block w-full mt-1"
                                        placeholder="Enter user's email address"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        className="block w-full mt-1"
                                        placeholder="Enter user's password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Password Confirmation"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        className="block w-full mt-1"
                                        placeholder="Confirm user password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <PrimaryButton disabled={processing}>
                                    {processing ? "Submitting..." : "Submit"}
                                </PrimaryButton>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
