import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  icon: { type: String },
  features: [{ 
    title: { type: String },
    description: { type: String },
    icon: { type: String }
  }],
  process: [{
    step: { type: Number },
    title: { type: String },
    description: { type: String }
  }],
  technologies: [{ type: String }],
  pricing: {
    basic: { name: String, price: String, features: [String] },
    standard: { name: String, price: String, features: [String] },
    premium: { name: String, price: String, features: [String] }
  },
  faq: [{
    question: { type: String },
    answer: { type: String }
  }],
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
