const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made

    const newRecipe = {
      title: 'Spaghetti Carbonara',
      level: 'Amateur Chef',
      ingredients: ['spaghetti', 'pancetta', 'eggs', 'parmesan cheese', 'black pepper'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 30,
      creator: 'John Doe',
    };

    const recipe = await Recipe.create(newRecipe);
    console.log(recipe);

  // Iteration 3 : Insert multiple recipes / insertMany
  let allRecipes = await Recipe.insertMany(data);
  console.log(allRecipes);

  // Iteration 4 : Update recipe / findOneAndUpdate
    let updateRecipes = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duraton: 100});
    console.log(updateRecipes);

  // Iteration 5 : Remove a recipe / deleteOne
  let deleteRecipes = await Recipe.deleteOne({title: "carrotCake"});
    console.log(deleteRecipes);

  //Iteration 6 : Close the Database
  mongoose.disconnect()

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */

  
