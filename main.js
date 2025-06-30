// Mapping of country codes to country names
const countryNames = {
    "fi": "Finland",
    "se": "Sweden",
    "nl": "Netherlands",
    "dk": "Denmark",
    "de": "Germany",
    "ie": "Ireland",
    "be": "Belgium",
    "pl": "Poland",
    "lt": "Lithuania",
    "ee": "Estonia",
    "pt": "Portugal",
    "ro": "Romania",
    "cz": "Czech Republic",
    "at": "Austria",
    "hr": "Croatia",
    "fr": "France",
    "es": "Spain",
    "hu": "Hungary",
    "sk": "Slovakia",
    "lv": "Latvia",
    "si": "Slovenia",
    "bg": "Bulgaria",
    "gr": "Greece",
    "it": "Italy",
    "lu": "Luxembourg",
    "mt": "Malta",
    "cy": "Cyprus"
};

const countryPopulations = {
    "fi": 5527573,
    "se": 10327589,
    "nl": 17441139,
    "dk": 5831404,
    "de": 83166711,
    "ie": 4994724,
    "be": 11589623,
    "pl": 38386000,
    "lt": 2794700,
    "ee": 1328976,
    "pt": 10295909,
    "ro": 19237691,
    "cz": 10701777,
    "at": 8917205,
    "hr": 4047200,
    "fr": 67391582,
    "es": 47351567,
    "hu": 9769526,
    "sk": 5456362,
    "lv": 1901548,
    "si": 2100126,
    "bg": 6951482,
    "gr": 10423054,
    "it": 60244639,
    "lu": 634814,
    "mt": 514564,
    "cy": 888005
};

// Function to fetch the flag URL from Wikipedia
function fetchFlagUrl(countryName) {
    const specialCases = {
        "Netherlands": "Flag_of_the_Netherlands",
        "Czech Republic": "Flag_of_the_Czech_Republic"
    };

    const title = specialCases[countryName] || `Flag_of_${countryName.replace(/ /g, '_')}`;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=500&titles=${title}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const page = Object.values(pages)[0];
            return page.thumbnail ? page.thumbnail.source : null;
        })
        .catch(error => {
            console.error('Error fetching flag:', error);
            return null;
        });
}

