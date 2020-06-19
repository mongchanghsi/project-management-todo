import React, { Component } from 'react';
import { folders, tasks } from '../data/Data';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Item from './Item';
import TasksActions from './TasksActions';

const useStyles = theme => ({
  root: {
    padding: '0 30px 0 30px'
  },
  edit: {
    padding: '30px 0 30px 0' // top right btm left
  }
})

class Content extends Component {
  constructor(props){
    super(props);

    this.state = {
      folderName: folders,
      tasks: tasks,
      newFolderName: '',
      updateTaskFolder: '',
      newTaskName: ''
    };
    this.updateNewFolderName = this.updateNewFolderName.bind(this);
    this.createNewFolder = this.createNewFolder.bind(this);
    this.updateNewTaskName = this.updateNewTaskName.bind(this);
    this.updateTaskFolder = this.updateTaskFolder.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.deleteTaskFolder = this.deleteTaskFolder.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateNewFolderName(value){
    this.setState({ newFolderName: value }, ()=> console.log(this.state))
  }

  createNewFolder(){
    let newFolder = {
      'id': this.state.tasks.length + 2,
      'title': this.state.newFolderName,
      'tasks': []
    }
    let newFolderList = [...this.state.folderName]
    let newTaskList = [...this.state.tasks]
    newFolderList.push(this.state.newFolderName)
    newTaskList.push(newFolder)
    this.setState({ tasks: newTaskList, folderName: newFolderList, newFolderName: '' })
  }

  updateTaskFolder(value){
    this.setState({ updateTaskFolder: value })
  }

  updateNewTaskName(value){
    this.setState({ newTaskName: value })
  }

  createNewTask(){
    let tasks = this.state.tasks
    let proneToUpdateTaskList;

    for (let i=0; i<tasks.length; i++){
      if (tasks[i].title == this.state.updateTaskFolder){
        proneToUpdateTaskList = tasks[i].tasks
        proneToUpdateTaskList.push(this.state.newTaskName)
        tasks[i].tasks = proneToUpdateTaskList
        break
      }
    }

    this.setState({ tasks: tasks })
  }

  deleteTaskFolder(){
    let folderName = this.state.folderName
    let tasks = this.state.tasks
    for (let i=0; i<tasks.length; i++){
      if (tasks[i].title == this.state.updateTaskFolder){
        folderName.splice(i, 1)
        tasks.splice(i , 1)
        break
      }
    }
    this.setState({ tasks: tasks, folderName: folderName })
  }

  deleteTask(title, task){
    let tasks = this.state.tasks
    for (let i=0; i<tasks.length; i++){
      if (tasks[i].title === title){
        let listOfTasks = tasks[i].tasks;
        for (let j=0; j<listOfTasks.length; j++){
          if (listOfTasks[j] === task){
            listOfTasks.splice(j, 1)
          }
        }
      }
    }
    this.setState({ tasks: tasks })

  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <div className={classes.edit}>
          <TasksActions
            updateNewFolderName={this.updateNewFolderName}
            createNewFolder={this.createNewFolder}
            updateTaskFolder={this.updateTaskFolder}
            updateNewTaskName={this.updateNewTaskName}
            folders={this.state.folderName}
            createNewTask={this.createNewTask}
            deleteTaskFolder={this.deleteTaskFolder}
          />
        </div>
        <Grid container spacing={5}>
        { this.state.tasks.map((task, index) =>
          <Grid item xs={12} sm={6} md={4} lg={3} id={index}>
            <Item deleteTask={this.deleteTask} taskDetails={task} />
          </Grid>
        )}
        </Grid>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Content);
