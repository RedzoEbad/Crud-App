const Crud = require('../Model/Model');

// GET request handler
async function Handle_Get_Request(req, res) {
  try {
    const data = await Crud.find(); 
    res.status(200).json(data); 
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" }); 
  }
}


async function Handle_Post_Request(req, res) {
  try {
    const { Id, Names, Age, Email, Status } = req.body;

    if (!Id || !Names || !Age || !Email || !Status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCrud = new Crud({
      Id,
      Names,
      Age,
      Email,
      Status
    });

    await newCrud.save();
    res.status(201).json({ message: "Data added successfully!", newCrud }); 
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
}
async function Handle_Delete_Request(req, res) {
  const { id } = req.params; 
  try {
    const deletedItem = await Crud.findOneAndDelete({ Id: id }); 
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Data deleted successfully!" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Error deleting data" });
  }
}
async function Handle_Put_Request(req, res) {
  const { id } = req.params;   // Get the ID from the request parameters
  const updatedData = req.body; // Get the new data to update from the request body
  
  try {
    const updatedItem = await Crud.findOneAndUpdate(
      { Id: id },   // Find document by Id field
      updatedData,  // Set new data
      { new: true, useFindAndModify: false } // Return the updated document and disable deprecated option
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found for update" });
    }

    res.status(200).json({ message: "Data updated successfully!", updatedItem });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
}



module.exports = { Handle_Get_Request, Handle_Post_Request, Handle_Delete_Request  , Handle_Put_Request};
