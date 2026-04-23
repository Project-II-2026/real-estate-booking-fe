import * as React from "react";
import { useState } from "react";
import { Link } from "react-router"; 
import { useRegister } from "../hooks/useAuthActions.ts";
import { TermsModal } from "../components/TermsModal.tsx"; 

const Register = () => {
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
    const [showTerms, setShowTerms] = useState(false);

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
        <>
            <div className="container d-flex justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-5">

                    <div className="text-center mb-4">
                        <h1 className="fs-3 fw-semibold mb-1">Create an account</h1>
                        <p className="text-secondary mb-0">Join to start booking amazing properties.</p>
                    </div>

                    <div className="card shadow-lg border-secondary px-4 py-4 rounded-4">
                        
                        {isError && <div className="alert alert-danger py-2 small mb-4">{error?.message ?? 'Something went wrong.'}</div>}
                        {localError && <div className="alert alert-warning py-2 small mb-4">{localError}</div>}

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
                                <input className="form-check-input mt-0 me-2" type="checkbox" id="agreedToTerms" checked={form.agreedToTerms} onChange={handleChange} required />
                                <label className="form-check-label small text-secondary" htmlFor="agreedToTerms">
                                    I agree to the <button type="button" className="btn btn-link p-0 text-primary text-decoration-none align-baseline fw-medium" onClick={() => setShowTerms(true)}>Terms of Service & Privacy Policy</button>
                                </label>
                            </div>

                            {!isPending ? (
                                <button type="submit" className="btn btn-primary btn-lg w-100 fw-medium">Create Account</button>
                            ) : (
                                <button className="btn btn-primary btn-lg w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating account...
                                </button>
                            )}
                        </form>
                    </div>

                    <p className="text-center text-secondary small mt-4">
                        Already have an account? <Link to="/login" className="text-decoration-none fw-bold text-primary">Log in</Link>
                    </p>

                </div>
            </div>

            <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        </>
    );
};

export default Register;