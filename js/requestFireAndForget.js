function requestFireAndForget(rsClient) {
  console.log('Executing function requestFireAndForget');
  $('h2').text('Fire and Forget');
  rsClient.demoFireAndForget();
}

module.exports = requestFireAndForget;
