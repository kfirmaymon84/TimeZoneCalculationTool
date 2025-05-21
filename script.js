// Initialize Luxon
const { DateTime } = luxon;

// Store selected countries and their times
let selectedCountries = new Map();
let baseCountry = null;
let baseTime = null;

// DOM Elements
const baseCountryInput = document.getElementById('baseCountry');
const baseCountryDropdown = document.getElementById('baseCountryDropdown');
const baseTimeInput = document.getElementById('baseTime');
const compareCountryInput = document.getElementById('compareCountry');
const compareCountryDropdown = document.getElementById('compareCountryDropdown');
const addCountryBtn = document.getElementById('addCountry');
const comparisonResults = document.getElementById('comparisonResults');

// Track currently selected item in dropdown
let currentFocus = -1;

// Comprehensive list of countries and cities with their timezones
const countriesWithTimezones = {
    'Afghanistan': 'Asia/Kabul',
    'Albania': 'Europe/Tirane',
    'Algeria': 'Africa/Algiers',
    'Andorra': 'Europe/Andorra',
    'Angola': 'Africa/Luanda',
    'Antigua and Barbuda': 'America/Antigua',
    'Argentina': 'America/Argentina/Buenos_Aires',
    'Armenia': 'Asia/Yerevan',
    'Australia': {
        'Sydney': 'Australia/Sydney',
        'Perth': 'Australia/Perth',
        'Adelaide': 'Australia/Adelaide',
        'Brisbane': 'Australia/Brisbane',
        'Melbourne': 'Australia/Melbourne',
        'Darwin': 'Australia/Darwin',
        'Hobart': 'Australia/Hobart'
    },
    'Austria': 'Europe/Vienna',
    'Azerbaijan': 'Asia/Baku',
    'Bahamas': 'America/Nassau',
    'Bahrain': 'Asia/Bahrain',
    'Bangladesh': 'Asia/Dhaka',
    'Barbados': 'America/Barbados',
    'Belarus': 'Europe/Minsk',
    'Belgium': 'Europe/Brussels',
    'Belize': 'America/Belize',
    'Benin': 'Africa/Porto-Novo',
    'Bhutan': 'Asia/Thimphu',
    'Bolivia': 'America/La_Paz',
    'Bosnia and Herzegovina': 'Europe/Sarajevo',
    'Botswana': 'Africa/Gaborone',
    'Brazil': {
        'Sao Paulo': 'America/Sao_Paulo',
        'Rio de Janeiro': 'America/Sao_Paulo',
        'Manaus': 'America/Manaus',
        'Recife': 'America/Recife',
        'Fortaleza': 'America/Fortaleza'
    },
    'Brunei': 'Asia/Brunei',
    'Bulgaria': 'Europe/Sofia',
    'Burkina Faso': 'Africa/Ouagadougou',
    'Burundi': 'Africa/Bujumbura',
    'Cambodia': 'Asia/Phnom_Penh',
    'Cameroon': 'Africa/Douala',
    'Canada': {
        'Toronto': 'America/Toronto',
        'Vancouver': 'America/Vancouver',
        'Montreal': 'America/Toronto',
        'Calgary': 'America/Edmonton',
        'Halifax': 'America/Halifax',
        'Winnipeg': 'America/Winnipeg',
        'Edmonton': 'America/Edmonton',
        'St. John\'s': 'America/St_Johns'
    },
    'Cape Verde': 'Atlantic/Cape_Verde',
    'Central African Republic': 'Africa/Bangui',
    'Chad': 'Africa/Ndjamena',
    'Chile': 'America/Santiago',
    'China': 'Asia/Shanghai',
    'Colombia': 'America/Bogota',
    'Comoros': 'Indian/Comoro',
    'Congo': 'Africa/Brazzaville',
    'Costa Rica': 'America/Costa_Rica',
    'Croatia': 'Europe/Zagreb',
    'Cuba': 'America/Havana',
    'Cyprus': 'Asia/Nicosia',
    'Czech Republic': 'Europe/Prague',
    'Denmark': 'Europe/Copenhagen',
    'Djibouti': 'Africa/Djibouti',
    'Dominica': 'America/Dominica',
    'Dominican Republic': 'America/Santo_Domingo',
    'Ecuador': 'America/Guayaquil',
    'Egypt': 'Africa/Cairo',
    'El Salvador': 'America/El_Salvador',
    'Equatorial Guinea': 'Africa/Malabo',
    'Eritrea': 'Africa/Asmara',
    'Estonia': 'Europe/Tallinn',
    'Ethiopia': 'Africa/Addis_Ababa',
    'Fiji': 'Pacific/Fiji',
    'Finland': 'Europe/Helsinki',
    'France': 'Europe/Paris',
    'Gabon': 'Africa/Libreville',
    'Gambia': 'Africa/Banjul',
    'Georgia': 'Asia/Tbilisi',
    'Germany': 'Europe/Berlin',
    'Ghana': 'Africa/Accra',
    'Greece': 'Europe/Athens',
    'Grenada': 'America/Grenada',
    'Guatemala': 'America/Guatemala',
    'Guinea': 'Africa/Conakry',
    'Guinea-Bissau': 'Africa/Bissau',
    'Guyana': 'America/Guyana',
    'Haiti': 'America/Port-au-Prince',
    'Honduras': 'America/Tegucigalpa',
    'Hungary': 'Europe/Budapest',
    'Iceland': 'Atlantic/Reykjavik',
    'India': 'Asia/Kolkata',
    'Indonesia': {
        'Jakarta': 'Asia/Jakarta',
        'Bali': 'Asia/Makassar',
        'Surabaya': 'Asia/Jakarta',
        'Medan': 'Asia/Jakarta',
        'Makassar': 'Asia/Makassar',
        'Jayapura': 'Asia/Jayapura'
    },
    'Iran': 'Asia/Tehran',
    'Iraq': 'Asia/Baghdad',
    'Ireland': 'Europe/Dublin',
    'Israel': 'Asia/Jerusalem',
    'Italy': 'Europe/Rome',
    'Jamaica': 'America/Jamaica',
    'Japan': 'Asia/Tokyo',
    'Jordan': 'Asia/Amman',
    'Kazakhstan': {
        'Almaty': 'Asia/Almaty',
        'Astana': 'Asia/Almaty',
        'Aktobe': 'Asia/Aqtobe',
        'Atyrau': 'Asia/Atyrau',
        'Oral': 'Asia/Oral'
    },
    'Kenya': 'Africa/Nairobi',
    'Kiribati': 'Pacific/Tarawa',
    'Kuwait': 'Asia/Kuwait',
    'Kyrgyzstan': 'Asia/Bishkek',
    'Laos': 'Asia/Vientiane',
    'Latvia': 'Europe/Riga',
    'Lebanon': 'Asia/Beirut',
    'Lesotho': 'Africa/Maseru',
    'Liberia': 'Africa/Monrovia',
    'Libya': 'Africa/Tripoli',
    'Liechtenstein': 'Europe/Vaduz',
    'Lithuania': 'Europe/Vilnius',
    'Luxembourg': 'Europe/Luxembourg',
    'Madagascar': 'Indian/Antananarivo',
    'Malawi': 'Africa/Blantyre',
    'Malaysia': 'Asia/Kuala_Lumpur',
    'Maldives': 'Indian/Maldives',
    'Mali': 'Africa/Bamako',
    'Malta': 'Europe/Malta',
    'Marshall Islands': 'Pacific/Majuro',
    'Mauritania': 'Africa/Nouakchott',
    'Mauritius': 'Indian/Mauritius',
    'Mexico': {
        'Mexico City': 'America/Mexico_City',
        'Tijuana': 'America/Tijuana',
        'Cancun': 'America/Cancun',
        'Merida': 'America/Merida',
        'Monterrey': 'America/Monterrey',
        'Chihuahua': 'America/Chihuahua',
        'Hermosillo': 'America/Hermosillo',
        'Mazatlan': 'America/Mazatlan'
    },
    'Micronesia': 'Pacific/Pohnpei',
    'Moldova': 'Europe/Chisinau',
    'Monaco': 'Europe/Monaco',
    'Mongolia': 'Asia/Ulaanbaatar',
    'Montenegro': 'Europe/Podgorica',
    'Morocco': 'Africa/Casablanca',
    'Mozambique': 'Africa/Maputo',
    'Myanmar': 'Asia/Yangon',
    'Namibia': 'Africa/Windhoek',
    'Nauru': 'Pacific/Nauru',
    'Nepal': 'Asia/Kathmandu',
    'Netherlands': 'Europe/Amsterdam',
    'New Zealand': {
        'Auckland': 'Pacific/Auckland',
        'Wellington': 'Pacific/Auckland',
        'Christchurch': 'Pacific/Auckland'
    },
    'Nicaragua': 'America/Managua',
    'Niger': 'Africa/Niamey',
    'Nigeria': 'Africa/Lagos',
    'North Korea': 'Asia/Pyongyang',
    'North Macedonia': 'Europe/Skopje',
    'Norway': 'Europe/Oslo',
    'Oman': 'Asia/Muscat',
    'Pakistan': 'Asia/Karachi',
    'Palau': 'Pacific/Palau',
    'Palestine': 'Asia/Gaza',
    'Panama': 'America/Panama',
    'Papua New Guinea': 'Pacific/Port_Moresby',
    'Paraguay': 'America/Asuncion',
    'Peru': 'America/Lima',
    'Philippines': 'Asia/Manila',
    'Poland': 'Europe/Warsaw',
    'Portugal': 'Europe/Lisbon',
    'Qatar': 'Asia/Qatar',
    'Romania': 'Europe/Bucharest',
    'Russia': {
        'Moscow': 'Europe/Moscow',
        'St. Petersburg': 'Europe/Moscow',
        'Novosibirsk': 'Asia/Novosibirsk',
        'Yekaterinburg': 'Asia/Yekaterinburg',
        'Krasnoyarsk': 'Asia/Krasnoyarsk',
        'Irkutsk': 'Asia/Irkutsk',
        'Vladivostok': 'Asia/Vladivostok',
        'Magadan': 'Asia/Magadan',
        'Kamchatka': 'Asia/Kamchatka'
    },
    'Rwanda': 'Africa/Kigali',
    'Saint Kitts and Nevis': 'America/St_Kitts',
    'Saint Lucia': 'America/St_Lucia',
    'Saint Vincent and the Grenadines': 'America/St_Vincent',
    'Samoa': 'Pacific/Apia',
    'San Marino': 'Europe/San_Marino',
    'Sao Tome and Principe': 'Africa/Sao_Tome',
    'Saudi Arabia': 'Asia/Riyadh',
    'Senegal': 'Africa/Dakar',
    'Serbia': 'Europe/Belgrade',
    'Seychelles': 'Indian/Mahe',
    'Sierra Leone': 'Africa/Freetown',
    'Singapore': 'Asia/Singapore',
    'Slovakia': 'Europe/Bratislava',
    'Slovenia': 'Europe/Ljubljana',
    'Solomon Islands': 'Pacific/Guadalcanal',
    'Somalia': 'Africa/Mogadishu',
    'South Africa': 'Africa/Johannesburg',
    'South Korea': 'Asia/Seoul',
    'South Sudan': 'Africa/Juba',
    'Spain': 'Europe/Madrid',
    'Sri Lanka': 'Asia/Colombo',
    'Sudan': 'Africa/Khartoum',
    'Suriname': 'America/Paramaribo',
    'Sweden': 'Europe/Stockholm',
    'Switzerland': 'Europe/Zurich',
    'Syria': 'Asia/Damascus',
    'Taiwan': 'Asia/Taipei',
    'Tajikistan': 'Asia/Dushanbe',
    'Tanzania': 'Africa/Dar_es_Salaam',
    'Thailand': 'Asia/Bangkok',
    'Timor-Leste': 'Asia/Dili',
    'Togo': 'Africa/Lome',
    'Tonga': 'Pacific/Tongatapu',
    'Trinidad and Tobago': 'America/Port_of_Spain',
    'Tunisia': 'Africa/Tunis',
    'Turkey': 'Europe/Istanbul',
    'Turkmenistan': 'Asia/Ashgabat',
    'Tuvalu': 'Pacific/Funafuti',
    'Uganda': 'Africa/Kampala',
    'Ukraine': 'Europe/Kiev',
    'United Arab Emirates': 'Asia/Dubai',
    'United Kingdom': 'Europe/London',
    'United States': {
        'New York': 'America/New_York',
        'Los Angeles': 'America/Los_Angeles',
        'Chicago': 'America/Chicago',
        'Houston': 'America/Chicago',
        'Phoenix': 'America/Phoenix',
        'Denver': 'America/Denver',
        'Seattle': 'America/Los_Angeles',
        'Miami': 'America/New_York',
        'Boston': 'America/New_York',
        'Atlanta': 'America/New_York',
        'Dallas': 'America/Chicago',
        'San Francisco': 'America/Los_Angeles',
        'Washington DC': 'America/New_York',
        'Honolulu': 'Pacific/Honolulu',
        'Anchorage': 'America/Anchorage'
    },
    'Uruguay': 'America/Montevideo',
    'Uzbekistan': 'Asia/Tashkent',
    'Vanuatu': 'Pacific/Efate',
    'Vatican City': 'Europe/Vatican',
    'Venezuela': 'America/Caracas',
    'Vietnam': 'Asia/Ho_Chi_Minh',
    'Yemen': 'Asia/Aden',
    'Zambia': 'Africa/Lusaka',
    'Zimbabwe': 'Africa/Harare'
};

