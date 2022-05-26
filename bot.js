#! /usr/bin/env node

const mf = require('mineflayer');
const readline = require('readline');
const fs = require('fs');
const cmd = require('mineflayer-cmd').plugin;

//	Param init

const rawJson = fs.readFileSync("config.json");
const config = JSON.parse(rawJson);

// Init cmd interface and bot

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const bot = mf.createBot({
	host: config.server.address,
	port: config.server.port,
	username: config.user.username
});

//	Bot chat management

bot.on('chat', (username, message) => {
	if (username === bot.username) return;
	
	//	Log message
	console.log(username + ": " + message);

	//	Matches one of the keywords for sleeping
	if(config.keyword.sleep.find(elmt => message.search(elmt) != -1)){
		bot.chat(config.message.sleep);
		bot.quit();
		process.exit();
		return;
	}

	//	Answer if name was mentionned
	if(config.keyword.name.find(elmt => message.search(elmt) != -1)){
		bot.chat(config.message.afk);
	}
});

bot.on('login', () => {
	console.log("Connected !");
	bot.chat(config.message.online);
});

rl.on("line", input =>{
	if(input == "?quit"){
		bot.quit();
		process.exit(1);
		return;
  }

  if(input == "?reg"){
    cmd.allowConsoleInput = true
    bot.loadPlugin(cmd)
		bot.chat("/register test12345 test12345");
		return;
}

if(input == "?l"){
    cmd.allowConsoleInput = true
    bot.loadPlugin(cmd)
		bot.chat("/login test12345");
		return;
              }

	bot.chat(input);
});