import {
    Button,
    Typography,
    makeStyles,
    TextField,
} from '@material-ui/core'
import { useState } from 'react'
import UsersData from './UsersData'
import UserDialog from './UserDialog'
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
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>setActivityDialogIsOpen(true)}
                className={classes.button}
            >
                + Activity
            </Button>
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
            <ActivitiesData />
        </>
    )
}
