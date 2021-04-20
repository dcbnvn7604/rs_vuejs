import { waitFor } from '@testing-library/vue';

import { render } from '../util.js';
import ListEntry from '../../src/component/ListEntry';
import api from '../../src/api';

describe('component/ListEntry', () => {
  test('list successfully', async () => {
    api.setToken('token1');
    let mockFetch = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 200,
      json: () => Promise.resolve([{id: 1, title: 'title 1', content: 'content 1'}, {id: 2, title: 'title 2', content: 'content 2'}]),
    }));
    global.fetch = mockFetch;

    const { getAllByTestId, findByTestId } = render(ListEntry);
    await waitFor(() => expect(document.querySelector('.v-card')).not.toBeNull());
    let entriCards = getAllByTestId('entryCard');
    expect(entriCards).toHaveLength(2);
  });
});