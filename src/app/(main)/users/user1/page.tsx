import { Breadcrumb } from "@/components/shared/Breadcrumb";
import TextEditor from "@/components/shared/text-editor/TextEditor";

export default function User1Page() {
    return (
        <div>
            <Breadcrumb items={ [{ label: 'Users', href: '/users' }, { label: 'User1', href: '/users/user1' }] } />
            <TextEditor name="text-editor" />
        </div>
    )
}
