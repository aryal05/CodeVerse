import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  category: { type: String, required: true },
  image: { type: String },
  gallery: [{ type: String }],
  technologies: [{ type: String }],
  client: { type: String },
  duration: { type: String },
  link: { type: String },
  github: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['completed', 'in-progress', 'planning'], default: 'completed' },
  order: { type: Number, default: 0 },
  metaTitle: { type: String },
  metaDescription: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
