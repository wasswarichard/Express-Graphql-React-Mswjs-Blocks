import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';
import classnames from 'classnames';

import LATEST_BLOCKS from 'graphql/queries/getLatestBlocks';
import {
  Breadcrumbs,
  Loader,
  DataTable,
  ErrorMessage,
} from 'shared/components';
import { ColumnConfig, Block } from 'shared/types';
import { msToTime } from 'shared/utils';
import useCommonStyles from 'shared/theme/commonStyles';

const BlockList = () => {
  const commonClasses = useCommonStyles();

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const [getLatestBlocks, { loading, data, error }] = useLazyQuery(
    LATEST_BLOCKS,
    {
      variables: {
        offset: 0,
        limit: 10,
      },
    },
  );

  useEffect(() => {
    getLatestBlocks({
      variables: {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
    });
  }, [getLatestBlocks, rowsPerPage, page]);

  if (loading || (!data && !error)) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const breadcrumbs = [
    { label: 'Explorer', navigateTo: '/' },
    { label: 'Latest Blocks', navigateTo: '/' },
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'hash',
      label: 'Hash',
    },
    {
      name: 'height',
      label: 'Height',
    },
    {
      name: 'time',
      label: 'Time',
    },
    {
      name: 'index',
      label: 'Index',
    },
  ];

  const dataTableTitle = (
    <>
      <Typography variant="h5">Latest Blocks</Typography>
      <Typography variant="body1">The most recently mined blocks</Typography>
    </>
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

  const formatDataForDataTable = (items: Block[]) => {
    return items.map(({ hash, height, time, index }: Block) => ({
      hash: <Link to={`/details/${hash}`}>{hash}</Link>,
      height,
      time: msToTime(time),
      index,
    }));
  };

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
      <Grid item xs={12}>
        <DataTable
          columns={columns}
          keyColumn="index"
          title={dataTableTitle}
          data={formatDataForDataTable(data.latestBlocks.items)}
          totalItems={data.latestBlocks.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Grid>
    </Grid>
  );
};

export default BlockList;
