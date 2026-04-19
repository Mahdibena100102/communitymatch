const API_URL = "https://api-community-match.benahome.net"

async function apiRequest(path: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    })
    return response
}

export { API_URL, apiRequest }
