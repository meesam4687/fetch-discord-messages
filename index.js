async function fetchAll(client, channelID) {
    if (!client || !channelID) throw new Error('Missing parameters');
    let channel = await client.channels.fetch(channelID);
    let lastMessageID;
    let messagesObject = {};
    await channel.messages.fetch({ limit: 1, cache: false })
        .then(messages => {
            lastMessageID = messages.last().id;
        })
        .catch(console.error);
    let breaker = 0;
    while (true) {
        if (breaker === 1) {
            break;
        }
        await channel.messages.fetch({ limit: 100, cache: false, before: lastMessageID })
            .then(messages => {
                let lastMsg = messages.last()
                if (lastMsg === undefined) {
                    breaker = 1;
                    return;
                }
                let obj = Object.fromEntries(messages);
                messagesObject = { ...messagesObject, ...obj };
                lastMessageID = messages.last().id;
            })
            .catch(console.error);
    }
    return messagesObject;
}

module.exports = { fetchAll };
