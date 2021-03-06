const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {
    Schema,
} = mongoose;

const fields = {
    projectname: {
        type: String,
        required: true,
    }, entitystatus: {
        type: String,
        enum: ['active', 'deleted'],
        default: ['active']
    }, user_id: {
        type: String,
        required: true,
    }
};

const project = new Schema(fields, {
    useNewUrlParser: true,
    timestamps: true,
});

module.exports = mongoose.model('project', project);
