const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Lead = require('../models/Lead');

dotenv.config({ path: require('path').join(__dirname, '..', '.env') });

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('FATAL ERROR: MONGO_URI is not defined in environment variables');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Seed admin user
    const adminExists = await User.findOne({ email: 'admin@leaddesk.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@leaddesk.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@leaddesk.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Seed sample leads
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      const sampleLeads = [
        { name: 'John Smith', email: 'john@example.com', phone: '+1-555-0101', company: 'Tech Corp', message: 'Interested in your CRM solution', status: 'new' },
        { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1-555-0102', company: 'Marketing Pro', message: 'Looking for lead management', status: 'contacted' },
        { name: 'Mike Brown', email: 'mike@example.com', phone: '+1-555-0103', company: 'Sales Inc', message: 'Need demo', status: 'qualified' },
        { name: 'Emily Davis', email: 'emily@example.com', phone: '+1-555-0104', company: 'Startup Hub', message: 'Pricing inquiry', status: 'proposal' },
        { name: 'Alex Wilson', email: 'alex@example.com', phone: '+1-555-0105', company: 'Digital Agency', message: 'Ready to purchase', status: 'closed' },
        { name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1-555-0106', company: 'Consulting Group', message: 'Not interested at this time', status: 'lost' },
        { name: 'David Taylor', email: 'david@example.com', phone: '+1-555-0107', company: 'Finance Plus', message: 'Please send more info', status: 'new' },
        { name: 'Rachel Green', email: 'rachel@example.com', phone: '+1-555-0108', company: 'Green Solutions', message: 'Interested in partnership', status: 'contacted' },
      ];
      await Lead.insertMany(sampleLeads);
      console.log(`${sampleLeads.length} sample leads created`);
    } else {
      console.log(`${leadCount} leads already exist`);
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedData();

