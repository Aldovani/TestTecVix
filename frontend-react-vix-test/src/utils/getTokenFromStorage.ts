import { LOCAL_STORAGE_KEYS } from "../configs/localStorageKeys";

const getTokenFromStorage = (): string | null => {
  try {
    const userProfile = localStorage.getItem(LOCAL_STORAGE_KEYS.userProfile);

    if (userProfile) {
      const parsed = JSON.parse(userProfile);
      return parsed?.state?.token || null;
    }

  } catch (error) {
    console.error("Error parsing userProfile from localStorage:", error);
  }
  return null;
};

export { getTokenFromStorage };
