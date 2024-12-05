import React from "react";
import 

function PeliculaItem({ pelicula, eliminarPelicula }) {
  return (
    <div className="card mb-4">
      <img src={pelicula.image} className="card-img-top" alt={pelicula.title} />
      <div className="card-body">
        <h5 className="card-title">{pelicula.title}</h5>
        <p className="card-text">
          <strong>Director:</strong> {pelicula.director}
        </p>
        <p className="card-text">
          <strong>Fecha:</strong> {pelicula.date}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => eliminarPelicula(pelicula.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PeliculaItem;
