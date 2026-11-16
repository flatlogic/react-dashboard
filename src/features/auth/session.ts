import { backendEnabled } from '../backend';

const SESSION_STORAGE_KEY = backendEnabled ? 'dashboard.server-session' : 'dashboard.session';

export type Session = {
  token: string;
  user: {
    id: string;
    login: string;
    name: string;
  };
  expiresAt: string;
};

type LoginCredentials = {
  login: string;
  password: string;
};

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

const parseSession = (rawValue: string | null): Session | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const session = JSON.parse(rawValue) as Session;
    const expiresAt = Date.parse(session.expiresAt);

    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
};

export const readSession = (): Session | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return parseSession(localStorage.getItem(SESSION_STORAGE_KEY));
};

export const hasActiveSession = () => readSession() !== null;

export async function refreshSession(): Promise<Session | null> {
  if (!backendEnabled) {
    return readSession();
  }
  const response = await fetch('/session', { credentials: 'same-origin' });
  if (response.status === 401) {
    clearSession();
    return null;
  }
  if (!response.ok) {
    throw new Error(`Unable to check session: HTTP ${response.status}`);
  }
  const session: Session = await response.json();
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
}

export async function createSession(credentials: LoginCredentials): Promise<Session> {
  if (!backendEnabled) {
    return createDemoSession(credentials);
  }
  const response = await fetch('/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || `Unable to log in: HTTP ${response.status}`);
  }
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(result.session));
  return result.session;
}

export async function endSession() {
  if (backendEnabled) {
    const response = await fetch('/logout', { method: 'POST', credentials: 'same-origin' });
    if (!response.ok) {
      throw new Error(`Unable to log out: HTTP ${response.status}`);
    }
  }
  clearSession();
}

export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};

export const createDemoSession = async ({
  login,
  password,
}: LoginCredentials): Promise<Session> => {
  await new Promise((resolve) => window.setTimeout(resolve, 300));

  if (login !== 'user' || password !== 'password') {
    throw new Error('Use demo credentials: user / password');
  }

  const session: Session = {
    token: crypto.randomUUID(),
    user: {
      id: 'demo-user',
      login,
      name: 'Administrator',
    },
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

  return session;
};
