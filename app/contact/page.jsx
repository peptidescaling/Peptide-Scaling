"use client";

import { useEffect, useRef, useState } from "react";

const LIME = "#c6e805";
const DARK = "#1C1C1C";
const BG = "#F5F4EB";
const ALT = "#EEEDE3";





function RadioGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <div
          key={opt}
          onClick={() => onChange(opt)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
          style={{
            background: value === opt ? "rgba(198,232,5,0.15)" : ALT,
            border: `2px solid ${value === opt ? LIME : "transparent"}`,
          }}
        >
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
            style={{
              borderColor: value === opt ? LIME : "#bbb",
              background: value === opt ? LIME : "transparent",
            }}
          >
            {value === opt && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: DARK }}
              />
            )}
          </div>
          <span className="text-sm font-medium" style={{ color: DARK }}>
            {opt}
          </span>
        </div>
      ))}
    </div>
  );
}

function CheckGroup({ options, values, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <div
            key={opt}
            onClick={() => onChange(opt)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: checked ? "rgba(198,232,5,0.15)" : ALT,
              border: `2px solid ${checked ? LIME : "transparent"}`,
            }}
          >
            <div
              className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0"
              style={{
                borderColor: checked ? LIME : "#bbb",
                background: checked ? LIME : "transparent",
              }}
            >
              {checked && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={DARK}
                  strokeWidth="3.5"
                  className="w-3 h-3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium" style={{ color: DARK }}>
              {opt}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── ANIMATED COUNTER ──────────────────────────────────────────────── */
function CountUp({ to, prefix = "", suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(ease * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── SVG ICON LIBRARY (no emojis) ─────────────────────────────────── */
const Icon = {
  Shield: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Server: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Users: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Lock: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Zap: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Layers: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  RefreshCw: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  Ban: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  AlertTriangle: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  CreditCard: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  TrendingDown: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  Scissors: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  EyeOff: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  MessageSquare: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  Package: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  TrendingUp: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Target: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Film: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  ),
  CheckCircle: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  BarChart2: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Globe: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Mail: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MousePointer: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </svg>
  ),
  Heart: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Scale: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M3 6l9-3 9 3" />
      <path d="M3 18l9 3 9-3" />
      <path d="M3 6c0 3.314 2.686 6 6 6s6-2.686 6-6" />
      <path d="M15 18c0 3.314 2.686 6 6 6" />
    </svg>
  ),
  Check: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Menu: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function ContactPage() {
  const stats = [
    {
      value: 150,
      prefix: "$",
      suffix: "k /mo",
      label: "RUO Brand revenue",
      sub: "from $20k in 30 days",
    },
    {
      value: 270,
      prefix: "$",
      suffix: "k+ /mo",
      label: "Medspa Clinic revenue",
      sub: "from $160k in 30 days",
      dark: true,
    },
    {
      value: 0,
      prefix: "",
      suffix: " blackout",
      label: "Decentralized structure",
      sub: "No single point of failure",
      text: "Zero",
    },
  ];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    website: "",
    message: "",
    brandType: "",
    adSituation: "",
    monthlyRevenue: "",
    channels: [],
    adBudget: "",
    urgency: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleChannel = (val) => {
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(val)
        ? f.channels.filter((c) => c !== val)
        : [...f.channels, val],
    }));
    setErrors((e) => ({ ...e, channels: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.brandType) errs.brandType = "Please select one";
    if (!form.adSituation) errs.adSituation = "Please select one";
    if (!form.monthlyRevenue) errs.monthlyRevenue = "Please select one";
    if (form.channels.length === 0)
      errs.channels = "Please select at least one";
    if (!form.adBudget) errs.adBudget = "Please select one";
    if (!form.urgency) errs.urgency = "Please select one";
    return errs;
  };

const handleSubmit = async () => {
  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    const firstErrKey = Object.keys(errs)[0];
    document.getElementById(firstErrKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again or contact us directly.");
    }
  } catch (err) {
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const inputStyle = (hasError) => ({
    background: ALT,
    border: `2px solid ${hasError ? "#dc3535" : "transparent"}`,
    color: DARK,
    fontFamily: "inherit",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  });

  const labelStyle = {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#777",
    marginBottom: "6px",
    display: "block",
  };

  const cardStyle = (hasError) => ({
    background: "#fff",
    border: `1.5px solid ${hasError ? "#dc3535" : "#e2e0d4"}`,
    borderRadius: "16px",
    padding: "24px",
  });

  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-xs mt-1.5 font-semibold" style={{ color: "#dc3535" }}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      {/* Nav */}
      <header
        className="px-6 py-4 flex items-center justify-between border-b sticky top-0 z-50"
        style={{
          borderColor: "#e2e0d4",
          background: "rgba(245,244,235,0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        <a href="/" className="flex items-center gap-2">
          <img
            src="/arrow_logo final.png"
            alt="PeptideScaling"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-black" style={{ color: DARK }}>
              Peptide<span style={{ color: LIME }}>Scaling</span>
            </span>
            <span
              className="text-[9px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: "#999" }}
            >
              Growth Marketing Agency
            </span>
          </div>
        </a>
        <a
          href="/"
          className="text-sm font-semibold flex items-center gap-1 hover:underline"
          style={{ color: "#666" }}
        >
          ← Back
        </a>
      </header>

      {!submitted ? (
        <div className="max-w-2xl mx-auto px-6 py-16">
          {/* Heading */}
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
              style={{ background: LIME, color: DARK }}
            >
              Get In Touch
            </span>
            <h1
              className="text-3xl sm:text-4xl font-black tracking-tight mb-3"
              style={{ color: DARK }}
            >
              Let&apos;s build something that scales.
            </h1>
            <p className="text-sm" style={{ color: "#666" }}>
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* General Info */}
            <div style={cardStyle(false)}>
              <p
                className="text-sm font-black mb-5 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                General Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div id="firstName">
                  <label style={labelStyle}>First Name *</label>
                  <input
                    style={inputStyle(!!errors.firstName)}
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = LIME)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.firstName
                        ? "#dc3535"
                        : "transparent")
                    }
                  />
                  <ErrorMsg field="firstName" />
                </div>
                <div id="lastName">
                  <label style={labelStyle}>Last Name *</label>
                  <input
                    style={inputStyle(!!errors.lastName)}
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = LIME)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.lastName
                        ? "#dc3535"
                        : "transparent")
                    }
                  />
                  <ErrorMsg field="lastName" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div id="phone">
                  <label style={labelStyle}>Phone *</label>
                  <input
                    style={inputStyle(!!errors.phone)}
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = LIME)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.phone
                        ? "#dc3535"
                        : "transparent")
                    }
                  />
                  <ErrorMsg field="phone" />
                </div>
                <div id="email">
                  <label style={labelStyle}>Work Email *</label>
                  <input
                    style={inputStyle(!!errors.email)}
                    type="email"
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = LIME)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "#dc3535"
                        : "transparent")
                    }
                  />
                  <ErrorMsg field="email" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input
                    style={inputStyle(false)}
                    placeholder="Acme Peptides"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = LIME)}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Website</label>
                  <input
                    style={inputStyle(false)}
                    placeholder="https://yourbrand.com"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = LIME)}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label style={labelStyle}>Anything else you&apos;d like us to know?</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle(false), resize: "vertical", lineHeight: "1.5" }}
                  placeholder="Tell us about your current situation, goals, or anything that would help us prepare for the call..."
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = LIME)}
                  onBlur={(e) => (e.target.style.borderColor = "transparent")}
                />
              </div>
            </div>

            {/* Q1 */}
            <div id="brandType" style={cardStyle(!!errors.brandType)}>
              <p
                className="text-sm font-black mb-4 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                1. What type of peptide brand is this? *
              </p>
              <RadioGroup
                value={form.brandType}
                onChange={(v) => set("brandType", v)}
                options={[
                  "RUO / research chemical store",
                  "Medspa / telehealth / compounding clinic",
                  "Hybrid (both models)",
                  "Unknown / not sure",
                ]}
              />
              <ErrorMsg field="brandType" />
            </div>

            {/* Q2 */}
            <div id="adSituation" style={cardStyle(!!errors.adSituation)}>
              <p
                className="text-sm font-black mb-4 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                2. What is your current Meta Ads / Google Ads situation? *
              </p>
              <RadioGroup
                value={form.adSituation}
                onChange={(v) => set("adSituation", v)}
                options={[
                  "Never run ads before",
                  "Running ads but struggling (bans, spend caps)",
                  "All accounts banned — starting from scratch",
                  "Running ads successfully on our own",
                ]}
              />
              <ErrorMsg field="adSituation" />
            </div>

            {/* Q3 */}
            <div id="monthlyRevenue" style={cardStyle(!!errors.monthlyRevenue)}>
              <p
                className="text-sm font-black mb-4 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                3. Approximate current monthly revenue? *
              </p>
              <RadioGroup
                value={form.monthlyRevenue}
                onChange={(v) => set("monthlyRevenue", v)}
                options={[
                  "Under $10k/mo",
                  "$10k – $50k/mo",
                  "$50k – $200k/mo",
                  "$200k+/mo",
                ]}
              />
              <ErrorMsg field="monthlyRevenue" />
            </div>

            {/* Q4 */}
            <div id="channels" style={cardStyle(!!errors.channels)}>
              <p
                className="text-sm font-black mb-4 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                4. What channels are you currently using? *
              </p>
              <CheckGroup
                values={form.channels}
                onChange={toggleChannel}
                options={[
                  "Meta Ads",
                  "Google Ads",
                  "TikTok Ads",
                  "Not Running",
                ]}
              />
              <ErrorMsg field="channels" />
            </div>

            {/* Q5 */}
            <div id="adBudget" style={cardStyle(!!errors.adBudget)}>
              <p
                className="text-sm font-black mb-4 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                5. What is your monthly ad spend budget? *
              </p>
              <RadioGroup
                value={form.adBudget}
                onChange={(v) => set("adBudget", v)}
                options={[
                  "Under $3k/mo",
                  "$3k – $15k/mo",
                  "$15k – $50k/mo",
                  "$50k+/mo",
                ]}
              />
              <ErrorMsg field="adBudget" />
            </div>

            {/* Q6 */}
            <div id="urgency" style={cardStyle(!!errors.urgency)}>
              <p
                className="text-sm font-black mb-4 uppercase tracking-[0.12em]"
                style={{ color: DARK }}
              >
                6. How urgent is your need? *
              </p>
              <RadioGroup
                value={form.urgency}
                onChange={(v) => set("urgency", v)}
                options={[
                  "Actively looking for a solution now",
                  "Exploring options over the next month",
                  "Just researching, no timeline",
                  "Unknown",
                ]}
              />
              <ErrorMsg field="urgency" />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-base font-bold transition-all duration-300"
              style={{
                background: loading ? "rgba(28,28,28,0.5)" : DARK,
                color: LIME,
                cursor: loading ? "not-allowed" : "pointer",
                border: "none",
                boxShadow: "0 6px 28px rgba(28,28,28,0.15)",
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit & Book a Strategy Call →"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "#e2e0d4" }} />
              <span
                className="text-xs font-bold tracking-[0.14em] uppercase"
                style={{ color: "#bbb" }}
              >
                Or reach us directly
              </span>
              <div className="flex-1 h-px" style={{ background: "#e2e0d4" }} />
            </div>

            {/* Telegram + WhatsApp */}
            <div className="grid  gap-3 pb-8">
              <a
                href="https://t.me/PeptideScaling_bot"
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#24A1DE" }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Message on Telegram
              </a>

              {/* <a
                href="https://wa.me/YOUR_NUMBER"
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#25D366" }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Message on WhatsApp
              </a> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto px-6 py-24 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: LIME }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={DARK}
              strokeWidth="3"
              className="w-8 h-8"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-2xl font-black mb-2" style={{ color: DARK }}>
            You&apos;re on our radar.
          </h3>
          <p className="text-sm mb-6" style={{ color: "#666" }}>
            We&apos;ll review your submission and reach out within 24 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
            style={{ background: DARK, color: LIME }}
          >
            ← Back to site
          </a>
        </div>
      )}

      {/* // hero sections like poster */}

      <section
        id="hero"
        className="relative flex flex-col justify-center pt-3 pb-16 px-2 overflow-hidden"
        style={{ background: BG }}
      >
        {/* Gradient overlay so text reads clearly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(245,244,235,0.85) 0%, rgba(245,244,235,0.4) 100%)",
          }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div delay={0.5}>
            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "#555" }}
            >
              The only performance marketing agency built specifically for
              peptide brands and telehealth peptide clinics. The issues with ads
              are inevitable, but we have solutions.
            </p>
          </div>

          {/* Stats row */}
          <div delay={0.8}>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl overflow-hidden border"
              style={{ borderColor: "#e2e0d4" }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="px-8 py-7 flex flex-col items-center text-center relative group"
                  style={{
                    background: s.dark ? DARK : "#fff",
                    borderRight: i < 2 ? "1px solid #e2e0d4" : "none",
                  }}
                >
                  {/* Lime accent line animates on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: LIME }}
                  />
                  <div className="mb-2">
                    {i < 2 ? (
                      <svg
                        width="36"
                        height="20"
                        viewBox="0 0 36 20"
                        fill="none"
                      >
                        <polyline
                          points="2,18 8,11 14,14 22,5 32,2"
                          stroke={LIME}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="32" cy="2" r="3" fill={LIME} />
                      </svg>
                    ) : (
                      <Icon.CheckCircle
                        className="w-6 h-6"
                        style={{ color: DARK }}
                      />
                    )}
                  </div>
                  <span
                    className="text-2xl sm:text-3xl font-black mb-1 tracking-tight"
                    style={{ color: s.dark ? LIME : DARK }}
                  >
                    {s.text ?? (
                      <CountUp
                        to={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                      />
                    )}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: s.dark ? "#ccc" : "#555" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-xs mt-0.5"
                    style={{ color: s.dark ? "#888" : "#999" }}
                  >
                    {s.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform strip */}
          <div delay={1.0}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <p
                className="text-xs font-bold tracking-[0.16em] uppercase"
                style={{ color: "#bbb" }}
              >
                Channels we operate on
              </p>
              <div className="flex items-center gap-8 flex-wrap justify-center">
                {[
                  {
                    label: "Meta Ads",
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="black"
                      >
                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Google Ads",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="black"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Email & CRM",
                    icon: <Icon.Mail className="w-4 h-4" />,
                  },
                  {
                    label: "Website CRO",
                    icon: <Icon.MousePointer className="w-4 h-4" />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 opacity-35 hover:opacity-70 transition-opacity duration-300"
                    style={{ color: DARK }}
                  >
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
