const { comparePassword, createJWT, hashPassword } = require("../util");

const User = require("../models/userSchema");
const sendVerificationEmail = require("../util/sendmail");

const userSignup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      accountType,
      provider,
    } = req.body;

    // if (accountType === "writer" && !image) {
    //   return next("Please provide profile picture");
    // }

    //check if user mail is exists
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return next("Email is already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User({
      name: firstName + " " + lastName,
      email,
      password: !provider ? hashedPassword : "",
      image,
      accountType,
      provider,
    });

    const token = createJWT(user._id);

    try {
      await user.save();
      await sendVerificationEmail(user, res, token);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
    // res.status(201).json({
    //   success: true,
    //   message: "Account created successfully",
    //   user,
    //   token,
    // });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "email is not valid" });
  }
};

const googleSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, emailVerified } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      next("Email Address already exists!!");
    }

    const user = await User.create({
      name,
      email,
      image,
      provider: "Google",
      emailVerified,
    });

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next("please provide the user credentials");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
      return next("Invalid email or password");
    }

    //google account login

    if (user.provider === "Google" && !password) {
      const token = createJWT(user?._id);

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user,
        token,
      });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next("Invalid email or password");
    }

    //email verified
    if (!user?.emailVerified) {
      return next("Please verify your email address");
    }

    // user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Account login successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = { userSignup, googleSignup, login };
