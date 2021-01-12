const { model,Schema } = require('mongoose');

TaskSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: Number,
    }
});

module.exports = model('Task',TaskSchema);