import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── DATA ─────────────────────────────────────────────────── */

const PROPERTIES = [
  {
    id: 1,
    title: "Пентхаус на Патриарших",
    type: "Продажа",
    price: "45 000 000 ₽",
    area: "180 м²",
    rooms: "4",
    address: "Малая Бронная, 22",
    img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/6ea2cd6e-d515-4896-80ea-0bbc56a35894.jpg",
    tag: "Премиум",
    lat: 55.764, lng: 37.59,
  },
  {
    id: 2,
    title: "Квартира в Хамовниках",
    type: "Продажа",
    price: "18 500 000 ₽",
    area: "92 м²",
    rooms: "3",
    address: "Комсомольский пр-т, 14",
    img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/f5c1a3ce-3de2-4a4a-bb88-7aa4bd8df7f4.jpg",
    tag: "Новинка",
    lat: 55.73, lng: 37.573,
  },
  {
    id: 3,
    title: "Апартаменты в Сити",
    type: "Аренда",
    price: "180 000 ₽/мес",
    area: "75 м²",
    rooms: "2",
    address: "Пресненская наб., 8",
    img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/6ea2cd6e-d515-4896-80ea-0bbc56a35894.jpg",
    tag: "Аренда",
    lat: 55.749, lng: 37.539,
  },
  {
    id: 4,
    title: "Таунхаус в Подмосковье",
    type: "Продажа",
    price: "12 000 000 ₽",
    area: "220 м²",
    rooms: "5",
    address: "Барвиха, Рублёвское ш.",
    img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/f5c1a3ce-3de2-4a4a-bb88-7aa4bd8df7f4.jpg",
    tag: "Загородная",
    lat: 55.74, lng: 37.29,
  },
  {
    id: 5,
    title: "Студия в Замоскворечье",
    type: "Аренда",
    price: "65 000 ₽/мес",
    area: "38 м²",
    rooms: "1",
    address: "Пятницкая ул., 30",
    img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/6ea2cd6e-d515-4896-80ea-0bbc56a35894.jpg",
    tag: "Аренда",
    lat: 55.735, lng: 37.627,
  },
  {
    id: 6,
    title: "Особняк в Переделкино",
    type: "Продажа",
    price: "85 000 000 ₽",
    area: "580 м²",
    rooms: "8",
    address: "Переделкино, Лесная ул.",
    img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/f5c1a3ce-3de2-4a4a-bb88-7aa4bd8df7f4.jpg",
    tag: "Элитная",
    lat: 55.663, lng: 37.367,
  },
];

