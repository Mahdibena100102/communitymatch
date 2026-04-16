const API_URL = "http://localhost:8000"

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
