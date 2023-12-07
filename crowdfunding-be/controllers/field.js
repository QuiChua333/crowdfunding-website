import { Field } from "../model/index.js";


const addField = async (req,res) => {
    try {
        const {fieldName, categoryId} = req.body;
        const field = await Field.create({
            name: fieldName,
            category: categoryId
        })

        res.status(200).json({
            message: 'Add field successfully',
            data: field
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export default {
    addField
}