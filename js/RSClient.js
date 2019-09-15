const {
    RSocketClient,
    JsonSerializer,
    BufferEncoder,
    UTF8Encoder,
    }  = require('rsocket-core')
const RSocketWebSocketClient = require('rsocket-websocket-client').default;
const RoutingMetadataSerializer = require('./metadata').RoutingMetadataSerializer;

const CustomEncoders = {
    data: UTF8Encoder,
    dataMimeType: UTF8Encoder,
    message: UTF8Encoder,
    metadata: BufferEncoder,
    metadataMimeType: UTF8Encoder,
    resumeToken: UTF8Encoder,
};

const maxRSocketRequestN = 10

export class RSClient {

    //constructor(url, responder) {
    constructor(url) {
        this.client = new RSocketClient({
            serializers: {
                data: JsonSerializer,
                metadata: new RoutingMetadataSerializer(),
            },
            setup: {
                // ms btw sending keepalive to server
                keepAlive: 10000,
                // ms timeout if no keepalive response
                lifetime: 20000,
                dataMimeType: 'application/json',
                metadataMimeType: RoutingMetadataSerializer.MIME_TYPE,
            },
            transport: new RSocketWebSocketClient({url: url}, CustomEncoders),
            //responder: responder
        });
    }

    connect() {
        this.socket = this.client.connect();
    }

    demoFireAndForget() {
        console.log('In RSClient - demo Fire and Forget');
        this.socket.subscribe({
            onComplete: socket => {
                // socket provides the rsocket interactions fire/forget, request/response,
                // request/stream, etc as well as methods to close the socket.
                socket.fireAndForget({
                    data: {message: 'hello world - fnf'},
                    metadata: 'hello',
                });
            },
            onError: error => console.error(error),
            onSubscribe: cancel => {/* call cancel() to abort */}
        });
    }

    demoResponse() {
        console.log('In RSClient - demo Response');
        this.socket.subscribe({
            onComplete: socket => {
                console.log('In RSClient - demo Response in onComplete');
                socket.requestResponse({
                    data: {message: 'hello world - response'},
                    metadata: 'greet.jellyfish',
                });
                console.log('In RSClient - demo Response leaving onComplete');
            },
            onNext: value => console.log(value),
            onError: error => console.error(error),
            onSubscribe: cancel => {/* call cancel() to abort */}
        });
    }

    demoResponseX() {
        console.log('In RSClient - demo Response2');
        this.socket.requestResponse({
            data: {message: 'hello world - response'},
            metadata: 'greet.jellyfish'
        }).subscribe({
            onComplete: () => console.log('Request-Response2 completed'),
            onNext: value => console.log(value),
            onError: error => console.error(error),
            onSubscribe: sub => sub.request(1),
        });
    }

    demoStream() {
        console.log("demoStream function is not yet implemented")
    }

    demoChannel() {
        console.log("demoChannel function is not yet implemented")
    }
    // demoStream() {
    //     this.socket.subscribe({
    //         onComplete: (socket: any) => {
    //             socket.requestStream({
    //                 data: {message: 'hello world - stream'},
    //                 metadata: 'greet-stream',
    //             });
    //         },
    //         //onComplete: () => console.log('done'),
    //         onError: error => console.error(error),
    //         onNext: value => console.log(value),
    //         // Nothing happens until `request(n)` is called
    //         onSubscribe: sub => sub.request(4),
    //     });
    //
    //     this.socket.subscribe({
    //         onComplete: socket => {
    //             socket
    //                 .requestStream({
    //                     data: {message: 'hello world - stream'},
    //                     metadata: 'greet-stream',
    //                 })
    //                 .subscribe({
    //                     onComplete: () => console.log('Request-stream completed'),
    //                     onError: error =>
    //                         console.error('Request-stream error:${error.message}'),
    //                     onNext: value => console.log('%s', value.data),
    //                     onSubscribe: sub => sub.request(maxRSocketRequestN),
    //                 });
    //         },
    //         onError: error => console.error(error),
    //     });
    //
    // }

    // connect(callback) {
    //     this.client.connect().subscribe({
    //         onComplete: s => {
    //             this.socket = s;
    //             callback();
    //         },
    //         onError: error => console.error(error),
    //         onSubscribe: cancel => { this.cancel = cancel}
    //     });
    // }

    disconnect() {
        this.cancel();
    }

}