/**
 * Vistara Event Hub - Storage Manager
 * Encapsulates LocalStorage access with graceful in-memory fallback
 * for stored passes, registrations, and theme preference.
 */

const StorageManager = (() => {
  const REGISTRATIONS_KEY = "vistara_registrations_v1";
  const THEME_KEY = "vistara_theme_v1";

  let memoryStore = {
    registrations: [],
    theme: null
  };

  const isStorageUsable = () => {
    try {
      const probe = "__vistara_probe__";
      window.localStorage.setItem(probe, probe);
      window.localStorage.removeItem(probe);
      return true;
    } catch (e) {
      return false;
    }
  };

  const hasStorage = isStorageUsable();

  return {
    getTheme() {
      if (hasStorage) {
        return window.localStorage.getItem(THEME_KEY);
      }
      return memoryStore.theme;
    },

    saveTheme(theme) {
      if (hasStorage) {
        window.localStorage.setItem(THEME_KEY, theme);
      }
      memoryStore.theme = theme;
    },

    getRegistrations() {
      if (hasStorage) {
        try {
          const raw = window.localStorage.getItem(REGISTRATIONS_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          console.warn("StorageManager: Failed to parse stored passes", e);
          return [];
        }
      }
      return memoryStore.registrations;
    },

    saveRegistration(registration) {
      const all = this.getRegistrations();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newEntry = {
        id: registration.id || `VIS-2026-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`,
        createdAt: new Date().toISOString(),
        ...registration
      };
      const updated = [newEntry, ...all];

      if (hasStorage) {
        try {
          window.localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error("StorageManager: Write error", e);
        }
      }
      memoryStore.registrations = updated;
      return newEntry;
    },

    deleteRegistration(id) {
      const all = this.getRegistrations();
      const updated = all.filter((r) => r.id !== id);

      if (hasStorage) {
        window.localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
      }
      memoryStore.registrations = updated;
      return updated;
    },

    getRegistrationById(id) {
      const all = this.getRegistrations();
      return all.find((r) => r.id === id) || null;
    },

    clearAllRegistrations() {
      if (hasStorage) {
        window.localStorage.removeItem(REGISTRATIONS_KEY);
      }
      memoryStore.registrations = [];
    }
  };
})();
