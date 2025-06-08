import { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm.jsx';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Agregar
      </button>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="border rounded p-4">
              <header>
                <h3 className="text-lg font-semibold">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="text-sm">{project.description}</p>
              </header>
              <footer className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </footer>
              <div className="mt-2">
                <a
                  href={`/projects/${project.id}/edit`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Editar
                </a>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-md w-full">
            <ProjectForm setShowForm={setShowForm} setProjects={setProjects} />
          </div>
        </div>
      )}
    </div>
  );
}