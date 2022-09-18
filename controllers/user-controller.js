const User = require("../models/user");
const signupPage = (req, res, next) => {
    res.render('signup');
}

exports.signupPage = signupPage;

const signup = async (req, res, next) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save()

    } catch (error) {
        console.log(error)
    }
    console.log(user.toObject().password)
    res.redirect('/');
}
exports.signup = signup;

const adminPage = async (req, res, next) => {
    const users = await User.find({ userType: "user" }, '-password');
    res.render('admin', { users });
}
exports.adminPage = adminPage;

const userPage = (req, res, next) => {
    res.render('index');
}
exports.userPage = userPage;

const signPage = (req, res, next) => {
    res.render('signin');
}
exports.signPage = signPage;
const login = async (req, res, next) => {
    const { email, password } = req.body
    let user;
    try {
        user = await User.findOne({ email });
        if (email == user.email && password == user.password
        ) {
            if (user.userType === 'user') {
                res.redirect('/users/user')
            }
            else {
                res.redirect('/users/admin')
            }

        }

    } catch (error) {
        console.log(error)
    }


}
exports.login = login;

const userDelete = async (req, res, next) => {
    const userId = req.params.uid;


    try {
        await User.findByIdAndDelete(userId)
    } catch (error) {

    }

    res.redirect('/users/admin');
}
exports.userDelete = userDelete;
