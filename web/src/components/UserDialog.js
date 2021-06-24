import { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Radio,
    RadioGroup,
    makeStyles,
    FormHelperText,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { api } from '../api'
import { SlideTransition } from '../transitions'

const useStyles = makeStyles((theme) => ({
    formControl: {
        paddingBottom: theme.spacing(2),
    },
    formControlRadio: {
        marginTop: theme.spacing(2),
    },
    radioGroup: {
        paddingTop: theme.spacing(2),
    },
    radio: {
        marginLeft: theme.spacing(2),
    },
}))

export default function MetricDialog({ open, onClose }) {
    const classes = useStyles()
    const [description, setDescription] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('NONBINARY')
    const [birthdate, setBirthdate] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [type, setType] = useState('FREE')
    const [privacy, setPrivacy] = useState('PUBLIC')
    const [optin, setOptin] = useState({
      COMMENTS: false,
      KUDOS: false,
    })
    const { KUDOS, COMMENTS } = optin;

    const [error, setError] = useState({})

    const handlePotinChange = (event) => {
        setOptin({ ...optin, [event.target.name]: event.target.checked });
      };

    const handleSubmit = () => {
      const actualOptin = []
      if (optin.COMMENTS) actualOptin.push('COMMENTS')
      if (optin.KUDOS) actualOptin.push('KUDOS')
        api.createUser({
          username,
          password,
          name,
          email,
          gender,
          birthdate,
          height,
          weight,
          latitude,
          longitude,
          type,
          privacy,
          optin: actualOptin,
        })
          .then(handleClose)
          .catch(setError)
    }

    const handleClose = () => {
      setUsername('')
      setPassword('')
      setName('')
      setEmail('')
      setGender('NONBINARY')
      setBirthdate('')
      setHeight('')
      setWeight('')
      setLatitude('')
      setLongitude('')
      setType('FREE')
      setPrivacy('PUBLIC')
      setOptin({comments: false,kudos: false,})
      onClose()
    }

    const getFieldError = (field) =>
        error.fieldErrors && error.fieldErrors[field]

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            fullWidth
        >
            <DialogTitle>Create new user</DialogTitle>
            <DialogContent>
                <form noValidate>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='username'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='username'
                            label='Username'
                            value={username}
                            error={!!getFieldError('username')}
                            helperText={getFieldError('username')}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='password'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='password'
                            label='password'
                            value={password}
                            error={!!getFieldError('password')}
                            helperText={getFieldError('password')}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='name'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Name'
                            value={name}
                            error={!!getFieldError('name')}
                            helperText={getFieldError('name')}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='email'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='email'
                            label='Email'
                            value={email}
                            error={!!getFieldError('email')}
                            helperText={getFieldError('email')}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='birthdate'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='birthdate'
                            label='Date of Birth'
                            value={birthdate}
                            error={!!getFieldError('birthdate')}
                            helperText={getFieldError('birthdate')}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='height'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='height'
                            label='Height'
                            value={height}
                            error={!!getFieldError('height')}
                            helperText={getFieldError('height')}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        className={classes.formControl}
                        name='weight'
                        fullWidth
                        required
                    >
                        <TextField
                            autoFocus
                            margin='dense'
                            id='weight'
                            label='Weight'
                            value={weight}
                            error={!!getFieldError('weight')}
                            helperText={getFieldError('weight')}
                            onChange={(e) => setWeight(e.target.value)}
                            required
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
                            error={!!getFieldError('longitude')}
                            helperText={getFieldError('longitude')}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                        />
                    </FormControl>
                    

                    <FormControl
                        component='fieldset'
                        variant='outlined'
                        className={classes.formControlRadio}
                        name='accountType'
                        fullWidth
                    >
                        <FormLabel component='legend'>Account Type</FormLabel>
                        <RadioGroup
                            className={classes.radioGroup}
                            name='accountType'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <FormControlLabel
                                className={classes.radio}
                                value='FREE'
                                control={<Radio color='primary' />}
                                label='Free'
                            />
                            <FormControlLabel
                                className={classes.radio}
                                value='PREMIUM'
                                control={<Radio color='primary' />}
                                label='Premium'
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl
                        component='fieldset'
                        variant='outlined'
                        className={classes.formControlRadio}
                        name='gender'
                        fullWidth
                    >
                        <FormLabel component='legend'>Gender</FormLabel>
                        <RadioGroup
                            className={classes.radioGroup}
                            name='gender'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel
                                className={classes.radio}
                                value='NONBINARY'
                                control={<Radio color='primary' />}
                                label='Non Binary'
                            />
                            <FormControlLabel
                                className={classes.radio}
                                value='MALE'
                                control={<Radio color='primary' />}
                                label='Male'
                            />
                            <FormControlLabel
                                className={classes.radio}
                                value='FEMALE'
                                control={<Radio color='primary' />}
                                label='Female'
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl
                        component='fieldset'
                        variant='outlined'
                        className={classes.formControlRadio}
                        name='privacy'
                        fullWidth
                    >
                        <FormLabel component='legend'>Privacy</FormLabel>
                        <RadioGroup
                            className={classes.radioGroup}
                            name='privacy'
                            value={privacy}
                            onChange={(e) => setPrivacy(e.target.value)}
                        >
                            <FormControlLabel
                                className={classes.radio}
                                value='PUBLIC'
                                control={<Radio color='primary' />}
                                label='Public'
                            />
                            <FormControlLabel
                                className={classes.radio}
                                value='PRIVATE'
                                control={<Radio color='primary' />}
                                label='Private'
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Notifications Opt In</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={KUDOS} onChange={handlePotinChange} name="KUDOS" />}
                          label="Kudos"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={COMMENTS} onChange={handlePotinChange} name="COMMENTS" />}
                          label="Comments"
                        />
                      </FormGroup>
                    </FormControl>

                    {error.message && (
                        <FormHelperText variant='filled' error={true}>
                            {error.message}
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

MetricDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}
