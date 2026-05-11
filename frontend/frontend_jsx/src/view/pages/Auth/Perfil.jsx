import "../../Css/Perfil.css";
import { useUser } from "../../global/UsuarioGlobal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Perfil() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState(user);

  /* manejar cambio de imagen */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        ...form,
        avatar: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, "");
      if (soloNumeros.length > 9) return;
      setForm({ ...form, telefono: soloNumeros });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    updateUser({
      ...form,
      telefono: "+56" + form.telefono
    });
    navigate(-1);
  };

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>

      {/* FOTO PERFIL */}
      <div className="perfil-avatar">
        <img
          src={form.avatar || "/images/Usuario.png"}
          alt="Foto de perfil"
        />

        <label className="avatar-btn">
          Cambiar foto
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>
      </div>

      <h4 className="perfil-subtitle">Datos personales</h4>
      <div className="perfil-form">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre || ""}
          onChange={handleChange}
        />

        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido || ""}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Correo electrónico"
          value={form.email || ""}
          disabled
        />

        <div className="telefono-wrapper">
          <span className="telefono-prefijo">+56</span>
          <input
            type="tel"
            name="telefono"
            placeholder="9 1234 5678"
            value={form.telefono || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <h4 className="perfil-subtitle">Dirección de despacho</h4>
      <div className="perfil-form">
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion || ""}
          onChange={handleChange}
        />

        <input
          name="comuna"
          placeholder="Comuna"
          value={form.comuna || ""}
          onChange={handleChange}
        />

        <input
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad || ""}
          onChange={handleChange}
        />
      </div>

      <h4 className="perfil-subtitle">Observaciones</h4>
      <textarea
        name="observaciones"
        placeholder="Indicaciones para el despacho (opcional)"
        value={form.observaciones || ""}
        onChange={handleChange}
        className="perfil-textarea"
      />

      <div className="perfil-actions">
        <button onClick={handleSave}>
          Guardar datos
        </button>

        <button onClick={() => navigate("/historial")}>
          🧾 Ver historial de compras
        </button>
      </div>
    </div>
  );
}
