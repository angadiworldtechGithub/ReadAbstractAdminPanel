export const HEADERS = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const FILE_HEADERS = (token) => ({
  ...HEADERS(token),
  "Content-Type": "multipart/form-data",
});

export function createStaticUrl(folder) {
  return function inner(filename) {
    return `${process.env.REACT_APP_URL}/${folder}/${filename}`;
  };
}
