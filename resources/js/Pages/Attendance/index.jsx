import Table from "@/Components/Table";
import AuthenticatedLayouts from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AttendanceIndex({ auth, attendances }) {
    return (
        <AuthenticatedLayouts
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Attendances
                </h2>
            }
        >
            <Head title="Attendance" />
            <main className="py-12">
                <section className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <article className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <header className="flex items-center justify-between p-3 mb-4 bg-gray-100 rounded-lg">
                                <div>
                                    <h2 className="font-semibold text-blue-600">
                                        Total Attendance:
                                        <span className="ml-2 font-bold text-gray-800">
                                            {attendances.total}
                                        </span>
                                    </h2>
                                </div>
                            </header>
                            <Table
                                data={attendances}
                                theads={[
                                    "Date",
                                    "Status",
                                    "Name",
                                    "Address",
                                    "Action",
                                ]}
                                tbody={[
                                    "created_at",
                                    "status",
                                    "users.name",
                                    "address",
                                ]}
                                routeName={"attendance"}
                            />
                        </div>
                    </article>
                </section>
            </main>
        </AuthenticatedLayouts>
    );
}
