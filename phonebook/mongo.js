const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}
const generateId = () => {
  const k = Math.floor(Math.random() * 1000000000);
  return k;
};

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const id = generateId();
const url = `mongodb+srv://rhushabhbontapallee:${password}@cluster0.gtq4hc8.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: name,
  number: number,
  id: id,
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log('Person saved!');
    mongoose.connection.close();
  });
}
