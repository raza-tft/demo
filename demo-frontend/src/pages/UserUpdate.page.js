import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import UserCreateForm from "../components/UserCreateForm";
import { request } from "../utils/requests";

const UserUpdatePage = () => {
  const params = useParams();

  const [user, setUser] = useState(null);
  useEffect(() => {
    request({ url: `/users/${params?.id}` }).then(({ data }) =>
      setUser(data.data.users[0])
    );
  }, []);

  return (
    <>
      {user && (
        <UserCreateForm
          submitUrl={"/users/" + params.id}
          method="PUT"
          data={user}
        />
      )}
    </>
  );
};

export default UserUpdatePage;

// const { isLoading, error, data, isError } = useQuery(
//   ["usersList", params.id],
//   () => request({ url: `/users/${params?.id}` }),
//   { select: ({ data }) => data.data.users }
// );
// useEffect(() => {
//   console.log("MOUNTED");

// });

// if (!params.id) return <Navigate to="/" />;

// let user = {};

// if (!isLoading) {
//   user = {
//     id: data[0]._id,
//     email: data[0].email,
//     name: data[0].name,
//     password: data[0].password,
//     phone: data[0].phone,
//     address: data[0].address,
//   };
// }

// if (isLoading) return <h1>Loading...</h1>;
