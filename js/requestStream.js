function requestStream(rsClient) {
  console.log('Executing function requestStream');
  $('h2').text('Stream');
  rsClient.demoStream();

  $('.results').empty();

  for (var i = 0; i < 20; i++) {
    $('.results').append('<li class="list-group-item">Item ' + i + '</li>')
  }
}

module.exports = requestStream;
