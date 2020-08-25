module.exports.signInValidation = signInValidation = (req, res, next) => {
    const email = req.body.email;
    if (!email){
        return res.status(422).json({message: "email field is required"})
    }

    const password = req.body.password;
    if (!password) {
        return  res.status(422).json({message: "password field is required"})
    }

    next();
};

module.exports.signUpValidation = signUpValidation = (req, res, next) => {
    const name = req.body.email;
    if (!name){
        return res.status(422).json({message: "name field is required"})
    }

    const email = req.body.email;
    if (!email){
        return res.status(422).json({message: "email field is required"})
    }

    const password = req.body.password;
    if (!password) {
        return res.status(422).json({message: "password field is required"})
    }

    const number = req.body.phone_number;
    if (!number) {
        return res.status(422).json({message: "phone_number field is required"})
    }

    next();
};