import { useState, useContext } from "react";
<<<<<<< HEAD:src/pages/LoginPage/LoginPage.jsx
import { useNavigate } from "react-router-dom";

import { login } from "../../auth/authService";

import { useAuth } from "../../state/AuthContext.jsx";

const LoginPage = () => {
=======
import { useNavigate } from "react-router";
import { login } from "../../../services/authService";
import { UserContext } from "../../../contexts/UserContext";

const LoginForm = () => {
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Forms/LoginForm/LoginForm.jsx
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await login(formData);

      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Login</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

<<<<<<< HEAD:src/pages/LoginPage/LoginPage.jsx
export default LoginPage;
=======
export default LoginForm;
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Forms/LoginForm/LoginForm.jsx
