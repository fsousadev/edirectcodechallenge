const Entity = require('./model');
const Project = require('../projects/model');




exports.create = function (req, res, next) {
    const { decoded } = req;
    const { id } = decoded;

    Project.findById(req.body.project_id, function (err, entity) {
        if (entity != null) {
            if (entity.user_id != id) {
                res.status(401);
                res.json({
                    success: false,
                    message: "Unauthorized"
                });
            } else {
                var new_entity = new Entity(req.body);
                new_entity.save(function (err, entity) {
                    if (err)
                        res.send(err);
                    res.json(entity);
                });
            }
        } else {
            res.status(401);
            res.json({
                success: false,
                message: "Unauthorized"
            });
        }
    }).catch((error) => {
        next(new Error(error));
    });
}



exports.update = function (req, res) {
    const { decoded } = req;
    const { id } = decoded;

    Project.findById(req.body.project_id, function (err, entity) {
        if (err)
            res.send(err);
        if (entity.user_id != id) {
            res.status(401);
            res.json({
                success: false,
                message: "Unauthorized"
            });
        } else {
            Entity.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, entity) {
                if (err)
                    res.send(err);
                res.json(entity);
            });
        };
    });
};

exports.validate = function (req, res, next) {
    if (!req.body || !req.body.description) {
        res.status(400);
        res.json({
            success: false,
            message: "Bad fields"
        });
    } else
        next();
};

//exports.list = function (req, res) {
//    const { decoded } = req;
//    const { id } = decoded;
//    Entity.find({
//        user_id: id, entitystatus: 'active'
//    }, function (err, entity) {
//        if (err)
//            res.send(err);
//        res.json(entity);
//    });
//};

//exports.read = function (req, res) {
//    Entity.findById(req.params.id, function (err, entity) {
//        if (err)
//            res.send(err);
//        res.json(entity);
//    });
//};

//exports.delete = function (req, res) {
//    Entity.remove({
//        _id: req.params.id
//    }, function (err, entity) {
//        if (err)
//            res.send(err);
//        res.json({ message: 'Entity successfully deleted' });
//    });
//};