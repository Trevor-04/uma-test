const express = require('express');
const inventoryController = require('../functions/inventory');

const router = express.Router();

// Add a new item to inventory
router.post('/add', async (req, res) => {
    const { itemName, itemPrice, totalQuantity, category, descript } = req.body;

    try {
        await inventoryController.addItem({ itemName, itemPrice, totalQuantity, category, descript });
        res.status(201).json({ message: 'Item added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// Delete an item by ID
router.delete('/:itemID', async (req, res) => {
    const { itemID } = req.params;

    try {
        await inventoryController.deleteItem({ itemID });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Update an item by ID
router.put('/:itemID', async (req, res) => {
    const { itemID } = req.params;
    const { itemName, itemPrice, totalQuantity, category, descript } = req.body;

    try {
        await inventoryController.updateItem({ itemID, itemName, itemPrice, totalQuantity, category, descript});
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// List all items in inventory
router.get('/', async (req, res) => {
    try {
        const items = await inventoryController.listItems();
        return res.status(200).json(items);
    } catch (err) {
        //console.error(err);
        res.status(500).json({ error: 'Failed to list items' });
    }
});

// Get an item by ID
router.get('/:itemID', async (req, res) => {
    const { itemID } = req.params;

    try {
        const item = await inventoryController.getItemById({ itemID });
        res.status(200).json(item || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get item by ID' });
    }
});

// Get items by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const items = await inventoryController.getItemsByCategory({ category });
        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get items by category' });
    }
});

// Search items by name
router.get('/name/:itemName', async (req, res) => {
    const { itemName } = req.params;

    try {
        const items = await inventoryController.getItemsByName({ itemName });
        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get items by name' });
    }
});


// router.put('/edit', async(req, res) => {
//     const itemData = req.body;

//     try {
//         const result = await inventoryController.editItems(itemData);
//         res.status(200).json({message: 'Item updated successfully', result});
//     } catch (err) {
//         console.error("Error editing inventory:", err);
//         res.status(500).json({error: 'Failed to update item'});
//     }
// });

// router.get('/sales-with-items', async (req, res) => {
//     try {
//         const sales = await inventoryController.listSalesWithItems();
//         res.status(200).json(sales);  // Send the fetched data as a JSON response
//     } catch (err) {
//         console.error("Error fetching sales with items:", err);
//         res.status(500).json({ error: 'Failed to fetch sales with items' });
//     }
// });


// Export the router
module.exports = router;
