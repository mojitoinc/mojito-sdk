export const session = (keyVariable: string, getData: boolean, data?: any) => {
  if (typeof window !== 'undefined') {
    if (getData) {
      const sessionData = sessionStorage.getItem(keyVariable);
      const response = sessionData ? JSON.parse(sessionData ?? '') : null;
      return response;
    }
    sessionStorage.setItem(keyVariable, JSON.stringify(data));
    return null;
  }
  return null;
};
