import * as React from "react";
import { useState } from "react";
import { Link } from "react-router"; 
import { useRegister } from "../hooks/useAuthActions.ts";

const Register = () => {
    // 1. Form and Error States
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
    });
    
    const [localError, setLocalError] = useState(''); 
    
    // 2. Modal States
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    const { mutate: register, reset, isPending, isError, error } = useRegister();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = event.target;
        setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
        setLocalError(''); 
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (form.password !== form.confirmPassword) {
            setLocalError("Passwords do not match. Please try again.");
            return; 
        }

        reset();
        register({
            firstName: form.firstName,
            lastName: form.lastName,
            username: form.username,
            email: form.email,
            phoneNumber: form.phoneNumber,
            password: form.password,
            passwordConfirmation: form.confirmPassword
        });
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

            {/*MAIN CONTENT (Form)*/}
            <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="w-100" style={{ maxWidth: 500 }}>

                    <div className="text-center mb-4">
                        <h1 className="fs-3 fw-semibold mb-1">Create an account</h1>
                        <p className="text-secondary mb-0">Join to start booking amazing properties.</p>
                    </div>

                    <div className="card shadow-lg border-secondary px-4 py-4 mx-3" style={{ borderRadius: '1rem' }}>
                        
                        {isError && (
                            <div className="alert alert-danger py-2 small mb-4">
                                {error?.message ?? 'Something went wrong. Please try again.'}
                            </div>
                        )}

                        {localError && (
                            <div className="alert alert-warning py-2 small mb-4">
                                {localError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="row g-2 mb-3">
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input id="firstName" type="text" className="form-control" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input id="lastName" type="text" className="form-control" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="username" type="text" className="form-control" placeholder="Username" autoComplete="username" value={form.username} onChange={handleChange} required />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="email" type="email" className="form-control" placeholder="name@example.com" autoComplete="email" value={form.email} onChange={handleChange} required />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="phoneNumber" type="tel" className="form-control" placeholder="Phone Number" autoComplete="tel" value={form.phoneNumber} onChange={handleChange} required />
                                <label htmlFor="phoneNumber">Phone Number</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="password" type="password" className="form-control" placeholder="Password" autoComplete="new-password" value={form.password} onChange={handleChange} required />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} required />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>

                            <div className="form-check mb-4 d-flex align-items-center">
                                <input
                                    className="form-check-input mt-0 me-2"
                                    type="checkbox"
                                    id="agreedToTerms"
                                    checked={form.agreedToTerms}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label small text-secondary" htmlFor="agreedToTerms">
                                    I agree to the{' '}
                                    <button 
                                        type="button" 
                                        className="btn btn-link p-0 text-primary text-decoration-none align-baseline fw-medium" 
                                        onClick={() => setShowTermsModal(true)}
                                    >
                                        Terms of Service & Privacy Policy
                                    </button>
                                </label>
                            </div>

                            {!isPending ? (
                                <button type="submit" className="btn btn-primary btn-lg w-100 fw-medium">
                                    Create Account
                                </button>
                            ) : (
                                <button className="btn btn-primary btn-lg w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating account...
                                </button>
                            )}

                        </form>
                    </div>

                    <p className="text-center text-secondary small mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-decoration-none fw-bold text-primary">
                            Log in
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

            {/*MODAL 1: Terms & Privacy Policy*/}
            {showTermsModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">Terms of Service & Privacy Policy</h5>
                                <button type="button" className="btn-close" onClick={() => setShowTermsModal(false)} aria-label="Close"></button>
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

            {/*MODAL 2: Need Help (Registration Instructions)*/}
            {showHelpModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">How to Register</h5>
                                <button type="button" className="btn-close" onClick={() => setShowHelpModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-4">
                                <p className="text-secondary small mb-3">
                                    Follow these quick steps to create your RealEstateBooking account:
                                </p>
                                <ol className="text-secondary small mb-0 ps-3">
                                    <li className="mb-2">Enter your real <strong>First and Last Name</strong> for booking verification.</li>
                                    <li className="mb-2">Choose a unique <strong>Username</strong> and provide a valid <strong>Email</strong>.</li>
                                    <li className="mb-2">Provide a <strong>Phone Number</strong> so hosts can contact you regarding your stay.</li>
                                    <li className="mb-2">Create a strong <strong>Password</strong> (at least 8 characters) and confirm it.</li>
                                    <li>Read and agree to our <strong>Terms of Service</strong> by checking the box, then click "Create Account".</li>
                                </ol>
                            </div>
                            <div className="modal-footer border-secondary">
                                <button type="button" className="btn btn-primary px-4" onClick={() => setShowHelpModal(false)}>Got it</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/*MODAL 3: About Us*/}
            {showAboutModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">About Us</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAboutModal(false)} aria-label="Close"></button>
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

            {/*MODAL 4: Contact Us*/}
            {showContactModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body text-body border-secondary shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold">Contact Us</h5>
                                <button type="button" className="btn-close" onClick={() => setShowContactModal(false)} aria-label="Close"></button>
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

export default Register;