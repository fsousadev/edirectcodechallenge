const Entity = require('./model');
const Task = require('../tasks/model');

exports.list = function (req, res) {
    const { decoded } = req;
    const { id } = decoded;
    Entity.find({
        user_id: id, entitystatus: 'active'
    }).lean().exec(async function (err, entities) {
        if (err)
            res.send(err);

        let promises = entities.map((entity) => {
            return new Promise(resolve => {
                Task.find({ project_id: entity._id, entitystatus: 'active' }, function (taskserror, tasks) {
                    if (taskserror)
                        res.send(taskserror);
                    entity.tasks = tasks;
                    resolve(entity);
                });
            })
        });
        const result = await Promise.all(promises);
        res.json(result);
    });
};




exports.create = function (req, res, next) {
    const { decoded } = req;
    const { id } = decoded;
    req.body.user_id = id;
    var new_entity = new Entity(req.body);
    new_entity.save(function (err, entity) {
        if (err)
            res.send(err);
        res.json(entity);
    });
};

exports.update = function (req, res) {
    const { decoded } = req;
    const { id } = decoded;
    Entity.findById(req.params.id, function (err, entity) {
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
        }
    });
};

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

exports.validate = function (req, res, next) {
    if (!req.body || !req.body.projectname) {
        res.status(400);
        res.json({
            success: false,
            message: "Bad fields"
        });
    } else
        next();
};