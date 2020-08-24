module.exports = addressValidation = (req, res, next) => {
    const address = req.body.email;
    if (!address){
        return res.status(422).json({message: "address field is required"})
    }

    const apartments = req.body.password;
    if (!apartments) {
        return res.status(422).json({message: "apartments field is required"})
    }

    const fias = req.body.password;
    if (!fias) {
        return res.status(422).json({message: "fias field is required"})
    }

    next();
};
