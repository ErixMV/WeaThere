import React from "react";
import MediaQuery from 'react-responsive';

const Footer = () => {
    return (
        <div>
            <MediaQuery minWidth={800}>
                <div className="footer">
                    <div>Made by Erix</div>
                    <div>© 2020 WeaThere Project</div>
                    <div className="contact-icons">
                        <a className="contact" target="_BLANK" href="https://github.com/ErixMV" rel="noopener noreferrer"><img width="30" alt="linkedin logo" src="./images/srcLogo/github.svg" /></a>
                        <a className="contact" href="https://www.linkedin.com/in/erixmamani/" target="_blank" rel="noopener noreferrer"><img alt="linkedin logo" src="./images/srcLogo/linkedin.svg" /></a>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={799}>
                <div className="footer" style={{ display: "inherit" }}>
                    <div>© 2020 WeaThere Project</div>
                    <div style={{ display: "flex", justifyContent: "center", lineHeight: "2rem" }}>
                        <div>Made by Erix</div>
                        <div className="contact-icons">
                            <a className="contact" target="_BLANK" href="https://github.com/ErixMV" rel="noopener noreferrer"><img width="30" alt="linkedin logo" src="./images/srcLogo/github.svg" /></a>
                            <a className="contact" href="https://www.linkedin.com/in/erixmamani/" target="_blank" rel="noopener noreferrer"><img alt="linkedin logo" src="./images/srcLogo/linkedin.svg" /></a>
                        </div>
                    </div>
                </div>
            </MediaQuery>
        </div>
    );
};

export default Footer;