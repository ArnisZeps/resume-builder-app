"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form data:', data);
    reset();
    // Handle form submission here
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Have questions about our resume builder? Want to share feedback? We&apos;d love to hear from you!
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                {...register('name')}
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 transition-all duration-200"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 transition-all duration-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              {...register('subject')}
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 transition-all duration-200"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('message')}
              rows={6}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 transition-all duration-200 resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-violet-700 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-violet-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Or email us directly at{' '}
            <a href="mailto:hello@resumex.com" className="text-violet-700 hover:text-violet-600 font-semibold">
              hello@resumex.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
