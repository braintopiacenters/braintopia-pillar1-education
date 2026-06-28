"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  preselectedClass?: string;
  triggerText?: string;
  triggerClassName?: string;
}

export default function BookingModal({
  preselectedClass,
  triggerText = "Request more information",
  triggerClassName = "btn-primary px-6 py-3 rounded-full inline-flex items-center justify-center",
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    classInterest: preselectedClass || "",
    message: "",
  });

  const open = () => {
    setIsOpen(true);
    setSubmitted(false);
    setError(null);
  };

  const close = () => {
    setIsOpen(false);
    // reset form after close animation
    setTimeout(() => {
      setForm({
        name: "",
        email: "",
        phone: "",
        classInterest: preselectedClass || "",
        message: "",
      });
      setSubmitted(false);
      setError(null);
      setLoading(false);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmitted(true);

      // Auto close after success display
      setTimeout(() => {
        close();
      }, 2600);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        type="button"
        onClick={open} 
        className={triggerClassName}
      >
        {triggerText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={close}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="modal bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                      <div className="font-semibold text-xl">Request More Information</div>
                    </div>
                    <button onClick={close} className="text-brand-dark/50 hover:text-brand-dark">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-blue" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={form.email} 
                          onChange={handleChange} 
                          required 
                          className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-blue" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Phone (optional)</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={form.phone} 
                          onChange={handleChange} 
                          className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-blue" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Class of Interest</label>
                      <select 
                        name="classInterest" 
                        value={form.classInterest} 
                        onChange={handleChange} 
                        className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-blue bg-white"
                      >
                        <option value="">Select (optional)</option>
                        <option value="The Guide">The Guide</option>
                        <option value="The Caregiver">The Caregiver</option>
                        <option value="The Learner">The Learner</option>
                        <option value="The Bridge">The Bridge</option>
                        <option value="The Rebalancer">The Rebalancer</option>
                        <option value="The Different Thinker">The Different Thinker</option>
                        <option value="The Supporter">The Supporter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">What brings you here?</label>
                      <textarea 
                        name="message" 
                        value={form.message} 
                        onChange={handleChange} 
                        rows={3} 
                        placeholder="Share anything that would help us prepare for your conversation."
                        className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-blue resize-y" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary w-full py-3 rounded-full mt-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Request Assessment'}
                    </button>

                    <p className="text-[11px] text-center text-brand-dark/50">
                      We typically respond within 48 hours to schedule your QEEG.
                    </p>

                    {error && (
                      <p className="text-sm text-center text-[#ff2b32]">
                        {error}
                      </p>
                    )}
                  </form>
                </>
              ) : (
                <div className="p-10 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-brand-success/10 flex items-center justify-center">
                    <Check className="text-brand-success" size={26} />
                  </div>
                  <div className="font-semibold text-xl mb-2">Thank you.</div>
                  <p className="text-brand-dark/70">
                    A Braintopia team member will reach out within 48 hours to schedule your QEEG brain mapping assessment.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
