// Component: Weather Card

import React from "react";

const WeatherBody = ({ day, icon, highTemp, lowTemp, displayType, i }) => {

    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const srcLogo = `./images/algoliaIcons/${icon}.png`;

    let classes = `card ${displayType}-${i}`;

    if (classes.includes("d-small")) classes += " flex-full-width";

    return (
        <div className={classes}>
            <div className="card-header">
                {days[day]}
            </div>
            <div className="card-body">
                <img className="icon" src={srcLogo} alt="weather-image" />
            </div>
            <div className="card-footer">
                <div className="high-temp-container">
                    {highTemp} °C
                </div>
                <div className="low-temp-container">
                    {lowTemp} °C
                </div>
            </div>
        </div>
    );
}

export default WeatherBody;