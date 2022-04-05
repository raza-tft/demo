import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/Layout";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import UserCreatePage from "./pages/UserCreate.page";
import UserUpdatePage from "./pages/UserUpdate.page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/users/create" element={<UserCreatePage />} />
            <Route path="/users/:id/edit" element={<UserUpdatePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
