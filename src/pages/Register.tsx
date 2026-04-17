import * as React from "react";
import {useState} from "react";
import {Link} from "react-router";
import {useRegister} from "../hooks/useAuthActions.ts";

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const {mutate: register, reset, isPending, isError, error} = useRegister()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value, type, checked} = event.target
        setForm(prev => ({...prev, [id]: type === 'checkbox' ? checked : value}))
    }

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        reset();
        register({
            username: form.username,
            email: form.email,
            password: form.password,
            passwordConfirmation: form.confirmPassword
        });
    }

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center py-5"
        >
            <div className="w-100" style={{maxWidth: 400}}>

                {/* Logo */}
                <div className="text-center mb-4">
                    <h1 className="fs-3 fw-semibold text-dark mb-1" style={{letterSpacing: '-0.03em'}}>Create your
                        account</h1>
                    <p className="text-secondary small mb-0">Start browsing properties today</p>
                </div>

                {/* Card */}
                <div className="card shadow-sm px-4 py-4 mx-3">
                    {isError && (
                        <div className="alert alert-danger py-2 small mb-3" style={{ borderRadius: 10 }}>
                            {error?.message ?? 'Something went wrong. Please try again.'}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>

                        {/* Name row */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label small fw-medium text-dark">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="form-control"
                                placeholder="johndoe"
                                autoComplete="username"
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label small fw-medium text-dark">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="john@example.com"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label small fw-medium text-dark">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="At least 8 characters"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label small fw-medium text-dark">Confirm
                                password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="new-password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {!isPending ?
                            <button type="submit" className="btn btn-primary w-100">
                                Create account
                            </button>
                            :
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }

                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-secondary small mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none fw-medium" style={{color: '#0071e3'}}>
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    )
};

export default Register;