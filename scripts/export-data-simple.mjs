// Simple script to export MongoDB data
// Run: node scripts/export-data-simple.mjs

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection string - update this with your actual connection string
const MONGODB_URI = 'mongodb+srv://codeverse_admin:admin123@cluster0.vmmpnoj.mongodb.net/codeverse?retryWrites=true&w=majority';

// Define schemas inline
const ProjectSchema = new mongoose.Schema({}, { strict: false });
const ServiceSchema = new mongoose.Schema({}, { strict: false });
const BlogSchema = new mongoose.Schema({}, { strict: false });
const TestimonialSchema = new mongoose.Schema({}, { strict: false });
const TeamMemberSchema = new mongoose.Schema({}, { strict: false });

async function exportData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const exportDir = path.join(__dirname, 'mongodb-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Export Projects
    console.log('Exporting Projects...');
    const Project = mongoose.model('Project', ProjectSchema);
    const projects = await Project.find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'projects.json'),
      JSON.stringify(projects, null, 2)
    );
    console.log(`✅ Exported ${projects.length} projects`);

    // Export Services
    console.log('Exporting Services...');
    const Service = mongoose.model('Service', ServiceSchema);
    const services = await Service.find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'services.json'),
      JSON.stringify(services, null, 2)
    );
    console.log(`✅ Exported ${services.length} services`);

    // Export Blog Posts
    console.log('Exporting Blog Posts...');
    const Blog = mongoose.model('Blog', BlogSchema);
    const blogs = await Blog.find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'blogs.json'),
      JSON.stringify(blogs, null, 2)
    );
    console.log(`✅ Exported ${blogs.length} blog posts`);

    // Export Testimonials
    console.log('Exporting Testimonials...');
    const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
    const testimonials = await Testimonial.find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'testimonials.json'),
      JSON.stringify(testimonials, null, 2)
    );
    console.log(`✅ Exported ${testimonials.length} testimonials`);

    // Export Team Members
    console.log('Exporting Team Members...');
    const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
    const team = await TeamMember.find({}).lean();
    fs.writeFileSync(
      path.join(exportDir, 'team.json'),
      JSON.stringify(team, null, 2)
    );
    console.log(`✅ Exported ${team.length} team members`);

    console.log(`\n✅✅✅ All data exported successfully to: ${exportDir}`);
    console.log('\nExported files:');
    console.log(`  - projects.json (${projects.length} items)`);
    console.log(`  - services.json (${services.length} items)`);
    console.log(`  - blogs.json (${blogs.length} items)`);
    console.log(`  - testimonials.json (${testimonials.length} items)`);
    console.log(`  - team.json (${team.length} items)`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

exportData();
