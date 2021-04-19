import { render } from '../util.js';
import ListEntry from '../../src/component/ListEntry';

describe('component/ListEntry', () => {
  test('list successfully', async () => {
    const { getByTestId, findByText } = render(ListEntry);
  });
});