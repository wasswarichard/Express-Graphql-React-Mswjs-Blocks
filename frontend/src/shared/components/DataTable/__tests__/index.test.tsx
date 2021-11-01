import { render } from '@testing-library/react';

import DataTable from '../index';

describe('Tests for DataTable component', () => {
  it('should successfully render the DataTable', async () => {
    const columns = [
      {
        name: 'columnName',
        label: 'Column Name',
      },
    ];
    const data = [
      {
        columnName: 'test val',
      },
      { columnName: 2 },
    ];

    const { getByText } = render(
      <DataTable
        columns={columns}
        keyColumn="columnName"
        title="table title"
        data={data}
        totalItems={data.length}
        rowsPerPage={10}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />,
    );

    expect(getByText('table title')).toBeInTheDocument();
    expect(getByText('test val')).toBeInTheDocument();
    expect(getByText('1-2 of 2')).toBeInTheDocument();
  });
});
