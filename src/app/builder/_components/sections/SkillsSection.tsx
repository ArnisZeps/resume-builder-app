"use client";

import { useEffect, useState } from 'react';
import { useResumeContext } from '../ResumeContext';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SkillsSection() {
  const { resumeData, updateSkills } = useResumeContext();
  const [skills, setSkills] = useState([...resumeData.skills]);

  useEffect(() => {
      setSkills([...resumeData.skills]);
  }, [resumeData.skills]);

  const addSkillCategory = () => {
    const newCategory = {
      category: '',
      items: [''],
    };
    const updated = [...skills, newCategory];
    setSkills(updated);
    updateSkills(updated);
  };

  const removeSkillCategory = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    updateSkills(updated);
  };

  const updateCategoryName = (index: number, categoryName: string) => {
    const updated = skills.map((skill, i) => 
      i === index ? { ...skill, category: categoryName } : skill
    );
    setSkills(updated);
    updateSkills(updated);
  };

  const addSkillItem = (categoryIndex: number) => {
    const updated = skills.map((skill, i) => 
      i === categoryIndex 
        ? { ...skill, items: [...skill.items, ''] }
        : skill
    );
    setSkills(updated);
    updateSkills(updated);
  };

  const updateSkillItem = (categoryIndex: number, itemIndex: number, value: string) => {
    const updated = skills.map((skill, i) => 
      i === categoryIndex 
        ? { 
            ...skill, 
            items: skill.items.map((item, j) => j === itemIndex ? value : item) 
          }
        : skill
    );
    setSkills(updated);
    updateSkills(updated);
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = skills.map((skill, i) => 
      i === categoryIndex 
        ? { 
            ...skill, 
            items: skill.items.filter((_, j) => j !== itemIndex) 
          }
        : skill
    );
    setSkills(updated);
    updateSkills(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Skills</h2>
        <p className="text-white/70 text-sm">Your technical and professional skills organized by category</p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-white/30 rounded-lg">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <h3 className="text-white/60 font-medium mb-2">No skills added yet</h3>
          <p className="text-white/40 text-sm mb-4">Add your technical and professional skills organized by category</p>
          <button
            onClick={addSkillCategory}
            className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-medium rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Skill Category
          </button>
        </div>
      ) : (
        <>
          {skills.map((skillCategory, categoryIndex) => (
        <div key={categoryIndex} className="border border-white/20 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <label className="block text-white/80 text-sm font-medium mb-2">Category Name *</label>
              <input
                type="text"
                value={skillCategory.category}
                onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="e.g., Programming Languages, Frameworks, Tools"
              />
            </div>
            {skills.length > 1 && (
              <button
                onClick={() => removeSkillCategory(categoryIndex)}
                className="text-red-400 hover:text-red-300 transition-colors mt-8"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Skills</label>
            <div className="space-y-2">
              {skillCategory.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                  {skillCategory.items.length > 1 && (
                    <button
                      onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addSkillItem(categoryIndex)}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
              >
                <PlusIcon className="w-4 h-4" />
                Add Skill
              </button>
            </div>
          </div>
        </div>
      ))}

          <div className="text-center">
            <button
              onClick={addSkillCategory}
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Another Skill Category
            </button>
          </div>
        </>
      )}
    </div>
  );
}
