/**
 * Class for local storage operations.
 */
export class LocalStorage {
  static Keys = {
    Language: 'timothy-caish-website-language'
  };

  /**
   * Get a value from local storage.
   * @param key The key for the value.
   * @returns The value or null if it does not exist.
   */
  static get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  /**
   * Set a key/value pair in local storage.
   * @param key The key for the value.
   * @param value The key/value pair to set.
   */
  static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