// Initialize the country dropdowns
function initializeCountryDropdowns() {
    // We don't need to store all countries in an array anymore
    // as we're searching directly from the countriesWithTimezones object
}

// Filter countries based on search input
function filterCountries(searchInput, dropdownElement) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredOptions = [];
    
    // If search term is empty, don't show any results
    if (!searchTerm) {
        dropdownElement.innerHTML = '';
        dropdownElement.classList.remove('active');
        return;
    }
    
    // Iterate through countries
    for (const [country, timezone] of Object.entries(countriesWithTimezones)) {
        if (typeof timezone === 'string') {
            // Single timezone country
            if (country.toLowerCase().includes(searchTerm)) {
                filteredOptions.push(`${country}`);
            }
        } else {
            // Multiple timezone country - check both country and cities
            const countryMatches = country.toLowerCase().includes(searchTerm);
            
            // Check each city
            for (const [city, cityTimezone] of Object.entries(timezone)) {
                if (countryMatches || city.toLowerCase().includes(searchTerm)) {
                    filteredOptions.push(`${country} - ${city}`);
                }
            }
        }
    }
    
    // Sort results to prioritize matches at the start of words
    filteredOptions.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const aStartsWith = aLower.startsWith(searchTerm);
        const bStartsWith = bLower.startsWith(searchTerm);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return aLower.localeCompare(bLower);
    });
    
    // Clear and repopulate the dropdown
    dropdownElement.innerHTML = '';
    currentFocus = -1;
    
    if (filteredOptions.length > 0) {
        filteredOptions.forEach((option, index) => {
            const item = document.createElement('div');
            item.className = 'search-dropdown-item';
            item.textContent = option;
            item.onclick = () => {
                selectCountry(searchInput, dropdownElement, option);
            };
            dropdownElement.appendChild(item);
        });
        dropdownElement.classList.add('active');
    } else {
        dropdownElement.classList.remove('active');
    }
}

