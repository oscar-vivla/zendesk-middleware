import { getReportData, getReportDataByHomeId, getReportDataByUserId, getBreakdownData } from '../api/sheetDbApi.js';

export async function getReportList() {
    try {
        const reportData = await getReportData();


        return {
            status: 'success',
            data: reportData
        };
    } catch (error) {
        console.error('Error al obtener lista de reportes:', error);
        return {
            status: 'error',
            message: 'No se pudo obtener la lista de reportes',
            error: error.message
        };
    }
}

export async function getReportByHomeId(homeId) {
    try {
        const reportData = await getReportDataByHomeId(homeId);

        // Si no hay datos, retornar un mensaje específico
        if (!reportData || reportData.length === 0) {
            return {
                status: 'error',
                message: `No se encontraron reportes para la casa con ID: ${homeId}`
            };
        }

        return {
            status: 'success',
            data: reportData
        };
    } catch (error) {
        console.error(`Error al obtener reportes para la casa ${homeId}:`, error);
        return {
            status: 'error',
            message: `No se pudo obtener reportes para la casa con ID: ${homeId}`,
            error: error.message
        };
    }
}

export async function getReportByUserId(userId) {
    try {
        // Obtener reportes básicos por userId
        const reportData = await getReportDataByUserId(userId);

        // Si no hay datos, retornar un mensaje específico
        if (!reportData || reportData.length === 0) {
            return {
                status: 'error',
                message: `No se encontraron reportes para el usuario con ID: ${userId}`
            };
        }

        // Obtener datos detallados de la pestaña Detail
        const detailData = await getBreakdownData();

        // Filtrar los detalles que coincidan exactamente con el user_id
        const matchingDetails = detailData.filter(detail => detail.user_id === userId);

        // Enriquecer los datos del reporte con los detalles o mensaje informativo
        const enrichedData = reportData.map(report => {
            if (matchingDetails.length > 0) {
                // Si hay coincidencia, incluir los datos de desglose
                return {
                    ...report,
                    breakdown: matchingDetails[0]
                };
            } else {
                // Si no hay coincidencia, incluir mensaje informativo
                return {
                    ...report,
                    breakdown: { message: "No se encontró desglose" }
                };
            }
        });

        return {
            status: 'success',
            data: enrichedData
        };
    } catch (error) {
        console.error(`Error al obtener reportes para el usuario ${userId}:`, error);
        return {
            status: 'error',
            message: `No se pudo obtener reportes para el usuario con ID: ${userId}`,
            error: error.message
        };
    }
} 