import {Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import {PublicRoute} from "./components/PublicRoute.tsx";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