const TEAM = [
  { name: "Елена Морозова", role: "Руководитель агенства", exp: "18 лет опыта", img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/646e3fb5-50ae-4814-90c7-7608f363d0a6.jpg" },
  { name: "Андрей Соколов", role: "Эксперт по элитной недвижимости", exp: "12 лет опыта", img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/646e3fb5-50ae-4814-90c7-7608f363d0a6.jpg" },
  { name: "Мария Лебедева", role: "Специалист по аренде", exp: "9 лет опыта", img: "https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/646e3fb5-50ae-4814-90c7-7608f363d0a6.jpg" },
];

const SERVICES = [
  { icon: "Home", title: "Покупка жилья", desc: "Полное сопровождение сделки от подбора до регистрации права собственности. Юридическая проверка объекта." },
  { icon: "Key", title: "Аренда недвижимости", desc: "Подбор квартир, домов и коммерческих помещений в аренду. Составление договора и защита ваших интересов." },
  { icon: "TrendingUp", title: "Инвестиции", desc: "Консультации по доходной недвижимости. Анализ рынка и подбор объектов с высоким потенциалом роста." },
  { icon: "Building2", title: "Коммерческая недвижимость", desc: "Офисы, торговые площади, склады. Помогаем бизнесу найти идеальное помещение по выгодной цене." },
  { icon: "FileText", title: "Юридическое сопровождение", desc: "Проверка документов, составление договоров, сопровождение сделок. Полная юридическая безопасность." },
  { icon: "HeartHandshake", title: "Оценка недвижимости", desc: "Профессиональная независимая оценка рыночной стоимости вашего объекта для продажи или залога." },
];

const ARTICLES = [
  { title: "Как выбрать квартиру для инвестиций в 2024 году", date: "12 ноября 2024", cat: "Инвестиции", read: "5 мин" },
  { title: "Ипотека или аренда: что выгоднее в текущих условиях", date: "5 ноября 2024", cat: "Советы", read: "7 мин" },
  { title: "Топ-5 районов Москвы для семейного проживания", date: "28 октября 2024", cat: "Аналитика", read: "4 мин" },
];

/* ─── MAP COMPONENT ─────────────────────────────────────────── */
function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([55.74, 37.55], 11);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const greenIcon = L.divIcon({
      className: "",
      html: `<div style="width:32px;height:32px;background:#4d7a44;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #faf7f2;box-shadow:0 2px 8px rgba(77,122,68,0.4)"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    PROPERTIES.forEach((p) => {
      L.marker([p.lat, p.lng], { icon: greenIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'Golos Text',sans-serif;padding:4px 2px"><strong style="font-family:'Cormorant Garamond',serif;font-size:15px">${p.title}</strong><br/><span style="color:#4d7a44;font-weight:600">${p.price}</span><br/><small style="color:#888">${p.address}</small></div>`
        );
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} style={{ height: "480px", width: "100%", borderRadius: "16px" }} />;
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [filterType, setFilterType] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ["home", "catalog", "about", "services", "blog", "contacts"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const filteredProps =
    filterType === "Все" ? PROPERTIES : PROPERTIES.filter((p) => p.type === filterType);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "Наша миссия" },
    { id: "services", label: "Услуги" },
    { id: "blog", label: "Блог" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const tagColor: Record<string, string> = {
    Премиум: "bg-amber-100 text-amber-700",
    Новинка: "bg-green-100 text-green-700",
    Аренда: "bg-beige-200 text-stone-600",
    Загородная: "bg-emerald-100 text-emerald-700",
    Элитная: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="min-h-screen bg-beige-50 font-body">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-beige-50/90 backdrop-blur-md border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center">
              <Icon name="Home" size={14} className="text-beige-50" />
            </div>
            <span className="font-logo text-xl font-medium text-foreground tracking-widest uppercase">
              Veyra&nbsp;<em className="italic not-italic font-normal tracking-widest">Estate</em>
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`nav-link text-sm font-body tracking-wide transition-colors ${
                    activeSection === link.id
                      ? "text-sage-500 active"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:flex items-center gap-2 bg-sage-500 text-beige-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors"
          >
            <Icon name="Phone" size={14} />
            Связаться
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-beige-50 border-t border-beige-200 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base text-foreground/80 hover:text-sage-500 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/f5c1a3ce-3de2-4a4a-bb88-7aa4bd8df7f4.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-beige-50/95 via-beige-50/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-beige-50/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-600 text-xs font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
              <Icon name="Leaf" size={12} />
              Более 15 лет на рынке недвижимости
            </div>

            <div className="font-logo text-sm tracking-[0.4em] uppercase text-sage-500 mb-3 animate-fade-in">Veyra Estate</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground mb-6 animate-fade-in">
              Найдите{" "}
              <em className="text-sage-500 not-italic font-normal">дом</em>,<br />
              в котором хочется<br />
              <em className="italic font-light">остаться</em>
            </h1>

            <p className="text-foreground/65 text-lg leading-relaxed mb-8 max-w-md animate-fade-in">
              Помогаем найти идеальную недвижимость в Москве и Подмосковье. Индивидуальный подход, честные цены, полное сопровождение сделки.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-sage-500 text-beige-50 px-7 py-3.5 rounded-full font-medium hover:bg-sage-600 transition-all hover:shadow-lg hover:shadow-sage-500/20"
              >
                Смотреть объекты
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="border border-beige-300 text-foreground px-7 py-3.5 rounded-full font-medium hover:border-sage-400 hover:text-sage-600 transition-colors"
              >
                Получить консультацию
              </button>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-beige-200 animate-fade-in">
              {[
                { num: "1 200+", label: "Сделок закрыто" },
                { num: "15 лет", label: "На рынке" },
                { num: "98%", label: "Довольных клиентов" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="font-display text-3xl font-medium text-sage-500">{s.num}</div>
                  <div className="text-xs text-foreground/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/80 backdrop-blur-sm border border-beige-200 rounded-2xl p-6 shadow-xl max-w-sm ml-auto animate-slide-up">
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src="https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/6ea2cd6e-d515-4896-80ea-0bbc56a35894.jpg"
                  alt="Объект"
                  className="w-full h-44 object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1 rounded-full">
                  Премиум
                </span>
              </div>
              <h3 className="font-display text-xl font-medium mb-1">Пентхаус на Патриарших</h3>
              <p className="text-sm text-foreground/50 mb-3 flex items-center gap-1">
                <Icon name="MapPin" size={12} /> Малая Бронная, 22
              </p>
              <div className="flex justify-between items-center">
                <span className="font-display text-2xl font-medium text-sage-500">45 000 000 ₽</span>
                <div className="flex gap-3 text-xs text-foreground/50">
                  <span>180 м²</span>
                  <span>4 комн.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 reveal">
            <div className="section-divider mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
              Актуальные <em className="italic">предложения</em>
            </h2>
            <p className="text-foreground/55 max-w-xl">
              Тщательно отобранные объекты от проверенных собственников и застройщиков
            </p>
          </div>

          <div className="flex gap-3 mb-10 reveal">
            {["Все", "Продажа", "Аренда"].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filterType === f
                    ? "bg-sage-500 text-beige-50 shadow-md shadow-sage-500/20"
                    : "bg-beige-100 text-foreground/60 hover:bg-beige-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProps.map((p, i) => (
              <div
                key={p.id}
                className={`property-card bg-beige-50 rounded-2xl overflow-hidden border border-beige-200 cursor-pointer reveal reveal-delay-${(i % 4) + 1}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full ${tagColor[p.tag] || "bg-beige-200 text-stone-600"}`}>
                    {p.tag}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-foreground/70 text-xs px-3 py-1 rounded-full">
                    {p.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-medium mb-1">{p.title}</h3>
                  <p className="text-sm text-foreground/50 flex items-center gap-1 mb-4">
                    <Icon name="MapPin" size={12} /> {p.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-sage-500 font-medium">{p.price}</span>
                    <div className="flex gap-3 text-xs text-foreground/45">
                      <span className="flex items-center gap-1">
                        <Icon name="Square" size={11} /> {p.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="LayoutGrid" size={11} /> {p.rooms} комн.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <button className="border border-sage-400 text-sage-600 px-8 py-3 rounded-full font-medium hover:bg-sage-50 transition-colors">
              Смотреть все объекты
            </button>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-24 px-6 bg-beige-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 reveal">
            <div className="section-divider mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
              Объекты <em className="italic">на карте</em>
            </h2>
            <p className="text-foreground/55">Найдите недвижимость в нужном вам районе</p>
          </div>
          <div className="reveal rounded-2xl overflow-hidden shadow-lg border border-beige-200">
            <MapSection />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="reveal">
              <div className="section-divider mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                Об <em className="italic">агенстве</em>
              </h2>
              <p className="text-foreground/65 leading-relaxed mb-6">
                Бюро Недвижимости — это команда опытных специалистов, которые искренне любят своё дело. Мы работаем на рынке недвижимости Москвы и Подмосковья с 2009 года и помогли более тысячи семей найти свой идеальный дом.
              </p>
              <p className="text-foreground/65 leading-relaxed mb-8">
                Наш подход основан на доверии, прозрачности и глубоком знании рынка. Мы не просто продаём квадратные метры — мы помогаем найти место, где вам будет по-настоящему хорошо.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Award", text: "Член Российской Гильдии Риелторов" },
                  { icon: "Shield", text: "Полное юридическое сопровождение" },
                  { icon: "Users", text: "Команда из 24 специалистов" },
                  { icon: "Globe", text: "Работаем по всей Московской области" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon} size={15} className="text-sage-500" />
                    </div>
                    <span className="text-sm text-foreground/70 leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <div className="relative">
                <img
                  src="https://cdn.poehali.dev/projects/8939b813-faad-4d7e-bd78-692c6f14b5a9/files/646e3fb5-50ae-4814-90c7-7608f363d0a6.jpg"
                  alt="Команда"
                  className="rounded-2xl w-full h-80 object-cover shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-sage-500 text-beige-50 rounded-2xl p-6 shadow-xl">
                  <div className="font-display text-4xl font-medium">15+</div>
                  <div className="text-sm text-sage-100 mt-1">лет на рынке</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <h3 className="font-display text-3xl font-light mb-8 text-center">
              Наша <em className="italic">команда</em>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {TEAM.map((member, i) => (
                <div key={member.name} className={`text-center reveal reveal-delay-${i + 1}`}>
                  <div className="relative inline-block mb-4">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-beige-200 mx-auto"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sage-400 rounded-full border-2 border-white" />
                  </div>
                  <h4 className="font-display text-xl font-medium mb-1">{member.name}</h4>
                  <p className="text-sm text-sage-500 mb-1">{member.role}</p>
                  <p className="text-xs text-foreground/45">{member.exp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 bg-beige-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
              Наши <em className="italic">услуги</em>
            </h2>
            <p className="text-foreground/55 max-w-xl mx-auto">
              Полный спектр услуг для комфортного решения любых вопросов с недвижимостью
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`bg-white rounded-2xl p-7 border border-beige-200 hover:border-sage-300 hover:shadow-lg transition-all duration-300 reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={20} className="text-sage-500" />
                </div>
                <h3 className="font-display text-xl font-medium mb-3">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-sage-500 p-10 text-center reveal">
            <h3 className="font-display text-3xl md:text-4xl font-light text-beige-50 mb-4">
              Не знаете, с чего <em className="italic">начать?</em>
            </h3>
            <p className="text-sage-100 mb-6 max-w-md mx-auto">
              Получите бесплатную консультацию от нашего эксперта
            </p>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-beige-50 text-sage-600 font-medium px-8 py-3.5 rounded-full hover:bg-white transition-colors"
            >
              Записаться на консультацию
            </button>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 reveal">
            <div className="section-divider mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
              Советы и <em className="italic">аналитика</em>
            </h2>
            <p className="text-foreground/55 max-w-xl">
              Полезные материалы от наших экспертов для тех, кто хочет разбираться в рынке
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <article
                key={a.title}
                className={`group bg-beige-50 rounded-2xl overflow-hidden border border-beige-200 hover:border-sage-300 hover:shadow-lg transition-all duration-300 cursor-pointer reveal reveal-delay-${i + 1}`}
              >
                <div className="h-48 bg-gradient-to-br from-sage-100 to-beige-200 flex items-center justify-center relative overflow-hidden">
                  <Icon name="BookOpen" size={40} className="text-sage-300 group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute top-4 left-4 bg-sage-500 text-beige-50 text-xs px-3 py-1 rounded-full">
                    {a.cat}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium leading-snug mb-3 group-hover:text-sage-600 transition-colors">
                    {a.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-foreground/40">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={11} /> {a.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={11} /> {a.read}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <button className="border border-sage-400 text-sage-600 px-8 py-3 rounded-full font-medium hover:bg-sage-50 transition-colors">
              Все статьи
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 px-6 bg-beige-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
              Свяжитесь <em className="italic">с нами</em>
            </h2>
            <p className="text-foreground/55 max-w-md mx-auto">
              Оставьте заявку — мы ответим в течение 15 минут в рабочее время
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl border border-beige-200 p-8 shadow-sm reveal">
              {formSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-sage-500" />
                  </div>
                  <h3 className="font-display text-2xl font-medium mb-2">Заявка отправлена!</h3>
                  <p className="text-foreground/55">Мы свяжемся с вами в ближайшее время</p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-6 text-sm text-sage-500 hover:underline"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-medium mb-1">Форма обратной связи</h3>
                  <p className="text-sm text-foreground/50 mb-6">Расскажите о вашем запросе — мы подберём лучший вариант</p>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-xl text-sm outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-xl text-sm outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">Сообщение</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Расскажите, что вас интересует: покупка, продажа, аренда..."
                      rows={4}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-xl text-sm outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-sage-500 text-beige-50 py-3.5 rounded-xl font-medium hover:bg-sage-600 transition-all hover:shadow-lg hover:shadow-sage-500/20"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-foreground/35 text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-6 reveal reveal-delay-2">
              <h3 className="font-display text-2xl font-light mb-6">
                Контактная <em className="italic">информация</em>
              </h3>

              {[
                { icon: "MapPin", title: "Адрес", text: "Москва, Тверская ул., 12\nОфис 450, 4 этаж" },
                { icon: "Phone", title: "Телефон", text: "+7 (495) 123-45-67\n+7 (800) 555-00-11 (бесплатно)" },
                { icon: "Mail", title: "Email", text: "info@byuro-nedv.ru" },
                { icon: "Clock", title: "Режим работы", text: "Пн–Пт: 9:00–20:00\nСб–Вс: 10:00–18:00" },
              ].map((item) => (
                <div key={item.icon} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-beige-200">
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={16} className="text-sage-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-1">{item.title}</div>
                    <div className="text-sm text-foreground/75 leading-relaxed whitespace-pre-line">{item.text}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Phone", label: "WhatsApp" },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="flex items-center gap-2 bg-white border border-beige-200 text-foreground/60 text-sm px-4 py-2.5 rounded-full hover:border-sage-300 hover:text-sage-600 transition-colors"
                  >
                    <Icon name={s.icon} size={14} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-sage-600 text-beige-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-beige-50/20 flex items-center justify-center">
                  <Icon name="Home" size={12} className="text-beige-50" />
                </div>
                <span className="font-logo text-xl text-beige-50 tracking-widest uppercase font-medium">
                  Veyra <em className="not-italic font-normal">Estate</em>
                </span>
              </div>
              <p className="text-sm text-beige-200/70 max-w-xs leading-relaxed">
                Veyra Estate — помогаем найти дом, в котором хочется остаться, с 2009 года.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-beige-200/50 text-xs uppercase tracking-widest mb-3">Агенство</div>
                {["О нас", "Команда", "Отзывы", "Карьера"].map((l) => (
                  <div key={l} className="mb-2">
                    <button className="text-beige-200/70 hover:text-beige-50 transition-colors">{l}</button>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-beige-200/50 text-xs uppercase tracking-widest mb-3">Услуги</div>
                {["Покупка", "Продажа", "Аренда", "Инвестиции"].map((l) => (
                  <div key={l} className="mb-2">
                    <button className="text-beige-200/70 hover:text-beige-50 transition-colors">{l}</button>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-beige-200/50 text-xs uppercase tracking-widest mb-3">Контакты</div>
                <div className="text-beige-200/70 text-sm space-y-1">
                  <p>+7 (495) 123-45-67</p>
                  <p>info@byuro-nedv.ru</p>
                  <p>Москва, Тверская, 12</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-beige-50/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-beige-200/40">
            <p>© 2024 Veyra Estate. Все права защищены.</p>
            <div className="flex gap-6">
              <button className="hover:text-beige-200/70 transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-beige-200/70 transition-colors">Пользовательское соглашение</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}