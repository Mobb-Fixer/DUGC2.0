const { sendCookie } = require("../helpers/cookieHandler");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../middlewares/errorHandler.js");
const Randomstring = require("randomstring");
const nodemailer = require("nodemailer");


const registerController = async (req, res, next) => {
  try {
    let { username, email, password, role } = req.body;
    // username = username.trim();
    // email = email.trim();
    // password = password.trim();
    // role = role.trim();

    if (username == "" || email == "" || password == "" || role == "") {
      return next(new ErrorHandler("Empty Input Fields", 404));
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return next(new ErrorHandler("Invalid email entered", 404));
    } else if (password.length < 8) {
      return next(new ErrorHandler("Password too short", 404));
    } else {
      let user = await userModel.findOne({ email });

      if (user) {
        return next(
          new ErrorHandler("User with the provided email already exists", 404)
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await userModel.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      res.status(201).json({
        success: true,
        message:
          "Registered Successfully! Please verify your email using the link sent to your inbox",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
      return next(new ErrorHandler("Empty Credentials Supplied!", 404));
    }

    let allUsers = await userModel.find();
    //console.log(allUsers);

    let user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    }

    const adminData = Object.assign({}, user.toObject());
    delete adminData.password;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "414vpu2alwynfernandes@gmail.com",
        pass: "xhpiiamkxmarjbhu",
      },
    });

    const info = await transporter.sendMail({
      from: "414vpu2alwynfernandes@gmail.com",
      to: email, // Replace with the recipient's email address
      subject: "Login detected",
      text: "Login detected, if it was not you, please change password",
    });

    console.log("Message sent: " + info.messageId);

    sendCookie(adminData, res, "Welcome back", 201);
  } catch (error) {
    console.log(error);
  }
};

const sendResetController = async (req, res, next) => {
  try {
    const { email } = req.body;
console.log(email)
    const isUserExist = await userModel.findOne({ email: email });
    if (!isUserExist) {
      return next(new ErrorHandler("User doesn't exist!", 400));
    }
    console.log(isUserExist);

    const randomString = Randomstring.generate();
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + 60 * 60 * 1000); // Expire link in 1 hour

    isUserExist.token = {
      tokenId: randomString,
      expiresAt,
    };

    await isUserExist.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "414vpu2alwynfernandes@gmail.com",
        pass: "xhpiiamkxmarjbhu",
      },
    });

    const info = await transporter.sendMail({
      from: "414vpu2alwynfernandes@gmail.com",
      to: email, // Replace with the recipient's email address
      subject: "Password Change Request",
      text: `Password request token: ${randomString}. Click on this link to change password: http://localhost:4200/loginMain`,
    });

    console.log("Message sent: " + info.messageId);

    res.status(200).send({
      success: true,
      message: "Please check your inbox for mail and reset your password.",
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, email, password, confirmpassword } = req.body;
    const userWithToken = await userModel.findOne({
      "token.tokenId": token,
    });

    if (!userWithToken) {
      res.status(400).send({
        success: false,
        message: "User does not exist or invalid link. Try again",
      });
      return;
    }

    if (userWithToken.token.expiresAt < new Date()) {
      res
        .status(400)
        .send({ success: false, message: "This link has expired" });
      return;
    }

    const newPassword = await bcrypt.hash(password, 10);

    userWithToken.password = newPassword;
    userWithToken.token = {}; // Clear the token data

    const userData = await userWithToken.save();

    res.status(200).send({
      success: true,
      message: "User password has been reset",
      data: userData,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
  sendResetController,
  resetPassword,
};
