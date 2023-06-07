export const HEADERS = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const FILE_HEADERS = (token) => ({
  ...HEADERS(token),
  "Content-Type": "multipart/form-data",
});
