const signupPage = (req, res, next) => {
    res.render('signup');
}
exports.signupPage = signupPage;

const signup = (req, res, next) => {
    res.send(req.body);
}
exports.signup = signup;