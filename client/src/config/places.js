// Places API Config File

export const placesConf = {
    accessibility: {
        pinButton: {
            'aria-label': 'use browser geolocation',
            'tab-index': 12,
        },
        clearButton: {
            'tab-index': 13,
        }
    }
}

export const configureConf = {
    type: "city,country",
    language: navigator.language,
    countries: [],
    aroundLatLngViaIP: false
}