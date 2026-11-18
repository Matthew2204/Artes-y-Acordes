// 1. Arreglo global con las publicaciones iniciales
let publicaciones = [
    {
        id: 1,
        usuario: "Prueba de fuego",
        fotoPerfil: "ruta/a/tu/foto-perfil1.jpg",
        imagenPost: "ruta/a/tu/imagen-billie.jpg",
        contenido: "¿Ya escucharon el nuevo album de Billie eilish? Es fenomenal! Tiene canciones muy profundas con las cuales puedes identificarte, mi favorita es: \"my future\", habla sobre el como estamos enamorados de nuestro futuro, es totalmente inspirador!!",
        categoria: "Musica",
        likes: 23000
    },
    {
        id: 2,
        usuario: "_Leandrovrg",
        fotoPerfil: "ruta/a/tu/foto-perfil2.jpg",
        imagenPost: "ruta/a/tu/imagen-urco.jpg",
        contenido: "¿Ya han visto a mi perrito Urco? Es taaan tierno, me encanta cuando hace trucos.",
        categoria: "Animales",
        likes: 364000
    },
    {
        id: 3,
        usuario: "axl_.047",
        fotoPerfil: "ruta/a/tu/foto-perfil3.jpg",
        imagenPost: "", 
        contenido: "🎸🎸",
        categoria: "Instrumento",
        likes: 15
    }
];

// 2. Función para dar "Me gusta"
function darLike(id) {
    const pub = publicaciones.find(p => p.id === id);
    const spanLikes = document.getElementById(`Likes-${id}`);
    
    if (pub && spanLikes) {
        pub.likes++;
        spanLikes.innerText = pub.likes;
    } else if (spanLikes) {
        let actual = parseInt(spanLikes.innerText.trim()) || 0;
        spanLikes.innerText = actual + 1;
    }
}

// 3. Función para eliminar una publicación de forma segura
function eliminarPublicacion(id) {
    // Borramos del arreglo
    publicaciones = publicaciones.filter(p => p.id !== id);
    
    // Borramos únicamente el elemento article correspondiente en el HTML
    const postElemento = document.getElementById(`post-${id}`);
    if (postElemento) {
        postElemento.remove();
    }
}

// 4. Función para pintar una tarjeta individual dentro del contenedor de posts
function agregarPublicacionAlDOM(pub) {
    const contenedorPosts = document.getElementById("Contenedor-posts");
    
    if (contenedorPosts) {
        const article = document.createElement("article");
        article.className = "Post"; // Hereda tus estilos y colores cafés
        article.id = `post-${pub.id}`; // ID único
        
        const htmlFotoPerfil = pub.fotoPerfil && pub.fotoPerfil !== "ruta/a/tu/foto-perfil1.jpg" && pub.fotoPerfil !== ""
            ? `<img src="${pub.fotoPerfil}" alt="Foto de perfil de ${pub.usuario}" class="Foto-perfil">` 
            : `<div class="Foto-perfil" style="background-color: #ddd; display: inline-block;"></div>`;

        const htmlImagenPost = pub.imagenPost && pub.imagenPost !== "" 
            ? `<img src="${pub.imagenPost}" alt="Imagen del post">` 
            : '';

        article.innerHTML = `
            <div class="cabecera-usuario">
                ${htmlFotoPerfil}
                <h3>${pub.usuario}</h3>
            </div>
            <p class="Categoria"><strong>Categoria: </strong>${pub.categoria}</p>
            ${htmlImagenPost}
            <p class="Contenido">${pub.contenido}</p>
            <div class="acciones-post" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                <button class="boton-like" onclick="darLike(${pub.id})">
                    <span class="icono-corazon">🤎</span>
                    <span class="contador-likes" id="Likes-${pub.id}">${pub.likes}</span>
                </button>
                <button class="boton-eliminar" onclick="eliminarPublicacion(${pub.id})" style="background-color: #6b4423; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-weight: bold;">Eliminar</button>
            </div>
        `;
        
        contenedorPosts.appendChild(article);
    }
}

// 5. Evento principal al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    
    // Renderizamos las publicaciones iniciales del arreglo al cargar la página
    const contenedorPosts = document.getElementById("Contenedor-posts");
    if (contenedorPosts) {
        contenedorPosts.innerHTML = ""; // Limpiamos solo el área de posts, sin tocar el resto de la página
        publicaciones.forEach(pub => {
            agregarPublicacionAlDOM(pub);
        });
    }

    // Lógica del formulario para nuevas publicaciones
    const formularioPost = document.querySelector("#Crear-Publicacion form");

    if (formularioPost) {
        formularioPost.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const nombreUsuario = document.getElementById("nombre").value.trim();
            const contenidoPost = document.getElementById("contenido-post").value.trim();
            const categoriaPost = document.getElementById("categoria-post").value;

            if (nombreUsuario === "" || contenidoPost === "") {
                alert("Por favor, completa todos los campos obligatorios.");
                return;
            }

            const nuevaPublicacion = {
                id: Date.now(), // ID único basado en tiempo
                usuario: nombreUsuario,
                fotoPerfil: "ruta/a/tu/foto-perfil1.jpg",
                imagenPost: "",
                contenido: contenidoPost,
                categoria: categoriaPost,
                likes: 0
            };

            publicaciones.unshift(nuevaPublicacion); // Lo agregamos al inicio del arreglo
            
            // Agregamos la nueva publicación directamente arriba sin tocar el formulario ni el perfil
            if (contenedorPosts) {
                // Creamos temporalmente el article nuevo y lo ponemos al principio del contenedor de posts
                const tempDiv = document.createElement("div");
                // Usamos la misma lógica creando el elemento limpio:
                const article = document.createElement("article");
                article.className = "Post";
                article.id = `post-${nuevaPublicacion.id}`;
                
                article.innerHTML = `
                    <div class="cabecera-usuario">
                        <div class="Foto-perfil" style="background-color: #ddd; display: inline-block;"></div>
                        <h3>${nuevaPublicacion.usuario}</h3>
                    </div>
                    <p class="Categoria"><strong>Categoria: </strong>${nuevaPublicacion.categoria}</p>
                    <p class="Contenido">${nuevaPublicacion.contenido}</p>
                    <div class="acciones-post" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <button class="boton-like" onclick="darLike(${nuevaPublicacion.id})">
                            <span class="icono-corazon">🤎</span>
                            <span class="contador-likes" id="Likes-${nuevaPublicacion.id}">0</span>
                        </button>
                        <button class="boton-eliminar" onclick="eliminarPublicacion(${nuevaPublicacion.id})" style="background-color: #6b4423; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-weight: bold;">Eliminar</button>
                    </div>
                `;
                
                contenedorPosts.prepend(article);
            }

            formularioPost.reset();
            alert("¡Publicación creada con éxito!");
        });
    }
});