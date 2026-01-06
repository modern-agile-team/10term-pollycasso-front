export const navigateToSocialLogin = (provider: 'google' | 'kakao') => {
  const baseUrl = import.meta.env.VITE_SOCIAL_LOGIN_URL;
  const currentDomain = window.location.origin;
  const targetUrl = `${currentDomain}/auth/callback`;

  window.location.href = `${baseUrl}/auth/${provider}?state=${encodeURIComponent(targetUrl)}`;
};
