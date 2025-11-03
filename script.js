// Nerv Cores site scripts (clean i18n + UI wiring)
(function(){
  const $ = (sel, root=document)=>root.querySelector(sel);
  const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));

  // Theme
  function initTheme(){
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const isLight = saved==='light';
    $$('.icon-sun').forEach(el=> el.style.display = isLight?'inline':'none');
    $$('.icon-moon').forEach(el=> el.style.display = isLight?'none':'inline');
  }
  function toggleTheme(){
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur==='dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const isLight = next==='light';
    $$('.icon-sun').forEach(el=> el.style.display = isLight?'inline':'none');
    $$('.icon-moon').forEach(el=> el.style.display = isLight?'none':'inline');
  }

  // Active nav
  function setActiveNav(){
    const cur = location.pathname.endsWith('/') ? 'index.html' : location.pathname.split('/').pop();
    $$('nav a').forEach(a=>{
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if(!href) return;
      const name = new URL(href, location.href).pathname.split('/').pop() || 'index.html';
      if(name===cur) a.classList.add('active');
    });
  }

  // Search
  function initSearch(){
    const btn = $('[data-search-toggle]');
    const modal = $('#search-modal');
    if(!btn || !modal) return;
    const input = $('#search-input', modal);
    const results = $('#search-results', modal);
    const isSub = location.pathname.includes('/pages/');
    const pages = isSub ? [
      { title: 'Home', url: '../index.html' },
      { title: 'Validator', url: 'validator.html' },
      { title: 'Projects', url: 'projects.html' },
      { title: 'Services', url: 'services.html' },
      { title: 'About', url: 'about.html' },
      { title: 'Blog', url: 'blog.html' },
      { title: 'Networks', url: 'networks.html' },
      { title: 'Contact', url: 'contact.html' },
    ] : [
      { title: 'Home', url: 'index.html' },
      { title: 'Validator', url: 'pages/validator.html' },
      { title: 'Projects', url: 'pages/projects.html' },
      { title: 'Services', url: 'pages/services.html' },
      { title: 'About', url: 'pages/about.html' },
      { title: 'Blog', url: 'pages/blog.html' },
      { title: 'Networks', url: 'pages/networks.html' },
      { title: 'Contact', url: 'pages/contact.html' },
    ];
    function render(q){
      const qq = (q||'').toLowerCase();
      const filtered = pages.filter(p=>p.title.toLowerCase().includes(qq));
      results.innerHTML = filtered.map(p=>`<li><a href="${p.url}">${p.title}</a></li>`).join('');
    }
    btn.addEventListener('click', ()=>{ modal.classList.add('active'); render(''); input && input.focus(); });
    modal.addEventListener('click', e=>{ if(e.target.matches('[data-search-close]')) modal.classList.remove('active'); });
    input && input.addEventListener('input', e=>render(e.target.value));
    input && input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ if(!results.querySelector('a')) render(input.value); const a=results.querySelector('a'); if(a) location.href=a.getAttribute('href'); }});
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') modal.classList.remove('active'); });
  }

  // I18n dictionaries (essential keys only, valid UTF-8)
  const dict = {
    en: {
      // Nav
      'nav.home':'Home','nav.validator':'Validator','nav.projects':'Projects','nav.services':'Services','nav.about':'About','nav.blog':'Blog','nav.networks':'Networks','nav.contact':'Contact',
      // Home
      'home.hero.title':'Secure Staking & High-Performance Web3 Solutions',
      'home.hero.subtitle':'Nerv Cores delivers trusted nodes and high-performance web solutions. Currently focused on PAXI with the NervCore, expanding to more networks soon.',
      'home.cta.delegate':'Delegate to NervCore','home.cta.discuss':'Start a Project With Us',
      // Home core/why/feature (index)
      'home.core.title':'Our Core Services',
      'home.core.validation.title':'⛓️ Blockchain Validation',
      'home.core.validation.desc':'Secure your assets and help strengthen the network. We run enterprise-grade validator nodes with a 99.9%+ uptime guarantee, ensuring consistent rewards and peace of mind for our delegators.',
      'home.core.validation.cta':'Learn About Our Validator',
      'home.core.dev.title':'🌐 Web3 Development',
      'home.core.dev.desc':'Have a vision for a decentralized application? We turn ambitious ideas into reality, building fast, secure, and user-friendly Web3 solutions from concept to launch.',
      'home.core.dev.cta':'See Our Development Process',
      'home.why.title':'Why Partner With Nerv Cores?',
      'home.why.sec.title':'🔒 Uncompromising Security',
      'home.why.sec.desc':'Your assets and applications are protected by fortress-like architecture, proactive 24/7 monitoring, and rigorous key management policies.',
      'home.why.perf.title':'⚡ Engineered for Performance',
      'home.why.perf.desc':'We are obsessed with optimization. We guarantee maximum uptime for nodes and a lightning-fast, seamless experience for your application\'s users.',
      'home.why.transp.title':'🔎 Radical Transparency',
      'home.why.transp.desc':'Clear communication, transparent commission structures, and verifiable on-chain performance. You\'ll always know where you stand with us.',
      'home.feature.title':'Featured Case Study: Our Own Validator Node',
      'home.feature.subtitle':'NervCore on the PAXI Network',
      'home.feature.desc':'Our flagship project is our own high-performance validator node. We built and maintain NervCore with the same rigorous standards we apply to all our client work, achieving 99.9%+ uptime and providing consistent rewards for our community of delegators. This isn\'t just a service we offer; it\'s a commitment we live by. This is our expertise in action.',
      'home.feature.cta':'View On-Chain Stats',
      // About
      'about.hero.title':'Pioneering Secure and Performant Web3 Infrastructure',
      'about.section.about.title':'About Nerv Cores',
      'about.section.about.body1':'Nerv Cores was founded on a core belief: the future of the internet must be decentralized, secure, and accessible to all. We exist to strengthen that foundation.',
      'about.section.about.body2':'Our mission is to provide two fundamental pillars for a healthy Web3 ecosystem: robust validator infrastructure to secure networks, and high-performance development services to build next-generation applications. With the right foundation, Web3’s potential is limitless.',
      'about.principles.title':'Our Guiding Principles',
      'about.what.title':'What We Do',
      'about.what.validation.title':'Blockchain Validation','about.what.validation.desc':'We operate and maintain enterprise-grade validators with a focus on uptime, security, and active governance.',
      'about.what.dev.title':'Web3 Development','about.what.dev.desc':'We partner with innovators to design, build, and launch decentralized applications that are fast, secure, and easy to use.',
      'about.cta.title':'Let’s Build the Future, Together','about.cta.desc':'Whether you need a reliable validator or a skilled technical partner, we are ready to collaborate.','about.cta.btn.validator':'View Validator Services','about.cta.btn.project':'Start a Project With Us','about.social.title':'Follow our updates on social media:',
      'about.principles.security.title':'Security by Design',
      'about.principles.security.desc':'Security is not a layer; it’s our DNA. We apply modern security architecture and proactive monitoring to protect infrastructure and applications.',
      'about.principles.stability.title':'Unyielding Stability',
      'about.principles.stability.desc':'Consistency is everything. Our infrastructure is engineered for maximum availability and uninterrupted participation.',
      'about.principles.performance.title':'Engineered for Performance',
      'about.principles.performance.desc':'We optimize from node latency to user experience to deliver best-in-class results.',
      'about.principles.ecosystem.title':'Commitment to the Ecosystem',
      'about.principles.ecosystem.desc':'We actively contribute to governance and communities for long-term ecosystem health.',
      // Blog list
      'blog.title':'Blog & Insights','blog.desc':'Planned topics: validator operations, DevOps best practices, web optimization.',
      'blog.article1.title':'PAXI Overview & Validator Basics','blog.article1.desc':'An introduction to PAXI network concepts and what a validator does. Safe staking practices and how Nerv Cores operates NervCore.','blog.article1.cta':'Read more',
      'blog.article2.title':'Delegating to NervCore on PAXI','blog.article2.desc':'Step-by-step guide to delegating on PAXI using PingPub and common wallets. Fees, commission, and security tips.','blog.article2.cta':'Read more',
      'blog.article3.title':'PAXI Governance: Voting & Proposals','blog.article3.desc':'How governance works on PAXI, how to track proposals, and how validators contribute to network decisions.','blog.article3.cta':'Read more',
      // Blog posts
      'post.overview.title':'PAXI Overview & Validator Basics','post.overview.desc':'PAXI is a proof-of-stake blockchain. Validators secure the network by proposing/validating blocks while delegators stake their tokens to trusted validators and share rewards.','post.overview.key':'Key Concepts','post.overview.why':'Nerv Cores Approach','post.overview.li1':'Validators: run reliable, secure infrastructure to keep the chain live.','post.overview.li2':'Delegators: choose validators and stake to earn a portion of rewards.','post.overview.li3':'Commission: validator service fee (NervCore currently 15%, max 20%).','post.overview.li4':'Slashing: penalties for downtime or double-sign; choose strong operators.','post.overview.why1':'Security-first: strict key management and timely updates.','post.overview.why2':'Availability: 24/7 monitoring and proactive alerting.','post.overview.why3':'Transparency: clear commission and public status.','post.overview.link':'Stake to NervCore',
      'post.delegate.title':'Delegating to NervCore on PAXI','post.delegate.step1':'Open PingPub staking page for NervCore (link below).','post.delegate.step2':'Connect your wallet (e.g., Keplr) and approve access.','post.delegate.step3':'Select the amount to delegate, review commission (15%), and confirm.','post.delegate.step4':'Wait for confirmation; your delegation will start earning rewards.','post.delegate.cta':'Go to PingPub',
      'post.gov.title':'PAXI Governance: Voting & Proposals','post.gov.desc':'On PAXI, governance proposals are published to the chain for community review. Validators and delegators can participate in voting. Common proposal types include parameter changes, software upgrades, and community fund spending.','post.gov.how':'How to Stay Informed','post.gov.li1':'Follow official PAXI social channels for proposal announcements.','post.gov.li2':'Use PingPub or compatible explorers to monitor proposal status and timelines.','post.gov.li3':'Review validator votes, rationales, and community discussions.',
      // Others
      'validator.title':'Validator — NervCore (PAXI)','validator.delegation.title':'Delegation','validator.delegation.desc':'Delegate to <strong>NervCore</strong> via PingPub:','validator.delegation.cta':'Open staking page','validator.commission.title':'Commission','validator.commission.rate':'Rate: 15%','validator.commission.24h':'24h: ±1%','validator.commission.max':'Max: 20%','validator.ops.title':'Operational Principles','validator.quick.title':'Quick Delegation Guide',
      // Services (new)
      'services.hero.title':'Bringing Your Web3 Vision to Life',
      "services.hero.desc":"We don't just write code; we architect solutions. We partner with innovators and businesses to build fast, secure, and user-friendly Web3 applications that deliver real value. From initial concept to final deployment, we are your dedicated technical partner.",
      'services.hero.cta':'Get a Free Consultation',
      'services.build.title':'What We Build',
      'services.build.card1.title':'🌐 Custom Landing Pages & DApps','services.build.card1.desc':'From stunning, SEO-friendly landing pages that capture your audience to fully functional decentralized applications (DApps), we build your presence on the decentralized web.','services.build.card1.li1':'Perfect for: Token Launches, NFT Mints, Project Showcases.',
      'services.build.card2.title':'🚀 High-Performance Web Applications','services.build.card2.desc':'Need more than a simple page? We specialize in building robust, scalable, and maintainable web applications from the ground up, with a core focus on speed, security, and clean code.','services.build.card2.li1':'Focus on: Speed, Scalability, Clean Code.',
      'services.build.card3.title':'🛡️ Performance & Security Audits','services.build.card3.desc':'Is your existing site underperforming? We conduct in-depth audits using tools like Lighthouse and Core Web Vitals to identify bottlenecks and security risks, delivering a clear, actionable improvement plan.','services.build.card3.li1':'Deliverables: Detailed Report, Optimization Plan.',
      'services.process.title':'Our Proven Development Process',
      'services.process.step1.title':'1. Discovery & Strategy','services.process.step1.desc':'We begin by diving deep into your vision and goals to map out a comprehensive strategy and project roadmap.',
      'services.process.step2.title':'2. Design & Prototyping (UI/UX)','services.process.step2.desc':'We design an intuitive user experience, creating wireframes and mockups for your approval before we write any code.',
      'services.process.step3.title':'3. Development & Testing','services.process.step3.desc':'Our developers bring the design to life with clean, efficient code, followed by rigorous testing to ensure a bug-free, seamless experience.',
      'services.process.step4.title':'4. Deployment & Support','services.process.step4.desc':'We handle the entire deployment process and offer ongoing support to ensure your project runs smoothly after launch.',
      'services.stack.title':'Our Technology Stack','services.stack.desc':'We use modern, battle-tested technologies to build future-proof products.','services.stack.react':'React.js','services.stack.next':'Next.js','services.stack.node':'Node.js','services.stack.ethers':'Ethers.js','services.stack.solidity':'Solidity','services.stack.ipfs':'IPFS',
      'services.cta2.title':'Have a Project in Mind? Let\'s Build It Together.','services.cta2.desc':'Contact us today for a free, no-obligation consultation to discuss how we can bring your vision to life.','services.cta2.btn':'Start a Discussion',
      'projects.title':'Project Portfolio','projects.desc':'A curated look at projects, templates, and infrastructure we build and operate. From validator reliability to fast web experiences, these reflect our standards and approach.',
      'projects.featured.title':'Featured Projects',
      'projects.item1.title':'PAXI Validator Operations & Monitoring',
      'projects.item1.desc':'Enterprise-grade validator setup with rigorous uptime, key management, and proactive monitoring. Focused on reliability, transparency, and delegator trust.',
      'projects.item1.badge1':'Cosmos SDK','projects.item1.badge2':'99.9%+ Uptime','projects.item1.badge3':'Governance',
      'projects.item1.cta':'Discuss Similar Operations',
      'projects.item2.title':'Web3 Landing Page Template',
      'projects.item2.desc':'A high-performance, SEO-friendly landing template built for Web3 teams. Clean design, responsive layout, and fast load for better conversions.',
      'projects.item2.badge1':'Lighthouse 95+','projects.item2.badge2':'Responsive','projects.item2.badge3':'SEO-ready',
      'projects.item2.cta':'Customize This Template',
      'projects.cta.title':'Need Something Similar?',
      'projects.cta.desc':'Whether it’s validator operations, dashboards, or a fast marketing site, we can build it to your needs with a focus on reliability and performance.',
      'projects.cta.btn':'Start a Project Discussion',
      'contact.title':'Contact',
      "contact.intro":"Get in touch with Nerv Cores for validator operations, staking questions, or web development inquiries. We're professional, responsive, and happy to help.",
      'contact.x.title':'X (Twitter)',
      'contact.x.desc':'Follow and DM <strong>@rainssystem</strong> for quick questions, updates, and collaboration.',
      'contact.x.cta':'Open X Profile',
      'contact.discord.title':'Discord',
      'contact.discord.desc':'Reach us on Discord at <strong>rainssy</strong> for technical discussions and coordination.',
      'contact.discord.cta':'Open Discord',
      'contact.response':'We aim to respond within 24-48 hours on business days.',
      'contact.hours':'Office hours: Monday-Friday, 09:00-17:00 GMT+7.',
      // Networks (new ecosystem hub)
      'net.hero.title':'Securing the Multi-Chain Future',
      'net.hero.desc':'We are a professional infrastructure provider dedicated to the security and growth of decentralized networks. We believe in a future where various blockchains coexist and thrive. Our mission is to provide a reliable and secure foundation for the most promising projects in the Web3 space, starting with our full commitment to the PAXI network.',
      'net.active.title':'Our Active Networks',
      'net.paxi.title':'PAXI Network','net.paxi.status':'✅ ACTIVE VALIDATOR','net.paxi.desc':'PAXI is a high-performance Layer 1 blockchain focused on scalability, security, and developer-friendly tooling to enable real-world decentralized applications.','net.paxi.validator':'Our Validator: NervCore','net.paxi.uptime':'Uptime: 99.9%+','net.paxi.commission':'Commission: 15%','net.paxi.cta':'Delegate to NervCore',
      'net.roadmap.title':'Our Expansion Roadmap',
      'net.roadmap.p1.title':'Currently Researching','net.roadmap.p1.desc':'We are actively researching and testing nodes for innovative Layer 1 and Layer 2 networks. Our focus is on projects with strong technical fundamentals, an active community, and a clear vision for the future.',
      'net.roadmap.p2.title':'Next Networks (Testnet Participation)','net.roadmap.p2.desc':'Before committing to a mainnet, we actively participate in incentivized testnets. This allows us to master the technical requirements and contribute to the network\'s stability before launch. Follow our social media for announcements.',
      'net.roadmap.p3.title':'Future Mainnets','net.roadmap.p3.desc':'Our goal is to launch on 2-3 additional mainnets by the end of 2026. The selection process is rigorous and community-driven. Stay tuned for our official announcements.',
      'net.suggest.title':'Help Us Shape Our Multi-Chain Future','net.suggest.desc':'Are you part of a promising blockchain project looking for dedicated validators? Or are you a community member who wants to see us support your favorite network? We believe the best ecosystems are built together. We\'d love to hear from you.','net.suggest.cta':'Suggest a Network'
    },
    id: {
      'nav.home':'Beranda','nav.validator':'Validator','nav.projects':'Proyek','nav.services':'Jasa','nav.about':'Tentang','nav.blog':'Blog','nav.networks':'Jaringan','nav.contact':'Kontak',
      'home.hero.title':'Solusi Web3 Berperforma Tinggi & Staking Aman','home.hero.subtitle':'Nerv Cores menghadirkan node tepercaya dan solusi web performa tinggi. Saat ini fokus pada PAXI dengan NervCore, dan segera mendukung lebih banyak jaringan.','home.cta.delegate':'Delegasikan ke NervCore','home.cta.discuss':'Mulai Proyek Bersama Kami',
      // Home core/why/feature (index)
      'home.core.title':'Layanan Inti Kami',
      'home.core.validation.title':'⛓️ Validasi Blockchain',
      'home.core.validation.desc':'Amankan aset Anda dan bantu perkuat jaringan. Kami menjalankan validator kelas enterprise dengan jaminan uptime 99.9%+, memastikan reward konsisten dan ketenangan bagi para delegator.',
      'home.core.validation.cta':'Pelajari Validator Kami',
      'home.core.dev.title':'🌐 Pengembangan Web3',
      'home.core.dev.desc':'Punya visi untuk aplikasi terdesentralisasi? Kami mewujudkan ide ambisius menjadi kenyataan, membangun solusi Web3 yang cepat, aman, dan ramah pengguna dari konsep hingga peluncuran.',
      'home.core.dev.cta':'Lihat Proses Pengembangan Kami',
      'home.why.title':'Mengapa Bermitra dengan Nerv Cores?',
      'home.why.sec.title':'🔒 Keamanan Tanpa Kompromi',
      'home.why.sec.desc':'Aset dan aplikasi Anda dilindungi oleh arsitektur sekuat benteng, monitoring proaktif 24/7, dan manajemen kunci yang ketat.',
      'home.why.perf.title':'⚡ Dirancang untuk Performa',
      'home.why.perf.desc':'Kami terobsesi pada optimisasi. Kami menjamin uptime maksimal untuk node dan pengalaman yang cepat dan mulus bagi pengguna aplikasi Anda.',
      'home.why.transp.title':'🔎 Transparansi Radikal',
      'home.why.transp.desc':'Komunikasi jelas, struktur komisi transparan, dan performa on-chain yang dapat diverifikasi. Anda selalu tahu posisi Anda bersama kami.',
      'home.feature.title':'Studi Kasus Unggulan: Validator Kami Sendiri',
      'home.feature.subtitle':'NervCore di Jaringan PAXI',
      'home.feature.desc':'Proyek unggulan kami adalah validator berperforma tinggi milik kami sendiri. Kami membangun dan menjaga NervCore dengan standar ketat yang sama seperti yang kami terapkan untuk klien, meraih uptime 99.9%+ dan menyediakan reward konsisten bagi komunitas delegator. Ini bukan sekadar layanan; ini komitmen yang kami jalani. Inilah keahlian kami dalam aksi.',
      'home.feature.cta':'Lihat Statistik On-Chain',
      'about.hero.title':'Pelopor Infrastruktur Web3 Aman dan Berperforma Tinggi','about.section.about.title':'Tentang Nerv Cores','about.section.about.body1':'Nerv Cores didirikan di atas keyakinan inti: masa depan internet harus terdesentralisasi, aman, dan dapat diakses semua orang. Kami hadir untuk memperkuat fondasi masa depan tersebut.','about.section.about.body2':'Misi kami: menyediakan dua pilar fundamental bagi ekosistem Web3—infrastruktur validator yang kokoh dan layanan pengembangan berperforma tinggi.','about.principles.title':'Prinsip Kami','about.what.title':'Apa yang Kami Lakukan','about.what.validation.title':'Validasi Blockchain','about.what.validation.desc':'Kami mengoperasikan validator kelas enterprise dengan fokus uptime, keamanan, dan partisipasi aktif dalam tata kelola.','about.what.dev.title':'Pengembangan Web3','about.what.dev.desc':'Kami bermitra merancang, membangun, dan meluncurkan aplikasi terdesentralisasi yang cepat, aman, dan mudah digunakan.','about.cta.title':'Mari Bangun Masa Depan, Bersama','about.cta.desc':'Butuh validator andal atau mitra teknis terampil untuk mewujudkan visi? Kami siap berkolaborasi.','about.cta.btn.validator':'Lihat Layanan Validator','about.cta.btn.project':'Diskusikan Proyek Anda','about.social.title':'Ikuti perkembangan kami di sosial media:',
      'about.principles.security.title':'Keamanan sebagai Desain',
      'about.principles.security.desc':'Keamanan bukan lapisan tambahan; ini DNA kami. Kami menerapkan arsitektur keamanan modern dan pemantauan proaktif untuk melindungi infrastruktur dan aplikasi.',
      'about.principles.stability.title':'Stabilitas Tak Tergoyahkan',
      'about.principles.stability.desc':'Konsistensi adalah segalanya. Infrastruktur kami dirancang untuk ketersediaan maksimum dan partisipasi tanpa henti.',
      'about.principles.performance.title':'Dirancang untuk Performa',
      'about.principles.performance.desc':'Kami mengoptimalkan dari latensi node hingga pengalaman pengguna untuk hasil terbaik.',
      'about.principles.ecosystem.title':'Komitmen pada Ekosistem',
      'about.principles.ecosystem.desc':'Kami aktif berkontribusi pada governance dan komunitas demi kesehatan ekosistem jangka panjang.',
      'blog.title':'Blog & Insight','blog.desc':'Rencana topik: operasional validator, praktik terbaik DevOps, optimasi web.','blog.article1.title':'Ikhtisar PAXI & Dasar Validator','blog.article1.desc':'Pengantar konsep jaringan PAXI dan peran validator. Praktik staking aman dan operasi NervCore.','blog.article1.cta':'Baca selengkapnya','blog.article2.title':'Delegasi ke NervCore di PAXI','blog.article2.desc':'Panduan langkah demi langkah delegasi di PAXI menggunakan PingPub.','blog.article2.cta':'Baca selengkapnya','blog.article3.title':'Tata Kelola PAXI: Voting & Proposal','blog.article3.desc':'Cara kerja tata kelola di PAXI, melacak proposal, dan kontribusi validator.','blog.article3.cta':'Baca selengkapnya',
      'post.overview.title':'Ikhtisar PAXI & Dasar Validator','post.overview.desc':'PAXI adalah blockchain proof-of-stake. Validator mengamankan jaringan, delegator staking ke validator tepercaya dan berbagi reward.','post.overview.key':'Konsep Utama','post.overview.why':'Pendekatan Nerv Cores','post.overview.li1':'Validator: menjalankan infrastruktur andal dan aman.','post.overview.li2':'Delegator: memilih validator dan staking untuk memperoleh reward.','post.overview.li3':'Komisi: biaya layanan validator (NervCore 15%, maksimum 20%).','post.overview.li4':'Slashing: penalti untuk downtime/double-sign; pilih operator yang kuat.','post.overview.why1':'Keamanan: manajemen kunci ketat & pembaruan tepat waktu.','post.overview.why2':'Ketersediaan: monitoring 24/7 & alerting proaktif.','post.overview.why3':'Transparansi: komisi jelas & status publik.','post.overview.link':'Stake ke NervCore',
      'post.delegate.title':'Delegasi ke NervCore di PAXI','post.delegate.step1':'Buka halaman staking PingPub untuk NervCore.','post.delegate.step2':'Hubungkan wallet (mis. Keplr) dan setujui akses.','post.delegate.step3':'Pilih jumlah delegasi, periksa komisi (15%), dan konfirmasi.','post.delegate.step4':'Tunggu konfirmasi; delegasi mulai menghasilkan reward.','post.delegate.cta':'Buka PingPub',
      'post.gov.title':'Tata Kelola PAXI: Voting & Proposal','post.gov.desc':'Di PAXI, proposal tata kelola dipublikasikan on-chain untuk ditinjau komunitas. Validator dan delegator dapat ikut voting.','post.gov.how':'Cara Tetap Terinformasi','post.gov.li1':'Ikuti kanal resmi PAXI untuk pengumuman.','post.gov.li2':'Gunakan PingPub/explorer untuk memantau timeline.','post.gov.li3':'Tinjau suara validator, alasan, dan diskusi komunitas.',
      'validator.title':'Validator — NervCore (PAXI)','validator.delegation.title':'Delegasi','validator.delegation.desc':'Delegasikan ke <strong>NervCore</strong> melalui PingPub:','validator.delegation.cta':'Buka halaman staking','validator.commission.title':'Komisi','validator.commission.rate':'Rate: 15%','validator.commission.24h':'24h: ±1%','validator.commission.max':'Max: 20%','validator.ops.title':'Prinsip Operasional','validator.quick.title':'Panduan Delegasi Singkat',
      // Services (new)
      'services.hero.title':'Mewujudkan Visi Web3 Anda',
      'services.hero.desc':'Kami tidak sekadar menulis kode; kami merancang solusi. Kami bermitra dengan inovator dan bisnis untuk membangun aplikasi Web3 yang cepat, aman, dan ramah pengguna dengan nilai nyata. Dari konsep awal hingga deployment akhir, kami mitra teknis yang berdedikasi.',
      'services.hero.cta':'Konsultasi Gratis',
      'services.build.title':'Apa yang Kami Bangun',
      'services.build.card1.title':'🌐 Landing Page Kustom & DApp','services.build.card1.desc':'Dari landing page SEO-friendly yang memikat audiens hingga aplikasi terdesentralisasi (DApp) yang fungsional penuh, kami membangun kehadiran Anda di web terdesentralisasi.','services.build.card1.li1':'Cocok untuk: Peluncuran Token, Mint NFT, Showcase Proyek.',
      'services.build.card2.title':'🚀 Aplikasi Web Berperforma Tinggi','services.build.card2.desc':'Butuh lebih dari sekadar halaman? Kami membangun aplikasi web yang tangguh, skalabel, dan mudah dirawat dari nol, dengan fokus pada kecepatan, keamanan, dan kode bersih.','services.build.card2.li1':'Fokus pada: Kecepatan, Skalabilitas, Kode Bersih.',
      'services.build.card3.title':'🛡️ Audit Performa & Keamanan','services.build.card3.desc':'Situs Anda kurang optimal? Kami melakukan audit mendalam menggunakan Lighthouse dan Core Web Vitals untuk mengidentifikasi bottleneck dan risiko keamanan, lalu menyajikan rencana optimasi yang jelas dan dapat ditindaklanjuti.','services.build.card3.li1':'Deliverables: Laporan Detail, Rencana Optimasi.',
      'services.process.title':'Proses Pengembangan Teruji',
      'services.process.step1.title':'1. Discovery & Strategi','services.process.step1.desc':'Kami mulai dengan memahami visi dan tujuan Anda untuk memetakan strategi komprehensif dan roadmap project.',
      'services.process.step2.title':'2. Desain & Prototyping (UI/UX)','services.process.step2.desc':'Kami merancang pengalaman pengguna yang intuitif, membuat wireframe dan mockup untuk persetujuan Anda sebelum menulis kode.',
      'services.process.step3.title':'3. Development & Testing','services.process.step3.desc':'Developer kami mewujudkan desain dengan kode yang bersih dan efisien, lalu melakukan pengujian ketat untuk memastikan pengalaman tanpa bug.',
      'services.process.step4.title':'4. Deployment & Support','services.process.step4.desc':'Kami menangani seluruh proses deployment dan menyediakan dukungan berkelanjutan agar project berjalan lancar setelah rilis.',
      'services.stack.title':'Technology Stack Kami','services.stack.desc':'Kami menggunakan teknologi modern dan terbukti untuk membangun produk yang siap masa depan.','services.stack.react':'React.js','services.stack.next':'Next.js','services.stack.node':'Node.js','services.stack.ethers':'Ethers.js','services.stack.solidity':'Solidity','services.stack.ipfs':'IPFS',
      'services.cta2.title':'Punya Proyek? Mari Bangun Bersama.','services.cta2.desc':'Hubungi kami untuk konsultasi gratis tanpa kewajiban guna membahas bagaimana kami dapat mewujudkan visi Anda.','services.cta2.btn':'Mulai Diskusi',
      'projects.title':'Portofolio Proyek','projects.desc':'Sorotan proyek, template, dan infrastruktur yang kami bangun dan operasikan. Dari reliabilitas validator hingga pengalaman web yang cepat—mencerminkan standar dan pendekatan kami.',
      'projects.featured.title':'Proyek Unggulan',
      'projects.item1.title':'Operasional & Monitoring Validator PAXI',
      'projects.item1.desc':'Setup validator kelas enterprise dengan uptime ketat, manajemen kunci, dan monitoring proaktif. Fokus pada reliabilitas, transparansi, dan kepercayaan delegator.',
      'projects.item1.badge1':'Cosmos SDK','projects.item1.badge2':'Uptime 99.9%+','projects.item1.badge3':'Governance',
      'projects.item1.cta':'Diskusikan Operasional Serupa',
      'projects.item2.title':'Template Landing Page Web3',
      'projects.item2.desc':'Template landing berperforma tinggi dan SEO-friendly untuk tim Web3. Desain bersih, layout responsif, dan muatan cepat demi konversi lebih baik.',
      'projects.item2.badge1':'Lighthouse 95+','projects.item2.badge2':'Responsif','projects.item2.badge3':'Siap SEO',
      'projects.item2.cta':'Kustom Template Ini',
      'projects.cta.title':'Butuh yang Serupa?',
      'projects.cta.desc':'Baik operasional validator, dashboard, maupun situs pemasaran cepat—kami bangun sesuai kebutuhan dengan fokus pada reliabilitas dan performa.',
      'projects.cta.btn':'Mulai Diskusi Proyek',
      'contact.title':'Kontak',
      'contact.intro':'Hubungi Nerv Cores untuk operasi validator, pertanyaan staking, atau konsultasi pengembangan web. Kami profesional, responsif, dan siap membantu.',
      'contact.x.title':'X (Twitter)',
      'contact.x.desc':'Ikuti dan DM <strong>@rainssystem</strong> untuk pertanyaan cepat, update, dan kolaborasi.',
      'contact.x.cta':'Buka Profil X',
      'contact.discord.title':'Discord',
      'contact.discord.desc':'Hubungi kami di Discord: <strong>rainssy</strong> untuk diskusi teknis dan koordinasi.',
      'contact.discord.cta':'Buka Discord',
      'contact.response':'Kami berupaya merespons dalam 24–48 jam di hari kerja.',
      'contact.hours':'Jam kerja: Senin–Jumat, 09:00–17:00 GMT+7.',
      // Networks (new ecosystem hub)
      'net.hero.title':'Mengamankan Masa Depan Multi-Chain',
      'net.hero.desc':'Kami adalah penyedia infrastruktur profesional yang berdedikasi untuk keamanan dan pertumbuhan jaringan terdesentralisasi. Kami percaya pada masa depan di mana berbagai blockchain dapat berdampingan dan berkembang. Misi kami adalah menyediakan fondasi andal dan aman bagi proyek Web3 yang menjanjikan, dimulai dengan komitmen penuh kami pada jaringan PAXI.',
      'net.active.title':'Jaringan Aktif Kami',
      'net.paxi.title':'Jaringan PAXI','net.paxi.status':'✅ VALIDATOR AKTIF','net.paxi.desc':'PAXI adalah blockchain Layer 1 berperforma tinggi dengan fokus pada skalabilitas, keamanan, dan tooling ramah developer untuk mendukung aplikasi terdesentralisasi di dunia nyata.','net.paxi.validator':'Validator Kami: NervCore','net.paxi.uptime':'Uptime: 99.9%+','net.paxi.commission':'Komisi: 15%','net.paxi.cta':'Delegasikan ke NervCore',
      'net.roadmap.title':'Roadmap Ekspansi Kami',
      'net.roadmap.p1.title':'Sedang Riset','net.roadmap.p1.desc':'Kami aktif meneliti dan menguji node untuk jaringan Layer 1 dan Layer 2 yang inovatif. Fokus kami pada proyek dengan fondasi teknis kuat, komunitas aktif, dan visi yang jelas.',
      'net.roadmap.p2.title':'Jaringan Berikutnya (Partisipasi Testnet)','net.roadmap.p2.desc':'Sebelum berkomitmen ke mainnet, kami ikut testnet insentif. Ini membantu kami menguasai kebutuhan teknis dan berkontribusi pada stabilitas jaringan sebelum rilis. Ikuti sosial media kami untuk pengumuman.',
      'net.roadmap.p3.title':'Mainnet Mendatang','net.roadmap.p3.desc':'Target kami meluncur di 2–3 mainnet tambahan pada akhir 2026. Proses seleksi ketat dan melibatkan komunitas. Nantikan pengumuman resmi kami.',
      'net.suggest.title':'Bantu Bentuk Masa Depan Multi-Chain',
      'net.suggest.desc':'Apakah Anda bagian dari proyek blockchain menjanjikan yang mencari validator berdedikasi? Atau anggota komunitas yang ingin kami mendukung jaringan favorit Anda? Ekosistem terbaik dibangun bersama. Kami ingin mendengar dari Anda.',
      'net.suggest.cta':'Usulkan Jaringan'
    }
  };

  window.dict = dict; function applyI18n(lang){
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = (dict[lang]||{})[key];
      if(typeof val === 'string') el.innerHTML = val;
    });
    // Reflect current language on the toggle button
    $$("[data-lang-toggle]").forEach(btn=>{
      const code = lang==='id' ? 'ID' : 'EN';
      btn.textContent = code;
      btn.setAttribute('aria-label', `Language: ${code}`);
      btn.setAttribute('title', `Language: ${code}`);
    });
  }
  window.applyI18n = applyI18n;

  function initLang(){
    const saved = localStorage.getItem('lang');
    const initial = saved || ((navigator.language||'en').toLowerCase().startsWith('id') ? 'id' : 'en');
    applyI18n(initial);
    if(!saved) localStorage.setItem('lang', initial);
  }
  function wireLangToggle(){
    document.addEventListener('click', e=>{
      const btn = e.target.closest('[data-lang-toggle]');
      if(!btn) return;
      const cur = document.documentElement.lang || 'en';
      const next = cur==='en' ? 'id' : 'en';
      localStorage.setItem('lang', next);
      applyI18n(next);
    });
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    initTheme();
    setActiveNav();
    // Ensure search modal exists on every page
    if(!document.getElementById('search-modal')){
      const modalHTML = `\n<div id="search-modal" hidden>\n  <div class="overlay" data-search-close></div>\n  <div class="dialog">\n    <input id="search-input" type="search" placeholder="Search pages..." />\n    <ul id="search-results"></ul>\n  </div>\n</div>`;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    initSearch();
    initLang();
    wireLangToggle();
    document.addEventListener('click', e=>{ if(e.target.closest('[data-theme-toggle]')) toggleTheme(); });
    // Mobile menu
    $$('.menu-toggle').forEach(btn=> btn.addEventListener('click', e=>{
      e.preventDefault();
      const header = btn.closest('header.site');
      if(!header) return;
      const open = header.getAttribute('data-menu-open')==='true';
      header.setAttribute('data-menu-open', open?'false':'true');
    }));
  });
})();


