import React, { useEffect, useState } from "react";
import axios from "axios";
import shortid from "shortid";

const Table = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    name: "",
    age: "",
    email: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // 🧠 Fetch data when page loads
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api"); // ✅ no localhost here
        console.log("Fetched data:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.warn("Unexpected response:", response.data);
          setData([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  // 🧠 Handle input field updates
  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // 🧠 Add a new entry
  const postData = async () => {
    try {
      const response = await axios.post("/api/post", {
        Id: shortid.generate(),
        Names: newEntry.name,
        Age: newEntry.age,
        Email: newEntry.email,
        Status: newEntry.status,
      });
      if (response.data?.newCrud) {
        setData([...data, response.data.newCrud]);
      }
      console.log("POST Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // 🧠 Add or update depending on editing state
  const handleAdd = () => {
    if (isEditing) {
      handleEdit(editId);
    } else {
      postData();
    }
    setNewEntry({ name: "", age: "", email: "", status: "" });
    setIsEditing(false);
    setEditId(null);
  };

  // 🧠 Delete entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      setData(data.filter((item) => item.Id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // 🧠 Edit entry (update existing)
  const handleEdit = async (id) => {
    const updatedData = {
      Names: newEntry.name,
      Age: newEntry.age,
      Email: newEntry.email,
      Status: newEntry.status,
    };

    try {
      const response = await axios.put(`/api/put/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) =>
          item.Id === id ? { ...item, ...updatedData } : item
        )
      );
      console.log("PUT Response:", response.data);
    } catch (error) {
      console.error("Error editing data:", error);
    }

    setIsEditing(false);
    setEditId(null);
  };

  // 🧠 Start editing an entry
  const startEditing = (id) => {
    const editItem = data.find((item) => item.Id === id);
    if (!editItem) return;
    setNewEntry({
      name: editItem.Names,
      age: editItem.Age,
      email: editItem.Email,
      status: editItem.Status,
    });
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="body">
      <div className="container">
        <h1 className="header">CRUD APP</h1>

        {/* 🧱 Data Table */}
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
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.Id} className="tr">
                  <td className="td">{item.Id}</td>
                  <td className="td">{item.Names}</td>
                  <td className="td">{item.Age}</td>
                  <td className="td">{item.Email}</td>
                  <td className="td">{item.Status}</td>
                  <td className="td">
                    <button
                      className="editButton"
                      onClick={() => startEditing(item.Id)}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(item.Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="td" colSpan="6">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 🧱 Form for adding/updating */}
        <div className="formContainer">
          <h2 className="formHeader">
            {isEditing ? "Edit Entry" : "Add New Entry"}
          </h2>
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
            {isEditing ? "Update Entry" : "Add Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
