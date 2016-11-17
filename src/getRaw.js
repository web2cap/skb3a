import fetch from 'isomorphic-fetch';

export default async function getRaw(url='https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json'){
  const response = await fetch(url);
  const jdata = await response.json();
  return jdata;
};


//
