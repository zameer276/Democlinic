import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChevronRight, 
  Star, 
  Calendar, 
  User, 
  ShieldCheck, 
  Stethoscope, 
  Smile, 
  Menu, 
  X,
  MessageCircle,
  LayoutDashboard,
  CheckCircle2,
  Trash2,
  Plus,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Appointment, Service, Testimonial } from './types';

// --- Mock Data ---
const SERVICES: Service[] = [
  { id: '1', title: 'General Dentistry', description: 'Comprehensive oral exams, cleanings, and preventive care for the whole family.', icon: 'Stethoscope' },
  { id: '2', title: 'Cosmetic Dentistry', description: 'Teeth whitening, veneers, and smile makeovers to boost your confidence.', icon: 'Smile' },
  { id: '3', title: 'Orthodontics', description: 'Modern braces and clear aligners to straighten your teeth effectively.', icon: 'ShieldCheck' },
  { id: '4', title: 'Dental Implants', description: 'Permanent solutions for missing teeth that look and feel natural.', icon: 'Plus' },
  { id: '5', title: 'Oral Surgery', description: 'Expert surgical procedures including wisdom tooth extractions.', icon: 'User' },
  { id: '6', title: 'Emergency Care', description: 'Immediate attention for dental pain, broken teeth, and other emergencies.', icon: 'Clock' },
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Patient', content: 'The best dental experience I\'ve ever had. Dr. Smith and the team are incredibly professional and caring.', rating: 5, image: 'https://picsum.photos/seed/p1/100/100' },
  { id: '2', name: 'Michael Chen', role: 'Patient', content: 'I was nervous about my root canal, but they made me feel completely at ease. Highly recommend!', rating: 5, image: 'https://picsum.photos/seed/p2/100/100' },
  { id: '3', name: 'Emily Davis', role: 'Patient', content: 'Beautiful clinic and state-of-the-art equipment. My kids actually enjoy going to the dentist now!', rating: 5, image: 'https://picsum.photos/seed/p3/100/100' },
];

const GALLERY_IMAGES = [
  'https://picsum.photos/seed/dental1/800/600',
  'https://picsum.photos/seed/dental2/800/600',
  'https://picsum.photos/seed/dental3/800/600',
  'https://picsum.photos/seed/dental4/800/600',
  'https://picsum.photos/seed/dental5/800/600',
  'https://picsum.photos/seed/dental6/800/600',
];

// --- Components ---

