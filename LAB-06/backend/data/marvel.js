const axios = require('axios');
const md5 = require('blueimp-md5');

async function getById(
    id
){
    if(!id){throw "Error: Must provide id"}
    if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid id."}
    id = id.trim();

    const publickey = 'ea2626bef5e976588746879e9f825b73';
    const privatekey = 'b2c4664487c8d90ced569d23d02c6be532f6d6c4';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${id}`;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const { data } = await axios.get(url).then(response =>{ return response}).catch(error =>{ throw error.response.status;})
    const dataObj = data.data.results[0];
    return dataObj;
}

async function getAll(
    offset
){

    if(typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0){throw "Error: Offset must be an integer."}
    
    const publickey = 'ea2626bef5e976588746879e9f825b73';
    const privatekey = 'b2c4664487c8d90ced569d23d02c6be532f6d6c4';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/comics`;
    const url = baseUrl + '?offset='+ offset + '&limit=' + 50 +'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const { data } = await axios.get(url).then(response =>{ return response}).catch(error =>{ throw error.response.status;})
    const dataObj = data.data;
    return dataObj;
}

module.exports = {
    getById,
    getAll
}