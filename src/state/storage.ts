import { readFromStorage, saveToStorage } from "../domain/storage";

const OWNER_KEY = "owner";
const TOKEN_KEY = "token";

export function storeOwner(owner: string) {
  saveToStorage(localStorage, OWNER_KEY, owner);
}

export function loadOwner() {
  return readFromStorage(localStorage, OWNER_KEY) || "";
}

export function storeToken(token: string) {
  saveToStorage(sessionStorage, TOKEN_KEY, token);
}

export function loadToken() {
  return readFromStorage(sessionStorage, TOKEN_KEY) || "";
}
