import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export const InfoSVG: React.FC = () => {
  const theme = useTheme();
  const color = theme.palette.nym.networkExplorer.nav.text;
  return (<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.33325 4.16665H7.66659V5.49998H6.33325V4.16665ZM6.33325 6.83331H7.66659V10.8333H6.33325V6.83331ZM6.99992 0.833313C3.31992 0.833313 0.333252 3.81998 0.333252 7.49998C0.333252 11.18 3.31992 14.1666 6.99992 14.1666C10.6799 14.1666 13.6666 11.18 13.6666 7.49998C13.6666 3.81998 10.6799 0.833313 6.99992 0.833313ZM6.99992 12.8333C4.05992 12.8333 1.66659 10.44 1.66659 7.49998C1.66659 4.55998 4.05992 2.16665 6.99992 2.16665C9.93992 2.16665 12.3333 4.55998 12.3333 7.49998C12.3333 10.44 9.93992 12.8333 6.99992 12.8333Z"
      fill={color}
    />
  </svg>
  );
};