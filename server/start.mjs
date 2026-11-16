import { createApp } from './app.mjs';

const app = createApp({
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  secureCookies: process.env.NODE_ENV === 'production',
});
const port = Number(process.env.PORT || process.env.REACT_APP_PORT || 5000);
app.listen(port, process.env.HOST || '0.0.0.0', () => {
  console.log(`React Dashboard server listening on port ${port}`);
});
