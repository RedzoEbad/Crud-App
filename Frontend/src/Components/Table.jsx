import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import shortid from 'shortid';

const Table = () => {
  const [data, setData] = useState([]);  
  const [newEntry, setNewEntry] = useState({ name: '', age: '', email: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/post", {
        Id: shortid.generate(), // Generate a unique ID for the new entry
        Names: newEntry.name,
        Age: newEntry.age,
        Email: newEntry.email,
        Status: newEntry.status
      });
      setData([...data, response.data.newCrud]); // Update the state with the new entry
      console.log("POST Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleAdd = () => {
    if (isEditing) {
      // If in editing mode, update the entry
      handleEdit(editId); // Call handleEdit with the editId
    } else {
      // If not in editing mode, add a new entry
      postData();
    }
    setNewEntry({ name: '', age: '', email: '', status: '' });
    setIsEditing(false); // Reset the editing state
    setEditId(null); // Clear the edit ID
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`); // Ensure you're passing the correct Id
      setData(data.filter(item => item.Id !== id)); // Use Id from the backend
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = async (id) => {
    // If the user is editing an item, update the data
    const updatedData = {
      Names: newEntry.name,
      Age: newEntry.age,
      Email: newEntry.email,
      Status: newEntry.status
    };

    try {
      const response = await axios.put(`http://localhost:8000/put/${id}`, updatedData);

      // Update the local state with the modified item
      setData(prevData =>
        prevData.map(item =>
          item.Id === id ? { ...item, ...updatedData } : item
        )
      );
      console.log("PUT Response:", response.data);
      
    } catch (error) {
      console.error("Error editing data:", error);
    }

    setIsEditing(false); // Reset editing state
    setEditId(null); // Clear the editId
  };

  const startEditing = (id) => {
    const editItem = data.find(item => item.Id === id); 
    setNewEntry({ 
      name: editItem.Names, 
      age: editItem.Age, 
      email: editItem.Email, 
      status: editItem.Status 
    });
    setIsEditing(true);
    setEditId(id);  
  };

  return (
    <div className="body">
      <div className="container">
        <h1 className="header">CRUD APP</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Name</th>
              <th className="th">Age</th>
              <th className="th">Email</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.Id} className="tr">
                <td className="td">{item.Id}</td>
                <td className="td">{item.Names}</td>
                <td className="td">{item.Age}</td>
                <td className="td">{item.Email}</td>
                <td className="td">{item.Status}</td>
                <td className="td">
                  <button className="editButton" onClick={() => startEditing(item.Id)}>Edit</button>
                  <button className="deleteButton" onClick={() => handleDelete(item.Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="formContainer">
          <h2 className="formHeader">{isEditing ? 'Edit Entry' : 'Add New Entry'}</h2>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Name"
            value={newEntry.name}
            onChange={handleInputChange}
          />
          <input
            className="input"
            type="number"
            name="age"
            placeholder="Age"
            value={newEntry.age}
            onChange={handleInputChange}
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={newEntry.email}
            onChange={handleInputChange}
          />
          <input
            className="input"
            type="text"
            name="status"
            placeholder="Status"
            value={newEntry.status}
            onChange={handleInputChange}
          />
          <button className="addButton" onClick={handleAdd}>
            {isEditing ? 'Update Entry' : 'Add Entry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;


