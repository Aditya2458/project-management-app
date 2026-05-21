import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login/", formData);
      login(response.data.access);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

        .lp-root {
          min-height: 100vh;
          background: #04040f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* ── Animated colour orbs ── */
        .lp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          animation: orbDrift 14s ease-in-out infinite alternate;
        }
        .lp-orb1 { width: 600px; height: 600px; top: -160px; left: -140px; background: radial-gradient(circle, #ff2d78 0%, #ff6b35 55%, transparent 75%); opacity: 0.55; animation-delay: 0s; }
        .lp-orb2 { width: 550px; height: 550px; bottom: -130px; right: -100px; background: radial-gradient(circle, #7c3aed 0%, #2563eb 55%, transparent 75%); opacity: 0.55; animation-delay: -4s; }
        .lp-orb3 { width: 400px; height: 400px; top: 45%; left: 48%; transform: translate(-50%,-50%); background: radial-gradient(circle, #06b6d4 0%, #10b981 55%, transparent 75%); opacity: 0.45; animation-delay: -8s; animation-duration: 10s; }
        .lp-orb4 { width: 320px; height: 320px; top: 8%; right: 12%; background: radial-gradient(circle, #f59e0b 0%, #ef4444 55%, transparent 75%); opacity: 0.45; animation-delay: -2s; animation-duration: 18s; }

        @keyframes orbDrift {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(28px,-22px) scale(1.08); }
          100% { transform: translate(-18px,28px) scale(0.94); }
        }
        .lp-orb3 { animation-name: orbDrift3; }
        @keyframes orbDrift3 {
          0%   { transform: translate(-50%,-50%) scale(1); }
          50%  { transform: translate(calc(-50% + 20px), calc(-50% - 18px)) scale(1.06); }
          100% { transform: translate(calc(-50% - 14px), calc(-50% + 22px)) scale(0.96); }
        }

        /* dot grid */
        .lp-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* ── Floating pills ── */
        .lp-pill {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          pointer-events: none;
          animation: pillFloat 7s ease-in-out infinite alternate;
        }
        .lp-pill1 { top: 13%; left: 5%; animation-delay: 0s; }
        .lp-pill2 { top: 20%; right: 5%; animation-delay: -2.5s; }
        .lp-pill3 { bottom: 20%; left: 4%; animation-delay: -4s; }
        .lp-pill4 { bottom: 14%; right: 6%; animation-delay: -1s; }
        @keyframes pillFloat {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-14px); }
        }

        /* ── 3-D card scene ── */
        .lp-scene {
          perspective: 1400px;
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          padding: 16px;
        }
        .lp-card {
          position: relative;
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(48px) saturate(2);
          -webkit-backdrop-filter: blur(48px) saturate(2);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 30px;
          padding: 48px 44px 44px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 40px 90px rgba(0,0,0,0.65),
            0 80px 140px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.13);
          transform: rotateX(3deg) rotateY(-1.5deg);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s;
          animation: cardReveal 1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .lp-card:hover {
          transform: rotateX(0deg) rotateY(0deg) translateY(-6px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 50px 110px rgba(0,0,0,0.7),
            0 100px 160px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.16);
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: rotateX(10deg) rotateY(-5deg) translateY(50px); }
          to   { opacity: 1; transform: rotateX(3deg) rotateY(-1.5deg) translateY(0); }
        }

        /* shimmer rim on top */
        .lp-card::after {
          content: '';
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 50%, transparent);
          border-radius: 1px;
          pointer-events: none;
        }

        /* coloured glow behind card */
        .lp-card-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50px;
          background: conic-gradient(from 220deg, #ff2d78, #ff6b35, #f59e0b, #10b981, #2563eb, #7c3aed, #ff2d78);
          filter: blur(40px);
          opacity: 0.18;
          z-index: -1;
          animation: glowSpin 8s linear infinite;
        }
        @keyframes glowSpin {
          to { transform: rotate(360deg); }
        }

        /* ── Logo ── */
        .lp-logo { display: flex; flex-direction: column; align-items: center; margin-bottom: 38px; animation: fadeUp 0.8s 0.15s both; }
        .lp-icon-wrap {
          width: 68px; height: 68px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ff2d78 0%, #ff6b35 45%, #f59e0b 100%);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 0 0 10px rgba(255,45,120,0.10), 0 0 0 20px rgba(255,45,120,0.05), 0 18px 45px rgba(255,45,120,0.38);
          animation: iconPulse 3s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%,100% { box-shadow: 0 0 0 10px rgba(255,45,120,0.10), 0 0 0 20px rgba(255,45,120,0.05), 0 18px 45px rgba(255,45,120,0.38); }
          50%      { box-shadow: 0 0 0 14px rgba(255,45,120,0.14), 0 0 0 28px rgba(255,45,120,0.07), 0 24px 55px rgba(255,45,120,0.48); }
        }
        .lp-app-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 30px;
          letter-spacing: -0.6px;
          background: linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.55));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
          line-height: 1;
        }
        .lp-app-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.02em;
        }

        /* ── Fields ── */
        .lp-field { margin-bottom: 14px; animation: fadeUp 0.7s both; }
        .lp-field:nth-of-type(1) { animation-delay: 0.28s; }
        .lp-field:nth-of-type(2) { animation-delay: 0.36s; }

        .lp-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
        }
        .lp-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          border-radius: 13px;
          padding: 13px 16px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.22s;
        }
        .lp-input::placeholder { color: rgba(255,255,255,0.2); }
        .lp-input:hover  { background: rgba(255,255,255,0.065); border-color: rgba(255,255,255,0.13); }
        .lp-input:focus  {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,75,145,0.65);
          box-shadow: 0 0 0 4px rgba(255,45,120,0.14), 0 0 24px rgba(255,45,120,0.10);
        }

        /* ── CTA button ── */
        .lp-btn-wrap { margin-top: 24px; animation: fadeUp 0.7s 0.44s both; }
        .lp-btn {
          width: 100%;
          padding: 14px 20px;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(100deg, #ff2d78 0%, #ff6b35 30%, #f59e0b 60%, #ff2d78 100%);
          background-size: 220% 100%;
          box-shadow: 0 8px 32px rgba(255,45,120,0.42), 0 2px 8px rgba(0,0,0,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
          animation: fadeUp 0.7s 0.44s both, btnGrad 5s linear infinite;
          letter-spacing: 0.02em;
        }
        @keyframes btnGrad {
          0%   { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }
        .lp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent 60%);
          border-radius: inherit;
          pointer-events: none;
        }
        .lp-btn:hover  { transform: translateY(-2px); box-shadow: 0 16px 44px rgba(255,45,120,0.52), 0 4px 12px rgba(0,0,0,0.4); }
        .lp-btn:active { transform: scale(0.98); box-shadow: 0 4px 18px rgba(255,45,120,0.35); }

        /* ── Divider + footer ── */
        .lp-divider { display: flex; align-items: center; gap: 10px; margin: 22px 0; animation: fadeUp 0.7s 0.5s both; }
        .lp-div-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .lp-div-text { font-size: 12px; color: rgba(255,255,255,0.22); }

        .lp-footer { text-align: center; font-size: 14px; color: rgba(255,255,255,0.3); animation: fadeUp 0.7s 0.54s both; }
        .lp-link { color: #ff6b9d; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .lp-link:hover { color: #ff2d78; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .lp-card { padding: 36px 26px 30px; border-radius: 24px; }
          .lp-pill { display: none; }
        }
      `}</style>

      <div className="lp-root">
        {/* Orbs */}
        <div className="lp-orb lp-orb1" />
        <div className="lp-orb lp-orb2" />
        <div className="lp-orb lp-orb3" />
        <div className="lp-orb lp-orb4" />
        {/* Dot grid */}
        <div className="lp-grid" />

        {/* Floating pills */}
        <div className="lp-pill lp-pill1">✦ Secure &amp; Encrypted</div>
        <div className="lp-pill lp-pill2">⚡ Blazing Fast</div>
        <div className="lp-pill lp-pill3">🔒 JWT Protected</div>
        <div className="lp-pill lp-pill4">✓ Production Ready</div>

        {/* 3-D Card */}
        <div className="lp-scene">
          <div className="lp-card-glow" />
          <div className="lp-card">

            {/* Logo */}
            <div className="lp-logo">
              <div className="lp-icon-wrap">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <div className="lp-app-name">ProjectFlow</div>
              <div className="lp-app-sub">Sign in to your workspace</div>
            </div>

            {/* Form — ALL original logic preserved */}
            <form onSubmit={handleSubmit}>
              <div className="lp-field">
                <label className="lp-label">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  className="lp-input"
                />
              </div>

              <div className="lp-field">
                <label className="lp-label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  onChange={handleChange}
                  className="lp-input"
                />
              </div>

              <div className="lp-btn-wrap">
                <button type="submit" className="lp-btn">
                  Sign in to ProjectFlow &nbsp;→
                </button>
              </div>
            </form>

            <div className="lp-divider">
              <div className="lp-div-line" />
              <span className="lp-div-text">or</span>
              <div className="lp-div-line" />
            </div>

            <div className="lp-footer">
              New to ProjectFlow?{" "}
              <a href="/register" className="lp-link">Create an account</a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;