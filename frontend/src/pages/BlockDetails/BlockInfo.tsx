import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

interface Props {
  hash: string;
  height: number;
  time: string;
  index: number;
  size: number;
  previousBlock: string;
}

const BlockInfo = ({
  hash,
  height,
  time,
  index,
  size,
  previousBlock,
}: Props) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="body1">Hash</Typography>
          </TableCell>
          <TableCell data-testid="block-details-hash">
            <Typography variant="body1">{hash}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="body1">Height</Typography>
          </TableCell>
          <TableCell data-testid="block-details-height">
            <Typography variant="body1">{height}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="body1">Time</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">{time}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="body1">Index</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">{index}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="body1">Size</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">{size}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="body1">Previous Block</Typography>
          </TableCell>
          <TableCell data-testid="block-details-previous-block">
            <Typography variant="body1">{previousBlock}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default BlockInfo;
