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

export default function FinishDialog({ open, onClose }) {
    const classes = useStyles()

    const [userId, setUserId] = useState('')
    const [activityTimeuuid ,setActivityTimeuuid ] = useState('')

    const [errors, setErrors] = useState([])

    const handleSubmit = () => {
        api.finishActivity(userId,activityTimeuuid)
            .then(handleClose)
            .catch(e => setErrors(e.errors || ['Error']))
    }

    const handleClose = () => {
        setUserId('')
        setActivityTimeuuid('')
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
            <DialogTitle>Create new point</DialogTitle>
            <DialogContent>
                <form noValidate>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='userId'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            required={true}
                            margin='dense'
                            id='userId'
                            label='Activity User Id'
                            value={userId}
                            error={!!getFieldError('user_id')}
                            helperText={getFieldError('user_id')}
                            onChange={(e) => setUserId(e.target.value)}
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
                            required={true}
                            margin='dense'
                            id='activityTimeuuid'
                            label='Activity Timeuuid'
                            value={activityTimeuuid}
                            error={!!getFieldError('activity_timeuuid')}
                            helperText={getFieldError('activity_timeuuid')}
                            onChange={(e) => setActivityTimeuuid(e.target.value)}
                        />
                    </FormControl>
                    {errors?.length >0 && (
                        <FormHelperText variant='filled' error={true}>
                            Please check that activity with these attributes exists!
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
                    disabled={userId === '' || activityTimeuuid === ''}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

FinishDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}
