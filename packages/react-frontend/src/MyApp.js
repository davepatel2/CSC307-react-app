// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from './Form';



function MyApp() {

    const [characters, setCharacters] = useState([]);
      
    useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	  }, [] );


    function removeOneCharacter (index) {
	    const userToDelete = characters[index];

    fetch(`http://localhost:8000/users/${userToDelete.id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter((character, i) => { return i !== index; });
        setCharacters(updated);
        console.log("Successfuly deleted user.")
      }
      else if (response.status === 404) {
        console.log("User not found on server.");
      }
      else {
        console.log("Error removing user:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
	}
	
	


	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}

	function postUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(person),
		});
	
		return promise;
	  }

	  function updateList(person) { 
		postUser(person)
		.then((response) => {
			if(response.status === 201){
				return response.json();
			}else{
				throw new Error ("failed to push")
			}
		})
		  .then((response) => setCharacters([...characters, response.user]))
		  .catch((error) => {
			console.log(error);
		  })
	}

	

  return (
      <div className="container">
        <Table characterData={characters} 
	        removeCharacter={removeOneCharacter} />
	        <Form handleSubmit={updateList} />
    </div>  
);
}



export default MyApp;