const express = require('express');
const { Client } = require('pg');  // Import pg client
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors()); 

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Natcha2547_newpw',
  database: 'todoapp',
  port: 5432,
});

client.connect()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error('Unable to connect to the database:', err));

//CRUD operations
//Create (insert new task)
app.post('/tasks', async (req, res) => {
  const { task_name } = req.body;
  const query = 'INSERT INTO tasks (task_name, completed) VALUES ($1, $2) RETURNING *';
  const values = [task_name, false]; // Default completed to false
  try {
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);  // Returning the inserted row
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

//Read (get all tasks)
app.get('/tasks', async (req, res) => {
  const query = 'SELECT * FROM tasks';
  try {
    const result = await client.query(query);
    res.status(200).json(result.rows);  // Returning all tasks
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

//Update
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tasks WHERE id = $1';
  try {
    const result = await client.query(query, [id]);
    const task = result.rows[0];
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updateQuery = 'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *';
    const updateResult = await client.query(updateQuery, [id]);
    res.status(200).json(updateResult.rows[0]);  // Returning the updated task
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

//Delete 
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tasks WHERE id = $1';
  try {
    const result = await client.query(query, [id]);
    const task = result.rows[0];
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deleteQuery = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    await client.query(deleteQuery, [id]);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
