import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [msg ,setMsg] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        setUsers(response.data.data);
        setTotalUsers(response.data.total);
      } catch (error) {
        alert("Error fetching users", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    fetchUsers();
  }, [currentPage]);

  // MODAL RELATED
  const openModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${editingUser.id}`, {
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
        avatar: editingUser.avatar,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? response.data : user
        )
      );
      closeModal();
      setMsg('Success! user updated.');
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } catch (error) {
      setMsg('Error!', error);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setMsg('Success! user deleted');
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } catch (error) {
      setMsg('Error!', error);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  };

  // GOTO NEXT PAGE
  const handleNextPage = () => {
    if (users.length > 0 && totalUsers > currentPage * 6) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="bg-orange-400 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Users database</h2>

      {loading ? (
        <p className="text-gray-100">Fetching data...</p>
      ) : (
        <div>
          {users.length === 0 ? (
            <p>No users to show</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 place-items-center">
                {users.map((user, i) => (
                  <div key={i} className="bg-gray-100 p-6 rounded-lg w-fit shadow-lg shadow-orange-600">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-24 h-24 rounded-lg mx-auto mb-4 border-orange-500 border-2"
                    />
                    <h3 className="text-lg font-semibold text-center text-gray-700">
                      Name - <span className="text-orange-500 font-bold">{user.first_name} {user.last_name}</span>
                    </h3>
                    <h3 className="text-center text-gray-500">Email - <span className="text-orange-500">{user.email}</span></h3>
                    <div className="mt-4 flex justify-center space-x-10">
                      <button
                        onClick={() => openModal(user)}
                        className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-5 mt-20">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-200 text-orange-600 font-bold px-4 py-2 rounded-lg  disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Back
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={users.length === 0 || currentPage * 6 >= totalUsers}
                  className="bg-gray-200 text-orange-600 font-bold px-4 py-2 rounded-lg  disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User Info</h3>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={editingUser?.first_name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, first_name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={editingUser?.last_name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, last_name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={editingUser?.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar URL
              </label>
              <input
                type="text"
                id="avatar"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={editingUser?.avatar}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, avatar: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="bg-orange-500 text-gray-200 px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <p className={`${msg ? 'opacity-100 top-6 sm:top-7 duration-1000':''} absolute opacity-0 z-100 top-1 left-1/2 -translate-x-1/2 bg-gray-100 rounded-lg w-fit px-2 sm:px-10 py-4 h-5 flex items-center text-orange-500 font-medium transition-all `}>{msg}</p>
      
    </div>
  );
};

export default UsersPage;
