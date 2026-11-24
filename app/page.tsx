"use client"
import { useEffect } from "react"

function ScrollNav() {
  useEffect(() => {
    const nav = document.getElementById("main-nav")
    const handleScroll = () => {
      if (window.scrollY > 10) {
        nav?.classList.add("scrolled")
      } else {
        nav?.classList.remove("scrolled")
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return null
}

function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor")
    if (!cursor) return
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
      const playSection = document.getElementById("play")
      if (playSection) {
        const rect = playSection.getBoundingClientRect()
        if (e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right) {
          cursor.style.background = "#FFFFFF"
        } else {
          cursor.style.background = "#034CDA"
        }
      }
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])
  return null
}

function RevealOnScroll() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}

function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }
}

const SF = "-apple-system, 'SF Pro Display', Inter, sans-serif"

const MarqueeStrip = () => (
  <div style={{ overflow: "hidden", backgroundColor: "#034CDA", height: "44px", display: "flex", alignItems: "center" }}>
    <div className="marquee-track">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="marquee-item">
          <img src="/attention.png" alt="" style={{ width: "20px", height: "20px", flexShrink: 0 }} />
          <span style={{ fontFamily: SF, fontWeight: 500, fontSize: "20px", letterSpacing: "-0.01em", color: "#FFFFFF" }}>
            this website is a pitch of my AI skills — built and deployed entirely through AI collaboration (Claude) with no prior coding experience
          </span>
        </div>
      ))}
    </div>
  </div>
)

