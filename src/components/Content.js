import React, { Component } from 'react';
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
      folderName: [],
      tasks: [],
      newFolderName: '',
      updateTaskFolder: ''
    };
    this.updateNewFolderName = this.updateNewFolderName.bind(this);
    this.createNewFolder = this.createNewFolder.bind(this);
    this.updateTaskFolder = this.updateTaskFolder.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.deleteTaskFolder = this.deleteTaskFolder.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateNewFolderName(value){
    this.setState({ newFolderName: value })
  }

  async createNewFolder(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.newFolderName })
    };

    await fetch('https://eric-todo-node.herokuapp.com/api/folder/create', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        console.log('Task Folder is successfully created')
      })
      .catch(error => console.error('Error occured', error.message ))

    this.fetchData();
  }

  updateTaskFolder(value){
    this.setState({ updateTaskFolder: value })
  }

  async createNewTask(id, taskName){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: taskName })
    };

    await fetch('https://eric-todo-node.herokuapp.com/api/folder/update', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        console.log('New Task is successfully updated')
      })
      .catch(error => console.error('Error occured', error.message ))

    this.fetchData();
  }

  async deleteTaskFolder(){
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.state.updateTaskFolder })
    };

    await fetch('https://eric-todo-node.herokuapp.com/api/folder/delete', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        console.log('Task Folder is successfully deleted')
      })
      .catch(error => console.error('Error occured', error.message ))

    this.fetchData();
  }

  async deleteTask(id, task){
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: task })
    };

    await fetch('https://eric-todo-node.herokuapp.com/api/folder/complete', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        console.log('Task is successfully deleted')
      })
      .catch(error => console.error('Error occured', error.message ))

    this.fetchData();
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData(){
    await fetch('https://eric-todo-node.herokuapp.com/api/folder')
      .then(res => res.json())
      .then(json => {
        let folderName = []
        let folderDetails = {}
        for (let i=0; i<json.length; i++){
          folderDetails = {
            "id": json[i]._id,
            "name": json[i].name
          }
          folderName.push(folderDetails)
        }
        this.setState({ tasks: json, folderName: folderName }, () => console.log(this.state.folderName))
      })
      .catch(error => console.log('Error occured'))
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
            folders={this.state.folderName}
            deleteTaskFolder={this.deleteTaskFolder}
          />
        </div>
        <Grid container spacing={5}>
        { this.state.tasks.map((task) =>
          <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
            <Item
              deleteTask={this.deleteTask}
              taskDetails={task}
              updateNewTaskName={this.updateNewTaskName}
              createNewTask={this.createNewTask}
              newTaskName={this.state.newTaskName}
            />
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
