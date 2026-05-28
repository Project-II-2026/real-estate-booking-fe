import {useState} from 'react'
import type {User} from '../../models/user.types.ts'
import {useAdminDeleteUser, useAdminUsers} from '../../hooks/useUsers.ts'
import {useAuth} from '../../hooks/useAuth.ts'
import {AdminPagination} from './AdminPagination.tsx'
import {ConfirmDeleteModal} from './ConfirmDeleteModal.tsx'

const PAGE_SIZE = 20

const formatDate = (iso: string | null | undefined) => {
    if (!iso) return '—'
    const date = new Date(iso)
    return Number.isNaN(date.getTime())
        ? '—'
        : new Intl.DateTimeFormat(undefined, {dateStyle: 'medium'}).format(date)
}

export const AdminUsersTab = () => {
    const {user: currentUser} = useAuth()
    const [page, setPage] = useState(1)
    const [deleting, setDeleting] = useState<User | null>(null)

    const {data, isLoading, isError, error} = useAdminUsers({page, pageSize: PAGE_SIZE})

    const {
        mutate: deleteUser,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError,
        reset: resetDelete,
    } = useAdminDeleteUser()

    const handleConfirmDelete = () => {
        if (!deleting) return
        deleteUser(deleting.id, {onSuccess: () => setDeleting(null)})
    }

    const handleCloseDelete = () => {
        if (!isDeleting) {
            setDeleting(null)
            resetDelete()
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
                <div>
                    <div className="eyebrow mb-2">All users</div>
                    <h2 className="fw-medium tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                        Accounts
                    </h2>
                </div>
                {data && (
                    <span className="text-bone-muted small">
                        {data.totalCount} total
                    </span>
                )}
            </div>

            {isLoading && (
                <div className="text-center py-7">
                    <div className="spinner-border text-bone-muted" role="status">
                        <span className="visually-hidden">Loading…</span>
                    </div>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger">
                    {error?.message ?? 'Failed to load users.'}
                </div>
            )}

            {!isLoading && !isError && data && (
                <>
                    <div className="surface">
                        <div className="d-none d-md-grid px-4 py-3 hairline-bottom"
                             style={{gridTemplateColumns: "1.5fr 2fr 1fr 1.2fr 1fr"}}>
                            <div className="eyebrow">Username</div>
                            <div className="eyebrow">Email</div>
                            <div className="eyebrow">Role</div>
                            <div className="eyebrow">Joined</div>
                            <div className="eyebrow text-end">Actions</div>
                        </div>

                        {data.items.length === 0 ? (
                            <div className="text-center text-bone-muted py-6">
                                No users found.
                            </div>
                        ) : (
                            data.items.map((u, idx) => {
                                const isSelf = currentUser?.id === u.id
                                return (
                                    <div
                                        key={u.id}
                                        className={`px-4 py-3 d-md-grid d-flex flex-column gap-2${idx < data.items.length - 1 ? ' hairline-bottom' : ''}`}
                                        style={{gridTemplateColumns: "1.5fr 2fr 1fr 1.2fr 1fr"}}
                                    >
                                        <div className="text-truncate fw-medium" style={{color: "var(--bone)"}}>
                                            {u.username}
                                        </div>
                                        <div className="text-bone-muted small text-truncate">
                                            {u.email}
                                        </div>
                                        <div className="text-bone-muted small">
                                            {u.role}
                                        </div>
                                        <div className="text-bone-muted small">
                                            {formatDate(u.createdAt)}
                                        </div>
                                        <div className="d-flex gap-2 justify-content-md-end">
                                            {isSelf ? (
                                                <span className="small text-bone-faint align-self-center" title="You cannot delete your own account">
                                                    Current user
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm fw-medium"
                                                    style={{
                                                        background: "transparent",
                                                        color: "var(--danger)",
                                                        border: "1px solid var(--hairline-strong)",
                                                    }}
                                                    onClick={() => setDeleting(u)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    <AdminPagination
                        page={data.page}
                        totalPages={data.totalPages}
                        hasNextPage={data.hasNextPage}
                        hasPreviousPage={data.hasPreviousPage}
                        onChange={setPage}
                    />
                </>
            )}

            {deleting && (
                <ConfirmDeleteModal
                    title="Delete user?"
                    description={
                        <>
                            <p className="mb-2">
                                You're about to permanently delete <strong>{deleting.username}</strong> ({deleting.email}).
                            </p>
                            <p className="mb-2">
                                This will cascade and remove:
                            </p>
                            <ul className="mb-2 ps-3">
                                <li>All their refresh tokens (active sessions invalidated)</li>
                                <li>All properties they own — along with each property's images, bookings, and reviews</li>
                                <li>All bookings they made as a visitor</li>
                                <li>All reviews they wrote</li>
                            </ul>
                            <p className="mb-0">
                                This is the most destructive action in the system and cannot be undone.
                            </p>
                        </>
                    }
                    confirmLabel="Delete user"
                    isPending={isDeleting}
                    isError={isDeleteError}
                    error={deleteError}
                    onConfirm={handleConfirmDelete}
                    onClose={handleCloseDelete}
                />
            )}
        </div>
    )
}
