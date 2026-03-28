import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Navbar
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      skills: 'Skills',
      about: 'About',
      contact: 'Contact',
    },
    // Hero
    hero: {
      badge: 'Available for Freelance',
      heading1: 'I Build Modern',
      heading2: 'Web Experiences',
      sub: "Creative and detail-oriented Full-Stack Web Developer with a strong foundation in Computer Science. I design and build fast, modern, and responsive websites and web applications for businesses and individuals. From landing pages to full-stack platforms — I turn ideas into clean, functional products.",
      cta1: 'View My Work',
      cta2: 'Hire Me',
      scroll: 'Scroll down',
    },
    // Services
    services: {
      tag: 'What I Offer',
      title: 'Services',
      subtitle: 'Everything you need to build a powerful online presence — from idea to launch.',
      items: [
        {
          title: 'Landing Pages',
          desc: 'High-converting, responsive landing pages that look great on every device and drive real results.',
        },
        {
          title: 'Full-Stack Web Apps',
          desc: 'Complete web applications with React, Node.js, Express, and MongoDB from front to back.',
        },
        {
          title: 'WordPress Development',
          desc: 'Custom WordPress themes, plugins, and full site setup tailored to your brand.',
        },
        {
          title: 'React Development',
          desc: 'Modern, fast, interactive UIs built with React — smooth, scalable, and performant.',
        },
        {
          title: 'Bug Fixes & Optimization',
          desc: 'Quick fixes, performance optimization, and code cleanup to keep your site fast and reliable.',
        },
        {
          title: 'API Development',
          desc: 'RESTful APIs with Node.js, Express, and database integration — built to scale.',
        },
      ],
    },
    // Portfolio
    portfolio: {
      tag: 'My Work',
      title: 'Recent Projects',
      subtitle: 'A selection of projects I\'ve built — each one crafted with care and attention to detail.',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      projects: [
        {
          title: 'Sharp Cuts — Barbershop Website',
          desc: 'A sleek, modern landing page for a contemporary barbershop featuring online booking, services showcase, and gallery.',
          tags: ['HTML', 'CSS', 'JavaScript'],
          gradient: 'from-blue-600 via-blue-800 to-slate-900',
        },
        {
          title: 'Beirut Bites — Restaurant Website',
          desc: 'An elegant landing page for a Lebanese restaurant, featuring menu display, reservations, and rich cultural visuals.',
          tags: ['HTML', 'CSS', 'JavaScript'],
          gradient: 'from-orange-600 via-red-800 to-slate-900',
        },
        {
          title: 'TaskFlow — Task Management App',
          desc: 'A full-stack productivity app with user auth, drag-and-drop boards, real-time updates, and team collaboration.',
          tags: ['React', 'Node.js', 'MongoDB'],
          gradient: 'from-violet-600 via-purple-800 to-slate-900',
        },
      ],
    },
    // Skills
    skills: {
      tag: 'My Expertise',
      title: 'Tech Stack',
      subtitle: 'The tools and technologies I use to build exceptional digital experiences.',
      categories: ['Frontend', 'Backend', 'Database', 'CMS', 'Tools'],
    },
    // About
    about: {
      tag: 'About Me',
      title: "I'm Wael Taleb",
      bio: "I'm a Computer Science student and freelance developer from Lebanon. I love building things for the web — from simple landing pages to complex full-stack applications. I focus on writing clean code, delivering fast, and making sure every project looks and works great.",
      bio2: "Currently open for freelance work and excited to collaborate on interesting projects that make a real impact.",
      stats: [
        { value: '3+', label: 'Years Coding' },
        { value: '20+', label: 'Projects Built' },
        { value: '10+', label: 'Happy Clients' },
      ],
      cta: 'Download CV',
    },
    // Contact
    contact: {
      tag: 'Get In Touch',
      title: "Let's Work Together",
      subtitle: 'Have a project in mind? I\'d love to hear about it. Send me a message and let\'s create something great.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Tell me about your project...',
        submit: 'Send Message',
        success: 'Message sent! I\'ll get back to you soon.',
        sending: 'Sending...',
      },
      info: {
        emailLabel: 'Email',
        locationLabel: 'Location',
        location: 'Lebanon',
        availLabel: 'Availability',
        avail: 'Open for freelance',
      },
    },
    // Footer
    footer: {
      rights: '© 2025 Wael Taleb. All rights reserved.',
      tagline: 'Building the web, one project at a time.',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      portfolio: 'أعمالي',
      skills: 'المهارات',
      about: 'عني',
      contact: 'تواصل',
    },
    hero: {
      badge: 'متاح للعمل الحر',
      heading1: 'أبني تجارب ويب',
      heading2: 'عصرية ومتميزة',
      sub: 'مطور ويب متكامل مبدع ومهتم بالتفاصيل، أصمم وأبني مواقع وتطبيقات ويب سريعة وعصرية للشركات والأفراد. من صفحات الهبوط إلى المنصات المتكاملة — أحوّل الأفكار إلى منتجات نظيفة وفعّالة.',
      cta1: 'شاهد أعمالي',
      cta2: 'وظّفني',
      scroll: 'مرر للأسفل',
    },
    services: {
      tag: 'ما أقدمه',
      title: 'خدماتي',
      subtitle: 'كل ما تحتاجه لبناء حضور رقمي قوي — من الفكرة إلى الإطلاق.',
      items: [
        {
          title: 'صفحات الهبوط',
          desc: 'صفحات هبوط جذابة وسريعة الاستجابة تبدو رائعة على كل الأجهزة وتحقق نتائج حقيقية.',
        },
        {
          title: 'تطبيقات ويب متكاملة',
          desc: 'تطبيقات ويب كاملة بـ React وNode.js وExpress وMongoDB من الواجهة للخادم.',
        },
        {
          title: 'تطوير WordPress',
          desc: 'قوالب وإضافات WordPress مخصصة وإعداد كامل للموقع ليتناسب مع علامتك التجارية.',
        },
        {
          title: 'تطوير React',
          desc: 'واجهات مستخدم عصرية وسريعة وتفاعلية مبنية بـ React — سلسة وقابلة للتوسع.',
        },
        {
          title: 'إصلاح الأخطاء والتحسين',
          desc: 'إصلاح سريع وتحسين الأداء وتنظيف الكود للحفاظ على موقعك سريعاً وموثوقاً.',
        },
        {
          title: 'تطوير API',
          desc: 'واجهات RESTful بـ Node.js وExpress وتكامل قواعد البيانات — مبنية للنمو.',
        },
      ],
    },
    portfolio: {
      tag: 'أعمالي',
      title: 'أحدث المشاريع',
      subtitle: 'مجموعة مختارة من المشاريع التي بنيتها — كل واحد صُمّم بعناية واهتمام بالتفاصيل.',
      liveDemo: 'عرض مباشر',
      sourceCode: 'الكود المصدري',
      projects: [
        {
          title: 'Sharp Cuts — موقع صالون حلاقة',
          desc: 'صفحة هبوط أنيقة وعصرية لصالون حلاقة تتضمن حجزاً إلكترونياً وعرض الخدمات والمعرض.',
          tags: ['HTML', 'CSS', 'JavaScript'],
          gradient: 'from-blue-600 via-blue-800 to-slate-900',
        },
        {
          title: 'Beirut Bites — موقع مطعم',
          desc: 'صفحة هبوط فاخرة لمطعم لبناني تضم قائمة الطعام والحجز ومرئيات ثقافية غنية.',
          tags: ['HTML', 'CSS', 'JavaScript'],
          gradient: 'from-orange-600 via-red-800 to-slate-900',
        },
        {
          title: 'TaskFlow — تطبيق إدارة المهام',
          desc: 'تطبيق إنتاجية متكامل مع مصادقة المستخدمين ولوحات قابلة للسحب وتحديثات فورية.',
          tags: ['React', 'Node.js', 'MongoDB'],
          gradient: 'from-violet-600 via-purple-800 to-slate-900',
        },
      ],
    },
    skills: {
      tag: 'خبراتي',
      title: 'التقنيات',
      subtitle: 'الأدوات والتقنيات التي أستخدمها لبناء تجارب رقمية استثنائية.',
      categories: ['الواجهة الأمامية', 'الخادم', 'قواعد البيانات', 'نظام إدارة المحتوى', 'الأدوات'],
    },
    about: {
      tag: 'عني',
      title: 'أنا وائل طالب',
      bio: 'طالب في علوم الحاسوب ومطور مستقل من لبنان. أحب بناء أشياء للويب — من صفحات هبوط بسيطة إلى تطبيقات متكاملة. أركز على كتابة كود نظيف والتسليم بسرعة والتأكد من أن كل مشروع يبدو ويعمل بشكل رائع.',
      bio2: 'متاح حالياً للعمل الحر ومتحمس للتعاون في مشاريع مثيرة للاهتمام تحدث أثراً حقيقياً.',
      stats: [
        { value: '+3', label: 'سنوات برمجة' },
        { value: '+20', label: 'مشروع منجز' },
        { value: '+10', label: 'عميل سعيد' },
      ],
      cta: 'تحميل السيرة الذاتية',
    },
    contact: {
      tag: 'تواصل معي',
      title: 'لنعمل معاً',
      subtitle: 'هل لديك مشروع في ذهنك؟ أود سماع ذلك. أرسل لي رسالة ولنبني شيئاً رائعاً.',
      form: {
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        message: 'أخبرني عن مشروعك...',
        submit: 'إرسال الرسالة',
        success: 'تم الإرسال! سأرد عليك قريباً.',
        sending: 'جاري الإرسال...',
      },
      info: {
        emailLabel: 'البريد الإلكتروني',
        locationLabel: 'الموقع',
        location: 'لبنان',
        availLabel: 'الإتاحة',
        avail: 'متاح للعمل الحر',
      },
    },
    footer: {
      rights: '© 2025 وائل طالب. جميع الحقوق محفوظة.',
      tagline: 'أبني الويب، مشروعاً تلو الآخر.',
    },
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'))
  const t = translations[lang]
  const isRTL = lang === 'ar'

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
