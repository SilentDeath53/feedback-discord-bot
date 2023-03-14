import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.members = True

Bot = commands.Bot(command_prefix='!', intents=intents)

token = 'bot token'
feedbackChannelId = channel_id

@Bot.event
async def on_ready():
    print(f'Logged in as {Bot.user}')

@Bot.event
async def on_message(message):
    if message.author == Bot.user:
        return

    if message.channel.type == discord.ChannelType.private:
        feedbackChannel = Bot.get_channel(feedbackChannelId)
        feedbackEmbed = discord.Embed(
            title=f'Feedback from {message.author.name}#{message.author.discriminator}',
            description=message.content,
            color=discord.Color.blue(),
            timestamp=message.created_at
        )

        await feedbackChannel.send(embed=feedbackEmbed)

        replyEmbed= discord.Embed(
            title='Feedback Received',
            description='Thank you for your feedback! We have received it.',
            color=discord.Color.orange()
        )

        await message.author.send(embed=replyEmbed)

     

Bot.run(token)
