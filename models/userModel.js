const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User must enter thier name'],
            unique: true,
            maxlength: [20, 'user name should be smaller'],
            minlength: [2, 'user name should atleast have 2 characters']
        },
        email: {
            type: String,
            required: [true, 'please provide your email !'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'please provide a password !'],
            minlength: 8,
            // select false is used to not to select password when quering for user details.
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'please confirm your password'],
            validate: {
                // only on create and save
                validator: function (el) {
                    return el == this.password;
                },
                message: 'passwords are not the same !'
            },
        },
        duration: {
            type: Number,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    }

);

// 1) DOCUMENT MIDDLEWARE 
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
// Schema function to check password while loging
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;