import {
    Paper,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core'
import { useState } from 'react'
import ActivityData from './ActivityData'

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
    activityLine: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: theme.spacing(2)
    }
}))

export default function ActivitiesData({activities}) {
    const classes = useStyles()
    const [activityDialogIsOpen, setActivityDialogIsOpen] = useState(false)
    const [activity, setActivity] = useState(false)

    const handleOpenInfo = (activity) => {
        setActivity(activity)
        setActivityDialogIsOpen(true)
    }

    return (
        <>
            <Paper className={classes.paper}>
                {activities?.isSuccess && activities?.data?.length > 0 ? (
                <>
                {activities.data.map((activity) => (
                    <div className={classes.activityLine}>
                    <Typography noWrap className={classes.info}>{activity.title}</Typography>
                    <Typography noWrap className={classes.info}>Id: {activity.activity_timeuuid}</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={()=>handleOpenInfo(activity)}
                        className={classes.activitiesAction}
                    >View details</Button>
                    </div>
                ))
                    }
                </>
                )
                :
                <Typography variant="h6" noWrap className={classes.title}>
                No activities for this user yet
                </Typography>
                }
            </Paper>
            <ActivityData
                open={activityDialogIsOpen}
                onClose={()=>setActivityDialogIsOpen(false)}
                activity={activity}
            />
        </>
    )
}
