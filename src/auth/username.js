export const normalizeUsername = username => username.trim().toLowerCase();

export const getUsernameErrorMessage = error => {
  const code = error && error.code ? error.code : 'auth/unknown';
  const message = error && error.message
    ? error.message
    : 'No error message was provided.';

  if ((code === 'internal' || code === 'functions/internal') && message === 'internal') {
    return `Firebase ${code}: The username lookup Function is not reachable. The configured Firebase project returned 404 for this endpoint. Deploy the callable Functions to that project in us-central1, then retry.`;
  }

  return `Firebase ${code}: ${message}`;
};
