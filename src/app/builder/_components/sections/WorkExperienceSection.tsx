"use client";

import { useState, useEffect } from "react";
import { useResumeContext } from "../ResumeContext";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DateInput from "./DateInput";

export default function WorkExperienceSection() {
  const { resumeData, updateExperience } = useResumeContext();
  const [experiences, setExperiences] = useState([...resumeData.experience]);

  useEffect(() => {
    setExperiences([...resumeData.experience]);
  }, [resumeData.experience]);

  const addExperience = () => {
    const newExperience = {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [""],
    };
    const updated = [...experiences, newExperience];
    setExperiences(updated);
    updateExperience(updated);
  };

  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    updateExperience(updated);
  };

  const updateExperienceField = (index: number, field: string, value: string | boolean) => {
    const updated = experiences.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp));
    setExperiences(updated);
    updateExperience(updated);
  };

  const addResponsibility = (expIndex: number) => {
    const updated = experiences.map((exp, i) => (i === expIndex ? { ...exp, responsibilities: [...exp.responsibilities, ""] } : exp));
    setExperiences(updated);
    updateExperience(updated);
  };

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const updated = experiences.map((exp, i) =>
      i === expIndex
        ? {
            ...exp,
            responsibilities: exp.responsibilities.map((resp, j) => (j === respIndex ? value : resp)),
          }
        : exp,
    );
    setExperiences(updated);
    updateExperience(updated);
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updated = experiences.map((exp, i) =>
      i === expIndex
        ? {
            ...exp,
            responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex),
          }
        : exp,
    );
    setExperiences(updated);
    updateExperience(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Work Experience</h2>
        <p className="text-white/70 text-sm">Your professional work history and achievements</p>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-white/30 rounded-lg">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="text-white/60 font-medium mb-2">No work experience added yet</h3>
          <p className="text-white/40 text-sm mb-4">Add your professional work history and achievements</p>
          <button
            onClick={addExperience}
            className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-medium rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Work Experience
          </button>
        </div>
      ) : (
        <>
          {experiences.map((experience, index) => (
            <div key={index} className="border border-white/20 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">Experience {index + 1}</h3>
                <button onClick={() => removeExperience(index)} className="text-red-400 hover:text-red-300 transition-colors">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={experience.jobTitle}
                    onChange={(e) => updateExperienceField(index, "jobTitle", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Company *</label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperienceField(index, "company", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="Tech Company Inc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => updateExperienceField(index, "location", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput
                  label="Start Date"
                  value={experience.startDate}
                  onChange={(value) => updateExperienceField(index, "startDate", value)}
                  placeholder="Select start month/year"
                  required
                />

                <DateInput
                  label="End Date"
                  value={experience.endDate}
                  onChange={(value) => updateExperienceField(index, "endDate", value)}
                  placeholder="Select end month/year"
                  disabled={experience.current}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={experience.current}
                  onChange={(e) => {
                    updateExperienceField(index, "current", e.target.checked);
                    if (e.target.checked) {
                      updateExperienceField(index, "endDate", "");
                    }
                  }}
                  className="mr-2 h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label htmlFor={`current-${index}`} className="text-white/80 text-sm">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Key Responsibilities & Achievements</label>
                <div className="space-y-2">
                  {experience.responsibilities.map((responsibility, respIndex) => (
                    <div key={respIndex} className="flex items-center gap-2">
                      <textarea
                        value={responsibility}
                        onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none"
                        placeholder="Describe your key responsibilities and achievements..."
                        rows={2}
                      />
                      {experience.responsibilities.length > 1 && (
                        <button onClick={() => removeResponsibility(index, respIndex)} className="text-red-400 hover:text-red-300 transition-colors">
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addResponsibility(index)}
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Responsibility
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addExperience}
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Another Experience
            </button>
          </div>
        </>
      )}
    </div>
  );
}
