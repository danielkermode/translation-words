import Backend from '../backend'
import Promise from 'bluebird'
import { routeActions } from 'react-router-redux'

const theBackend = new Backend();

const initialState = {
	result: {},
	wordError: null
}

/* asynchronous actions */
/* *************************** */

export const TRANSLATE_SUCCESS = 'words/TRANSLATE_SUCCESS'
export const TRANSLATE_ERROR = 'words/TRANSLATE_ERROR'

export const translateWord = (word, fromLanguage, toLanguage) => {
	return dispatch => {
		// translate
		theBackend.translate(word, fromLanguage, toLanguage).then(translation => {
			return dispatch({
				type: TRANSLATE_SUCCESS,
				result: {
				  word: word,
				  fromLanguage: fromLanguage,
				  toLanguage: toLanguage,
				  translation: translation
				}
			})
		}).catch(error => {
			return dispatch({
				type: TRANSLATE_ERROR,
				error: error
			})
		})
	}
}

export const RESET_TRANSLATE = 'words/RESET_TRANSLATE'
export const resetTranslate = () => {
	return {
		type: RESET_TRANSLATE
	}
}

/* *************************** */

/* words reducer */

export const words = (state = initialState, action) => {	
	switch(action.type) {

	case TRANSLATE_SUCCESS:
		return {
			...state,
			result: action.result
		}

	case TRANSLATE_ERROR:
		return {
			...state,
			wordError: action.error
		}
	case RESET_TRANSLATE:
		return {
			...state,
			result: {},
			wordError: null
		}
	default:
		return state

	}
}