import { getUsernameErrorMessage, normalizeUsername } from './username';

describe('username helpers', () => {
  test('normalizes leading/trailing whitespace and case', () => {
    expect(normalizeUsername('  Alice_7  ')).toBe('alice_7');
  });

  test('preserves internal characters rather than changing the username', () => {
    expect(normalizeUsername(' Alice Smith ')).toBe('alice smith');
  });

  test('displays the Firebase error code and message', () => {
    expect(getUsernameErrorMessage({
      code: 'auth/wrong-password',
      message: 'The password is invalid.'
    })).toBe('Firebase auth/wrong-password: The password is invalid.');
  });

  test('explains that an internal username lookup error needs Functions deployment', () => {
    expect(getUsernameErrorMessage({
      code: 'internal',
      message: 'internal'
    })).toContain('Deploy the callable Functions to that project in us-central1');
  });
});
