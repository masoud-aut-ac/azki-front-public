export class User {
    firstName;
    lastName;
    phone;
    Id;
    password;
    confirmPassword;
    role;
}

export class Registration {
    id;
    fullName;
    nationalCode;
    phone;
    refererCode;
    frontImage;
    backImage;
    status;
    role;
    job
}


function toResponse(res) {
    if (res.status === 200 || res.status === 201 || res.status === 204) {
        return {success: true};
    } else if (res.status === 400) {
        return {success: false, reason: 400};
    } else if (res.status === 403) {
        return {success: false, reason: 403};
    } else if (res.status === 404) {
        return {success: false, reason: 404};
    } else if (res.status === 409) {
        return {success: false, reason: 409};
    } else {
        return {success: false};
    }
}

function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token);
}

export function getRole() {
    return localStorage.getItem("role");
}

function setRole(role) {
    localStorage.setItem("role", role);
}

export function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

export const ROLE_ADMIN = "admin";
export const ROLE_SPECIALIST = "specialist";
export const REGISTRATION_AGENT = "agent";
export const REGISTRATION_NETWORK = "networkMarketer";
const baseUrl = "http://localhost:8080";

export const statusMap = {
    new: "جدید",
    inReview: "در حال ویرایش",
    called: "تماس گرفته شده",
    completed: "تکمیل شده",
    rejected: "رد شده"
}

export async function register(registration) {
    const body = new FormData();

    body.set("fullName", registration.fullName);
    body.set("nationalCode", registration.nationalCode);
    body.set("phone", registration.phone);
    body.set("role", registration.role);
    body.set("job", registration.job);
    if (registration.refererCode) {
        body.set("refererCode", registration.refererCode);
    }
    if (registration.frontImage) {
        body.set("frontImage", registration.frontImage);
    }
    if (registration.backImage) {
        body.set("backImage", registration.backImage);
    }

    let res = await fetch(baseUrl + '/public/registrations', {
        method: 'POST',
        body,
    });

    return toResponse(res);

}


export async function adminLogin(phone, password) {
    let res = await fetch(baseUrl + '/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            password,
            phone
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

    let htmlResponse = toResponse(res);
    if (htmlResponse.success) {
        let b = await res.json();
        setToken(b.token);
        setRole(b.role);
    }
    return htmlResponse;
}


export async function creatNewAdmin(user) {
    let res = await fetch(baseUrl + '/admin/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    return toResponse(res);
}

export async function changePasswordByAdmin(userId, password, confirmPassword) {
    let res = await fetch(baseUrl + '/admin/users/password', {
        method: 'PUT',
        body: JSON.stringify({
            password,
            confirmPassword,
            userId
        }),
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return toResponse(res);
}


export async function getRegistrationList(pageNumber, pageSize) {
    let res = await fetch(baseUrl + `/registrations?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return null;
    }
}

export async function getRegistrationById(registrationId) {
    let res = await fetch(baseUrl + `/registrations/${registrationId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return null;
    }
}

export async function getUsers(pageNumber, pageSize) {
    let res = await fetch(baseUrl + `/admin/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return null;
    }
}

export async function getUserById(userId) {
    let res = await fetch(baseUrl + `/admin/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return null;
    }
}

export async function changePasswordByMe(oldPassword, password, confirmPassword) {
    let res = await fetch(baseUrl + '/me/password', {
        method: 'PUT',
        body: JSON.stringify({
            password,
            confirmPassword,
            oldPassword
        }),
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return toResponse(res);
}

export async function updateRegistration(registrationId, notes, status) {
    let res = await fetch(baseUrl + '/registrations', {
        method: 'PATCH',
        body: JSON.stringify({
            registrationId,
            notes,
            status
        }),
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return toResponse(res);
}

export async function lockRegistration(registrationId) {
    let res = await fetch(baseUrl + `/registrations/acquire?id=${registrationId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    return toResponse(res);
}

export async function releaseLockRegistration(registrationId) {
    let res = await fetch(baseUrl + `/registrations/release?id=${registrationId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    return toResponse(res);
}
