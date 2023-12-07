import { Category } from "../model/index.js";



const addCategory = async (req,res) => {
    try {
        const {categoryName} = req.body;
        const category = await Category.create({
            name: categoryName,
        })

        res.status(200).json({
            message: 'Add category successfully',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export default {
    addCategory
}