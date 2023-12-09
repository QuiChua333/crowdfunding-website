import { Field } from "../model/index.js";

const getFieldGroupByCategory = async (req,res) => {
    try {
        const listFieldGroupByCategory = await Field.aggregate([
            {
                $group: {
                    _id: '$category',
                    listFields: {
                        $push: "$$ROOT"
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
        ])

        const result = listFieldGroupByCategory.map(item => {
            return {
                category: item.category[0].name,
                listFields: item.listFields.map(item => {
                    return item.name
                })
            }
        })

        res.status(200).json({
            message: 'Get field groub by category successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
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
    addField,
    getFieldGroupByCategory
}