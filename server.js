require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

app.post('/api/discord-webhook', async (req, res) => {
    try {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            return res.status(500).json({
                error: 'Discord webhook is not configured'
            });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            console.error('Discord webhook error:', response.status);
            return res.status(502).json({
                error: 'Failed to send Discord webhook'
            });
        }

        res.json({ success: true });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
});

app.post('/api/discord-webhook', async (req, res) => {
    try {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            return res.status(500).json({ error: 'Webhook غير مضبوط' });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            return res.status(502).json({ error: 'فشل إرسال الرسالة إلى Discord' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});