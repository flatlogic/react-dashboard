import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../backend', async (importOriginal) => ({
  ...await importOriginal<typeof import('../backend')>(),
  backendEnabled: true,
}));

import { createSession, endSession, refreshSession } from './session';
import { listPosts, createPostRecord } from '../posts/postsService';

const session = {
  token: '',
  user: { id: 'demo-user', login: 'user', name: 'Administrator' },
  expiresAt: '2099-01-01T00:00:00.000Z',
};
const request = vi.fn<typeof fetch>();

describe('server-backed sessions and posts', () => {
  beforeEach(() => {
    localStorage.clear();
    request.mockReset();
    vi.stubGlobal('fetch', request);
  });
  afterEach(() => vi.unstubAllGlobals());

  it('uses the cookie and never persists the legacy token from the login response', async () => {
    request.mockResolvedValue(Response.json({ id_token: 'secret-token', session }));
    expect(await createSession({ login: 'user', password: 'password' })).toEqual(session);
    expect(request).toHaveBeenCalledWith('/login', expect.objectContaining({ method: 'POST', credentials: 'same-origin' }));
    expect(localStorage.getItem('dashboard.server-session')).toBe(JSON.stringify(session));
    expect(JSON.stringify(localStorage)).not.toContain('secret-token');
  });

  it('does not fall back to local authentication when the server rejects valid demo credentials', async () => {
    request.mockResolvedValue(Response.json({ message: 'Server rejected login' }, { status: 401 }));
    await expect(createSession({ login: 'user', password: 'password' })).rejects.toThrow('Server rejected login');
    expect(localStorage.length).toBe(0);
  });

  it('ignores a locally forged session and clears its metadata after a server 401', async () => {
    localStorage.setItem('dashboard.server-session', JSON.stringify(session));
    request.mockResolvedValue(new Response(null, { status: 401 }));
    expect(await refreshSession()).toBeNull();
    expect(localStorage.getItem('dashboard.server-session')).toBeNull();
  });

  it('restores an existing cookie session without needing localStorage', async () => {
    request.mockResolvedValue(Response.json(session));
    expect(await refreshSession()).toEqual(session);
    expect(request).toHaveBeenCalledWith('/session', { credentials: 'same-origin' });
  });

  it('reports unavailable authentication services instead of pretending the user is logged out', async () => {
    request.mockResolvedValue(new Response(null, { status: 503 }));
    await expect(refreshSession()).rejects.toThrow('HTTP 503');
  });

  it('only clears local metadata after the server confirms logout', async () => {
    localStorage.setItem('dashboard.server-session', JSON.stringify(session));
    request.mockResolvedValueOnce(new Response(null, { status: 503 }));
    await expect(endSession()).rejects.toThrow('HTTP 503');
    expect(localStorage.getItem('dashboard.server-session')).not.toBeNull();
    request.mockResolvedValueOnce(new Response(null, { status: 204 }));
    await endSession();
    expect(localStorage.getItem('dashboard.server-session')).toBeNull();
  });

  it('keeps an empty server database empty and surfaces GraphQL errors', async () => {
    request.mockResolvedValueOnce(Response.json({ data: { posts: [] } }));
    expect(await listPosts()).toEqual([]);
    request.mockResolvedValueOnce(Response.json({ errors: [{ message: 'Database unavailable' }] }));
    await expect(listPosts()).rejects.toThrow('Database unavailable');
    await expect(createPostRecord({ title: 'New', content: 'Content' })).rejects.toThrow('read-only');
    expect(localStorage.length).toBe(0);
  });
});
