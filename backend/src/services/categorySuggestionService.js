const KEYWORDS = {
  'Alimentos': ['supermercado', 'comida', 'restaurante', 'mcdonalds', 'burger', 'pizza', 'almuerzo', 'cena', 'delivery', 'pedidosya', 'rappi', 'fideos', 'pan', 'leche', 'carne', 'verdura', 'fruta'],
  'Transporte': ['taxi', 'uber', 'bus', 'subte', 'combustible', 'nafta', 'estacionamiento', 'peaje', 'remis', 'colectivo', 'tren', 'bicicleta', 'moto', 'auto'],
  'Entretenimiento': ['cine', 'netflix', 'spotify', 'teatro', 'concierto', 'juego', 'streaming', 'disney', 'amazon prime', 'hbo', 'youtube', 'twitch', 'playstation', 'xbox', 'steam'],
  'Servicios': ['luz', 'agua', 'gas', 'internet', 'telefono', 'celular', 'factura', 'antei', 'ute', 'ose'],
  'Salud': ['farmacia', 'medico', 'clinica', 'hospital', 'dentista', 'consultorio', 'medicamento', 'estudio', 'analisis', 'sangre', 'vacuna', 'seguro medico'],
  'Educación': ['curso', 'libro', 'universidad', 'colegio', 'escuela', 'capacitacion', 'coursera', 'udemy', 'platzi', 'clase', 'profesor'],
  'Compras': ['amazon', 'mercado libre', 'tienda', 'indumentaria', 'ropa', 'zapato', 'electrodomestico', 'tecnologia', 'celular', 'notebook', 'computadora'],
  'Salario': ['sueldo', 'honorario', 'pago', 'transferencia', 'deposito', 'salario', 'sueldo', 'ingreso'],
  'Inversiones': ['inversion', 'plazo fijo', 'acciones', 'dolar', 'crypto', 'bitcoin', 'ethereum', 'fci', 'fondo comun'],
  'Regalos': ['regalo', 'cumpleaños', 'aniversario', 'presente', 'detalle']
};

const categorizeByKeywords = (description) => {
  const lowerDesc = description.toLowerCase();
  
  for (const [category, words] of Object.entries(KEYWORDS)) {
    for (const word of words) {
      if (lowerDesc.includes(word)) {
        return category;
      }
    }
  }
  return 'Otros';
};

const suggestCategory = async (description, amount) => {
  if (!description || description.length < 3) {
    return null;
  }
  
  const category = categorizeByKeywords(description);
  
  if (amount > 0 && category === 'Otros') {
    if (description.toLowerCase().includes('sueldo') || 
        description.toLowerCase().includes('pago') ||
        description.toLowerCase().includes('transferencia')) {
      return 'Salario';
    }
  }
  
  return category;
};

module.exports = { suggestCategory };