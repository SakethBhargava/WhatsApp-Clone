const express = require('express');
const mongoose = require('mongoose'); // <--- ADD THIS LINE
const ProcessedMessage = require('../models/message');
const router = express.Router();

/**
 * @route   POST /api/webhook
 * @desc    Process incoming WhatsApp webhook payloads
 */
router.post('/webhook', async (req, res) => {
    const payload = req.body;

    try {
        // Process new incoming messages
        if (payload.metaData?.entry?.[0]?.changes?.[0]?.value?.messages) {
            for (const message of payload.metaData.entry[0].changes[0].value.messages) {
                const contactInfo = payload.metaData.entry[0].changes[0].value.contacts?.[0];
                const fromApi = message.from === payload.metaData.entry[0].changes[0].value.metadata?.display_phone_number;

                const messageData = {
                    id: message.id,
                    wa_id: fromApi ? contactInfo?.wa_id : message.from,
                    name: contactInfo?.profile?.name,
                    text: message.text?.body || `Unsupported message type: ${message.type}`,
                    timestamp: new Date(parseInt(message.timestamp) * 1000),
                    from_me: fromApi,
                    status: fromApi ? 'sent' : 'read',
                    type: message.type,
                };
                
                await ProcessedMessage.findOneAndUpdate({ id: message.id }, messageData, { upsert: true, new: true, setDefaultsOnInsert: true });
            }
        }

        // Process status updates for outgoing messages
        if (payload.metaData?.entry?.[0]?.changes?.[0]?.value?.statuses) {
            for (const status of payload.metaData.entry[0].changes[0].value.statuses) {
                await ProcessedMessage.findOneAndUpdate(
                    { id: status.id },
                    { $set: { status: status.status } }
                );
            }
        }

        res.status(200).json({ success: true, message: 'Webhook processed' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

/**
 * @route   GET /api/messages
 * @desc    Get all messages, grouped into conversations
 */
router.get('/messages', async (req, res) => {
    try {
        const messages = await ProcessedMessage.find().sort({ timestamp: 'asc' });
        
        const conversations = messages.reduce((acc, msg) => {
            if (!acc[msg.wa_id]) {
                acc[msg.wa_id] = {
                    id: msg.wa_id,
                    name: msg.name || `User ${msg.wa_id.slice(-4)}`,
                    messages: [],
                };
            }
            acc[msg.wa_id].messages.push(msg);
            return acc;
        }, {});

        const conversationList = Object.values(conversations).map(convo => {
            const lastMessage = convo.messages[convo.messages.length - 1];
            return {
                id: convo.id,
                name: convo.name,
                lastMessage: lastMessage.text,
                timestamp: lastMessage.timestamp,
            };
        }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.status(200).json({
            success: true,
            conversations: conversationList,
            allMessages: conversations
        });

    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

/**
 * @route   POST /api/messages
 * @desc    Send a new message (for demo purposes)
 */
router.post('/messages', async (req, res) => {
    try {
        const { wa_id, text, name } = req.body;
        if (!wa_id || !text) {
            return res.status(400).json({ success: false, message: 'wa_id and text are required' });
        }

        const newMessage = new ProcessedMessage({
            id: `demo_${new mongoose.Types.ObjectId()}`,
            wa_id,
            name: name,
            text,
            timestamp: new Date(),
            from_me: true,
            status: 'sent',
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: newMessage });

    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
