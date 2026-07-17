import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({

  donationNumber: {
    type: String,
    unique: true
  },

  // Donor Identity
  name: String,
  email: {
    type: String,
    required: true,
    index: true
  },

  // Donation Details
  amount: {
    type: Number,
    required: true
  },

  donationType: {
    type: String,
    enum: ["payment", "subscription"],
    required: true
  },

  currency: {
    type: String,
    default: "usd"
  },
  paypalOrderId: {
    type: String,
    unique: true,
    sparse: true
  },

  stripeSessionId: {
    type: String,
    unique: true,
    sparse: true
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  paymentStatus: String,
  address: {
    type: String,
    default: "N/A"
  },

  message: String,
  
  paymentProvider: {
    type: String,
    enum: ["stripe", "paypal"],
    required: true
  },

  source: {
    type: String,
    default: "website"
  },

  emailSequenceStage: {
    type: Number,
    default: 1
  },
  immediateEmailSent: {
    type: Boolean,
    default: false
  },

  donationDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Donation", donationSchema);
