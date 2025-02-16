import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./component/admin/Dashboard";
import List from "./component/admin/List";
import Edit from "./component/admin/Edit";
import Add from "./component/admin/Add";
import WebsiteLayout from "./layout/WebsiteLayout";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ListGenre from "./page/genre/ListGenre";
import AddGenre from "./page/genre/AddGenre";
import UpdateGenre from "./page/genre/UpdateGenre";
import AddMusic from "./page/upload/AddMusic";
import Home from "./page/home/Home";
import MusicDetail from "./page/Music/MusicDetail";
import { decryptData } from "./util/crypto";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState<any>();
  const [userDe, setUserDe] = useState<any>();
  const userString = localStorage.getItem("user");
  useEffect(()=>{
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      const datadecyp = decryptData(user?.data, user?.iv);
      const userDe = JSON.parse(datadecyp);
      setUserDe(userDe);
    } else {
      // Xử lý khi không có dữ liệu user
    }
  },[])


  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="list">
              <Route index element={<List />} />
              <Route path=":id/edit" element={<Edit />} />
              <Route path="add" element={<Add />} />
            </Route>
            <Route path="genre">
              <Route index element={<ListGenre />} />
              <Route path="add" element={<AddGenre />} />
              <Route path="update/:id" element={<UpdateGenre />} />
            </Route>
          </Route>
          <Route path="/" element={<WebsiteLayout user={user} />}>
            <Route index element={<Home user={user} />} />
            {/* <Route path="/test" element={<Test />} /> */}
            <Route path="music">
              <Route
                path=":id"
                element={<MusicDetail user={userDe} users={user} />}
              />
            </Route>
            {/* <Route path=":id" element={<MusicDetail />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<AddMusic user={user} users={userDe}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
