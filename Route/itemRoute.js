const express = require('express');
const router = express.Router();
const Item = require('../Models/itemSchema');

router.post('/', async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: 'Validation error',
                error: 'All fields (name, price) are required.'
            });
        }

        const item = new Item({ name, price, description });

        await item.save();

        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(400).json({ message: 'Error creating item', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find({});

        res.status(200).json({
            message: 'All items retrieved successfully',
            items
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving items',
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'Validation error',
                error: 'id parameter is required'
            });
        }

        const updateFields = {};

        if (name) updateFields.name = name;
        if (price) updateFields.price = price;
        if (description) updateFields.description = description;

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.status(200).json({
            message: 'Item updated successfully',
            item: updatedItem
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating item',
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.status(200).json({
            message: 'Item deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting item',
            error: error.message
        });
    }
});

module.exports = router;
