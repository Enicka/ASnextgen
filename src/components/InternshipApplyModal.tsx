"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Award, BookOpen, GraduationCap, CheckCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InternshipApplyModal({ isOpen, onClose }: ModalProps) {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "Website Development",
    experience: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone / WhatsApp number is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.college.trim()) errs.college = "College / University name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (formStep === 1) {
      if (validateStep1()) {
        setFormStep(2);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset state after transition
    setTimeout(() => {
      setFormStep(1);
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        domain: "Website Development",
        experience: "",
      });
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", duration: 0.5 }
              }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-card border border-border shadow-2xl p-8"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Progress Steps Indicators */}
              {!submitted && (
                <div className="flex items-center gap-2 mb-6 w-3/4">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      formStep >= 1 ? "bg-gold text-black" : "bg-muted text-muted-foreground"
                    }`}>
                      1
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">Personal Info</span>
                  </div>
                  <div className={`h-0.5 flex-1 transition-all ${formStep >= 2 ? "bg-gold" : "bg-muted"}`} />
                  <div className="flex items-center gap-1.5">
                    <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      formStep === 2 ? "bg-gold text-black" : "bg-muted text-muted-foreground"
                    }`}>
                      2
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">Academic Details</span>
                  </div>
                </div>
              )}

              {/* Form Content */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {formStep === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <h2 className="text-xl font-bold font-display text-navy dark:text-white">Apply for Internship</h2>
                          <p className="text-xs text-muted-foreground mt-1">
                            Kickstart your career with real-time projects and certified experience.
                          </p>
                        </div>

                        {/* Name Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-navy/70 dark:text-slate-300">Full Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30`}
                          />
                          {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-navy/70 dark:text-slate-300">Email Address</label>
                          <input
                            type="email"
                            placeholder="johndoe@university.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30`}
                          />
                          {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
                        </div>

                        {/* Phone Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-navy/70 dark:text-slate-300">WhatsApp / Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+36 301234567 or +91 7339011916"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30`}
                          />
                          {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone}</span>}
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="w-full py-3.5 rounded-xl bg-navy text-white dark:bg-gold dark:text-black font-bold text-sm tracking-wider uppercase transition-transform hover:scale-[1.01] cursor-pointer"
                          >
                            Continue
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <h2 className="text-xl font-bold font-display text-navy dark:text-white">Academic Details</h2>
                          <p className="text-xs text-muted-foreground mt-1">
                            Eligibility: College / University students only.
                          </p>
                        </div>

                        {/* College Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-navy/70 dark:text-slate-300">College / University Name</label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3.5 top-3.5 text-muted-foreground" size={18} />
                            <input
                              type="text"
                              placeholder="Tech University of Budapest"
                              value={formData.college}
                              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                              className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.college ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30`}
                            />
                          </div>
                          {errors.college && <span className="text-[10px] text-red-500 font-semibold">{errors.college}</span>}
                        </div>

                        {/* Domain Select */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-navy/70 dark:text-slate-300">Select Domain</label>
                          <div className="relative">
                            <BookOpen className="absolute left-3.5 top-3.5 text-muted-foreground" size={18} />
                            <select
                              value={formData.domain}
                              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 appearance-none"
                            >
                              <option>Website Development</option>
                              <option>App Development</option>
                            </select>
                          </div>
                        </div>

                        {/* Short Experience Cover */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-navy/70 dark:text-slate-300">Prior Experience / GitHub Link</label>
                          <textarea
                            placeholder="Briefly tell us about projects you built or share a link to your GitHub profile..."
                            rows={3}
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                          />
                        </div>

                        {/* Highlight alert */}
                        <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl flex items-start gap-2.5">
                          <Award className="text-gold shrink-0 mt-0.5" size={16} />
                          <div>
                            <span className="text-[10px] font-bold uppercase text-gold">Notice</span>
                            <p className="text-[10px] text-muted-foreground">
                              This internship is <strong>unpaid</strong> (No Stipend). Outstanding performers will receive performance certificates and full-time employment priority.
                            </p>
                          </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setFormStep(1)}
                            className="flex-1 py-3.5 rounded-xl border border-border bg-card text-foreground hover:bg-muted font-bold text-sm tracking-wider uppercase transition-transform hover:scale-[1.01] cursor-pointer"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3.5 rounded-xl bg-navy text-white dark:bg-gold dark:text-black font-bold text-sm tracking-wider uppercase transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                            ) : (
                              <>
                                Apply Now
                                <Send size={14} />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              ) : (
                /* Success Animation Window */
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 space-y-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle size={44} />
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold font-display text-navy dark:text-white">Application Received!</h2>
                    <p className="text-sm text-muted-foreground px-4">
                      Thank you for applying, <strong className="text-navy dark:text-white">{formData.name}</strong>! We have registered your application for the <strong>{formData.domain}</strong> domain.
                    </p>
                  </div>

                  <div className="w-full bg-muted rounded-2xl p-4 border border-border text-left space-y-2 text-xs">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Registered Email:</span>
                      <span className="font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Domain:</span>
                      <span className="font-semibold text-gold">{formData.domain}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-foreground max-w-xs leading-normal">
                    We will review your application and reach out to you via WhatsApp or Email at the address provided. Have your university credentials ready.
                  </p>

                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full bg-navy text-white dark:bg-gold dark:text-black font-semibold text-sm transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
