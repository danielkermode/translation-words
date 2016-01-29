import Backend from '../backend'
import Promise from 'bluebird'
import { routeActions } from 'react-router-redux'
import { resetTranslate } from './words'

const theBackend = new Backend();

const initialState = {
	status: 0,
	loggedIn: false,
	serverError: null,
	user: null
}

/* error actions */
/* *************************** */
export const SERVER_SUCCESS = 'server/SERVER_SUCCESS'
export const serverSuccess = () => {
	return {
		type: SERVER_SUCCESS
	}
}

export const SERVER_ERROR = 'server/SERVER_ERROR'
export const serverError = (error) => {
	return {
		type: SERVER_ERROR,
		error
	}
}

export const RESET_STATUS = 'server/RESET_STATUS'
export const resetStatus = () => {
	return {
		type: RESET_STATUS
	}
}

export const RESET_ERROR = 'server/RESET_ERROR'
export const resetError = () => {
	return {
		type: RESET_ERROR
	}
}

/* *************************** */

/* backend actions */
/* *************************** */

export const LOGIN_SUCCESS = 'server/LOGIN_SUCCESS'
export const LOGIN_ERROR = 'server/LOGIN_ERROR'
export const login = (username, password) => {
	return dispatch => {
		// loginToParse. first index of array is email, second is phrase pairs stored with user.
		theBackend.login(username,password).then(result => {
			return dispatch({
				type: LOGIN_SUCCESS,
				user: {
				  username,
				  email: result.email,
				  PhrasePairs: result.PhrasePairs,
				  password: 'hidden'
				}
			})
		}).then(state => {
			return dispatch(routeActions.push('/translate'))
		}).catch(error => {
			return dispatch({
				type: LOGIN_ERROR,
				error: error
			})
		})
	}
}

export const LOGOUT = 'server/LOGOUT'
export const logout = () => {
	return dispatch => {
		theBackend.logout().then(success => {
			return dispatch({
				type: LOGOUT,
				user: null
			})
		}).then(state => {
			return dispatch(routeActions.push('/home'))
		})
	}
}

export const REGISTER_SUCCESS = 'server/REGISTER_SUCCESS'
export const REGISTER_ERROR = 'server/REGISTER_ERROR'
export const register = (email, username, password) => {
	return dispatch => {
		// registerToParse
		theBackend.register(email, username,password).then(state => {
			return dispatch({
				type: REGISTER_SUCCESS,
				user: {
				  email,
				  username,
				  password: 'hidden'
				}
			})
		}).then(state => {
			return dispatch(routeActions.push('/translate'))
		}).catch(error => {
			return dispatch({
				type: REGISTER_ERROR,
				error: error
			})
		})
	}
}

//this resets translation in words reducer....
export const SAVE_SUCCESS = 'server/SAVE_SUCCESS'
export const SAVE_ERROR = 'server/SAVE_ERROR'
export const saveTranslation = (fromLang, word, toLang, translation) => {
	let currentTranslation = {};
	currentTranslation[fromLang] = word;
	currentTranslation[toLang] = translation;
	return dispatch => {
		theBackend.saveTranslation(currentTranslation).then(state => {
			return dispatch({
				type: SAVE_SUCCESS,
				translation: currentTranslation
			})
		}).then(state => {
			return dispatch(routeActions.push('/dictionary'))
		}).then(state => {
			return dispatch(resetTranslate())
		}).catch(error => {
			return dispatch({
				type: SAVE_ERROR,
				error: error
			})
		})
	}
}

export const DELETE_SUCCESS = 'server/DELETE_SUCCESS'
export const DELETE_ERROR = 'server/DELETE_ERROR'
export const deleteTranslation = (objToDelete) => {
	return dispatch => {
		theBackend.deleteTranslation(objToDelete).then(newPairs => {
			return dispatch({
				type: DELETE_SUCCESS,
				PhrasePairs: newPairs
			})
		}).catch(error => {
			return dispatch({
				type: DELETE_ERROR,
				error: error
			})
		})
	}
}


/* ************************* */

export const server = (state = initialState, action) => {
	let user = state.user;	

	// if (action == undefined) return state
	switch (action.type) {

		case SERVER_SUCCESS:
			return {
				...state,
				status: 1,
				serverError: null
			}

		case SERVER_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
			}

		case SAVE_SUCCESS:
			return {
				...state
				}

		case SAVE_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
			}

		case DELETE_SUCCESS:
			return {
				...state,
					user: {
						...user,
						PhrasePairs: action.PhrasePairs
					}
				}

		case DELETE_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
				}

		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.user,
				loggedIn: true
			}

		case LOGIN_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
			}

		case LOGOUT:
			return {
				...state,
				user:  action.user
			}

		case REGISTER_SUCCESS:
			return {
				...state,
				user: action.user,
				loggedIn: true
			}

		case REGISTER_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
			}
		case RESET_STATUS:
			return {
				...state,
				status: 0
			}

		case RESET_ERROR:
			return {
				...state,
				serverError: null
			}

		default:
			return state
	}
}
