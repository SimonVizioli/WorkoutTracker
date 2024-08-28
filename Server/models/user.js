import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
    const exist = await this.findOne({ email });

    //Validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    if (exist) {
        throw Error("Email alredy in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
};

//Static login method

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    //Validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    if (!user) {
        throw Error("Incorrect Email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

export default mongoose.model("User", userSchema);
