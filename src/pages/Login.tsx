import * as React from "react";
import { useState } from "react";
import { Link } from "react-router"; 
import { useLogin } from "../hooks/useAuthActions.ts";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    const { mutate: login, reset, isPending, isError, error } = useLogin();

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        reset();
        login({ email, password });
    };

    return (
        <div data-bs-theme="dark" className="d-flex flex-column min-vh-100 bg-body text-body position-relative">
            
            {/*HEADER*/}
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom py-3">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/">
                        RealEstateBooking
                    </Link>
                    <div className="d-none d-lg-block">
                        <button 
                            type="button"
                            onClick={() => setShowHelpModal(true)} 
                            className="btn btn-link text-decoration-none text-secondary small p-0 hover-text-white"
                        >
                            Need help?
                        </button>
                    </div>
                </div>
            </nav>

            {/*MAIN CONTENT*/}
            <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="w-100" style={{ maxWidth: 450 }}>

                    <div className="text-center mb-4">
                        <h1 className="fs-3 fw-semibold mb-1">Welcome back</h1>
                        <p className="text-secondary mb-0">Sign in to manage your bookings.</p>
                    </div>

                    <div className="card shadow-lg border-secondary px-4 py-5 mx-3" style={{ borderRadius: '1rem' }}>
                        
                        {isError && (
                            <div className="alert alert-danger py-2 small mb-4">
                                {error?.message ?? 'Invalid email or password.'}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="form-floating mb-3">
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-center mb-4">
                                <Link to="/forgot-password" className="text-decoration-none small text-primary fw-medium">
                                    Forgot password?
                                </Link>
                            </div>

                            {!isPending ? (
                                <button type="submit" className="btn btn-primary btn-lg w-100 fw-medium">
                                    Sign In
                                </button>
                            ) : (
                                <button className="btn btn-primary btn-lg w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Signing in...
                                </button>
                            )}

                        </form>
                    </div>

                    <p className="text-center text-secondary small mt-4">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-decoration-none fw-bold text-primary">
                            Create one
                        </Link>
                    </p>

                </div>
            </main>

            {/*FOOTER*/}
            <footer className="bg-body-tertiary py-4 border-top mt-auto">
                <div className="container">
                    <div className="row align-items-center flex-column-reverse flex-md-row">
                        <div className="col-md-6 text-center text-md-start mt-3 mt-md-0 small text-secondary">
                            &copy; {new Date().getFullYear()} RealEstateBooking, Inc. All rights reserved.
                        </div>
                        <div className="col-md-6 text-center text-md-end small">
                            <button onClick={() => setShowAboutModal(true)} className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline me-3">About Us</button>
                            <button onClick={() => setShowContactModal(true)} className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline me-3">Contact Us</button>
                            <button onClick={() => setShowTermsModal(true)} className="btn btn-link p-0 text-decoration-none text-secondary hover-text-white small align-baseline">Policies</button>
                        </div>
                    </div>
                </div>
            </footer>

        

            {/* Modal 1: Policies */}
            {showTermsModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">Terms of Service & Privacy Policy</h5>
                                <button type="button" className="btn-close" onClick={() => setShowTermsModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <h6 className="fw-bold text-primary mb-3">1. Terms of Service</h6>
                                <p className="text-secondary small mb-4">
                                    Welcome to RealEstateBooking. By accessing our application, you agree to be bound by these terms. 
                                    You are responsible for ensuring that your account information is accurate and secure.
                                </p>
                                <h6 className="fw-bold text-primary mb-3">2. Privacy Policy</h6>
                                <p className="text-secondary small mb-4">
                                    Your privacy is critically important to us. We collect necessary information such as your name, email, and phone number 
                                    solely for the purpose of facilitating secure property bookings.
                                </p>
                            </div>
                            <div className="modal-footer border-secondary">
                                <button type="button" className="btn btn-primary px-4" onClick={() => setShowTermsModal(false)}>I Understand</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 2: Help */}
            {showHelpModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">Login Help</h5>
                                <button type="button" className="btn-close" onClick={() => setShowHelpModal(false)}></button>
                            </div>
                            <div className="modal-body p-4 text-secondary small">
                                <p>To access your account, please enter the email address and password you used during registration.</p>
                                <p>If you have forgotten your password, use the "Forgot password?" link on the main screen to reset it.</p>
                                <p>Ensure your Caps Lock is off and check for any extra spaces in your email address.</p>
                            </div>
                            <div className="modal-footer border-secondary">
                                <button type="button" className="btn btn-primary px-4" onClick={() => setShowHelpModal(false)}>Got it</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 3: About Us */}
            {showAboutModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">About Us</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAboutModal(false)}></button>
                            </div>
                            <div className="modal-body p-4 text-center">
                                <h6 className="fw-bold mb-3">RealEstateBooking</h6>
                                <p className="text-secondary small mb-0">
                                    We are a passionate tech company based in <strong>Cluj-Napoca, Romania</strong>, founded in <strong>2026</strong>. 
                                    Our mission is to revolutionize the way people discover and book real estate properties by providing a seamless, secure, and modern digital experience.
                                </p>
                            </div>
                            <div className="modal-footer border-secondary justify-content-center">
                                <button type="button" className="btn btn-primary px-4" onClick={() => setShowAboutModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 4: Contact Us */}
            {showContactModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">Contact Us</h5>
                                <button type="button" className="btn-close" onClick={() => setShowContactModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <p className="text-secondary small mb-4">
                                    Have a question or need support with your booking? We're here to help! Reach out to our Cluj-Napoca headquarters.
                                </p>
                                <ul className="list-unstyled small text-secondary mb-0">
                                    <li className="mb-3">
                                        <strong className="text-body d-block">Email Support</strong>
                                        support@realestatebooking.ro
                                    </li>
                                    <li className="mb-3">
                                        <strong className="text-body d-block">Phone</strong>
                                        +40 (0) 264 123 456<br />
                                        <span className="text-muted" style={{ fontSize: '0.8em' }}>Mon-Fri, 9:00 AM - 5:00 PM (EEST)</span>
                                    </li>
                                    <li>
                                        <strong className="text-body d-block">Headquarters</strong>
                                        Cluj-Napoca, Romania
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-footer border-secondary">
                                <button type="button" className="btn btn-primary px-4 w-100" onClick={() => setShowContactModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Login;