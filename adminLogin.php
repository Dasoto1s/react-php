<?php
/*
 * Descripción: Servicio web para autenticar administradores y generar un token de autenticación.
 *
 * Método: POST
 * Ruta: /adminlogin.php
 *
 * Parámetros de entrada:
 * - email: Correo electrónico del administrador (requerido).
 * - password: Contraseña del administrador (requerido).
 *
 * Respuestas:
 * - 200 OK: Si las credenciales son válidas, se devuelve un token de autenticación en formato JSON.
 *   Ejemplo de respuesta: { "token": "a1b2c3d4e5f6" }
 * - 400 Bad Request: Si el correo electrónico no tiene un formato válido, no tiene un punto al final o si algún campo está vacío.
 *   Ejemplo de respuesta: { "error": "El correo electrónico no tiene un formato válido" }
 * - 401 Unauthorized: Si las credenciales son incorrectas, se devuelve un error en formato JSON.
 *   Ejemplo de respuesta: { "error": "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña." }
 *
 * Manejo de errores:
 * - Si hay un error de conexión con la base de datos, se devuelve un mensaje de error y se termina la ejecución.
 *
 * Dependencias:
 * - Conexión a la base de datos MySQL utilizando las credenciales proporcionadas.
 * - Encabezados CORS configurados para permitir solicitudes desde http://localhost:3000.
 */

// Credenciales de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "abc";

// Establecer la conexión con la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Agregar encabezados CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Verificar si la solicitud es una solicitud de preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Validar campos vacíos
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son requeridos'], JSON_UNESCAPED_UNICODE);
    exit();
}

// Validar el formato del correo electrónico
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'El correo electrónico no tiene un formato válido'], JSON_UNESCAPED_UNICODE);
    exit();
}



// Consultar la base de datos para verificar las credenciales del administrador
$sql = "SELECT * FROM administrador WHERE Nombre_usuario = '$email' AND contraseña = '$password'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    // Generar un token de autenticación
    $token = bin2hex(random_bytes(16));

    // Devolver el token como respuesta al frontend
    echo json_encode(['token' => $token]);
} else {
    // Devolver un error si las credenciales son incorrectas
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.'], JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>