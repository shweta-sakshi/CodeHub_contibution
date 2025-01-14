/**
 * @module clientControllers
 * @desc Contains controllers for handling client-related operations.
 * All controllers require client session to be valid.
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//Universally Unique Identifier(UUID) is a 128-bit number used to uniquely identify information.
const { randomUUID } = require("crypto");

const EducationCategories = require("../model/educationCategoryModel");
const Feedback = require("../model/feedbackModel");
const Notices = require("../model/noticeModel");
const Users = require("../model/userModel");
const Videos = require("../model/videoModel");
const ClientSessions = require("../model/clientSessionModel");

/**
 * @desc Fetches all education categories
 */
module.exports.educationCategories = async (req, res, next) => {
    try {
        //check if the session is valid.
        const { decoded, body: { cfID } } = req;
        const { cookieID } = decoded;

        const session = await ClientSessions.findOne({ cookieID });

        if (!session || cookieID !== session.cookieID) {
            return res.status(401).json({ status: false, msg: "Session expired or invalid" });
        }

        //fetch all education categories.
        const educationCategories = await EducationCategories.find();

        //return the fetched data.
        return res.json({ status: true, data: educationCategories });

    } catch (error) {
        //handle error.
        next(error);
    }
};

/**
 * @desc Fetches all videos for a given category.
 */
module.exports.videos = async (req, res, next) => {
    try {
        const cookie = req.decoded;
        const cfID = req.body.cfID;

        //check if the session is valid.
        const cookieID = cookie.cookieID;
        const session = await ClientSessions.findOne({cfID: cfID});
        if (cookieID == session.cookieID) {
            const {categoryID} = req.body;

            //fetch all videos for the given category.
            const videos = await Videos.find({categoryID: categoryID});

            //return the fetched data.
            return res.json({status: true, data: videos});
        } else{
            return res.json({status: false, msg: "Session expired"});
        }

    }
    catch (ex) {
        //handle error.
        next(ex);
    }
};

/**
 * @desc Fetches all users in the leaderboard with their codeforces ID.
 */
module.exports.leaderboard = async (req, res, next) => {
    try {
        const {decoded}= req;
        const {cookieID}= decoded;

        //check if the session is valid.
        const session = await ClientSessions.findOne({cookieID});
        if (!session || cookieID !== session.cookieID) {
            return res.status(401).json({ status: false, msg: "Session expired or invalid" });
        }

        //fetch all users with their codeforces ID.
        const cfID = await Users.find().select(["cfID"]);
        //return the fetched data.
        return res.json({ status: true, data: cfID });
    }
    catch (error) {
        //handle error.
        next(error);
    }

};

/**
 * @desc Registers a new user using their codeforces ID and password.
 */
module.exports.register = async (req, res, next) => {
    try {
        const { cfID, password } = req.body;

        //check if user already exist with the given cfID.
        const cfIDCheck = await Users.findOne({ cfID: cfID });
        if (cfIDCheck) return res.json({ status: false, msg: "User already exist" });

        //hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user.
        const user = await Users.create({ cfID: cfID, password: hashedPassword });

        //delete the password from the response for security reasons.
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
};

/**
 * @desc Logs in a user using their codeforces ID and password.
 */
module.exports.login = async (req, res, next) => {
    try {
        //verify the user.
        const { cfID, password } = req.body;
        const user = await Users.findOne({ cfID: cfID });
        if (!user) return res.json({ status: false, msg: "Incorrect ID or Password" });

        //check if the password is correct.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ status: false, msg: "Incorrect Username or Password" });

        //create a new session for the client and delete the previous one.
        const cookieID = randomUUID();
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (session)
            await ClientSessions.deleteOne({ cfID: cfID });
        await ClientSessions.create({ cfID: cfID, cookieID: cookieID });

        //create a new cookie for the client.
        const cookie = jwt.sign(
            { "cookieID": cookieID },
            process.env.COOKIE_SECRET_KEY,
            { expiresIn: "1d" }
        );

        //send the cookie to the client.
        res.cookie("jwt", cookie, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ status: true, data: { cfID: user.cfID } });
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @desc create a new feedback.
 */
module.exports.contactUs = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        const cfID = req.body.cfID;

        //verify the cookie and get the cookieID from it if valid.
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );

        //check if the session is valid.
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (cookieID == session.cookieID) {
            //create a new feedback.
            const { name, email, message } = req.body;
            await Feedback.create({ name: name, email: email, messsage: message });

            //return the response.
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
 * @desc Fetches all notices created by the admin.
 */
module.exports.noticeboard = async (req, res, next) => {
    try {
        //fetch all notices.
        const notices = await Notices.find();

        //return the fetched data.
        return res.json({ status: true, data: notices });
    }
    catch (ex) {
        //handle error.
        next(ex);
    }

};

/**
 * @desc Logs out the user by deleting the session.
 */
module.exports.logout = async (req, res, next) => {
    try {
        //check if the cfID is provided.
        if (!req.params.cfID)
            return res.status(400).json({ status: false, msg: "User cfID is required" });

        const cfID = req.params.cfID;

        //delete the session if exists.
        const session = await ClientSessions.findOne({ cfID: cfID });
        if (session)
            await ClientSessions.remove({ cfID: cfID });

        return res.json({ status: true, msg: "Logged out" });

    } catch (ex) {

        //handle error.
        next(ex);
    }

};
