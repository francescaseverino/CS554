const axios = require('axios');
const md5 = require('blueimp-md5');
const { response } = require('express');

async function getById(
    id, endpoint
){
    if(!id){throw "Error: Must provide id"}
    if(!endpoint){throw "Error: Must provide endpoint"}
    if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid string."}
    if(typeof endpoint !== 'string' || endpoint.trim().length === 0){throw "Error: Must provide a valid string."}
    id = id.trim();
    endpoint = endpoint.trim();

    const publickey = 'ea2626bef5e976588746879e9f825b73';
    const privatekey = 'b2c4664487c8d90ced569d23d02c6be532f6d6c4';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/${endpoint}/${id}`;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const { data } = await axios.get(url).then(response =>{ return response}).catch(error =>{ throw error.response.status;})
    const dataObj = data.data.results[0];
    return dataObj;
}

module.exports = {
    getById
}