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
    Typography,
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
    const [userId ,setUserId ] = useState('')


    const [errors, setErrors] = useState([])

    const handleSubmit = () => {
      api.createActivity(userId, {
        activity_type: activityType,
        title,
        photo_url: photoUrl || undefined,
        comment: comment || undefined,
        text: text || undefined,
        physical_activity_type: physicalActivityType||undefined,
        duration:duration||undefined,
        distance:distance||undefined,
        description:description||undefined,
        perceived_effort: perceivedEffort||undefined,
      })
        .then(handleClose)
        .catch(e => setErrors(e.errors))
    }

    const handleClose = () => {
        setUserId('')
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
        setErrors()
        onClose()
    }

    const getFieldError = (field) => {
        if(errors && errors[0]?.nestedErrors?.length > 0 ) {
            return errors[0].nestedErrors.find(error => error.param === field)?.msg
        } else {
            return errors?.find(error => error.param === field)?.msg
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            fullWidth
        >
            <DialogTitle>Create new activity</DialogTitle>
            <DialogContent>
                <Typography>To create any activity set user id, activity type and title </Typography>
                <Typography>To create a photo activity set activity type as photo, set photo url and comment fields.</Typography>
                <Typography>To create a post activity set activity type as post and set text field.</Typography>
                <Typography>To create a physical activity set activity type as physical and set physical activity type and description. The others are optional</Typography>
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
                            label='User Id'
                            required
                            value={userId}
                            error={!!getFieldError('user_id')}
                            helperText={getFieldError('user_id')}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </FormControl>
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
                            error={!!getFieldError('activity_type')}
                            helperText={getFieldError('activity_type')}
                            onChange={(e) => setActivityType(e.target.value)}
                            required
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
                            required
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
                            error={!!getFieldError('photo_url')}
                            helperText={getFieldError('photo_url')}
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
                            error={!!getFieldError('perceived_effort')}
                            helperText={getFieldError('perceived_effort')}
                            onChange={(e) => setPerceivedEffort(e.target.value)}
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
                    disabled={userId === ''}
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
