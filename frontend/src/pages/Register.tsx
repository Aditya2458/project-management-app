import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await api.post("/auth/register/", formData);

    alert("Registration Successful");
    navigate("/");

  } catch (error: any) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);
    console.log("DATA:", error.response?.data);
    console.log("STATUS:", error.response?.status);

    alert(JSON.stringify(error.response?.data));
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .rg-root {
          min-height: 100vh;
          background: #04040f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* ── Orbs — shifted palette vs Login ── */
        .rg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: rgOrbDrift 14s ease-in-out infinite alternate;
        }
        .rg-orb1 { width: 620px; height: 620px; top: -170px; right: -140px; background: radial-gradient(circle, #06b6d4 0%, #7c3aed 55%, transparent 75%); opacity: 0.50; filter: blur(95px); animation-delay: 0s; }
        .rg-orb2 { width: 560px; height: 560px; bottom: -140px; left: -120px; background: radial-gradient(circle, #10b981 0%, #f59e0b 55%, transparent 75%); opacity: 0.48; filter: blur(90px); animation-delay: -5s; }
        .rg-orb3 { width: 420px; height: 420px; top: 50%; left: 52%; transform: translate(-50%,-50%); background: radial-gradient(circle, #ff2d78 0%, #2563eb 55%, transparent 75%); opacity: 0.30; filter: blur(85px); animation-delay: -9s; animation-duration: 11s; }
        .rg-orb4 { width: 280px; height: 280px; bottom: 12%; right: 14%; background: radial-gradient(circle, #f59e0b 0%, #ff2d78 55%, transparent 75%); opacity: 0.38; filter: blur(70px); animation-delay: -2s; animation-duration: 17s; }

        @keyframes rgOrbDrift {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(-26px, 20px) scale(1.07); }
          100% { transform: translate(18px,-28px) scale(0.94); }
        }
        .rg-orb3 { animation-name: rgOrb3Drift; }
        @keyframes rgOrb3Drift {
          0%   { transform: translate(-50%,-50%) scale(1); }
          50%  { transform: translate(calc(-50% - 22px), calc(-50% + 16px)) scale(1.05); }
          100% { transform: translate(calc(-50% + 16px), calc(-50% - 22px)) scale(0.96); }
        }

        /* dot grid */
        .rg-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* ── Floating pills ── */
        .rg-pill {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.42);
          white-space: nowrap; pointer-events: none;
          animation: rgPillFloat 7s ease-in-out infinite alternate;
        }
        .rg-pill1 { top: 11%; left: 4%;  animation-delay: 0s; }
        .rg-pill2 { top: 19%; right: 4%; animation-delay: -2s; }
        .rg-pill3 { bottom: 18%; left: 3%; animation-delay: -4.5s; }
        .rg-pill4 { bottom: 11%; right: 5%; animation-delay: -1.5s; }
        @keyframes rgPillFloat {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-13px); }
        }

        /* ── 3-D scene ── */
        .rg-scene {
          perspective: 1400px;
          position: relative; z-index: 10;
          width: 100%; max-width: 440px;
          padding: 16px;
        }

        /* spinning conic glow */
        .rg-card-glow {
          position: absolute; inset: -18px;
          border-radius: 50px;
          background: conic-gradient(from 40deg, #06b6d4, #10b981, #f59e0b, #ff2d78, #7c3aed, #2563eb, #06b6d4);
          filter: blur(38px); opacity: 0.20; z-index: -1;
          animation: rgGlowSpin 9s linear infinite;
        }
        @keyframes rgGlowSpin { to { transform: rotate(360deg); } }

        .rg-card {
          position: relative;
          background: rgba(255,255,255,0.036);
          backdrop-filter: blur(48px) saturate(2);
          -webkit-backdrop-filter: blur(48px) saturate(2);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 30px;
          padding: 48px 44px 44px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 40px 90px rgba(0,0,0,0.65),
            0 80px 140px rgba(0,0,0,0.40),
            inset 0 1px 0 rgba(255,255,255,0.13);
          transform: rotateX(3deg) rotateY(1.5deg);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s;
          animation: rgCardReveal 1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .rg-card:hover {
          transform: rotateX(0deg) rotateY(0deg) translateY(-6px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 50px 110px rgba(0,0,0,0.70),
            0 100px 160px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.16);
        }
        @keyframes rgCardReveal {
          from { opacity:0; transform: rotateX(10deg) rotateY(6deg) translateY(50px); }
          to   { opacity:1; transform: rotateX(3deg) rotateY(1.5deg) translateY(0); }
        }
        /* shimmer rim */
        .rg-card::after {
          content:''; position:absolute;
          top:0; left:12%; right:12%; height:1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.50) 50%, transparent);
          border-radius:1px; pointer-events:none;
        }

        /* ── Logo / brand ── */
        .rg-logo {
          display:flex; flex-direction:column; align-items:center;
          margin-bottom: 36px;
          animation: rgFadeUp 0.8s 0.12s both;
        }
        .rg-icon-wrap {
          width: 68px; height: 68px; border-radius: 20px;
          background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #2563eb 100%);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          box-shadow:
            0 0 0 10px rgba(6,182,212,0.10),
            0 0 0 20px rgba(6,182,212,0.05),
            0 18px 45px rgba(6,182,212,0.35);
          animation: rgIconPulse 3s ease-in-out infinite;
        }
        @keyframes rgIconPulse {
          0%,100% { box-shadow: 0 0 0 10px rgba(6,182,212,0.10), 0 0 0 20px rgba(6,182,212,0.05), 0 18px 45px rgba(6,182,212,0.35); }
          50%      { box-shadow: 0 0 0 14px rgba(6,182,212,0.14), 0 0 0 28px rgba(6,182,212,0.07), 0 24px 55px rgba(6,182,212,0.48); }
        }
        .rg-app-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 30px; letter-spacing: -0.6px;
          background: linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.52));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px; line-height: 1;
        }
        .rg-app-sub {
          font-size: 14px; color: rgba(255,255,255,0.36);
          letter-spacing: 0.02em;
        }

        /* ── Step indicator ── */
        .rg-steps {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-bottom: 30px;
          animation: rgFadeUp 0.7s 0.20s both;
        }
        .rg-step {
          height: 3px; border-radius: 3px;
          background: rgba(255,255,255,0.12);
          transition: all 0.3s;
        }
        .rg-step-active {
          background: linear-gradient(90deg, #06b6d4, #7c3aed);
          box-shadow: 0 0 8px rgba(6,182,212,0.5);
        }
        .rg-step1 { width: 32px; }
        .rg-step2 { width: 20px; }
        .rg-step3 { width: 20px; }

        /* ── Fields ── */
        .rg-field { margin-bottom: 14px; animation: rgFadeUp 0.7s both; }
        .rg-field:nth-of-type(1) { animation-delay: 0.28s; }
        .rg-field:nth-of-type(2) { animation-delay: 0.36s; }
        .rg-field:nth-of-type(3) { animation-delay: 0.44s; }

        .rg-label {
          display: block; font-size: 11px; font-weight: 500;
          letter-spacing: 0.10em; text-transform: uppercase;
          color: rgba(255,255,255,0.32); margin-bottom: 8px;
        }
        .rg-input-wrap { position: relative; }
        .rg-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.22); pointer-events: none;
          display: flex; align-items: center;
        }
        .rg-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff; border-radius: 13px;
          padding: 13px 16px 13px 42px;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: all 0.22s;
        }
        .rg-input::placeholder { color: rgba(255,255,255,0.20); }
        .rg-input:hover  { background: rgba(255,255,255,0.065); border-color: rgba(255,255,255,0.13); }
        .rg-input:focus  {
          background: rgba(255,255,255,0.08);
          border-color: rgba(6,182,212,0.60);
          box-shadow: 0 0 0 4px rgba(6,182,212,0.13), 0 0 24px rgba(6,182,212,0.09);
        }

        /* ── CTA ── */
        .rg-btn-wrap { margin-top: 24px; animation: rgFadeUp 0.7s 0.50s both; }
        .rg-btn {
          width: 100%; padding: 14px 20px; border: none; border-radius: 14px;
          font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: #fff; cursor: pointer; position: relative; overflow: hidden;
          background: linear-gradient(100deg, #06b6d4 0%, #7c3aed 40%, #2563eb 70%, #06b6d4 100%);
          background-size: 220% 100%;
          box-shadow: 0 8px 32px rgba(6,182,212,0.38), 0 2px 8px rgba(0,0,0,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
          animation: rgFadeUp 0.7s 0.50s both, rgBtnGrad 5s linear infinite;
          letter-spacing: 0.02em;
        }
        @keyframes rgBtnGrad {
          0%   { background-position: 0%; }
          100% { background-position: 220%; }
        }
        .rg-btn::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent 60%);
          border-radius: inherit; pointer-events: none;
        }
        .rg-btn:hover  { transform: translateY(-2px); box-shadow: 0 16px 44px rgba(6,182,212,0.48), 0 4px 12px rgba(0,0,0,0.40); }
        .rg-btn:active { transform: scale(0.98); box-shadow: 0 4px 18px rgba(6,182,212,0.30); }

        /* ── Divider + footer ── */
        .rg-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 22px 0;
          animation: rgFadeUp 0.7s 0.55s both;
        }
        .rg-div-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .rg-div-text { font-size:12px; color:rgba(255,255,255,0.22); }

        .rg-footer {
          text-align: center; font-size: 14px;
          color: rgba(255,255,255,0.30);
          animation: rgFadeUp 0.7s 0.58s both;
        }
        .rg-link {
          color: #22d3ee; text-decoration: none;
          font-weight: 500; transition: color 0.2s;
        }
        .rg-link:hover { color: #06b6d4; }

        /* ── Terms note ── */
        .rg-terms {
          text-align: center; font-size: 11px;
          color: rgba(255,255,255,0.18);
          margin-top: 18px; line-height: 1.6;
          animation: rgFadeUp 0.7s 0.62s both;
        }
        .rg-terms span { color: rgba(255,255,255,0.32); cursor: pointer; }
        .rg-terms span:hover { text-decoration: underline; }

        @keyframes rgFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @media (max-width: 480px) {
          .rg-card { padding: 36px 26px 30px; border-radius: 24px; }
          .rg-pill  { display: none; }
        }
      `}</style>

      <div className="rg-root">
        {/* Orbs */}
        <div className="rg-orb rg-orb1" />
        <div className="rg-orb rg-orb2" />
        <div className="rg-orb rg-orb3" />
        <div className="rg-orb rg-orb4" />
        <div className="rg-grid" />

        {/* Floating pills */}
        <div className="rg-pill rg-pill1">✦ Free Forever</div>
        <div className="rg-pill rg-pill2">⚡ Ready in Seconds</div>
        <div className="rg-pill rg-pill3">🔒 Secure by Default</div>
        <div className="rg-pill rg-pill4">✓ No Credit Card</div>

        {/* 3-D Card */}
        <div className="rg-scene">
          <div className="rg-card-glow" />
          <div className="rg-card">

            {/* Logo */}
            <div className="rg-logo">
              <div className="rg-icon-wrap">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <div className="rg-app-name">ProjectFlow</div>
              <div className="rg-app-sub">Create your free account</div>
            </div>

            {/* Step dots */}
            <div className="rg-steps">
              <div className="rg-step rg-step1 rg-step-active" />
              <div className="rg-step rg-step2" />
              <div className="rg-step rg-step3" />
            </div>

            {/* Form — ALL original logic preserved */}
            <form onSubmit={handleSubmit}>
              <div className="rg-field">
                <label className="rg-label">Username</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    onChange={handleChange}
                    className="rg-input"
                  />
                </div>
              </div>

              <div className="rg-field">
                <label className="rg-label">Email Address</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="rg-input"
                  />
                </div>
              </div>

              <div className="rg-field">
                <label className="rg-label">Password</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    onChange={handleChange}
                    className="rg-input"
                  />
                </div>
              </div>

              <div className="rg-btn-wrap">
                <button type="submit" className="rg-btn">
                  Create Account &nbsp;→
                </button>
              </div>
            </form>

            <div className="rg-divider">
              <div className="rg-div-line" />
              <span className="rg-div-text">already a member?</span>
              <div className="rg-div-line" />
            </div>

            <div className="rg-footer">
              <a href="/" className="rg-link">Sign in to your account</a>
            </div>

            <div className="rg-terms">
              By registering you agree to our{" "}
              <span>Terms of Service</span> and <span>Privacy Policy</span>.
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Register;