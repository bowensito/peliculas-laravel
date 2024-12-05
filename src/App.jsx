import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioPelicula from './components/FormularioPelicula';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaEditando, setPeliculaEditando] = useState(null);

  // Cargar las películas desde la API
  useEffect(() => {
    axios.get('https://valuable-francine-laravel-proyecto-d4bd771b.koyeb.app/api/peliculas')
      .then(response => {
        setPeliculas(response.data.movie);
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });
  }, []);

  // Función para agregar nueva película
  const agregarPelicula = (nuevaPelicula) => {
    axios.post('https://valuable-francine-laravel-proyecto-d4bd771b.koyeb.app/api/peliculas', nuevaPelicula)
      .then(response => {
        setPeliculas([...peliculas, response.data.movie]);
        alert('Película agregada correctamente');
      })
      .catch(error => {
        console.error('Error al agregar la película:', error);
        alert('Error al agregar la película');
      });
  };

  // Función para eliminar una película
  const borrarPelicula = (id) => {
    axios.delete(`https://valuable-francine-laravel-proyecto-d4bd771b.koyeb.app/api/peliculas/${id}`)
      .then(response => {
        setPeliculas(peliculas.filter(pelicula => pelicula.id !== id));
        alert('Película eliminada correctamente');
      })
      .catch(error => {
        console.error('Error al eliminar la película:', error);
        alert('Error al eliminar la película');
      });
  };

  // Función para editar una película
  const editarPelicula = (id, peliculaActualizada) => {
    axios.put(`https://valuable-francine-laravel-proyecto-d4bd771b.koyeb.app/api/peliculas/${id}`, peliculaActualizada)
      .then(response => {
        const peliculasActualizadas = peliculas.map(pelicula => 
          pelicula.id === id ? response.data.movie : pelicula
        );
        setPeliculas(peliculasActualizadas);
        setPeliculaEditando(null); // Reseteamos la película que se está editando
        alert('Película editada correctamente');
      })
      .catch(error => {
        console.error('Error al editar la película:', error);
        alert('Error al editar la película');
      });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="text-center mb-4">Listado de Películas</h1>

        <FormularioPelicula 
          onSubmit={agregarPelicula} 
          peliculaEditando={peliculaEditando} 
          setPeliculaEditando={setPeliculaEditando} 
          editarPelicula={editarPelicula} 
        />

        <div className="row g-4 mt-4">
          {peliculas.map((pelicula) => (
            <div className="col-12 col-md-4" key={pelicula.id}>
              <div className="pelicula-card p-3 shadow rounded">
                <img src={pelicula.image} alt={pelicula.title} className="img-fluid rounded mb-3" />
                <h3>{pelicula.title}</h3>
                <p><strong>Director:</strong> {pelicula.director}</p>
                <p><strong>Fecha:</strong> {pelicula.date}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning" onClick={() => setPeliculaEditando(pelicula)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => borrarPelicula(pelicula.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
