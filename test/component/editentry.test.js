import { fireEvent, waitFor } from '@testing-library/vue';

import { render } from '../util.js';
import EditEntry from '../../src/component/EditEntry';

describe('component/EditEntry', () => {
  test('validate fail', async () => {
    const { getByTestId, findByText} = render(EditEntry);
    await waitFor(() => {
      expect(getByTestId('editButton').disabled).toBeTruthy();
    });
    await fireEvent.touch(getByTestId('titleInput'));
    await fireEvent.touch(getByTestId('contentInput'));
    await findByText('title is not valid.');
    await findByText('content is not valid.');
    await waitFor(() => {
      expect(getByTestId('editButton').disabled).toBeTruthy();
    });
  });

  test('validate pass', async () => {
    const { getByTestId, findByText} = render(EditEntry);
    await waitFor(() => {
      expect(getByTestId('editButton').disabled).toBeTruthy();
    });
    await fireEvent.update(getByTestId('titleInput'), 'title1');
    await fireEvent.update(getByTestId('contentInput'), 'content1');
    await waitFor(() => {
      expect(getByTestId('editButton').disabled).toBeFalsy();
    });
  });
});