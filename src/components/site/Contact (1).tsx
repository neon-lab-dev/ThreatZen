import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "service_tfqh8ew",
        "template_9t2ruug",
        formRef.current,
        "UuFXPNlRPwWZmUjEA"
      );

      toast.success(
        "Thanks for your interest. We will contact you shortly!",
        {
          duration: 3000,
        }
      );

      setSent(true);
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">
            Contact
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">
            Let's{" "}
            <span className="text-[var(--brand)]">
              secure
            </span>{" "}
            what matters
          </h2>

          <p className="mt-5 text-muted-foreground text-lg">
            Tell us about your security goals. A senior consultant will get
            back within one business day.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                icon: Mail,
                label: "General",
                value: "contact@threatzen.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91-7479697250",
              },
              {
                icon: MapPin,
                label: "Location",
                value:
                  "No: 1190/1, FD 94, 4th Floor, HSR Layout, Sector 3, 22nd Cross Road, Bengaluru 560102, Karnataka.",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4"
              >
                <div className="size-11 rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] grid place-items-center shrink-0">
                  <c.icon className="size-5" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </p>

                  <p className="font-semibold">
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-card border border-border p-8 shadow-elegant"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Name"
              name="name"
              required
            />

            <Field
              label="Company"
              name="company"
            />

            <Field
              label="Email"
              name="email"
              type="email"
              required
            />

            <Field
              label="Phone"
              name="phone"
            />
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Service Interested In
            </label>

            <select
              name="service"
              required
              className="mt-1.5 w-full rounded-xl bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40 focus:border-[var(--brand)]"
            >
              <option value="">
                Select a Service
              </option>
              <option value="VAPT">
                VAPT
              </option>
              <option value="Cloud Security">
                Cloud Security
              </option>
              <option value="Compliance Audit">
                Compliance Audit
              </option>
              <option value="SOC Services">
                SOC Services
              </option>
              <option value="Consulting">
                Consulting
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Message
            </label>

            <textarea
              name="message"
              rows={4}
              required
              placeholder="Tell us about your project..."
              className="mt-1.5 w-full rounded-xl bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40 focus:border-[var(--brand)]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] hover:bg-[var(--brand)]/90 text-white px-6 py-3.5 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              "Sending..."
            ) : sent ? (
              <>
                <ShieldCheck className="size-4" />
                Request Received
              </>
            ) : (
              <>
                Request Consultation
                <Send className="size-4" />
              </>
            )}
          </button>

          <p className="mt-3 text-xs text-muted-foreground text-center">
            We respect your privacy. No spam, ever.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
        {required && (
          <span className="text-[var(--brand)]">
            {" "}
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40 focus:border-[var(--brand)]"
      />
    </div>
  );
}