import React from 'react';
import {
  Box,
  CircularProgress,
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
import { CopyToClipboard } from '@nymproject/react/clipboard/CopyToClipboard';
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
  { id: 'reward', label: 'Unredeemed Rewards', sortable: true },
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

function getComparator<Key extends keyof DelegateListItem>(
  order: Order,
  orderBy: Key,
): (a: DelegateListItem, b: DelegateListItem) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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
  isLoading?: boolean;
  items?: DelegateListItem[];
  onItemActionClick?: (item: DelegateListItem, action: DelegationListItemActions) => void;
  explorerUrl: string;
}> = ({ isLoading, items, onItemActionClick, explorerUrl }) => {
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
            items.sort(getComparator(order, orderBy)).map((item) => (
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
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.reward}</TableCell>
                <TableCell>
                  {!item.profitMarginPercentage ? '-' : `${Math.round(item.profitMarginPercentage * 100000) / 1000}%`}
                </TableCell>
                <TableCell>
                  {!item.uptimePercentage ? '-' : `${Math.round(item.uptimePercentage * 100000) / 1000}%`}
                </TableCell>
                <TableCell>
                  <DelegationActions
                    isPending={item.isPending}
                    onActionClick={(action) => (onItemActionClick ? onItemActionClick(item, action) : undefined)}
                    disableRedeemingRewards={!item.reward}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Box py={6} textAlign="center">
                  {isLoading ? <CircularProgress /> : <span>You have not delegated to any mixnodes</span>}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
