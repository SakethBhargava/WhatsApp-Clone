const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: { 
        type: String, 
        unique: true, 
        required: true 
    },
    wa_id: { 
        type: String, 
        required: true, 
        index: true 
    },
    name: { 
        type: String 
    },
    text: { 
        type: String 
    },
    timestamp: { 
        type: Date, 
        required: true,
        default: Date.now // <-- UPDATED
    },
    from_me: { 
        type: Boolean, 
        default: false 
    },
    status: { 
        type: String, 
        default: 'sent',
        enum: ['sent', 'delivered', 'read']
    },
    type: { 
        type: String, 
        default: 'text' 
    },
});

const ProcessedMessage = mongoose.model('ProcessedMessage', messageSchema);

module.exports = ProcessedMessage;