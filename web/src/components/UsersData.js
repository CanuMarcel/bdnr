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
        {users?.isSuccess && users?.data?.data?.length > 0 ? (
          users.data.data.map((user) => (
            <Paper className={classes.paper} key={user.username}>
              <Typography noWrap className={classes.info} variant="h6">Username: {user.username}</Typography>
              <Typography noWrap className={classes.info}>Name: {user.name}</Typography>
              <Typography noWrap className={classes.info}>Email: {user.email}</Typography>
              <Typography noWrap className={classes.info}>Gender: {user.gender}</Typography>
              <Typography noWrap className={classes.info}>Date of Birth: {user.birthdate}</Typography>
              <Typography noWrap className={classes.info}>Height: {user.height.$numberDecimal} meters</Typography>
              <Typography noWrap className={classes.info}>Weight: {user.weight.$numberDecimal} kilos</Typography>
              <Typography noWrap className={classes.info}>Latitude: {user.latitude.$numberDecimal}</Typography>
              <Typography noWrap className={classes.info}>Longitude: {user.longitude.$numberDecimal}</Typography>
              <Typography noWrap className={classes.info}>Account Type: {user.type}</Typography>
              <Typography noWrap className={classes.info}>Account Privacy setting: {user.privacy}</Typography>
              
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
