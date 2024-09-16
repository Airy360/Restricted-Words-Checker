document.getElementById('data-table').addEventListener('paste', (e) => {
    e.preventDefault();

    let clipboardData = (e.clipboardData || window.clipboardData).getData('text');
    let rows = clipboardData.split('\n');

    // Get the starting point in the table
    let startCell = document.activeElement;
    let cells = Array.from(document.querySelectorAll('td[contenteditable="true"]'));
    let startIndex = cells.indexOf(startCell);

    let currentIndex = startIndex;

    rows.forEach(row => {
        let values = row.split('\t');
        values.forEach(value => {
            if (currentIndex < cells.length) {
                cells[currentIndex].textContent = value.trim();  // Paste value in the current cell
                currentIndex++;  // Move to the next cell
            }
        });
    });
});

document.getElementById('clear-all-btn').addEventListener('click', () => {
    const cells = document.querySelectorAll('#data-table td');
    cells.forEach(cell => {
        cell.innerText = ''; // Clear the cell content
    });
});

// Function to retrieve data from the spreadsheet
function getSpreadsheetData() {
    const rows = document.querySelectorAll('#data-table tbody tr');
    const keywords = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            const keyword = {
                keywordText: cells[0].textContent.trim(), // Assuming keyword text is in the first cell
                volume: parseInt(cells[1].textContent) || 0,
                cpr: parseInt(cells[2].textContent) || 0,
                titleDensity: parseInt(cells[3].textContent) || 0,
                rank1: parseInt(cells[4].textContent) || 0,
                rank2: parseInt(cells[5].textContent) || 0,
                rank3: parseInt(cells[6].textContent) || 0,
                rank4: parseInt(cells[7].textContent) || 0
            };
            keywords.push(keyword);
        }
    });

    return keywords;
}

// Function to calculate the average organic competitor rank
function calculateAverageRank(keyword) {
    const ranks = [keyword.rank1, keyword.rank2, keyword.rank3, keyword.rank4];
    const sum = ranks.reduce((a, b) => a + b, 0); // Sum of ranks
    return sum / ranks.length; // Average of ranks
}

// Function to select keywords for titles, bullet points, and spare keywords
function selectKeywords(keywords) {
    // Sort keywords by Volume, CPR, Title Density, and average rank
    keywords.sort((a, b) => {
        const avgRankA = calculateAverageRank(a);
        const avgRankB = calculateAverageRank(b);
        return (
            b.volume - a.volume ||
            b.cpr - a.cpr ||
            b.titleDensity - a.titleDensity ||
            avgRankA - avgRankB
        );
    });

    // Pick top 3 for titles
    const titleKeywords = keywords.slice(0, 3);

    // Remove title keywords from the list
    const remainingKeywords = keywords.slice(3);

    // Sort remaining keywords by Volume, CPR, and average rank
    remainingKeywords.sort((a, b) => {
        const avgRankA = calculateAverageRank(a);
        const avgRankB = calculateAverageRank(b);
        return (
            b.volume - a.volume ||
            b.cpr - a.cpr ||
            avgRankA - avgRankB
        );
    });

    // Pick top 5 for bullet points
    const bulletPointKeywords = remainingKeywords.slice(0, 5);

    // Pick 2 spare keywords
    const spareKeywords = remainingKeywords.slice(5, 7);

    // Return results
    return { titleKeywords, bulletPointKeywords, spareKeywords };
}

// Function to handle form submission and keyword selection
function handleSubmit() {
    const keywords = getSpreadsheetData(); // Retrieve data from the spreadsheet

    // Perform keyword selection
    const { titleKeywords, bulletPointKeywords, spareKeywords } = selectKeywords(keywords);

    // Display results in the HTML
    displayResults(titleKeywords, bulletPointKeywords, spareKeywords);
}

// Function to display results in the HTML
function displayResults(titleKeywords, bulletPointKeywords, spareKeywords) {
    const titleList = document.getElementById('title-keywords-list');
    const bulletList = document.getElementById('bullet-points-keywords-list');
    const spareList = document.getElementById('spare-keywords-list');

    // Clear previous results
    titleList.innerHTML = '';
    bulletList.innerHTML = '';
    spareList.innerHTML = '';

    // Display title keywords
    titleKeywords.forEach(keyword => {
        const li = document.createElement('li');
        li.textContent = `Keyword: ${keyword.keywordText}, Volume: ${keyword.volume}, CPR: ${keyword.cpr}, Title Density: ${keyword.titleDensity}, Average Rank: ${calculateAverageRank(keyword).toFixed(2)}`;
        titleList.appendChild(li);
    });

    // Display bullet point keywords
    bulletPointKeywords.forEach(keyword => {
        const li = document.createElement('li');
        li.textContent = `Keyword: ${keyword.keywordText}, Volume: ${keyword.volume}, CPR: ${keyword.cpr}, Average Rank: ${calculateAverageRank(keyword).toFixed(2)}`;
        bulletList.appendChild(li);
    });

    // Display spare keywords
    spareKeywords.forEach(keyword => {
        const li = document.createElement('li');
        li.textContent = `Keyword: ${keyword.keywordText}, Volume: ${keyword.volume}, CPR: ${keyword.cpr}, Average Rank: ${calculateAverageRank(keyword).toFixed(2)}`;
        spareList.appendChild(li);
    });
}

// Attach event listener to the submit button
document.getElementById('submit-btn').addEventListener('click', handleSubmit);