const { suggestCategory } = require('../services/categorySuggestionService');

const getCategorySuggestion = async (req, res) => {
  try {
    const { description, amount } = req.body;
    
    if (!description || description.length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: 'La descripción es muy corta (mínimo 3 caracteres)' 
      });
    }

    const category = await suggestCategory(description, amount || 0);
    
    res.json({ 
      success: true, 
      category: category || 'Otros',
      message: `Categoría sugerida: ${category || 'Otros'}`
    });
  } catch (error) {
    console.error('Error en sugerencia:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener sugerencia' 
    });
  }
};

module.exports = { getCategorySuggestion };