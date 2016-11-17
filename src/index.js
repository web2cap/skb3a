import express from 'express';
import cors from 'cors';
//import mongoose from 'mongoose';
import Promise from 'bluebird';
import bodyParser from 'body-parser';

import getRaw from './getRaw';
//import saveDataInDb from './saveDataInDb';
//import Pet from './models/Pet';
//import User from './models/User';
//import isAdmin from './middlewares/isAdmin';

//mongoose.Promise = Promise;
//mongoose.connect('mongodb://public.mgbeta.ru/pkoshelev_skb3');

//import fetchRow from '.middlewares/fetchRow';


const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(isAdmin);
let jdata = {};
let volumes = {};
async function startJ(){
  jdata = await getRaw();
  //console.log('jdataS: ' + jdata);volume
  if(jdata['hdd']){
    let keyhdd = '';
    for(let hddi in jdata['hdd']){
      keyhdd = jdata['hdd'][hddi]['volume'];
      console.log(keyhdd);
      if(!volumes[keyhdd]){
        volumes[keyhdd] = 0;
      }
      volumes[keyhdd] = volumes[keyhdd] + jdata['hdd'][hddi]['size'];
      //console.log('0+ ' + volumes[keyhdd]);
    }
    //console.log();

    if(volumes){
      for(let voli in volumes){
        volumes[voli] = +volumes[voli] + 'B';
        console.log(volumes[voli]);
      }
      console.log(volumes);
      //jdata['volumes'] = volumes;
    }

  }
  return true;
}
startJ();

//console.log('jdata: ' + jdata);


app.get('*', async (req, res) => {
  let t = '';
  /*for(var key in jdata){
    t = t + 'Ключ: ' + key + ' значение: ' + jdata[key];
  }
  return res.send(t);
  */
  //return res.status(200).json(jdata['volumes']);
  console.log(req.url);
  const path = req.url.split('/');
  let rdata = null;
  if(path[0] == '' && path[1] == ''){
    rdata = jdata;
  }else {
    if(path[1] && path[2]){
      rdata = (jdata[path[1]][path[2]] || false);
    }else{
      if(path[1] && jdata[path[1]]){
        rdata = jdata[path[1]];
      }else{
        console.log(jdata[path[1]]);
        if(jdata[path[1]] === null){
          return res.status(200).send('null');
        }
        if(path[1] == 'volumes'){
          return res.status(200).json(volumes);
        }
        if(jdata[path[1]] === 0){
          return res.status(200).send('0');
        }
      }
    }
  }
  //return res.status(200).json(path);
  //let key = 'ram';
  if(rdata){
      return res.status(200).json(rdata);
  }
  return res.status(404).send('Not Found');


});
/*
app.get('/ram',  (req, res) => {

  return res.status(200).json(jdata.ram.vendor);
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
*/

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
