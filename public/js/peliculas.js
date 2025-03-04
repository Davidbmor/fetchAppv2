document.addEventListener('DOMContentLoaded', function() {
    const peliculasList = document.getElementById('peliculas-list');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    function fetchPeliculas(categoriaId = '') {
        let url = '/laraveles/fetchAppv2/public/api/peliculas';
        if (categoriaId) {
            url += `?categoria_id=${categoriaId}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                peliculasList.innerHTML = '';
                data.forEach(pelicula => {
                    const peliculaCard = document.createElement('div');
                    peliculaCard.className = 'card mb-3';

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';

                    const cardTitle = document.createElement('h5');
                    cardTitle.className = 'card-title';
                    cardTitle.textContent = pelicula.titulo;

                    const cardDescription = document.createElement('p');
                    cardDescription.className = 'card-text';
                    cardDescription.textContent = pelicula.descripcion;

                    const cardDirector = document.createElement('p');
                    cardDirector.className = 'card-text';
                    cardDirector.innerHTML = `<small class="text-muted">Director: ${pelicula.director}</small>`;

                    const cardFechaEstreno = document.createElement('p');
                    cardFechaEstreno.className = 'card-text';
                    cardFechaEstreno.innerHTML = `<small class="text-muted">Fecha de Estreno: ${pelicula.fecha_estreno}</small>`;

                    const cardCategoria = document.createElement('p');
                    cardCategoria.className = 'card-text';
                    cardCategoria.innerHTML = `<small class="text-muted">Categoría: ${pelicula.categoria.nombre}</small>`;

                    const editButton = document.createElement('button');
                    editButton.className = 'btn btn-warning me-2';
                    editButton.textContent = 'Editar';
                    editButton.addEventListener('click', function() {
                        // Volcar los datos de la película en el formulario de edición
                        document.getElementById('edit_pelicula_id').value = pelicula.id;
                        document.getElementById('edit_titulo').value = pelicula.titulo;
                        document.getElementById('edit_descripcion').value = pelicula.descripcion;
                        document.getElementById('edit_director').value = pelicula.director;
                        document.getElementById('edit_fecha_estreno').value = pelicula.fecha_estreno;
                        document.getElementById('edit_categoria_id').value = pelicula.categoria_id;
                        new bootstrap.Modal(document.getElementById('editPeliculaModal')).show();
                    });

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger';
                    deleteButton.textContent = 'Borrar';
                    deleteButton.addEventListener('click', function() {
                        if (confirm('¿Estás seguro de que deseas borrar esta película?')) {
                            fetch(`/laraveles/fetchAppv2/public/api/peliculas/${pelicula.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    'Accept': 'application/json'
                                }
                            })
                            .then(response => {
                                if (!response.ok) {
                                    return response.text().then(text => { throw new Error(text) });
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.success) {
                                    alert('Película borrada con éxito');
                                    location.reload();
                                } else {
                                    alert('Error al borrar la película');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Error al borrar la película: ' + error.message);
                            });
                        }
                    });

                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardDescription);
                    cardBody.appendChild(cardDirector);
                    cardBody.appendChild(cardFechaEstreno);
                    cardBody.appendChild(cardCategoria);
                    cardBody.appendChild(editButton);
                    cardBody.appendChild(deleteButton);
                    peliculaCard.appendChild(cardBody);
                    peliculasList.appendChild(peliculaCard);
                });
            })
            .catch(error => console.error('Error fetching peliculas:', error));
    }

    // Fetch all peliculas on page load
    fetchPeliculas();

    // Add event listeners to dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const categoriaId = this.getAttribute('data-categoria-id');
            fetchPeliculas(categoriaId);
        });
    });
});

document.getElementById('addPeliculaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/laraveles/fetchAppv2/public/api/peliculas', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Película añadida con éxito');
            location.reload();
        } else {
            alert('Error al añadir la película');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al añadir la película: ' + error.message);
    });
});

document.getElementById('editPeliculaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const peliculaId = document.getElementById('edit_pelicula_id').value;
    fetch(`/laraveles/fetchAppv2/public/api/peliculas/${peliculaId}`, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Película actualizada con éxito');
            location.reload();
        } else {
            alert('Error al actualizar la película');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar la película: ' + error.message);
    });
});