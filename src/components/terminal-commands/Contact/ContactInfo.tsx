import "./Contact.css";

export function ContactInfo() {
    return (
        <div className="contact-flow">
            <p className="contact-intro">
                I build reliable web applications and real-time systems on Linux
                and AWS. I specialize in full-stack development with the MERN
                stack (MongoDB, Express, React, Node.js), but I'm comfortable
                working with any stack to match your specific needs and
                requirements. I design secure, scalable cloud infrastructure and
                have a proven track record of delivering high-quality solutions
                in fast-paced environments. I'm passionate about writing clean,
                maintainable code and architecting systems that perform under
                real-world demands.
            </p>
            <br />
            <div className="contact-services">
                <p className="contact-services-label">I can help with:</p>
                <ul className="contact-services-list">
                    <li>Web Apps</li>
                    <li>Apps (iOS and Android)</li>
                    <li>AWS Cloud</li>
                    <li>General Tech Assistance</li>
                    <li>Consultations</li>
                </ul>
            </div>

            <div className="contact-direct-links">
                <p className="contact-links-label">Reach out directly:</p>
                <div className="contact-links">
                    <a href="mailto:contact@bernalforge.dev">
                        &gt;&gt; contact@bernalforge.dev (Email, will get back
                        to you as soon as I can.)
                    </a>
                    <a
                        href="https://www.linkedin.com/in/alejandro-bernal-cruz"
                        target="_blank"
                        rel="noreferrer"
                    >
                        &gt;&gt; LinkedIn (Fastest way to get in touch!)
                    </a>
                </div>
            </div>

            <p className="contact-form-prompt">
                Type <span className="cmd">contact-now</span> to send a message
                via the form.
            </p>
        </div>
    );
}