function updateThresholdProgress(countries) {
    const thresholdCount = countries.filter(country => country.percentage >= 100).length;
    const parentDiv = document.querySelector('.threshold-progress');
    parentDiv.innerHTML = ''; // Clear existing segments

    for (let i = 0; i < 7; i++) {
        const segment = document.createElement('div');
        segment.className = 'threshold-progress-segment';
        if (i < thresholdCount) {
            segment.style.backgroundColor = '#76c7c0';
        } else {
            segment.style.backgroundColor = '#e0e0e0';
        }
        parentDiv.appendChild(segment);
    }
}
// Function to display countries
function displayCountries(countries, showUpdateMessage = false) {
    const parentDiv = document.getElementById('myDiv');
    parentDiv.innerHTML = ''; // Clear existing content

    // Fetch all flag URLs
    const flagPromises = countries.map(item => {
        const countryName = countryNames[item.countryCode] || item.countryCode;
        return fetchFlagUrl(countryName).then(flagUrl => ({
            ...item,
            flagUrl
        }));
    });

    // Wait for all flag URLs to be fetched
    Promise.all(flagPromises).then(countriesWithFlags => {
        countriesWithFlags.forEach(item => {

            // Calculate signatures per capita
            const population = countryPopulations[item.countryCode];
            const signaturesPerCapita = population ? (item.totalCount / population) * 100 : 0;

            // Create a new div element for each item
            const div = document.createElement('div');
            div.className = "country-data";

            // Create an img element for the flag if available
            if (item.flagUrl) {
                const flagImg = document.createElement('img');
                flagImg.className = 'country-flag';
                flagImg.src = item.flagUrl;
                flagImg.alt = `${countryNames[item.countryCode]} Flag`;

                switch (item.countryCode) {
                    case 'fi':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'se':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'nl':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'dk':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'de':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'ie':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'be':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'pl':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'lt':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'ee':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'pt':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'ro':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'cz':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'at':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'hr':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'fr':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'es':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'hu':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'sk':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'lv':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'si':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'bg':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'gr':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'it':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'lu':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'mt':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'cy':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    default: break;
                }
                div.appendChild(flagImg);
            }

            // Create a new p element for the country name
            const countryNameElement = document.createElement('p');
            countryNameElement.className = 'country-name';
            countryNameElement.textContent = `${countryNames[item.countryCode] || item.countryCode}`;

            // Create a new p element for the total count
            const totalCountElement = document.createElement('p');
            totalCountElement.className = 'total-count';
            totalCountElement.textContent = `Total Count: ${item.totalCount.toLocaleString()}`;

            // Create a new p element for the threshold
            const tresholdElement = document.createElement('p');
            tresholdElement.className = 'treshold';
            tresholdElement.textContent = `Threshold: ${item.treshold.toLocaleString()}`;

            // Create the signatures per capita element
            const signaturesPerCapitaElement = document.createElement('p');
            signaturesPerCapitaElement.className = 'signatures-per-capita';
            signaturesPerCapitaElement.textContent = `Signatures/Capita: ${signaturesPerCapita.toFixed(2)}%`;

            // Create a progress bar for the country
            const countryProgressBar = document.createElement('div');
            countryProgressBar.className = 'progress-bar';

            const progressBarFill = document.createElement('div');
            progressBarFill.className = 'progress';
            const progressBarSecondFill = document.createElement('div');
            progressBarSecondFill.className = 'progress-second';
            const progressBarThirdFill = document.createElement('div');
            progressBarThirdFill.className = 'progress-third';

            // Calculate the width for each layer
            const percentage = item.percentage;
            const firstLayerWidth = Math.min(percentage, 100);
            const secondLayerWidth = Math.min(Math.max(percentage - 100, 0), 100);
            const thirdLayerWidth = Math.min(Math.max(percentage - 200, 0), 100);

            progressBarFill.style.width = `${firstLayerWidth}%`;
            progressBarSecondFill.style.width = `${secondLayerWidth}%`;
            progressBarThirdFill.style.width = `${thirdLayerWidth}%`;

            // Conditionally add the border class
            if (firstLayerWidth > 1) {
                progressBarFill.classList.add('progress-divider');
            }
            if (secondLayerWidth > 1) {
                progressBarSecondFill.classList.add('progress-divider');
            }
            if (thirdLayerWidth > 1) {
                progressBarThirdFill.classList.add('progress-divider');
            }


            // Create a span element for the percentage text
            const percentageText = document.createElement('span');
            percentageText.className = 'percentage-text';
            percentageText.textContent = `${percentage.toLocaleString()}%`;



            // Create a new p element for the disclaimer
            const disclaimerElement = document.createElement('p');
            disclaimerElement.className = 'fullDisclaimer';
            disclaimerElement.textContent = `Your signature still matters!`;


            // Append the filled progress bars to the progress bar container
            countryProgressBar.appendChild(progressBarFill);
            countryProgressBar.appendChild(progressBarSecondFill);
            countryProgressBar.appendChild(progressBarThirdFill);

            // Append the percentage text to the progress bar container
            countryProgressBar.appendChild(percentageText);




            // Add the correct frame based on the progress
            if (percentage >= 300) {
                div.classList.add('gold-frame');
            }
            else if (percentage >= 200) {
                div.classList.add('silver-frame');
            }
            else if (percentage >= 100) {
                div.classList.add('bronze-frame');
            }

            // Append the country name, total count, threshold, signatures per capita, and progress bar to the main div
            div.appendChild(countryNameElement);
            div.appendChild(totalCountElement);
            div.appendChild(tresholdElement);
            div.appendChild(signaturesPerCapitaElement);
            div.appendChild(countryProgressBar);
            if ((percentage >= 100) && !showUpdateMessage) {
                div.appendChild(disclaimerElement);
            }

            // Only add "Data is updated every 5 minutes" if showUpdateMessage is true
            if (showUpdateMessage) {
                const updateInfo = document.createElement('p');
                updateInfo.className = 'update-info'; // give it a unique class
                updateInfo.textContent = 'Data is updated every 5 minutes.';
                div.appendChild(updateInfo);
            }

            // Append the new div element to the parent div
            parentDiv.appendChild(div);
        });
        updateThresholdProgress(countriesWithFlags);
    });
}

