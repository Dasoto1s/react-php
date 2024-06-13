<?php
/*
 * Descripción: Servicio web para gestionar solicitudes de cambio y devolución de productos.
 *
 * Métodos:
 * - GET: Obtiene todas las solicitudes de cambio y devolución, o una solicitud específica si se proporciona el ID.
 * - POST: Crea una nueva solicitud de cambio o devolución.
 * - PUT: Actualiza el estado de una solicitud existente.
 * - GET: Obtiene una solicitud específica por su ID.
 *
 * Rutas:
 * - GET /solicitudCambioDevolucion.php: Obtiene todas las solicitudes.
 * - GET /solicitudCambioDevolucion.php?solicitudId=:id: Obtiene una solicitud específica por su ID.
 * - PUT /solicitudCambioDevolucion.php?solicitudId=:id: Actualiza el estado de una solicitud por su ID.
 *
 * Respuestas:
 * - GET: Devuelve un array de solicitudes en formato JSON, o un objeto de solicitud específica.
 * - POST: Devuelve un mensaje de éxito o error en formato JSON.
 * - PUT: Devuelve un mensaje de éxito o error en formato JSON.
 *
 * Manejo de errores:
 * - Si hay un error de conexión con la base de datos, se devuelve un mensaje de error.
 * - Si se envía una solicitud con un método no permitido, se devuelve un error 405 (Método no permitido).
 *
 * Dependencias:
 * - Conexión a la base de datos MySQL utilizando las credenciales proporcionadas.
 * - Encabezados CORS configurados para permitir solicitudes desde http://localhost:3000.
 */

// Configurar CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conectar a la base de datos (asegúrate de usar las credenciales correctas)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "abc";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener el método de la solicitud HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Manejar la solicitud OPTIONS para CORS
if ($method == "OPTIONS") {
    die(); // Terminar la solicitud
}

// Manejar las solicitudes según el método
switch ($method) {
    case 'GET':
        // Obtener el ID de la solicitud desde la URL
        $solicitudId = isset($_GET['solicitudId']) ? $_GET['solicitudId'] : null;

        if ($solicitudId !== null) {
            // Obtener los detalles de la solicitud
            $sql = "SELECT * FROM devolucion_cambio WHERE N_solicitud = $solicitudId";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $solicitud = $result->fetch_assoc();
                header('Content-Type: application/json');
                echo json_encode($solicitud);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Solicitud no encontrada"));
            }
        } else {
            // Obtener todas las solicitudes de cambio y devolución
            $sql = "SELECT * FROM devolucion_cambio";
            $result = $conn->query($sql);

            $solicitudes = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $solicitudes[] = $row;
                }
            }

            header('Content-Type: application/json');
            echo json_encode($solicitudes);
        }
        break;

    case 'POST':
        // Crear una nueva solicitud de cambio o devolución
        $data = json_decode(file_get_contents('php://input'), true);

        $Estado_solicitud_bool = $data['Estado_solicitud_bool'];
        $Motivo_solicitud = $data['Motivo_solicitud'];
        $Producto_relacionado = $data['Producto_relacionado'];
        $Mensaje_recivido_cliente = $data['Mensaje_recivido_cliente'];
        $correo_cliente = $data['correo_cliente'];
        $tipo_solicitud = $data['tipo_solicitud'];
        $nombreCliente = $data['nombreCliente'];
        $numeroContactoCliente = $data['numeroContactoCliente'];

        $sql = "INSERT INTO devolucion_cambio (Estado_solicitud_bool, Motivo_solicitud, Producto_relacionado, Mensaje_recivido_cliente, correo_cliente, tipo_solicitud, nombreCliente, numeroContactoCliente) 
                VALUES ('$Estado_solicitud_bool', '$Motivo_solicitud', '$Producto_relacionado', '$Mensaje_recivido_cliente', '$correo_cliente', '$tipo_solicitud', '$nombreCliente', '$numeroContactoCliente')";

        if ($conn->query($sql) === TRUE) {
            http_response_code(201);
            echo json_encode(array("message" => "Solicitud creada exitosamente"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error al crear la solicitud: " . $conn->error));
        }
        break;

    case 'PUT':
        // Obtener el ID de la solicitud desde la URL
        $solicitudId = isset($_GET['solicitudId']) ? $_GET['solicitudId'] : null;

        if ($solicitudId !== null) {
            // Obtener los datos actualizados de la solicitud
            $data = json_decode(file_get_contents('php://input'), true);
            $nuevoEstado = $data['Estado_solicitud_bool'];

            // Validar el nuevo estado de la solicitud
            if ($nuevoEstado !== null && in_array($nuevoEstado, array('0', '1'))) {
                // Actualizar el estado de la solicitud
                $sql = "UPDATE devolucion_cambio SET Estado_solicitud_bool = '$nuevoEstado' WHERE N_solicitud = $solicitudId";

                if ($conn->query($sql) === TRUE) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Estado de la solicitud actualizado con éxito"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error al actualizar el estado de la solicitud: " . $conn->error));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "El estado de la solicitud no es válido."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "ID de la solicitud no especificado."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido"));
        break;
}

$conn->close();
?>