// Select a country from the dropdown
function selectCountry(inputElement, dropdownElement, option) {
    inputElement.value = option;
    dropdownElement.classList.remove('active');
    
    // Extract country and city (if present)
    const [country, city] = option.split(' - ');
    
    if (inputElement === baseCountryInput) {
        if (city) {
            // If city is present, use its timezone
            baseCountry = countriesWithTimezones[country][city];
        } else {
            // If no city, use country's timezone
            baseCountry = countriesWithTimezones[country];
        }
        if (baseTime) {
            updateComparisonResults();
        }
    }
}

// Handle keyboard navigation
function handleKeyNavigation(e, inputElement, dropdownElement) {
    const items = dropdownElement.getElementsByClassName('search-dropdown-item');
    
    if (items.length === 0) return;

    // Down arrow
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        addActive(items);
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        addActive(items);
    }
    // Enter key
    else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1) {
            if (items) {
                items[currentFocus].click();
            }
        }
    }
    // Escape key
    else if (e.key === 'Escape') {
        dropdownElement.classList.remove('active');
        currentFocus = -1;
    }
}

// Add active class to current item
function addActive(items) {
    if (!items) return false;
    
    // Remove active class from all items
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('selected');
    }
    
    // Add active class to current item
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    
    items[currentFocus].classList.add('selected');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
}

