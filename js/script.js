// 1. Las variables globales y funciones auxiliares pueden ir afuera
let publicaciones = [
    {
        id: 1,
        usuario: "VmFabss",
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
        imagenPost: "ruta/a/tu/foto-urco.jpg",
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

function agregarPublicacionAlDOM(pub) {
    const contenedorPosts = document.getElementById("Contenedor-posts");
    
    if (contenedorPosts) {
        const article = document.createElement("article");
        article.className = "Post";
        
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
            <button class="boton-like" onclick="darLike(${pub.id})">
                <span class="icono-corazon">🤎</span>
                <span class="contador-likes" id="Likes-${pub.id}">${pub.likes}</span>
            </button>
        `;
        
        contenedorPosts.prepend(article);
    }
}

// 2. TODO LO QUE BUSCA ELEMENTOS EN EL HTML VA DENTRO DE ESTE EVENTO
document.addEventListener("DOMContentLoaded", function() {
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
                id: publicaciones.length + 1,
                usuario: nombreUsuario,
                fotoPerfil: "ruta/a/tu/foto-perfil1.jpg",
                imagenPost: "",
                contenido: contenidoPost,
                categoria: categoriaPost,
                likes: 0
            };

            publicaciones.unshift(nuevaPublicacion);
            agregarPublicacionAlDOM(nuevaPublicacion);
            formularioPost.reset();
            
            alert("¡Publicación creada con éxito!");
        });
    }
});