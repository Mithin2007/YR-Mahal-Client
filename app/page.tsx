"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Church,
  Clock3,
  Facebook,
  Gem,
  HeartHandshake,
  Home,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Sparkles,
  UsersRound,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const phoneDisplay = "099941 73555";
const phoneNumber = "+919994173555";
const whatsappUrl =
  "https://wa.me/919994173555?text=Hello%20Y.R.%20Mahal%2C%20I%20would%20like%20to%20enquire%20about%20booking%20the%20venue.";
const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Y.R.%20Mahal%20Water%20Tank%20Road%20Near%20Water%20Tank%20Nagercoil%20Tamil%20Nadu%20629001";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Location", href: "#location" },
  { label: "Enquire", href: "#enquiry" }
];

const gallery = [
  {
    src: "/venue/yr-mahal-exterior-wide-enhanced.webp",
    alt: "Y.R. Mahal illuminated exterior at night",
    title: "Illuminated facade",
    className: "h-[340px] md:h-[460px]"
  },
  {
    src: "/venue/yr-mahal-stage-enhanced.webp",
    alt: "Decorated wedding stage inside Y.R. Mahal",
    title: "Wedding stage decor",
    className: "h-[260px] md:h-[340px]"
  },
  {
    src: "/venue/yr-mahal-hall-enhanced.webp",
    alt: "Event hall seating arrangement at Y.R. Mahal",
    title: "Spacious seating",
    className: "h-[360px] md:h-[520px]"
  },
  {
    src: "/venue/yr-mahal-exterior-front-enhanced.webp",
    alt: "Front entrance and driveway at Y.R. Mahal",
    title: "Grand arrival",
    className: "h-[300px] md:h-[420px]"
  }
];

const features = [
  {
    title: "Elegant Event Space",
    copy: "A polished setting designed for graceful entrances, memorable rituals, and refined guest experiences.",
    icon: Gem
  },
  {
    title: "Wedding Functions",
    copy: "A warm venue environment for traditional ceremonies, muhurtham events, and multi-family gatherings.",
    icon: Church
  },
  {
    title: "Reception Events",
    copy: "An impressive backdrop for evening receptions, stage moments, photography, and guest hospitality.",
    icon: Sparkles
  },
  {
    title: "Family Celebrations",
    copy: "Suitable for milestone functions, naming ceremonies, birthdays, anniversaries, and intimate celebrations.",
    icon: UsersRound
  },
  {
    title: "Convenient Location",
    copy: "Located on Water Tank Road near Water Tank, with a straightforward route for guests in Nagercoil.",
    icon: MapPin
  },
  {
    title: "Dedicated Support",
    copy: "A venue team focused on clear coordination before and during your event.",
    icon: HeartHandshake
  }
];

const events = [
  { title: "Weddings", icon: Church, image: "/venue/yr-mahal-stage-enhanced.webp" },
  { title: "Receptions", icon: Sparkles, image: "/venue/yr-mahal-exterior-wide-enhanced.webp" },
  { title: "Engagement Ceremonies", icon: Gem, image: "/venue/yr-mahal-stage-enhanced.webp" },
  { title: "Family Functions", icon: Home, image: "/venue/yr-mahal-hall-enhanced.webp" },
  { title: "Corporate Events", icon: BriefcaseBusiness, image: "/venue/yr-mahal-hall-enhanced.webp" },
  { title: "Community Gatherings", icon: Building2, image: "/venue/yr-mahal-exterior-front-enhanced.webp" }
];

const testimonials = [
  {
    name: "Sample Family Guest",
    note: "Sample testimonial design for demonstration. This space can feature a genuine guest experience after approval from the venue owner."
  },
  {
    name: "Sample Event Host",
    note: "Sample testimonial design for demonstration. Use verified customer feedback here to build trust without making unsupported claims."
  },
  {
    name: "Sample Reception Client",
    note: "Sample testimonial design for demonstration. Replace this with a real review once the business provides one."
  }
];