// Function to display countries with signature methods

/*
function displayCountriesWithMethods(countries) {
    const parentDiv = document.getElementById('myDiv');
    parentDiv.innerHTML = ''; // Clear existing content

    // Fetch all flag URLs
    const flagPromises = countries.map(item => {
        const countryName = countryNames[item.countryCode] || item.countryCode;
        return fetchFlagUrl(countryName).then(flagUrl => ({
            ...item,
            flagUrl
        }));
    });

    // Wait for all flag URLs to be fetched
    Promise.all(flagPromises).then(countriesWithFlags => {
        countriesWithFlags.forEach(item => {
            // Create a new div element for each item
            const div = document.createElement('div');
            div.className = "country-data";

            // Calculate signatures per capita
            const population = countryPopulations[item.countryCode];
            const signaturesPerCapita = population ? (item.totalCount / population) * 100 : 0;


            // Create an img element for the flag if available
            if (item.flagUrl) {
                const flagImg = document.createElement('img');
                flagImg.className = 'country-flag';
                flagImg.src = item.flagUrl;
                flagImg.alt = `${countryNames[item.countryCode]} Flag`;

                switch (item.countryCode) {
                    case 'fi':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'se':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'nl':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'dk':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'de':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'ie':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'be':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'pl':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'lt':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'ee':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'pt':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'ro':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'cz':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'at':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'hr':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'fr':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'es':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'hu':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'sk':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'lv':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'si':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'bg':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'gr':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'it':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'lu':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecifirstoption';
                        });
                        break;
                    case 'mt':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    case 'cy':
                        flagImg.addEventListener('click', () => {
                            window.location.href = 'https://www.stopkillinggames.com/ecisecondoption';
                        });
                        break;
                    default: break;
                }
                div.appendChild(flagImg);
            }

            // Create a new p element for the country name
            const countryNameElement = document.createElement('p');
            countryNameElement.className = 'country-name';
            countryNameElement.textContent = `${countryNames[item.countryCode] || item.countryCode}`;

            // Create a new p element for the total count
            const totalCountElement = document.createElement('p');
            totalCountElement.className = 'total-count';
            totalCountElement.textContent = `Total Count: ${item.totalCount.toLocaleString()}`;

            // Create a new p element for the treshold
            const tresholdElement = document.createElement('p');
            tresholdElement.className = 'treshold';
            tresholdElement.textContent = `Threshold: ${item.treshold.toLocaleString()}`;

            // Create a new p element for the form count
            const formCountElement = document.createElement('p');
            formCountElement.className = 'form-count';
            formCountElement.textContent = `Form Count: ${item.formCount.toLocaleString()}`;

            // Create a new p element for the eid count
            const eidCountElement = document.createElement('p');
            eidCountElement.className = 'eid-count';
            eidCountElement.textContent = `EID Count: ${item.eidCount.toLocaleString()}`;

            // Create a progress bar for the country
            const countryProgressBar = document.createElement('div');
            countryProgressBar.className = 'progress-bar';
            const progressBarFill = document.createElement('div');
            progressBarFill.className = 'progress';
            progressBarFill.style.width = `${item.percentage}%`;


            const signaturesPerCapitaElement = document.createElement('p');
            signaturesPerCapitaElement.className = 'signatures-per-capita';
            signaturesPerCapitaElement.textContent = `Signatures/Capita: ${signaturesPerCapita.toFixed(2)}%`;


            // Create a span element for the percentage text
            const percentageText = document.createElement('span');
            percentageText.className = 'percentage-text';
            percentageText.textContent = `${item.percentage.toLocaleString()}%`;

            // Append the percentage text to the progress bar container
            countryProgressBar.appendChild(percentageText);

            // Append the filled progress bar to the progress bar container
            countryProgressBar.appendChild(progressBarFill);

            // Change color to a darker shade of green if percentage is 100%
            if (item.percentage >= 100) {
                progressBarFill.style.backgroundColor = '#388E3C';
                div.classList.add('golden-frame');
            }

            // Append the country name, total count, percentage, treshold, form count, eid count, and progress bar to the main div
            div.appendChild(countryNameElement);
            div.appendChild(totalCountElement);
            div.appendChild(tresholdElement);
            div.appendChild(formCountElement);
            div.appendChild(eidCountElement);
            div.appendChild(signaturesPerCapitaElement);
            div.appendChild(countryProgressBar);

            // Append the new div element to the parent div
            parentDiv.appendChild(div);
        });
    });
} */

