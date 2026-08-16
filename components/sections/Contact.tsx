"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ message: "Message envoyé avec succès !", type: "success" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Une erreur est survenue");
      }
    } catch {
      setStatus({
        message: "Erreur lors de l'envoi. Veuillez réessayer.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .contact-section {
          font-family: 'Inter', sans-serif;
          background-color: #F6F7EC;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          padding: 5rem 0;
        }

        /* Subtle texture overlay */
        .contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 20%, rgba(13,31,88,0.06) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(173,131,60,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Decorative line top */
        .contact-section::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0d1f58, #AD833C, #0d1f58);
        }

        .section-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #AD833C;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .section-eyebrow::before,
        .section-eyebrow::after {
          content: '';
          width: 2rem;
          height: 1px;
          background: #AD833C;
          display: inline-block;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #0d1f58;
          line-height: 1.15;
          margin-bottom: 1rem;
        }

        .section-title em {
          font-style: italic;
          color: #AD833C;
        }

        .section-subtitle {
          color: #4a5568;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 38ch;
          margin: 0 auto;
        }

        /* ── Form card ── */
        .form-card {
          background: #0d1f58;
          border-radius: 1.5rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #AD833C, rgba(173,131,60,0.3));
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #F6F7EC;
          margin-bottom: 1.75rem;
        }

        .field-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(246,247,236,0.6);
          margin-bottom: 0.5rem;
        }

        .field-wrapper {
          position: relative;
        }

        .field-input,
        .field-textarea {
          width: 100%;
          padding: 0.875rem 2.75rem 0.875rem 1rem;
          background: rgba(246,247,236,0.07);
          border: 1px solid rgba(173,131,60,0.25);
          border-radius: 0.75rem;
          color: #F6F7EC;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: rgba(246,247,236,0.3);
        }

        .field-input:focus,
        .field-textarea:focus {
          border-color: #AD833C;
          background: rgba(246,247,236,0.1);
          box-shadow: 0 0 0 3px rgba(173,131,60,0.15);
        }

        .field-textarea {
          resize: none;
          padding-right: 1rem;
        }

        .field-icon {
          position: absolute;
          right: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.125rem;
          height: 1.125rem;
          color: rgba(173,131,60,0.5);
          pointer-events: none;
        }

        .submit-btn {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg, #AD833C, #c9973f);
          color: #F6F7EC;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(173,131,60,0.35);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-success {
          padding: 0.875rem 1rem;
          background: rgba(173,131,60,0.15);
          border-left: 3px solid #AD833C;
          border-radius: 0.5rem;
          color: #c9973f;
          font-size: 0.875rem;
        }

        .status-error {
          padding: 0.875rem 1rem;
          background: rgba(220,38,38,0.1);
          border-left: 3px solid #ef4444;
          border-radius: 0.5rem;
          color: #fca5a5;
          font-size: 0.875rem;
        }

        /* ── Contact info side ── */
        .info-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #0d1f58;
          margin-bottom: 0.75rem;
        }

        .info-subtitle {
          color: #6b7280;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #fff;
          border: 1px solid rgba(13,31,88,0.08);
          border-radius: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .contact-card:hover {
          border-color: rgba(173,131,60,0.4);
          box-shadow: 0 4px 16px rgba(13,31,88,0.07);
        }

        .contact-card-icon {
          flex-shrink: 0;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-email { background: #0d1f58; }
        .icon-github { background: #1a1a2e; }
        .icon-linkedin { background: #0d1f58; }

        .contact-card-icon svg {
          width: 1.25rem;
          height: 1.25rem;
          color: #AD833C;
          fill: #AD833C;
        }

        .contact-card-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 0.2rem;
        }

        .contact-card-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: #0d1f58;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-card-link:hover {
          color: #AD833C;
        }

        .availability-box {
          margin-top: 2rem;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(13,31,88,0.04), rgba(173,131,60,0.06));
          border: 1px solid rgba(173,131,60,0.2);
          border-radius: 1rem;
        }

        .availability-dot {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: #22c55e;
          border-radius: 50%;
          margin-right: 0.4rem;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .availability-title {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0d1f58;
          margin-bottom: 0.4rem;
        }

        .availability-text {
          font-size: 0.8125rem;
          color: #6b7280;
          line-height: 1.55;
        }

        /* Spinner */
        .spinner {
          width: 1.1rem;
          height: 1.1rem;
          border: 2px solid rgba(246,247,236,0.4);
          border-top-color: #F6F7EC;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Decorative floating shapes */
        .shape {
          position: absolute;
          pointer-events: none;
        }
      `}</style>

      <section ref={ref} id="contact" className="contact-section">

        {/* Floating decorative shapes */}
        <motion.div
          className="shape"
          style={{ top: "8%", right: "6%", width: 80, height: 80, border: "1.5px solid rgba(173,131,60,0.2)", borderRadius: "12px", transform: "rotate(20deg)" }}
          animate={{ y: [0, -18, 0], rotate: [20, 26, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="shape"
          style={{ bottom: "12%", left: "4%", width: 56, height: 56, border: "1.5px solid rgba(13,31,88,0.12)", borderRadius: "50%" }}
          animate={{ y: [0, 14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="shape"
          style={{ top: "50%", left: "2%", width: 28, height: 28, background: "rgba(173,131,60,0.12)", borderRadius: "6px" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div className="section-eyebrow">Contact</div>
            <h2 className="section-title">
              Parlons de votre <em>projet</em>
            </h2>
            <p className="section-subtitle">
              Prêt à transformer vos idées en réalité ? Décrivez votre projet et voyons comment nous pouvons collaborer.
            </p>
          </motion.div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "3rem", alignItems: "start" }}>

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="form-card">
                <h3 className="form-title">Envoyez-moi un message</h3>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={status.type === "success" ? "status-success" : "status-error"}
                    >
                      {status.message}
                    </motion.div>
                  )}

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="field-label">Nom complet</label>
                    <div className="field-wrapper">
                      <input
                        type="text" id="name" name="name"
                        value={formData.name} onChange={handleChange}
                        required placeholder="Votre nom complet"
                        className="field-input"
                      />
                      <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="field-label">Adresse email</label>
                    <div className="field-wrapper">
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange}
                        required placeholder="votre@email.com"
                        className="field-input"
                      />
                      <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="field-label">Votre message</label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange}
                      required rows={5}
                      placeholder="Décrivez votre projet en détail..."
                      className="field-textarea"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="submit-btn">
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        <span>Envoi en cours…</span>
                      </>
                    ) : (
                      <>
                        <svg style={{ width: "1rem", height: "1rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* ── Info ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <h3 className="info-title">Autres moyens de me contacter</h3>
              <p className="info-subtitle">
                Vous préférez une approche directe ? Voici d&apos;autres façons de me joindre.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {/* Email */}
                <motion.div whileHover={{ scale: 1.015 }} className="contact-card">
                  <div className="contact-card-icon icon-email">
                    {/* Gmail logo */}
                    <svg viewBox="0 52 88 66" style={{ width: "1.5rem", height: "1.1rem" }} xmlns="http://www.w3.org/2000/svg">
                      <path d="M58 108h14V74L88 52v-2H74L44 74 14 50H0v2l16 22v34h14V84l14 10 14-10z" fill="#AD833C"/>
                      <path d="M0 52l16 22v34h14V84" fill="rgba(246,247,236,0.25)"/>
                      <path d="M88 52L72 74v34H58V84" fill="rgba(246,247,236,0.15)"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-card-label">Email</div>
                    <a href="mailto:derwichenouhe@gmail.com" className="contact-card-link">
                      derwichenouhe@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* GitHub */}
                <motion.div whileHover={{ scale: 1.015 }} className="contact-card">
                  <div className="contact-card-icon icon-github">
                    <svg viewBox="0 0 24 24" style={{ width: "1.25rem", height: "1.25rem", fill: "#AD833C" }}>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-card-label">GitHub</div>
                    <a href="https://github.com/NouheDerwiche" target="_blank" rel="noopener noreferrer" className="contact-card-link">
                      @NouheDerwiche
                    </a>
                  </div>
                </motion.div>

                {/* LinkedIn */}
                <motion.div whileHover={{ scale: 1.015 }} className="contact-card">
                  <div className="contact-card-icon icon-linkedin">
                    <svg viewBox="0 0 24 24" style={{ width: "1.25rem", height: "1.25rem", fill: "#AD833C" }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-card-label">LinkedIn</div>
                    <a href="https://www.linkedin.com/in/nouhe-derwiche/" target="_blank" rel="noopener noreferrer" className="contact-card-link">
                      Nouhe Derwiche
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Availability */}
              <div className="availability-box">
                <div className="availability-title">
                  <span className="availability-dot" />
                  Disponible pour de nouveaux projets
                </div>
                <p className="availability-text">
                  Je réponds généralement dans les 24h. N&apos;hésitez pas à décrire votre projet en détail pour que je puisse mieux vous accompagner.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};