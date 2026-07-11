/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
// @ts-ignore
import companyLogo from './assets/images/technova_logo_1783741300515.jpg';
import { motion, AnimatePresence } from 'motion/react';
import { coursesData } from './coursesData';
import { 
  ArrowRight, 
  Menu, 
  X, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen, 
  Users, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  ShieldCheck,
  Send,
  HeartHandshake,
  Clock,
  ChevronDown,
  ChevronUp,
  Code2,
  Instagram,
  Linkedin,
  ArrowUp
} from 'lucide-react';

// Define the type for the custom ripple effect
interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Java Full Stack Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isContactHighlighted, setIsContactHighlighted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Track page scroll to toggle the Back To Top floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear errors when the modal state changes
  useEffect(() => {
    setSubmitError(null);
  }, [isContactModalOpen]);

  // Dynamic testimonial state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Software Engineer at Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      quote: "Tech Nova completely transformed my career trajectory. The direct placement assistance and high-quality courses gave me the edge I needed to land a role at Microsoft."
    },
    {
      name: "Priya Patel",
      role: "Data Analyst at IBM",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
      quote: "The practical, industry-aligned training at Tech Nova bridged the gap between theory and actual enterprise expectations. Highly recommended!"
    },
    {
      name: "Rohan Das",
      role: "Cloud Specialist at Google",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
      quote: "Their placement cell works tirelessly. I was matched with ideal tech recruiters within days of finishing my advanced cloud engineering certification."
    }
  ];

  // Handle ripple effect on button clicks
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size
    };
    
    setRipples((prev) => [...prev, newRipple]);
  };

  // Clean up ripples
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // Custom smooth scroll function with duration (800ms–1000ms)
  const smoothScrollTo = (targetId: string, duration: number) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    const headerOffset = 100; // Account for the sticky header height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, offsetPosition);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleGetInTouchClick = (e: React.MouseEvent) => {
    handleButtonClick(e);
    setActiveTab('Contact');
    smoothScrollTo('contact', 900); // Smooth scroll in 900ms
    setIsContactHighlighted(true);
    setTimeout(() => {
      setIsContactHighlighted(false);
    }, 2000); // Subtle highlight glow for exactly 2 seconds
  };

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitted(false);

    // Validation
    if (!contactForm.name.trim()) {
      setSubmitError('Please enter your Full Name.');
      return;
    }
    if (!contactForm.email.trim()) {
      setSubmitError('Please enter your Email Address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email.trim())) {
      setSubmitError('Please enter a valid Email Address.');
      return;
    }
    if (!contactForm.phone.trim()) {
      setSubmitError('Please enter your Phone Number.');
      return;
    }
    const cleanPhone = contactForm.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setSubmitError('Please enter a valid Phone Number with at least 10 digits.');
      return;
    }
    if (!contactForm.service || contactForm.service.trim() === '') {
      setSubmitError('Please select a course.');
      return;
    }

    setIsSubmitting(true);

    try {
  const serviceId = "service_sklut8p";
  const templateId = "template_6zv69zo";
  const publicKey = "YLri-D6rQpPKg0zRV";

  const templateParams = {
    name: contactForm.name.trim(),
    email: contactForm.email.trim(),
    phone: contactForm.phone.trim(),
    course: contactForm.service,
    message: contactForm.message.trim(),
    to_email: "technovacareersolutions@gmail.com"
  };

  await emailjs.send(
    serviceId,
    templateId,
    templateParams,
    publicKey
  );

  setIsSubmitting(false);
  setIsSubmitted(true);
  setSubmitError(null);

  setTimeout(() => {
    setIsSubmitted(false);
    setIsContactModalOpen(false);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      service: "Java Full Stack Development",
      message: ""
    });
  }, 4000);

} catch (error) {
  console.error("EmailJS submit error:", error);
}
      setIsSubmitting(false);
      setSubmitError('Failed to send enquiry. Please try again.');
    }
  };

  // Predefined service offerings
  const services = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "Executive Training",
      desc: "Tailored upskilling tracks for working professionals designed by industry tech leaders."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Placement Drives",
      desc: "Guaranteed enterprise-level interview rounds with tier-1 MNCs and global unicorn startups."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Industry Credentials",
      desc: "Globally recognized career certificates validating hands-on coding and systems proficiency."
    }
  ];

  // Course expansion state
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Helper render function for course cards to ensure perfect consistency
  const renderCard = (course: typeof coursesData[0]) => (
    <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-500/20 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-full group relative">
      <div>
        {/* Course Image & Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img 
            src={course.image} 
            alt={course.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Course Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50/95 backdrop-blur-sm border border-blue-100 uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              {course.badge}
            </span>
          </div>
          {/* Certificate Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50/95 backdrop-blur-sm border border-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-600" /> Certificate
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col">
          {/* Course Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug mb-2 line-clamp-2 min-h-[3.5rem] flex items-center">
            {course.title}
          </h3>
          
          {/* Course Description */}
          <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Level & Duration Details */}
          <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-slate-100 mb-4 bg-slate-50/50 rounded-xl px-3">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>{course.level} Level</span>
            </div>
          </div>

          {/* Skills List */}
          <div className="flex flex-wrap gap-1.5">
            {course.skills.map((skill, sIdx) => (
              <span 
                key={sIdx} 
                className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium border border-slate-200/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Enroll Button */}
      <div className="p-6 pt-0 mt-auto">
        <button 
          onClick={(e) => {
            handleButtonClick(e);
            setIsContactModalOpen(true);
          }}
          className="w-full py-3 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all cursor-pointer text-center text-sm flex items-center justify-center gap-2"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden pb-0">
      
      {/* BACKGROUND GRAPHIC ELEMENTS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-10 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[200px] left-10 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* STICKY MODERN PREMIUM NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 transition-all duration-300">
        <div id="main-navbar" className="max-w-7xl mx-auto h-20 bg-white/75 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(148,163,184,0.12)] flex items-center justify-between px-6 md:px-8 relative overflow-hidden transition-all duration-300">
          
          {/* Company Logo and Text Branding */}
          <a href="#home" onClick={() => setActiveTab('Home')} className="flex items-center gap-[15px] group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-xl p-1 transition-all">
            {/* Uploaded official Tech Nova Logo */}
            <img 
              src={companyLogo} 
              alt="Tech Nova Logo" 
              referrerPolicy="no-referrer"
              className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] lg:w-[55px] lg:h-[55px] object-contain mix-blend-multiply flex-shrink-0 transition-transform duration-500 group-hover:rotate-[15deg]"
            />

            <div className="flex flex-col justify-center">
              <span className="text-xl font-extrabold tracking-wider text-[#2563EB] font-display leading-tight m-0 p-0 select-none">
                TECH NOVA
              </span>
              <span className="text-[11px] tracking-[0.16em] uppercase text-slate-500 font-semibold leading-none mt-1 select-none font-sans">
                Career Solution
              </span>
            </div>
          </a>

          {/* Desktop Navigation pill-shaped buttons */}
          <nav className="hidden lg:flex items-center gap-2">
            {['Home', 'About', 'Services', 'Courses', 'Placement', 'Contact'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === 'Contact') {
                      smoothScrollTo('contact', 900);
                      setIsContactHighlighted(true);
                      setTimeout(() => {
                        setIsContactHighlighted(false);
                      }, 2000);
                    } else {
                      const element = document.getElementById(tab.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className={`relative overflow-hidden rounded-full font-semibold text-sm px-6 py-3 transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-blue-600/50 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-[0_4px_14px_0_rgba(37,99,235,0.35)] scale-100'
                      : 'bg-white text-blue-600 border-blue-600/20 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10'
                  }`}
                  id={`nav-btn-${tab.toLowerCase()}`}
                >
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side: Premium Contact Button & Hamburger */}
          <div className="flex items-center gap-4">
            
            {/* Premium "Get In Touch" Action Button with full spec list */}
            <button
              onClick={handleGetInTouchClick}
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm md:text-[15px] px-6 py-3 md:px-7 md:py-3.5 rounded-full shadow-[0_4px_18px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              id="header-get-in-touch"
            >
              {/* Dynamic Ripple Container */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="ripple-effect"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
              
              <span className="relative z-10 flex items-center gap-1.5 font-bold tracking-wide">
                Get In Touch
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-hamburger"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Hamburger target) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-4 right-4 top-24 bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-2xl rounded-2xl p-6 transition-all duration-300 z-50">
            <div className="flex flex-col gap-3">
              {['Home', 'About', 'Services', 'Courses', 'Placement', 'Contact'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMobileMenuOpen(false);
                      if (tab === 'Contact') {
                        smoothScrollTo('contact', 900);
                        setIsContactHighlighted(true);
                        setTimeout(() => {
                          setIsContactHighlighted(false);
                        }, 2000);
                      } else {
                        const element = document.getElementById(tab.toLowerCase());
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    className={`w-full py-3 px-5 rounded-xl font-bold text-base text-left transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.25)]'
                        : 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50 hover:border-blue-600/30'
                    }`}
                    id={`mobile-nav-btn-${tab.toLowerCase()}`}
                  >
                    <span>{tab}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* CORE PRESENTATION BODY */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6 relative z-10">

        {/* HERO INTRO & INTERACTIVE SHOWCASE FOR TECH NOVA */}
        <section id="home" className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Description */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 px-4.5 py-1.5 rounded-full text-blue-700 font-semibold text-xs md:text-sm tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin-slow" />
              <span>Unlocking Premium Career Transformations</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none font-display">
              Elevate Your Skillset.<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Secure Your Placement.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Tech Nova delivers a unified, high-tier modern curriculum pairing state-of-the-art software systems with direct, prioritized corporate hiring pipelines. Join over 8,000+ certified specialists active globally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              {/* Core "Get In Touch" Button Requested with Strict Requirements */}
              <button
                onClick={handleGetInTouchClick}
                className="relative overflow-hidden bg-[#2563EB] text-white font-bold text-lg w-full sm:w-[195px] h-[60px] rounded-[9999px] shadow-[0_4px_18px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.45)] transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-[3px] hover:scale-105 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-600/30 cursor-pointer"
                id="hero-main-get-in-touch"
              >
                {/* Dynamic Ripple Container */}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple-effect"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: ripple.size,
                      height: ripple.size,
                    }}
                  />
                ))}
                
                <span className="relative z-10">Get In Touch</span>
                {/* Font Awesome equivalent arrow inside a styled block */}
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('courses');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 h-[60px] rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-slate-100"
                id="hero-explore-courses"
              >
                Explore Courses
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-6 mt-4 border-t border-slate-200/70 w-full">
              <div>
                <p className="text-3xl font-extrabold text-blue-600 font-display">98.4%</p>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Placement Rate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 font-display">8,200+</p>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Alumni Active</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 font-display">120+</p>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Hiring Partners</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card showcasing the Learn -> Train -> Get Hired Roadmap */}
          <div className="lg:col-span-5 relative animate-fade-in flex items-center justify-center">
            {/* Centered relative wrapper specifically for the card boundaries */}
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-sm xl:max-w-md">
              <div className="rounded-[32px] bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 p-6 md:p-8 shadow-2xl border border-slate-800 text-white overflow-hidden float-slow transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] group">
                {/* Internal abstract ambient glowing lights */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col gap-8">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">CAREER ACCELERATION</span>
                      <h3 className="text-xl font-extrabold text-slate-100 font-display mt-0.5">Your Pathway</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE PATH
                    </div>
                  </div>

                  {/* Roadmap Timeline Container */}
                  <div className="relative flex flex-col gap-8 md:gap-9 pl-1">
                    
                    {/* Wavy/Dashed Curve Vector running vertically behind the milestones */}
                    <div className="absolute left-[23px] top-6 bottom-6 w-[2px] pointer-events-none overflow-visible">
                      <svg className="h-full w-6 overflow-visible" viewBox="0 0 24 100" preserveAspectRatio="none">
                        <path 
                          d="M 1 0 Q 16 25 1 50 T 1 100" 
                          fill="none" 
                          stroke="url(#roadmapLineGrad)" 
                          strokeWidth="2.5" 
                          strokeDasharray="6 4" 
                          className="opacity-40"
                        />
                        <defs>
                          <linearGradient id="roadmapLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#10B981" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Milestone 1: Learn */}
                    <div className="flex items-start gap-4 md:gap-5 relative z-10 group/item">
                      <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center milestone-glow text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase font-mono">STEP 01</span>
                        <h4 className="text-lg font-bold text-white mt-0.5 font-display flex items-center gap-1.5">
                          Learn
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover/item:translate-x-1 transition-transform" />
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          Master high-tier industry aligned curriculums with certified leading software engineers.
                        </p>
                      </div>
                    </div>

                    {/* Milestone 2: Train */}
                    <div className="flex items-start gap-4 md:gap-5 relative z-10 group/item">
                      <div className="w-12 h-12 rounded-full bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center milestone-glow text-indigo-400 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase font-mono">STEP 02</span>
                        <h4 className="text-lg font-bold text-white mt-0.5 font-display flex items-center gap-1.5">
                          Train
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover/item:translate-x-1 transition-transform" />
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          Solve professional hands-on team repository challenges & live software testing simulations.
                        </p>
                      </div>
                    </div>

                    {/* Milestone 3: Get Hired */}
                    <div className="flex items-start gap-4 md:gap-5 relative z-10 group/item">
                      <div className="w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center milestone-glow text-emerald-400 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase font-mono">STEP 03</span>
                        <h4 className="text-lg font-bold text-white mt-0.5 font-display flex items-center gap-1.5">
                          Get Hired
                          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          Secure top positions directly with Tech Nova's verified 120+ global enterprise partners.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: ABOUT */}
        <section id="about" className="py-16 border-t border-slate-200/60">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 font-bold text-xs tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
              OUR MISSION
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 font-display">
              About Tech Nova
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              We specialize in structured career acceleration, transforming talented individuals into highly productive engineering leads. With direct support from tier-1 MNCs, we bridge industry gaps securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Alignment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our syllabus parameters are formulated alongside tech managers from Google, Microsoft, and Infosys, guaranteeing practical job-ready knowledge.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dynamic Learning Rails</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Learn via complex project-based assignments, building real-world enterprise databases, microservices, and AI integrations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Priority Placement Cell</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every alumni obtains premium access to direct referral systems, priority corporate recruitment drives, and personalized mock interviews.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: SERVICES */}
        <section id="services" className="py-16 border-t border-slate-200/60">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 font-bold text-xs tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
              WHAT WE OFFER
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 font-display">
              Premium Services & Consulting
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              We guide students and seasoned engineers through complete career transition strategies. Explore how our tailored solution suite fits your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(service.icon, {
                    className: "w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300"
                  })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: COURSES */}
        <section id="courses" className="py-16 border-t border-slate-200/60">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 font-bold text-xs tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
              OUR COURSES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 font-display">
              Enterprise Certification Programs
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Every course contains direct hands-on coding sandboxes, dynamic database structures, and personal mentorship sessions to ensure real skill development.
            </p>
          </div>

          {/* Responsive Course Grid: 4 cols on desktop, 2 cols on tablet, 1 col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
            {coursesData.slice(0, 6).map((course) => (
              <div key={course.title} className="h-full">
                {renderCard(course)}
              </div>
            ))}
            
            <AnimatePresence mode="popLayout">
              {showAllCourses && coursesData.slice(6).map((course, idx) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.35, 
                    ease: "easeOut",
                    delay: (idx % 4) * 0.04
                  }}
                  className="h-full w-full flex flex-col"
                >
                  {renderCard(course)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Centered See More Courses / Show Less Button */}
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setShowAllCourses(!showAllCourses)} 
              className="inline-flex items-center gap-2 bg-white border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-bold px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.1)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>{showAllCourses ? "Show Less" : "See More Courses"}</span>
              {showAllCourses ? (
                <ChevronUp className="w-5 h-5 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 transition-transform" />
              )}
            </button>
          </div>
        </section>

        {/* SECTION: PLACEMENT */}
        <section id="placement" className="py-16 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
              <span className="text-blue-600 font-bold text-xs tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
                PLACEMENT DIRECTIVES
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight font-display">
                Elite Recruitment Drives & Support
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Our active Placement Office holds premium relationships with over 120 global tech enterprises. We schedule targeted referral initiatives and private recruitment calendars daily.
              </p>

              <div className="flex flex-col gap-3.5 w-full">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700"><strong className="font-bold">Guaranteed Interview Slots:</strong> Direct access to recruiter calendars bypasses cold online application forms.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700"><strong className="font-bold">Resume & Portfolio Tuning:</strong> Personal branding experts review your digital assets step by step.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700"><strong className="font-bold">Mock Recruiter Interrogations:</strong> Standardized technical stress tests prepare you for live assessment pressure.</p>
                </div>
              </div>
            </div>

            {/* Testimonials Interactive Container */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/70 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-10" />
              
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400 text-lg">★</span>
                ))}
                <span className="text-xs text-slate-400 font-bold ml-2">VERIFIED ALUMNI REVIEW</span>
              </div>

              <div className="min-h-[140px] text-slate-600 italic text-base md:text-lg leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-12 h-12 rounded-full border-2 border-blue-100 object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm md:text-base">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-slate-500 font-medium">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                        idx === activeTestimonial ? 'bg-blue-600 w-6' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Show testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CONTACT */}
        <section id="contact" className="py-16 border-t border-slate-200/60">
          <div className={`bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden transition-all duration-500 border border-white/10 ${
            isContactHighlighted ? 'contact-highlight-glow' : ''
          }`}>
            {/* Ambient decorative circle elements */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
              <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
                <span className="text-blue-300 font-bold text-xs tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  CONNECT WITH TECH NOVA
                </span>
                
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight font-display text-white">
                  Ready to Build Your Career?
                </h2>
                
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Have questions about our courses, placements, internships, certifications, or career guidance? Our counselors are ready to help you choose the right career path.
                </p>

                <div className="flex flex-col gap-4 mt-4 w-full">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 border border-white/10">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Phone</p>
                      <a href="tel:+919952077910" className="text-sm font-semibold text-slate-100 hover:text-blue-300 transition-colors">+91 99520 77910</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 border border-white/10">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Email</p>
                      <a href="mailto:technovacareersolutions@gmail.com" className="text-sm font-semibold text-slate-100 hover:text-blue-300 transition-colors">technovacareersolutions@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 border border-white/10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Location</p>
                      <p className="text-sm font-semibold text-slate-100">
                        Tech Nova Career Solution<br />
                        Chennai, Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Contact Form demonstration inside card */}
              <div className="lg:col-span-7">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg text-slate-100">
                  <h3 className="text-lg font-bold font-display text-white mb-6 flex items-center gap-2">
                    <Send className="w-5 h-5 text-blue-300" />
                    Admission & Course Enquiry
                  </h3>

                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-slate-900 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="e.g. Liam Sterling" 
                          className="w-full bg-slate-50/95 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-slate-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-1.5">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder="e.g. liam@example.com" 
                          className="w-full bg-slate-50/95 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-1.5">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          placeholder="e.g. +91 99520 77910" 
                          className="w-full bg-slate-50/95 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-slate-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-1.5">Select Course</label>
                        <select 
                          value={contactForm.service}
                          onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                          className="w-full bg-slate-50/95 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                        >
                          <option value="Java Full Stack Development">Java Full Stack Development</option>
                          <option value="Python Full Stack Development">Python Full Stack Development</option>
                          <option value="MERN Stack Development">MERN Stack Development</option>
                          <option value="MEAN Stack Development">MEAN Stack Development</option>
                          <option value="React JS Development">React JS Development</option>
                          <option value="Angular Development">Angular Development</option>
                          <option value="Node.js Development">Node.js Development</option>
                          <option value="Spring Boot Development">Spring Boot Development</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Cyber Security">Cyber Security</option>
                          <option value="Cloud Computing (AWS)">Cloud Computing (AWS)</option>
                          <option value="DevOps">DevOps</option>
                          <option value="Software Testing">Software Testing</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="Business Analytics">Business Analytics</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="Salesforce Development">Salesforce Development</option>
                          <option value="Flutter App Development">Flutter App Development</option>
                          <option value="Android App Development">Android App Development</option>
                          <option value="iOS App Development">iOS App Development</option>
                          <option value="Power BI">Power BI</option>
                          <option value="Tableau">Tableau</option>
                          <option value="SQL & Database Development">SQL & Database Development</option>
                          <option value="C Programming">C Programming</option>
                          <option value="C++">C++</option>
                          <option value="Java Programming">Java Programming</option>
                          <option value="Python Programming">Python Programming</option>
                          <option value="Web Development">Web Development</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-1.5">Message</label>
                      <textarea 
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Tell us about your educational background, career goals, or the course you're interested in." 
                        className="w-full bg-slate-50/95 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-slate-400"
                      />
                    </div>

                    {submitError && (
                      <div className="bg-rose-600/20 border border-rose-500/30 text-rose-100 p-4 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        {submitError}
                      </div>
                    )}

                    {isSubmitted ? (
                      <div className="bg-emerald-600 text-white p-4 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 animate-pulse">
                        <CheckCircle2 className="w-5 h-5" />
                        Thank you! Your enquiry has been submitted successfully.
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleButtonClick}
                        className="relative overflow-hidden w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold h-14 rounded-full shadow-[0_4px_18px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                        id="submit-contact-form"
                      >
                        {/* Dynamic Ripple Container */}
                        {ripples.map((ripple) => (
                          <span
                            key={ripple.id}
                            className="ripple-effect"
                            style={{
                              left: ripple.x,
                              top: ripple.y,
                              width: ripple.size,
                              height: ripple.size,
                            }}
                          />
                        ))}
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <span>Submit Enquiry</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* OVERLAY / POPUP FOR THE PREMIUM "GET IN TOUCH" IN HEADERS */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-lg overflow-hidden animate-scale-up relative">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-blue-100" />
                <h3 className="text-lg font-bold font-display">Tech Nova Consultations</h3>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Unlock instant admissions advice or schedule a customized placement analysis. Fill out the quick details below and our advisors will reach out.
              </p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Liam Sterling" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="liam@example.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    placeholder="e.g. +91 99520 77910" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Select Course</label>
                  <select 
                    value={contactForm.service}
                    onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  >
                    <option value="Java Full Stack Development">Java Full Stack Development</option>
                    <option value="Python Full Stack Development">Python Full Stack Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="MEAN Stack Development">MEAN Stack Development</option>
                    <option value="React JS Development">React JS Development</option>
                    <option value="Angular Development">Angular Development</option>
                    <option value="Node.js Development">Node.js Development</option>
                    <option value="Spring Boot Development">Spring Boot Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud Computing (AWS)">Cloud Computing (AWS)</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Software Testing">Software Testing</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Business Analytics">Business Analytics</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Salesforce Development">Salesforce Development</option>
                    <option value="Flutter App Development">Flutter App Development</option>
                    <option value="Android App Development">Android App Development</option>
                    <option value="iOS App Development">iOS App Development</option>
                    <option value="Power BI">Power BI</option>
                    <option value="Tableau">Tableau</option>
                    <option value="SQL & Database Development">SQL & Database Development</option>
                    <option value="C Programming">C Programming</option>
                    <option value="C++">C++</option>
                    <option value="Java Programming">Java Programming</option>
                    <option value="Python Programming">Python Programming</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Message</label>
                  <textarea 
                    rows={2}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Tell us about your educational background, career goals, or the course you're interested in." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {submitError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    {submitError}
                  </div>
                )}

                {isSubmitted ? (
                  <div className="bg-emerald-600 text-white p-4 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 animate-pulse">
                    <CheckCircle2 className="w-5 h-5" />
                    Thank you! Your enquiry has been submitted successfully.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleButtonClick}
                    className="relative overflow-hidden w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold h-12 rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {/* Dynamic Ripple Container */}
                    {ripples.map((ripple) => (
                      <span
                        key={ripple.id}
                        className="ripple-effect"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: ripple.size,
                          height: ripple.size,
                        }}
                      />
                    ))}
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#F59E0B] hover:bg-amber-500 text-white shadow-[0_4px_14px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 border border-amber-400/20"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-full bg-[#0F172A] text-slate-300 relative overflow-hidden mt-20">
        {/* Subtle top border with a blue gradient */}
        <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Column 1 - Company Info */}
            <div className="flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-[0_4px_12px_rgba(255,255,255,0.08)] border border-slate-800">
                  <img 
                    src={companyLogo} 
                    alt="Tech Nova Logo" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-wider text-white font-display leading-tight select-none">
                    TECH NOVA
                  </span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-blue-400 font-bold leading-none mt-1 select-none">
                    Career Solution
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Career guidance, technical training and placement support for students and professionals.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <h4 className="text-lg font-bold text-white font-display border-b border-slate-800/80 pb-2.5">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {['Home', 'About', 'Services', 'Courses', 'Placement', 'Contact'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => {
                        setActiveTab(tab);
                        const element = document.getElementById(tab.toLowerCase());
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="text-sm text-slate-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group cursor-pointer focus:outline-none focus:text-blue-400"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0" />
                      <span>{tab}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact Details */}
            <div className="flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <h4 className="text-lg font-bold text-white font-display border-b border-slate-800/80 pb-2.5">
                Contact
              </h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5 border border-blue-500/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-400 leading-relaxed pt-0.5">
                    Tech Nova Career Solution<br />
                    Chennai, Tamil Nadu, India
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5 border border-blue-500/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+919952077910" className="text-sm text-slate-400 hover:text-white transition-colors duration-300 leading-relaxed pt-0.5">+91 99520 77910</a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5 border border-blue-500/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:technovacareersolutions@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors duration-300 leading-relaxed pt-0.5">technovacareersolutions@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5 border border-blue-500/10">
                    <Globe className="w-4 h-4" />
                  </div>
                  <a href="https://www.technovacareersolutions.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors duration-300 leading-relaxed pt-0.5">www.technovacareersolutions.com</a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Follow Us */}
            <div className="flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <h4 className="text-lg font-bold text-white font-display border-b border-slate-800/80 pb-2.5">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-slate-800 text-slate-400 hover:bg-[#2563EB] hover:text-white hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center border border-slate-700/50 shadow-md group"
                >
                  <Instagram className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </a>
                <a 
                  href="#" 
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-full bg-slate-800 text-slate-400 hover:bg-[#2563EB] hover:text-white hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center border border-slate-700/50 shadow-md group"
                >
                  <Linkedin className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </a>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-800/80 my-10" />

          {/* Copyright Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400 text-center md:text-left select-none">
              © 2026 Tech Nova Career Solution. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
