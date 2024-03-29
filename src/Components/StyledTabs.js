import {  withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

const StyledTabs = withStyles({
    indicator: {
      marginLeft:'auto',
      marginRight:'auto',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      color: '#fff',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#eba01e',
      },
      
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  export default StyledTabs;