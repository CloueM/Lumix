import { PAGES_TO_FETCH } from './config.js';

// Fetches multiple pages from the API and merges all results into one array
export async function fetchMultiplePages(baseUrl) {
    const pagePromises = [];

    for (let page = 1; page <= PAGES_TO_FETCH; page++) {
        const url = `${baseUrl}&page=${page}`;
        pagePromises.push(fetch(url));
    }

    const responses = await Promise.all(pagePromises);

    for (const res of responses) {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    }

    const dataArray = await Promise.all(responses.map(res => res.json()));

    // Flatten all page results into one big array
    const allResults = dataArray.reduce((acc, data) => {
        return acc.concat(data.results);
    }, []);

    return {
        ...dataArray[0],
        results: allResults,
        total_results: allResults.length
    };
}
