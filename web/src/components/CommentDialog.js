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
        user_id: userId || undefined,
        text: text || undefined,
      })
        .then(handleClose)
        .catch(e => console.log(e) || setErrors(e.errors))
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
                            required={true}
                            value={activityUserId}
                            error={!!getFieldError('activity_user_id')}
                            helperText={getFieldError('activity_user_id')}
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
                            required={true}
                            value={activityTimeuuid}
                            error={!!getFieldError('activity_timeuuid')}
                            helperText={getFieldError('activity_timeuuid')}
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
                            error={!!getFieldError('user_id')}
                            helperText={getFieldError('user_id')}
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
                            required={true}
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
                    disabled={activityUserId === '' || activityTimeuuid === '' || userId === ''}
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
