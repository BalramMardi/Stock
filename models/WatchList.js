import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("watchlists", watchlistSchema);
