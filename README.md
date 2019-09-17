# rsocket-client-js

This is an RSocket JavaScript WebSocket client.
 
This demo works in tandem with [rsocket-server](https://github.com/ciberkleid/rsocket-server).
Please see the rsocket-server [README](https://github.com/ciberkleid/rsocket-server/blob/master/README.md) for instructions on running the demo.

To use this client app, first clone the repo:
```
git clone https://github.com/ciberkleid/rsocket-client-js.git
cd rsocket-client-js
```

Create a file called '.env' in the rsocket-client-js directory.
Add the line below to set SERVER_URL.
Update the value as appropriate.
Make sure to include the rsocket-server path-mapping (the final '/' in the example below).

SERVER_URL='ws://my-server.my-domain.com/'

Then run the following commands:

```
source config.sh
npm install
npm run build
```

Open `index.html` in a browser through your IDE (should default to using your IDE's built-in web server), or run



## Inspiration for this app was borrowed from:
- https://github.com/w3cj/basic-jquery-SPA 
- https://github.com/bclozel/spring-flights