// Extend i18n for validator sections
Object.assign(window.dict.en, {
  'validator.hero.headline':'Stake with Confidence on the PAXI Network',
  'validator.hero.sub':'Your trusted, high-performance validator committed to network security and maximum uptime.',
  'validator.kpi.commission.label':'Commission','validator.kpi.commission.value':'15%',
  'validator.kpi.uptime.label':'Uptime','validator.kpi.uptime.value':'99.9%+',
  'validator.kpi.delegators.label':'Delegators','validator.kpi.delegators.value':'—',
  'validator.cta.delegate':'Delegate Now',
  'validator.why.title':'Why Delegate to NervCore?',
  'validator.why.sec.title':'🛡️ Enterprise-Grade Security','validator.why.sec.desc':'Security is our top priority. We implement best practices in key management, proactive 24/7 monitoring, and resilient infrastructure to protect our node from threats.',
  'validator.why.uptime.title':'⚙️ Maximum Uptime & Reliability','validator.why.uptime.desc':'Never miss rewards. Our infrastructure is engineered for 99.9%+ availability to keep the node online, participating, and consistently earning for delegators.',
  'validator.why.transp.title':'🌐 Transparency & Community Focus','validator.why.transp.desc':'We operate with full transparency you can verify anytime and actively participate in governance to represent delegators’ interests.',
  'validator.stats.title':'Live Node Statistics','validator.stats.node.label':'Node Status','validator.stats.node.value':'🟢 Actively Validating',
  'validator.stats.comm.label':'Commission Rate','validator.stats.comm.value':'15%',
  'validator.stats.max.label':'Max Commission','validator.stats.max.value':'20%',
  'validator.stats.change.label':'24h Rate Change','validator.stats.change.value':'±1%',
  'validator.how.title':'How to Delegate in 3 Easy Steps',
  'validator.how.step1.title':'1) Open the Staking Platform','validator.how.step1.desc':'Use the "Delegate Now" button to open the official and secure staking interface via PingPub.',
  'validator.how.step2.title':'2) Connect Your Wallet','validator.how.step2.desc':'Connect a PAXI-supported wallet (e.g., Keplr or Leap) to the platform.',
  'validator.how.step3.title':'3) Enter Amount & Confirm','validator.how.step3.desc':'Choose the amount you want to delegate to NervCore and confirm the transaction. You’ll start earning rewards.',
  'validator.faq.title':'Frequently Asked Questions','validator.faq.q1':'What is delegation (staking)?','validator.faq.a1':'Delegation is the process of locking your crypto assets with a validator to help secure the network. In return, you receive rewards. Your assets remain in your wallet; you can undelegate anytime per network rules.',
  'validator.faq.q2':'Why is your commission rate 15%?','validator.faq.a2':'A 15% commission covers the operational cost of enterprise-grade servers, premium security, and 24/7 monitoring, ensuring a stable and secure node to maximize your rewards.',
  'validator.faq.q3':'How safe are my funds?','validator.faq.a3':'Very safe. When you delegate, your assets never leave your wallet—you only grant us voting power. You retain full control and can undelegate anytime.'
});
Object.assign(window.dict.id, {
  'validator.hero.headline':'Stake dengan Percaya di Jaringan PAXI',
  'validator.hero.sub':'Validator tepercaya dan berperforma tinggi dengan komitmen pada keamanan jaringan dan uptime maksimal.',
  'validator.kpi.commission.label':'Komisi','validator.kpi.commission.value':'15%',
  'validator.kpi.uptime.label':'Uptime','validator.kpi.uptime.value':'99.9%+',
  'validator.kpi.delegators.label':'Delegator','validator.kpi.delegators.value':'—',
  'validator.cta.delegate':'Delegasikan Sekarang',
  'validator.why.title':'Mengapa Delegasi ke NervCore?',
  'validator.why.sec.title':'🛡️ Keamanan Kelas Enterprise','validator.why.sec.desc':'Keamanan adalah prioritas utama. Kami menerapkan praktik terbaik dalam manajemen kunci, monitoring proaktif 24/7, dan infrastruktur tangguh.',
  'validator.why.uptime.title':'⚙️ Uptime & Keandalan Maksimum','validator.why.uptime.desc':'Jangan lewatkan reward. Infrastruktur kami dirancang untuk ketersediaan 99.9%+ agar node selalu online dan konsisten menghasilkan.',
  'validator.why.transp.title':'🌐 Transparansi & Fokus Komunitas','validator.why.transp.desc':'Operasional transparan yang dapat Anda verifikasi kapan saja. Kami aktif berpartisipasi dalam governance untuk mewakili kepentingan delegator.',
  'validator.stats.title':'Statistik Node Live','validator.stats.node.label':'Status Node','validator.stats.node.value':'🟢 Aktif Memvalidasi',
  'validator.stats.comm.label':'Komisi','validator.stats.comm.value':'15%',
  'validator.stats.max.label':'Komisi Maks','validator.stats.max.value':'20%',
  'validator.stats.change.label':'Perubahan Rate 24j','validator.stats.change.value':'±1%',
  'validator.how.title':'Delegasi dalam 3 Langkah Mudah',
  'validator.how.step1.title':'1) Buka Platform Staking','validator.how.step1.desc':'Gunakan tombol "Delegasikan Sekarang" untuk membuka antarmuka staking resmi melalui PingPub.',
  'validator.how.step2.title':'2) Hubungkan Wallet Anda','validator.how.step2.desc':'Hubungkan wallet yang mendukung PAXI (mis. Keplr atau Leap).',
  'validator.how.step3.title':'3) Masukkan Jumlah & Konfirmasi','validator.how.step3.desc':'Pilih jumlah yang ingin didelegasikan ke NervCore dan konfirmasi transaksi. Reward akan mulai berjalan.',
  'validator.faq.title':'Pertanyaan Umum','validator.faq.q1':'Apa itu delegasi (staking)?','validator.faq.a1':'Delegasi adalah proses mengunci aset kripto Anda dengan validator untuk membantu mengamankan jaringan. Aset tetap di wallet Anda; Anda bisa undelegate kapan saja sesuai aturan jaringan.',
  'validator.faq.q2':'Mengapa rate komisi 15%?','validator.faq.a2':'Komisi 15% menutup biaya operasional server enterprise, keamanan premium, dan monitoring 24/7, memastikan node stabil dan aman untuk memaksimalkan reward Anda.',
  'validator.faq.q3':'Seberapa aman dana saya?','validator.faq.a3':'Sangat aman. Saat mendelegasikan, aset tidak pernah meninggalkan wallet—Anda hanya memberikan voting power. Kontrol penuh tetap di tangan Anda.'
});





