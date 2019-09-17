function requestResponse(rsClient) {
  console.log('Executing function requestResponse');
  $('h2').text('Request Response');

  $('.results').empty();

  rsClient.demoResponse().subscribe({
    onComplete() {
      console.log('onComplete()');
    },
    onError(error) {
      console.log('onError(%s)', error.message);
    },
    onNext(payload) {
      console.log('onNext(%s)', payload.data.message);
      $('.results').append('<p>Response:</p>')
      $('.results').append('<p>' + payload.data.message + '</p>')
    },
    onSubscribe(subscription) {
      console.log('onSubscribe() - request(1)');
      subscription.request(1);
    },
  });

}

module.exports = requestResponse;