/* Backend Factory
*  NOTE: all methods return promises.
*/
import Promise from 'bluebird'
import Parse from 'parse/node'

//Parse example if you had these classes in parse

//let Numb = Parse.Object.extend('Numb')
//let allNumbs = new Parse.Query(Numb)

//helper functions! these are used inside the backend class only, so I seperated them from the class.

function getUrl(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

/* getStateFromBackend (eg. Parse) */
/* ******************************************** */
const getState = () => {

  return new Promise((resolve, reject) => {

  	//example retrieving state from parse backend

    // let server = {}

    // allNumbs.find().then((serverNumbs) => {
    //   server.numbs = serverNumbs
    //   return allNumbs.find()
    // }).then((success) => {
    //   // transform to state
    //   let state = {
    //     numbs: numbs
    //   }
    //   resolve(state)
    // }, (error) => {
    //   // error
    //   resolve(error)
    // })
    // transform to state
    let state = {}
  	console.log("getting state from backend")
  	resolve(state)
  })

}
/* ******************************************** */

export default class Backend {

	constructor() {
		/* PARSE CREDS */
		Parse.initialize(
			"QeDLCfWNNR34TOxU7yr6sKFhFQqvUEi4ot0zBcso",
			"49i6ORGbwwM9Odj3DC52We7magPNad3bdz2kPLn3"
		)

	}

	login(username, password) {
		return new Promise((resolve, reject) => {
		  Parse.User.logIn(username, password, {
		    success: function(user) {
		      console.log(user.get('email'))
		      resolve(user.get('email'))
		    },
		    error: function(user, error) {
		      console.log(error)
		      reject(error.message)
		    }
		  });
		})
	}

	logout(user) {
		return new Promise((resolve, reject) => {
		  Parse.User.logOut()
		  resolve(user)
		})
	}

	register(email, username, password) {
		return new Promise((resolve, reject) => {
		  Parse.User.signUp(username, password, { ACL: new Parse.ACL(), email: email }, {
		    success: function(user) {
		      console.log(user)
		      resolve(user)
		    },
		    error: function(user, error) {
		      console.log(error)
		      reject(error.message)
		    }
		  });
	  })
	}

	translate(word, fromLanguage, toLanguage) {

	  return new Promise((resolve, reject) => {	
	    getUrl("http://api.mymemory.translated.net/get?q="+word+"&langpair="+fromLanguage+"|"+toLanguage).then(function(response) {    	
	    	const result = JSON.parse(response)
	    	console.log(result)
	    	if(result.matches){
			  	resolve(result.responseData.translatedText)
			  } else{
			  	reject(result.responseDetails)
			  }
			}, function(error) {
			  console.error("errorkas"+error);
			  reject(error)
			});
	  })
	}

}