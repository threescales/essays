export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  return parts.length === 2 && parts.pop().split(";").shift();
}

export function saveUserToLocalStorage(user: any) {
  window.localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromLocalStorage() {
  let user = window.localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}