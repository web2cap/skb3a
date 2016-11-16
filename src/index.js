import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import bodyParser from 'body-parser';

import saveDataInDb from './saveDataInDb';
import Pet from './models/Pet';
import User from './models/User';
import isAdmin from './middlewares/isAdmin';

mongoose.Promise = Promise;
mongoose.connect('mongodb://public.mgbeta.ru/pkoshelev_skb3');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(isAdmin);

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});

app.get('/clear', isAdmin, async (req, res) => {
  await User.remove({});
  await Pet.remove({});
  return res.send('DB Clear!');
});

app.post('/data', async (req, res) => {
  const data = req.body;
  if(!data.user) return res.status(400).send('user required');
  if(!data.pets) data.pets = [];

  const user = await User.findOne({
    name: data.user.name,
  });
  if(user) return res.status(400).send('user.name is exists');

  try {
  //console.log(rdata);
    const result = await saveDataInDb(data);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});




/*
const data = {
  user: {
    name: 'p1',
  },
  pets: [
    {
      name: 'DjonDir',
      type: 'cat',
    },
    {
      name: 'Dogo',
      type: 'dog',
    },
  ],
};
//console.log(data);
saveDataInDb(data);

const Pet = mongoose.model('Pet',{
  type: String,
  name: String,
});
const kitty = new Pet({
  name: 'Jandarm',
  type: 'cat',
});

kitty.save()
  .then(() => {
    console.log('success');
  })
  .catch(() =>{
    console.log('err');
  })

*/
