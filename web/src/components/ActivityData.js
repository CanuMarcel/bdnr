import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core'
import { api } from '../api'
import { useQuery } from 'react-query'
import { SlideTransition } from '../transitions'

const useStyles = makeStyles((theme) => ({
    info: {
      marginLeft: theme.spacing()
    },
    comments: {
        margin: theme.spacing(2)
    }
}))

export default function ActivityData({activity, open, onClose}) {
    const classes = useStyles()
    const enableComments = !!open && !!activity && activity.activity_timeuuid && activity.user_id
    let comments = useQuery(
        `comments_${activity.user_id}`,
        () => api.getCommentsForActivity(activity.user_id, activity.activity_timeuuid),
        {
            enabled: !!enableComments,
        }
    )
    return (
      <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={SlideTransition}
            fullWidth 
        >
            <DialogTitle><b>{activity.title}</b></DialogTitle>
            <DialogContent>
                {!!activity.activity_timeuuid && <Typography noWrap className={classes.info}><b>Id:</b> {activity.activity_timeuuid}</Typography>}
                {!!activity.user_id && <Typography noWrap className={classes.info}><b>Creator Id:</b> {activity.user_id}</Typography>}
                {!!activity.activity_type && <Typography noWrap className={classes.info}><b>Type:</b> {activity.activity_type}</Typography>}
                {!!activity.title && <Typography noWrap className={classes.info}><b>Title:</b> {activity.title}</Typography>}
                {!!activity.photo_url && <Typography noWrap className={classes.info}><b>Photo url:</b> {activity.photo_url}</Typography>}
                {!!activity.comment && <Typography noWrap className={classes.info}><b>Comment:</b> {activity.comment}</Typography>}
                {!!activity.text && <Typography noWrap className={classes.info}><b>Text:</b> {activity.text}</Typography>}
                {!!activity.physical_activity_type && <Typography noWrap className={classes.info}><b>Physical Activity Type:</b> {activity.physical_activity_type}</Typography>}
                {!!activity.duration && <Typography noWrap className={classes.info}><b>Duration:</b> {activity.duration}</Typography>}
                {!!activity.distance && <Typography noWrap className={classes.info}><b>Distance:</b> {activity.distance}</Typography>}
                {!!activity.description && <Typography noWrap className={classes.info}><b>Description:</b> {activity.description}</Typography>}
                {!!activity.perceived_effort && <Typography noWrap className={classes.info}><b>Perceived effort:</b> {activity.perceived_effort}</Typography>}
                {!!activity.average_speed && <Typography noWrap className={classes.info}><b>Average speed:</b> {activity.average_speed}</Typography>}
                {!!activity.average_cadence && <Typography noWrap className={classes.info}><b>Average cadence:</b> {activity.average_cadence}</Typography>}
                {!!activity.total_calories && <Typography noWrap className={classes.info}><b>Total calories:</b> {activity.total_calories}</Typography>}
                {!!activity.kudos && <Typography noWrap className={classes.info}><b>Kudos:</b> {activity.kudos}</Typography>}
                
                <Typography noWrap className={classes.info} variant="h6"><b>Comments</b></Typography>
                {comments?.isSuccess && comments?.data?.length > 0 ? comments.data.map((comment) => (
                    <div className={classes.comments}>
                        <Typography noWrap className={classes.info}>Userid: {comment.user_id}</Typography>
                        <Typography noWrap className={classes.info}>Comment: {comment.text}</Typography>
                    </div>
                ))
                :
                <Typography noWrap className={classes.info}>No comments for this activity yet</Typography>
                }
          
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color='primary'
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}
