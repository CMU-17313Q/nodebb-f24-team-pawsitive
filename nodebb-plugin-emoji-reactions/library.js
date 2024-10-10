'use strict';

const db = require.main.require('./src/database');
const user = require.main.require('./src/user');

const EmojiReactions = {};

EmojiReactions.init = function(params, callback) {
    const app = params.router;
    const middleware = params.middleware;

    // Route to handle adding a reaction
    app.post('/api/post/:postId/reaction', middleware.authenticate, async function(req, res) {
        const postId = req.params.postId;
        const reaction = req.body.reaction;
        const uid = req.user ? req.user.uid : 0;

        if (!reaction) {
            return res.status(400).json({ error: 'No reaction provided.' });
        }

        try {
            // Add the user's reaction to the post
            await db.setAdd(`post:${postId}:reactions:${reaction}`, uid);
            res.json({ success: true });
        } catch (error) {
            console.error('Error adding reaction:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    });

    // Route to handle fetching reactions
    app.get('/api/post/:postId/reactions', async function(req, res) {
        const postId = req.params.postId;

        try {
            const reactions = {};
            const emojis = ['👍', '❤️', '😂']; // Define your emojis here

            for (const emoji of emojis) {
                const count = await db.setCard(`post:${postId}:reactions:${emoji}`);
                reactions[emoji] = count || 0;
            }

            res.json({ success: true, reactions: reactions });
        } catch (error) {
            console.error('Error fetching reactions:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    });

    callback();
};

module.exports = EmojiReactions;
