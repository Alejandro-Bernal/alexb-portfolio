import "./Resume.css";

export function Resume() {
    return (
        <div className="resume-output">
            <p>
                <span className="cmd">Alejandro_Bernal_Resume.pdf</span> —
                Alejandro Bernal Cruz
            </p>
            <p className="resume-actions">
                <a
                    className="resume-link"
                    href="/Alejandro_Bernal_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    [open in browser]
                </a>
                <a
                    className="resume-link"
                    href="/Alejandro_Bernal_Resume.pdf"
                    download="Alejandro_Bernal_Resume.pdf"
                >
                    [download]
                </a>
            </p>
        </div>
    );
}
