import {useState} from 'react'
import {AdminPropertiesTab} from '../components/admin/AdminPropertiesTab.tsx'
import {AdminBookingsTab} from '../components/admin/AdminBookingsTab.tsx'
import {AdminUsersTab} from '../components/admin/AdminUsersTab.tsx'

type Tab = 'properties' | 'bookings' | 'users'

const TABS: { id: Tab; label: string }[] = [
    {id: 'properties', label: 'Properties'},
    {id: 'bookings', label: 'Bookings'},
    {id: 'users', label: 'Users'},
]

const Admin = () => {
    const [activeTab, setActiveTab] = useState<Tab>('properties')

    return (
        <div className="container py-7">
            <div className="mb-6">
                <div className="eyebrow eyebrow-rule mb-3">Admin dashboard</div>
                <h1 className="fw-semibold tracking-tight mb-2" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                    Moderation
                </h1>
                <p className="text-bone-muted mb-0" style={{fontSize: "0.9375rem"}}>
                    Manage every listing, booking, and account on the platform.
                </p>
            </div>

            <div className="hairline-bottom mb-5 d-flex gap-4">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        className={`tab-link btn btn-link p-0 pb-3 fw-medium${activeTab === tab.id ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'properties' && <AdminPropertiesTab/>}
            {activeTab === 'bookings' && <AdminBookingsTab/>}
            {activeTab === 'users' && <AdminUsersTab/>}
        </div>
    )
}

export default Admin
