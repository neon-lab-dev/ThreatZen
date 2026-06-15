import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  // FaFacebook,
  // FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../../assets/threatzen-logo.png";

const columns = [
  {
    title: "ThreatZen",
    links: [
      { label: "About", to: "/about" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "VAPT", to: "/services" },
      { label: "Compliance", to: "/services" },
      { label: "Cloud Security", to: "/services" },
      { label: "SOC Services", to: "/services" },
      { label: "Consulting", to: "/services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Banking", to: "/industries" },
      { label: "FinTech", to: "/industries" },
      { label: "Healthcare", to: "/industries" },
      { label: "Manufacturing", to: "/industries" },
    ],
  },
  // {
  //   title: "Resources",
  //   links: [
  //     { label: "Blogs", to: "/" },
  //     { label: "Case Studies", to: "/case-studies" },
  //     { label: "Security Insights", to: "/" },
  //     { label: "FAQs", to: "/" },
  //   ],
  // },
];

export function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-white/80 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="bg-white/95 rounded-lg px-2 py-1 inline-block shadow-sm">
              <img src={logo} alt="ThreatZen™" className="h-8 w-auto" />
            </div>
            <p
              className={`text-[10px] font-semibold tracking-[0.18em] uppercase`}
            >
              Next-Gen <span className="text-[var(--brand)]">Cyber</span>{" "}
              Resilience
            </p>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Cybersecurity & compliance consulting helping enterprises identify
              risk, strengthen defenses, and meet regulatory requirements.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="size-4 text-[var(--brand)] mt-0.5 shrink-0" />
                <span>
                  No: 1190/1, FD 94, 4th Floor, HSR Layout, Sector 3, 22nd Cross
                  Road, Bengaluru 560102, Karnataka, India.
                </span>
              </p>
              <a href="mailto:contact@threatzen.in" className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4 text-[var(--brand)]" />{" "}
                contact@threatzen.in
              </a>
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-[var(--brand)]" />
                <a href="tel:+917479697250" className="hover:text-white">
                  +91-7479697250
                </a>
                <span className="text-white/40">·</span>
                <a
                  href="https://wa.me/917479697250"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
           
            <div className="mt-6 flex gap-3">
              {[
                // { Icon: FaFacebook, link: "https://facebook.com/yourpage" },
                { Icon: FaInstagram, link: "https://www.instagram.com/threatzen" },
                // { Icon: FaTwitter, link: "https://twitter.com/yourhandle" },
                {
                  Icon: FaLinkedin,
                  link: "https://www.linkedin.com/company/threatzen",
                },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full glass-dark grid place-items-center hover:bg-[var(--brand)] hover:text-[var(--navy-deep)] transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-white/65 hover:text-[var(--brand)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/55">
          <p>©️ 2026 ThreatZen. Next-Gen Cyber Resilience. (A wholly owned subsidiary of MitraTech Ventures.)</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
