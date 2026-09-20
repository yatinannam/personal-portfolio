import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Download,
  Github,
  Linkedin,
  Loader2,
} from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState(""); // Bot trap
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        "EmailJS env vars are missing at build time (VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY). " +
          "On Vercel these must be set in Project Settings → Environment Variables, not just in a local .env file.",
      );
      toast.error("Message service unavailable", {
        description: "Please email me directly at ninjayatin@gmail.com",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Message sent", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or email me directly at ninjayatin@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ninjayatin@gmail.com",
      href: "mailto:ninjayatin@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 88673 31342",
      href: "tel:+918867331342",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bengaluru, Karnataka",
      href: "https://google.com/maps?q=Bengaluru,Karnataka",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/yatinannam", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yatinannam/", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="section">
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Get in touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mt-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-10"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm open to internships, collaborations, and interesting
              engineering problems. Reach out directly or use the form.
            </p>

            <div className="space-y-5">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-md border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    <info.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="label-mono">{info.label}</p>
                    <p className="text-sm group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}

              <a
                href="/Yatin-Annam-Resume.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-md text-sm font-medium hover:border-primary/50 transition-colors ml-2"
              >
                <Download className="w-4 h-4" />
                Résumé
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="panel p-6 space-y-5">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="label-mono block mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="label-mono block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="label-mono block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
