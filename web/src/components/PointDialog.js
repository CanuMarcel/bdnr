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

    const [userId, setUserId] = useState('')
    const [activityTimeuuid ,setActivityTimeuuid ] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [cadence, setCadence] = useState('')
    const [calories, setCalories] = useState('')
    const [speed, setSpeed] = useState('')

    const [errors, setErrors] = useState([])

    const handleSubmit = () => {
      api.createPoint(userId,activityTimeuuid,
        {
        latitude: latitude || undefined,
        longitude: longitude || undefined,
        cadence: cadence || undefined,
        calories: calories || undefined,
        speed: speed || undefined,
      })
        .then(handleClose)
        .catch(e => setErrors(e.errors))
    }

    const handleClose = () => {
        setUserId('')
        setActivityTimeuuid('')
        setLatitude('')
        setLongitude('')
        setCadence('')
        setCalories('')
        setSpeed('')
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
                            margin='dense'
                            id='userId'
                            label='Activity User Id'
                            value={userId}
                            required={true}
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
                        name='latitude'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='latitude'
                            label='Latitude'
                            value={latitude}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('latitude')}
                            helperText={getFieldError('latitude')}
                            onChange={(e) => setLatitude(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='longitude'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='longitude'
                            label='Longitude'
                            value={longitude}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('longitude')}
                            helperText={getFieldError('longitude')}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='cadence'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='cadence'
                            label='Cadence'
                            value={cadence}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('cadence')}
                            helperText={getFieldError('cadence')}
                            onChange={(e) => setCadence(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='calories'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='calories'
                            label='Calories'
                            value={calories}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('calories')}
                            helperText={getFieldError('calories')}
                            onChange={(e) => setCalories(e.target.value)}
                            required
                        />
                    </FormControl>
                     <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='speed'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='speed'
                            label='Speed'
                            value={speed}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('speed')}
                            helperText={getFieldError('speed')}
                            onChange={(e) => setSpeed(e.target.value)}
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
                    disabled={userId === '' || activityTimeuuid === ''}
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
