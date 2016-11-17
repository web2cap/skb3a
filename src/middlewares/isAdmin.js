

export default async (req,res,next) => {

    jdata = await getRaw();
    if(jdata){
      return next();
    }
    return next('Error get json middleware');
};
