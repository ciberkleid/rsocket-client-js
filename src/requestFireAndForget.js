function requestFireAndForget(rsClient) {
  console.log('Executing function requestFireAndForget');
  $('h2').text('Fire and Forget');

  $('.results').empty();
  $('.results').append('<p>No response expected for Fire and Forget message.</p>')

  rsClient.demoFireAndForget();

}

module.exports = requestFireAndForget;
