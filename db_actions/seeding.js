const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('recipes.sqlite');

db.serialize(() => {
    db.run("INSERT into recipes(name,description,minutes_needed) VALUES('Lasagne','Leckere hausgemachte Lasagne mit viel Käse.',60)")
    db.run("INSERT into ingredients(name) VALUES('Käse')")
    db.run("INSERT into ingredients(name) VALUES('Hackfleisch')")
    db.run("INSERT into ingredients(name) VALUES('Nudeln')")
    db.run("INSERT into ingredients(name) VALUES('Soße')")
    db.run("INSERT into ingredient_recipes(ingredient_id,recipe_id,am_grams) VALUES(1,1,500)")
    db.run("INSERT into ingredient_recipes(ingredient_id,recipe_id,am_grams) VALUES(2,1,1000)")
    db.run("INSERT into ingredient_recipes(ingredient_id,recipe_id,am_grams) VALUES(3,1,1000)")
    db.run("INSERT into ingredient_recipes(ingredient_id,recipe_id,am_grams) VALUES(4,1,700)")
})