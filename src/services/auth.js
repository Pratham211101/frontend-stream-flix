

export const loginUser = async ({ username, email, password }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // So cookies like accessToken work
      body: JSON.stringify({ username, email, password }),
    });

    const text = await res.text();

    // Check if response is JSON
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Invalid response from server.");
    }

    if (!res.ok) {
    throw new Error(result?.message || "Login failed");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/current-user`, {
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
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/logout`, {
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
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
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

