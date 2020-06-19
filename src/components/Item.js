import  React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
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

  clearTask(title, task){
    this.props.deleteTask(title, task)
  }

  handleChange(e){
    this.setState({ newTaskName: e.target.value })
  }

  onSubmit(title, taskName){
    this.props.createNewTask(title, taskName)
    this.setState({ newTaskName: '' })
  }

  render(){
    const { classes } = this.props;
    return(
      <Card className={classes.root}>
        <CardHeader
          title={this.props.taskDetails.title}
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
                  <IconButton edge="end" aria-label="delete" onClick={()=>this.clearTask(this.props.taskDetails.title, task)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            </List>
            <TextField className={classes.margin} id="taskname" label="Task Name" variant="outlined" value={this.state.newTaskName} onChange={this.handleChange}/>
            <AddTask onClick={()=>this.onSubmit(this.props.taskDetails.title, this.state.newTaskName)}/>
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
