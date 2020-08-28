// Component: Project Info

import React from "react";

const Info = () => {
    return (
        <div className="info">
            <h2>How to use WeaThere?</h2>
            <p>
                WeaThere is a simple application made in React that allows you to check the weather forecast from many cities.
            </p>
            <p>
                It is simple, select a city in the input and the weather forecast will be displayed.
            </p>
            <p className="src-button-container">
                <a className="src-button" rel="noopener noreferrer" target="_BLANK" href="https://github.com/ErixMV/WeaThere"><span>Source code</span></a>
            </p>
            {/* <div className="icons" style={{ display: "flex", flexFlow: "row", justifyContent: "center" }}>
          <ReactIcon style={{ width: "5rem", height: "auto" }} />
          <AlgoliaIcon style={{ width: "5rem" }} />
        </div> */}
        </div>
    );
};

export default Info;