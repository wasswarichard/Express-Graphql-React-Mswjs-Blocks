import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import render from 'shared/testUtils/setup';
import Selectors from 'shared/testUtils/selectors';

describe('Tests for BlockDetails page', () => {
  it('should render details of a given block', async () => {
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

    expect(
      container.querySelector(Selectors.BLOCK_DETAILS_HASH),
    ).toHaveTextContent(
      '0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899',
    );

    expect(
      container.querySelector(Selectors.BLOCK_DETAILS_HEIGHT),
    ).toHaveTextContent('603966');

    expect(
      container.querySelector(Selectors.BLOCK_DETAILS_PREVIOUS_BLOCK),
    ).toHaveTextContent(
      '0000000000000000000ee40dc80e8ddd28d6389ba8dd59bb147b48d8f7a87f13',
    );

    expect(getByText('1-10 of 3503')).toBeInTheDocument();
  });
});
