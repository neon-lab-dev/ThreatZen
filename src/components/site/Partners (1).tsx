import bdSoftware from "../../assets/partners/BD-Software.png";
import cisco from "../../assets/partners/Cisco.png";
import fortinet from "../../assets/partners/Fortinet.png";
import iemLabs from "../../assets/partners/IEM-Labs.png";
import kaspersky from "../../assets/partners/Kaspersky.png";
import netApp from "../../assets/partners/NetApp.svg";
import netwrix from "../../assets/partners/Netwrix.webp";
import secureView from "../../assets/partners/SecurView.png";
import sentinelOne from "../../assets/partners/Sentinel-One.png";
import signellent from "../../assets/partners/Signellent.webp";
import sophos from "../../assets/partners/Sophos.png";
import iFlow from "../../assets/partners/iFlow.webp";
import miniOrange from "../../assets/partners/miniOrange.webp";

const technologyPartners = [
  bdSoftware,
  cisco,
  fortinet,
  iemLabs,
  kaspersky,
  netApp,
  netwrix,
  secureView,
  sentinelOne,
  signellent,
  sophos,
  iFlow,
  miniOrange,
];

export function Partners() {
  const loop = [...technologyPartners, ...technologyPartners];
  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">
            Trusted by
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold">
            Technology & Strategic Partners
          </h2>
        </div>
      </div>

      <div className="mt-12 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-12 animate-marquee w-max">
          {loop.map((p, i) => (
            <img key={i} src={p} alt="" className="w-40 h-16" />
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        …and many more technology partners
      </p>

      {/* Tools-wise partners */}
      {/* <div className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">By Capability</p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold">Tool-wise Technology Partners</h2>
          <p className="mt-4 text-muted-foreground">
            Best-of-breed partners across EDR, XDR, DLP, MDM, SIEM, SOC, firewall and data infrastructure.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {toolCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl p-6 bg-card border border-border hover:border-[var(--brand)]/40 hover:shadow-elegant transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] grid place-items-center group-hover:bg-[var(--brand)] group-hover:text-[var(--navy-deep)] transition-colors">
                  <cat.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.partners.map((p) => (
                  <span
                    key={p}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground/80 border border-border"
                  >
                    {p}
                  </span>
                ))}
                {cat.note && (
                  <span className="text-xs text-muted-foreground self-center italic">{cat.note}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
