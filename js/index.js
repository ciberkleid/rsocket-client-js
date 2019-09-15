const home = require('./home.js');
const requestFireAndForget = require('./requestFireAndForget.js');
const requestResponse = require('./requestResponse.js');
const requestStream = require('./requestStream.js');
const requestChannel = require('./requestChannel.js');
const RSClient = require('./RSClient').RSClient;

// window.onload = function init() {
//     var requestHandler = new RequestHandler();
//     requestHandler.demoFireAndForget();
// };

const url = 'ws://rsocket-server.apps.clearlake.cf-app.com/';
const requestHandler = new RequestHandler(url);
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
        this.rsClient.connect();
    }

    // demoFnF() {
    //     this.rsClient.demoFireAndForget();
    // }

    // demoFnF() {
    //     this.rsClient.demoFireAndForget();
    //
    //     socket.fireAndForget({
    //                          data: {message: 'hello world'},
    //                          metadata: 'hello',
    //                      });
    //
    //
    //     return this.client.connect().subscribe({
    //         onComplete: s => {
    //             this.socket = s;
    //             cb();
    //         },
    //         onError: error => console.error(error),
    //         onSubscribe: cancel => { this.cancel = cancel}
    //     });
    //
    // }

    // demoResponse() {
    //     this.rsClient.demoResponse();
    // }
    //
    // connectCallback() {
    //     console.log('Current page is ' + this.dataset.page);
    //     this.rsClient.demoFireAndForget().subscribe({
    //         onError: error => console.error(error),
    //         onNext: msg => {
    //             console.log('Got onNext for demoFireAndForget')
    //         },
    //         onComplete: msg => {
    //             console.log('Got onComplete for demoFireAndForget')
    //         },
    //         onSubscribe: msg => {
    //             console.log('Got onSubscribe for demoFireAndForget')
    //         },
    //     });
    // }
}

// class ResponseHandler {
//     constructor() {
//         console.log('In ResponseHandler - new handler');
//     }
//     fireAndForget(payload) {
//         console.log("ResponseHandler received fireAndForget payload: [" + payload.data + "]");
//     }
// }