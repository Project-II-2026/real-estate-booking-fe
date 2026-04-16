import * as React from "react";
import {useState} from "react";
import {Link} from "react-router";
import {useLogin} from "../hooks/useAuthActions.ts";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {mutate: login, reset, isPending, isError, error} = useLogin()

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        reset();
        login({email, password})
    }

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
        >
            <div className="w-100" style={{maxWidth: 400}}>

                {/* Logo */}
                <div className="text-center mb-4">
                    <h1 className="fs-3 fw-semibold text-dark mb-1">Sign in</h1>
                    <p className="text-secondary small mb-0">to continue to RealEstate</p>
                </div>

                {/* Card */}
                <div className="card shadow-sm px-4 py-4 mx-3">
                    {isError && (
                        <div className="alert alert-danger py-2 small mb-3" style={{ borderRadius: 10 }}>
                            {error?.message ?? 'Something went wrong. Please try again.'}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label small fw-medium text-dark">
                                Email or username
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <label htmlFor="password" className="form-label small fw-medium text-dark mb-0">
                                    Password
                                </label>
                                {/*TODO: add this later*/}
                                {/*<Link to="/forgot-password" className="text-decoration-none small" style={{ color: '#0071e3' }}>*/}
                                {/*    Forgot password?*/}
                                {/*</Link>*/}
                            </div>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {!isPending ?
                            <button type="submit" className="btn btn-primary w-100 mt-2">
                                Sign in
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
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none fw-medium" style={{color: '#0071e3'}}>
                        Create one
                    </Link>
                </p>

            </div>
        </div>
    )
};

export default Login;