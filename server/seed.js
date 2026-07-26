const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin account already exists. Skipping seed.');
      process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
    });

    console.log('Admin account created successfully.');
    console.log('Email: admin@example.com');
    console.log('Password: Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();

