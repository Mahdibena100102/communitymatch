export function saveUser(data: { user_id?: number; admin_id?: number; role: string; user_first_name?: string; gender?: string }) {
    if (data.user_id) localStorage.setItem("cm_user_id", String(data.user_id))
    if (data.admin_id) localStorage.setItem("cm_user_id", String(data.admin_id))
    localStorage.setItem("cm_role", data.role)
    if (data.user_first_name) localStorage.setItem("cm_first_name", data.user_first_name)
    if (data.gender) localStorage.setItem("cm_gender", data.gender)
}

export function getUserId(): number | null {
    const id = localStorage.getItem("cm_user_id")
    return id ? Number(id) : null
}

export function getRole(): string | null {
    return localStorage.getItem("cm_role")
}

export function getGender(): string | null {
    return localStorage.getItem("cm_gender")
}

export function getFirstName(): string | null {
    return localStorage.getItem("cm_first_name")
}

export function clearUser() {
    localStorage.removeItem("cm_user_id")
    localStorage.removeItem("cm_role")
    localStorage.removeItem("cm_first_name")
    localStorage.removeItem("cm_gender")
}
