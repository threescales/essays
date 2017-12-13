export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  return parts.length === 2 && parts.pop().split(";").shift();
}
export function delCookie(key) {
  var ex = new Date(); ex.setTime(ex.getTime() - 1);
  document.cookie = key + "=; expires=" + ex.toUTCString() + ";path=/";
}

export function saveUserToStorage(user: any) {
  window.localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromStorage() {
  let user = window.localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export function delUserFromStorage() {
  window.localStorage.removeItem("user")
}