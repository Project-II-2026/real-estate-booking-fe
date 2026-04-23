import { useState } from "react";
import { Route, Routes, Link } from "react-router";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { PublicRoute } from "./components/PublicRoute.tsx";

import { AboutModal } from "./components/AboutModal.tsx";
import { ContactModal } from "./components/ContactModal.tsx";
import { TermsModal } from "./components/TermsModal.tsx";

function App() {
    const [showAbout, setShowAbout] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    return (
        <div data-bs-theme="dark" className="d-flex flex-column min-vh-100 bg-body text-body position-relative">
            
            {/* Global Header */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom py-3">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/">
                        RealEstateBooking
                    </Link>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register onOpenTerms={() => setShowTerms(true)} />} />
                    </Route>
                </Routes>
            </main>

            {/* Global Footer */}
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

        </div>
    );
}

export default App;