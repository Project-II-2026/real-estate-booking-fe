import * as React from "react";

interface Props {
    show: boolean;
    onClose: () => void;
}

const BACKDROP_STYLE: React.CSSProperties = {
    backgroundColor: "rgba(10, 9, 7, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
};

export const TermsModal: React.FC<Props> = ({show, onClose}) => {
    if (!show) return null;
    return (
        <div className="modal show d-block" tabIndex={-1} style={BACKDROP_STYLE} onClick={onClose}>
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-start">
                        <div>
                            <div className="eyebrow mb-1">Legal</div>
                            <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                Terms &amp; Privacy
                            </h2>
                        </div>
                        <button
                            type="button"
                            className="icon-btn"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <i className="bi bi-x-lg"/>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="eyebrow eyebrow-rule mb-3">N°01 / Terms of service</div>
                        <p className="text-bone-muted mb-5" style={{fontSize: "0.9375rem", lineHeight: 1.65}}>
                            Welcome to Estatly. By accessing the platform you agree to be bound
                            by these terms. You are responsible for ensuring that your account
                            information is accurate and secure.
                        </p>

                        <div className="eyebrow eyebrow-rule mb-3">N°02 / Privacy policy</div>
                        <p className="text-bone-muted mb-0" style={{fontSize: "0.9375rem", lineHeight: 1.65}}>
                            Your privacy is important to us. We collect only what is necessary —
                            name, email, phone — solely for the purpose of facilitating secure
                            property bookings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
