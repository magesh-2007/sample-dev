
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  function saveItem() {
    if (name.trim() === "") return;

    if (editId !== null) {
      setItems(
        items.map((item) =>
          item.id === editId ? { ...item, name } : item
        )
      );
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), name }]);
    }

    setName("");
  }

  function editItem(item) {
    setName(item.name);
    setEditId(item.id);
  }

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h2>CRUD Application</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={saveItem}>
        {editId !== null ? "Update" : "Add"}
      </button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => editItem(item)}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
