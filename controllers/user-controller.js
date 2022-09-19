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
            const id = user.id;
            const userType = user.userType;
            req.session.user = { id, userType };
            // console.log(req.session.user);
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

const userLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect('/users/signin');
    });
}
exports.userLogout = userLogout;

const userUpdate = async (req, res, next) => {
    const updateId = await User.findById(req.body.userid)
    res.render('edit', { updateId });
    // console.log(updateId);
}
exports.userUpdate = userUpdate;

const findUpdate = async (req, res, next) => {


    const id = req.params.uid;
    await User.findByIdAndUpdate(id, { $set: req.body });
    //const user = new User(req.body);


    res.redirect('/users/admin');
}
exports.findUpdate = findUpdate;