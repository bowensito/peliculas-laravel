import React, { useState, useEffect } from 'react';

const FormularioPelicula = ({ onSubmit, peliculaEditando, setPeliculaEditando }) => {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');

  // Si hay una película editando, actualizar los campos del formulario
  useEffect(() => {
    if (peliculaEditando) {
      setTitulo(peliculaEditando.title);
      setDirector(peliculaEditando.director);
      setImage(peliculaEditando.image);
      setDate(peliculaEditando.date);
    }
  }, [peliculaEditando]);  // Solo ejecuta esto si 'peliculaEditando' cambia

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaPelicula = {
      title: titulo,
      director: director,
      image: image,
      date: date,
    };

    // Si se está editando una película, pasar la película editada
    if (peliculaEditando) {
      onSubmit(peliculaEditando.id, nuevaPelicula);  // Pasar ID y datos actualizados
    } else {
      onSubmit(nuevaPelicula);  // Si no, agregar una nueva película
    }

    // Limpiar el formulario después de enviar
    setTitulo('');
    setDirector('');
    setImage('');
    setDate('');
    setPeliculaEditando(null);  // Limpiar el estado de edición
  };

  return (
    <div className="form-container text-white">
      <form onSubmit={handleSubmit}>
        {/* Título */}
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label text-white">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="form-control text-light bg-dark"
          />
        </div>
        {/* Director */}
        <div className="mb-3">
          <label htmlFor="director" className="form-label text-white">Director</label>
          <input
            type="text"
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
            className="form-control text-light bg-dark"
          />
        </div>
        {/* Imagen */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">Imagen (URL)</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="form-control text-light bg-dark"
          />
        </div>
        {/* Fecha de estreno */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label text-white">Fecha (YYYY-MM-DD)</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-control text-light bg-dark"
          />
        </div>
        {/* Botón para enviar el formulario */}
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">
            {peliculaEditando ? 'Editar Película' : 'Agregar Película'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPelicula;
