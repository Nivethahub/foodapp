import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import restaurantModel from "../models/restaurantModel.js";

// CREATE FOOD
export const createFoodController = async (req, res) => {
    try {
        const {
            foodName,
            description,
            foodPrice,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            restaurantID,
            rating,
            processTime
        } = req.body;

        if (!foodName || !description || !foodPrice || !restaurantID) {
            return res.status(500).json({
                message: "Please Provide all fields",
            });
        }
        const checkrestaDetails = await restaurantModel.findOne({ _id: restaurantID, code: code })
        if (!checkrestaDetails) {
            return res.status(404).json({ message: "Restaturant data not found" })
        }
        const newFood = new foodModel({
            foodName,
            description,
            foodPrice,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            restaurantID,
            rating,
            processTime
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
            foodName,
            description,
            foodPrice,
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
                foodName,
                description,
                foodPrice,
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
        const { cart, userID } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({
                message: "Please provide a valid food cart.",
            });
        }

        if (!userID) {
            return res.status(400).json({
                message: "Please provide a valid user ID.",
            });
        }
        // const checkorder = await orderModel.find({buyer:userID})
        // if(checkorder){

        // }
        //         let total = 0;
        //         let foodsArray = [];

        //         // Calculate total price and construct foods array
        //         for (const item of cart) {
        //             const restaurantData = await restaurantModel.findById(item.RestaurantID);
        //             if (!restaurantData) {
        //                 return res.status(404).json({ message: `Restaurant with ID ${item.RestaurantID} not found.` });
        //             }

        //             const foodData = await foodModel.findOne({
        //                 _id: item.foodID,
        //                 isAvailabe: true,
        //                 restaurantID: item.RestaurantID,
        //             });

        //             if (!foodData) {
        //                 return res.status(404).json({ message: `Food item with ID ${item.foodID} not found.` });
        //             }

        //             const price = Number(foodData.foodPrice);
        //             if (isNaN(price) || price <= 0) {
        //                 return res.status(400).json({ message: `Invalid price for food item with ID ${item.foodID}.` });
        //             }

        //             const quantity = Number(item.quantity);
        //             if (isNaN(quantity) || quantity <= 0) {
        //                 return res.status(400).json({ message: `Invalid quantity for food item with ID ${item.foodID}.` });
        //             }

        //             total += price * quantity;
        //             console.log('total: ', total);

        //             let orderBoolean;
        //             if (restaurantData.isorderTaken === true && foodData.OrderTaken === true) {
        //                 orderBoolean = true;
        //             } else {
        //                 orderBoolean = false;
        //             }

        //             // Construct food item entry
        //             foodsArray.push({
        //                 foodID: item.foodID,
        //                 RestaurantID: item.RestaurantID,
        //                 TakenByrestaurant: orderBoolean,
        //             });
        //         }

        //         // Create a new order
        //         const newOrder = new orderModel({
        //             foods: foodsArray,
        //             payment: total,
        //             buyer: userID,
        //         });

        //         // Save the order to the database
        //         await newOrder.save();

        //         // Return success response
        //         return res.status(201).json({
        //             message: "Order placed successfully",
        //             newOrder,
        //         });

        const restaurantOrders = new Map();

        for (const item of cart) {
            const restaurantData = await restaurantModel.findById(item.RestaurantID);
            if (!restaurantData) {
                return res.status(404).json({ message: `Restaurant with ID ${item.RestaurantID} not found.` });
            }

            const foodData = await foodModel.findOne({
                _id: item.foodID,
                isAvailabe: true,
                restaurantID: item.RestaurantID,
            });

            if (!foodData) {
                return res.status(404).json({ message: `Food item with ID ${item.foodID} not found.` });
            }

            const price = Number(foodData.foodPrice);
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ message: `Invalid price for food item with ID ${item.foodID}.` });
            }

            const quantity = Number(item.quantity);
            if (isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({ message: `Invalid quantity for food item with ID ${item.foodID}.` });
            }

            let orderBoolean = restaurantData.isorderTaken === true && foodData.OrderTaken === true;

            // Add to respective restaurant group
            if (!restaurantOrders.has(item.RestaurantID)) {
                restaurantOrders.set(item.RestaurantID, {
                    foods: [],
                    total: 0,
                });
            }

            const orderData = restaurantOrders.get(item.RestaurantID);
            orderData.foods.push({
                foodID: item.foodID,
                quantity: item.quantity,
                RestaurantID: item.RestaurantID,
                TakenByrestaurant: orderBoolean,
            });
            orderData.total += price * quantity;
        }

        // Create separate orders for each restaurant
        const createdOrders = [];
        for (const [restaurantID, { foods, total }] of restaurantOrders.entries()) {
            const newOrder = new orderModel({
                foods,
                payment: total,
                buyer: userID,
                DeliverTime: "10 mins",
                OrderedTime: Date.now(),
                isDelivered: false,
                status: "Preparing",
            });

            await newOrder.save();
            createdOrders.push(newOrder);
        }

        return res.status(201).json({
            message: "Orders placed successfully",
            orders: createdOrders,
        });

    } catch (error) {
        console.error('Error placing order:', error); // Log the full error for debugging

        // Return error response
        return res.status(500).json({
            message: "An error occurred while placing the order.",
            error: error.message, // Send only the error message for security reasons
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
let currentTime
async function checktime(orderID) {
    try {

        currentTime = Date.now()
        const orderData = await orderModel.findOne({ _id: orderID })
        if (!orderData) {
            console.error(`Order with ID ${orderID} not found`);
            return;
        }
        const deliver_time = orderData.DeliverTime
        const data = orderData.foods
        for (const i of data) {
            const fooddata = await foodModel.findById(i.foodID);

            const restaurantdata = await restaurantModel.findById(i.RestaurantID)
            const restatime = parseInt(restaurantdata.OrderacceptTiming);
            const foodprocesstime = parseInt(fooddata.processTime);
            const delivertime = parseInt(deliver_time)
            const restaAdditional = restatime * 60 * 1000;
            console.log('restaAdditional: ', restaAdditional);
            const foodAdditional = foodprocesstime * 60 * 1000;
            console.log('foodAdditional: ', foodAdditional);
            const deliverAdditional = delivertime * 60 * 1000;
            console.log('deliverAdditional: ', deliverAdditional);
            const foodReadytime = restaAdditional + (i.quantity * foodAdditional)
            console.log('foodReadytime: ', foodReadytime);
            if (currentTime == foodReadytime) {
                orderData.isReady = true
                await orderData.save()
            }
            // const checkReadystatus = 
            const finaltime = foodReadytime + deliverAdditional
            console.log('finaltime: ', finaltime);
            // Corrected time calculation
            orderData.estimatedDeliveryTime = orderData.OrderedTime + finaltime;
            // Updating order status based on estimated delivery time
            if (orderData.isReady == true && currentTime === orderData.estimatedDeliveryTime) {
                // orderData.isReady = true
                orderData.isDelivered = true
                orderData.status = "Delivered";
                await orderData.save()
            } else if (currentTime > orderData.estimatedDeliveryTime) {
                orderData.isDelivered = false
                orderData.status = "Delay";
                await orderData.save()
            }

            // Save updated order status
            await orderData.save();
        }
    } catch (error) {

        // Return error response
        return res.status(500).json({
            error: error.message,
        });
    }
    setTimeout(() => checktime(orderID), 1000);
}

export const checkStatusofOrder = async (req, res) => {
    try {
        const { orderID } = req.body
        console.log('req.body: ', req.body);
        const orderData = await orderModel.findOne({ _id: orderID })
        console.log('orderData: ', orderData);
        if (!orderData) {
            return res.status(404).json({
                message: "Order not found"
            })
        } else {
            currentTime = Date.now()
            console.log('currentTime: ', currentTime);
            checktime(orderID)
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}
