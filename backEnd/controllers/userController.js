const VerificationSchema = require("../models/emailVerificationSchema");
const followersSchema = require("../models/followersSchema");
const userSchema = require("../models/userSchema");
const sendVerificationEmail = require("../util/sendmail");
const { comparePassword, createJWT } = require("../util/index");

const OTPVerification = async (req, res, next) => {
  try {
    const { userId, otp } = req.params;

    const result = await VerificationSchema.findOne({ userId });

    if (!result) {
      return res.status(404).json({ message: "the otp or user invalid" });
    }

    const { expiredAt, token } = result;

    //check if the token has expired
    if (expiredAt < Date.now()) {
      await VerificationSchema.findOneAndDelete({ userId });

      res.status(404).json({ message: "Verification token has expired" });
    } else {
      const isMatch = await comparePassword(otp, token);

      if (isMatch) {
        await Promise.all([
          userSchema.findOneAndUpdate({ _id: userId }, { emailVerified: true }),
          VerificationSchema.findOneAndDelete({ userId }),
        ]);

        const user = await userSchema.findOneAndUpdate({ _id: userId });
        res.status(200).json({ user, message: "Email verified successfully" });
      } else {
        return res
          .status(404)
          .json({ message: "Verification failed or OTP is invalid" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something went wrong" });
  }
};

const resentOTP = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await VerificationSchema.findOneAndDelete({ userId });

    const user = await userSchema.findById(userId);

    user.password = undefined;

    const token = createJWT(user?._id);

    await sendVerificationEmail(user, res, token);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const followWriter = async (req, res, next) => {
  try {
    const followerId = req.body.user.userId;
    const { id } = req.params;

    const checks = await followersSchema.findOne({ followerId });

    if (checks) {
      return res.status(201).json({
        success: false,
        message: "You are already following this writer",
      });
    }
    const writer = await userSchema.findById(id);

    const newFollower = await followersSchema.create({
      followerId,
      writerId: id,
    });

    writer.followers.push(newFollower._id);

    await userSchema.findByIdAndUpdate(id, writer, { new: true });

    res.status(201).json({
      success: true,
      message: "You are now following this writer " + writer.name,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const updateWriter = async (req, res, next) => {
  try {
    const { firstName, lastName, image } = req.body;

    if (!(firstName || lastName)) {
      return next("Please provide all required field");
    }

    const { userId } = req.body.user;

    const updateUser = {
      name: firstName + " " + lastName,
      image,
      _id: userId,
    };

    const user = await userSchema.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    const token = createJWT(user._id);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getWriter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userSchema.findById(id).populate({
      path: "followers",
      select: "followerId",
    });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  OTPVerification,
  followWriter,
  getWriter,
  resentOTP,
  updateWriter,
};
