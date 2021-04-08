import { fireEvent, waitFor } from '@testing-library/vue';

import { render } from '../util.js';
import Login from '../../src/component/Login';

describe('component/Login', () => {
  test('validate fail', async () => {
    const { getByTestId, findByText } = render(Login);
    await waitFor(() => {
      expect(getByTestId('loginButton').disabled).toBeTruthy();
    });
    await fireEvent.touch(getByTestId('usernameInput'));
    await fireEvent.touch(getByTestId('passwordInput'));
    await findByText('username is not valid.');
    await findByText('password is not valid.');
    await waitFor(() => {
      expect(getByTestId('loginButton').disabled).toBeTruthy();
    });
  });

  test('validate pass', async () => {
    const { getByTestId, findByText } = render(Login);
    await waitFor(() => {
      expect(getByTestId('loginButton').disabled).toBeTruthy();
    });
    await fireEvent.update(getByTestId('usernameInput'), 'username1');
    await fireEvent.update(getByTestId('passwordInput'), 'password1');
    await waitFor(() => {
      expect(getByTestId('loginButton').disabled).toBeFalsy();
    });
  });
});