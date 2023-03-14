const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'], partials: ['CHANNEL'] });

const token = 'bot token';
const feedbackChannelId = 'channel_id';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') {
        const feedbackChannel = client.channels.cache.get(feedbackChannelId);
        const feedbackEmbed = new Discord.MessageEmbed()
            .setTitle(`Feedback from ${message.author.tag}`)
            .setDescription(message.content)
            .setColor('#3498db')
            .setTimestamp(message.createdAt);

        await feedbackChannel.send({ embeds: [feedbackEmbed] });

        const replyEmbed = new Discord.MessageEmbed()
            .setTitle('Feedback Received')
            .setDescription('Thank you for your feedback! We have received it.')
            .setColor('#f39c12');

        await message.author.send({ embeds: [replyEmbed] });
}
});

client.login(token);
