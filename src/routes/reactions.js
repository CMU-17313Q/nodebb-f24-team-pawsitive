const db = require.main.require('./src/database');

module.exports = function(app) {
    app.post('/api/post/:postId/reaction', async function(req, res) {
        const postId = req.params.postId;
        const reaction = req.body.reaction;
        const uid = req.user ? req.user.uid : 0;

        if (uid === 0) {
            return res.status(403).json({ error: 'You must be logged in to react.' });
        }

        try {
            // Store the reaction in the database
            await db.setAdd(`post:${postId}:reactions:${reaction}`, uid);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
