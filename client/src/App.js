import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import EditForm from "./components/EditForm";

function App() {
  return (
    <div style={{ marginTop: "50px" }}>
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/users" element={<Users />} />
        {/* Update the route to accept a dynamic `id` parameter */}
        <Route path="/update/:id" element={<EditForm />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
