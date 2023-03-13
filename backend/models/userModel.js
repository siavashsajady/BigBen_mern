import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define a user schema with required fields for name, email, password, and isAdmin
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // Include a timestamp for when the user document is created or updated
    timestamps: true,
  }
);

// Define a method on the user schema for checking if a password matches the stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Define a pre-hook on the user schema for hashing the password before saving it to the database
userSchema.pre('save', async function (next) {
  // If the password hasn't been modified, skip this step
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt to use in the password hash
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Create a user model using the user schema
const User = mongoose.model('User', userSchema);

export default User;
