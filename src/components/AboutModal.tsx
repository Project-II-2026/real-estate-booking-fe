import * as React from "react";

interface Props { show: boolean; onClose: () => void; }

export const AboutModal: React.FC<Props> = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <div className="modal show d-block bg-dark bg-opacity-75" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-body text-body border-secondary shadow-lg">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">About Us</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4 text-center">
                        <h6 className="fw-bold mb-3">RealEstateBooking</h6>
                        <p className="text-secondary small mb-0">
                            We are a passionate tech company based in <strong>Cluj-Napoca, Romania</strong>, founded in <strong>2026</strong>. 
                            Our mission is to revolutionize the way people discover and book real estate properties by providing a seamless, secure, and modern digital experience.
                        </p>
                    </div>
                    <div className="modal-footer border-secondary justify-content-center">
                        <button type="button" className="btn btn-primary px-4" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};