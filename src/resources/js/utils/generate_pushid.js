/**
 * This code is originated from a gist https://gist.github.com/mikelehen/3596a30bd69384624c11
 * I found the gist link at https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html
 *
 * Modified the original code somewhat so that the generated id can be easily distinguishable by human eye
 * and Web Crypto API is used instead of Math.random if available.
 */
'use strict';

/**
 * Fancy ID generator that creates 20-character string identifiers with the following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 50-bits of random data after the timestamp so that IDs won't collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters that will sort properly).
 * 4. They're monotonically increasing.  Even if you generate more than one in the same timestamp, the
 *    latter ones will sort after the former ones.  We do this by using the previous random bits
 *    but "incrementing" them by 1 (only in the case of a timestamp collision).
 */
export const generatePushID = (function () {
  const PUSH_CHARS = 'abcdefghijkmnpqrstuvwxyz';

  return function () {
    let id = '';
    for (let i = 0; i < 4; i++) {
      id += PUSH_CHARS.charAt(Math.floor(Math.random() * PUSH_CHARS.length));
    }
    return id;
  };
})();
