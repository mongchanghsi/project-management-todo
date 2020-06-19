import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
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
}))

export default function Item(props){
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const clearTask = (title, task) => {
    props.deleteTask(title, task)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.taskDetails.title}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon/>
          </IconButton>
        }/>
      <Collapse className={classes.collapsible} in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List dense='true'>
          { props.taskDetails.tasks.map((task, index) =>
            <ListItem>
              <ListItemText primary={task}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={()=>clearTask(props.taskDetails.title, task)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}
