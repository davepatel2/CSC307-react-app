// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
     users['users_list']
        .find( (user) => user['id'] === id);
        
const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

function genID(){
    const ID = Math.random().toString().replace(".","");
    return ID;
}



const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
app.use(cors());
app.use(express.json());

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = genID();
    addUser(userToAdd);
    res.status(201).json({message: "User created successfully", user: userToAdd});
});


app.delete("/users/:id", (req,res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if(result  === undefined){
        res.status(404).send("User Id not found");
    
    }else{
        const userindex = users["users_list"].findIndex((userindex) => userindex["id"] === id);
        users["users_list"].splice(userindex,1);
        res.status(204).send("removed user");
    }
    
})

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});



app.get("/users", (req, res) => {
    const name = req.query.name;
    const userjob = req.query.job;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      if (userjob != undefined) {
        let jobname = users['users_list'].filter( (user) => user['job'] === userjob); 
        jobname = { users_list: jobname };
        res.send(jobname);
      } else {
        res.send(result);
      }
    } else {
      res.send(users);
    }
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      