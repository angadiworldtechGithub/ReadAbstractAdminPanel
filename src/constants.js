export const HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_TEMP_TOKEN}`,
};

export const FILE_HEADERS = {
  ...HEADERS,
  "Content-Type": "multipart/form-data",
};
