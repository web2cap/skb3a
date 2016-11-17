
export  default  (req,res,next) => {
  try{
    const url = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
    const response = await fetch(url);
    //const jdata =
    jdata = await response.json();
  } catch(err){
      return next(err);
  }
  if(jdata){
    return next();
  }
  return next('Error get json middleware');

};
