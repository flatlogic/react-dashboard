export const backendEnabled = import.meta.env.VITE_BACKEND === 'true';

export async function backendRequest(path: string, options: RequestInit = {}): Promise<Response> {
  const response = await fetch(path, { credentials: 'same-origin', ...options });
  if (!response.ok) {
    if (response.status === 401) {
      window.location.assign(`${import.meta.env.BASE_URL}login`);
      throw new Error('Your session has expired. Please log in again.');
    }
    throw new Error(`Request to ${path} failed: HTTP ${response.status}`);
  }
  return response;
}
