import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { request } from "../utils/requests";
import Button from "./Button";

const UsersList = () => {
  const { isLoading, error, data, isError } = useQuery(
    "usersList",
    () => request({ url: "/users" }),
    { select: ({ data }) => data.data.users }
  );

  const queryClient = useQueryClient();

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete the user ?")) {
      try {
        const response = await request({
          url: `/users/${userId}`,
          method: "DELETE",
        });
        queryClient.invalidateQueries("usersList");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  if (!isLoading && data.length < 1) return <Navigate to="/users/create" />;

  return (
    <>
      {/* <Button> */}
      <Link to="/users/create">Add User</Link>
      {/* </Button> */}
      <div>
        {data?.map((user) => (
          <UserTile
            key={user._id}
            id={user._id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            address={user.address}
            deleteUser={deleteUser}
          />
        ))}
      </div>
    </>
  );
};

export default UsersList;

const UserTile = ({ id, name, email, phone, deleteUser, address }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div
      style={{
        padding: "1rem 5rem",
        display: "flex",
      }}
      className="grid-wrapper"
    >
      <span>{name}</span>
      <span style={{ color: "Grey" }}>{email}</span>

      <span>{phone}</span>
      <span>{address}</span>
      <span>
        <Link to={"/users/" + id + "/edit"}>Edit</Link>
      </span>
      <span>
        {auth.user._id != id && (
          <Button onClick={() => deleteUser(id)}>Delete</Button>
        )}
      </span>
    </div>
  );
};
