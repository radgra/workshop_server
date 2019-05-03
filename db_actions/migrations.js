const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('recipes.sqlite');

db.serialize(function () {
    db.run('DROP TABLE IF EXISTS recipes')
    db.run('DROP TABLE IF EXISTS ingredients')
    db.run('DROP TABLE IF EXISTS ingredient_recipes')
    db.run("CREATE TABLE recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT type UNIQUE, description TEXT, minutes_needed INTEGER)")
    db.run("CREATE TABLE ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)")
    db.run("CREATE TABLE ingredient_recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, ingredient_id INTEGER,recipe_id INTEGER,am_grams INTEGER, FOREIGN KEY(ingredient_id) REFERENCES ingredients(id),FOREIGN KEY(recipe_id) REFERENCES recipes(id))")
}); 

db.close();