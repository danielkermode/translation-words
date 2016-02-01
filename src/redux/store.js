/****************** Make Store *********************/
//import { syncHistory } from 'react-router-redux'
//import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { reducers } from './reducers/reducer'

export default function (initialState) {

	// Sync dispatched route actions to the history
	//const reduxRouterMiddleware = syncHistory(browserHistory)
//, reduxRouterMiddleware
	const createFinalStore = compose(
		applyMiddleware(thunk, multi),
		typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
		// DevTools.instrument()
	)(createStore)

	const store = createFinalStore(reducers, initialState)

	return store;
}

// Required for replaying actions from devtools to work
//reduxRouterMiddleware.listenForReplays(store)
/**************************************************/