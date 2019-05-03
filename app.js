const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('recipes.sqlite');


app.use(express.json())

app.get('/recipes', (req, res) => {
    let stmt = 'SELECT * from recipes;'
    db.all(stmt, [], (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            res.json({
                data: rows
            })
        }
    })
})

app.post('/recipes/', (req, res) => {
    const { name, description, minutes_needed } = req.body
    const stmt = db.prepare('INSERT into recipes(name,description,minutes_needed) VALUES(?,?,?)')
    stmt.run(name, description, minutes_needed, (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            db.get('SELECT * from recipes where id = (SELECT MAX(id) from recipes);', (err, row) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(row)
                }
            })
        }
    })
})


app.delete('/recipes/:id',(req,res) => {
    const recipeId = req.params.id
    db.run('DELETE FROM recipes WHERE id=(?)',recipeId,(err) => {
        if(err) {
            res.json(err)
        } else {
            res.status(201).json({})
        }
    })
})


app.put('/recipes/:id',(req,res) => {
    const recipeId = req.params.id
    const {name, description, minutes_needed} = req.body
    db.run('UPDATE recipes SET name=?, description=?, minutes_needed=? WHERE id=?',[name,description,minutes_needed,recipeId],(err) => {
        if(err) {
            res.json(err)
        } else {
            db.get('SELECT * from recipes where id=?',[recipeId],(err,rows) => {
                err ? res.json(err) : res.json(rows)
            })
        }
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))