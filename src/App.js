//import { useState } from 'react';
//import { BrowserRouter, Route, Switch, useHistory, useLocation, useParams} from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DisplayMessageComp from './dislpayMessage';

function App() {
    //const { push } = useHistory();
    //const [text, setText] = useState("");
    //const serverURL = "https://secret-message-api.herokuapp.com";
    const serverURL = "http://localhost:3001";
    const clientURL = "http://localhost:3000/message";

    const sendMessage = () => {
        let data = {
        password: document.getElementById("password").value,
        randomKey: document.getElementById("randomKey").value,
        message: document.getElementById("message").value,
        targetURL: clientURL,
        targetMail: document.getElementById("targetMail").value
        }
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

    const deleteMessage = () => {

      let data = {
        secretKey: document.getElementById("randomKeyDelete").value,
        password: document.getElementById("passwordDelete").value
      }
      fetch(`${serverURL}/delete-message`, { 
        method: "DELETE",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data) })
         .then( resp => resp.json() )
         .then( data => { //console.log(data);
         console.log(data);
         document.getElementById("deleteMessageForm").reset();
         });
         
    }

    const generateRandomString = () => {
      const length = 6;
      const randomString = Math.random().toString(20).substr(2, length).toUpperCase();
      document.getElementById("randomKey").value = randomString;
      document.getElementById("randomKeyDelete").value = randomString;
      }      

  return (
    <BrowserRouter>
    <div className="container-fluid">
    <div className="row">
    <Switch>
    
    <Route path='/' exact={true}>
    <div className="send-message-box message-box col-6">
     <h2 className="heading text-center">Send Message</h2>
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

    <div className="delete-message-box message-box col-6">
    <h2 className="heading text-center">Delete Message</h2>
     <form id="deleteMessageForm">
     <div className="input-group">
     <span className="input-group-text">Password</span>
     <input className="form-control" id="passwordDelete" type="password" defaultValue="" />
     <span className="input-group-text">Random Key</span>
     <input className="form-control" id="randomKeyDelete" type="text" defaultValue=""/>
     </div>
     </form>
     <button type="button" className="btn btn-secondary" id="deleteMessageButton" onClick={deleteMessage}>Delete Message</button>
    </div>
    </Route>

    <Route path="/message/:id" render={(props) => <DisplayMessageComp {...props} serverURL={serverURL} />} />

    </Switch>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
