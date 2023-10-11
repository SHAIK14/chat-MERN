const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let User;

if (mongoose.models.User) {
  // Model already exists, use the existing one
  User = mongoose.model("User");
} else {
  // Model doesn't exist, define and compile it
  const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  });

  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  User = mongoose.model("User", userSchema);
}

module.exports = User;

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = mongoose.Schema(
//   {
//     name: { type: "String", required: true },
//     email: { type: "String", unique: true, required: true },
//     password: { type: "String", required: true },
//     pic: {
//       type: "String",

//       default:
//         "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
//     },
//     // isAdmin: {
//     //   type: Boolean,
//     //   required: true,
//     //   default: false,
//     // },
//   },
//   { timestaps: true }
// );

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