// Function to sort countries and update the display
function sortCountries(order = 'desc', sortBy = 'percentage') {
    fetch('https://stopkillinggamesdata.montoria.se/')
        .then(response => response.json())
        .then(data => {
            const sortedCountries = [...data.signatureCountryCount].sort((a, b) => {
                if (sortBy === 'percentage') {
                    return order === 'asc' ? a.percentage - b.percentage : b.percentage - a.percentage;
                } else if (sortBy === 'totalCount') {
                    return order === 'asc' ? a.totalCount - b.totalCount : b.totalCount - a.totalCount;
                } else if (sortBy === 'alphabetical') {
                    const nameA = countryNames[a.countryCode] || a.countryCode;
                    const nameB = countryNames[b.countryCode] || b.countryCode;
                    return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
                } else if (sortBy === 'perCapita') {
                    const perCapitaA = a.totalCount / countryPopulations[a.countryCode];
                    const perCapitaB = b.totalCount / countryPopulations[b.countryCode];
                    return order === 'asc' ? perCapitaA - perCapitaB : perCapitaB - perCapitaA;
                }
            });

            displayCountries(sortedCountries);
        })
        .catch(error => console.error('Error:', error));
}

// Add event listeners for the dropdown alternatives
document.getElementById('sortAsc').addEventListener('click', () => {
    sortCountries('asc');
});

document.getElementById('sortDesc').addEventListener('click', () => {
    sortCountries('desc');
});

document.getElementById('sortTotalAsc').addEventListener('click', () => {
    sortCountries('asc', 'totalCount');
});

document.getElementById('sortTotalDesc').addEventListener('click', () => {
    sortCountries('desc', 'totalCount');
});

document.getElementById('sortAlphaAsc').addEventListener('click', () => {
    sortCountries('asc', 'alphabetical');
});

document.getElementById('sortAlphaDesc').addEventListener('click', () => {
    sortCountries('desc', 'alphabetical');
});

document.getElementById('sortPerCapitaAsc').addEventListener('click', () => {
    sortCountries('asc', 'perCapita');
});

document.getElementById('sortPerCapitaDesc').addEventListener('click', () => {
    sortCountries('desc', 'perCapita');
});

