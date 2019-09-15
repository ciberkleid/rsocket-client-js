function requestChannel(rsClient)  {
  console.log('Executing function requestChannel');
  $('h2').text('Channel');
  rsClient.demoChannel();
}

module.exports = requestChannel;
