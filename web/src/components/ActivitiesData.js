import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        margin: theme.spacing(2),
    },
    info: {
      marginLeft: theme.spacing(1)
    },
}))

export default function ActivitiesData({activities, comments}) {
    const classes = useStyles()

    return (
      <Paper className={classes.paper}>
        {activities?.isSuccess && activities?.data?.data?.length > 0 ? (
          <>
          {activities.data.data.map((activity) => (
              <Typography noWrap className={classes.info} variant="h6">Username: {activity.username}</Typography>
          ))}
          {comments?.isSuccess && activities?.data?.data?.length > 0 ? comments.data.data.map((comment) => (
              <>
                <Typography noWrap className={classes.info} variant="h6">Comments</Typography>
                <Typography noWrap className={classes.info}>Userid: {comment.username}</Typography>
                <Typography noWrap className={classes.info}>Comment: {comment.text}</Typography>
              </>
          ))
          :
          <Typography noWrap className={classes.info}>No comments for this activity yet</Typography>
        }
          </>
        )
        :
        <Typography variant="h6" noWrap className={classes.title}>
          No activities for this user yet
        </Typography>
        }  
      </Paper>
    )
}
