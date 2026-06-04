// Script to export MongoDB data to JSON files
// Run: node scripts/export-mongodb-data.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Import models
const Project = require('../src/models/Project').default || require('../src/models/Project');
const Service = require('../src/models/Service').default || require('../src/models/Service');
const Blog = require('../src/models/Blog').default || require('../src/models/Blog');
const Testimonial = require('../src/models/Testimonial').default || require('../src/models/Testimonial');
const TeamMember = require('../src/models/TeamMember').default || require('../src/models/TeamMember');

async function exportData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const exportDir = path.join(__dirname, 'mongodb-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Export Projects
    console.log('Exporting Projects...');
    const projects = await mongoose.model('Project').find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'projects.json'),
      JSON.stringify(projects, null, 2)
    );
    console.log(`✅ Exported ${projects.length} projects`);

    // Export Services
    console.log('Exporting Services...');
    const services = await mongoose.model('Service').find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'services.json'),
      JSON.stringify(services, null, 2)
    );
    console.log(`✅ Exported ${services.length} services`);

    // Export Blog Posts
    console.log('Exporting Blog Posts...');
    const blogs = await mongoose.model('Blog').find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'blogs.json'),
      JSON.stringify(blogs, null, 2)
    );
    console.log(`✅ Exported ${blogs.length} blog posts`);

    // Export Testimonials
    console.log('Exporting Testimonials...');
    const testimonials = await mongoose.model('Testimonial').find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'testimonials.json'),
      JSON.stringify(testimonials, null, 2)
    );
    console.log(`✅ Exported ${testimonials.length} testimonials`);

    // Export Team Members
    console.log('Exporting Team Members...');
    const team = await mongoose.model('TeamMember').find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'team.json'),
      JSON.stringify(team, null, 2)
    );
    console.log(`✅ Exported ${team.length} team members`);

    console.log(`\n✅ All data exported to: ${exportDir}`);
    console.log('\nNext steps:');
    console.log('1. Check the exported JSON files in scripts/mongodb-export/');
    console.log('2. Provide your Supabase credentials');
    console.log('3. Run the import script to migrate to Supabase');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

exportData();
