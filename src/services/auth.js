const API_BASE_URL = "http://localhost:8080/api/v1/users";

export const loginUser = async ({ username, email, password }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // So cookies like accessToken work
      body: JSON.stringify({ username, email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/current-user`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch user");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    return true;
  } catch (error) {
    throw error;
  }
};
export const createUser = async (formData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      credentials: "include", // important for cookies/sessions
      body: formData,         // formData automatically sets correct headers
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

