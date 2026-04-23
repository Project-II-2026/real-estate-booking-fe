import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { AboutModal } from "./AboutModal.tsx";
import { ContactModal } from "./ContactModal.tsx";
import { TermsModal } from "./TermsModal.tsx";

const Layout = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    return (
        <div data-bs-theme="dark" className="d-flex flex-column min-vh-100 bg-body text-body">
            <Header />
            <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <Outlet />
            </main>
            <Footer 
                onOpenAbout={() => setShowAbout(true)}
                onOpenContact={() => setShowContact(true)}
                onOpenTerms={() => setShowTerms(true)}
            />
            <AboutModal show={showAbout} onClose={() => setShowAbout(false)} />
            <ContactModal show={showContact} onClose={() => setShowContact(false)} />
            <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        </div>
    );
};

export default Layout;