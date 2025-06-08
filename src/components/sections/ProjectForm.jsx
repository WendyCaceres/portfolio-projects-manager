import { useState } from 'react';

export default function ProjectForm({ setShowForm, setProjects }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    const newProject = await res.json();
    setProjects((prev) => [...prev, newProject]);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-10 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-200 dark:border-gray-700 space-y-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Agregar Proyecto</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all"
            required
            placeholder="Ejemplo: Mi Proyecto"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all resize-y h-40"
            required
            placeholder="Describe tu proyecto aquí..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all"
            required
            placeholder="https://ejemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Etiquetas (separadas por comas)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="React, Tailwind, Astro"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-8 mt-10">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 shadow-md hover:shadow-lg transition-all font-semibold"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}