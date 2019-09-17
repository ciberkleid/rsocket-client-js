function requestChannel(rsClient)  {
  console.log('Executing function requestChannel');
  $('h2').text('Channel');

  $('.results').empty();
  $('.results').append('<p>Request Channel is not yet implemented in rsocket-js.</p>')

  rsClient.demoChannel();

}

module.exports = requestChannel;