const Navbar = ({ onAdminToggle, isAdmin }: { onAdminToggle: () => void, isAdmin: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Smile size={24} />
          </div>
          <span className={cn("text-xl font-bold tracking-tight", isScrolled ? "text-slate-900" : "text-white")}>
            BrightSmile
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onAdminToggle}
            className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-white/90 hover:bg-white/10"
            )}
            title="Admin Dashboard"
          >
            <LayoutDashboard size={20} />
          </button>
          <a 
            href="#appointment"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={onAdminToggle}
            className={cn(isScrolled ? "text-slate-900" : "text-white")}
          >
            <LayoutDashboard size={20} />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(isScrolled ? "text-slate-900" : "text-white")}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-slate-700 hover:text-blue-600"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#appointment"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/dental-hero/1920/1080" 
          alt="Modern Dental Clinic" 
          className="w-full h-full object-cover brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-sm border border-blue-500/30">
            Welcome to BrightSmile
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Your Smile Is Our <span className="text-blue-400">Top Priority</span>
          </h1>
          <p className="text-xl text-blue-50/80 mb-10 leading-relaxed">
            Experience world-class dental care with state-of-the-art technology and a team dedicated to your comfort and oral health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#appointment" 
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
            >
              Book Appointment <ArrowRight size={20} />
            </a>
            <a 
              href="#services" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all text-center"
            >
              Our Services
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  className="w-12 h-12 rounded-full border-2 border-blue-900 object-cover"
                  alt="Patient"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-white text-sm font-medium">Trusted by 5,000+ Happy Patients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/doctor/800/1000" 
                alt="Dr. Alexander Smith" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold mb-1">15+</p>
              <p className="text-sm font-medium text-blue-100 uppercase tracking-wider">Years of Experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">About the Doctor</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Meet Dr. Alexander Smith, <br /> Your Partner in Oral Health
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Dr. Smith graduated with honors from the University of Dental Medicine and has since dedicated his career to providing compassionate, high-quality dental care. He believes that a healthy smile is the foundation of overall well-being.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              With advanced training in cosmetic and restorative dentistry, Dr. Smith combines artistic vision with clinical excellence to deliver results that are both beautiful and functional.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                'Expert in Cosmetic Dentistry',
                'Advanced Implant Training',
                'Patient-Centered Approach',
                'State-of-the-art Technology'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <button className="group flex items-center gap-3 text-blue-600 font-bold text-lg">
              Read More About Our Team 
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Services</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Dental Care for You</h2>
          <p className="text-lg text-slate-600">
            From routine checkups to complex restorative procedures, we offer a full range of dental services tailored to your unique needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon === 'Stethoscope' && <Stethoscope size={28} />}
                {service.icon === 'Smile' && <Smile size={28} />}
                {service.icon === 'ShieldCheck' && <ShieldCheck size={28} />}
                {service.icon === 'Plus' && <Plus size={28} />}
                {service.icon === 'User' && <User size={28} />}
                {service.icon === 'Clock' && <Clock size={28} />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <a href="#appointment" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ChevronRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppointmentSection = ({ onBook }: { onBook: (app: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Dentistry',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onBook(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: 'General Dentistry', date: '', time: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="appointment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Smile?</h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Book your appointment today and take the first step towards a healthier, brighter smile. Our team is ready to provide you with the best care.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Call Us Directly</p>
                  <p className="text-xl font-bold">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Email Support</p>
                  <p className="text-xl font-bold">hello@brightsmile.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Our Location</p>
                  <p className="text-xl font-bold">123 Dental Plaza, New York</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Appointment Requested!</h3>
                <p className="text-slate-600">We'll contact you shortly to confirm your visit.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-blue-600 font-bold"
                >
                  Book Another Appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Select Service</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Preferred Date</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Preferred Time</label>
                    <input 
                      required
                      type="time" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Patients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="flex text-yellow-400 mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Gallery</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Inside Our Modern Clinic</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-lg"
            >
              <img src={img} alt="Clinic" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Contact Us</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Get In Touch With Us</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Our Address</h4>
                  <p className="text-slate-600">123 Dental Plaza, Medical District, New York, NY 10001</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Phone Number</h4>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                  <p className="text-slate-600">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Opening Hours</h4>
                  <p className="text-slate-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-slate-600">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] overflow-hidden shadow-2xl h-[500px] border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Smile size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight">BrightSmile</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Providing exceptional dental care with a personal touch. Your health and comfort are our primary concerns.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              {['Home', 'About Us', 'Our Services', 'Gallery', 'Contact'].map(link => (
                <li key={link}><a href="#" className="hover:text-blue-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-slate-400">
              {['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Dental Implants', 'Oral Surgery'].map(link => (
                <li key={link}><a href="#" className="hover:text-blue-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-6">Subscribe to get the latest news and oral health tips.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 border-none rounded-xl px-4 py-3 flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/15551234567" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
  >
    <MessageCircle size={32} />
  </a>
);

// --- Admin Dashboard ---

const AdminDashboard = ({ 
  appointments, 
  onClose,
  onStatusChange,
  onDelete
}: { 
  appointments: Appointment[], 
  onClose: () => void,
  onStatusChange: (id: string, status: Appointment['status']) => void,
  onDelete: (id: string) => void
}) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Admin Dashboard</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
        >
          <X size={24} />
        </button>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'blue' },
              { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, icon: Clock, color: 'amber' },
              { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: CheckCircle2, color: 'green' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", `bg-${stat.color}-50 text-${stat.color}-600`)}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Recent Appointments</h3>
              <div className="flex gap-2">
                <button className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{app.name}</p>
                          <p className="text-xs text-slate-500">{app.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-700">{app.service}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-900 font-medium">{app.date}</p>
                          <p className="text-xs text-slate-500">{app.time}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                            app.status === 'pending' && "bg-amber-50 text-amber-600",
                            app.status === 'confirmed' && "bg-green-50 text-green-600",
                            app.status === 'cancelled' && "bg-rose-50 text-rose-600"
                          )}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {app.status === 'pending' && (
                              <button 
                                onClick={() => onStatusChange(app.id, 'confirmed')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Confirm"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                            )}
                            <button 
                              onClick={() => onDelete(app.id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load mock appointments on first mount
  useEffect(() => {
    const mockApps: Appointment[] = [
      { id: '1', name: 'James Wilson', email: 'james@example.com', phone: '555-0101', service: 'Dental Implants', date: '2024-03-20', time: '10:00', status: 'confirmed', createdAt: new Date().toISOString() },
      { id: '2', name: 'Linda Garcia', email: 'linda@example.com', phone: '555-0102', service: 'General Dentistry', date: '2024-03-21', time: '14:30', status: 'pending', createdAt: new Date().toISOString() },
      { id: '3', name: 'Robert Brown', email: 'robert@example.com', phone: '555-0103', service: 'Teeth Whitening', date: '2024-03-22', time: '09:15', status: 'pending', createdAt: new Date().toISOString() },
    ];
    setAppointments(mockApps);
  }, []);

  const handleBookAppointment = (data: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
    const newApp: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setAppointments([newApp, ...appointments]);
  };

  const handleStatusChange = (id: string, status: Appointment['status']) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar onAdminToggle={() => setIsAdminOpen(true)} isAdmin={isAdminOpen} />
      
      <main>
        <Hero />
        <About />
        <ServicesSection />
        <AppointmentSection onBook={handleBookAppointment} />
        <TestimonialsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />

      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100]"
          >
            <AdminDashboard 
              appointments={appointments} 
              onClose={() => setIsAdminOpen(false)}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteAppointment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
