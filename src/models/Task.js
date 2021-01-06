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
    }
});

module.exports = model('Task',TaskSchema);