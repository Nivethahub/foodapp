import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

// CREATE FOOD
export const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            restaurantID,
            rating,
        } = req.body;

        if (!title || !description || !price || !restaurantID) {
            return res.status(500).json({
                message: "Please Provide all fields",
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            restaurantID,
            rating,
        });

        await newFood.save();
        return res.status(201).json({
            message: "New Food Item Created",
        });
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};

// GET ALLL FOODS
export const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return res.status(404).json({
                message: "no food items was found",
            });
        }
        return res.status(200).json({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};

// GET SINGLE FOOD
export const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.foodID;
        if (!foodId) {
            return res.status(404).json({
                message: "please provide id",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({
                message: "No Food Found with this id",
            });
        }
        return res.status(200).json({
            food
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// GET FOOD BY RESTAURANT
export const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantID;
        if (!restaurantId) {
            return res.status(404).json({
                message: "please provide id",
            });
        }
        const food = await foodModel.find({ restaurantID: restaurantId });
        if (!food) {
            return res.status(404).json({
                message: "No Food Found with this id",
            });
        }
        return res.status(200).json({
            message: "food based on restaurant",
        });
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};

// UPDATE FOOD ITEm
export const updateFoodController = async (req, res) => {
    try {
        const foodID = req.params.foodID;
        if (!foodID) {
            return res.status(404).json({
                message: "no food id was found",
            });
        }
        const food = await foodModel.findById(foodID);
        if (!food) {
            return res.status(404).json({
                message: "No Food Found",
            });
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            restaurantID,
            rating,
        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodID,
            {
                title,
                description,
                price,
                imageUrl,
                foodTags,
                catgeory,
                code,
                isAvailabe,
                restaurantID,
                rating,
            },
            { new: true }
        );
        return res.status(200).json({
            message: "Food Item Was Updated"
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// DELETE FOOD
export const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.foodID;
        if (!foodId) {
            return res.status(404).json({
                message: "provide food id"
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({
                message: "No Food Found with id"
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({
            message: "Food Item Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// PLACE ORDER
export const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).json({
                message: "please food cart or payemnt method",
            });
        }
        let total = 0;
        //cal
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        });
        await newOrder.save();
        return res.status(201).json({
            message: "Order Placed successfully",
            newOrder,
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// CHANGE ORDER STATUS
export const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.orderID;
        if (!orderId) {
            return res.status(404).json({
                message: "Please Provide valid order id",
            });
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        return res.status(200).json({
            message: "Order Status Updated",
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

