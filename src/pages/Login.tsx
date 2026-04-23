import * as React from "react";
import { useState } from "react";
import { Link } from "react-router"; 
import { useLogin } from "../hooks/useAuthActions.ts";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutate: login, reset, isPending, isError, error } = useLogin();

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        reset();
        login({ email, password });
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">

                <div className="text-center mb-4">
                    <h1 className="fs-3 fw-semibold mb-1">Welcome back</h1>
                    <p className="text-secondary mb-0">Sign in to manage your bookings.</p>
                </div>

                <div className="card shadow-lg border-secondary px-4 py-5 rounded-4">
                    
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

                        {/* TODO: add this later */}
                        {/* <div className="text-center mb-4">
                            <Link to="/forgot-password" className="text-decoration-none small text-primary fw-medium">
                                Forgot password?
                            </Link>
                        </div> 
                        */}

                        {!isPending ? (
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-medium mt-3">
                                Sign In
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-lg w-100 mt-3" type="button" disabled>
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
        </div>
    );
};

export default Login;