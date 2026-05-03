import * as React from "react";

interface Props { show: boolean; onClose: () => void; }

export const TermsModal: React.FC<Props> = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <div className="modal show d-block bg-dark bg-opacity-75" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content bg-body text-body border-secondary shadow-lg">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">Terms of Service & Privacy Policy</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <h6 className="fw-bold text-primary mb-3">1. Terms of Service</h6>
                        <p className="text-secondary small mb-4">Welcome to RealEstateBooking. By accessing our application, you agree to be bound by these terms. You are responsible for ensuring that your account information is accurate and secure.</p>
                        <h6 className="fw-bold text-primary mb-3">2. Privacy Policy</h6>
                        <p className="text-secondary small mb-4">Your privacy is critically important to us. We collect necessary information such as your name, email, and phone number solely for the purpose of facilitating secure property bookings.</p>
                    </div>
                    <div className="modal-footer border-secondary">
                        <button type="button" className="btn btn-primary px-4" onClick={onClose}>I Understand</button>
                    </div>
                </div>
            </div>
        </div>
    );
};