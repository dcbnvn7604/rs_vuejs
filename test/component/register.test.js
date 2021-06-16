import { fireEvent, waitFor } from '@testing-library/vue';

import { render } from '../util.js';
import Register from '../../src/component/Register';

describe('component/Register', () => {
  test('validate fail', async () => {
    const { getByTestId, findByText, getByText } = render(Register);
    await waitFor(() => {
      expect(getByTestId('registerButton').disabled).toBeTruthy();
    });
    await fireEvent.touch(getByTestId('usernameInput'));
    await fireEvent.touch(getByTestId('passwordInput'));
    await fireEvent.touch(getByTestId('repasswordInput'));
    await findByText('username is not valid.');
    await findByText('password is not valid.');
    await findByText('repassword is not valid.');
    await fireEvent.update(getByTestId('usernameInput'), 'username1');
    await fireEvent.update(getByTestId('repasswordInput'), 'password');
    await fireEvent.update(getByTestId('passwordInput'), 'password1');
    await waitFor(() => {
      expect(() => {
        getByText('username is not valid.');
      }).toThrow();
    });
    await waitFor(() => {
      expect(() => {
        getByText('password is not valid.');
      }).toThrow();
    });
    await findByText('repassword is not matching.');
    await waitFor(() => {
      expect(getByTestId('registerButton').disabled).toBeTruthy();
    });
    await fireEvent.update(getByTestId('repasswordInput'), 'password1');
    await waitFor(() => {
      expect(() => {
        getByText('repassword is not matching.');
      }).toThrow();
    });
    await waitFor(() => {
      expect(getByTestId('registerButton').disabled).toBeFalsy();
    });
  });
});