export default function Home() {
  const projects = [
    { num: "1.", title: "NeoSOFT Technologies", tags: "identity/ rebrand/ interface", href: "https://www.behance.net/gallery/250008129/NeoSOFT-Technology-Rebrand?platform=direct" },
    { num: "2.", title: "Ella Stein/ AI+", tags: "art direction/ packaging/ UI", href: "https://www.behance.net/gallery/254791293/AI-Branding" },
    { num: "3.", title: "IKEA Graphic Communciation", tags: "graphic/ editorial", href: "https://www.behance.net/gallery/250085833/IKEA" },
    { num: "4.", title: "Lenskart", tags: "identity/ motion graphic", href: "https://www.behance.net/gallery/250008239/Lenskart-Vincent-Chase?platform=direct" },
    { num: "5.", title: "Production Design Journal", tags: "art direction/ film production design", href: "https://www.behance.net/gallery/250085367/Art-Direction-Films?platform=direct" },
    { num: "6.", title: "Source Bound", tags: "game design", href: "https://www.behance.net/gallery/250009095/SourceBound-Game-Design?platform=direct" },
  ]

  const links = [
    { label: "instagram", href: "https://instagram.com/tarasitaraa_" },
    { label: "behance", href: "https://www.behance.net/mansishinde18" },
    { label: "linkedin", href: "https://www.linkedin.com/in/mansi-shinde-8a03291a6/" },
  ]

  const btnStyle = (color: string): React.CSSProperties => ({
    background: "none",
    border: "none",
    cursor: "none",
    color,
    fontSize: "18px",
    fontWeight: 400,
    fontFamily: SF,
    padding: 0,
    transition: "opacity 0.2s ease",
    position: "relative",
  })

  return (
    <main style={{ backgroundColor: "#FFFFFF", color: "#1a1a1a", fontFamily: SF, overflowX: "hidden" }}>

      <style>{`
        /* ─── CURSOR ─── */
        * { cursor: none !important; }
        #custom-cursor {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #034CDA;
          border-radius: 50%;
          pointer-events: none;
          z-index: 999999;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          transition: background 0.2s ease;
        }

        /* ─── BASE ─── */
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-nav { animation: fadeIn 0.5s ease forwards; opacity: 0; }
        .anim-illustration { animation: fadeIn 0.6s ease forwards; animation-delay: 0.4s; opacity: 0; }
        .anim-hero { animation: fadeUp 0.6s ease forwards; animation-delay: 0.8s; opacity: 0; }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        #main-nav { transition: background 0.5s ease, border-color 0.5s ease; }
        #main-nav.scrolled {
          background: #C0FC4F;
          border-bottom: 0.5px solid rgba(0,0,0,0.06);
        }
        #main-nav.scrolled .nav-about,
        #main-nav.scrolled .nav-work { color: #000000 !important; }
        .nav-btn:hover { opacity: 0.5; }

        .hover-underline { position: relative; display: inline-block; }
        .hover-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .hover-underline:hover::after { width: 100%; }

        .ig-link { transition: color 0.2s ease; }
        .ig-link:hover { color: rgba(255,255,255,0.5) !important; }
        .ig-link:hover span { color: rgba(255,255,255,0.5) !important; }

        .play-img {
          width: 100%;
          margin-top: 310px;
          border-radius: 12px;
          transition: transform 0.2s ease;
        }
        .play-img:hover { transform: scale(1.015); }

        .work-item { transition: opacity 0.2s ease; }
        .work-item:hover { opacity: 0.5; }
        .work-item:active { opacity: 0.3; }

        /* ─── MARQUEE ─── */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 33s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 40px;
          white-space: nowrap;
        }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          * { cursor: auto !important; }
          #custom-cursor { display: none !important; }

          #main-nav { padding: 12px 20px !important; }
          #main-nav button { font-size: 11px !important; color: #000000 !important; }
          .nav-links-wrap { gap: 20px !important; }

          .hero-section { padding: 80px 20px 0 !important; }
          .hero-section h1 {
            font-size: 65px !important;
            line-height: 55px !important;
            letter-spacing: -0.04em !important;
            white-space: normal !important;
            max-width: 100% !important;
            margin-top: 55px;
          }
          .hero-section p {
            font-size: 18px !important;
            line-height: 17px !important;
            max-width: 100% !important;
            margin-top: 2px !important;
          }

          .anim-illustration { width: 115% !important; top: -10px !important; right: 0px !important; }

          .about-section { flex-direction: column !important; padding: 90px 20px !important; }
          .about-section > p {
            font-size: 33px !important;
            line-height: 30px !important;
            max-width: 100% !important;
            text-align: left;
          }
          .about-section > div {
            margin-top: 100px !important;
            max-width: 96.5% !important;
            text-align: right !important;
            padding: 0 !important;
            margin-left: auto !important;
          }
          .about-section > div p { font-size: 16px !important; line-height: 18px !important; max-width: 280px !important; }

          .work-section { padding: 7px 20px 6px !important; }
          .work-section h2 { font-size: 52px !important; padding-right: 0 !important; }
          .work-section span { font-size: 22px !important; line-height: 28px !important; }
          .work-title-row { gap: 8px !important; }
          .work-section > a { padding: 20px 0 !important; }
          .work-tags { font-size: 12px !important; padding-right: 0 !important; text-align: left !important; margin-top: 0px !important; }

          .play-section { padding: 50px 16px 6px !important; }
          .play-box { padding: 24px !important; min-height: auto !important; padding-bottom: 10px !important; }
          .play-top-text {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            width: 100% !important;
            text-align: left !important;
            font-size: 44px !important;
            line-height: 34px !important;
            margin-top: 30px !important;
            margin-bottom: 10px !important;
          }
          .play-img { margin-top: -100px !important; width: 100% !important; border-radius: 0 !important; }
          .play-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 0px !important; margin-top: 20px !important; }
          .play-bottom > p { font-size: 44px !important; line-height: 34px !important; max-width: 70% !important; margin-top: -25px; }

          .ig-link { margin-right: 0 !important; gap: 8px !important; }
          .ig-link span { font-size: 23px !important; }
          .ig-link img { width: 20px !important; height: 20px !important; }

          .contact-section { padding: 40px 20px 60px !important; }
          .contact-section h2 { font-size: 36px !important; line-height: 40px !important; margin-bottom: 0 !important; }
          .contact-links { flex-wrap: nowrap !important; margin-top: 24px !important; justify-content: flex-start !important; gap: 53px !important; width: 100% !important; }
          .contact-links a { font-size: 14px !important; }

          .play-img-wrap:active img { transform: scale(0.97); transition: transform 0.15s ease; }
          .ig-link:active { opacity: 0.6; transition: opacity 0.15s ease; }
        }
      `}</style>

      <div id="custom-cursor" />
      <ScrollNav />
      <CustomCursor />
      <RevealOnScroll />

      <div style={{ position: "relative" }}>

        <img src="/Mask_group.png" alt="" className="anim-illustration"
          style={{ position: "absolute", right: "0px", top: "-20px", width: "85%", zIndex: 0, pointerEvents: "none" }} />

        <nav id="main-nav" className="anim-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 40px" }}>
          <button onClick={() => scrollTo("top")} className="nav-btn"
            style={{ background: "none", border: "none", cursor: "none", display: "flex", alignItems: "center", fontSize: "18px", padding: 0, fontFamily: SF, position: "relative" }}>
            <span style={{ fontWeight: 500, letterSpacing: "-0.04em", color: "#1a1a1a" }}>mansi shinde</span>
            <span style={{ fontWeight: 400, color: "#1a1a1a" }}>&nbsp;| portfolio</span>
          </button>
          <div className="nav-links-wrap" style={{ display: "flex", gap: "60px" }}>
            <button onClick={() => scrollTo("about")} className="nav-btn nav-about" style={btnStyle("#FFFFFF")}>about</button>
            <button onClick={() => scrollTo("work")} className="nav-btn nav-work" style={btnStyle("#FFFFFF")}>work</button>
            <button onClick={() => scrollTo("play")} className="nav-btn" style={btnStyle("#000000")}>play</button>
            <button onClick={() => scrollTo("contact")} className="nav-btn" style={btnStyle("#000000")}>contact</button>
          </div>
        </nav>

        <section className="anim-hero hero-section" style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 40px 0" }}>
          <h1 style={{ fontSize: "130px", fontWeight: 400, lineHeight: "120px", letterSpacing: "-0.04em", maxWidth: "580px", marginBottom: "1rem", whiteSpace: "nowrap" }}>
            designed<br />to tell a story
          </h1>
          <p style={{ maxWidth: "550px", lineHeight: "27px", fontSize: "28px", fontWeight: 400, letterSpacing: "-0.01em" }}>
            creativity to me is vital, so is the growing fascination towards creative minds. i wish to expand my learning experiences through ways which serve art in all its forms.
          </p>
        </section>

        <section id="about" className="reveal about-section" style={{ position: "relative", zIndex: 2, padding: "150px 40px 120px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <p style={{ fontSize: "70px", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: "55px", maxWidth: "55%" }}>
            i&apos;m a visual designer with expertise in brand identity, logo design, interaction, visual communication, motion design and storytelling
          </p>
          <div style={{ maxWidth: "600px", marginTop: "350px" }}>
            <p style={{ fontSize: "30px", fontWeight: 400, letterSpacing: "0", lineHeight: "27px", marginBottom: "24px", marginRight: "-14px" }}>
              with a foundation in Design from NIFT and a focus on Visual Communication Design at Politecnico di Milano, I&apos;m eager to take on new opportunities
            </p>
            <p style={{ fontSize: "30px", fontWeight: 400, letterSpacing: "0", lineHeight: "27px" }}>
              {"let's connect and perhaps explore potential collaborations, shall we?"}
            </p>
          </div>
        </section>

        <MarqueeStrip />

        <section id="work" className="reveal work-section" style={{ position: "relative", zIndex: 2, padding: "80px 40px 120px 40px" }}>
          <h2 style={{ fontSize: "110px", fontWeight: 400, lineHeight: "100px", letterSpacing: "-0.04em", textAlign: "right", paddingRight: "80px", marginBottom: "50px" }}>
            work
          </h2>
          {projects.map((item) => (
            <a key={item.num} href={item.href} target="_blank" rel="noopener noreferrer"
              className="work-item"
              style={{ display: "block", borderBottom: "1px solid #1a1a1a", padding: "20px 0px", textDecoration: "none", color: "#1a1a1a" }}>
              <div style={{ display: "inline-block" }}>
                <div className="work-title-row" style={{ display: "flex", alignItems: "baseline", gap: "24px" }}>
                  <span style={{ fontSize: "60px", fontWeight: 400, letterSpacing: "-0.04em", lineHeight: "79.9px" }}>{item.num}</span>
                  <span style={{ fontSize: "60px", fontWeight: 400, letterSpacing: "-0.04em", lineHeight: "79.9px" }}>{item.title}</span>
                </div>
                <p className="work-tags" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: "normal", marginTop: "-10px", textAlign: "right" }}>{item.tags}</p>
              </div>
            </a>
          ))}
        </section>

        <section id="play" className="reveal play-section" style={{ position: "relative", zIndex: 2, padding: "1px 40px 120px" }}>
          <div className="play-box" style={{ backgroundColor: "#034CDA", borderRadius: "24px", padding: "60px", position: "relative", minHeight: "1450px" }}>
            <p className="play-top-text" style={{ fontFamily: "var(--font-staatliches)", fontSize: "90px", lineHeight: "72px", letterSpacing: "-0.05em", color: "#FFFFFF", width: "50%", position: "absolute", top: "120px", right: "60px", textAlign: "right" }}>
              {"here's my digital footprint where my storytelling and conceptual side comes through more freely"}
            </p>
            <a href="https://instagram.com/tarasitaraa_" target="_blank" rel="noopener noreferrer" className="play-img-wrap" style={{ display: "block", width: "80%", marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: 3 }}>
              <img src="/play.png" alt="play grid" className="play-img" />
            </a>
            <div className="play-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "-12px" }}>
              <p style={{ fontFamily: "var(--font-staatliches)", fontSize: "90px", lineHeight: "72px", letterSpacing: "-0.05em", color: "#FFFFFF", maxWidth: "45%" }}>
                take a break, check it out
              </p>
              <a href="https://instagram.com/tarasitaraa_" target="_blank" rel="noopener noreferrer" className="ig-link"
                style={{ display: "flex", alignItems: "center", gap: "16px", textDecoration: "none", marginRight: "130px", color: "#FFFFFF" }}>
                <img src="/ig.png" alt="instagram" style={{ width: "50px", height: "50px" }} />
                <span style={{ fontFamily: SF, fontWeight: 500, fontSize: "70px", lineHeight: "87.3px", letterSpacing: "-0.04em", color: "#FFFFFF" }}>
                  tarasitaraa_
                </span>
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="reveal contact-section" style={{ position: "relative", zIndex: 2, padding: "40px 50px 120px" }}>
          <a href="tel:+393927603015" style={{ display: "block", textDecoration: "none", color: "#1a1a1a" }}>
            <h2 style={{ fontSize: "110px", fontWeight: 400, lineHeight: "100px", letterSpacing: "-0.04em", marginBottom: "0" }}>
              +39 39276 03015
            </h2>
          </a>
          <a href="mailto:mansis86@ymail.com" style={{ display: "block", textDecoration: "none", color: "#1a1a1a" }}>
            <h2 style={{ fontSize: "110px", fontWeight: 400, lineHeight: "100px", letterSpacing: "-0.04em", marginBottom: "150px" }}>
              mansis86@ymail.com
            </h2>
          </a>
          <div className="contact-links" style={{ display: "flex", alignItems: "center", gap: "505px" }}>
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="hover-underline"
                style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "25.57px", fontWeight: 400, letterSpacing: "-0.01em", color: "#1a1a1a", textDecoration: "none" }}>
                {link.label}
                <img src="/go.png" alt="" style={{ width: "18px", height: "18px" }} />
              </a>
            ))}
          </div>
        </section>

        <MarqueeStrip />

      </div>
    </main>
  )
}