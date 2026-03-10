// Admin authentication utilities
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Admin@123456";
const TOKEN_KEY = "admin_token_v2";
const TIMESTAMP_KEY = "admin_token_timestamp";
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function verifyAdminCredentials(
  username: string,
  password: string,
): boolean {
  return (
    username.trim() === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD &&
    username.length > 0 &&
    password.length > 0
  );
}

export function setAdminToken(token: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error("Failed to set admin token:", error);
    }
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const timestamp = localStorage.getItem(TIMESTAMP_KEY);

      if (!token || !timestamp) {
        return null;
      }

      // Check if token has expired
      const tokenAge = Date.now() - parseInt(timestamp);
      if (tokenAge > TOKEN_EXPIRY) {
        clearAdminToken();
        return null;
      }

      return token;
    } catch (error) {
      console.error("Failed to get admin token:", error);
      return null;
    }
  }
  return null;
}

export function clearAdminToken(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    } catch (error) {
      console.error("Failed to clear admin token:", error);
    }
  }
}

export function isAdminLoggedIn(): boolean {
  try {
    const token = getAdminToken();
    return (
      token !== null &&
      token !== undefined &&
      token === "admin_session_token_v2"
    );
  } catch (error) {
    console.error("Failed to check admin login status:", error);
    return false;
  }
}
