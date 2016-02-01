import babelPolyfill from "babel-polyfill";
import { Server } from "hapi";
import h2o2 from "h2o2";
import inert from "inert";
import React from "react";
import ReactDOM from "react-dom/server";
import { RouterContext, match } from "react-router";
import createLocation from "history/lib/createLocation";
import configureStore from "./src/redux/store";
//import {AppContainer} from './src/containers/App';
import { Provider } from 'react-redux';
import routesContainer from "./src/routes";
import url from "url";
let routes = routesContainer;

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const initialState = store.getState();
/**
 * Start Hapi server on port 8000.
 */
const hostname = process.env.HOSTNAME || "localhost";
const server = new Server();

server.connection({host: hostname, port: process.env.PORT || 5000});

server.register(
	[
		h2o2,
		inert,
		// WebpackPlugin
	],
	(err) => {
	if (err) {
		throw err;
	}

	server.start(() => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
	});
});

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method:  "GET",
	path:    "/{params*}",
	handler: {
		file: (request) => "public" + request.path
	}
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
    return reply.continue();
  }

  //let location = createLocation(request.path);

  match({routes, location: request.path}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      reply.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    else if (error || !renderProps) {
      reply.continue();
    }
    else {
		const reactString = ReactDOM.renderToString(
				<Provider store={store}>
						<RouterContext {...renderProps} />
				</Provider>
		);

		//const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
		let output = (
			`<!doctype html>
			<html lang="en-us">
				<head>
					<meta charset="utf-8">
					<title>Translator</title>
				</head>
				<body>
					<div id="react-root">${reactString}</div>
 				<script>
 					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
 					window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
 				</script>
 				<script src=public/bundle.js></script>
 			</body>
			</html>`
 		);
    	reply(output);
    }
  });
});
