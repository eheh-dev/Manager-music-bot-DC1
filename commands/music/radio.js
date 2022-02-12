//const { QueryType } = require('discord-player');
const IceParser = require('../../IceParser');
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: 'radio',
    aliases: ['r'],
    utilisation: '{prefix}play [URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid URL ${message.author}... try again ? ❌`);

        /*const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });*/


            //await player.deleteQueue(message.guild.id);
        //message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
 
        
        
        await message.channel.send(`Loading your ${args} radio station ... 🎧`);

        //res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        //if (!queue.playing) await queue.play();
        const player = createAudioPlayer()
        let server = client.guilds.cache.values().next().value;
        console.log(`[Info]`, `Server: ${server.name} (${server.id})`);
    
        // target channel
        let channel = client.channels.cache.get("918992474117128232");
        const channel2 = client.channels.cache.get("757004209701912587");
        console.log(`[Info]`, `Channel: ${channel.name} (${channel.id})`);
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        
        // connect to channel
        try {

            // start ice parser
            let radio = new IceParser(String(args));
            console.log(`[Info]`, `Awaiting data...`);

            // apply title data
            radio.on('title', title => {
            console.log(`[Info]`, `Now playing: ${title}`);
            client.editStatus("online", { name: title, type: 2 })
            });

            // play stream data
            radio.on('stream', stream => {
            // start stream and set volume
            const connection = stream.channel.join();
            connection.playFile(stream, { inlineVolume: true });
            connection.setVolume(100 / 100);
            });

            // warn user if stream does not support icecast
            radio.on('empty', () => {
            console.log(`[Warning]`, `Stream does not support Icecast. Stream title will not be shown.`);

            client.user.setStatus("online")
            client.user.setActivity('🎧 Radio 24h/7d', { type: 'LISTENING' });
            resource = createAudioResource(String(args), { inlineVolume: true });
            resource.volume.setVolume(100 / 100);
            player.play(resource);
            connection.subscribe(player);
            
            });

            // display errors
        }
        catch (error) {
            console.log("err");
            console.log(error);
        }

    },
};