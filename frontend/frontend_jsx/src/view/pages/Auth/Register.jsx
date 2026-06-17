import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/global/UsuarioGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faAt, faLocationDot, faKey, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password) {
      setError("Completa los campos obligatorios ❌");
      return;
    }

    // REGISTRO + LOGIN AUTOMÁTICO
    login({
      nombre: form.nombre,
      email: form.email,
      direccion: form.direccion,
      telefono: form.telefono.replace(/\D/g, "")
    });

    // Persistencia simple
    localStorage.setItem("auth", "true");

    navigate("/"); // vuelve al home ya logueado
  };

  return (
    <div style={{ minHeight: "80vh", padding: "38px 0" }} className="row align-items-center">
      <div style={{  background: "#A4E5D2", maxWidth: 800, margin: "auto", borderRadius: 16, boxShadow: "0 5px 28px #ccb", padding: 36 }}>
        <form onSubmit={handleSubmit}>
          <img className="mx-auto d-block w-6" src="/images/Logo-Oscuro.png" alt="Logo" />
          <h2 className="text-center">Registro</h2>
          
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              className="Login-box input-with-icon"
              type="text"
              name="nombre"
              placeholder="Nombre completo *"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faAt} className="input-icon" />
            <input
              className="Login-box input-with-icon"
              type="email"
              name="email"
              placeholder="Correo *"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faKey} className="input-icon" />
            <input
              className="Login-box input-with-icon"
              type="password"
              name="password"
              placeholder="Contraseña *"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faLocationDot} className="input-icon" />
            <input
              className="Login-box input-with-icon"
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={form.direccion}
              onChange={handleChange}
            />
          </div>
          <div className="text-center d-grid gap-2 col-6 mx-auto Login-box">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: "bold" }}>+56</span>
              <input
                type="text"
                name="telefono"
                placeholder="912345678"
                value={form.telefono}
                onChange={handleChange}
                style={{ flex: 1, border: "none", outline: "none" }}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <button className="m-2 btn btn-success btn-icon mx-auto d-block login-btn" type="submit"><FontAwesomeIcon icon={faUserPlus}/>Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
