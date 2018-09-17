"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

const rate = require('./usd_brl_rate');
const quiz = require('./quiz');
const faq = require('./faq');
const boulos = require('./boulos.js');

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
  appId: process.env['MicrosoftAppId'],
  appPassword: process.env['MicrosoftAppPassword'],
  openIdMetadata: process.env['BotOpenIdMetadata']
});

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));

if (!useEmulator) {
  var tableName = 'botdata';
  var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
  var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
  bot.set('storage', tableStorage);
}

bot.dialog('/', function (session) {
  var msg = session.message.text;
  // Add a new condition to add functionality to the bot.
  if(msg.includes('show rate')) {
    rate.get_rate(function(value){
      session.send(value);
    });
  } else if (msg.includes('questionario')) {
    session.send(quiz.get_quiz());
  } else if (msg.includes('faq')) {
    session.send(faq.get_faq());
  } else if (toLowerCase(msg).includes('vai boulos')) {
	session.send(boulos.vaiBoulos());
  } else {
    // Don't know what to do
  }
});

if (useEmulator) {
  var restify = require('restify');
  var server = restify.createServer();
  server.listen(3978, function() {
      console.log('test bot endpoint at http://localhost:3978/api/messages');
  });
  server.post('/api/messages', connector.listen());
} else {
  module.exports = connector.listen();
}
