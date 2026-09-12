import "./Footer.css";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="copyright">
                    © 2026 bernalforge. All rights reserved.
                </p>
                <Link
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    Privacy Policy
                </Link>
                <a
                    href="https://github.com/Alejandro-Bernal"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/alejandro-bernal-cruz"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
}
