import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import render from 'shared/testUtils/setup';
import Selectors from 'shared/testUtils/selectors';

describe('Tests for BlockList page', () => {
  it('should render a list of latest blocks', async () => {
    const { getByTestId, container, getByText } = render();

    await waitForElementToBeRemoved(() => getByTestId(Selectors.LOADER));

    expect(getByText('1-10 of 157')).toBeInTheDocument();

    expect(
      container.querySelector(Selectors.DATATABLE_FIRST_ROW_FIRST_CELL_LINK),
    ).toHaveTextContent(
      '0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899',
    );
  });

  it('should navigate to block details page', async () => {
    const { getByTestId, container, getByText } = render();

    await waitForElementToBeRemoved(() => getByTestId(Selectors.LOADER));

    const firstHash = container.querySelector(
      Selectors.DATATABLE_FIRST_ROW_FIRST_CELL_LINK,
    ) as Element;

    expect(firstHash).toHaveTextContent(
      '0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899',
    );

    userEvent.click(firstHash);

    await waitForElementToBeRemoved(() => getByTestId(Selectors.LOADER));

    expect(getByText('Block 603966')).toBeInTheDocument();
  });
});
