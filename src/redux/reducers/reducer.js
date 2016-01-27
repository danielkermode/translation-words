import { combineReducers } from 'redux'
import {numbs} from './numbs'
import {server} from './server'
import {words} from './words'
import { routeReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

export const reducers = combineReducers({
	numbs,
	server,
	words,
	routing: routeReducer,
	form: formReducer
})

