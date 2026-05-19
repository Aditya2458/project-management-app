import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
};

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects/");
      setProjects(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/projects/", formData);
      setFormData({ title: "", description: "", status: "active" });
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}/`);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const activeCount = projects.filter((p) => p.status === "active").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .db-root {
          min-height: 100vh;
          background: #04040f;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Background orbs (same as login) ── */
        .db-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          animation: dbOrbDrift 16s ease-in-out infinite alternate;
        }
        .db-orb1 { width: 700px; height: 700px; top: -200px; left: -180px; background: radial-gradient(circle, #ff2d78 0%, #ff6b35 50%, transparent 72%); opacity: 0.30; filter: blur(100px); animation-delay: 0s; }
        .db-orb2 { width: 650px; height: 650px; bottom: -200px; right: -150px; background: radial-gradient(circle, #7c3aed 0%, #2563eb 50%, transparent 72%); opacity: 0.30; filter: blur(100px); animation-delay: -5s; }
        .db-orb3 { width: 500px; height: 500px; top: 40%; left: 40%; transform: translate(-50%,-50%); background: radial-gradient(circle, #06b6d4 0%, #10b981 50%, transparent 72%); opacity: 0.20; filter: blur(90px); animation-delay: -10s; }

        @keyframes dbOrbDrift {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(30px,-25px) scale(1.06); }
          100% { transform: translate(-20px,30px) scale(0.95); }
        }
        .db-orb3 { animation-name: dbOrb3Drift; }
        @keyframes dbOrb3Drift {
          0%   { transform: translate(-50%,-50%) scale(1); }
          50%  { transform: translate(calc(-50% + 22px), calc(-50% - 18px)) scale(1.05); }
          100% { transform: translate(calc(-50% - 16px), calc(-50% + 24px)) scale(0.96); }
        }

        .db-grid {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none; z-index: 0;
        }

        /* ── Navbar ── */
        .db-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(4,4,15,0.70);
          backdrop-filter: blur(32px) saturate(1.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4);
        }
        .db-nav-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 28px; height: 62px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .db-brand { display: flex; align-items: center; gap: 10px; }
        .db-brand-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #ff2d78 0%, #ff6b35 45%, #f59e0b 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 4px rgba(255,45,120,0.12), 0 6px 18px rgba(255,45,120,0.30);
          flex-shrink: 0;
        }
        .db-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 18px; letter-spacing: -0.3px;
          background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.55));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .db-nav-right { display: flex; align-items: center; gap: 12px; }
        .db-nav-pill {
          padding: 5px 14px; border-radius: 100px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45);
        }
        .db-logout-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 10px;
          background: rgba(255,45,120,0.10);
          border: 1px solid rgba(255,45,120,0.20);
          color: #ff6b9d; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .db-logout-btn:hover {
          background: rgba(255,45,120,0.18);
          border-color: rgba(255,45,120,0.35);
          color: #ff2d78;
          box-shadow: 0 4px 18px rgba(255,45,120,0.20);
        }

        /* ── Main layout ── */
        .db-main {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 40px 28px 80px;
        }

        /* ── Page header ── */
        .db-page-header {
          margin-bottom: 36px;
          animation: fadeUp 0.7s 0.1s both;
        }
        .db-page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 36px; letter-spacing: -0.8px;
          background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.55));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 8px;
        }
        .db-page-sub { font-size: 15px; color: rgba(255,255,255,0.35); }

        /* ── Stat cards ── */
        .db-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 36px; }
        .db-stat-card {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 22px 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          animation: fadeUp 0.7s both;
        }
        .db-stat-card:nth-child(1){animation-delay:0.15s;}
        .db-stat-card:nth-child(2){animation-delay:0.22s;}
        .db-stat-card:nth-child(3){animation-delay:0.29s;}
        .db-stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.13);
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }
        .db-stat-card::before {
          content:''; position:absolute; top:0; left:10%; right:10%;
          height:1px;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.25) 50%,transparent);
        }
        .db-stat-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px; font-size: 16px;
        }
        .db-stat-icon-total { background: rgba(255,45,120,0.15); color: #ff6b9d; }
        .db-stat-icon-active { background: rgba(16,185,129,0.15); color: #34d399; }
        .db-stat-icon-done { background: rgba(99,102,241,0.15); color: #a78bfa; }
        .db-stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 32px; letter-spacing: -1px;
          color: #fff; line-height: 1; margin-bottom: 4px;
        }
        .db-stat-label { font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.32); }

        /* ── Two-col layout ── */
        .db-cols { display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: start; }

        /* ── Create form card ── */
        .db-form-card {
          position: sticky; top: 82px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px; padding: 30px 28px;
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
          animation: fadeUp 0.7s 0.35s both;
        }
        .db-form-card::before {
          content:''; position:absolute; top:0; left:10%; right:10%; height:1px;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.30) 50%,transparent);
          border-radius:1px;
        }
        .db-form-title {
          font-family:'Syne',sans-serif; font-weight:700; font-size:17px;
          color:#fff; margin-bottom:22px; letter-spacing:-0.2px;
          display:flex; align-items:center; gap:9px;
        }
        .db-form-title-dot {
          width:8px; height:8px; border-radius:50%;
          background: linear-gradient(135deg,#ff2d78,#f59e0b);
          box-shadow: 0 0 8px rgba(255,45,120,0.6);
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100%{ box-shadow:0 0 8px rgba(255,45,120,0.6); }
          50%{ box-shadow:0 0 16px rgba(255,45,120,0.9); }
        }

        .db-input, .db-select {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff; border-radius: 12px;
          padding: 12px 14px; font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: all 0.22s;
          margin-bottom: 12px;
        }
        .db-input::placeholder { color: rgba(255,255,255,0.20); }
        .db-input:hover, .db-select:hover { background: rgba(255,255,255,0.065); border-color: rgba(255,255,255,0.13); }
        .db-input:focus, .db-select:focus {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,75,145,0.6);
          box-shadow: 0 0 0 4px rgba(255,45,120,0.13);
        }
        .db-select { appearance: none; -webkit-appearance: none; cursor: pointer; }
        .db-select option { background: #111; color: #fff; }

        .db-select-wrap { position: relative; margin-bottom: 12px; }
        .db-select-wrap .db-select { margin-bottom: 0; }
        .db-select-arrow {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          pointer-events: none; color: rgba(255,255,255,0.35);
        }

        .db-add-btn {
          width: 100%; padding: 13px 20px; border: none; border-radius: 12px;
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: #fff; cursor: pointer; position: relative; overflow: hidden;
          background: linear-gradient(100deg, #ff2d78 0%, #ff6b35 35%, #f59e0b 65%, #ff2d78 100%);
          background-size: 220% 100%;
          box-shadow: 0 8px 28px rgba(255,45,120,0.38);
          transition: transform 0.15s, box-shadow 0.15s;
          animation: btnGrad 5s linear infinite;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px;
        }
        @keyframes btnGrad { 0%{background-position:0%} 100%{background-position:220%} }
        .db-add-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(to bottom,rgba(255,255,255,0.18),transparent 60%); border-radius:inherit; pointer-events:none; }
        .db-add-btn:hover { transform:translateY(-2px); box-shadow:0 14px 38px rgba(255,45,120,0.50); }
        .db-add-btn:active { transform:scale(0.98); }

        /* ── Project cards ── */
        .db-project-list { display: flex; flex-direction: column; gap: 14px; }

        .db-project-card {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.032);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 22px 24px;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          animation: fadeUp 0.6s both;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .db-project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.12);
          box-shadow: 0 20px 55px rgba(0,0,0,0.5);
          background: rgba(255,255,255,0.048);
        }
        .db-project-card::before {
          content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18) 50%,transparent);
        }

        /* accent left bar */
        .db-project-card::after {
          content:''; position:absolute; left:0; top:20%; bottom:20%;
          width:3px; border-radius:0 3px 3px 0;
          background: linear-gradient(180deg,#ff2d78,#ff6b35);
          opacity:0; transition:opacity 0.25s;
        }
        .db-project-card:hover::after { opacity:1; }

        .db-project-left { min-width:0; flex:1; }
        .db-project-header { display:flex; align-items:center; gap:10px; margin-bottom:6px; flex-wrap:wrap; }
        .db-project-title {
          font-family:'Syne',sans-serif; font-weight:700; font-size:16px;
          color:#fff; letter-spacing:-0.2px; line-height:1.2;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }

        .db-badge {
          display:inline-flex; align-items:center; gap:5px;
          padding:3px 10px; border-radius:100px;
          font-size:11px; font-weight:600; letter-spacing:0.04em;
          white-space:nowrap; flex-shrink:0;
        }
        .db-badge-dot { width:6px; height:6px; border-radius:50%; }
        .db-badge-active {
          background:rgba(16,185,129,0.12); color:#34d399;
          border:1px solid rgba(16,185,129,0.20);
        }
        .db-badge-active .db-badge-dot { background:#34d399; box-shadow:0 0 6px rgba(52,211,153,0.7); animation:dotPulse 2s ease-in-out infinite; }
        .db-badge-completed {
          background:rgba(99,102,241,0.12); color:#a78bfa;
          border:1px solid rgba(99,102,241,0.20);
        }
        .db-badge-completed .db-badge-dot { background:#a78bfa; }

        .db-project-desc { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.5; }

        .db-project-actions { display:flex; align-items:center; gap:8px; flex-shrink:0; }

        .db-view-btn {
          display:flex; align-items:center; gap:6px;
          padding:9px 16px; border-radius:10px;
          background:rgba(37,99,235,0.12); border:1px solid rgba(37,99,235,0.22);
          color:#60a5fa; font-size:13px; font-weight:500;
          font-family:'DM Sans',sans-serif; cursor:pointer;
          transition:all 0.2s;
        }
        .db-view-btn:hover {
          background:rgba(37,99,235,0.22); border-color:rgba(37,99,235,0.40);
          color:#93c5fd; box-shadow:0 4px 18px rgba(37,99,235,0.22);
        }

        .db-del-btn {
          display:flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:10px;
          background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.14);
          color:rgba(239,68,68,0.55); cursor:pointer; transition:all 0.2s;
        }
        .db-del-btn:hover {
          background:rgba(239,68,68,0.16); border-color:rgba(239,68,68,0.30);
          color:#f87171; box-shadow:0 4px 16px rgba(239,68,68,0.20);
          transform:scale(1.05);
        }

        /* ── Empty state ── */
        .db-empty {
          background:rgba(255,255,255,0.025);
          border:1px dashed rgba(255,255,255,0.10);
          border-radius:24px; padding:60px 32px;
          display:flex; flex-direction:column; align-items:center; text-align:center;
          animation: fadeUp 0.7s 0.4s both;
        }
        .db-empty-icon {
          width:64px; height:64px; border-radius:20px;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; color:rgba(255,255,255,0.20);
        }
        .db-empty-title { font-family:'Syne',sans-serif; font-weight:700; font-size:18px; color:rgba(255,255,255,0.55); margin-bottom:8px; }
        .db-empty-sub { font-size:14px; color:rgba(255,255,255,0.25); max-width:260px; line-height:1.6; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @media (max-width:900px) {
          .db-cols { grid-template-columns:1fr; }
          .db-form-card { position:static; }
          .db-stats { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:560px) {
          .db-stats { grid-template-columns:1fr 1fr; }
          .db-stats .db-stat-card:last-child { grid-column:span 2; }
          .db-main { padding:24px 16px 60px; }
          .db-nav-inner { padding:0 16px; }
          .db-nav-pill { display:none; }
        }
      `}</style>

      <div className="db-root">
        {/* Background */}
        <div className="db-orb db-orb1" />
        <div className="db-orb db-orb2" />
        <div className="db-orb db-orb3" />
        <div className="db-grid" />

        {/* ── Navbar ── */}
        <nav className="db-nav">
          <div className="db-nav-inner">
            <div className="db-brand">
              <div className="db-brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <span className="db-brand-name">ProjectFlow</span>
            </div>

            <div className="db-nav-right">
              <div className="db-nav-pill">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </div>
              <button onClick={handleLogout} className="db-logout-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </nav>

        {/* ── Main ── */}
        <main className="db-main">

          {/* Page header */}
          <div className="db-page-header">
            <h1 className="db-page-title">My Projects</h1>
            <p className="db-page-sub">Manage and track all your work in one place.</p>
          </div>

          {/* Stats */}
          <div className="db-stats">
            <div className="db-stat-card">
              <div className="db-stat-icon db-stat-icon-total">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <div className="db-stat-value">{projects.length}</div>
              <div className="db-stat-label">Total Projects</div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-icon db-stat-icon-active">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="db-stat-value">{activeCount}</div>
              <div className="db-stat-label">Active</div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-icon db-stat-icon-done">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="db-stat-value">{completedCount}</div>
              <div className="db-stat-label">Completed</div>
            </div>
          </div>

          {/* Two-col */}
          <div className="db-cols">

            {/* ── Create form ── */}
            <div className="db-form-card">
              <div className="db-form-title">
                <div className="db-form-title-dot" />
                New Project
              </div>
              <form onSubmit={createProject}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Project title"
                  onChange={handleChange}
                  required
                  className="db-input"
                />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  placeholder="Description (optional)"
                  onChange={handleChange}
                  className="db-input"
                />
                <div className="db-select-wrap">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="db-select"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                  <span className="db-select-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                <button type="submit" className="db-add-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Project
                </button>
              </form>
            </div>

            {/* ── Project list ── */}
            <div className="db-project-list">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <div
                    key={project.id}
                    className="db-project-card"
                    style={{ animationDelay: `${0.38 + i * 0.07}s` }}
                  >
                    <div className="db-project-left">
                      <div className="db-project-header">
                        <span className="db-project-title">{project.title}</span>
                        <span className={`db-badge ${project.status === "active" ? "db-badge-active" : "db-badge-completed"}`}>
                          <span className="db-badge-dot" />
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                      {project.description && (
                        <p className="db-project-desc">{project.description}</p>
                      )}
                    </div>
                    <div className="db-project-actions">
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="db-view-btn"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        View Tasks
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="db-del-btn"
                        title="Delete project"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="db-empty">
                  <div className="db-empty-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                  </div>
                  <div className="db-empty-title">No projects yet</div>
                  <p className="db-empty-sub">Create your first project using the form and start tracking your work.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;