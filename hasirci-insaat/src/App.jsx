import React, { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
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

     <section id="yasam" className="life-scroll-section">
  <div className="life-scroll-sticky">
    <div className="life-scroll-copy">
      <p className="section-kicker">Hasırcı Yaşamı</p>
      <h2>Her detay, daha güçlü bir yaşam için.</h2>
      <p>
        Mimari kalite, güvenli yapı anlayışı ve konforlu yaşam alanları aynı çizgide buluşur.
      </p>
    </div>

    <div className="life-scroll-stage">
      {[
        ['01 / Konfor', 'Günlük hayatı kolaylaştıran sakin lüks.', projectImages[0]],
        ['02 / Mahremiyet', 'Kalabalıktan uzak, hayatın merkezine yakın.', projectImages[1]],
        ['03 / Mimari', 'Zamansız çizgiler, güçlü yapı dili.', projectImages[2]],
      ].map(([kicker, title, image], index) => (
        <motion.article
          key={title}
          className={`life-scroll-card life-scroll-card-${index + 1}`}
          initial={{ opacity: 0, y: 90, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <img src={image} alt={title} />
          <div>
            <span>{kicker}</span>
            <h3>{title}</h3>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
</section>

      <section className="gokturk-section">
        <div className="gokturk-sticky">
          <p className="section-kicker">Göktürk Projesi</p>
          <h2>Detaylarda konfor, malzemede zarafet.</h2>
          <p>İç mekanda sıcak ışık, doğal doku ve rafine malzeme seçimiyle sakin bir lüks dili kurulur.</p>
        </div>

        <div className="gokturk-gallery">
          {gokturkImages.map((image, index) => (
            <motion.figure
              key={image}
              className={`gokturk-shot shot-${index + 1}`}
              initial={{ opacity: 0, y: 80, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: index * 0.07 }}
            >
              <img src={image} alt={`Göktürk iç mekan detayı ${index + 1}`} loading="lazy" />
            </motion.figure>
          ))}
        </div>
      </section>

      <section id="projeler" className="projects-section">
        <div className="section-heading split-heading light">
          <div>
            <p className="section-kicker">Seçili Projeler</p>
            <h2>Proje değil, yaşam sahnesi.</h2>
          </div>
          <p>Görsel büyük, bilgi net, geçişler sakin. Kullanıcı aradığını kolayca bulur.</p>
        </div>

        <div className="project-grid">
          {['Göktürk', 'Sahil Residence', 'Garden Suites'].map((project, index) => (
            <motion.article key={project} className="project-card" initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, delay: index * 0.08 }}>
              <img src={index === 0 ? gokturkImages[0] : projectImages[index]} alt={project} loading="lazy" />
              <div>
                <span>0{index + 1}</span>
                <h3>{project}</h3>
                <button>İncele <ArrowUpRight size={16} /></button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="mimari" className="architecture-section">
        <div className="architecture-image">
          <img src={gokturkImages[3]} alt="Hasırcı iç mekan mimarisi" loading="lazy" />
        </div>
        <div className="architecture-copy">
          <Logo dark />
          <h2>Lüks, anlaşılır olduğunda daha güçlüdür.</h2>
          <p>Site akışı bu yüzden sade: kullanıcı projeyi, avantajı ve iletişim adımını yorulmadan görür. Premium his; hareket, kompozisyon ve detay kalitesiyle verilir.</p>
        </div>
      </section>

      <footer id="iletisim" className="footer-section">
        <Logo />
        <h2>Yeni bir yaşam standardı için ilk adımı atın.</h2>
        <a href="mailto:info@hasirci.com">İletişime geç <ArrowUpRight size={18} /></a>
      </footer>
    </main>
  )
}
