import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';
import classnames from 'classnames';

import BLOCK_DETAILS from 'graphql/queries/getBlockDetails';
import {
  Breadcrumbs,
  Loader,
  DataTable,
  ErrorMessage,
} from 'shared/components';
import { ColumnConfig } from 'shared/types';
import { msToTime } from 'shared/utils';
import BlockInfo from './BlockInfo';
import useCommonStyles from 'shared/theme/commonStyles';

interface RouteParams {
  hash: string;
}

const BlockDetails = () => {
  const commonClasses = useCommonStyles();

  const { hash } = useParams<RouteParams>();

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const [getBlockDetails, { loading, data, error }] = useLazyQuery(
    BLOCK_DETAILS,
    {
      variables: {
        hash,
        offset: 0,
        limit: 10,
      },
    },
  );

  useEffect(() => {
    getBlockDetails({
      variables: {
        hash,
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
    });
  }, [getBlockDetails, rowsPerPage, page, hash]);

  if (loading || (!data && !error)) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const breadcrumbs = [
    { label: 'Explorer', navigateTo: '/' },
    { label: 'Latest Blocks', navigateTo: '/' },
    { label: `${hash}`, navigateTo: `/details/${hash}` },
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'hash',
      label: 'Hash',
    },
    {
      name: 'blockHeight',
      label: 'Block Height',
    },
    {
      name: 'index',
      label: 'Index',
    },
    {
      name: 'size',
      label: 'Size',
    },
  ];

  const dataTableTitle = (
    <Typography variant="h5">Block Transactions</Typography>
  );

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const {
    hash: blockHash,
    height,
    time,
    index,
    size,
    previousBlock,
    transactions,
  } = data.blockDetails;

  return (
    <Grid
      container
      className={classnames([
        commonClasses.mainContainer,
        commonClasses.paddingTopBottom30,
      ])}
    >
      <Grid item xs={12}>
        <Breadcrumbs data={breadcrumbs} />
      </Grid>
      <Grid item xs={12} className={commonClasses.paddingTopBottom30}>
        <Typography variant="h5">{`Block ${data.blockDetails.index}`}</Typography>
        <Grid item xs={12}>
          <BlockInfo
            hash={blockHash}
            height={height}
            time={msToTime(time)}
            index={index}
            size={size}
            previousBlock={previousBlock}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          columns={columns}
          keyColumn="index"
          title={dataTableTitle}
          data={transactions.items}
          totalItems={transactions.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Grid>
    </Grid>
  );
};

export default BlockDetails;
