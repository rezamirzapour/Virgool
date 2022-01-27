export function parseDate(dateLike: Date) {
  return new Date(dateLike).toLocaleDateString("fa-IR");
}

export function sleep(seconds = 5) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}
