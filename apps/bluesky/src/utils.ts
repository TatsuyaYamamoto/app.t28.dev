import { jwtDecode } from "jwt-decode";

/**
 * @see https://github.com/bluesky-social/social-app/blob/1.97.0/src/state/session/util.ts#L24C1-L35C4
 */
export function isTokenExpired(token: string) {
  const payload = jwtDecode(token);

  if (payload.exp === undefined) {
    // no expiration date
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}
