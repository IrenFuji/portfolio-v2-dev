import React, { useMemo, useState } from "react";
import "../styles/contact.css";

export default function Contact() {
  const [toast, setToast] = useState(null); 
  const [busy, setBusy] = useState(false);

  const isDark = useMemo(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    const form = e.currentTarget;
    const name = form.elements["name"]?.value?.trim() ?? "";
    const email = form.elements["email"]?.value?.trim() ?? "";
    const message = form.elements["message"]?.value?.trim() ?? "";

    if (!name || !email || !message) {
      setToast("err");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setBusy(true);

    try {
      // FormSubmit
      const res = await fetch(
        "https://formsubmit.co/ajax/irenpavlenko22@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio contact from ${name}`,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      if (!res.ok) throw new Error("Send failed");
      setToast("ok");
      form.reset();
    } catch (err) {
      console.error(err);
      setToast("err");
    } finally {
      setBusy(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <h2 className="contact-title text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          Let’s work together{" "}
          <span role="img" aria-label="handshake">
            🤝
          </span>
        </h2>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT: FORM */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full name */}
                <div>
                  <label className="block text-lg font-semibold contact-title mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="contact-input"
                    placeholder="your full name"
                    required
                  />
                </div>

                {/* email */}
                <div>
                  <label className="block text-lg font-semibold contact-title mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="contact-input"
                    placeholder="you@example."
                    required
                  />
                </div>

                {/* message */}
                <div>
                  <label className="block text-lg font-semibold contact-title mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="contact-textarea"
                    placeholder="Hi, I’d like to collaborate..."
                    rows={5}
                    required
                  />
                </div>

                {/* submit & inline toast anchor */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="contact-outline-btn"
                    disabled={busy}
                  >
                    {busy ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>

              {/* toast pop up */}
              {toast && (
                <div className={`contact-toast ${isDark ? "" : "light"}`}>
                  <p className="font-semibold">
                    {toast === "ok"
                      ? "Thank you for connecting! I’ll reply shortly."
                      : "Please fill in all fields to send your message."}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-xl contact-right-align">
            <div className="flex flex-col gap-8">
              {/* Location */}
              <div className="flex items-start gap-4">
                <svg
                  className="mt-[2px] h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                  <p className="contact-title font-semibold">Canada</p>
                  <p className="contact-muted">Open for relocation</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <svg
                  className="mt-[2px] h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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

              {/* Email */}
              <div className="flex items-start gap-4">
                <svg
                  className="mt-[2px] h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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

              {/* socials */}
              <div className="flex items-center gap-5 contact-social">
                <a
                  href="https://www.linkedin.com/in/irenepavlenko/"
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
