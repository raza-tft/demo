import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import UserCreateForm from "../components/UserCreateForm";
import { request } from "../utils/requests";

const UserUpdatePage = () => {
  const params = useParams();

  const { isLoading, error, data, isError } = useQuery(
    ["usersList", params.id],
    () => request({ url: `/users/${params?.id}` }),
    { select: ({ data }) => data.data.users }
  );

  if (!params.id) return <Navigate to="/" />;

  let user = {};

  if (!isLoading) {
    user = {
      id: data[0]._id,
      email: data[0].email,
      name: data[0].name,
      password: data[0].password,
    };
  }
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <UserCreateForm
        submitUrl={"/users/" + params.id}
        method="PUT"
        data={user}
      />
    </>
  );
};

export default UserUpdatePage;