// Function to fetch and update total progress data
function updateTotalProgress() {
    fetch('https://eci.ec.europa.eu/045/public/api/report/progression')
        .then(response => response.json())
        .then(data => {
            const { signatureCount, goal } = data;
            if(signatureCount >= goal){
                displayFireworks();
            }
            // Calculate the percentage towards the goal
            const percentage = ((signatureCount / goal) * 100).toFixed(2);

            //Display confetti when a signature is added
            if (previousSignatureCount < signatureCount && previousSignatureCount !== 0) {
                // Also update today's count when new signatures come in, but don't show loading message
                fetchTodaySignatures(false);
            }

            previousSignatureCount = signatureCount;

            // Update the total progress div with the calculated values
            if(document.querySelector('.total-count').innerText != `Total Count: ${signatureCount.toLocaleString()}`){
                document.querySelector('.total-count').innerText = `Total Count: ${signatureCount.toLocaleString()}`;
            }

            if(document.querySelector('.percentage-to-goal').innerText != `Percentage to Goal: ${percentage.toLocaleString()}%`){
                document.querySelector('.percentage-to-goal').innerText = `Percentage to Goal: ${percentage.toLocaleString()}%`;
            }

            if(document.querySelector('.total-progress').querySelector('.progress').style.width != `${percentage}%`){
                document.querySelector('.total-progress').querySelector('.progress').style.width = `${percentage}%`;
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to fetch and calculate yesterday's signatures
async function fetchYesterdaySignatures() {
    try {
        // Get current total from main API
        const currentResponse = await fetch('https://eci.ec.europa.eu/045/public/api/report/progression');
        const currentData = await currentResponse.json();
        const currentTotal = currentData.signatureCount;

        // Get historical data
        const response = await fetch('https://stopkillinggameshistoric-3a5f498bc1f0.herokuapp.com/historic-data');
        let historicData = await response.json();

        // Sort data by timestamp (newest first)
        historicData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // oldest first for easier average

        // Find yesterday and the day before yesterday
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const dayBeforeYesterday = new Date(today);
        dayBeforeYesterday.setDate(today.getDate() - 2);

        // Filter entries for yesterday and the day before yesterday
        const yesterdayEntry = historicData.find(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= yesterday && entryDate < today;
        });
        const dayBeforeYesterdayEntry = historicData.find(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= dayBeforeYesterday && entryDate < yesterday;
        });

        // Calculate daily averages (exclude today)
        let dailyIncreases = [];
        for (let i = 1; i < historicData.length; i++) {
            const prev = historicData[i - 1];
            const curr = historicData[i];
            const prevDate = new Date(prev.timestamp);
            const currDate = new Date(curr.timestamp);
            // Only include days before today
            if (currDate < today) {
                const prevTotal = prev.data.reduce((sum, country) => sum + country.totalCount, 0);
                const currTotal = curr.data.reduce((sum, country) => sum + country.totalCount, 0);
                dailyIncreases.push(currTotal - prevTotal);
            }
        }
        let dailyAverage = null;
        if (dailyIncreases.length > 0) {
            dailyAverage = Math.round(dailyIncreases.reduce((a, b) => a + b, 0) / dailyIncreases.length);
        }

        if (yesterdayEntry && dayBeforeYesterdayEntry) {
            const yesterdayTotal = yesterdayEntry.data.reduce((sum, country) => sum + country.totalCount, 0);
            const dayBeforeYesterdayTotal = dayBeforeYesterdayEntry.data.reduce((sum, country) => sum + country.totalCount, 0);
            const yesterdaySignatures = yesterdayTotal - dayBeforeYesterdayTotal;
            return {
                yesterdaySignatures,
                yesterdayTotal,
                dailyAverage
            };
        } else {
            return {
                yesterdaySignatures: null,
                yesterdayTotal: null,
                dailyAverage: null
            };
        }
    } catch (error) {
        console.error('Error fetching yesterday\'s signatures:', error);
        return {
            yesterdaySignatures: null,
            yesterdayTotal: null,
            dailyAverage: null
        };
    }
}

function updateTimeLeft(startTime, endTime) {
    const now = new Date();
    const timeLeft = endTime - now;
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.querySelector('#time-left-text').innerText = `${clockAnim[animIndex]}${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    if(document.querySelector('.time-left').querySelector('.progress-danger').style.width = `${100 - (timeLeft / (endTime - startTime)) * 100}%`){
        document.querySelector('.time-left').querySelector('.progress-danger').style.width = `${100 - (timeLeft / (endTime - startTime)) * 100}%`;
    }

    // Fetch yesterday's signatures and update schedule-status
    fetchYesterdaySignatures().then(result => {
        const { yesterdaySignatures, yesterdayTotal, dailyAverage } = result;
        // If we have data, calculate projected date
        if (yesterdaySignatures && yesterdaySignatures > 0 && yesterdayTotal) {
            const projectedDate = getProjectedFinalDate(
                new Date(), // start from today
                yesterdayTotal, // yesterday's total
                1000000, // goal
                yesterdaySignatures // daily rate (yesterday's increase)
            );
            if (projectedDate) {
                // Calculate number of days to projected date from today
                const daysToGoal = Math.ceil((projectedDate - now) / (1000 * 60 * 60 * 24));
                document.querySelector('.schedule-status').innerText = `At yesterday's rate, the goal will be reached in ${daysToGoal} days (by ${projectedDate.toLocaleDateString()})`;
            } else {
                document.querySelector('.schedule-status').innerText = 'Could not calculate projected final date.';
            }
        } else {
            document.querySelector('.schedule-status').innerText = 'No data for yesterday\'s rate.';
        }
    });

    if(document.querySelector('.daily-signatures-needed').innerText = `We need at least ${Math.ceil((1000000-previousSignatureCount)/daysLeft)} signatures per day on average!`){
        document.querySelector('.daily-signatures-needed').innerText = `We need at least ${Math.ceil((1000000-previousSignatureCount)/daysLeft)} signatures per day on average!`;
    }

    animIndex++;
    if (animIndex >= clockAnim.length) {
        animIndex = 0;
    }
}

