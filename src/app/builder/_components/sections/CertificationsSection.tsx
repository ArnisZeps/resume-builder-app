"use client";

import { useState } from 'react';
import { useResumeContext } from '../ResumeContext';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import DateInput from './DateInput';

export default function CertificationsSection() {
  const { resumeData, updateCertifications } = useResumeContext();
  const [certifications, setCertifications] = useState(resumeData.certifications);

  const addCertification = () => {
    const newCertification = {
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    const updated = [...certifications, newCertification];
    setCertifications(updated);
    updateCertifications(updated);
  };

  const removeCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    updateCertifications(updated);
  };

  const updateCertificationField = (index: number, field: string, value: string) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    setCertifications(updated);
    updateCertifications(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Certifications</h2>
        <p className="text-white/70 text-sm">Professional certifications and credentials</p>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-white/30 rounded-lg">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-white/60 font-medium mb-2">No certifications added yet</h3>
          <p className="text-white/40 text-sm mb-4">Add your professional certifications and credentials</p>
          <button
            onClick={addCertification}
            className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-medium rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Certification
          </button>
        </div>
      ) : (
        <>
          {certifications.map((certification, index) => (
            <div key={index} className="border border-white/20 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">Certification {index + 1}</h3>
                <button
                  onClick={() => removeCertification(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Certification Name *</label>
                  <input
                    type="text"
                    value={certification.name}
                    onChange={(e) => updateCertificationField(index, 'name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Issuing Organization *</label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => updateCertificationField(index, 'issuer', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput
                  label="Issue Date"
                  value={certification.date}
                  onChange={(value) => updateCertificationField(index, 'date', value)}
                  placeholder="Select issue month/year"
                  required
                />

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Credential URL</label>
                  <input
                    type="url"
                    value={certification.url}
                    onChange={(e) => updateCertificationField(index, 'url', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="https://aws.amazon.com/verification"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addCertification}
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Another Certification
            </button>
          </div>
        </>
      )}
    </div>
  );
}
