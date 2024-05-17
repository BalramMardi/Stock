import UserModel from "../models/UserModel.js";
import WatchList from "../models/WatchList.js";

export const addStockController = async (req, res) => {
  try {
    const { symbol, userId } = req.body;
    if (!symbol) {
      return res.send({ message: "symbol is required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.send({ message: "user is not registered" });
    }

    /* //check user
    const existingStock = await WatchList.findOne({ symbol });
    const existingUser = await UserModel.findById(req.user._id);

    
    //existing user
    if (existingStock && existingUser) {
      return res.status(200).send({
        success: false,
        message: "already have the symbol",
      });
    } */

    //save
    const stockSymbol = await new WatchList({
      symbol,
      userId,
    }).save();

    res.status(201).send({
      success: true,
      message: "New Symbol stored",
      stockSymbol,
    });
  } catch (error) {
    console.log(`WatchlistCONTROLLER ERROR ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in adding symbol",
      error,
    });
  }
};

export const getAllStock = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all stocks for the user
    const stocks = await WatchList.find({ userId });

    res.status(200).send({
      success: true,
      message: "All stock symbol of user",
      stocks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/* export const deleteStock = async (req, res) => {
  const { stockId } = req.params;
  const user = await UserModel.findById(req.user._id);
  try {
    // Find the stock by stockId
    const stock = await WatchList.findById(stockId);

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    console.log(stock.userId);
    console.log(user._id);

    // Check if the stock belongs to the requesting user
    if (String(stock.userId) !== String(user._id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this stock" });
    }

    // Delete the stock entry from the database
    await WatchList.findByIdAndDelete(stockId);

    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}; */

export const deleteStock = async (req, res) => {
  const { symbol } = req.params;
  const user = await UserModel.findById(req.user._id);
  try {
    const stock = await WatchList.findOne({ symbol, userId: user._id });

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    if (String(stock.userId) !== String(user._id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this stock" });
    }

    await WatchList.findByIdAndDelete(stock._id);

    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
