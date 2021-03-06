//import { useState } from 'react';
//import { BrowserRouter, Route, Switch, useHistory, useLocation, useParams} from 'react-router-dom';
const dotenv = require('dotenv');
dotenv.config();

function App() {
    //const [posts, setPosts] = useState([]);
    //const serverURL = "https://secret-message-api.herokuapp.com";
    const serverURL = "https://localhost:3001";
    const clientURL = "https://localhost:3000";

    const sendMessage = () => {
        let data = {
        password: document.getElementById("password").value,
        randomKey: document.getElementById("randomKey").value,
        message: document.getElementById("message").value,
        targetURL: clientURL,
        targetMail: document.getElementById("targetMail").value
        }
        console.log(serverURL);
        console.log(clientURL);
        fetch(`${serverURL}/create-message`, {
              method: "POST",
              headers: {"Content-Type": "application/json; charset=UTF-8"},
              body: JSON.stringify(data)
              })
              .then( resp => resp.json() )
              .then( data => {
                console.log(data)
                document.getElementById("sendMessageForm").reset();
              });  
    }
    const generateRandomString = () => {
      const length = 6;
      document.getElementById("randomKey").value = Math.random().toString(20).substr(2, length).toUpperCase();
      }      

  return (
    <div className="App">
     <form id="sendMessageForm">
     <div className="input-group">
     <span className="input-group-text">Secret Message</span>
     <input className="form-control" id="message" type="text" defaultValue="" />
     <span className="input-group-text">Password</span>
     <input className="form-control" id="password" type="password" defaultValue="" />
     <span className="input-group-text">Send to</span>
     <input className="form-control" id="targetMail" type="text" defaultValue="" />
     <span className="input-group-text">Random Key</span>
     <input className="form-control" id="randomKey" type="text" defaultValue="" disabled/>
     <button type="button" className="btn btn-secondary" id="generateStringButton" onClick={generateRandomString}>Generate Random String</button>
     </div>
     </form>
     <button type="button" className="btn btn-secondary" id="sendMessageButton" onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
