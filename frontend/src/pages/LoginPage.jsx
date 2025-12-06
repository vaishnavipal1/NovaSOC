
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordStrength("Weak");
    } else if (value.match(/[A-Z]/) && value.match(/[0-9]/)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = passwordStrength !== "Weak" && password.length >= 6;
  const isValid = emailValid && passwordValid;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000814] text-white">
      <div className="w-[400px] bg-[#0A0F1F] p-10 rounded-xl border border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.15)] text-center">
        
        <h2 className="text-3xl font-bold text-[#00E5FF] mb-8">Login</h2>

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-12 text-[15px] bg-[#101B2E] border border-cyan-300/30 rounded-md 
                       focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,231,255,0.5)] 
                       outline-none text-white peer"
          />
          <label className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-[#7FE9FF] 
                            pointer-events-none transition-all peer-focus:top-[-6px] 
                            peer-focus:left-3 peer-focus:text-xs peer-focus:bg-[#0A0F1F]
                            peer-not-placeholder-shown:top-[-6px] peer-not-placeholder-shown:left-3 
                            peer-not-placeholder-shown:text-xs">
            Email
          </label>
          {!emailValid && email.length > 0 && (
            <p className="text-red-400 text-xs text-left mt-1">Invalid email format</p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-3">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            className="w-full h-12 px-12 text-[15px] bg-[#101B2E] border border-cyan-300/30 rounded-md
                       focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,231,255,0.5)]
                       outline-none text-white peer"
          />
          <label className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-[#7FE9FF]
                            pointer-events-none transition-all peer-focus:top-[-6px]
                            peer-focus:left-3 peer-focus:text-xs peer-focus:bg-[#0A0F1F]
                            peer-not-placeholder-shown:top-[-6px] peer-not-placeholder-shown:left-3
                            peer-not-placeholder-shown:text-xs">
            Password
          </label>
        </div>

        {/* Strength indicator */}
        {password && (
          <p
            className={`text-xs text-left mt-[-4px] mb-2 ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                ? "text-yellow-300"
                : "text-green-400"
            }`}
          >
            Strength: {passwordStrength}
          </p>
        )}

        {/* Remember Me + Forgot Password */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="scale-110 accent-cyan-400" />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-[#00E7FF] hover:text-cyan-300"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Btn */}
        <button
          disabled={!isValid}
          className="w-full h-12 rounded-lg text-lg font-semibold bg-[#0077FF]
                     hover:bg-[#62b5e5] transition shadow-[0_0_12px_#00E5FF]
                     disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
        >
          Login
        </button>
      </div>
    </div>
  );
}
