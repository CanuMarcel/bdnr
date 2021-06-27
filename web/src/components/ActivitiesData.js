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

export default function ActivitiesData({activities}) {
    const classes = useStyles()

    return (
      <Paper className={classes.paper}>
        {activities?.isSuccess && activities?.data?.data?.length > 0 ? (
          activities.data.data.map((activity) => (
            <Paper className={classes.paper} key={activity.username}>
              <Typography noWrap className={classes.info} variant="h6">Username: {activity.username}</Typography>
            </Paper>
          ))
        )
        :
        <Typography variant="h6" noWrap className={classes.title}>
          No activities for this user yet
        </Typography>
        }  
      </Paper>
    )
}
