import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, Navigate } from "react-router-dom";
import { request } from "../utils/requests";
import Button from "./Button";

const UsersList = () => {
  const { isLoading, error, data, isError } = useQuery(
    "usersList",
    () => request({ url: "/users" }),
    { select: ({ data }) => data.data.users }
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  if (!isLoading && data.length < 1) return <Navigate to="/users/create" />;

  return (
    <>
      <Button>
        <Link to="/users/create">Add User</Link>
      </Button>
      {data?.map((user) => (
        <UserTile
          key={user._id}
          id={user._id}
          name={user.name}
          email={user.email}
        />
      ))}
    </>
  );
};

export default UsersList;

const UserTile = ({ id, name, email }) => {
  return (
    <div
      style={{
        padding: "1rem 10rem",
        display: "flex",
        gap: "10rem",
      }}
    >
      <span>{name}</span>
      <span style={{ color: "Grey" }}>{email}</span>
      <span>
        <Link to={"/users/" + id + "/edit"}>Edit</Link>
      </span>
    </div>
  );
};
