import { usePage } from "@inertiajs/react";
import Submitted from "@/Components/Attendances/Submitted";
import SubmitAttendance from "@/Components/Attendances/Submit";

export default function IndexAttendance() {
    const { submitted } = usePage().props;

    if (submitted) {
        return <Submitted />;
    } else {
        return <SubmitAttendance />;
    }
}
