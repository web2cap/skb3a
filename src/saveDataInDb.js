import Pet from './models/Pet';
import User from './models/User';



export default async function saveDataInDb(data){
  try{
    const user = new User(data.user);
    //console.log(data.user);
    await user.save();

    const promises = data.pets.map((pet) => {
        //console.log(pet);
        const petData = Object.assign({},pet, {
          owner: user._id, //eslint-disable-line
        });

        return (new Pet(petData)).save();
    });
    //console.log('success');
    return {
      user,
      pets: await Promise.all(promises),
    };
  } catch (err) {
    console.log('error',err);
    throw err;
  }
}
