import restaurantModel from "../models/restaurantModel";
// CREATE RESTURANT
export const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        // validation
        if (!title || !coords) {
            return res.status(500).json({
                message: "please provide title and address"
            });
        }
        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newRestaurant.save();

        return res.status(201).json({
            message: "New Restaurant Created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// GET ALL RESTURNAT
export const getAllRestaurantController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        if (!restaurants) {
            return res.status(404).json({
                message: "No Restaurant Availible",
            });
        }
        return res.status(200).json({
            success: true,
            totalCount: restaurants.length,
            restaurants,
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// GET RESTURNAT BY ID
export const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantID;
        if (!restaurantId) {
            return res.status(404).json({
                message: "Please Provide Resturnat ID"
            });
        }
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                message: "no restaurant found"
            });
        }
        return res.status(200).json({
            restaurant
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

//DELETE RESTRURNAT
export const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantID;
        if (!restaurantId) {
            return res.status(404).json({
                message: "No Restaurant Found OR Provide Restaurant ID"
            });
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        return res.status(200).json({
            message: "Restaurant Deleted Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};
