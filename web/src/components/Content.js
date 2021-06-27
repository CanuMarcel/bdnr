import {
    Button,
    Typography,
    makeStyles,
    TextField,
} from '@material-ui/core'
import { useState } from 'react'
import UsersData from './UsersData'
import UserDialog from './UserDialog'
import ActivityDialog from './ActivityDialog'
import CommentDialog from './CommentDialog'
import PointDialog from './PointDialog'
import FinishDialog from './FinishDialog'
import ActivitiesData from './ActivitiesData'

import { api } from '../api'
import { useQuery } from 'react-query'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2),
    },
    activitiesActions: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    activitiesAction: {
        height: '80%',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    activitiesSearch: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    }
}))

export default function Content() {
    const classes = useStyles()
    const [userDialogIsOpen, setUserDialogIsOpen] = useState(false)
    const [activityDialogIsOpen, setActivityDialogIsOpen] = useState(false)
    const [commentDialogIsOpen, setCommentDialogIsOpen] = useState(false)
    const [pointDialogIsOpen, setPointDialogIsOpen] = useState(false)
    const [finishDialogIsOpen, setFinishDialogIsOpen] = useState(false)
    const [userId, setUserId] = useState('')

    const users = useQuery(
        'users',
        () => api.getUsers(),
    )

    const activities = useQuery(
        'activities',
        () => api.getActivities(userId),
        {
            enabled: false,
            retry: false,
        }
    )

    const handleUsersClose = () => {
        setUserDialogIsOpen(false)
        users.refetch()
    }

    const handleActivitiesClose = () => {
        setActivityDialogIsOpen(false)
        activities.refetch()
    }

    const handleCommentsClose = () => {
        setCommentDialogIsOpen(false)
        activities.refetch()
    }

    const handlePointsClose = () => {
        setPointDialogIsOpen(false)
        activities.refetch()
    }

    const handleFinishClose = () => {
        setFinishDialogIsOpen(false)
        activities.refetch()
    }
    

    return (
        <>
            <Typography
                variant="h5"
                noWrap
                className={classes.title}
            >
                Users
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={() =>setUserDialogIsOpen(true)}
                className={classes.button}
            >
                + User
            </Button>

            <UserDialog
                open={userDialogIsOpen}
                onClose={handleUsersClose}
            />
            <UsersData users={users}/>


            <Typography
                variant="h6"
                noWrap
                className={classes.title}
            >
                Activities
            </Typography>
            <div className={classes.activitiesActions}>
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>setActivityDialogIsOpen(true)}
                className={classes.button}
            >
                + Activity
            </Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>setCommentDialogIsOpen(true)}
                className={classes.button}
            >
                + Comment
            </Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>setPointDialogIsOpen(true)}
                className={classes.button}
            >
                + Points
            </Button>
             <Button
                variant="outlined"
                color="primary"
                onClick={()=>setFinishDialogIsOpen(true)}
                className={classes.button}
            >
                Finish Activity
            </Button>
            </div>
            <div className={classes.activitiesActions}>
                <TextField
                    autoFocus
                    className={classes.activitiesSearch}
                    id='userId'
                    label='UserId'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                 <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=>activities.refetch()}
                    className={classes.activitiesAction}
                >
                    Search
                </Button>
            </div>
            <ActivityDialog
                open={activityDialogIsOpen}
                onClose={handleActivitiesClose}
            />
            <CommentDialog
                open={commentDialogIsOpen}
                onClose={handleCommentsClose}
            />
            <PointDialog
                open={pointDialogIsOpen}
                onClose={handlePointsClose}
            />
            <FinishDialog
                open={finishDialogIsOpen}
                onClose={handleFinishClose}
            />
            <ActivitiesData />
        </>
    )
}
