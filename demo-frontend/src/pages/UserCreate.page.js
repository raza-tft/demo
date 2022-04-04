import UserCreateForm from "../components/UserCreateForm";

const UserCreatePage = () => {
  return (
    <>
      <UserCreateForm submitUrl="/users/create" method="POST" />
    </>
  );
};

export default UserCreatePage;
