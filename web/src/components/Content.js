import {
    Button,
    Typography,
    makeStyles,
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
}))

export default function Content() {
    const classes = useStyles()
    const [userDialogIsOpen, setUserDialogIsOpen] = useState(false)
    const [activityDialogIsOpen, setActivityDialogIsOpen] = useState(false)

    const users = useQuery(
        'users',
        () => api.getUsers(),
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
            <ActivitiesData />
        </>
    )
}
