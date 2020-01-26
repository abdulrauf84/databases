const express = require('express');
const shape = require('shape-json');

const db = require('../database/database');
const router = express.Router();


router.use(express.json())

db.connect(err => {
  if (err) throw err;
  console.log('connected')
})

//Register New User
router.post('/add/user', (req, res) => {
  let sql = `INSERT INTO users (user_name, user_pass) values ('${req.body.user_name}','${req.body.user_pass}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ "Error": err.message })
      return res.json({ "Error": err.message })

    }
    console.log(result)
    result.affectedRows > 0 ? res.json({ "message": "Registeration succeded!" }) : res.json({ "message": "An error occured!" })
  })
})

//Login User
router.get('/find/user', (req, res) => {
  const userName = req.query.user;
  const userPass = req.query.pass;

  let sql = 'SELECT * FROM users Where user_name=? AND user_pass=? ';

  db.query(sql, [userName, userPass], (err, data) => {
    if (err) res.send('No user found');
    res.json(data)
  })
})

//Add New List
router.post('/add/list', (req, res) => {

  let sql = `INSERT INTO user_tasks_list (listID,list_name,user_id) values ('${req.body.list_id}','${req.body.list_name}','${req.body.user_id}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ "Error": err.message })
      return res.json({ "Error": err.message })

    }
    result.affectedRows > 0 ? res.json({ "message": "List added!" }) : res.json({ "message": "No List added!" })
  })
})

//Find Existing Lists
router.get('/find/lists', (req, res) => {

  let sql = 'SELECT utl.listID,utl.LIST_NAME FROM user_tasks_list utl JOIN users on users.userID=utl.user_id WHERE utl.user_id=? ';

  const userID = req.query.id;
  db.query(sql, userID, (err, data) => {
    if (err) res.send('No list found');
    res.json(data.map(list => list.LIST_NAME))
  })
})


router.get('/find/lists', (req, res) => {

  let sql = `SELECT tl.listID,tl.list_name,t.taskID, t.task_name FROM tasks t RIGHT JOIN user_tasks_list tl ON tl.listID=t.list_id JOIN users ON users.userID= tl.user_id WHERE tl.user_id =${req.query.id}`;


  db.query(sql, (err, result) => {
    if (err) throw err;
    var scheme = {
      "$group[lists](listID)": {
        "listid": "listID",
        "listname": "list_name",
        "$group[tasks](taskID)": {
          "taskid": "taskID",
          "taskname": "task_name"
        }
      }
    };
    const data = (shape.parse(result, scheme));
    res.json(data.lists.map(list => list))
  })
})


router.get('/find/tasks', (req, res) => {

  let sql = `SELECT tl.listID,tl.list_name,t.taskID, t.task_name FROM tasks t RIGHT JOIN user_tasks_list tl ON tl.listID=t.list_id JOIN users ON users.userID= tl.user_id WHERE tl.user_id =${req.query.id}`;


  db.query(sql, (err, result) => {
    if (err) throw err;
    var scheme = {
      "$group[lists](listID)": {
        "listid": "listID",
        "listname": "list_name",
        "$group[tasks](taskID)": {
          "taskid": "taskID",
          "taskname": "task_name"
        }
      }
    };
    const data = (shape.parse(result, scheme));
    res.json(data.lists.map(list => list))
  })
})





router.post('/add/task', (req, res) => {
  let sql = `INSERT INTO tasks (taskID, list_id, task_name) values ('${req.body.task_id}','${req.body.list_id}','${req.body.task_name}')`;

  db.query(sql, (err, result) => {

    if (err) {
      console.log({ "Error": err.message })
      return res.json({ "Error": err.message })

    }
    result.affectedRows > 0 ? res.json({ "message": "Task added!", result }) : res.json({ "message": "Task not added!" })
  })
})


//Delete List
router.delete('/delete/list', (req, res) => {

  let sql = `DELETE user_tasks_list.* , tasks.* from user_tasks_list left join tasks on  tasks.list_id=user_tasks_list.listID where user_tasks_list.listID=${req.query.id}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ "Error": err.message })
      return res.json({ "Error": err.message })

    }
    result.affectedRows > 0 ? res.json({ "message": "List deleted!" }) : res.json({ "message": "Error deleting List!" })
  })
})

//Delete Task
router.delete('/delete/task', (req, res) => {

  let sql = `DELETE tasks .* from tasks where taskID=${req.query.id}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ "Error": err.message })
      return res.json({ "Error": err.message })

    }
    result.affectedRows > 0 ? res.json({ "message": "Task deleted!" }) : res.json({ "message": "Error deleting Task!" })
  })
})
module.exports = router;    