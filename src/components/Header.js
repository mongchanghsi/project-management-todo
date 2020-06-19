import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  AppBG: {
    background: '#90caf9'
  },
  title: {
    padding: theme.spacing(2, 5),
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  }
}))

export default function Headers(){
    const classes = useStyles();

    return (
      <Fragment className={classes.root}>
        <AppBar position='static' className={classes.AppBG}>
          <Toolbar>
            <Typography className={classes.title} variant='h4' noWrap>
              Project To-Do
            </Typography>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
}
