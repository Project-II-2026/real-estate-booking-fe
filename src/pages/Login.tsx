import * as React from "react";
import {useState} from "react";
import {Link} from "react-router";
import {useLogin} from "../hooks/useAuthActions.ts";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {mutate: login, reset, isPending, isError, error} = useLogin();

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        reset();
        login({email, password});
    };

    return (
        <div className="container py-7 d-flex justify-content-center">
            <div className="w-100" style={{maxWidth: 420}}>
                <Link
                    to="/"
                    className="d-inline-flex align-items-baseline fw-semibold tracking-tight mb-6"
                    style={{fontSize: "1.125rem", color: "var(--bone)"}}
                >
                    Estatly<span className="moss-dot" aria-hidden="true"/>
                </Link>

                <div className="eyebrow eyebrow-rule mb-3">Sign in</div>
                <h1 className="fw-semibold tracking-tight mb-2" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                    Welcome back.
                </h1>
                <p className="text-bone-muted mb-5" style={{fontSize: "0.9375rem"}}>
                    Sign in to manage your visits and listings.
                </p>

                {isError && (
                    <div className="alert alert-danger mb-4">
                        {error?.message ?? 'Invalid email or password.'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div className="form-floating">
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    {!isPending ? (
                        <button
                            type="submit"
                            className="btn btn-primary w-100 fw-medium mt-2 d-flex align-items-center justify-content-center gap-2"
                        >
                            Sign in
                            <i className="bi bi-arrow-right"/>
                        </button>
                    ) : (
                        <button className="btn btn-primary w-100 mt-2" type="button" disabled>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                            Signing in…
                        </button>
                    )}
                </form>

                <p className="text-bone-muted small mt-5 mb-0">
                    New to Estatly?{' '}
                    <Link to="/register" className="text-moss fw-medium">
                        Create an account →
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
