import { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    makeStyles,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { api } from '../api'
import { SlideTransition } from '../transitions'

const useStyles = makeStyles((theme) => ({
    formControl: {
        paddingBottom: theme.spacing(2),
    },
}))

export default function CommentDialog({ open, onClose }) {
    const classes = useStyles()

    const [activityUserId ,setActivityUserId ] = useState('')
    const [activityTimeuuid ,setActivityTimeuuid ] = useState('')
    const [userId ,setUserId ] = useState('')
    const [text ,setText ] = useState('')

    const [errors, setErrors] = useState([])

    const handleSubmit = () => {
      api.createComment(activityUserId,activityTimeuuid,
        {
        user_id: userId,
        text,
      })
        .then(handleClose)
        .catch(e => setErrors(e.response.data.errors))
    }

    const handleClose = () => {
        setActivityUserId('')
        setActivityTimeuuid('')
        setUserId('')
        setText('')
        setErrors()
        onClose()
    }

    const getFieldError = (field) => errors?.find(error => error.param === field)?.msg
    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            fullWidth
        >
            <DialogTitle>Create new comment</DialogTitle>
            <DialogContent>
                <form noValidate>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='activityUserId'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='activityUserId'
                            label='Activity User Id'
                            value={activityUserId}
                            error={!!getFieldError('activityUserId')}
                            helperText={getFieldError('activityUserId')}
                            onChange={(e) => setActivityUserId(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='activityTimeuuid'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='activityTimeuuid'
                            label='Activity Timeuuid'
                            value={activityTimeuuid}
                            error={!!getFieldError('activityTimeuuid')}
                            helperText={getFieldError('activityTimeuuid')}
                            onChange={(e) => setActivityTimeuuid(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='userId'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='userId'
                            label='Commentor User Id'
                            value={userId}
                            error={!!getFieldError('userId')}
                            helperText={getFieldError('userId')}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='text'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='text'
                            label='Text'
                            value={text}
                            error={!!getFieldError('text')}
                            helperText={getFieldError('text')}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </FormControl>
                    {errors?.length >0 && (
                        <FormHelperText variant='filled' error={true}>
                            Please check the errors and try again
                        </FormHelperText>
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color='primary'
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

CommentDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}
