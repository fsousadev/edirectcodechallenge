const Entity = require('./model');

exports.list = function (req, res) {
    Entity.find({}, function (err, entity) {
        if (err)
            res.send(err);
        res.json(entity);
    });
};


exports.create = function (req, res) {
    const { decoded } = req;
    const { id } = decoded;

    if (req.body.user_id != id) {
        res.status(401);
        res.json({
            success: false,
            message: "You cannot create for user " + id
        });
    } else {
        var new_entity = new Entity(req.body);
        new_entity.save(function (err, entity) {
            if (err)
                res.send(err);
            res.json(entity);
        });
    }
};


exports.read = function (req, res) {
    Entity.findById(req.params.id, function (err, entity) {
        if (err)
            res.send(err);
        res.json(entity);
    });
};


exports.update = function (req, res) {
    Entity.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, entity) {
        if (err)
            res.send(err);
        res.json(entity);
    });
};


exports.delete = function (req, res) {
    Entity.remove({
        _id: req.params.id
    }, function (err, entity) {
        if (err)
            res.send(err);
        res.json({ message: 'Entity successfully deleted' });
    });
};
