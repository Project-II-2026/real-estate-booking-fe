import * as React from "react";
import {useState} from "react";
import {Link} from "react-router";
import {useRegister} from "../hooks/useAuthActions.ts";
import {TermsModal} from "../components/modals/TermsModal.tsx";

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
    });

    const [localError, setLocalError] = useState('');
    const [showTerms, setShowTerms] = useState(false);

    const {mutate: register, reset, isPending, isError, error} = useRegister();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value, type, checked} = event.target;
        setForm(prev => ({...prev, [id]: type === 'checkbox' ? checked : value}));
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
            passwordConfirmation: form.confirmPassword,
        });
    };

    return (
        <>
            <div className="container py-7 d-flex justify-content-center">
                <div className="w-100" style={{maxWidth: 480}}>
                    <Link
                        to="/"
                        className="d-inline-flex align-items-baseline fw-semibold tracking-tight mb-6"
                        style={{fontSize: "1.125rem", color: "var(--bone)"}}
                    >
                        Estatly<span className="moss-dot" aria-hidden="true"/>
                    </Link>

                    <div className="eyebrow eyebrow-rule mb-3">Create your account</div>
                    <h1 className="fw-semibold tracking-tight mb-2" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                        One quiet account.
                    </h1>
                    <p className="text-bone-muted mb-5" style={{fontSize: "0.9375rem"}}>
                        Save searches, book visits, list properties in Cluj.
                    </p>

                    {isError && (
                        <div className="alert alert-danger mb-4">
                            {error?.message ?? 'Something went wrong.'}
                        </div>
                    )}
                    {localError && (
                        <div className="alert alert-warning mb-4">
                            {localError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="firstName">First name</label>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="form-control"
                                        placeholder="Last name"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="lastName">Last name</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-floating">
                            <input
                                id="username"
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                autoComplete="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="username">Username</label>
                        </div>

                        <div className="form-floating">
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="form-floating">
                            <input
                                id="phoneNumber"
                                type="tel"
                                className="form-control"
                                placeholder="Phone number"
                                autoComplete="tel"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="phoneNumber">Phone number</label>
                        </div>

                        <div className="form-floating">
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="form-floating">
                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                autoComplete="new-password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="confirmPassword">Confirm password</label>
                        </div>

                        <div className="form-check d-flex align-items-start gap-2 mt-2">
                            <input
                                className="form-check-input mt-1 flex-shrink-0"
                                type="checkbox"
                                id="agreedToTerms"
                                checked={form.agreedToTerms}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label text-bone-muted small" htmlFor="agreedToTerms">
                                I agree to the{' '}
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-moss text-decoration-none align-baseline fw-medium small"
                                    onClick={() => setShowTerms(true)}
                                >
                                    Terms &amp; Privacy
                                </button>
                            </label>
                        </div>

                        {!isPending ? (
                            <button
                                type="submit"
                                className="btn btn-primary w-100 fw-medium mt-3 d-flex align-items-center justify-content-center gap-2"
                            >
                                Create account
                                <i className="bi bi-arrow-right"/>
                            </button>
                        ) : (
                            <button className="btn btn-primary w-100 mt-3" type="button" disabled>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                                Creating account…
                            </button>
                        )}
                    </form>

                    <p className="text-bone-muted small mt-5 mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="text-moss fw-medium">
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>

            <TermsModal show={showTerms} onClose={() => setShowTerms(false)}/>
        </>
    );
};

export default Register;
