import { executeQuery } from '../config/database.js'

export const getAllModules = async (req, res) => {
  try {
    const modules = await executeQuery('SELECT * FROM modules ORDER BY id ASC')
    
    // Parse JSON slides for each module
    modules.forEach(module => {
      module.slides = JSON.parse(module.slides || '[]')
    })
    
    res.json(modules)
  } catch (error) {
    console.error('Get modules error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
};

export const getModuleById = async (req, res) => {
  try {
    const moduleId = req.params.id
    const modules = await executeQuery('SELECT * FROM modules WHERE id = ?', [moduleId])
    
    if (modules.length === 0) {
      return res.status(404).json({ error: 'Module not found' })
    }
    
    const module = modules[0]
    // Parse JSON slides
    module.slides = JSON.parse(module.slides || '[]')
    
    res.json(module)
  } catch (error) {
    console.error('Get module error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
};
