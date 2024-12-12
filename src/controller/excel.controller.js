import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controlador para procesar el archivo Excel
export const getTotalImporte = (req, res) => {
  // Ruta del archivo Excel (deberías poner la ruta correcta en tu sistema)
  const directoryPath = path.join(__dirname, './');  // Usamos __dirname para obtener el directorio actual
  const filePath = path.join(directoryPath, 'archivo.xlsx');  // Aquí agregamos el archivo específico

  // Verificar la ruta y mostrarla en consola
  console.log(`Buscando archivo en: ${filePath}`);

  try {
    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
      console.log('Archivo encontrado');
    } else {
      console.log('Archivo no encontrado');
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);

    // Obtener la primera hoja
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheet_name_list[0]];

    // Convertir la hoja a JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Imprimir los datos para verificar el contenido del archivo
   

    // Filtrar los datos donde 'anio_deuda' es 2024 y 'concepto' es 'IMP. PREDIAL'
    const filteredData = data.filter(row => {
       return row.anio_deuda === 2024 && row.concepto === 'IMP. PREDIAL';
    });

    // Imprimir las filas filtradas
    console.log('Datos filtrados:', filteredData[0].IMPORTE);
     // Obtener el valor de 'IMPORTE' de la primera fila filtrada
     const totalImporte = filteredData.length > 0 ? filteredData[0].IMPORTE : 0;
    const minimo=14891200.89
    const maximo=15113457.62
    const meta = [
        {
            id:1,
            totalImporte,
            um:minimo,
            avance: (totalImporte/minimo)*100,
            dif: Math.abs(minimo - totalImporte)      
        },
        {
            id:2,
            totalImporte,
            um:maximo,
            avance: (totalImporte/maximo)*100,
            dif: Math.abs(maximo - totalImporte)
        }

    ]

    

     // Devolver el resultado como respuesta
     res.status(200).json({
        ok:true ,
        meta
      });
   
 
   } catch (error) {
     // Manejo de errores
     res.status(500).json({ message: 'Error al procesar el archivo Excel', error: error.message });
   }
 };


 export const getIngresosFechas = (req, res) => {
  const directoryPath = path.join(__dirname, './'); // Usamos __dirname para obtener el directorio actual
  const filePath = path.join(directoryPath, 'ingresos.xlsx'); // Ruta completa al archivo Excel

  try {
    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
      console.log('Archivo encontrado');
    } else {
      console.log('Archivo no encontrado');
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);

    // Obtener la primera hoja
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheet_name_list[0]];

    // Convertir la hoja a JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Enviar las filas como respuesta JSON
    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al procesar el archivo Excel:', error.message);
    res.status(500).json({ message: 'Error al procesar el archivo Excel', error: error.message });
  }
};