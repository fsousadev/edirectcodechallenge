const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {
    Schema,
} = mongoose;

const fields = {
    description: {
        type: String,
        required: true,
    }, startdate: {
        type: Date,
    }, enddate: {
        type: Date,
    }, status: {
        type: String,
        enum: ['todo', 'done'],
        default: ['todo']
    }, entitystatus: {
        type: String,
        enum: ['active', 'deleted'],
        default: ['active']
    }, project_id: {
        type: String,
        required: true,
    }
};

const project = new Schema(fields, {
    useNewUrlParser: true,
    timestamps: true,
});

module.exports = mongoose.model('task', project);
