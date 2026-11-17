let publicaciones = [
    {
        id: 1;
        usuario: "VmFabss";
        contenido: "¿Ya escucharon el nuevo album de Billie eilish? Es fenomenal! Tiene canciones muy profundas conm las cuales puedes identificarte, mi favorita es: "my future",  habla sobre el como estamos enamorados de nuestro futuro, es totalmente inspirador!!";
        categoria: "Musica";
        likes:3000; 
    }
    {
        id: 2;
        usuario: "_Leandrovrg ";
        contenido: "¿Ya han visto a mi perrito Urco? Es taaan tierno, me encanta cuando hace trucos, desde que tengo memoria siempre ha sido un experto en atrapar la pelota. 🤍";
        categoria: "Animales";
        likes: 364000;
    }
    {
        id: 3;
        usuario: "axl_.047";
        contenido: "🎸🎸";
        categoria: Instrumento"
    }
]
function mostrarPublicaciones() {

    // 1. Buscamos el contenedor donde irán las publicaciones en el HTML
    const contenedor = document.getElementById("contenedor-publicaciones");

    // Si no existe el contenedor, detenemos la función para evitar errores
    if (!contendor) return;

    // 2. Liberar el contenedor para evitar duplicados al recargar
    contenedor.innerHTML = "";

    // 3. Recorremos el arreglo elemento por elemento con forEach
    publicaciones.forEach(pub => {
        // Creamos un elemento <article> por cada publicación
        const tarjeta = document.createElement("article");

        // Le asignamos una clase para darle estilo luego
        tarjeta.className = "tarjeta-publicacion"; 

        // Inyectamos el contenido HTML usando los datos del objeto
        tarjeta.innerHTML = `
        
    }

    
}

                   