import React, {Component} from 'react';

/* create container as stateless function to indicate pure component */
export class DictionaryList extends Component {

	render() {
      const deleteAction = this.props.actions.deleteTranslation
      const pairs = this.props.PhrasePairs.map(function(obj, index){ 
      const firstLang = Object.keys(obj)[0]
      const secondLang = Object.keys(obj)[1]
      const deleteTranslation = () => {
        deleteAction(obj);
      };
       return (<div key={index}>
                 <div><span>{firstLang}: </span> <span>{obj[firstLang]}</span></div>
                 <div><span>{secondLang}: </span> <span>{obj[secondLang]}</span>
                 <button onClick={deleteTranslation} className="btn btn-danger btn-xs">Delete</button> </div>
               </div>)
          });
		return (
      <div> {pairs} </div>
		);
	}
}