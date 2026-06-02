import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  shortBio: { type: String },
  image: { type: String },
  email: { type: String },
  phone: { type: String },
  social: {
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    website: { type: String }
  },
  skills: [{ 
    name: { type: String },
    level: { type: Number, min: 0, max: 100 }
  }],
  education: [{
    degree: { type: String },
    institution: { type: String },
    year: { type: String }
  }],
  experience: [{
    position: { type: String },
    company: { type: String },
    duration: { type: String }
  }],
  awards: [{
    title: { type: String },
    year: { type: String }
  }],
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
