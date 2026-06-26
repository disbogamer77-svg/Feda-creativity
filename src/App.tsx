import React, { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  MessageSquare, 
  Menu, 
  X, 
  Globe, 
  Check, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Send,
  Building
} from "lucide-react";
import { translations, coursesList, Course } from "./translations";
import fedaLogo from "./assets/images/feda_logo_1782447556197.jpg";

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Registration form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseId: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('feda_lang') as 'ar' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('feda_lang', newLang);
  };

  // Scroll detection for navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate real database or API logging
    setTimeout(() => {
      setIsSending(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const triggerWhatsAppRegistration = (courseName: string = "") => {
    const defaultMsg = isRtl 
      ? `مرحباً مؤسسة فداء للتدريب، أود الاستفسار والتسجيل في الدورات والبرامج التدريبية المتاحة.`
      : `Hello Feda Creativity, I would like to inquire about registering for your training programs.`;
    
    const filledMsg = isRtl
      ? `مرحباً مؤسسة فداء، أنا المتدرب ${formData.name || 'المهتم'}. أرغب بالتسجيل في دورة: ${courseName || formData.courseId || 'برامجكم المعتمدة'}. رقمي هو: ${formData.phone || 'المرفق'}.`
      : `Hello Feda, I am ${formData.name || 'interested'}. I would like to register for the course: ${courseName || formData.courseId || 'your accredited programs'}. My contact: ${formData.phone || 'provided'}.`;

    const finalMsg = encodeURIComponent(formData.name ? filledMsg : defaultMsg);
    // WhatsApp URL
    window.open(`https://wa.me/9647703177889?text=${finalMsg}`, '_blank', 'noopener,noreferrer');
  };

  // Filter courses based on active categories
  const filteredCourses = activeTab === 'all' 
    ? coursesList 
    : coursesList.filter(course => course.category === activeTab);

  // Categories helper
  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'mgmt', label: t.filterMgmt },
    { id: 'tech', label: t.filterTech },
    { id: 'lang', label: t.filterLang },
    { id: 'soft', label: t.filterSoft },
  ];

  return (
    <div className={`min-h-screen bg-[#070b19] text-gray-100 font-sans ${isRtl ? 'rtl-grid' : 'ltr-grid'} selection:bg-gold-400 selection:text-navy-950 overflow-x-hidden w-full max-w-full`}>
      
      {/* Background Decorative Grid and Glows wrapped in safe overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1635_1px,transparent_1px),linear-gradient(to_bottom,#0c1635_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-10 w-80 h-80 bg-navy-500/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-5 w-72 h-72 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* HEADER NAVBAR */}
      <header 
        id="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#070b19]/90 backdrop-blur-md border-b border-navy-800/80 py-4 shadow-lg shadow-black/20" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Institution Title */}
            <a href="#home" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 p-[1.5px] shadow-md shadow-gold-500/10 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img 
                    src={fedaLogo} 
                    alt="Feda Creativity Logo" 
                    className="w-full h-full object-cover rounded-[10px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-gray-100 to-gold-200 bg-clip-text text-transparent">
                  {isRtl ? "مؤسسة فداء" : "Feda Creativity"}
                </span>
                <span className="text-[10px] text-gold-400/90 font-medium tracking-wider uppercase -mt-1">
                  {isRtl ? "للإبداع والتطوير" : "Training & Development"}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium hover:text-gold-400 transition-colors duration-200">{t.navHome}</a>
              <a href="#courses" className="text-sm font-medium hover:text-gold-400 transition-colors duration-200">{t.navCourses}</a>
              <a href="#why-us" className="text-sm font-medium hover:text-gold-400 transition-colors duration-200">{t.navWhyUs}</a>
              <a href="#contact" className="text-sm font-medium hover:text-gold-400 transition-colors duration-200">{t.navContact}</a>
            </nav>

            {/* Language Switcher and CTA buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-navy-800 bg-navy-900/40 text-xs font-semibold hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300 cursor-pointer"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? "English" : "العربية"}</span>
              </button>

              <a 
                href="#contact" 
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 text-xs font-bold tracking-wide hover:from-gold-400 hover:to-gold-300 transition-all duration-300 shadow-md shadow-gold-500/15 hover:shadow-gold-400/25 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {t.registerNow}
              </a>
            </div>

            {/* Mobile Actions (Language Switch & Burger) */}
            <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={toggleLanguage}
                className="p-2 rounded-lg border border-navy-800 bg-navy-900/40 text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
                aria-label="Toggle Language"
              >
                <Globe className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-navy-800 bg-navy-900/60 text-gray-300 hover:text-gold-400 hover:bg-navy-900 transition-all cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#070b19] border-b border-navy-800/90 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <a 
                  href="#home" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-navy-900 text-base font-semibold transition-colors"
                >
                  {t.navHome}
                </a>
                <a 
                  href="#courses" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-navy-900 text-base font-semibold transition-colors"
                >
                  {t.navCourses}
                </a>
                <a 
                  href="#why-us" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-navy-900 text-base font-semibold transition-colors"
                >
                  {t.navWhyUs}
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-navy-900 text-base font-semibold transition-colors"
                >
                  {t.navContact}
                </a>
                <div className="pt-4 pb-2 border-t border-navy-800">
                  <a 
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold tracking-wide text-sm shadow-md"
                  >
                    {t.registerNow}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section 
        id="home" 
        className="relative pt-32 pb-20 md:pt-44 md:pb-32 flex items-center min-h-[90vh]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
              {/* Gold badge */}
              <div className={`flex justify-center ${isRtl ? 'lg:justify-start' : 'lg:justify-start'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-xs font-semibold text-gold-300">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                  <span>{t.badgeText}</span>
                </div>
              </div>

              {/* Headings */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                <span className="block glow-white">{t.heroTitle1}</span>
                <span className="block mt-2 text-gold-400 glow-gold">
                  {t.heroTitle2}
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a 
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold hover:from-gold-400 hover:to-gold-300 transition-all duration-300 shadow-lg shadow-gold-500/10 text-center flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>{t.ctaRegister}</span>
                  {isRtl ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
                </a>
                
                <a 
                  href="#courses"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-navy-700 bg-navy-900/50 hover:bg-navy-900 text-gray-200 font-bold transition-all duration-300 text-center hover:border-gold-500/40"
                >
                  {t.ctaExplore}
                </a>
              </div>

              {/* Licensing labels */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-gray-500 pt-4">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>{t.accreditedLabel}</span>
              </div>
            </div>

            {/* Hero Visual Display Dashboard (Merged with premium real education photo) */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-2xl bg-gradient-to-tr from-navy-800 to-navy-950 p-[1.5px] border border-navy-800/80 shadow-2xl shadow-gold-500/5 overflow-hidden">
                
                {/* Beautiful Unsplash background photo */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
                    alt="Feda Educational Center"
                    className="w-full h-full object-cover opacity-25"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/65 to-transparent" />
                </div>

                {/* Visual Glass Box Background */}
                <div className="absolute inset-0 bg-[#0c1229]/45 flex flex-col justify-between p-6 z-10">
                  
                  {/* Top Header Row of Visual App */}
                  <div className="flex items-center justify-between border-b border-navy-800/40 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">{isRtl ? "مؤسسة فداء للإبداع" : "FEDA CREATIVITY"}</span>
                  </div>

                  {/* Main Visual content */}
                  <div className="flex-1 py-6 flex flex-col justify-center space-y-4">
                    {/* Live Indicator Card */}
                    <div className="bg-navy-900/80 border border-navy-800/70 rounded-xl p-3.5 flex items-center justify-between shadow-lg transform hover:scale-[1.02] transition-transform">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gold-400" />
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-gray-400 font-medium">{isRtl ? "المتدربين المستمرين" : "Active Trainees"}</span>
                          <span className="text-sm font-bold text-white tracking-wide">340+ {isRtl ? "طالب" : "Students"}</span>
                        </div>
                      </div>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </div>

                    {/* Progress Monitor Card */}
                    <div className="bg-navy-900/80 border border-navy-800/70 rounded-xl p-3.5 space-y-2.5 shadow-lg transform hover:scale-[1.02] transition-transform">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-gold-400" />
                          <span className="text-[10px] text-gray-300 font-semibold">{isRtl ? "معدل النجاح والتوظيف" : "Employment Rate"}</span>
                        </div>
                        <span className="text-xs font-bold text-gold-400">94.2%</span>
                      </div>
                      <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-gold-500 to-gold-300 h-1.5 rounded-full" style={{ width: '94.2%' }} />
                      </div>
                    </div>

                    {/* Accredited Program Certificate Notice */}
                    <div className="bg-navy-900/80 border border-navy-800/70 rounded-xl p-3.5 flex items-center gap-3 shadow-lg transform hover:scale-[1.02] transition-transform">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-xs text-white font-bold">{isRtl ? "شهادات مهنية مرخصة" : "Licensed Credentials"}</span>
                        <span className="text-[10px] text-gray-400">{isRtl ? "معتمدة من وزارة العمل والتعليم العراقي" : "Ministry of Labor & Education Iraq"}</span>
                      </div>
                    </div>

                  </div>

                  {/* Footnote of Visual Screen */}
                  <div className="flex items-center justify-between border-t border-navy-800/40 pt-3 text-[10px] text-gray-500 font-mono">
                    <span>STABILITY: SECURE</span>
                    <span>BASRA - IQ</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="relative border-y border-navy-800 bg-[#050814]/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Stat 1 */}
            <div className="text-center space-y-2 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-400 tracking-tight block">
                {t.statsYears}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium max-w-[160px]">
                {t.statsYearsSub}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="text-center space-y-2 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-400 tracking-tight block">
                {t.statsGrads}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium max-w-[160px]">
                {t.statsGradsSub}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="text-center space-y-2 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-400 tracking-tight block">
                {t.statsCourses}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium max-w-[160px]">
                {t.statsCoursesSub}
              </span>
            </div>

            {/* Stat 4 */}
            <div className="text-center space-y-2 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-400 tracking-tight block">
                {t.statsRate}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium max-w-[160px]">
                {t.statsRateSub}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* TRAINING PROGRAMS (COURSES) SECTION */}
      <section id="courses" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header titles */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {t.coursesTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              {t.coursesSubtitle}
            </p>
            <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
          </div>

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/15"
                    : "bg-navy-900/40 text-gray-400 hover:text-white border border-navy-800 hover:border-navy-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dynamic Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const iconMap = {
                mgmt: <Building className="w-5 h-5 text-gold-400" />,
                tech: <BookOpen className="w-5 h-5 text-gold-400" />,
                lang: <Globe className="w-5 h-5 text-gold-400" />,
                soft: <Users className="w-5 h-5 text-gold-400" />
              };

              return (
                <div 
                  key={course.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-navy-900/60 to-navy-950/80 border border-navy-800 hover:border-gold-500/35 p-6 transition-all duration-300 shadow-xl hover:shadow-gold-500/5 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Image Header with category badge */}
                    <div className="relative h-44 -mx-6 -mt-6 mb-4 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={isRtl ? course.titleAr : course.titleEn} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/30" />
                      
                      {/* Floating Badge & Icon */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-navy-950/85 backdrop-blur-md border border-navy-800 flex items-center justify-center">
                        {iconMap[course.category]}
                      </div>
                      
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[10px] font-bold bg-gold-400 text-navy-950 px-2.5 py-1 rounded-full shadow-md">
                          {course.category === 'mgmt' ? t.filterMgmt :
                           course.category === 'tech' ? t.filterTech :
                           course.category === 'lang' ? t.filterLang : t.filterSoft}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
                        {isRtl ? course.titleAr : course.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed h-10">
                        {isRtl ? course.descAr : course.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Footer Stats / Button Row */}
                  <div className="pt-4 mt-4 border-t border-navy-800/85 flex flex-col space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-400/80" />
                        <span>{course.hours} {t.hours}</span>
                      </span>
                      <span className="bg-navy-950 text-gray-300 px-2 py-0.5 rounded border border-navy-800">
                        {isRtl ? course.levelAr : course.levelEn}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-2.5 rounded-lg border border-navy-800 bg-navy-900/30 hover:bg-gold-500 hover:text-navy-950 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-gold-500/40 cursor-pointer"
                    >
                      <span>{t.learnMore}</span>
                      {isRtl ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE FEDA SECTION */}
      <section id="why-us" className="relative py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header titles */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {t.whyUsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {t.whyUsSubtitle}
            </p>
            <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
          </div>

          {/* Grid Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Adv 1 */}
            <div className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-500">
                <Award className="w-6 h-6 text-gold-500" />
              </div>
              <div className="space-y-1 text-right">
                <h3 className="text-lg font-bold text-slate-900">{t.whyUs1Title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t.whyUs1Desc}</p>
              </div>
            </div>

            {/* Adv 2 */}
            <div className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-500">
                <Users className="w-6 h-6 text-gold-500" />
              </div>
              <div className="space-y-1 text-right">
                <h3 className="text-lg font-bold text-slate-900">{t.whyUs2Title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t.whyUs2Desc}</p>
              </div>
            </div>

            {/* Adv 3 */}
            <div className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-500">
                <Building className="w-6 h-6 text-gold-500" />
              </div>
              <div className="space-y-1 text-right">
                <h3 className="text-lg font-bold text-slate-900">{t.whyUs3Title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t.whyUs3Desc}</p>
              </div>
            </div>

            {/* Adv 4 */}
            <div className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-500">
                <Clock className="w-6 h-6 text-gold-500" />
              </div>
              <div className="space-y-1 text-right">
                <h3 className="text-lg font-bold text-slate-900">{t.whyUs4Title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t.whyUs4Desc}</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* GOOGLE MAPS SECTION */}
      <section className="py-24 relative overflow-hidden bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Location Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400 bg-gold-50 text-xs font-semibold text-gold-600">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                <span>{t.locationAddress}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                {t.locationTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t.locationSubtitle}
              </p>

              {/* Verified Address Detail Box */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex gap-4 items-start shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold-500" />
                </div>
                <div className="space-y-1.5 text-right">
                  <h4 className="font-bold text-slate-900 text-base">{t.locationAddress}</h4>
                  <p className="text-sm text-slate-700 font-medium">
                    {t.locationAddressDesc}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isRtl ? "البصرة، الجبيلة، بداية شارع السايلو" : "Basra, Al-Jubaila, Beginning of Silo Street"}
                  </p>
                </div>
              </div>

              {/* Direct Maps CTA button */}
              <a 
                href="https://maps.app.goo.gl/d5gwzmSPKU3pHkdf8"
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold hover:from-gold-400 hover:to-gold-300 transition-all duration-300 shadow-md shadow-gold-500/10 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.locationButton}</span>
              </a>
            </div>

            {/* Right Col: Premium Styled Map Frame */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xl p-[1px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11]">
                {/* Embedded Map Frame */}
                <iframe
                  title="Feda Creativity Google Maps Location"
                  src="https://maps.google.com/maps?q=%D8%A7%D9%84%D8%A8%D8%B5%D8%B1%D8%A9%D8%8C%20%D8%A7%D9%84%D8%AC%D8%A8%D9%84%D9%8A%D8%A9%D8%8C%20%D8%A8%D8%AF%D8%A7%D9%8A%D8%A9%20%D8%B4%D8%A7%D8%B1%D8%B9%20%D8%A7%D9%84%D8%B3%D8%A7%D9%8A%D9%84%D9%88&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full rounded-2xl filter contrast-[1.05] brightness-[0.95] grayscale-[10%]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & REGISTRATION FORM SECTION */}
      <section id="contact" className="py-24 relative bg-[#050814]/60 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  {t.contactTitle}
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  {t.contactSubtitle}
                </p>
              </div>

              {/* Direct Quick Channels Card */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg tracking-wide">{t.directContact}</h3>
                
                <div className="space-y-3">
                  {/* Phone */}
                  <a 
                    href="tel:+9647703177889"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0c1229]/60 border border-navy-800 hover:border-gold-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold-400/5 group-hover:bg-gold-500/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-gold-400" />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{isRtl ? "الهاتف" : "Phone Number"}</span>
                      <span className="text-sm sm:text-base text-white font-semibold tracking-wide ltr-grid">+964 770 317 7889</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <button 
                    onClick={() => triggerWhatsAppRegistration()}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#0c1229]/60 border border-navy-800 hover:border-gold-500/30 transition-all group text-right cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/5 group-hover:bg-green-500/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{isRtl ? "الواتساب" : "WhatsApp"}</span>
                      <span className="text-sm sm:text-base text-white font-semibold tracking-wide ltr-grid">+964 770 317 7889</span>
                    </div>
                  </button>

                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/feda_creativity?igsh=bTludHcwNms5NWVp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Feda Creativity official Instagram Profile"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0c1229]/60 border border-navy-800 hover:border-gold-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-pink-500/5 group-hover:bg-pink-500/10 flex items-center justify-center shrink-0">
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{isRtl ? "إنستغرام" : "Instagram Profile"}</span>
                      <span className="text-sm sm:text-base text-white font-semibold tracking-wide lowercase">@feda_creativity</span>
                    </div>
                  </a>
                </div>
              </div>

            </div>

            {/* Right: Premium Interactive Intake Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-gradient-to-b from-navy-900/40 to-navy-950/80 border border-navy-800/80 p-6 sm:p-8 shadow-2xl relative">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="intake-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit} 
                      className="space-y-5"
                    >
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs sm:text-sm text-gray-300 font-semibold">{t.formName}</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-500/60 transition-colors"
                          placeholder={isRtl ? "اكتب اسمك الثلاثي الكامل" : "Enter your full name"}
                        />
                      </div>

                      {/* Grid Phone and Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone field */}
                        <div className="space-y-1.5">
                          <label htmlFor="phone" className="text-xs sm:text-sm text-gray-300 font-semibold">{t.formPhone}</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-500/60 transition-colors"
                            placeholder="+964..."
                          />
                        </div>

                        {/* Email field */}
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs sm:text-sm text-gray-300 font-semibold">{t.formEmail}</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-500/60 transition-colors"
                            placeholder="username@domain.com"
                          />
                        </div>
                      </div>

                      {/* Custom Selected Course Field */}
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm text-gray-300 font-semibold block">{t.formCourse}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1.5 custom-scrollbar">
                          {coursesList.map((c) => {
                            const isSelected = formData.courseId === (isRtl ? c.titleAr : c.titleEn);
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, courseId: isRtl ? c.titleAr : c.titleEn }))}
                                className={`flex items-center gap-3 p-3 rounded-xl border text-right transition-all duration-300 text-xs sm:text-sm font-semibold cursor-pointer ${
                                  isSelected 
                                    ? "bg-gold-500/15 border-gold-500 text-gold-300 shadow-md shadow-gold-500/10" 
                                    : "bg-navy-950/60 border-navy-800 text-gray-300 hover:border-gold-500/20 hover:bg-navy-900/40"
                                }`}
                              >
                                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSelected ? "bg-gold-400 animate-pulse" : "bg-navy-800 border border-navy-700"}`} />
                                <span className="line-clamp-1">{isRtl ? c.titleAr : c.titleEn}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs sm:text-sm text-gray-300 font-semibold">{t.formMsg}</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-500/60 transition-colors resize-none"
                          placeholder={isRtl ? "رسالة إضافية للمستشار أو المتطلبات الخاصة بك..." : "Additional message or requirements for the advisor..."}
                        />
                      </div>

                      {/* Submit Trigger */}
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold hover:from-gold-400 hover:to-gold-300 transition-all duration-300 shadow-md shadow-gold-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSending ? t.formSending : t.formSubmit}</span>
                      </button>

                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{t.formSuccess}</h3>
                        <p className="text-sm text-gray-400 max-w-md">
                          {t.formSuccessDesc}
                        </p>
                      </div>

                      {/* Immediate WhatsApp link to follow up */}
                      <div className="pt-4 w-full space-y-3">
                        <button
                          onClick={() => triggerWhatsAppRegistration(formData.courseId)}
                          className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-600/15 cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{t.formSuccessWA}</span>
                        </button>

                        <button
                          onClick={() => {
                            setFormData({ name: "", phone: "", email: "", courseId: "", message: "" });
                            setFormSubmitted(false);
                          }}
                          className="text-xs text-gray-500 hover:text-gold-400 transition-colors"
                        >
                          {isRtl ? "تقديم طلب تسجيل آخر" : "Submit another registration"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-navy-800 bg-[#040611] py-12 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Logo copyright */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center overflow-hidden border border-gold-400">
                  <img 
                    src={fedaLogo} 
                    alt="Feda Creativity Logo" 
                    className="w-full h-full object-cover rounded-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold text-sm text-white">{isRtl ? "مؤسسة فداء للتدريب" : "Feda Creativity"}</span>
              </div>
              <p className="text-gray-500 text-[11px]">
                {t.footerRights}
              </p>
            </div>

            {/* Middle: Clean address line */}
            <div className="flex flex-col items-center">
              <span className="text-gray-400 font-semibold block mb-1">{t.quickInfo}</span>
              <p className="text-gray-500 text-[11px]">
                {t.footerAddress}
              </p>
            </div>

            {/* Right: Social Media Handles */}
            <div className="flex items-center justify-center md:justify-end gap-4">
              <a 
                href="https://www.instagram.com/feda_creativity?igsh=bTludHcwNms5NWVp" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-full border border-navy-800 bg-navy-900/40 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button 
                onClick={() => triggerWhatsAppRegistration()}
                className="p-2 rounded-full border border-navy-800 bg-navy-900/40 text-gray-400 hover:text-green-400 hover:border-green-500/30 transition-all cursor-pointer"
                aria-label="WhatsApp Contact"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </footer>

      {/* FLOAT WHATSAPP BUTTON */}
      {/* 
        - Reduced size by 20%
        - Moved slightly away from edges
        - Safe margins
        - Hover/Pulse every few seconds using keyframes
        - Shadow reduced and soft
      */}
      <a
        href="https://wa.me/9647703177889"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Feda Creativity on WhatsApp"
        className={`fixed z-40 p-3 rounded-full bg-green-500 text-white shadow-md shadow-green-500/10 border border-green-400 hover:scale-105 transition-all duration-300 cursor-pointer ${
          isRtl ? 'bottom-6 left-6' : 'bottom-6 right-6'
        }`}
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-current" />
          {/* Subtle pulse border ring */}
          <span className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-30 pointer-events-none" />
        </div>
      </a>

      {/* COURSE DETAILS MODAL */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`relative max-w-xl w-full rounded-2xl bg-gradient-to-b from-navy-900 to-[#070b19] border border-navy-800/80 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] ${
                isRtl ? 'rtl-grid' : 'ltr-grid'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-lg border border-navy-800 bg-navy-950/80 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                
                {/* Modal header with icon and category */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-500/20 flex items-center justify-center">
                    <GraduationCap className="w-5.5 h-5.5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-gold-500/10 text-gold-300 px-2.5 py-1 rounded-full">
                      {selectedCourse.category === 'mgmt' ? t.filterMgmt :
                       selectedCourse.category === 'tech' ? t.filterTech :
                       selectedCourse.category === 'lang' ? t.filterLang : t.filterSoft}
                    </span>
                  </div>
                </div>

                {/* Course Titles */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {isRtl ? selectedCourse.titleAr : selectedCourse.titleEn}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400/80" />
                      <span>{selectedCourse.hours} {t.hours}</span>
                    </span>
                    <span className="bg-navy-950 text-gray-300 px-2 py-0.5 rounded border border-navy-800">
                      {isRtl ? selectedCourse.levelAr : selectedCourse.levelEn}
                    </span>
                  </div>
                </div>

                {/* Course Long Description */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400">{isRtl ? "حول البرنامج التدريبي" : "About the Program"}</h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {isRtl ? selectedCourse.descAr : selectedCourse.descEn}
                  </p>
                </div>

                {/* Course Modules/Features Bulletpoints */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400">{isRtl ? "مخرجات الدورة والمنهاج" : "Curriculum & Learning Outcomes"}</h4>
                  <div className="space-y-2">
                    {(isRtl ? selectedCourse.featuresAr : selectedCourse.featuresEn).map((feat, index) => (
                      <div key={index} className="flex gap-2.5 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-400/10 border border-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-gold-400" />
                        </div>
                        <span className="text-sm text-gray-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to actions in modal */}
                <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setFormData(prev => ({ ...prev, courseId: isRtl ? selectedCourse.titleAr : selectedCourse.titleEn }));
                      // Scroll to contact form smoothly
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold hover:from-gold-400 hover:to-gold-300 transition-all duration-300 text-sm text-center cursor-pointer"
                  >
                    {t.ctaRegister}
                  </button>
                  
                  <button
                    onClick={() => triggerWhatsAppRegistration(isRtl ? selectedCourse.titleAr : selectedCourse.titleEn)}
                    className="flex-1 py-3 rounded-xl bg-[#0c1229]/60 border border-navy-800 text-white font-bold hover:bg-navy-900 transition-all duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-green-400" />
                    <span>{isRtl ? "استفسار مباشر عبر واتساب" : "Direct WhatsApp Inquiry"}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
