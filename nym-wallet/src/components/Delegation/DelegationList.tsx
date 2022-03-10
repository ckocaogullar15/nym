import React from 'react';
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CopyToClipboard } from '@nymproject/react';
import { DelegationActions, DelegationListItemActions } from './DelegationActions';
import { DelegateListItem } from './types';

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DelegateListItem) => void;
  order: Order;
  orderBy: string;
}

interface HeadCell {
  id: keyof DelegateListItem;
  label: string;
  sortable: boolean;
  disablePadding?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'id', label: 'Node ID', sortable: true },
  { id: 'delegationDate', label: 'Delegated on', sortable: true },
  { id: 'amount', label: 'Amount', sortable: true },
  { id: 'reward', label: 'Reward', sortable: true },
  { id: 'profitMarginPercentage', label: 'Profit margin', sortable: true },
  { id: 'uptimePercentage', label: 'Uptime', sortable: true },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string | Date }, b: { [key in Key]: number | string | Date }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property: keyof DelegateListItem) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            color="secondary"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDownIcon}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export const DelegationList: React.FC<{
  items?: DelegateListItem[];
  rewardCurrency: string;
  onItemActionClick?: (item: DelegateListItem, action: DelegationListItemActions) => void;
  explorerUrl: string;
}> = ({ items, rewardCurrency, onItemActionClick, explorerUrl }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DelegateListItem>('delegationDate');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DelegateListItem) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table sx={{ width: '100%' }}>
        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {items?.length ? (
            stableSort(items, getComparator(order, orderBy)).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <CopyToClipboard
                    sx={{ fontSize: 16, mr: 1 }}
                    value={item.id}
                    tooltip={
                      <>
                        Copy identity key <strong>{item.id}</strong> to clipboard
                      </>
                    }
                  />
                  <Tooltip
                    title={
                      <>
                        Click to view <strong>{item.id}</strong> in the Network Explorer
                      </>
                    }
                    placement="right"
                    arrow
                  >
                    <Link
                      target="_blank"
                      href={`${explorerUrl}/network-components/mixnode/${item.id}`}
                      color="inherit"
                      underline="none"
                    >
                      {item.id.slice(0, 6)}...{item.id.slice(-6)}
                    </Link>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.delegationDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.amount} {item.amountCurrency}
                </TableCell>
                <TableCell>
                  {item.reward} {rewardCurrency}
                </TableCell>
                <TableCell>{Math.round(item.profitMarginPercentage * 100000) / 1000}%</TableCell>
                <TableCell>{Math.round(item.uptimePercentage * 100000) / 1000}%</TableCell>
                <TableCell>
                  <DelegationActions
                    onActionClick={(action) => (onItemActionClick ? onItemActionClick(item, action) : undefined)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Box py={6} textAlign="center">
                  You have not delegated to any mixnodes
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
