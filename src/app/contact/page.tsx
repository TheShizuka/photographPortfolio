'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Use raw API to avoid the EmailJS library issues
    const data = {
      service_id: 'service_5ck1ufr',
      template_id: 'template_rujj67l',
      user_id: 'c1yNaQ3QmH7qPoDGX',
      template_params: {
        from_name: formState.name,
        reply_to: formState.email,
        message: formState.message
      }
    };
    
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (err: unknown) {
      console.error('Failed to send email:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to send: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      
      <section className="pt-36 md:pt-40 pb-20 px-6 md:px-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-12">
            Contact
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-white/80 text-lg font-light leading-relaxed mb-8">
                I&apos;m available for collaborations, exhibitions, and print enquiries. 
                Feel free to reach out with any questions or proposals.
              </p>
              
              <div className="space-y-4 text-white/70 font-light">
                <p>Email: <a href="mailto:ayatgimenez@hotmail.com" className="underline hover:text-white transition-colors">ayatgimenez@hotmail.com</a></p>
                <p>Instagram: <a href="https://www.instagram.com/shizuka.desu/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">@shizuka.desu</a></p>
                <p>Location: Valencia, Spain</p>
              </div>
            </div>
            
            <div>
              {submitted ? (
                <motion.div 
                  className="bg-white/5 rounded-lg p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl mb-4">Thank you for your message!</h3>
                  <p className="text-white/70">I&apos;ll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-6 px-6 py-2 border border-white/20 hover:border-white/50 transition-colors rounded"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-white/50 transition-colors text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-white/50 transition-colors text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-white/50 transition-colors text-white"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}