// Function to fetch historical data and calculate today's signatures
async function fetchTodaySignatures(showLoadingMessage = true) {
    try {
        const todayCountElement = document.querySelector('.today-count');
        
        // Only show loading message on initial load, not during updates
        if (showLoadingMessage && !todayCountElement.dataset.hasValue) {
            todayCountElement.textContent = 'Calculating today\'s signatures...';
        }
        
        // Get current total from main API first
        const currentResponse = await fetch('https://eci.ec.europa.eu/045/public/api/report/progression');
        const currentData = await currentResponse.json();
        const currentTotal = currentData.signatureCount;
        
        // Now get historical data
        const response = await fetch('https://stopkillinggameshistoric-3a5f498bc1f0.herokuapp.com/historic-data');
        let historicData = await response.json();
        
        // Sort data by timestamp in descending order (newest first)
        historicData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Find most recent entry that's not from today
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Filter out entries from today
        const previousEntries = historicData.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate < today;
        });
        
        if (previousEntries.length > 0) {
            // Get the most recent entry before today
            const mostRecentEntry = previousEntries[0];
            
            // Calculate total signatures from that entry
            const previousTotal = mostRecentEntry.data.reduce((sum, country) => sum + country.totalCount, 0);
            
            // Calculate signatures added today
            const todaySignatures = currentTotal - previousTotal;
            
            // Get previous value for animation
            const prevValue = parseInt(todayCountElement.dataset.value) || 0;
            
            // Update the UI with animation if it's different
            if (todaySignatures !== prevValue) {
                // Store the new value as a data attribute
                todayCountElement.dataset.value = todaySignatures;
                todayCountElement.dataset.hasValue = 'true';
                
                // Create and show the updated count with animation
                if (prevValue > 0) {
                    // Remove any existing content
                    todayCountElement.innerHTML = '';
                    
                    // Create a temporary element to animate out
                    const oldCount = document.createElement('span');
                    oldCount.className = 'count-down';
                    oldCount.textContent = `Signatures today: +${prevValue.toLocaleString()}`;
                    
                    // Create a new element to animate in
                    const newCount = document.createElement('span');
                    newCount.className = 'count-up';
                    newCount.textContent = `Signatures today: +${todaySignatures.toLocaleString()}`;
                    
                    // Add both elements to container
                    todayCountElement.appendChild(oldCount);
                    todayCountElement.appendChild(newCount);
                    
                    // Trigger the animation after a brief delay
                    setTimeout(() => {
                        oldCount.style.transform = 'translateY(-100%)';
                        oldCount.style.opacity = '0';
                        newCount.style.transform = 'translateY(0)';
                        newCount.style.opacity = '1';
                    }, 10);
                    
                    // Clean up after animation completes
                    setTimeout(() => {
                        // Replace with a simple text to avoid positioning issues
                        todayCountElement.innerHTML = '';
                        const finalElement = document.createElement('span');
                        finalElement.className = 'count-down'; // Already in correct position
                        finalElement.textContent = `Signatures today: +${todaySignatures.toLocaleString()}`;
                        todayCountElement.appendChild(finalElement);
                    }, 600);
                } else {
                    // First load, just set the text
                    todayCountElement.innerHTML = '';
                    const textElement = document.createElement('span');
                    textElement.className = 'count-down';
                    textElement.textContent = `Signatures today: +${todaySignatures.toLocaleString()}`;
                    todayCountElement.appendChild(textElement);
                }
                
                // Add visual indicator based on activity level
                todayCountElement.classList.remove('high-activity', 'medium-activity');
                if (todaySignatures > 5000) {
                    todayCountElement.classList.add('high-activity');
                } else if (todaySignatures > 2000) {
                    todayCountElement.classList.add('medium-activity');
                }
            }
        } else {
            console.error('No previous entries found to calculate today\'s signatures');
            if (showLoadingMessage) {
                todayCountElement.textContent = 'Could not calculate today\'s signatures';
            }
        }
    } catch (error) {
        console.error('Error calculating today\'s signatures:', error);
        const todayCountElement = document.querySelector('.today-count');
        if (showLoadingMessage) {
            todayCountElement.textContent = 'Could not load today\'s signatures';
        }
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Fetch today's signatures after a short delay to ensure other APIs load first
    setTimeout(fetchTodaySignatures, 1000);
});

