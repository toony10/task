import { Breadcrumb } from "@/components/shared/Breadcrumb";

export default function User1Page() {
    return (
        <div>
            <Breadcrumb items={ [{ label: 'Users', href: '/users' }, { label: 'User1', href: '/users/user1' }] } />
        </div>
    )
}
