import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message1: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact; // ✅ Make sure you're exporting it
``
