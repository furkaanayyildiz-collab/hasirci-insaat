import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  animate
} from 'framer-motion'

import React, {
  useEffect,
  useMemo,
  useState,
  useRef
} from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const heroImage = '/images/hero-night.jpg'

const gokturkImages = [
  '/images/gokturk/gokturk-banyo-hero.jpg',
  '/images/gokturk/gokturk-banyo-detail.jpg',
  '/images/gokturk/gokturk-banyo-angle.jpg',
  '/images/gokturk/gokturk-banyo-front.jpg',
]

const projectImages = [
  '/images/projects/project-01.jpg',
  '/images/projects/project-02.jpg',
  '/images/projects/project-03.jpg',
]

function Logo({ dark = false }) {
  return (
    <img
      src="/images/brand/hasirci-logo.svg"
      alt="Hasırcı"
      className={dark ? 'brand-logo brand-logo--dark' : 'brand-logo'}
    />
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22 })
  const heroScale = useTransform(smooth, [0, 0.2], [1, 1.12])
  const heroTextY = useTransform(smooth, [0, 0.2], [0, -90])
  const heroTextOpacity = useTransform(smooth, [0, 0.2], [1, 0.15])
  const navBg = useTransform(smooth, [0, 0.08], ['rgba(10,12,10,0.66)', 'rgba(10,12,10,0.94)'])

  const navItems = useMemo(() => [
    { label: 'Projeler', href: '#projeler' },
    { label: 'Yaşam', href: '#yasam' },
    { label: 'Mimari', href: '#mimari' },
    { label: 'İletişim', href: '#iletisim' },
  ], [])
  const statsRef = useRef(null)

const statsInView = useInView(statsRef, {
  once: true,
  margin: '-100px',
})

const [experience, setExperience] = useState(0)
const [projectsDone, setProjectsDone] = useState(0)
const [happyClients, setHappyClients] = useState(0)

useEffect(() => {
  if (!statsInView) return

  const controls = [
    animate(0, 30, {
      duration: 1.8,
      onUpdate: (value) => setExperience(Math.floor(value)),
    }),
    animate(0, 18, {
      duration: 1.6,
      onUpdate: (value) => setProjectsDone(Math.floor(value)),
    }),
    animate(0, 5000, {
      duration: 2.1,
      onUpdate: (value) => setHappyClients(Math.floor(value)),
    }),
  ]

  return () => controls.forEach((control) => control.stop())
}, [statsInView])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <main className="site-shell">
      <motion.header style={{ backgroundColor: navBg }} className="navbar">
        <div className="navbar-inner">
          <a href="#top" className="logo-link" aria-label="Hasırcı ana sayfa">
            <Logo />
          </a>

          <nav className="nav-pill" aria-label="Ana menü">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a href="#iletisim" className="nav-cta">
            İletişime geç <ArrowUpRight size={18} />
          </a>

          <button className="mobile-menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Menüyü aç/kapat">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </div>
        )}
      </motion.header>

      <section id="top" className="hero-section">
        <motion.img src={heroImage} alt="Hasırcı İnşaat gece proje renderı" className="hero-image" style={{ scale: heroScale }} />
        <div className="hero-overlay" />
        <div className="hero-architect-lines">
  <span />
  <span />
  <span />
</div>

<div className="hero-vertical-meta">
  <span>Göktürk Residence</span>
  <span>Premium Yaşam</span>
</div>

<div className="hero-bottom-meta">
  <span>Hasırcı İnşaat</span>
  <span>Residence</span>
  <span>Göktürk</span>
  <span>2026</span>
</div>

        <motion.div className="hero-content" style={{ y: heroTextY, opacity: heroTextOpacity }}>
          <div className="hero-info-card">
            <span>Hasırcı İnşaat</span>
            <p>Yaşam standardını yükselten, sakin ve seçkin projeler geliştirir.</p>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Lüks projeler. Konforlu yaşam. Zamansız mimari.</p>
            <h1 className="hero-watermark">HASIRCI</h1>
            <h2>Sağlam Temeller, Güçlü Yarınlar.</h2>
          </div>
        </motion.div>
      </section>
      <section className="stats-section" ref={statsRef}>
  <div className="stats-overlay" />

  <div className="stats-content">
    <h2>
      Geleceğe yön veren yapılar <br />
      oluşturuyoruz.
    </h2>

    <div className="stats-grid">
      <div className="stat-item">
        <h3>{experience}+</h3>
        <span>Yılı Aşan Tecrübe</span>
        <p>
          İnşaat sektöründe uzun yıllardır yaşam kalitesini
          yükselten projelere imza atıyoruz.
        </p>
      </div>

      <div className="stat-item">
        <h3>{projectsDone}</h3>
        <span>Tamamlanan Proje</span>
        <p>
          Her tamamlanan proje, yeni yaşam alanlarının
          temelini oluşturur.
        </p>
      </div>

      <div className="stat-item">
        <h3>{happyClients}+</h3>
        <span>Memnun Müşteri</span>
        <p>
          Güvenle teslim edilen binlerce yaşam alanının
          verdiği deneyim.
        </p>
      </div>
    </div>
  </div>
