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
                    className="privacy-link"
                >
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}
