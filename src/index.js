const { SERVER_URL } = require('./config.js');
const home = require('./home.js');
const requestFireAndForget = require('./requestFireAndForget.js');
const requestResponse = require('./requestResponse.js');
const requestStream = require('./requestStream.js');
const requestChannel = require('./requestChannel.js');
const RSClient = require('./RSClient').RSClient;

// window.onload = function init() {
//     var requestHandler = new RequestHandler();
//     ...
// };

console.log('Server URL is ' + SERVER_URL);
const requestHandler = new RequestHandler(SERVER_URL);
const pageFunctions = {};

$(function() {
    registerPage('home', home);
    registerPage('requestFireAndForget', requestFireAndForget);
    registerPage('requestResponse', requestResponse);
    registerPage('requestStream', requestStream);
    registerPage('requestChannel', requestChannel);
    showPage('home');
});

function registerPage(name, pageFunction) {
    console.log('Registering page=' + name +', function=[' + pageFunction + ']');
    pageFunctions[name] = pageFunction;
}

$('.page-link').click(function(event) {
    event.preventDefault();
    const name = this.dataset.page;
    $('.active').removeClass('active');
    this.classList.add('active');
    showPage(name);
});

function showPage(name) {
    $('.page').hide();
    $('.' + name + '-page').show();
    console.log('Calling function for page=' + name);
    pageFunctions[name](requestHandler.rsClient);
}

class RequestHandler {
    constructor(url) {
        //this.demoClient = new RSClient(url, new ResponseHandler());
        //this.rsClient.connect(() => this.connectCallback());
        this.rsClient = new RSClient(url);
        this.rsClient.connect(() => this.connectCallback());
    }

    connectCallback() {
        console.log('In connectCallback: connection established');
    }
}

// class ResponseHandler {
//     constructor() {
//         console.log('In ResponseHandler - new handler');
//     }
//     fireAndForget(payload) {
//         console.log("ResponseHandler received fireAndForget payload: [" + payload.data + "]");
//     }
// }