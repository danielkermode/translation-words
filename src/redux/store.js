/****************** Make Store *********************/
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { reducers } from './reducers/reducer'

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)

const createFinalStore = compose(
	applyMiddleware(thunk, multi, reduxRouterMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
	// DevTools.instrument()
)(createStore)

export const store = createFinalStore(reducers)

// Required for replaying actions from devtools to work
//reduxRouterMiddleware.listenForReplays(store)
/**************************************************/