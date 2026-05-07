import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/route.tsx";

function App() {
    console.log("App.tsx started running");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        } else {
            window.location.href = "http://localhost:8080/api/auth/login";
        }
    }, []);

    return <AppRoutes />;
}

export default App;