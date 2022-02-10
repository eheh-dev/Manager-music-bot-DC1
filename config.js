module.exports = {
    app: {
        px: '!mg',
        token: 'OTE5OTQwNjIwNDU2NDQzOTM1.YbdHdw.SxwqZsv4aQmKz4mCK-4bbN8AX0g',
        playing: 'by Zerio ❤️ for Eheh Team'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
