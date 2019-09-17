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

    connect(callback) {
        return this.client.connect().subscribe({
            onComplete: s => {
                // socket provides the rsocket interactions fire/forget, request/response,
                // request/stream, etc as well as methods to close the socket.
                this.socket = s;
                callback();
            },
            onError: error => console.error(error),
            onSubscribe: cancel => { this.cancel = cancel}
        });
    }

    demoFireAndForget() {
        console.log('In RSClient - demo Fire and Forget');
        return this.socket.fireAndForget({
            data: {message: 'hello world - fnf'},
            metadata: 'hello',
        });
    }

    demoResponse() {
        console.log('In RSClient - demo Response')
        return this.socket.requestStream({
            data: {message: 'hello world - response'},
            metadata: 'greet-json.jellyfish',
        });
    }

    demoStream() {
        console.log("In RSClient - demo Stream")
        return this.socket.requestStream({
            data: {message: 'hello world - stream'},
            metadata: 'greet-stream-json',
        });
    }

    demoChannel() {
        console.log("In RSClient - demo Channel")
        console.log("demoChannel function is not yet implemented")
    }

    disconnect() {
        this.cancel();
    }

}