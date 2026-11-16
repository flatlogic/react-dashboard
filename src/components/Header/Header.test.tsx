import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it } from 'vitest';
import { createAppStore } from '../../app/store';
import Header from './Header';

it('opens the user menu and returns to login after logout', async () => {
  render(
    <Provider store={createAppStore()}>
      <MemoryRouter initialEntries={['/app/posts']}>
        <Routes>
          <Route path="/app/posts" element={<Header sidebarOpen={false} sidebarToggle={() => {}} />} />
          <Route path="/login" element={<h1>Signed out</h1>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Open user menu' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Open user menu' })).toHaveAttribute('aria-expanded', 'true'));
  fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
  expect(await screen.findByRole('heading', { name: 'Signed out' })).toBeInTheDocument();
});
