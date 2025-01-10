/**
 * This file is used to export all the auth and feedback controllers on the client side present in different modules at one place.
 */
const login = require("./auth/login");
const register = require("./auth/register");
const verifyEmail = require("./auth/verifyEmail")
const verifyCfID = require("./auth/verifyCfID")
const generateCfVerificationRequestToken = require("./auth/genrateCfVerificaitonToken")
const checkSession = require("./auth/checkSession")
const userFeedback = require("./userFeedBack");
const logout = require("./auth/logout");
const ForgetPassword = require("./auth/ForgetPassword");

module.exports = {
    login,
    register,
    verifyEmail,
    verifyCfID,
    generateCfVerificationRequestToken,
    checkSession,
    userFeedback,
    logout,
    ForgetPassword
};