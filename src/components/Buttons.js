import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  addButton: {
    backgroundColor: '#8bc34a',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#618833',
      color: '#FFF'
    },
    margin: theme.spacing(1)
  },
  delButton: {
    backgroundColor: '#e91e63',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#a31545',
      color: '#FFF'
    },
    margin: theme.spacing(1)
  }
}))

export function AddButton(props){
  const classes = useStyles();
  return <Button variant='contained' className={classes.addButton} startIcon={<AddIcon/>} onClick={props.onClick}> Create Task Folder </Button>
}

export function DelButton(props){
  const classes = useStyles();
  return <Button variant='contained' className={classes.delButton} startIcon={<DeleteIcon/>} onClick={props.onClick}> Delete Task Folder </Button>
}

export function BackToMenu(props){
  const classes = useStyles();
  return <Button className={classes.button} startIcon={<ArrowBackIcon/>} onClick={props.onBack}> Back </Button>
}

export function CreateFolderButton(props){
  const classes = useStyles();
  return <Button variant='contained' className={classes.addButton} startIcon={<AddIcon/>} onClick={props.onClick}> Create Task Folder </Button>
}

export function DelButton2(props){
  const classes = useStyles();
  return <Button variant='contained' className={classes.delButton} startIcon={<DeleteIcon/>} onClick={props.onClick}> Delete Task Folder </Button>
}

export function AddTask(props){
  const classes = useStyles();
  return <Button variant='contained' className={classes.addButton} startIcon={<AddIcon/>} onClick={props.onClick}> Add Task </Button>
}
