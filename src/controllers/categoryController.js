import categoryModel from "../models/categoryModel";

// CREATE CAT
export const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        //valdn
        if (!title) {
            return res.status(500).json({
                message: "please provide category title or image",
            });
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        return res.status(201).json({
            message: "category created",
            newCategory
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// GET ALL CAT
export const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(404).json({
                message: "No Categories found",
            });
        }
        return res.status(200).json({
            totalCategory: categories.length,
            categories,
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// UPDATE CATE
export const updateCatController = async (req, res) => {
    try {
        const { categoryID } = req.params;
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            categoryID,
            { title, imageUrl },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({
                message: "No Category Found",
            });
        }
        return res.status(200).json({
            message: "Category Updated Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// DLEETE CAT
export const deleteCatController = async (req, res) => {
    try {
        const { categoryID } = req.params;
        if (!categoryID) {
            return res.status(500).json({
                message: "Please provide Category ID"
            });
        }
        const category = await categoryModel.findById(categoryID);
        if (!category) {
            return res.status(500).json({
                message: "No Category Found With this id"
            });
        }
        await categoryModel.findByIdAndDelete(categoryID);
        return res.status(200).json({
            message: "category Deleted succssfully"
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

