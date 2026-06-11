import "./HelpOutput.css";

export function HelpOutput() {
    return (
        <div className="help-output">
            <div className="help-header">
                <p>
                    <span className="cmd">moosey OS terminal v1.0.0 </span>
                </p>
                <p>
                    Type commands to explore the terminal. <br />
                    If you need a hint, try <span className="cmd">help</span> or
                    clear the terminal with <span className="cmd">clear</span>.
                </p>
            </div>
            <p>Available commands:</p>
            <ul>
                <li className="help-option">
                    <span className="cmd">help</span>{" "}
                    <span className="cmd-desc">
                        shows list of available commands and their descriptions
                    </span>
                </li>
                <li className="help-option">
                    <span className="cmd">about</span>{" "}
                    <span className="cmd-desc">
                        a brief introduction about me, my background, and what I
                        do
                    </span>
                </li>
                <li className="help-option">
                    <span className="cmd">projects</span>{" "}
                    <span className="cmd-desc">
                        a list of my projects and contributions
                    </span>
                </li>
                <li className="help-option">
                    <span className="cmd">skills</span>{" "}
                    <span className="cmd-desc">
                        a list of my skills and expertise with some details
                        about each one
                    </span>
                </li>
                <li className="help-option">
                    <span className="cmd">contact</span>{" "}
                    <span className="cmd-desc">
                        learn how to get in touch with me, whether for work
                        inquiries, collaboration, or just to say hi
                    </span>
                </li>
                <li className="help-option">
                    <span className="cmd">clear</span>{" "}
                    <span className="cmd-desc">clear the terminal screen</span>
                </li>
            </ul>
        </div>
    );
}
