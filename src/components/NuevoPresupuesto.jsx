import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto válido");
      return;
    }
    setMensaje("");
    setIsValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tú Presupuesto"
            value={presupuesto} // como el valor de la variable es 0, decimos que empieza en ese valor
            onChange={(e) => setPresupesto(Number(e.target.value))} // Lo que el usuario este escribiendo en ese input se ira agregando en la variable de 'setPresupuesto' que esta en 'App.jsx'
          />
        </div>

        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
