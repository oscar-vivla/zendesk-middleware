export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Vivla API",
        version: "1.0.0",
        description: "API para gestionar tickets y reviews de Vivla"
    },
    servers: [
        {
            url: "/v1",
            description: "API v1"
        }
    ],
    paths: {
        "/tickets": {
            get: {
                summary: "Obtener lista de tickets",
                description: "Obtiene una lista paginada de tickets con opciones de ordenamiento",
                parameters: [
                    {
                        in: "query",
                        name: "page",
                        schema: {
                            type: "integer",
                            default: 1
                        },
                        description: "Número de página"
                    },
                    {
                        in: "query",
                        name: "per_page",
                        schema: {
                            type: "integer",
                            default: 25
                        },
                        description: "Número de elementos por página"
                    },
                    {
                        in: "query",
                        name: "sort_by",
                        schema: {
                            type: "string",
                            default: "created_at"
                        },
                        description: "Campo por el cual ordenar"
                    },
                    {
                        in: "query",
                        name: "sort_order",
                        schema: {
                            type: "string",
                            enum: ["asc", "desc"],
                            default: "desc"
                        },
                        description: "Orden de clasificación"
                    }
                ],
                responses: {
                    "200": {
                        description: "Lista de tickets obtenida exitosamente"
                    },
                    "500": {
                        description: "Error interno del servidor"
                    }
                }
            }
        },
        "/tickets/{id}": {
            get: {
                summary: "Obtener ticket por ID",
                description: "Obtiene un ticket específico por su ID",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string"
                        },
                        description: "ID del ticket"
                    }
                ],
                responses: {
                    "200": {
                        description: "Ticket encontrado"
                    },
                    "404": {
                        description: "Ticket no encontrado"
                    },
                    "500": {
                        description: "Error interno del servidor"
                    }
                }
            }
        },
        "/tickets/stats": {
            get: {
                summary: "Obtener estadísticas de tickets",
                description: "Obtiene estadísticas generales de los tickets",
                responses: {
                    "200": {
                        description: "Estadísticas obtenidas exitosamente"
                    },
                    "500": {
                        description: "Error interno del servidor"
                    }
                }
            }
        },
        "/reviews": {
            get: {
                summary: "Obtener reviews",
                description: "Obtiene una lista de reviews con opciones de filtrado",
                parameters: [
                    {
                        in: "query",
                        name: "type",
                        schema: {
                            type: "string",
                            enum: ["home", "stay"]
                        },
                        description: "Tipo de review (home o stay)"
                    },
                    {
                        in: "query",
                        name: "houseName",
                        schema: {
                            type: "string"
                        },
                        description: "Nombre de la casa para filtrar reviews"
                    }
                ],
                responses: {
                    "200": {
                        description: "Lista de reviews obtenida exitosamente"
                    },
                    "400": {
                        description: "Parámetros de filtrado inválidos"
                    },
                    "500": {
                        description: "Error interno del servidor"
                    }
                }
            }
        }
    }
};