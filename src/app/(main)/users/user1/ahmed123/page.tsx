import { Breadcrumb } from '@/components/shared/Breadcrumb'
import React from 'react'

export default function Ahmed123Page() {
    return (
        <div>
            <Breadcrumb items={ [{ label: 'Users', href: '/users' }, { label: 'User1', href: '/users/user1' }, { label: 'Ahmed123', href: '/users/user1/ahmed123' }] } />
        </div>
    )
}
