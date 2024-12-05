import React from "react";
import PeliculaItem from "./PeliculaItem";

function ListaPeliculas({ peliculas, eliminarPelicula }) {
  return (
    <div className="row">
      {peliculas.map((pelicula) => (
        <div key={pelicula.id} className="col-md-4">
          <PeliculaItem pelicula={pelicula} eliminarPelicula={eliminarPelicula} />
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
