const { model,Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        min: 6,
        max: 16
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        min: 6,
        max: 16
    },
});

UserSchema.methods.encrypt_password = async (text)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text,salt);
}

module.exports = model('User',UserSchema);