export const getCookie = (name: string): string => {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookiePart = parts.pop();
      if (cookiePart) {
        const cookieValue = cookiePart.split(';')[0];
        return cookieValue || '';
      }
    }
  }

  return '';
};

export const setCookie = (
  name: string,
  value: string,
  minutes: number
): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
