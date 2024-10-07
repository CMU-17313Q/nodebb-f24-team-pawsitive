// src/routes/reactions.js

const db = require.main.require('./src/database');

module.exports = function (app) {
    // Handle adding a reaction
    app.post('/api/post/:postId/reaction', async function (req, res) {
        const postId = req.params.postId;
        const reaction = req.body.reaction;
        const uid = req.user ? req.user.uid : 0;

        if (uid === 0) {
            return res.status(403).json({ error: 'You must be logged in to react.' });
        }

        try {
            await db.setAdd(`post:${postId}:reactions:${reaction}`, uid);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Handle fetching reactions
    app.get('/api/post/:postId/reactions', async function (req, res) {
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
};
