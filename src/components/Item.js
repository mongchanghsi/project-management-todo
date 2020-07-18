import  React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, Collapse } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { AddTask } from './Buttons';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = (theme) => ({
  root: {
    maxWidth: 350,
    margin: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapsible: {
    padding: '0 0 0 0'
  }
})

class Item extends Component {
  constructor(props){
    super(props);

    this.state = {
      expanded: false,
      newTaskName: ''

    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded })
  }

  clearTask(id, task){
    this.props.deleteTask(id, task)
  }

  handleChange(e){
    this.setState({ newTaskName: e.target.value })
  }

  onSubmit(id, taskName){
    this.props.createNewTask(id, taskName)
    this.setState({ newTaskName: '' })
  }

  render(){
    const { classes } = this.props;
    return(
      <Card className={classes.root}>
        <CardHeader
          title={this.props.taskDetails.name}
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more">
              <ExpandMoreIcon/>
            </IconButton>
          }/>
        <Collapse className={classes.collapsible} in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List dense='true'>
            { this.props.taskDetails.tasks.map((task, index) =>
              <ListItem>
                <ListItemText primary={task}/>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={()=>this.clearTask(this.props.taskDetails._id, task)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            </List>
            <TextField className={classes.margin} id="taskname" label="Task Name" variant="outlined" value={this.state.newTaskName} onChange={this.handleChange}/>
            <AddTask onClick={()=>this.onSubmit(this.props.taskDetails._id, this.state.newTaskName)}/>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Item);
