/**
 * @module adminControllers
 * @description: This module is used to define the controllers for the admin related operations.
 */
const EducationCategories = require("../model/educationCategoryModel");
const Feedback = require("../model/feedbackModel");
const Notices = require("../model/noticeModel");
const Videos = require("../model/videoModel");
const AdminSessions = require("../model/adminSessionModel");

/**
 * @description: login the admin user and create a session if the user is valid.
 * @requires username
 * @requires password
 */
module.exports.adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        //check if user exists.
        const user = await Admins.findOne({ username: username });
        if (!user) return res.json({ status: false, msg: "Incorrect Username or Password" });

        //check if password is valid.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ status: false, msg: "Incorrect Username or Password" });

        //create a new session for admin and delete previous session if exists.
        const cookieID = randomUUID();
        const session = await AdminSessions.findOne({ username: username });
        if (session)
            await AdminSessions.remove({ username: username });
        await AdminSessions.create({ username: username, cookieID: cookieID });

        //create a cookie for the session.
        const cookie = jwt.sign(
            { "cookieID": cookieID },
            process.env.COOKIE_SECRET_KEY,
            { expiresIn: "1d" }
        );

        //send the cookie to the admin.
        res.cookie("jwt", cookie, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ status: true, data: { username: user.username } });
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

//controllers require a valid admin session.

/**
 * @description: get all the notices.
 */
module.exports.notice = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username }); //
        if (cookieID == session.cookieID) {

            //get all the notices and return to the admin.
            const notices = await Notices.find();
            return res.json({ status: true, data: notices });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: delete a notice.
 * @requires noticeID
 */
module.exports.noticeDelete = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { noticeID } = req.body;

            // find and delete the notice if exists.
            const notice = await Notices.find({ _id: noticeID });
            if (!notice) return res.json({ status: false, msg: "Notice doesn't exist" });
            await Notices.remove({ _id: noticeID });

            return res.json({ status: true });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: create a notice if session is valid.
 * @requires title - title of the notice.
 * @requires body - body of the notice.
 */
module.exports.noticeCreate = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.

        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { title, body } = req.body;

            //check if notice title already exists, it should be unique.
            const notice = await Notices.find({ title: title });
            if (notice) return res.json({ status: false, msg: "Notice title already exist" });

            //create a new notice.
            await Notices.create({ title: title, body: body });

            return res.json({ status: true });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: get all the education categories.
 */
module.exports.educationCategories = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            //get all the education categories.
            const educationCategories = await EducationCategories.find();

            return res.json({ status: true, data: educationCategories });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: delete an education category.
 * @requires educationID.
 */
module.exports.educationDelete = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { educationID } = req.body;

            //find and delete the education category if exists.
            const educationCategory = await EducationCategories.find({ _id: educationID });
            if (!educationCategory) return res.json({ status: false, msg: "Education Category doesn't exist" });
            await EducationCategories.remove({ _id: educationCategory });

            return res.json({ status: true });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        next(ex);
    }

};

/**
 * @description: create an education category.
 * @requires title - title of the education category.
 */
module.exports.educationCreate = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { title } = req.body;

            //check if education category title already exists.
            const educationCategory = await EducationCategories.find({ title: title });
            if (educationCategory) return res.json({ status: false, msg: "Education Category title already exist" });

            //create a new education category.
            await EducationCategories.create({ title: title });
            return res.json({ status: true });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: get all the videos from the database.
 */
module.exports.videos = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {

            //get all the videos.
            const videos = await Videos.find();
            return res.json({ status: true, data: videos });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        // handle error.
        next(ex);
    }

};

/**
 * @description: delete a video.
 * @requires videoID.
 */
module.exports.videoDelete = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { videoID } = req.body;

            //find and delete the video if exists.
            const video = await Videos.find({ _id: videoID });
            if (!video) return res.json({ status: false, msg: "Video doesn't exist" });
            await Videos.remove({ _id: videoID });

            return res.json({ status: true });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        next(ex);
    }

};

/**
 * @description: create a video.
 * @requires title - title of the video.
 * @requires ytLink - youtube link of the video.
 * @requires category - category of the video.   //not mentioned in the code.
 */
module.exports.videoCreate = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { title, ytLink } = req.body;

            //check if video already exists.
            const video = await Videos.find({ $or: [{ title: title }, { ytLink: ytLink }] });
            if (video) return res.json({ status: false, msg: "Video already exist" });

            //create a new video.
            await Videos.create({ title: title });
            return res.json({ status: true });
        }
        else {
            return res.json({status: false, msg: "Session expired"});
        }
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: get all the feedbacks of the users.
 */
module.exports.feedback = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;

        //verify the cookie.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if admin session is valid.
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            //get all the feedbacks.
            const feedback = await Feedback.find();
            return res.json({ status: true, data: feedback });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @description: Admin logout.
 */
module.exports.adminLogout = async (req, res, next) => {
    try {
        //check if username is provided.
        if (!req.params.username)
            return res.status(400).json({ status: false, msg: "Username is required" });
        const username = req.params.username;

        //delete the session if exists.
        const session = await AdminSessions.findOne({ username: username });
        if (session)
            await AdminSessions.remove({ username: username });

        return res.json({ status: true, msg: "Logged out" });
    } catch (ex) {

        //handle error.
        next(ex);
    }

};