// Also update it periodically (every 5 minutes)
setInterval(() => fetchTodaySignatures(false), 5 * 60 * 1000);

// Fetch and display country data
fetch('https://stopkillinggamesdata.montoria.se/')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the data to see what's being returned

        // Sort the countries by percentage
        const sortedCountries = data.signatureCountryCount.sort((a, b) => b.percentage - a.percentage);

        // Display the countries initially
        displayCountries(sortedCountries);
    })
    .catch(error => console.error('Error:', error));

function displayFireworks() {
    if (!fireworksDisplayed) {
        fireworksDisplayed = true;
        const duration = 5 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
        }, 250);
    }
}

/**
 * Calculates the projected date to reach a signature goal.
 *
 * @param {Date} startDate The date from which to start projecting (e.g., today's date or yesterday's date).
 * @param {number} currentSignatures The current total number of signatures.
 * @param {number} targetGoal The total number of signatures to reach.
 * @param {number} dailyVelocity The average number of signatures collected per day.
 * @returns {Date | null} The projected Date object, or null if there's an error in inputs.
 */
function getProjectedFinalDate(startDate, currentSignatures, targetGoal, dailyVelocity) {
    // Input validation
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) { // Check if it's a valid Date object
        console.error("Error: 'startDate' must be a valid Date object.");
        return null;
    }
    if (typeof currentSignatures !== 'number' || currentSignatures < 0) {
        console.error("Error: 'currentSignatures' must be a non-negative number.");
        return null;
    }
    if (typeof targetGoal !== 'number' || targetGoal <= currentSignatures) {
        console.error("Error: 'targetGoal' must be a number greater than 'currentSignatures'.");
        return null;
    }
    if (typeof dailyVelocity !== 'number' || dailyVelocity <= 0) {
        console.error("Error: 'dailyVelocity' must be a positive number.");
        return null;
    }

    // 1. Calculate signatures remaining
    const signaturesRemaining = targetGoal - currentSignatures;

    // 2. Calculate the number of days needed (round up to ensure goal is met)
    const daysNeeded = Math.ceil(signaturesRemaining / dailyVelocity);

    // 3. Create a new Date object from the start date to avoid modifying the original
    const projectedDate = new Date(startDate);

    // 4. Add the calculated days to the new date object
    // setDate() handles month and year rollovers automatically
    projectedDate.setDate(projectedDate.getDate() + daysNeeded);

    return projectedDate;
}

let fireworksDisplayed = false;
let previousSignatureCount = 0;
// Initial fetch and update of total progress data
updateTotalProgress();

// Set interval to update total progress data every 3 seconds
setInterval(()=> updateTotalProgress(), 3000);

//Update time left every second
const startTime = new Date('31 jul 2024 GMT+0200');
const endTime = new Date('31 jul 2025 GMT+0200');
const clockAnim=["🕛","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚"];
let animIndex=0;
setInterval(() => updateTimeLeft(startTime, endTime), 1000);
