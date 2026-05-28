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

export const AboutModal: React.FC<Props> = ({show, onClose}) => {
    if (!show) return null;
    return (
        <div className="modal show d-block" tabIndex={-1} style={BACKDROP_STYLE} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-start">
                        <div>
                            <div className="eyebrow mb-1">About</div>
                            <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                Estatly
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
                        <p className="text-bone mb-3" style={{fontSize: "0.9375rem", lineHeight: 1.65}}>
                            A quieter way to find where you live. We list considered
                            architecture across <strong>Cluj-Napoca</strong> and Transylvania.
                        </p>
                        <p className="text-bone-muted small mb-0">
                            Founded in 2026, headquartered in Cluj. We work with architects,
                            owners, and people who care about how a home is made.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
