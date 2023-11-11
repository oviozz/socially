

export function convertTimestamp(timestamp) {

    const dateFormat = new Date(timestamp).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return dateFormat;
}


export async function getCityAndRegion() {
    try {
        const response = await fetch("https://ipinfo.io/json?token=8e2597be9974ee");
        if (response.ok) {
            const jsonResponse = await response.json();
            const city = jsonResponse.city;
            let region = jsonResponse.region;

            // Convert region to its abbreviation if applicable
            const stateAbbreviations = {
                "Alabama": "AL",
                "Alaska": "AK",
                "Arizona": "AZ",
                "Arkansas": "AR",
                "California": "CA",
                "Colorado": "CO",
                "Connecticut": "CT",
                "Delaware": "DE",
                "Florida": "FL",
                "Georgia": "GA",
                "Hawaii": "HI",
                "Idaho": "ID",
                "Illinois": "IL",
                "Indiana": "IN",
                "Iowa": "IA",
                "Kansas": "KS",
                "Kentucky": "KY",
                "Louisiana": "LA",
                "Maine": "ME",
                "Maryland": "MD",
                "Massachusetts": "MA",
                "Michigan": "MI",
                "Minnesota": "MN",
                "Mississippi": "MS",
                "Missouri": "MO",
                "Montana": "MT",
                "Nebraska": "NE",
                "Nevada": "NV",
                "New Hampshire": "NH",
                "New Jersey": "NJ",
                "New Mexico": "NM",
                "New York": "NY",
                "North Carolina": "NC",
                "North Dakota": "ND",
                "Ohio": "OH",
                "Oklahoma": "OK",
                "Oregon": "OR",
                "Pennsylvania": "PA",
                "Rhode Island": "RI",
                "South Carolina": "SC",
                "South Dakota": "SD",
                "Tennessee": "TN",
                "Texas": "TX",
                "Utah": "UT",
                "Vermont": "VT",
                "Virginia": "VA",
                "Washington": "WA",
                "West Virginia": "WV",
                "Wisconsin": "WI",
                "Wyoming": "WY"
            };

            if (stateAbbreviations[region]) {
                region = stateAbbreviations[region];
            }

            return city + ', ' + region;
        } else {
            throw new Error('Failed to fetch location information.');
        }
    } catch (error) {
        return 'Error: ' + error.message;
    }
}