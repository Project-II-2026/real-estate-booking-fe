import { TermsModal } from "./TermsModal";
import { AboutModal } from "./AboutModal";
import { ContactModal } from "./ContactModal";
import { useState } from "react";


   

export const Footer = () => {
       const [showAbout, setShowAbout] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    return (
         <>
 
        <footer className="bg-body-tertiary py-4 border-top mt-auto">
            <div className="container">
                <div className="row align-items-center flex-column-reverse flex-md-row">
                    <div className="col-md-6 text-center text-md-start mt-3 mt-md-0 small text-secondary">
                        &copy; {new Date().getFullYear()} RealEstateBooking, Inc. All rights reserved.
                    </div>
                    <div className="col-md-6 text-center text-md-end small">
                        <button onClick={() => setShowAbout(true)} className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline me-3">About Us</button>
                        <button onClick={() => setShowContact(true)} className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline me-3">Contact Us</button>
                        <button onClick={() => setShowTerms(true)} className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline">Policies</button>
                    </div>
                </div>
            </div>
        </footer>
        <AboutModal show={showAbout} onClose={() => setShowAbout(false)} />
            <ContactModal show={showContact} onClose={() => setShowContact(false)} />
            <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        </>

    );

};