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

export const ContactModal: React.FC<Props> = ({show, onClose}) => {
    if (!show) return null;
    return (
        <div className="modal show d-block" tabIndex={-1} style={BACKDROP_STYLE} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-start">
                        <div>
                            <div className="eyebrow mb-1">Contact</div>
                            <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                Get in touch.
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
                        <p className="text-bone-muted mb-4" style={{fontSize: "0.9375rem", lineHeight: 1.6}}>
                            Questions, listings, partnerships — we read every message.
                        </p>

                        <div className="d-flex flex-column gap-3">
                            <div>
                                <div className="eyebrow mb-1">Email</div>
                                <a href="mailto:hello@estatly.ro" className="fw-medium" style={{fontSize: "0.9375rem"}}>
                                    hello@estatly.ro
                                </a>
                            </div>
                            <div className="hairline-top pt-3">
                                <div className="eyebrow mb-1">Phone</div>
                                <div className="fw-medium" style={{fontSize: "0.9375rem"}}>
                                    +40 372 000 000
                                </div>
                                <div className="text-bone-faint small mt-1">
                                    Mon–Fri, 9:00 – 17:00 EEST
                                </div>
                            </div>
                            <div className="hairline-top pt-3">
                                <div className="eyebrow mb-1">Office</div>
                                <address className="fw-medium mb-0" style={{fontStyle: "normal", fontSize: "0.9375rem", lineHeight: 1.6}}>
                                    Str. Memorandumului 28<br/>
                                    Cluj-Napoca, 400114<br/>
                                    România
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
