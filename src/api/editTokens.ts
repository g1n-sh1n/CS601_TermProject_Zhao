// The API gives back a secret "edit token" when a visitor sends a contact message.
// We keep those tokens in localStorage so this browser can view, edit, and delete its own messages later.
// localStorage can be unavailable (private mode, blocked storage), so every access is wrapped in try/catch.

const STORAGE_KEY = "contact-message-tokens";

type TokenMap = Record<string, string>;

function readAll(): TokenMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as TokenMap;
  } catch {
    return {};
  }
}

function writeAll(tokens: TokenMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    // ignore: the message is still saved, it just can't be edited from this browser later
  }
}

export function getToken(id: number): string | undefined {
  return readAll()[String(id)];
}

export function saveToken(id: number, token: string): void {
  writeAll({ ...readAll(), [String(id)]: token });
}

export function removeToken(id: number): void {
  const tokens = readAll();
  delete tokens[String(id)];
  writeAll(tokens);
}

// Ids of every message sent from this browser, newest first
export function getMyMessageIds(): number[] {
  return Object.keys(readAll())
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0)
    .sort((a, b) => b - a);
}
