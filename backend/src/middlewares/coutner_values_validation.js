module.exports = counterValueValidation = (req, res, next) => {
    const counterId = req.body.counter_id;
    if (!counterId){
        return res.status(422).json({message: "counter_id field is required"})
    }

    const registryTime = req.body.registry_time;
    if (!registryTime) {
        return  res.status(422).json({message: "registry_time field is required"})
    }

    const value = req.body.value;
    if (!value) {
        return  res.status(422).json({message: "value field is required"})
    }

    next();
};
