import React, { useState } from 'react';

interface RoleChangeModalProps {
  onClose: () => void;
  addMember: (id: string, role: string) => Promise<void>;
}

const RoleChangeModal: React.FC<RoleChangeModalProps> = ({
  onClose,
  addMember,
}) => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('');

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSave = async () => {
    await addMember(email, selectedRole);

    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-4">Add Member and Change Role</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="admin" className="flex items-center space-x-2">
            <input
              type="radio"
              id="admin"
              name="role"
              className="form-radio text-blue-500"
              value="admin"
              checked={selectedRole === 'admin'}
              onChange={() => handleRoleChange('admin')}
            />
            <span className="text-gray-700">Admin</span>
          </label>

          <label htmlFor="user" className="flex items-center space-x-2">
            <input
              type="radio"
              id="user"
              name="role"
              className="form-radio text-blue-500"
              value="user"
              checked={selectedRole === 'user'}
              onChange={() => handleRoleChange('user')}
            />
            <span className="text-gray-700">User</span>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#3e4396] text-white px-4 py-2 rounded mt-4 w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RoleChangeModal;
