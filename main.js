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
    "cz": "Czechia",
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

// Global variables for progress tracking and API management
let fireworksDisplayed = false;
let previousSignatureCount = 0;
let isUpdatingProgress = false; // Flag to prevent overlapping API requests
let cachedEuApiData = null; // Cache for EU API data
let lastEuApiFetch = 0; // Timestamp of last EU API fetch
const EU_API_CACHE_DURATION = 3000; // Cache duration in milliseconds (3 seconds)

// Centralized function to fetch EU API data with caching
async function fetchEuApiData() {
    const now = Date.now();
    
    // Return cached data if it's still fresh
    if (cachedEuApiData && (now - lastEuApiFetch) < EU_API_CACHE_DURATION) {
        return cachedEuApiData;
    }
    
    // Prevent overlapping requests
    if (isUpdatingProgress) {
        console.log('EU API request already in progress, using cached data or waiting...');
        return cachedEuApiData;
    }
    
    isUpdatingProgress = true;
    
    try {
        const response = await fetch('https://stopkillinggamesdata.montoria.se/realtime');
        const data = await response.json();
        
        // Cache the fresh data
        cachedEuApiData = data;
        lastEuApiFetch = now;
        
        return data;
    } catch (error) {
        console.error('Error fetching EU API data:', error);
        throw error;
    } finally {
        isUpdatingProgress = false;
    }
}

