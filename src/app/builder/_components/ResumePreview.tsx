"use client";

import { useResumeContext } from './ResumeContext';

export default function ResumePreview() {
  const { resumeData } = useResumeContext();

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
          {resumeData.personalInfo.website && (
            <a href={resumeData.personalInfo.website} className="hover:underline">
              Website
            </a>
          )}
          {resumeData.personalInfo.linkedin && (
            <a href={resumeData.personalInfo.linkedin} className="hover:underline">
              LinkedIn
            </a>
          )}
          {resumeData.personalInfo.github && (
            <a href={resumeData.personalInfo.github} className="hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {resumeData.professionalSummary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {resumeData.professionalSummary}
          </p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Work Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    {exp.responsibilities.map((resp, respIndex) => (
                      resp && (
                        <li key={respIndex} className="list-disc">
                          {resp}
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm font-medium text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.location}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.graduationDate}
                    {edu.gpa && <span className="ml-2">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Skills
          </h2>
          <div className="space-y-3">
            {resumeData.skills.map((skillCategory, index) => (
              skillCategory.category && (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      skill && (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{project.title}</h3>
                    {project.url && (
                      <a href={project.url} className="text-sm text-blue-600 hover:underline">
                        {project.url}
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {project.startDate} - {project.endDate || 'Present'}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      tech && (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Certifications
          </h2>
          <div className="space-y-3">
            {resumeData.certifications.map((cert, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                    {cert.url && (
                      <a href={cert.url} className="text-sm text-blue-600 hover:underline">
                        View Certificate
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your Resume Preview</h3>
          <p className="text-gray-600">
            Start filling out the form on the left to see your resume come to life!
          </p>
        </div>
      )}
    </div>
  );
}
