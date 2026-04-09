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

  // Stripe References
  stripeSessionId: {
    type: String,
    required: true,
    unique: true
  },
  // donorboxDonationId: String,
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  paymentStatus: String,

  // Donor Location
  address: {
  type: String,
  default: "N/A"
},

  // Optional donor note
  message: String,

  // Metadata for analytics
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
  

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Donation", donationSchema);
