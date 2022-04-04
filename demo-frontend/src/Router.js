import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import UserCreatePage from "./pages/UserCreate.page";
import UserUpdatePage from "./pages/UserUpdate.page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/users/:id/edit" element={<UserUpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