// Handle input focus and blur
function setupSearchableInput(inputElement, dropdownElement) {
    inputElement.addEventListener('input', () => {
        filterCountries(inputElement, dropdownElement);
    });

    inputElement.addEventListener('focus', () => {
        // Show dropdown with filtered results when focused
        if (inputElement.value) {
            filterCountries(inputElement, dropdownElement);
        }
    });

    inputElement.addEventListener('keydown', (e) => {
        handleKeyNavigation(e, inputElement, dropdownElement);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!inputElement.contains(e.target) && !dropdownElement.contains(e.target)) {
            dropdownElement.classList.remove('active');
            currentFocus = -1;
        }
    });
}

// Calculate time in different timezone
function calculateTimeInTimezone(baseTime, fromTimezone, toTimezone) {
    const dt = DateTime.fromFormat(baseTime, 'HH:mm', { zone: fromTimezone });
    return dt.setZone(toTimezone).toFormat('HH:mm');
}

// Update comparison results
function updateComparisonResults() {
    if (!baseCountry || !baseTime) return;

    comparisonResults.innerHTML = '';
    
    // Add base country time
    const baseCard = createTimeCard(baseCountryInput.value, baseTime);
    comparisonResults.appendChild(baseCard);

    // Add comparison countries
    selectedCountries.forEach((time, country) => {
        const card = createTimeCard(country, time);
        comparisonResults.appendChild(card);
    });
}

