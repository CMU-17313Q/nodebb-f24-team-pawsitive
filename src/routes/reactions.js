const db = require.main.require('./src/database');

module.exports = function (app) {
    app.post('/api/post/:postId/reaction', function (req, res) {
        const postId = req.params.postId;
        const reaction = req.body.reaction;
        const uid = req.user.uid;  // Ensure the user is logged in

        // Store the reaction in the database
        db.setAdd(`post:${postId}:reactions:${reaction}`, uid, function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            return res.json({ success: true });
        });
    });
};
