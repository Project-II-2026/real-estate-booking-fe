import * as React from "react";

interface Props { show: boolean; onClose: () => void; }

export const ContactModal: React.FC<Props> = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <div className="modal show d-block bg-dark bg-opacity-75" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-body text-body border-secondary shadow-lg">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">Contact Us</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <p className="text-secondary small mb-4">Have a question or need support with your booking? We're here to help! Reach out to our Cluj-Napoca headquarters.</p>
                        <ul className="list-unstyled small text-secondary mb-0">
                            <li className="mb-3"><strong className="text-body d-block">Email Support</strong> support@realestatebooking.ro</li>
                            <li className="mb-3">
                                <strong className="text-body d-block">Phone</strong> 
                                +40 (0) 264 123 456<br />
                                <small className="text-muted">Mon-Fri, 9:00 AM - 5:00 PM (EEST)</small>
                            </li>
                            <li><strong className="text-body d-block">Headquarters</strong> Cluj-Napoca, Romania</li>
                        </ul>
                    </div>
                    <div className="modal-footer border-secondary">
                        <button type="button" className="btn btn-primary px-4 w-100" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};