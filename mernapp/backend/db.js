const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shyam23:vcpd2ivQhK2Na3s2@cluster0.qwxgsyu.mongodb.net/GoFood?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');

    const collection = mongoose.connection.db.collection('food_items');
    const data = await collection.find({}).toArray();

    const foodCategoryCollection = mongoose.connection.db.collection('food_category');
    const catData = await foodCategoryCollection.find({}).toArray();

    global.food_items = data;
    global.food_category = catData;
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = mongoDB;
