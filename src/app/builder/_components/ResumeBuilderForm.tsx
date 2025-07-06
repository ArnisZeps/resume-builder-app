"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useResumeContext } from "./ResumeContext";

const resumeFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  professionalSummary: z.string().optional(),
});

type ResumeFormData = z.infer<typeof resumeFormSchema>;

export default function ResumeBuilderForm() {
  const { resumeData, updatePersonalInfo, updateProfessionalSummary } = useResumeContext();

  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      firstName: resumeData.personalInfo.firstName,
      lastName: resumeData.personalInfo.lastName,
      email: resumeData.personalInfo.email,
      phone: resumeData.personalInfo.phone,
      location: resumeData.personalInfo.location,
      website: resumeData.personalInfo.website,
      linkedin: resumeData.personalInfo.linkedin,
      github: resumeData.personalInfo.github,
      professionalSummary: resumeData.professionalSummary,
    },
  });

  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");
  const email = form.watch("email");
  const phone = form.watch("phone");
  const location = form.watch("location");
  const website = form.watch("website");
  const linkedin = form.watch("linkedin");
  const github = form.watch("github");
  const professionalSummary = form.watch("professionalSummary");

  useEffect(() => {
    updatePersonalInfo({
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phone: phone || "",
      location: location || "",
      website: website || "",
      linkedin: linkedin || "",
      github: github || "",
    });
  }, [firstName, lastName, email, phone, location, website, linkedin, github, updatePersonalInfo]);

  useEffect(() => {
    updateProfessionalSummary(professionalSummary || "");
  }, [professionalSummary, updateProfessionalSummary]);

  return (
    <div className="p-6 ">
      <div className="flex border-b border-white/20 flex-shrink-0 gap-9">
        <div >
          <h1 className="text-2xl font-bold text-white mb-1">Resume Builder</h1>
          <p className="text-white/80 text-sm">Fill out your information to build your resume</p>
        </div>
        <div className="flex-1 pt-6 pb-4">
          <button
            type="button"
            className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-semibold rounded-lg transition-all duration-200"
          >
            Save Resume
          </button>
        </div>
      </div>

      <div className="space-y-8 ">
        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Personal Information</h2>
            <p className="text-white/70 text-sm">Your basic contact information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">First Name *</label>
              <input
                {...form.register("firstName")}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="John"
              />
              {form.formState.errors.firstName && <p className="text-red-300 text-sm mt-1">{form.formState.errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Last Name *</label>
              <input
                {...form.register("lastName")}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="Doe"
              />
              {form.formState.errors.lastName && <p className="text-red-300 text-sm mt-1">{form.formState.errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="john.doe@email.com"
              />
              {form.formState.errors.email && <p className="text-red-300 text-sm mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Phone *</label>
              <input
                {...form.register("phone")}
                type="tel"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="+1 (555) 123-4567"
              />
              {form.formState.errors.phone && <p className="text-red-300 text-sm mt-1">{form.formState.errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Location *</label>
            <input
              {...form.register("location")}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              placeholder="New York, NY"
            />
            {form.formState.errors.location && <p className="text-red-300 text-sm mt-1">{form.formState.errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Website</label>
              <input
                {...form.register("website")}
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="https://yourwebsite.com"
              />
              {form.formState.errors.website && <p className="text-red-300 text-sm mt-1">{form.formState.errors.website.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">LinkedIn</label>
              <input
                {...form.register("linkedin")}
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="https://linkedin.com/in/johndoe"
              />
              {form.formState.errors.linkedin && <p className="text-red-300 text-sm mt-1">{form.formState.errors.linkedin.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">GitHub</label>
              <input
                {...form.register("github")}
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="https://github.com/johndoe"
              />
              {form.formState.errors.github && <p className="text-red-300 text-sm mt-1">{form.formState.errors.github.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Professional Summary</h2>
            <p className="text-white/70 text-sm">A brief overview of your professional background and key achievements</p>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Professional Summary</label>
            <textarea
              {...form.register("professionalSummary")}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none"
              placeholder="Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives."
            />
            {form.formState.errors.professionalSummary && (
              <p className="text-red-300 text-sm mt-1">{form.formState.errors.professionalSummary.message}</p>
            )}
            <p className="text-white/60 text-sm mt-2">Current length: {professionalSummary?.length || 0} characters</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Work Experience</h2>
            <p className="text-white/70 text-sm">Your professional work history and achievements</p>
          </div>

          <div className="text-center py-8 text-white/60">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Work Experience Section</h3>
            <p className="text-sm">Coming soon! Continue with the sections above.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Education</h2>
            <p className="text-white/70 text-sm">Your educational background and academic achievements</p>
          </div>

          <div className="text-center py-8 text-white/60">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Education Section</h3>
            <p className="text-sm">Coming soon! Continue with the sections above.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Skills</h2>
            <p className="text-white/70 text-sm">Your technical and professional skills</p>
          </div>

          <div className="text-center py-8 text-white/60">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Skills Section</h3>
            <p className="text-sm">Coming soon! Continue with the sections above.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Projects</h2>
            <p className="text-white/70 text-sm">Notable projects and portfolio items</p>
          </div>

          <div className="text-center py-8 text-white/60">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Projects Section</h3>
            <p className="text-sm">Coming soon! Continue with the sections above.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Certifications</h2>
            <p className="text-white/70 text-sm">Professional certifications and credentials</p>
          </div>

          <div className="text-center py-8 text-white/60">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Certifications Section</h3>
            <p className="text-sm">Coming soon! Continue with the sections above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
