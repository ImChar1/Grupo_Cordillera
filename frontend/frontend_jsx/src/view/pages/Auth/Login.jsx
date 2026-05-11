import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/global/UsuarioGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faAt, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Credenciales falsas
    if (email === "admin@admin.com" && password === "1234") {

      login({
        nombre: "Admin",
        email: email
      });

      localStorage.setItem("auth", "true");

      navigate("/"); // vuelve al home logueado
    } else {
      setError("Credenciales incorrectas ❌");
    }
  };

  return (
    <div style={{ minHeight: "80vh", padding: "38px 0" }} className="row align-items-center">
      <div style={{ background: "#A4E5D2", maxWidth: 800, margin: "auto", borderRadius: 16, boxShadow: "0 5px 28px #ccb", padding: 36 }}>
        <form onSubmit={handleSubmit}>
          <img className="mx-auto d-block w-6" src="/images/Logo-Oscuro.png" alt="Logo" />
          <h2 className="text-center">Iniciar Sesión</h2>

          {/* CORREO */}
<div className="input-icon-wrapper">
  <FontAwesomeIcon icon={faAt} className="input-icon" />
  <input
    className="Login-box input-with-icon"
    type="email"
    placeholder="Correo"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</div>

{/* CONTRASEÑA */}
<div className="input-icon-wrapper">
  <FontAwesomeIcon icon={faKey} className="input-icon" />
  <input
    className="Login-box input-with-icon"
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</div>


          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button className="m-2 btn btn-success btn-icon mx-auto d-block login-btn" type="submit"><FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
