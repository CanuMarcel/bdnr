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

export default function ActivityDialog({ open, onClose }) {
    const classes = useStyles()

    const [activityType, setActivityType] = useState('')
    const [title, setTitle] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [comment, setComment] = useState('')
    const [text, setText] = useState('')
    const [physicalActivityType, setPhysicalActivityType] = useState('')
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')
    const [description, setDescription] = useState('')
    const [perceivedEffort, setPerceivedEffort] = useState('')
    const [averageSpeed, setAverageSpeed] = useState('')
    const [averageCadence, setAverageCadence] = useState('')
    const [totalCalories, setTotalCalories] = useState('')

    const [errors, setErrors] = useState([])

    const handleSubmit = () => {
      api.createActivity({
        activityType,
        title,
        photoUrl,
        comment,
        text,
        physicalActivityType,
        duration,
        distance,
        description,
        perceivedEffort,
        averageSpeed,
        averageCadence,
        totalCalories,
      })
        .then(handleClose)
        .catch(e => setErrors(e.response.data.errors))
    }

    const handleClose = () => {
        setActivityType('')
        setTitle('')
        setPhotoUrl('')
        setComment('')
        setText('')
        setPhysicalActivityType('')
        setDuration('')
        setDistance('')
        setDescription('')
        setPerceivedEffort('')
        setAverageSpeed('')
        setAverageCadence('')
        setTotalCalories('')
        onClose()
    }

    const getFieldError = (field) => errors.find(error => error.param === field)?.msg


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            fullWidth
        >
            <DialogTitle>Create new activity</DialogTitle>
            <DialogContent>
                <form noValidate>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='activityType'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='activityType'
                            label='ActivityType'
                            value={activityType}
                            error={!!getFieldError('activityType')}
                            helperText={getFieldError('activityType')}
                            onChange={(e) => setActivityType(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='title'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='title'
                            label='Title'
                            value={title}
                            error={!!getFieldError('title')}
                            helperText={getFieldError('title')}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='photoUrl'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='photoUrl'
                            label='Photo Url'
                            value={photoUrl}
                            error={!!getFieldError('photoUrl')}
                            helperText={getFieldError('photoUrl')}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='comment'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='comment'
                            label='Comment'
                            value={comment}
                            error={!!getFieldError('comment')}
                            helperText={getFieldError('comment')}
                            onChange={(e) => setComment(e.target.value)}
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
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='physicalActivityType'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='physicalActivityType'
                            label='Physical Activity Type'
                            value={physicalActivityType}
                            error={!!getFieldError('physicalActivityType')}
                            helperText={getFieldError('physicalActivityType')}
                            onChange={(e) => setPhysicalActivityType(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='duration'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='duration'
                            label='Duration'
                            value={duration}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('duration')}
                            helperText={getFieldError('duration')}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='distance'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='distance'
                            label='Distance'
                            value={distance}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('distance')}
                            helperText={getFieldError('distance')}
                            onChange={(e) => setDistance(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='description'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='description'
                            label='Description'
                            value={description}
                            error={!!getFieldError('description')}
                            helperText={getFieldError('description')}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='perceivedEffort'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='perceivedEffort'
                            label='Perceived Effort'
                            value={perceivedEffort}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('perceivedEffort')}
                            helperText={getFieldError('perceivedEffort')}
                            onChange={(e) => setPerceivedEffort(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='averageSpeed'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='averageSpeed'
                            label='Average Speed'
                            value={averageSpeed}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('averageSpeed')}
                            helperText={getFieldError('averageSpeed')}
                            onChange={(e) => setAverageSpeed(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='averageCadence'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='averageCadence'
                            label='Average Cadence'
                            value={averageCadence}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('averageCadence')}
                            helperText={getFieldError('averageCadence')}
                            onChange={(e) => setAverageCadence(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='totalCalories'
                        fullWidth
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='totalCalories'
                            label='Total Calories'
                            value={totalCalories}
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!getFieldError('totalCalories')}
                            helperText={getFieldError('totalCalories')}
                            onChange={(e) => setTotalCalories(e.target.value)}
                        />
                    </FormControl>
                    {errors.length >0 && (
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

ActivityDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}
