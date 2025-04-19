import React, { useState } from "react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../../features/user/userApi";

const Profile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const { data: user, refetch } = useLoadUserQuery();
  console.log(user);
  const [updateUser, { isLoading, error, data }] = useUpdateUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, image };
    await updateUser(formData);
    refetch();
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      {/* <button className="btn btn-neutral">Edite Profile</button> */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Edite Profile
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click outside to close</p>
          <div>
            <h2>Update Profile</h2>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            {data && (
              <p style={{ color: "green" }}>User updated successfully!</p>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
          {/* <button className="btn btn-neutral">Save</button> */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Profile;