// Create a time card element
function createTimeCard(country, time) {
    const card = document.createElement('div');
    card.className = 'time-card';
    
    const title = document.createElement('h3');
    title.textContent = country;
    
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'time';
    timeDisplay.textContent = time;
    
    card.appendChild(title);
    card.appendChild(timeDisplay);

    // Add remove button for comparison countries
    if (country !== baseCountry) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeCountry(country);
        card.appendChild(removeBtn);
    }

    return card;
}

// Remove a country from comparison
function removeCountry(country) {
    selectedCountries.delete(country);
    updateComparisonResults();
}

// Event Listeners
baseTimeInput.addEventListener('change', () => {
    baseTime = baseTimeInput.value;
    if (baseCountry) {
        // Recalculate all times when base time changes
        const newSelectedCountries = new Map();
        selectedCountries.forEach((_, country) => {
            const [selectedCountry, selectedCity] = country.split(' - ');
            let selectedTimezone;
            if (selectedCity) {
                selectedTimezone = countriesWithTimezones[selectedCountry][selectedCity];
            } else {
                selectedTimezone = countriesWithTimezones[selectedCountry];
            }
            const convertedTime = calculateTimeInTimezone(baseTime, baseCountry, selectedTimezone);
            newSelectedCountries.set(country, convertedTime);
        });
        selectedCountries = newSelectedCountries;
        updateComparisonResults();
    }
});

addCountryBtn.addEventListener('click', () => {
    const selectedOption = compareCountryInput.value;
    const [selectedCountry, selectedCity] = selectedOption.split(' - ');
    
    if (!selectedCountry || !baseCountry || !baseTime) {
        alert('Please select a base country and time first.');
        return;
    }

    let selectedTimezone;
    if (selectedCity) {
        selectedTimezone = countriesWithTimezones[selectedCountry][selectedCity];
    } else {
        selectedTimezone = countriesWithTimezones[selectedCountry];
    }

    if (selectedTimezone === baseCountry) {
        alert('Please select a different country to compare with.');
        return;
    }

    if (selectedCountries.has(selectedOption)) {
        alert('This location is already added for comparison.');
        return;
    }

    const convertedTime = calculateTimeInTimezone(baseTime, baseCountry, selectedTimezone);
    selectedCountries.set(selectedOption, convertedTime);
    updateComparisonResults();
    
    // Clear the input and reset dropdown
    compareCountryInput.value = '';
    compareCountryDropdown.innerHTML = '';
    compareCountryDropdown.classList.remove('active');
});

// Add event listener for the Add button
document.getElementById('addCountry').addEventListener('click', () => {
    const selectedCountry = compareCountryInput.value.trim();
    if (selectedCountry && !selectedCountries.includes(selectedCountry)) {
        selectedCountries.push(selectedCountry);
        updateComparisonResults();
        compareCountryInput.value = '';
        compareCountryDropdown.style.display = 'none';
    }
});

// Add event listener for Clear All button
document.getElementById('clearAll').addEventListener('click', () => {
    selectedCountries = [];
    updateComparisonResults();
});

// Initialize the application
initializeCountryDropdowns();
setupSearchableInput(baseCountryInput, baseCountryDropdown);
setupSearchableInput(compareCountryInput, compareCountryDropdown); 