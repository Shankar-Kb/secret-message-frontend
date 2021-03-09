import { useState } from 'react';
//import { BrowserRouter, Route, Switch, useHistory, useLocation, useParams} from 'react-router-dom';

const DislpayMessage = ({serverURL}) => {
    
    const [message, setMessage] = useState('');
    const getMessage = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const resultId = urlParams.get('result_id');
        console.log(resultId);
        console.log(serverURL);
        fetch(`${serverURL}/message-by-id/${resultId}`)
            .then( resp => resp.json() )
            .then( data => {
              console.log(data);
              setMessage(data.result[0].message);
            });
    }
    getMessage();

    return(
        <>
         <div className="display-message-box container fluid">
             <div className="row">
                 <div className="col-4 offset-4">
             <span className="display-span">Your Secret Message is {message}</span>
             </div>
             </div>
             </div>
        </>
    )
}


export default DislpayMessage;