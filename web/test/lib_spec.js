import './spec_helper';
import { newLoginSession } from '../src/session';
import { encodeQueryString, fetchAuthd } from '../src/lib';

describe('lib', () => {
  describe('encodeQueryString', () => {
    it('Should correctly encode a query string', () => {
      let table = [
        { input: [], want: '' },
        { input: [['a', '1']], want: 'a=1' },
        { input: [['a', '1'], ['b', '2']], want: 'a=1&b=2' },
        { input: [['email', 'paul@smith.com']], want: 'email=paul%40smith.com' }
      ];

      table.forEach((tc) => {
        expect(encodeQueryString(tc.input)).to.equal(tc.want);
      });
    });
  });

  describe('fetchAuthd', () => {
    var oldFetch;

    beforeEach(() => { oldFetch = global.fetch; });
    afterEach(() => { global.fetch = oldFetch; });

    it('Should use the creds from localStorage', (done) => {
      const user = {email: 'someone@example.com'};
      const now = (new Date()).getTime();

      newLoginSession(user, 'token', 'client', now, 1);

      global.fetch = (url, opts) => {
        expect(opts.headers.uid).to.equal(1);
        done();
      };

      fetchAuthd('http://example.com', null);
    });
  });
});
