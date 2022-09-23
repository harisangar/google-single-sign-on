import { useEffect,useState } from 'react';
import jwt_decode from "jwt-decode";


function App() {
  const [user,setUser]=useState({});
  const google= window.google;


function handleCallbackResponse(response){
    console.log("encoded JWT ID Token:" + response.credential);
    var userObject= jwt_decode(response.credential)
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden=true;
}

function handleSignOut(event){
  setUser({});
  document.getElementById("signInDiv").hidden=false;
}
useEffect(()=>{
  google.accounts.id.initialize({
    client_id:"851224163141-npqc8eencai89027ir5jfb15rk0hcpv6.apps.googleusercontent.com",
    callback: handleCallbackResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme:"outline",size:"large"}
    );
  //google.accounts.id.prompt();
},[user]);


  return (
    <div className="App">
     <div id="signInDiv" className='m-5 z-10'></div>
    
     { Object.keys(user).length !=0 &&
      <button  className="m-5 bg-white w-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={(e)=>handleSignOut(e)}>Sign Out</button>
     }

    {user ?
      <div className="rounded  shadow-md mt-10 p-12">
        <img className=" rounded"src={user.picture}></img>
        <h3>{user.name}</h3>
      </div>
      :null
    }
      
     
     
     
      

     
    

    
</div>



    
  );
}

export default App;
