import {useState} from "react";
import {Outlet, useLocation} from "react-router";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {SideNav} from "./SideNav.tsx";
import {AboutModal} from "../modals/AboutModal.tsx";
import {ContactModal} from "../modals/ContactModal.tsx";
import {TermsModal} from "../modals/TermsModal.tsx";

const Layout = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showSideNav, setShowSideNav] = useState(false);

    const location = useLocation();

    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/register";

    return (
        <div
            data-bs-theme="dark"
            className="d-flex flex-column min-vh-100 bg-ink text-bone"
        >
            {!isAuthPage && (
                <Header onOpenSideNav={() => setShowSideNav(true)}/>
            )}

            <main className="flex-grow-1 d-flex flex-column">
                <Outlet/>
            </main>

            <Footer
                onOpenAbout={() => setShowAbout(true)}
                onOpenContact={() => setShowContact(true)}
                onOpenTerms={() => setShowTerms(true)}
            />

            <SideNav show={showSideNav} onClose={() => setShowSideNav(false)}/>

            <AboutModal show={showAbout} onClose={() => setShowAbout(false)}/>
            <ContactModal show={showContact} onClose={() => setShowContact(false)}/>
            <TermsModal show={showTerms} onClose={() => setShowTerms(false)}/>
        </div>
    );
};

export default Layout;
