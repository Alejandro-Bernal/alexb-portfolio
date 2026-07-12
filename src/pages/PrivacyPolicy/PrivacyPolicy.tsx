import "./PrivacyPolicy.css";
import { useTheme } from "../../hooks/useTheme";
import { THEMES } from "../../types/global.types";
import termlyPrivacyHtml from "./source.html?raw";

export function PrivacyPolicy() {
    const { theme, changeTheme } = useTheme();

    return (
        <>
            <div className="theme-switcher">
                {THEMES.map((t) => (
                    <button
                        key={t}
                        className={`theme-btn ${theme === t ? "active" : ""}`}
                        onClick={() => changeTheme(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div id="center">
                <div className="terminal-window">
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>alejandro-bernal@portfolio — privacy-policy</span>
                    </div>

                    <div className="terminal-body privacy-body">
                        <header className="privacy-header">
                            <p className="privacy-path">
                                <span className="prompt-host">
                                    bernal-a@portfolio
                                </span>
                                :~/docs$ cat privacy-policy.html
                            </p>
                        </header>

                        {/* Termly export kept verbatim (src/pages/PrivacyPolicy/source.html) */}
                        <div
                            className="privacy-termly"
                            dangerouslySetInnerHTML={{
                                __html: termlyPrivacyHtml,
                            }}
                        />

                        <footer className="privacy-footer">
                            <p>
                                <span className="prompt-host">
                                    bernal-a@portfolio
                                </span>
                                :~/docs$ _
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrivacyPolicy;
