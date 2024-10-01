import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function UserIndex({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h1>
            }
        >
            <Head title="Users" />

            <main className="py-12">
                <section className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <article className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <header className="flex items-center justify-between p-3 mb-4 bg-gray-100 rounded-lg">
                                <div>
                                    <h2 className="font-semibold text-blue-600">
                                        Total Users:
                                        <span className="ml-2 font-bold text-gray-800">
                                            {users.total}
                                        </span>
                                    </h2>
                                </div>
                                <nav>
                                    <Link href="users/create">
                                        <button className="px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700">
                                            Create User
                                        </button>
                                    </Link>
                                </nav>
                            </header>
                            <Table
                                data={users}
                                theads={[
                                    "ID",
                                    "Name",
                                    "Email",
                                    "Role",
                                    "Action",
                                ]}
                                routeName={"users"}
                                tbody={["id", "name", "email", "role"]}
                                edit={true}
                            />
                        </div>
                    </article>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
