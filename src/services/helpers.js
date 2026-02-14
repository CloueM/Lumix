import { PAGES_TO_FETCH } from './config.js';

// Fetch multiple pages at once and combine them into one big list
export async function fetchMultiplePages(baseUrl) {
    try {
        const pagePromises = [];
        
        // Request 5 pages at the same time
        for (let page = 1; page <= PAGES_TO_FETCH; page++) {
            const url = `${baseUrl}&page=${page}`;
            pagePromises.push(fetch(url));
        }

        const responses = await Promise.all(pagePromises);

        // Make sure all requests worked
        for (const res of responses) {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }

        const dataArray = await Promise.all(responses.map(res => res.json()));

        // Put all the movies into one array
        const combinedResults = dataArray.reduce((acc, data) => {
            return acc.concat(data.results);
        }, []);

        return {
            ...dataArray[0],
            results: combinedResults,
            total_results: combinedResults.length
        };
    } catch (error) {
        console.error("Error fetching multiple pages:", error);
        throw error;
    }
}
