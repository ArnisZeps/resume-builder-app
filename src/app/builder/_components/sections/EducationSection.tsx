"use client";

import { useState, useEffect } from "react";
import { useResumeContext } from "../ResumeContext";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DateInput from "./DateInput";

export default function EducationSection() {
  const { resumeData, updateEducation } = useResumeContext();
  const [education, setEducation] = useState([...resumeData.education]);

  useEffect(() => {
    setEducation([...resumeData.education]);
  }, [resumeData.education]);

  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    };
    const updated = [...education, newEducation];
    setEducation(updated);
    updateEducation(updated);
  };

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    updateEducation(updated);
  };

  const updateEducationField = (index: number, field: string, value: string) => {
    const updated = education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu));
    setEducation(updated);
    updateEducation(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Education</h2>
        <p className="text-white/70 text-sm">Your educational background and academic achievements</p>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-white/30 rounded-lg">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443a55.381 55.381 0 015.25 2.882V15"
              />
            </svg>
          </div>
          <h3 className="text-white/60 font-medium mb-2">No education added yet</h3>
          <p className="text-white/40 text-sm mb-4">Add your educational background and achievements</p>
          <button
            onClick={addEducation}
            className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-medium rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>
      ) : (
        <>
          {education.map((edu, index) => (
            <div key={index} className="border border-white/20 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                {education.length > 1 && (
                  <button onClick={() => removeEducation(index)} className="text-red-400 hover:text-red-300 transition-colors">
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Degree *</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducationField(index, "degree", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Institution *</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducationField(index, "institution", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="University of Technology"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducationField(index, "location", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  placeholder="Boston, MA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput
                  label="Graduation Date"
                  value={edu.graduationDate}
                  onChange={(value) => updateEducationField(index, "graduationDate", value)}
                  placeholder="Select graduation month/year"
                />

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">GPA (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateEducationField(index, "gpa", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addEducation}
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Another Education
            </button>
          </div>
        </>
      )}
    </div>
  );
}
