const User = require("../models/user");
let message = '';

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

const userPage = async (req, res, next) => {
    //res.send(req.session.id)
    // const userDetails = await User.find({ email: req.session.email }, '-password');
    res.render('index');



}
exports.userPage = userPage;

const signPage = (req, res, next) => {

    res.render('signin', { message });
    message = "";
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
            req.session.user = { id: id, userType: userType };
            //req.session.id = id;
            //req.session.userType = userType;
            //console.log(req.session.user.id);
            if (user.userType === 'user') {
                res.redirect('/users/user')
            }
            else {
                res.redirect('/users/admin')
            }

        }

    } catch (error) {
        message = "invalid user"
        res.redirect('/users/signin')
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

const searchPage = async (req, res, next) => {
    let result = await User.find({ firstName: req.body.search });
    console.log(result)
    res.render('search', { result });
}
exports.searchPage = searchPage;

// const search = (req, res) => {
//     const result = '';
//     res.render('search', { result });
// }
// exports.search = search;