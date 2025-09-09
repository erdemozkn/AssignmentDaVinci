import { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../services/api";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { LuBotMessageSquare } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import "./user-list.style.scss";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserListProps {
  onUserPostsClick: (userId: number | null) => void;
}

function UserList({ onUserPostsClick }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [previousSelectedUserId, setPreviousSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleUserClick = (id: number | null) => {
    if (previousSelectedUserId === id) {
      onUserPostsClick(null);
      setPreviousSelectedUserId(null);
    } else {
      onUserPostsClick(id);
      setPreviousSelectedUserId(id);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleUpdate = async (user: User) => {
    const updated = await updateUser(user.id, {
      name: user.name,
      username: user.username,
      email: user.email,
    });
    setUsers(users.map((u) => (u.id === user.id ? updated : u)));
    setEditingUser(null);
  };

  const handleCreate = async () => {
    const newUser = await createUser({
      name: "New User",
      username: "new",
      email: "new@example.com",
    });
    setUsers([...users, newUser]);
  };

  return (
    <section className="user-list-container">
      <h2>User List</h2>
      <div className="list">
        {users.map((u) => (
          <div key={u.id} className="items">
            {editingUser?.id === u.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editingUser);
                }}
              >
                <input
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                />
                <input
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <button type="submit" className="submit-button"><FaRegSave /></button>
                <button type="button" className="cancel-button" onClick={() => setEditingUser(null)}>
                  <MdCancel />
                </button>
              </form>
            ) : (
              <div className="details">
                <p>{u.name} ({u.username}) <br /> {u.email}</p>
                <div className="update">
                  <button className="edit-icon" onClick={() => setEditingUser(u)}>
                    <LiaUserEditSolid />
                  </button>
                  <button className="delete-icon" onClick={() => handleDelete(u.id)}>
                    <AiOutlineUserDelete />
                  </button>
                  <button
                    className={`posts-icon ${previousSelectedUserId === u.id ? "active" : ""}`}
                    onClick={() => handleUserClick(u.id)}
                  >
                    <LuBotMessageSquare />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="create">
        <button onClick={handleCreate}>+ Add User</button>
      </div>
    </section>
  );
}

export default UserList;