const formInitial = {
  name: "",
  phone: "",
  eventType: "",
  eventDate: "",
  message: ""
};

type FormValues = typeof formInitial;
type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [formValues, setFormValues] = useState(formInitial);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const mapEmbed = useMemo(
    () =>
      "https://www.google.com/maps?q=Y.R.%20Mahal%20Water%20Tank%20Road%20Nagercoil%20Tamil%20Nadu%20629001&output=embed",
    []
  );

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.16 }
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function validateForm(values: FormValues) {
    const errors: FormErrors = {};

    if (values.name.trim().length < 2) {
      errors.name = "Please enter your name.";
    }

    if (!/^[0-9+\s-]{8,16}$/.test(values.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!values.eventType) {
      errors.eventType = "Please choose an event type.";
    }

    if (!values.eventDate) {
      errors.eventDate = "Please select an event date.";
    }

    if (values.message.trim().length < 10) {
      errors.message = "Please share a few details about the event.";
    }

    return errors;
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      const text = encodeURIComponent(
        `Hello Y.R. Mahal, I would like to enquire about an event.\n\nName: ${formValues.name}\nPhone: ${formValues.phone}\nEvent Type: ${formValues.eventType}\nEvent Date: ${formValues.eventDate}\nMessage: ${formValues.message}`
      );
      window.open(`https://wa.me/919994173555?text=${text}`, "_blank", "noopener,noreferrer");
    }
  }

  function moveLightbox(direction: "previous" | "next") {
    if (activeImage === null) return;
    const delta = direction === "next" ? 1 : -1;
    setActiveImage((activeImage + delta + gallery.length) % gallery.length);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-porcelain text-ink">
      <div className="fixed left-0 top-0 z-[60] h-1 w-full">
        <div
          className="h-full bg-gold-sheen transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventVenue",
            name: "Y.R. Mahal",
            telephone: phoneNumber,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Water Tank Road, Near Water Tank",
              addressLocality: "Nagercoil",
              addressRegion: "Tamil Nadu",
              postalCode: "629001",
              addressCountry: "IN"
            },
            image: gallery.map((item) => item.src)
          })
        }}
      />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-5 md:px-8">
        <nav
          aria-label="Primary navigation"
          className="glass premium-ring mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6"
        >
          <a href="#home" className="luxury-focus flex items-center gap-3 rounded-full">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-sheen font-display text-lg font-bold text-white">
              YR
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-bold text-charcoal">Y.R. Mahal</span>
              <span className="hidden text-xs uppercase text-deepGold sm:block">Nagercoil</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="luxury-focus rounded-full px-4 py-2 text-sm font-medium text-charcoal/75 transition hover:bg-cream hover:text-charcoal"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${phoneNumber}`}
              className="luxury-focus hidden rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink md:inline-flex"
            >
              Call Now
            </a>
            <button
              aria-label="Open navigation menu"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="luxury-focus grid h-11 w-11 place-items-center rounded-full border border-deepGold/20 text-charcoal lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="glass premium-ring mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl p-3 lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section id="home" className="relative flex min-h-screen items-end overflow-hidden bg-charcoal">
        <Image
          src="/venue/yr-mahal-exterior-wide-enhanced.webp"
          alt="Y.R. Mahal luxury wedding venue exterior at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/34 via-charcoal/30 to-charcoal/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(223,194,122,0.22),transparent_32%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-36 md:px-8 md:pb-20">
          <div className="max-w-3xl reveal-up">
            <p className="section-kicker mb-5 text-xs font-bold text-softGold">
              Premium wedding and event venue in Nagercoil
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Celebrate Life's Most Precious Moments
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              A Premium Wedding & Event Venue in Nagercoil
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#gallery"
                className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen px-7 py-4 text-sm font-bold text-charcoal shadow-luxury transition hover:translate-y-[-1px]"
              >
                View Gallery <ArrowUpRight size={18} />
              </a>
              <a
                href="#contact"
                className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full border border-white/34 bg-white/12 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Contact Us <Phone size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-porcelain px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div data-reveal className="scroll-reveal">
            <p className="section-kicker text-xs font-bold text-deepGold">About Y.R. Mahal</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal md:text-6xl">
              A refined setting for meaningful celebrations.
            </h2>
            <p className="mt-6 text-base leading-8 text-ink/72 md:text-lg">
              Y.R. Mahal is a wedding and event venue in Nagercoil created for occasions that bring
              families, friends, and communities together. From wedding ceremonies and receptions to
              engagements, family events, and corporate gatherings, the venue offers an elegant
              atmosphere for hosting with confidence.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Wedding and reception-ready spaces",
                "Elegant entry and photo-friendly facade",
                "Stage-focused event flow",
                "Central Nagercoil location"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 text-royalGold" size={20} />
                  <span className="text-sm font-semibold leading-6 text-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="scroll-reveal grid gap-4 sm:grid-cols-2">
            <div className="premium-ring relative h-[420px] overflow-hidden rounded-[2rem] sm:mt-16">
              <Image
                src="/venue/yr-mahal-hall-enhanced.webp"
                alt="Y.R. Mahal hall seating and event aisle"
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="premium-ring rounded-[2rem] bg-charcoal p-8 text-white">
                <Clock3 className="mb-8 text-softGold" size={30} />
                <h3 className="font-display text-3xl font-bold">Designed for unhurried hospitality.</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  A calm, polished experience for arrivals, ceremonies, dining, and guest movement.
                </p>
              </div>
              <div className="premium-ring relative h-[250px] overflow-hidden rounded-[2rem]">
                <Image
                  src="/venue/yr-mahal-stage-enhanced.webp"
                  alt="Decorated wedding stage at Y.R. Mahal"
                  fill
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="scroll-reveal max-w-2xl">
            <p className="section-kicker text-xs font-bold text-deepGold">Why choose Y.R. Mahal</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal md:text-6xl">
              Every important detail, presented with care.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                data-reveal
                className="scroll-reveal premium-ring group rounded-[1.75rem] border border-deepGold/10 bg-porcelain p-7 transition hover:-translate-y-1 hover:shadow-luxury"
              >
                <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-gold-sheen text-charcoal">
                  <feature.icon size={25} />
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/68">{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-charcoal px-5 py-20 text-white md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div data-reveal className="scroll-reveal max-w-2xl">
              <p className="section-kicker text-xs font-bold text-softGold">Venue gallery</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                Spaces that photograph beautifully.
              </h2>
            </div>
            <a
              href={`tel:${phoneNumber}`}
              className="luxury-focus inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-charcoal transition hover:bg-softGold"
            >
              Enquire Availability <Phone size={17} />
            </a>
          </div>

          <div className="masonry mt-12">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveImage(index)}
                data-reveal
                className={`masonry-item scroll-reveal group luxury-focus relative w-full overflow-hidden rounded-[1.75rem] ${item.className}`}
                aria-label={`Open gallery image: ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/76 via-charcoal/10 to-transparent opacity-80" />
                <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-white">{item.title}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/16 backdrop-blur">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="bg-porcelain px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="scroll-reveal max-w-2xl">
            <p className="section-kicker text-xs font-bold text-deepGold">Events we host</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal md:text-6xl">
              Built for ceremonies, celebrations, and gatherings.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((eventItem) => (
              <article
                key={eventItem.title}
                data-reveal
                className="scroll-reveal premium-ring group overflow-hidden rounded-[1.75rem] bg-white transition hover:-translate-y-1 hover:shadow-luxury"
              >
                <div className="relative h-56">
                  <Image
                    src={eventItem.image}
                    alt={`${eventItem.title} at Y.R. Mahal`}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 44vw, 90vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <div className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-2xl bg-white text-deepGold">
                    <eventItem.icon size={22} />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-3xl font-bold text-charcoal">{eventItem.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/68">
                    A considered venue setting for hosting {eventItem.title.toLowerCase()} with
                    poise, comfort, and clear coordination.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="bg-cream px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div data-reveal className="scroll-reveal premium-ring rounded-[2rem] bg-charcoal p-8 text-white md:p-10">
            <p className="section-kicker text-xs font-bold text-softGold">Location</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              Easy to find in Nagercoil.
            </h2>
            <address className="mt-8 not-italic text-lg leading-9 text-white/78">
              <strong className="text-white">Y.R. Mahal</strong>
              <br />
              Water Tank Road,
              <br />
              Near Water Tank,
              <br />
              Nagercoil,
              <br />
              Tamil Nadu 629001
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="luxury-focus mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen px-7 py-4 text-sm font-bold text-charcoal transition hover:translate-y-[-1px]"
            >
              Get Directions <MapPin size={18} />
            </a>
          </div>
          <div data-reveal className="scroll-reveal premium-ring min-h-[420px] overflow-hidden rounded-[2rem] bg-white">
            <iframe
              title="Google Maps placeholder for Y.R. Mahal"
              src={mapEmbed}
              className="h-full min-h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-porcelain px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal className="scroll-reveal">
              <p className="section-kicker text-xs font-bold text-deepGold">Contact</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal md:text-6xl">
                Begin your event enquiry.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-ink/70">
                Speak with Y.R. Mahal for wedding, reception, engagement, family function, corporate
                event, and community gathering availability.
              </p>
              <div className="premium-ring mt-8 rounded-[1.75rem] border border-deepGold/10 bg-white p-6">
                <p className="text-sm font-bold uppercase text-deepGold">Phone</p>
                <a
                  href={`tel:${phoneNumber}`}
                  className="mt-2 block font-display text-4xl font-bold text-charcoal transition hover:text-deepGold"
                >
                  {phoneDisplay}
                </a>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${phoneNumber}`}
                  className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-4 text-sm font-bold text-white transition hover:bg-ink"
                >
                  <Phone size={18} /> Call Now
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen px-5 py-4 text-sm font-bold text-charcoal transition hover:translate-y-[-1px]"
                >
                  <MessageCircle size={18} /> WhatsApp Enquiry
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full border border-deepGold/20 px-5 py-4 text-sm font-bold text-charcoal transition hover:bg-cream"
                >
                  <MapPin size={18} /> Get Directions
                </a>
              </div>
            </div>

            <form
              id="enquiry"
              onSubmit={submitForm}
              noValidate
              data-reveal
              className="scroll-reveal premium-ring rounded-[2rem] bg-charcoal p-6 text-white md:p-10"
            >
              <div className="mb-8">
                <p className="section-kicker text-xs font-bold text-softGold">Enquiry form</p>
                <h3 className="mt-3 font-display text-4xl font-bold">Share your event details</h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" error={formErrors.name}>
                  <input
                    value={formValues.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-white placeholder:text-white/38 focus:border-softGold focus:outline-none"
                    placeholder="Your name"
                    aria-invalid={Boolean(formErrors.name)}
                  />
                </Field>
                <Field label="Phone Number" error={formErrors.phone}>
                  <input
                    value={formValues.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-white placeholder:text-white/38 focus:border-softGold focus:outline-none"
                    placeholder="Mobile number"
                    inputMode="tel"
                    aria-invalid={Boolean(formErrors.phone)}
                  />
                </Field>
                <Field label="Event Type" error={formErrors.eventType}>
                  <select
                    value={formValues.eventType}
                    onChange={(event) => updateField("eventType", event.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-white focus:border-softGold focus:outline-none"
                    aria-invalid={Boolean(formErrors.eventType)}
                  >
                    <option className="text-charcoal" value="">
                      Select event
                    </option>
                    {events.map((eventItem) => (
                      <option className="text-charcoal" key={eventItem.title} value={eventItem.title}>
                        {eventItem.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Event Date" error={formErrors.eventDate}>
                  <input
                    value={formValues.eventDate}
                    onChange={(event) => updateField("eventDate", event.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-white focus:border-softGold focus:outline-none"
                    type="date"
                    aria-invalid={Boolean(formErrors.eventDate)}
                  />
                </Field>
                <Field label="Message" error={formErrors.message} className="md:col-span-2">
                  <textarea
                    value={formValues.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    className="min-h-32 w-full resize-y rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-white placeholder:text-white/38 focus:border-softGold focus:outline-none"
                    placeholder="Tell us about the occasion, guest flow, or preferred timing."
                    aria-invalid={Boolean(formErrors.message)}
                  />
                </Field>
              </div>

              {submitted && (
                <p className="mt-5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-softGold">
                  Thank you. Your enquiry has been prepared in WhatsApp.
                </p>
              )}

              <button
                type="submit"
                className="luxury-focus mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-sheen px-7 py-4 text-sm font-bold text-charcoal transition hover:translate-y-[-1px] md:w-auto"
              >
                Send Enquiry <MessageCircle size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="scroll-reveal max-w-2xl">
            <p className="section-kicker text-xs font-bold text-deepGold">Testimonials</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal md:text-6xl">
              A polished review section ready for verified feedback.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} data-reveal className="scroll-reveal premium-ring rounded-[1.75rem] bg-white p-7">
                <Quote className="text-royalGold" size={30} />
                <p className="mt-8 text-sm leading-7 text-ink/70">{item.note}</p>
                <p className="mt-8 font-display text-2xl font-bold text-charcoal">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-charcoal px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div>
            <h2 className="font-display text-4xl font-bold">Y.R. Mahal</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">
              Premium wedding and event venue in Nagercoil for family celebrations, receptions,
              engagements, and gatherings.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                aria-label="Search Y.R. Mahal on Instagram"
                href="https://www.instagram.com/explore/search/keyword/?q=Y.R.%20Mahal%20Nagercoil"
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/16 transition hover:bg-white/10"
              >
                <Instagram size={18} />
              </a>
              <a
                aria-label="Search Y.R. Mahal on Facebook"
                href="https://www.facebook.com/search/top?q=Y.R.%20Mahal%20Nagercoil"
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/16 transition hover:bg-white/10"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-softGold">Quick Links</h3>
            <div className="mt-5 grid gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-softGold">Contact</h3>
            <a href={`tel:${phoneNumber}`} className="mt-5 block text-lg font-bold text-white">
              {phoneDisplay}
            </a>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Water Tank Road, Near Water Tank, Nagercoil, Tamil Nadu 629001
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/48">
          Copyright 2026 Y.R. Mahal. Website concept for business demonstration.
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 right-4 z-30 grid grid-cols-2 gap-3 md:hidden">
        <a
          href={`tel:${phoneNumber}`}
          className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-4 py-4 text-sm font-bold text-white shadow-luxury"
        >
          <Phone size={17} /> Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="luxury-focus inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen px-4 py-4 text-sm font-bold text-charcoal shadow-luxury"
        >
          <MessageCircle size={17} /> WhatsApp
        </a>
      </div>

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-charcoal/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Venue gallery lightbox"
        >
          <button
            type="button"
            aria-label="Close gallery preview"
            onClick={() => setActiveImage(null)}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-charcoal"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => moveLightbox("previous")}
            className="absolute left-5 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-charcoal"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="relative h-[72vh] w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-black">
            <Image
              src={gallery[activeImage].src}
              alt={gallery[activeImage].alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => moveLightbox("next")}
            className="absolute right-5 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-charcoal"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  error,
  className = "",
  children
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-white/82">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm font-semibold text-softGold">{error}</span>}
    </label>
  );
}
