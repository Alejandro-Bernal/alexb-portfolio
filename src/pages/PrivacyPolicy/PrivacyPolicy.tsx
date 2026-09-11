import "./PrivacyPolicy.css";
import termlyPrivacyHtml from "./source.html?raw";

export function PrivacyPolicy() {
    return (
        <div id="center">
            <div className="terminal-window">
                <div className="terminal-body privacy-body">
                    <header className="privacy-header">
                        <p className="privacy-path">
                            <span className="prompt-host">
                                visitor@bernalforge
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
                                visitor@bernalforge
                            </span>
                            :~/docs$ _
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
