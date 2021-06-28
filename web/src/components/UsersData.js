import {
    Paper,
    Typography,
    makeStyles,
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

export default function UsersData({users}) {
    const classes = useStyles()

    return (
      <Paper className={classes.paper}>
        {users?.isSuccess && users?.data?.length > 0 ? (
          users.data.map((user) => (
            <Paper className={classes.paper} key={user.username}>
              <Typography noWrap className={classes.info} variant="h6"><b>Username:</b> {user.username}</Typography>
              <Typography noWrap className={classes.info}><b>Id:</b> {user._id}</Typography>
              <Typography noWrap className={classes.info}><b>Name:</b> {user.name}</Typography>
              <Typography noWrap className={classes.info}><b>Email:</b> {user.email}</Typography>
              <Typography noWrap className={classes.info}><b>Gender:</b> {user.gender}</Typography>
              <Typography noWrap className={classes.info}><b>Date of Birth:</b> {user.birthdate}</Typography>
              <Typography noWrap className={classes.info}><b>Height:</b> {user.height.$numberDecimal} meters</Typography>
              <Typography noWrap className={classes.info}><b>Weight:</b> {user.weight.$numberDecimal} kilos</Typography>
              <Typography noWrap className={classes.info}><b>Latitude:</b> {user.latitude.$numberDecimal}</Typography>
              <Typography noWrap className={classes.info}><b>Longitude:</b> {user.longitude.$numberDecimal}</Typography>
              <Typography noWrap className={classes.info}><b>Equipment:</b> {user.equipment?.join()}</Typography>
              <Typography noWrap className={classes.info}><b>Account Type:</b> {user.type}</Typography>
              <Typography noWrap className={classes.info}><b>Account Privacy setting:</b> {user.privacy}</Typography>
              <Typography noWrap className={classes.info}><b>Notifications Opt In:</b> {user.optin?.join().toLowerCase()}</Typography>
            </Paper>
          ))
        )
        :
      <Typography
                            variant="h6"
                            noWrap
                            className={classes.title}
                        >
                            No users yet
            </Typography>
        }  
      </Paper>
    )
}
