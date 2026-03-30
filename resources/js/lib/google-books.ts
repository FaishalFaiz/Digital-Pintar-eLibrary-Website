/**
 * Google Books API Utility
 * Enforces mandatory API key for all fetch requests.
 */

const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Common fetch function with mandatory API key check
 */
async function apiFetch(endpoint: string = "", params: Record<string, string | number> = {}) {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    if (!apiKey) {
        console.error("Critical: Google Books API Key is missing. Please set VITE_GOOGLE_BOOKS_API_KEY in your .env file.");
        throw new Error("API Key is missing. Google Books integration is disabled.");
    }

    const queryParams = new URL(GOOGLE_BOOKS_BASE_URL + endpoint);
    Object.entries(params).forEach(([key, value]) => {
        queryParams.searchParams.append(key, String(value));
    });
    queryParams.searchParams.append('key', apiKey);

    try {
        const response = await fetch(queryParams.toString());
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Failed to fetch from Google Books: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Google Books API error:", error);
        throw error;
    }
}

/**
 * Search books by query
 */
export async function searchBooks(query: string, maxResults: number = 8) {
    if (!query.trim()) return { items: [] };
    return apiFetch("", { q: query, maxResults });
}

/**
 * Get book details by ID
 */
export async function getBookById(id: string) {
    if (!id) throw new Error("Book ID is required");
    return apiFetch(`/${id}`);
}