// Function to get the flag URL from local flags folder
function fetchFlagUrl(countryName) {
    const specialCases = {
        "Netherlands": "Flag_of_the_Netherlands",
        "Czechia": "Flag_of_the_Czech_Republic"
    };

    const fileName = specialCases[countryName] || `Flag_of_${countryName.replace(/ /g, '_')}`;
    const flagPath = `flags/${fileName}.svg.png`;
    
    // Return a resolved promise with the local flag path
    return Promise.resolve(flagPath);
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

    const progressClasses = [undefined, 'progress', 'progress-second', 'progress-third', 'progress-fourth', 'progress-fifth', 'progress-sixth', 'progress-seventh'];
    const maxBarPercentage = progressClasses.length * 100; // largest percentage that can be properly represented by bars
    const maxBarIndex = progressClasses.length - 1;
    
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

            // Calculate the width for each layer
            const percentage = item.percentage;
            const isOverflow = percentage >= maxBarPercentage;
            const backBarIndex = isOverflow ? maxBarIndex : Math.floor(percentage / 100);
            const frontBarIndex = isOverflow ? maxBarIndex : backBarIndex + 1;
            const frontBarWidth = isOverflow ? 0 : percentage % 100;

            const progressBarBack = document.createElement('div');
            if (backBarIndex > 0) {
                progressBarBack.className = progressClasses[backBarIndex];
            }

            const progressBarFront = document.createElement('div');
            progressBarFront.className = progressClasses[frontBarIndex];
            
            progressBarBack.style.width = `100%`;
            progressBarFront.style.width = `${frontBarWidth}%`;

            // Conditionally add the border class
            if (frontBarWidth > 1) {
                progressBarFront.classList.add('progress-divider');
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
            countryProgressBar.appendChild(progressBarBack);
            countryProgressBar.appendChild(progressBarFront);

            // Append the percentage text to the progress bar container
            countryProgressBar.appendChild(percentageText);

            // Add the correct frame based on the progress

            if (percentage >= 600) {
                div.classList.add('ruby-frame');
            }
            else if (percentage >= 500) {
                div.classList.add('saphire-frame');
            }
            else if (percentage >= 400) {
                div.classList.add('diamond-frame');
            }
            else if (percentage >= 300) {
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
async function updateTotalProgress() {
    try {
        const data = await fetchEuApiData();
        if (!data) return; // No data available
        
        const { signatureCount, goal } = data;
            const goalReached = signatureCount >= 1000000;
            
            if(goalReached){
                displayFireworks();
                // Show encouragement message when goal is reached
                const encouragementDiv = document.querySelector('.goal-reached-encouragement');
                if (encouragementDiv) {
                    encouragementDiv.style.display = 'block';
                    
                    // Update buffer progress overlays for extra signatures (100k increments)
                    const extraSignatures = Math.max(0, signatureCount - goal);
                    
                    // Update buffer text information
                    const bufferCountElement = document.querySelector('.buffer-count');
                    const nextMilestoneElement = document.querySelector('.next-milestone');
                    
                    if (bufferCountElement) {
                        bufferCountElement.textContent = extraSignatures.toLocaleString();
                    }
                    
                    // Calculate next milestone
                    const currentMilestone = Math.floor(extraSignatures / 100000) + 1;
                    const nextMilestone = currentMilestone * 100000;
                    if (nextMilestoneElement) {
                        if (extraSignatures >= 500000) {
                            nextMilestoneElement.textContent = "Incredible! You've exceeded all expectations!";
                        } else {
                            nextMilestoneElement.textContent = nextMilestone.toLocaleString();
                        }
                    }
                    
                    // Update buffer overlays (each represents 100k signatures)
                    const bufferOverlays = [
                        document.querySelector('.buffer-100k'),
                        document.querySelector('.buffer-200k'),
                        document.querySelector('.buffer-300k'),
                        document.querySelector('.buffer-400k'),
                        document.querySelector('.buffer-500k')
                    ];
                    
                    bufferOverlays.forEach((overlay, index) => {
                        if (overlay) {
                            const milestoneValue = (index + 1) * 100000; // 100k, 200k, 300k, etc.
                            
                            if (extraSignatures >= milestoneValue) {
                                // This milestone is completely filled
                                overlay.style.width = '100%';
                                overlay.style.opacity = '1';
                            } else if (extraSignatures > index * 100000) {
                                // This milestone is partially filled
                                const progressInThisMilestone = extraSignatures - (index * 100000);
                                const percentageOfMilestone = (progressInThisMilestone / 100000) * 100;
                                overlay.style.width = `${percentageOfMilestone}%`;
                                overlay.style.opacity = '1';
                            } else {
                                // This milestone hasn't been reached yet
                                overlay.style.width = '0%';
                                overlay.style.opacity = '0';
                            }
                        }
                    });
                }
            } else {
                // Hide encouragement message and reset buffer overlays if goal is not reached
                const encouragementDiv = document.querySelector('.goal-reached-encouragement');
                if (encouragementDiv) {
                    encouragementDiv.style.display = 'none';
                }
                
                // Reset all buffer overlays
                const bufferOverlays = document.querySelectorAll('.buffer-progress-overlay');
                bufferOverlays.forEach(overlay => {
                    overlay.style.width = '0%';
                    overlay.style.opacity = '0';
                });
            }
            
            // Calculate the percentage towards the goal
            const percentage = ((signatureCount / goal) * 100).toFixed(2);

            //Display confetti when a signature is added
            if (previousSignatureCount < signatureCount && previousSignatureCount !== 0) {
                // Also update today's count when new signatures come in, but don't show loading message
                updateTotalSignatures(/* showLoadingMessage: */ false);
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
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to fetch and calculate yesterday's signatures
async function fetchYesterdaySignatures() {
    try {
        // Get current total from centralized EU API fetch
        const currentData = await fetchEuApiData();
        if (!currentData) {
            throw new Error('No data available from EU API');
        }
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

let globalScheduleStatus = '';
let globalProjectedDate = null;

async function initializeScheduleStatus() {
    try {
        const yesterdayTotal = totalSignaturesFromYesterday.data;
        if (yesterdayTotal && typeof yesterdayTotal === 'number') {
            // Get current data to determine the next milestone
            const currentData = await fetchEuApiData();
            if (!currentData) {
                globalScheduleStatus = 'Unable to fetch current data for milestone calculation.';
                return;
            }
            
            const currentSignatures = currentData.signatureCount;
            // Calculate next milestone (next 100k increment above current signatures)
            const nextMilestone = Math.ceil(currentSignatures / 100000) * 100000;
            
            const response = await fetch('https://stopkillinggameshistoricdata.montoria.se/historic-data');
            const historicData = await response.json();
            historicData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
            const dayBeforeYesterday = new Date(today); dayBeforeYesterday.setDate(today.getDate() - 2);
            const yesterdayEntry = historicData.find(entry => {
                const entryDate = new Date(entry.timestamp);
                return entryDate >= yesterday && entryDate < today;
            });
            const dayBeforeYesterdayEntry = historicData.find(entry => {
                const entryDate = new Date(entry.timestamp);
                return entryDate >= dayBeforeYesterday && entryDate < yesterday;
            });
            if (yesterdayEntry && dayBeforeYesterdayEntry) {
                const yesterdaySum = yesterdayEntry.data.reduce((sum, country) => sum + country.totalCount, 0);
                const dayBeforeYesterdaySum = dayBeforeYesterdayEntry.data.reduce((sum, country) => sum + country.totalCount, 0);
                const yesterdaySignatures = yesterdaySum - dayBeforeYesterdaySum;
                if (yesterdaySignatures > 0) {
                    globalProjectedDate = getProjectedFinalDate(
                        new Date(),
                        currentSignatures,
                        nextMilestone,
                        yesterdaySignatures
                    );
                    if (globalProjectedDate) {
                        const now = new Date();
                        const timeToGoal = globalProjectedDate - now;
                        const daysToGoal = Math.floor(timeToGoal / (1000 * 60 * 60 * 24));
                        const hoursToGoal = Math.floor((timeToGoal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        
                        let timeString;
                        if (daysToGoal > 0) {
                            timeString = `${daysToGoal} days, ${hoursToGoal} hours`;
                        } else {
                            timeString = `${hoursToGoal} hours`;
                        }
                        
                        globalScheduleStatus = `At yesterday's rate, the next milestone (${nextMilestone.toLocaleString()}) will be reached in ${timeString} (by ${globalProjectedDate.toLocaleDateString()} ${globalProjectedDate.toLocaleTimeString()})`;
                    } else {
                        globalScheduleStatus = 'Could not calculate projected final date.';
                    }
                } else {
                    globalScheduleStatus = 'No data for yesterday\'s rate.';
                }
            } else {
                globalScheduleStatus = 'No data for yesterday\'s rate.';
            }
        } else {
            globalScheduleStatus = 'No data for yesterday\'s rate.';
        }
    } catch (e) {
        globalScheduleStatus = 'Error fetching schedule status.';
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

    document.querySelector('.schedule-status').innerText = globalScheduleStatus;

    // Calculate next milestone for daily signatures needed
    const nextMilestone = Math.ceil(previousSignatureCount / 100000) * 100000;
    
    // Only show daily signatures needed if current milestone hasn't been reached
    const dailySignaturesElement = document.querySelector('.daily-signatures-needed');
    if (previousSignatureCount >= nextMilestone) {
        dailySignaturesElement.style.display = 'none';
    } else {
        dailySignaturesElement.style.display = 'block';
        if(dailySignaturesElement.innerText = `We need at least ${Math.ceil((nextMilestone-previousSignatureCount)/daysLeft)} signatures per day on average to reach ${nextMilestone.toLocaleString()}!`){
            dailySignaturesElement.innerText = `We need at least ${Math.ceil((nextMilestone-previousSignatureCount)/daysLeft)} signatures per day on average to reach ${nextMilestone.toLocaleString()}!`;
        }
    }

    animIndex++;
    if (animIndex >= clockAnim.length) {
        animIndex = 0;
    }
}

let totalSignaturesFromYesterday = { loading: false, error: null, data: null };

// Fetch and cache historical data for total signatures from yesterday.
async function fetchTotalSignaturesFromYesterday() {
    console.log('Fetching historical data...');
    totalSignaturesFromYesterday = { loading: true, error: null, data: totalSignaturesFromYesterday.data };

    try {
        const response = await fetch('https://stopkillinggameshistoricdata.montoria.se/historic-data');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const historicData = await response.json();
        console.log('Historical data received:', historicData.length, 'entries');
        historicData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Find most recent entry that's not from today
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const mostRecentEntryNotFromToday = historicData.find(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate < today;
        });


        if (mostRecentEntryNotFromToday === undefined) {
            console.log('No previous entries found');
            totalSignaturesFromYesterday = { loading: false, error: new Error('No previous entries found to calculate today\'s signatures'), data: totalSignaturesFromYesterday.data };
            updateTotalSignatures(/* showLoadingMessage: */ true);
            return;
        }

        const previousTotal = mostRecentEntryNotFromToday.data.reduce((acc, country) => acc + country.totalCount, 0);
        console.log('Previous total signatures:', previousTotal);
        totalSignaturesFromYesterday = { loading: false, error: null, data: previousTotal };
        await initializeScheduleStatus();
        updateTotalSignatures(/* showLoadingMessage: */ true);
    } catch (e) {
        console.error('Error fetching historical data:', e);
        totalSignaturesFromYesterday = { loading: false, error: e, data: totalSignaturesFromYesterday.data };
        updateTotalSignatures(/* showLoadingMessage: */ true);
    }
}

// Function to fetch historical data and calculate today's signatures
async function updateTotalSignatures(showLoadingMessage = true) {
    console.log('updateTotalSignatures called, showLoadingMessage:', showLoadingMessage);
    
    const todayCountElement = document.querySelector('.today-count');
    
    // Only show loading message on initial load, not during updates
    if (showLoadingMessage && !todayCountElement.dataset.hasValue) {
        todayCountElement.textContent = 'Calculating today\'s signatures...';
    }

    if (totalSignaturesFromYesterday.loading) {
        console.log('Historical data still loading, waiting...');
        // Historical data hasn't loaded yet, bail out.
        return;
    }

    if (totalSignaturesFromYesterday.error != null) {
        console.log('Historical data error:', totalSignaturesFromYesterday.error);
        todayCountElement.textContent = 'Couldn\'t calculate today\'s signatures: ' + totalSignaturesFromYesterday.error.toString();
        return;
    }

    if (totalSignaturesFromYesterday.data === null) {
        console.log('No historical data available yet');
        // It's possible that we haven't even requested to fetch the data, so don't update until that is the case.
        return;
    }

    try {
        // Get current total from centralized EU API fetch
        const currentData = await fetchEuApiData();
        if (!currentData) {
            throw new Error('No data available from EU API');
        }

        const currentTotal = currentData.signatureCount;
        const previousTotal = totalSignaturesFromYesterday.data;
        const todaySignatures = Math.max(0, currentTotal - previousTotal);
        
        console.log('Current total:', currentTotal, 'Previous total:', previousTotal, 'Today\'s signatures:', todaySignatures);

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
    } catch (e) {
        console.error('Error calculating today\'s signatures:', e);
        const todayCountElement = document.querySelector('.today-count');
        if (showLoadingMessage) {
            todayCountElement.textContent = 'Loading today\'s signatures...';
        }
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => fetchTotalSignaturesFromYesterday(false), 1000);
});

// Also update it periodically (every 5 minutes)
envInterval = setInterval(() => fetchTotalSignaturesFromYesterday(true), 5 * 60 * 1000);

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

    // 2. Calculate the number of hours needed
    const hoursNeeded = (signaturesRemaining / dailyVelocity) * 24;

    // 3. Create a new Date object from the start date to avoid modifying the original
    const projectedDate = new Date(startDate);

    // 4. Add the calculated hours to the new date object
    projectedDate.setTime(projectedDate.getTime() + (hoursNeeded * 60 * 60 * 1000));

    return projectedDate;
}

// Initial fetch and update of total progress data
updateTotalProgress();

// Set interval to update total progress data every 3 seconds
setInterval(async () => {
    await updateTotalProgress();
    updateTotalSignatures(false);
}, 3000);

//Update time left every second
const startTime = new Date('31 jul 2024 GMT+0200');
const endTime = new Date('31 jul 2025 GMT+0200');
const clockAnim=["🕛","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚"];
let animIndex=0;
setInterval(() => updateTimeLeft(startTime, endTime), 1000);
