export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  return parts.length === 2 && parts.pop().split(";").shift();
}

export function saveUserToStorage(user: any) {
  window.localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromStorage() {
  let user = window.localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}