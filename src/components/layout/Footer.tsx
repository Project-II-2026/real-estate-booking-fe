import * as React from "react";

interface FooterProps {
    onOpenAbout: () => void;
    onOpenContact: () => void;
    onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
                                                   onOpenAbout,
                                                   onOpenContact,
                                                   onOpenTerms,
                                               }) => {
    return (
        <footer className="hairline-top py-6 mt-auto" style={{background: '#0A0907'}}>
            <div className="container">
                <div className="row g-5">
                    <div className="col-md-5">
                        <div className="d-flex align-items-baseline mb-3">
                            <span className="fw-semibold tracking-tight" style={{fontSize: "1.125rem"}}>
                                Estatly<span className="moss-dot" aria-hidden="true"/>
                            </span>
                        </div>
                        <p className="text-bone-muted mb-3" style={{maxWidth: "32ch", fontSize: "0.9375rem", lineHeight: 1.55}}>
                            Considered homes across Cluj-Napoca and Transylvania.
                        </p>
                        <address className="text-bone-faint small mb-0" style={{fontStyle: "normal", lineHeight: 1.7}}>
                            Str. Memorandumului 28<br/>
                            Cluj-Napoca, 400114<br/>
                            România
                        </address>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="eyebrow mb-3">Explore</div>
                        <ul className="list-unstyled m-0 d-flex flex-column gap-2">
                            <li>
                                <button onClick={onOpenAbout} className="btn btn-link p-0 link-muted small text-start">
                                    About us
                                </button>
                            </li>
                            <li>
                                <button onClick={onOpenContact} className="btn btn-link p-0 link-muted small text-start">
                                    Contact
                                </button>
                            </li>
                            <li>
                                <button onClick={onOpenTerms} className="btn btn-link p-0 link-muted small text-start">
                                    Terms &amp; Privacy
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-4">
                        <div className="eyebrow mb-3">Contact</div>
                        <ul className="list-unstyled m-0 d-flex flex-column gap-2 small">
                            <li className="text-bone-muted">hello@estatly.ro</li>
                            <li className="text-bone-muted">+40 372 000 000</li>
                        </ul>
                    </div>
                </div>

                <div className="hairline-top mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <span className="text-bone-faint small">
                        &copy; {new Date().getFullYear()} Estatly. All rights reserved.
                    </span>
                    <span className="eyebrow">
                        Made in Cluj
                    </span>
                </div>
            </div>
        </footer>
    );
};
