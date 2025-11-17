import React, { useMemo, useState } from "react";
import "../styles/contact.css";

export default function Contact() {
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const isDark = useMemo(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
    []
  );

  const clearFieldError = (field) =>
    setErrors((e) => (e[field] ? { ...e, [field]: false } : e));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    const form = e.currentTarget;
    const name = form.elements["name"]?.value?.trim() ?? "";
    const email = form.elements["email"]?.value?.trim() ?? "";
    const message = form.elements["message"]?.value?.trim() ?? "";
    const honey = form.elements["_honey"]?.value ?? "";

    if (honey) return;

    const nextErrors = { name: !name, email: !email, message: !message };
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setToast("err");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // ---- Web3Forms submission ----
    setBusy(true);

    try {
      const formData = new FormData(form);
      formData.append("access_key", "58511850-450f-4194-a50c-b9c44dc9a1ae");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setToast("ok");
        form.reset();
      } else {
        console.error("Web3Forms Error:", data);
        setToast("err");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setToast("err");
    } finally {
      setBusy(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-10 sm:py-12 lg:py-16 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <h2 className="contact-title text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          Let’s work together{" "}
          <span role="img" aria-label="handshake" className="handshake-emoji">
            🤝
          </span>
        </h2>

        <div
          className="
            mt-6 sm:mt-8
            grid grid-cols-1 lg:grid-cols-2
            gap-8 lg:gap-12
            items-center
            justify-items-center
          "
        >
          <div className="w-full max-w-2xl place-self-center">
            <div className="relative">
              
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                {/* Full name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-base sm:text-lg contact-title mb-2"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    onChange={() => clearFieldError("name")}
                    className={`contact-input ${
                      errors.name ? "contact-field--error" : ""
                    }`}
                    placeholder="your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base sm:text-lg contact-title mb-2"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    onChange={() => clearFieldError("email")}
                    className={`contact-input ${
                      errors.email ? "contact-field--error" : ""
                    }`}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-base sm:text-lg contact-title mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    minLength={10}
                    rows={5}
                    onChange={() => clearFieldError("message")}
                    className={`contact-textarea ${
                      errors.message ? "contact-field--error" : ""
                    }`}
                    placeholder="Hi, I’d like to collaborate..."
                    required
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="contact-primary-btn"
                    disabled={busy}
                  >
                    {busy ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>

              {/* Toast */}
              {toast && (
                <div
                  className={`contact-toast ${isDark ? "" : "light"}`}
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-semibold">
                    {toast === "ok"
                      ? "Thank you for connecting! I’ll reply shortly."
                      : "Please fill in all fields to send your message."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full max-w-xl contact-right-align place-self-center">
            <div className="flex flex-col gap-7">
              <div className="flex items-start gap-4">
                <svg
                  className="mt-[2px] h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z"
                    stroke="var(--contact-accent)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="var(--contact-accent)"
                    strokeWidth="2"
                  />
                </svg>
                <div className="leading-6">
                  <p className="contact-title font-semibold">Based in Canada</p>
                  <p className="contact-muted">
                    Canadian Citizen • Open to relocation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="mt-[2px] h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 5c0-1.1.9-2 2-2h2.1c.86 0 1.6.54 1.87 1.35l1 3a2 2 0 0 1-.47 2.03l-1.2 1.2a12.5 12.5 0 0 0 4.82 4.82l1.2-1.2a2 2 0 0 1 2.03-.47l3 1A2 2 0 0 1 21 17.9V20a2 2 0 0 1-2 2h-1c-7.18 0-13-5.82-13-13V7a2 2 0 0 1-2-2Z"
                    stroke="var(--contact-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="tel:+15143497508"
                  className="contact-title font-semibold hover:underline underline-offset-4"
                >
                  +1 (514) 349-7508
                </a>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="mt-[2px] h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 0 8 7 8-7"
                    stroke="var(--contact-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="mailto:irenpavlenko22@gmail.com"
                  className="contact-title font-semibold hover:underline underline-offset-4 break-all"
                >
                  irenpavlenko22@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-5 contact-social">
                <a
                  href="https://www.linkedin.com/in/irenpavlenko"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="text-[var(--contact-title)] hover:opacity-80 transition"
                >
                  <i className="devicon-linkedin-plain" />
                </a>
                <a
                  href="https://github.com/IrenFuji"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="text-[var(--contact-title)] hover:opacity-80 transition"
                >
                  <i className="devicon-github-original" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
