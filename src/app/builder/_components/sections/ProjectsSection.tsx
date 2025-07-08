"use client";

import { useState } from 'react';
import { useResumeContext } from '../ResumeContext';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import DateInput from './DateInput';

export default function ProjectsSection() {
  const { resumeData, updateProjects } = useResumeContext();
  const [projects, setProjects] = useState(resumeData.projects);

  const addProject = () => {
    const newProject = {
      title: '',
      description: '',
      technologies: [''],
      url: '',
      startDate: '',
      endDate: '',
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    updateProjects(updated);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    updateProjects(updated);
  };

  const updateProjectField = (index: number, field: string, value: string) => {
    const updated = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updated);
    updateProjects(updated);
  };

  const addTechnology = (projectIndex: number) => {
    const updated = projects.map((project, i) => 
      i === projectIndex ? { ...project, technologies: [...project.technologies, ''] } : project
    );
    setProjects(updated);
    updateProjects(updated);
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    const updated = projects.map((project, i) => 
      i === projectIndex 
        ? { 
            ...project, 
            technologies: project.technologies.map((tech, j) => j === techIndex ? value : tech) 
          }
        : project
    );
    setProjects(updated);
    updateProjects(updated);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updated = projects.map((project, i) => 
      i === projectIndex 
        ? { 
            ...project, 
            technologies: project.technologies.filter((_, j) => j !== techIndex) 
          }
        : project
    );
    setProjects(updated);
    updateProjects(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Projects</h2>
        <p className="text-white/70 text-sm">Notable projects and portfolio items</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-white/30 rounded-lg">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-white/60 font-medium mb-2">No projects added yet</h3>
          <p className="text-white/40 text-sm mb-4">Add your first project to showcase your work</p>
          <button
            onClick={addProject}
            className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-medium rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>
      ) : (
        <>
          {projects.map((project, index) => (
            <div key={index} className="border border-white/20 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProjectField(index, 'title', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="E-commerce Platform"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project URL</label>
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => updateProjectField(index, 'url', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="https://github.com/user/project"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput
                  label="Start Date"
                  value={project.startDate}
                  onChange={(value) => updateProjectField(index, 'startDate', value)}
                  placeholder="Select start month/year"
                />

                <DateInput
                  label="End Date"
                  value={project.endDate}
                  onChange={(value) => updateProjectField(index, 'endDate', value)}
                  placeholder="Select end month/year"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProjectField(index, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none"
                  placeholder="Developed a full-stack e-commerce platform with user authentication, payment processing, and inventory management..."
                />
                <p className="text-white/60 text-sm mt-1">Current length: {project.description.length} characters</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-white/80 text-sm font-medium">Technologies Used</label>
                  <button
                    onClick={() => addTechnology(index)}
                    className="inline-flex items-center px-3 py-1 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Technology
                  </button>
                </div>
                <div className="space-y-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                        placeholder="React, Node.js, MongoDB..."
                      />
                      {project.technologies.length > 1 && (
                        <button
                          onClick={() => removeTechnology(index, techIndex)}
                          className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addProject}
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Another Project
            </button>
          </div>
        </>
      )}
    </div>
  );
}
