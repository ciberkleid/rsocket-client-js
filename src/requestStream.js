function requestStream(rsClient) {
  console.log('Executing function requestStream');
  $('h2').text('Stream');

  $('.results').empty();

  let pending = 5;
  let subscription;

  $('.results').append('<p>Subscribing to ' + pending + ' stream elements (expected rate 1/second)</p>')
  //$('.results').append('<li class="list-group-item">Default Static Item</li>')

  rsClient.demoStream().subscribe({
    onComplete() {
      console.log('onComplete()');
    },
    onError(error) {
      console.log('onError(%s)', error.message);
    },
    onNext(payload) {
      console.log('onNext(%s)', payload.data.message);
      $('.results').append('<li class="list-group-item">' + payload.data.message + '</li>')
      if (--pending === 0) {
        console.log('cancel()');
        subscription.cancel();
        $('.results').append('<br><p>All requested elements received.</p>')
      }
    },
    onSubscribe(_subscription) {
      console.log('onSubscribe() - request(%s)', pending);
      subscription = _subscription;
      subscription.request(pending);
    },
  });

}

module.exports = requestStream;
