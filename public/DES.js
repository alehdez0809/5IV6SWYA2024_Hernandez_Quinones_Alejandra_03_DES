function camposVacios(){
    var clave = document.getElementById("clave").value;

    if(clave == ""){
        alert("La clave no puede estar vacia");
    }
}

function longitudClaveCifrar(){
    camposVacios();
    var clave = document.getElementById("clave").value;

    if(clave.length < 8){
        alert("La clave debe contener 8 caracteres exclusivamente");
    }else{
        cifrado();
    }
}

function longitudClaveDescifrar(){
    camposVacios();
    var clave = document.getElementById("clave").value;

    if(clave.length < 8){
        alert("La clave debe contener 8 caracteres exclusivamente");
    }else{
        descifrado();
    }
}

function cifrado() {
    const archivoInput = document.getElementById("file");
    const file = archivoInput.files[0];
    const fileName = archivoInput.files[0].name.split('.')[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const mensaje = e.target.result;
            const clave = document.getElementById("clave").value;
            console.log("Clave:", clave);
            console.log("Nombre del archivo:", fileName);
            console.log("Contenido del archivo:", mensaje);


            // Cifra el mensaje
            const mensajeCifrado = CryptoJS.DES.encrypt(mensaje, clave).toString();
            

            //Esta parte es para crear el nuevo archivo con el mensaje cifrado
            const blob = new Blob([mensajeCifrado.toString()], { type: "text/plain" });

            const blobURL = URL.createObjectURL(blob);

            // Crea un elemento de enlace de descarga
            const a = document.createElement("a");
            a.href = blobURL;
            const archivoCifradoName = fileName + "_cifrado.txt";
            a.download = archivoCifradoName; // Nombre del archivo cifrado
            a.style.display = "none";

            // Agrega el elemento de enlace al cuerpo del documento
            document.body.appendChild(a);

            // Simula un clic en el enlace para descargar el archivo
            a.click();

            // Elimina el elemento de enlace después de la descarga
            document.body.removeChild(a);

            // Libera la URL del Blob
            URL.revokeObjectURL(blobURL);
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, seleccione un archivo txt");
    }
}

function descifrado() {
    const archivoInput = document.getElementById("file");
    const file = archivoInput.files[0];
    const fileName = archivoInput.files[0].name.split('.')[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const mensaje = e.target.result;
            const clave = document.getElementById("clave").value;
            const textArea = document.getElementById("texto_descifrado");
            console.log("Clave:", clave);
            console.log("Nombre del archivo:", fileName);
            console.log("Contenido del archivo:", mensaje);


            // Cifra el mensaje
            const mensajeDescifrado = CryptoJS.DES.decrypt(mensaje, clave).toString();
            
            //Convertir a código ascii y mostrar en textarea
            console.log("Mensaje descifrado:", mensajeDescifrado);

            //convierte a código ASCII
            let ascii = '';
            for (let i = 0; i < mensajeDescifrado.length; i += 2) {
                const hexPair = mensajeDescifrado.substr(i, 2);
                const decimalValue = parseInt(hexPair, 16);
                ascii += String.fromCharCode(decimalValue);
            }

            textArea.value = ascii;
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, seleccione un archivo txt");
    }
}


function generarEnlace() {
    const inputElement = document.getElementById("newfile");
    const linkDescargaTextarea = document.getElementById("link_descarga");
    
    if (inputElement.files.length > 0) {
        const file = inputElement.files[0];
        
        // Crear un Blob con el archivo
        const blob = new Blob([file], { type: file.type });
        
        // Crear un objeto URL para el Blob
        const blobURL = URL.createObjectURL(blob);
        
        // Crear un enlace de descarga
        const enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = blobURL;
        enlaceDescarga.download = file.name;
        enlaceDescarga.textContent = "Descargar Archivo";
        
        // Mostrar el enlace en el textarea
        linkDescargaTextarea.value = enlaceDescarga.href;
    } else {
        alert("Por favor, selecciona un archivo");
    }
}

