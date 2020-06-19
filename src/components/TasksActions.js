import React, { Component } from 'react';
import { AddButton, DelButton, BackToMenu, CreateFolderButton, DelButton2, AddTask, AddTask2 } from './Buttons';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = theme => ({
  root: {
    width: 250,
    [theme.breakpoints.up('lg')]: {
      width: 400
    },
    margin: 'auto',
    padding: theme.spacing(1)
  },
  title: {
    fontSize: 20
  },
  margin: {
    margin: '0 0 15px 0'
  }
})

class TasksActions extends Component {
  constructor(props){
    super(props);

    this.state = {
      showEdit: true,
      showCreateTaskFolder: false,
      showDeleteTaskFolder: false,
      showCreateTask: false
    };
    this.onCreateTaskFolder = this.onCreateTaskFolder.bind(this);
    this.onDeleteTaskFolder = this.onDeleteTaskFolder.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChangeFolderName = this.onChangeFolderName.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
  }

  onCreateTaskFolder(){
    this.setState({ showCreateTaskFolder: true, showDeleteTaskFolder: false, showCreateTask: false, showEdit: false })
  }

  onDeleteTaskFolder(){
    this.setState({ showCreateTaskFolder: false, showDeleteTaskFolder: true, showCreateTask: false, showEdit: false })
  }

  onBack(){
    this.setState({ showCreateTaskFolder: false, showDeleteTaskFolder: false, showCreateTask: false, showEdit: true })
  }

  onCreateTask(){
    this.setState({ showCreateTaskFolder: false, showDeleteTaskFolder: false, showCreateTask: true, showEdit: false })
  }

  onChangeFolderName(e){
    this.props.updateNewFolderName(e.target.value)
  }

  handleRadioChange(e){
    this.props.updateTaskFolder(e.target.value)
  }

  onChangeTaskName(e){
    this.props.updateNewTaskName(e.target.value)
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        { this.state.showEdit ?
          <div>
            <AddButton onClick={this.onCreateTaskFolder}/>
            <AddTask onClick={this.onCreateTask}/>
            <DelButton onClick={this.onDeleteTaskFolder}/>
          </div>
        : null }

        { this.state.showCreateTaskFolder ?
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Create a new task folder
              </Typography>
            </CardContent>
            <TextField className={classes.margin} id="taskfoldername" label="Task Folder Name" variant="outlined" onChange={this.onChangeFolderName}/>
            <CreateFolderButton onClick={()=>{this.onBack(); this.props.createNewFolder();}}/>
            <BackToMenu onBack={this.onBack}/>
          </Card>
        : null }

        { this.state.showDeleteTaskFolder ?
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Delete a task folder
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Task Folder</FormLabel>
                <RadioGroup aria-label="taskfolder" name="taskfolder" onChange={this.handleRadioChange}>
                  { this.props.folders.map((folder) =>
                    <FormControlLabel value={folder} control={<Radio />} label={folder} />
                  )}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <DelButton2 onClick={()=>{this.onBack(); this.props.deleteTaskFolder();}}/>
            <BackToMenu onBack={this.onBack}/>
          </Card>
        : null }

        { this.state.showCreateTask ?
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Create a task
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Task Folder</FormLabel>
                <RadioGroup aria-label="taskfolder" name="taskfolder" onChange={this.handleRadioChange}>
                  { this.props.folders.map((folder) =>
                    <FormControlLabel value={folder} control={<Radio />} label={folder} />
                  )}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <TextField className={classes.margin} id="taskname" label="Task Name" variant="outlined" onChange={this.onChangeTaskName}/>
            <br/>
            <AddTask2 onClick={()=>{this.onBack(); this.props.createNewTask();}}/>
            <BackToMenu onBack={this.onBack}/>
          </Card>
        : null }

      </div>
    );
  }
}

TasksActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(TasksActions);