</section>
<section id="yasam" className="editorial-section">
  <div className="editorial-intro">
    <p>GÖKTÜRK PROJESİ</p>
    <h2>
      Yaşamın her alanında <br />
      sessiz lüks.
    </h2>
  </div>

  {[
    {
  image: "/images/gokturk/gokturk-exterior-walkway.jpg",
  title: "Peyzajla Bütünleşen Yaşam",
  text: "Açık alanlar, yürüyüş aksları ve doğal dokular; Göktürk Projesi’nde günlük yaşamı daha ferah ve seçkin bir deneyime dönüştürür.",
},
{
  image: "/images/gokturk/gokturk-pool-wellness.jpg",
  title: "Wellness Ayrıcalığı",
  text: "Kapalı havuz ve dinlenme alanları, konforu yalnızca daire içinde değil; projenin tüm yaşam ritmine yayar.",
},
{
  image: "/images/gokturk/gokturk-living-room.jpg",
  title: "Sakin İç Mekân Dili",
  text: "Yumuşak ışık, sıcak tonlar ve rafine mobilya seçimiyle yaşam alanları sade ama güçlü bir lüks hissi sunar.",
},
{
  image: "/images/gokturk/gokturk-master-bedroom.jpg",
  title: "Kişisel Konfor Alanı",
  text: "Master yatak odası; dingin renk paleti, özel aydınlatma ve güçlü malzeme diliyle kişisel bir kaçış alanı olarak tasarlanır.",
},
  ].map((item, index) => (
    <motion.section
      key={item.title}
      className="editorial-panel"
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 1 }}
    >
      <div className="editorial-image-wrap">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>

      <div className="editorial-content">
        <span>0{index + 1}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </motion.section>
  ))}
</section>

      <section className="gokturk-section clean-gokturk-section">
  <div className="clean-gokturk-copy">
    <p className="section-kicker">Göktürk Projesi</p>

    <h2>Detaylarda konfor, malzemede zarafet.</h2>

    <p>
      Göktürk projesinde iç mekân dili; doğal taş yüzeyler, sıcak ahşap
      dokular ve yumuşak ışık katmanlarıyla zamansız bir yaşam atmosferi
      oluşturur.
    </p>

    <div className="clean-gokturk-specs">
      <div>
        <span>Malzeme</span>
        <strong>Doğal taş & sıcak ahşap</strong>
      </div>
      <div>
        <span>Tasarım Dili</span>
        <strong>Minimal & rafine</strong>
      </div>
      <div>
        <span>Atmosfer</span>
        <strong>Sakin, seçkin, zamansız</strong>
      </div>
    </div>
  </div>

  <div className="clean-gokturk-gallery">
    {gokturkImages.map((image, index) => (
      <motion.figure
        key={image}
        className={`clean-gokturk-shot clean-shot-${index + 1}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, delay: index * 0.06 }}
      >
        <img src={image} alt={`Göktürk iç mekan detayı ${index + 1}`} loading="lazy" />
      </motion.figure>
    ))}
  </div>
</section>
<section className="process-section">
  <div className="process-header">
    <p className="section-kicker">Hasırcı Süreci</p>
    <h2>Fikirden teslimata, güven veren bir yolculuk.</h2>
    <p>
      Her proje; doğru analiz, güçlü mühendislik, rafine tasarım ve titiz uygulama
      adımlarıyla hayata geçirilir.
    </p>
  </div>

  <div className="process-grid">
    {[
      {
        icon: "⌂",
        title: "Analiz & Konum",
        text: "Projenin yaşam potansiyeli; lokasyon, ihtiyaç ve kullanıcı beklentileriyle birlikte değerlendirilir.",
      },
      {
        icon: "✦",
        title: "Mimari Vizyon",
        text: "Estetik, işlev ve uzun ömürlü değer bir araya getirilerek projeye özgü mimari dil oluşturulur.",
      },
      {
        icon: "▱",
        title: "Malzeme & Detay",
        text: "Doğal dokular, güçlü yapı kalitesi ve seçkin detaylar lüks hissini sessizce güçlendirir.",
      },
      {
        icon: "✓",
        title: "Uygulama & Teslim",
        text: "Planlanan standartlar, titiz saha yönetimi ve güven veren teslim süreciyle hayata geçirilir.",
      },
    ].map((item, index) => (
      <motion.article
        key={item.title}
        className="process-card"
data-step={`0${index + 1}`}
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, delay: index * 0.08 }}
      >
        <div className="process-icon">{item.icon}</div>
        <span>0{index + 1}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </motion.article>
    ))}
  </div>
</section>
      <section id="projeler" className="luxury-projects-section">
  <div className="luxury-projects-header">
    <p className="section-kicker">Seçili Projeler</p>
    <h2>Yaşamı şekillendiren projeler.</h2>
  </div>

  {[
    {
      title: "Göktürk",
      tag: "Residence / İç Mekân / Peyzaj",
      image: "/images/gokturk/gokturk-exterior-walkway.jpg",
    },
    {
      title: "Sahil Residence",
      tag: "Modern Yaşam / Konfor / Lokasyon",
      image: projectImages[1],
    },
    {
      title: "Garden Suites",
      tag: "Doğa / Sakinlik / Zamansız Değer",
      image: projectImages[2],
    },
  ].map((project, index) => (
    <motion.article
      key={project.title}
      className="luxury-project-row"
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.75, delay: index * 0.08 }}
    >
      <div className="luxury-project-number">0{index + 1}</div>

      <div className="luxury-project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      <div className="luxury-project-copy">
        <p>{project.tag}</p>
        <h3>{project.title}</h3>
      </div>

      <button
  className="luxury-project-button"
  onClick={() => setActiveProject(project)}
>
  İncele <ArrowUpRight size={18} />
</button>
    </motion.article>
  ))}
</section>

      <footer id="iletisim" className="footer-section">
        <Logo />
        <h2>Yeni bir yaşam standardı için ilk adımı atın.</h2>
        <a href="mailto:info@hasirci.com">İletişime geç <ArrowUpRight size={18} /></a>
      </footer>
    </main>
  )
}
