const baseURL = "https://behappy-api.herokuapp.com";

const axios = require("axios").create({
    baseURL: baseURL
});

const api = require("axios").create({
    baseURL: baseURL
});

var token = undefined;

axios.get("/")
    .then(response => {
        console.log("API Status")
        console.log(response.data)
    })
    .catch(error => console.log(error.message));

axios.get("/what")
.then(response => {
    console.log("API What");
    console.log(response.data)    
})
.catch(error => {
    console.log("API What");
    console.log(error.message)
});

axios.get("/who")
.then(response => {
    console.log("API Who");
    console.log(response.data)
})
.catch(error => {
    console.log("API Who");
    console.log(error.message)
});

axios.get("/auth", {auth: {username: "testador", password: "secret"}})
.then(response => {
    console.log("API Auth");
    console.log(response.data)
    token = response.data.token;
})
.catch(error => {
    console.log("API Auth");
    console.log(error.message)
});

api.interceptors.request.use(async config => {
    if (token == undefined) {
        const response = await axios.get("/auth", {auth: {username: "testador", password: "secret"}});
        token = response.data.token;
    }
    config.headers.Authorization = token;
    return config;
});

api.get("/tasks", {headers: {Authorization: token}})
.then(response => {
    console.log("API Tasks by Token");
    console.log(response.data)
})
.catch(error => {
    console.log("API Tasks by Token");
    console.log(error.message)
});
