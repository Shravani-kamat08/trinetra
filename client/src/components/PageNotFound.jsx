import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">

            <div className="card shadow-lg text-center p-4 border-0" style={{ maxWidth: "500px", width: "100%" }}>

                <h1 className="display-1 fw-bold text-primary mb-3 animate-404">
                    404
                </h1>

                <h2 className="fw-bold mb-3">
                    Page Not Found
                </h2>

                <p className="text-muted mb-4">
                    Oops! It looks like the page you're trying to reach doesn't exist.
                    Perhaps you typed the address incorrectly, or the page has been moved.
                </p>

                <Link
                    to="/"
                    className="btn btn-primary d-inline-flex align-items-center justify-content-center px-4 py-2"
                >
                    <i className="fas fa-home me-2"></i>
                    Go to Homepage
                </Link>

            </div>

        </div>
    );
};

export default NotFoundPage;