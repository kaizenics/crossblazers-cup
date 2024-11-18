export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const URLS = {
  AUTH: {
    LOGIN: '/cbc-admin/login',
    CALLBACK: '/auth/callback',
  },
  ADMIN: {
    DASHBOARD: '/dashboard',
  },
};

export const getCallbackUrl = () => `${SITE_URL}${URLS.AUTH.CALLBACK}`;
