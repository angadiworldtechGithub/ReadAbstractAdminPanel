export function createStaticUrl(folder) {
  return function inner(filename) {
    return `${process.env.REACT_APP_URL}/${folder}/${filename}`;
  };
}
