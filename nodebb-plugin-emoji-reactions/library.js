// library.js

'use strict';

const db = require.main.require('./src/database');

const EmojiReactions = {};

EmojiReactions.init = function(params, callback) {
    const app = params.router;
    const middleware = params.middleware;

    console.log('Emoji Reactions plugin initialized.');

    // Route to handle adding a reaction
    app.post('/api/post/:postId/reaction', middleware.authenticate, async function(req, res) {
        const postId = req.params.postId;
        const reaction = req.body.reaction;
        const uid = req.user.uid;

        if (!reaction || !['👍', '❤️', '😂'].includes(reaction)) {
            return res.status(400).json({ error: 'Invalid reaction.' });
        }

        try {
            await db.setAdd(`post:${postId}:reactions:${reaction}`, uid);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Route to handle fetching reactions
    app.get('/api/post/:postId/reactions', async function(req, res) {
        const postId = req.params.postId;

        try {
            const reactions = {};
            const emojis = ['👍', '❤️', '😂'];
            for (const emoji of emojis) {
                const count = await db.setCard(`post:${postId}:reactions:${emoji}`);
                reactions[emoji] = count || 0;
            }
            res.json({ success: true, reactions: reactions });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    callback();
};

module.exports = EmojiReactions;
