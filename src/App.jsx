import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Sparkles, 
  Search, 
  Key, 
  RefreshCw, 
  Copy, 
  Check, 
  Send, 
  Plus, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ChevronRight, 
  BookOpen,
  HelpCircle,
  FileText,
  Sun,
  Moon,
  Save,
  Image,
  Download
} from 'lucide-react';
import { rewriteNews, calculateSeoScore } from './aiRewriter';

// Kumpulan Berita Populer Mock (Bahasa Indonesia)
const INITIAL_POPULAR_NEWS = [
  {
    id: 1,
    title: "Pemerintah Naikkan Subsidi Motor Listrik Jadi Rp 10 Juta Mulai Bulan Depan",
    category: "Bisnis",
    source: "Detik Finance",
    url: "https://finance.detik.com/energi/d-7000000/insentif-motor-listrik-naik-jadi-rp-10-juta",
    time: "2 jam yang lalu",
    content: "Pemerintah memutuskan untuk meningkatkan insentif pembelian motor listrik baru dari sebelumnya Rp 7 juta menjadi Rp 10 juta per unit. Kebijakan ini diambil guna mempercepat adopsi kendaraan bermotor ramah lingkungan di Indonesia dan menekan polusi udara.\n\nMenteri Koordinator Bidang Kemaritiman dan Investasi menyatakan bahwa penambahan subsidi ini ditargetkan untuk menyasar 200.000 unit motor listrik baru hingga akhir tahun. Persyaratan penerima subsidi juga akan dipermudah, cukup menggunakan KTP untuk satu unit motor per orang.\n\nProdusen motor listrik lokal menyambut baik keputusan ini dan menyatakan kesiapannya untuk meningkatkan kapasitas produksi guna mengantisipasi lonjakan permintaan dari masyarakat."
  },
  {
    id: 2,
    title: "WhatsApp Rilis Fitur Baru Transkrip Pesan Suara ke Teks Bahasa Indonesia",
    category: "Teknologi",
    source: "Kompas Tekno",
    url: "https://tekno.kompas.com/read/2026/07/10/whatsapp-rilis-fitur-transkrip-pesan-suara-bahasa-indonesia",
    time: "4 jam yang lalu",
    content: "Aplikasi pesan instan WhatsApp resmi meluncurkan fitur transkripsi suara menjadi teks secara otomatis dalam Bahasa Indonesia. Fitur ini sangat dinantikan oleh pengguna yang sering menerima pesan suara panjang namun tidak sempat mendengarkannya.\n\nUntuk menggunakan fitur ini, pengguna cukup mengaktifkan opsi transkrip di menu pengaturan obrolan. Proses konversi suara menjadi teks dilakukan langsung di dalam perangkat (on-device) untuk menjaga keamanan dan privasi percakapan pengguna.\n\nPihak WhatsApp menyatakan bahwa pemutakhiran ini dirilis secara bertahap kepada seluruh pengguna Android dan iOS mulai minggu ini."
  },
  {
    id: 3,
    title: "Rupiah Menguat Tajam ke Rp 15.200 per Dolar AS Setelah Pengumuman Inflasi",
    category: "Ekonomi",
    source: "Bloomberg Indonesia",
    url: "https://www.bloombergtechnoz.com/detailnews/rupiah-menguat-ke-15200-setelah-inflasi-melandai",
    time: "6 jam yang lalu",
    content: "Nilai tukar rupiah terhadap dolar Amerika Serikat (AS) mengalami penguatan signifikan pada perdagangan hari ini. Rupiah ditutup menguat ke level Rp 15.200 per dolar AS setelah Bank Indonesia merilis data inflasi yang lebih rendah dari perkiraan pasar.\n\nAnalis pasar keuangan menyebutkan bahwa langkah stabilisasi suku bunga oleh Bank Indonesia serta meredanya kekhawatiran kenaikan suku bunga The Fed memicu aliran modal asing masuk kembali ke pasar keuangan domestik.\n\nPenguatan mata uang Garuda ini diproyeksikan akan terus berlanjut hingga akhir pekan seiring dengan sentimen positif dari data ekspor komoditas nasional."
  },
  {
    id: 4,
    title: "Konser Band Rock Terkenal di Jakarta Resmi Ditambah Menjadi Dua Hari",
    category: "Hiburan",
    source: "Liputan6",
    url: "https://www.liputan6.com/showbiz/read/5000000/konser-rock-jakarta-ditambah-dua-hari-tiket-ludes",
    time: "8 jam yang lalu",
    content: "Antusiasme luar biasa dari para penggemar membuat promotor resmi menambah jadwal konser grup band rock legendaris asal Inggris di Jakarta. Tiket hari pertama yang ludes terjual dalam waktu kurang dari 10 menit menjadi alasan utama keputusan ini.\n\nKonser tambahan akan diselenggarakan pada hari berikutnya di lokasi yang sama, Stadion Gelora Bung Karno. Penjualan tiket untuk hari kedua akan dibuka besok pagi pukul 10.00 WIB melalui situs resmi promotor.\n\nPromotor mengimbau masyarakat untuk berhati-hati terhadap penipuan tiket dan hanya membeli melalui jalur resmi untuk menghindari calo."
  },
  {
    id: 5,
    title: "Polda Metro Jaya Terapkan Tilang Elektronik ETLE Baru di Jalur Protokol",
    category: "Nasional",
    source: "Antara News",
    url: "https://www.antaranews.com/berita/4000000/polda-metro-jaya-tambah-etle-ai-jalur-protokol",
    time: "10 jam yang lalu",
    content: "Polda Metro Jaya resmi mengoperasikan 15 titik kamera tilang elektronik (ETLE) jenis baru dengan teknologi AI yang mampu mendeteksi pengendara yang menggunakan ponsel saat menyetir dan tidak mengenakan sabuk pengaman dengan akurasi 98%.\n\nDirektur Lalu Lintas Polda Metro menyatakan bahwa langkah ini dilakukan untuk meminimalisir interaksi langsung petugas dengan pelanggar dan menciptakan ketertiban lalu lintas yang lebih mandiri.\n\nBagi pelanggar yang terekam kamera ETLE, surat konfirmasi pelanggaran akan dikirimkan langsung ke alamat pemilik kendaraan sesuai STNK dalam kurun waktu 3 hari kerja."
  },
  {
    id: 6,
    title: "Kawasan Industri Cikarang Berlakukan Eco-Industrial Park Mulai Semester Depan",
    category: "Cikarang",
    source: "Radar Cikarang Regional",
    url: "https://radarcikarang.com/kawasan-industri-cikarang-terapkan-eco-industrial-park-semester-depan",
    time: "1 jam yang lalu",
    content: "Pengelola kawasan industri terbesar di Cikarang mengumumkan komitmen baru untuk menerapkan konsep Eco-Industrial Park (EIP) terintegrasi. Kebijakan ini mewajibkan seluruh tenant pabrik untuk melakukan efisiensi energi dan pengelolaan limbah cair secara mandiri.\n\nLangkah ini diambil guna menyelaraskan industri manufaktur dengan standar lingkungan global dan mengurangi polusi industri di Kabupaten Bekasi. Pemerintah daerah menyambut positif inisiatif ini dan menjanjikan insentif pajak daerah bagi industri yang mematuhinya."
  },
  {
    id: 7,
    title: "Pemkot Bekasi Resmikan Taman Hutan Kota Baru di Pusat Kota untuk Ruang Publik",
    category: "Bekasi",
    source: "Bekasi Raya Post",
    url: "https://www.bekasikota.go.id/berita/pemkot-bekasi-resmikan-taman-hutan-kota-baru-ahmad-yani",
    time: "3 jam yang lalu",
    content: "Pemerintah Kota Bekasi meresmikan ruang terbuka hijau baru seluas 5 hektar yang berlokasi di Jalan Ahmad Yani. Taman hutan kota ini dilengkapi dengan jogging track, area bermain ramah anak, dan amphitheater untuk kegiatan seni dan budaya pemuda Bekasi.\n\nWali Kota Bekasi menyampaikan bahwa taman ini dibangun gratis untuk umum sebagai upaya meningkatkan indeks kebahagiaan warga kota dan menyediakan paru-paru kota di tengah tingginya polusi udara."
  }
];

export default function App() {
  // State manajemen
  const [popularNews, setPopularNews] = useState(INITIAL_POPULAR_NEWS);
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || "");
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [isScrapingContent, setIsScrapingContent] = useState(false);
  const [illustrationUrl, setIllustrationUrl] = useState("");
  const [isGeneratingIllustration, setIsGeneratingIllustration] = useState(false);

  // Efek Theme (Light / Dark Mode)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch berita aktual dari Google News / Antara News RSS via JSON proxy
  const fetchLiveNews = async (categoryName) => {
    setIsLoadingFeed(true);
    let rssUrl = "https://news.google.com/rss?hl=id&gl=ID&ceid=ID:id";
    
    if (categoryName === "Cikarang") {
      rssUrl = "https://news.google.com/rss/search?q=Cikarang&hl=id&gl=ID&ceid=ID:id";
    } else if (categoryName === "Bekasi") {
      rssUrl = "https://news.google.com/rss/search?q=Bekasi&hl=id&gl=ID&ceid=ID:id";
    } else if (categoryName === "Nasional") {
      rssUrl = "https://www.antaranews.com/rss/terkini.xml";
    } else if (categoryName === "Bisnis") {
      rssUrl = "https://www.antaranews.com/rss/ekonomi.xml";
    } else if (categoryName === "Teknologi") {
      rssUrl = "https://news.google.com/rss/search?q=Teknologi&hl=id&gl=ID&ceid=ID:id";
    } else if (categoryName === "Ekonomi") {
      rssUrl = "https://www.antaranews.com/rss/ekonomi.xml";
    } else if (categoryName === "Hiburan") {
      rssUrl = "https://www.antaranews.com/rss/hiburan.xml";
    }

    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      if (!response.ok) throw new Error("Failed to fetch RSS");
      const data = await response.json();
      
      if (data.status === "ok" && data.items && data.items.length > 0) {
        const formattedItems = data.items.slice(0, 10).map((item, index) => {
          let title = item.title;
          let sourceName = "Sumber Media";
          const titleParts = title.split(" - ");
          if (titleParts.length > 1) {
            sourceName = titleParts.pop();
            title = titleParts.join(" - ");
          }

          // Bersihkan deskripsi HTML, buang bagian related coverage (ul)
          let rawDesc = item.description || "";
          rawDesc = rawDesc.replace(/<ul[\s\S]*?<\/ul>/gi, ""); // Buang daftar berita terkait dari Google News
          const cleanDesc = rawDesc.replace(/<[^>]*>/g, '').trim();

          return {
            id: `live-${categoryName}-${index}-${Date.now()}`,
            title: title,
            category: categoryName === "Semua" ? "Nasional" : categoryName,
            source: sourceName,
            url: item.link,
            time: formatTimeAgo(item.pubDate),
            content: cleanDesc.length > 50 
              ? cleanDesc 
              : `${title}. Baca ulasan dan informasi lengkapnya langsung melalui portal berita resmi ${sourceName}.`
          };
        });
        setPopularNews(formattedItems);
      } else {
        throw new Error("No items found");
      }
    } catch (error) {
      console.warn("Gagal memuat berita aktual, menggunakan berita cadangan:", error);
      // Fallback ke data mock lokal
      const fallback = INITIAL_POPULAR_NEWS.filter(news => 
        categoryName === "Semua" || news.category === categoryName
      );
      setPopularNews(fallback.length > 0 ? fallback : INITIAL_POPULAR_NEWS);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const formatTimeAgo = (dateStr) => {
    try {
      const pubDate = new Date(dateStr);
      const diffMs = Date.now() - pubDate.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return "Baru saja";
      if (diffHours < 24) return `${diffHours} jam yang lalu`;
      return `${Math.floor(diffHours / 24)} hari yang lalu`;
    } catch {
      return "Hari ini";
    }
  };

  // Mengikis artikel lengkap dari link berita asli
  const scrapeFullContent = async (url) => {
    if (!url) return null;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Network response not ok");
      const htmlText = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      
      // Selector artikel di portal-portal berita utama Indonesia
      const selectors = [
        '.detail__body-text', // Detik
        '#detikdetailtext',   // Detik Alt
        '.read__content',     // Kompas
        '.detail_text',       // CNBC Indonesia
        '.artikel-content',   // Republika
        '.entry-content',     // Umum
        '.post-content',      // Umum
        'article'             // Tag HTML5
      ];
      
      let articleText = "";
      
      for (const selector of selectors) {
        const element = doc.querySelector(selector);
        if (element) {
          const paragraphs = element.querySelectorAll('p');
          if (paragraphs.length > 0) {
            const pTexts = Array.from(paragraphs)
              .map(p => p.textContent.trim())
              .filter(txt => txt.length > 30 && !txt.toLowerCase().includes("baca juga") && !txt.toLowerCase().includes("simak juga") && !txt.toLowerCase().includes("tonton video"));
            
            if (pTexts.length > 0) {
              articleText = pTexts.join('\n\n');
              break;
            }
          }
          
          const rawText = element.textContent.trim();
          if (rawText.length > 200) {
            articleText = rawText;
            break;
          }
        }
      }
      
      if (!articleText || articleText.length < 200) {
        const allParagraphs = doc.querySelectorAll('p');
        const pTexts = Array.from(allParagraphs)
          .map(p => p.textContent.trim())
          .filter(txt => txt.length > 40 && 
                          !txt.toLowerCase().includes("copyright") && 
                          !txt.toLowerCase().includes("baca juga") && 
                          !txt.toLowerCase().includes("simak juga") &&
                          !txt.toLowerCase().includes("cookie"));
        
        if (pTexts.length > 0) {
          articleText = pTexts.join('\n\n');
        }
      }
      
      articleText = articleText
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\s+/g, ' ')
        .replace(/\n /g, '\n')
        .trim();
        
      return articleText.length > 100 ? articleText : null;
      
    } catch (error) {
      console.warn("Gagal mengekstrak isi asli berita:", error);
      return null;
    }
  };

  // Efek memuat berita live saat kategori berganti
  useEffect(() => {
    fetchLiveNews(activeCategory);
  }, [activeCategory]);
  
  // Custom Input Form (jika user ingin menulis sendiri)
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customContent, setCustomContent] = useState("");
  const [customCategory, setCustomCategory] = useState("Nasional");

  // State Editor Hasil Rewrite
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenTitle, setRewrittenTitle] = useState("");
  const [rewrittenContent, setRewrittenContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [focusKeywords, setFocusKeywords] = useState([]);
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [seoTips, setSeoTips] = useState([]);
  const [seoScore, setSeoScore] = useState(0);

  // Publikasi & Toast Notification
  const [toastMessage, setToastMessage] = useState("");
  const [publishedArticles, setPublishedArticles] = useState([]);

  // Filter Kategori
  const categories = ["Semua", "Cikarang", "Bekasi", "Nasional", "Bisnis", "Teknologi", "Ekonomi", "Hiburan"];

  // Efek kalkulasi SEO Score secara real-time saat editor berubah
  useEffect(() => {
    if (rewrittenTitle || rewrittenContent || metaDescription) {
      const score = calculateSeoScore(rewrittenTitle, rewrittenContent, metaDescription, focusKeywords);
      setSeoScore(score);
    }
  }, [rewrittenTitle, rewrittenContent, metaDescription, focusKeywords]);

  // Tampilkan toast sementara
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Handler Pilih Berita
  const handleSelectNews = async (news) => {
    setSelectedNews(news);
    setIsAddingCustom(false);
    
    // Reset state editor & gambar
    setRewrittenTitle("");
    setRewrittenContent("");
    setMetaDescription("");
    setSlug("");
    setFocusKeywords([]);
    setSeoScore(0);
    setIllustrationUrl("");

    // Ambil isi artikel utuh secara real-time dari link asli
    if (news.url && (news.id.startsWith('live-') || news.content.includes("Baca ulasan dan informasi lengkapnya"))) {
      setIsScrapingContent(true);
      const fullText = await scrapeFullContent(news.url);
      if (fullText) {
        setSelectedNews(prev => ({
          ...prev,
          content: fullText
        }));
        
        // Cache konten utuh di popularNews agar tidak scrape ulang jika diklik lagi
        setPopularNews(prevList => 
          prevList.map(item => 
            item.id === news.id ? { ...item, content: fullText } : item
          )
        );
      }
      setIsScrapingContent(false);
    }
  };

  // Handler memicu Rewrite AI
  const handleRewrite = async () => {
    const titleToRewrite = isAddingCustom ? customTitle : selectedNews?.title;
    const contentToRewrite = isAddingCustom ? customContent : selectedNews?.content;
    const categoryToRewrite = isAddingCustom ? customCategory : selectedNews?.category;
    const sourceToRewrite = isAddingCustom ? "Tulis Manual" : (selectedNews?.source || "Radar Cikarang");

    if (!titleToRewrite || !contentToRewrite) {
      showToast("Judul dan isi berita tidak boleh kosong!");
      return;
    }

    setIsRewriting(true);
    try {
      const result = await rewriteNews(titleToRewrite, contentToRewrite, categoryToRewrite, apiKey, sourceToRewrite);
      if (result.success) {
        setRewrittenTitle(result.title);
        setRewrittenContent(result.content);
        setMetaDescription(result.metaDescription);
        setSlug(result.slug);
        setFocusKeywords(result.focusKeywords);
        setSeoTips(result.seoTips);
        showToast("Berita berhasil diduplikasi & dioptimasi SEO!");
      }
    } catch (error) {
      console.error(error);
      showToast("Gagal melakukan rewrite berita.");
    } finally {
      setIsRewriting(false);
    }
  };

  // Salin ke Papan Klip
  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    showToast(message || "Berhasil disalin ke clipboard!");
  };

  // Tambahkan kata kunci kustom
  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' && newKeywordInput.trim()) {
      const keyword = newKeywordInput.trim().toLowerCase();
      if (!focusKeywords.includes(keyword)) {
        setFocusKeywords([...focusKeywords, keyword]);
      }
      setNewKeywordInput("");
    }
  };

  // Hapus kata kunci
  const handleRemoveKeyword = (indexToRemove) => {
    setFocusKeywords(focusKeywords.filter((_, i) => i !== indexToRemove));
  };

  // Publish simulasi berita ke radarcikarang.com
  const handlePublish = () => {
    if (!rewrittenTitle || !rewrittenContent) {
      showToast("Konten hasil rewrite belum siap dipublikasi!");
      return;
    }

    const newPublish = {
      id: Date.now(),
      title: rewrittenTitle,
      slug: slug,
      category: isAddingCustom ? customCategory : (selectedNews?.category || "Nasional"),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      score: seoScore
    };

    setPublishedArticles([newPublish, ...publishedArticles]);
    showToast("Berita berhasil dipublikasi ke radarcikarang.com!");
  };

  // Fungsi menghasilkan ilustrasi gambar 16:9 berdasarkan judul menggunakan AI
  const handleGenerateIllustration = async () => {
    if (!rewrittenTitle) {
      showToast("Judul hasil duplikasi harus ada terlebih dahulu!");
      return;
    }
    
    setIsGeneratingIllustration(true);
    
    try {
      // Prompt instruksi AI sesuai permintaan user
      const aiPrompt = `buatkan gambar ilustrasi rasio 16:9 dari judul berita: ${rewrittenTitle}`;
      
      // Gunakan Pollinations AI Generator gratis yang sangat bertenaga
      // Tambahkan random seed agar gambar selalu unik setiap kali digenerate
      const seed = Math.floor(Math.random() * 1000000);
      const imageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(aiPrompt)}?width=800&height=450&nologo=true&seed=${seed}`;
      
      // Cek apakah gambar dapat diakses (pre-load)
      const img = new window.Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Gagal memuat gambar dari server AI"));
      });
      
      setIllustrationUrl(imageUrl);
      showToast("Ilustrasi berita AI berhasil dibuat!");
    } catch (error) {
      console.error(error);
      showToast("Gagal memuat ilustrasi AI. Menggunakan fallback...");
      
      // Fallback ke Lorem Flickr jika Pollinations sedang down/limit
      const topic = rewrittenTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .slice(0, 2)
        .join(',');
      const seed = Math.floor(Math.random() * 10000);
      setIllustrationUrl(`https://loremflickr.com/800/450/${encodeURIComponent(topic || 'news')}?lock=${seed}`);
    } finally {
      setIsGeneratingIllustration(false);
    }
  };

  // Fungsi mengunduh ilustrasi gambar ke komputer
  const handleDownloadIllustration = async () => {
    if (!illustrationUrl) return;
    try {
      showToast("Mengunduh gambar...");
      // Gunakan corsproxy.io untuk melewati blokir CORS saat fetch blob gambar
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(illustrationUrl)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `ilustrasi-${slug || 'radar-cikarang'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showToast("Gambar berhasil diunduh!");
    } catch (error) {
      console.warn("Gagal unduh langsung, membuka di tab baru:", error);
      window.open(illustrationUrl, "_blank");
      showToast("Membuka gambar di tab baru untuk diunduh!");
    }
  };

  // Filter list berita populer berdasarkan pencarian dan kategori
  const filteredNews = popularNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || news.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      {/* HEADER UTAMA */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">
            <Newspaper size={28} />
          </div>
          <div className="logo-text">
            <h1>Radar Cikarang</h1>
            <div className="logo-subtitle">AI News Duplicator & SEO Optimizer Engine</div>
          </div>
        </div>

        <div className="api-section">
          <div className="api-input-wrapper">
            <Key size={16} className="api-icon" />
            <input 
              type="password" 
              placeholder="Masukkan Gemini API Key (Opsional)..." 
              className="api-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          
          <button 
            className="btn btn-primary"
            style={{ 
              padding: '0.45rem 0.75rem', 
              fontSize: '0.8rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem',
              height: '38px',
              borderRadius: '8px'
            }}
            onClick={() => {
              localStorage.setItem('gemini_api_key', apiKey);
              showToast("Gemini API Key berhasil disimpan!");
            }}
            title="Simpan API Key di browser"
          >
            <Save size={14} /> Simpan
          </button>
          
          <button 
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="btn btn-outline" 
            onClick={() => {
              setIsAddingCustom(true);
              setSelectedNews(null);
              setCustomTitle("");
              setCustomContent("");
              // Reset editor
              setRewrittenTitle("");
              setRewrittenContent("");
              setMetaDescription("");
              setSlug("");
              setFocusKeywords([]);
              setSeoScore(0);
            }}
          >
            <Plus size={16} /> Tulis Manual
          </button>
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <main className="dashboard-grid">
        
        {/* PANEL KIRI: BERITA POPULER HARI INI */}
        <section className="sidebar-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <TrendingUp size={20} style={{ color: '#8b5cf6' }} />
              Berita Populer
            </h2>
            <button 
              className="refresh-btn" 
              title="Refresh Berita"
              onClick={() => {
                showToast("Daftar berita populer diperbarui!");
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Filter Kategori */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className="category-tag"
                style={{ 
                  cursor: 'pointer',
                  background: activeCategory === cat ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="api-input-wrapper" style={{ width: '100%' }}>
            <Search size={16} className="api-icon" />
            <input 
              type="text" 
              placeholder="Cari berita populer..." 
              className="api-input"
              style={{ width: '100%', paddingLeft: '2.25rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Feed List */}
          <div className="news-feed-list">
            {isLoadingFeed ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <div className="spinner" style={{ width: '32px', height: '32px' }}></div>
                <span style={{ fontSize: '0.85rem' }}>Mengambil berita populer hari ini...</span>
              </div>
            ) : (
              <>
                {filteredNews.map(news => (
                  <div 
                    key={news.id} 
                    className={`news-card ${selectedNews?.id === news.id ? 'active' : ''}`}
                    onClick={() => handleSelectNews(news)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="category-tag">{news.category}</span>
                      <a 
                        href={news.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="news-card-source-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {news.source}
                      </a>
                    </div>
                    <h3 className="news-card-title">{news.title}</h3>
                    <div className="news-card-footer">
                      <span>{news.time}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
                {filteredNews.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Tidak ada berita populer ditemukan.
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* PANEL KANAN: WORKSPACE EDITOR */}
        <section className="workspace-panel">
          
          {/* JIKA BELUM PILIH BERITA & TIDAK TULIS MANUAL */}
          {!selectedNews && !isAddingCustom ? (
            <div className="workspace-placeholder">
              <div className="placeholder-icon">
                <Sparkles size={32} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-title)', color: '#fff' }}>Mulai Duplikasi Berita Populer</h2>
              <p style={{ maxWidth: '460px', fontSize: '0.9rem' }}>
                Pilih berita terhangat hari ini dari panel kiri atau klik <strong>"Tulis Manual"</strong> di atas untuk memproses konten kustom Anda sendiri.
              </p>
            </div>
          ) : (
            
            /* JIKA BERITA DIPILIH ATAU PILIH TULIS MANUAL */
            <div className="editor-card">
              
              {/* HEADER EDITOR */}
              <div className="editor-header">
                <div className="editor-title-group">
                  <h2>
                    {isAddingCustom ? "Mode Penulisan Berita Manual" : "Detail Berita Asli"}
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {isAddingCustom ? "Ketik judul dan isi berita sumber untuk diduplikasi" : (
                      <>
                        Sumber: <a href={selectedNews?.url} target="_blank" rel="noopener noreferrer" className="news-detail-source-link">{selectedNews?.source}</a> • {selectedNews?.time}
                      </>
                    )}
                  </p>
                </div>
                
                <div className="editor-actions">
                  <button 
                    className={`btn btn-primary ${isRewriting ? 'loading' : ''}`}
                    onClick={handleRewrite}
                    disabled={isRewriting}
                  >
                    <Sparkles size={16} /> 
                    {isRewriting ? "Sedang Menulis Ulang..." : "Buatkan Duplikasi Beritanya"}
                  </button>
                </div>
              </div>

              {/* AREA BERITA SUMBER */}
              {isAddingCustom ? (
                <div className="editor-inputs" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', padding: '1.25rem', borderRadius: '12px' }}>
                  <div className="input-group">
                    <label className="input-label">Kategori Berita</label>
                    <select 
                      className="text-input" 
                      value={customCategory} 
                      onChange={(e) => setCustomCategory(e.target.value)}
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      {categories.filter(c => c !== "Semua").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Judul Berita Asli</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan judul berita populer..." 
                      className="text-input"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Konten Berita Asli</label>
                    <textarea 
                      placeholder="Tempel atau ketik konten berita asli di sini..." 
                      className="text-input textarea-input"
                      style={{ minHeight: '120px' }}
                      value={customContent}
                      onChange={(e) => setCustomContent(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="original-news-box" style={{ position: 'relative' }}>
                  {isScrapingContent && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(15, 23, 42, 0.85)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      zIndex: 10,
                      borderRadius: '8px',
                      color: '#38bdf8'
                    }}>
                      <div className="spinner" style={{ width: '28px', height: '28px' }}></div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Mengambil isi berita lengkap dari {selectedNews?.source}...</span>
                    </div>
                  )}
                  <h3 className="original-title">{selectedNews?.title}</h3>
                  <div className="original-content" style={{ opacity: isScrapingContent ? 0.3 : 1, transition: 'opacity 0.2s ease' }}>
                    {selectedNews?.content.split('\n\n').map((para, i) => (
                      <p key={i} style={{ marginBottom: '0.75rem' }}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* AREA HASIL REWRITE & SEO OPTIMIZER */}
              {(rewrittenTitle || isRewriting) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} style={{ color: '#10b981' }} />
                    <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>Hasil Penulisan Ulang & Optimasi SEO</h2>
                  </div>

                  {isRewriting ? (
                    <div className="loading-overlay">
                      <div className="spinner"></div>
                      <p>Kecerdasan Buatan sedang memformulasikan berita unik & mengoptimalkan SEO...</p>
                    </div>
                  ) : (
                    
                    /* EDITOR HASIL DAN PANEL SEO SIDEBAR */
                    <div className="workspace-grid">
                      
                      {/* SUB-PANEL KIRI: EDIT KONTEN HASIL */}
                      <div className="editor-inputs">
                        
                        <div className="input-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <label className="input-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              Judul Berita Teroptimasi SEO
                              <button 
                                className="copy-small-btn"
                                onClick={() => handleCopy(rewrittenTitle, "Judul berita disalin!")}
                                title="Salin Judul"
                              >
                                <Copy size={12} />
                              </button>
                            </label>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: rewrittenTitle.length > 70 || rewrittenTitle.length < 40 ? '#f59e0b' : '#10b981' }}>
                              {rewrittenTitle.length} Karakter
                            </span>
                          </div>
                          <input 
                            type="text" 
                            className="text-input" 
                            value={rewrittenTitle} 
                            onChange={(e) => setRewrittenTitle(e.target.value)}
                            style={{ fontWeight: '600' }}
                          />
                        </div>

                        <div className="input-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <label className="input-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              Slug URL (Ramah SEO)
                              <button 
                                className="copy-small-btn"
                                onClick={() => handleCopy(slug, "Slug URL disalin!")}
                                title="Salin Slug URL"
                              >
                                <Copy size={12} />
                              </button>
                            </label>
                          </div>
                          <input 
                            type="text" 
                            className="text-input" 
                            value={slug} 
                            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                          />
                        </div>

                        <div className="input-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <label className="input-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              Meta Deskripsi
                              <button 
                                className="copy-small-btn"
                                onClick={() => handleCopy(metaDescription, "Meta deskripsi disalin!")}
                                title="Salin Meta Deskripsi"
                              >
                                <Copy size={12} />
                              </button>
                            </label>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: metaDescription.length > 165 || metaDescription.length < 110 ? '#f59e0b' : '#10b981' }}>
                              {metaDescription.length} / 160 Karakter
                            </span>
                          </div>
                          <textarea 
                            className="text-input" 
                            style={{ minHeight: '60px', resize: 'none' }}
                            value={metaDescription} 
                            onChange={(e) => setMetaDescription(e.target.value)}
                          />
                        </div>

                        <div className="input-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <label className="input-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              Isi Berita Baru (Gaya Radar Cikarang)
                              <button 
                                className="copy-small-btn"
                                onClick={() => handleCopy(rewrittenContent, "Isi berita baru disalin!")}
                                title="Salin Isi Berita"
                              >
                                <Copy size={12} />
                              </button>
                            </label>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>
                              {rewrittenContent.split(/\s+/).filter(w => w.length > 0).length} Kata
                            </span>
                          </div>
                          <textarea 
                            className="text-input textarea-input" 
                            value={rewrittenContent} 
                            onChange={(e) => setRewrittenContent(e.target.value)}
                          />
                        </div>

                        {/* FITUR ILUSTRASI GAMBAR 16:9 */}
                        <div className="input-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                          <button
                            className="btn btn-outline"
                            style={{ 
                              width: '100%', 
                              justifyContent: 'center', 
                              borderColor: 'var(--text-muted)',
                              background: 'rgba(255,255,255,0.02)',
                              color: 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              height: '42px',
                              fontWeight: 600
                            }}
                            onClick={handleGenerateIllustration}
                            disabled={isGeneratingIllustration}
                          >
                            <Image size={18} />
                            {isGeneratingIllustration ? "Sedang Membuat Ilustrasi..." : "Buat Ilustrasi Berita Rasio 16:9"}
                          </button>

                          {/* Bagian Hitam Kotak Ilustrasi (16:9) */}
                          <div 
                            style={{ 
                              width: '100%', 
                              aspectRatio: '16/9', 
                              background: '#000', 
                              borderRadius: '12px', 
                              marginTop: '1rem',
                              position: 'relative',
                              overflow: 'hidden',
                              border: '1px solid var(--border-color)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {isGeneratingIllustration && (
                              <div style={{
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#38bdf8',
                                zIndex: 5
                              }}>
                                <div className="spinner" style={{ width: '28px', height: '28px' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Mencari aset gambar relevan...</span>
                              </div>
                            )}

                            {illustrationUrl ? (
                              <>
                                <img 
                                  src={illustrationUrl} 
                                  alt="Ilustrasi Berita"
                                  style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    opacity: isGeneratingIllustration ? 0.3 : 1,
                                    transition: 'opacity 0.2s ease'
                                  }}
                                />
                                {/* Tombol Download Melayang */}
                                <button
                                  onClick={handleDownloadIllustration}
                                  style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    right: '12px',
                                    background: 'rgba(15, 23, 42, 0.85)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    zIndex: 6,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                    transition: 'all 0.2s'
                                  }}
                                  onMouseEnter={(e) => e.target.style.background = '#3b82f6'}
                                  onMouseLeave={(e) => e.target.style.background = 'rgba(15, 23, 42, 0.85)'}
                                >
                                  <Download size={14} /> Download Gambar
                                </button>
                              </>
                            ) : (
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <Image size={24} style={{ opacity: 0.5 }} />
                                <span>Kotak Ilustrasi Berita (16:9)</span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* SUB-PANEL KANAN: ANALISIS SEO SCORE & TIPS */}
                      <div className="seo-panel">
                        
                        <div className="score-circle-wrapper">
                          <div className={`score-circle ${seoScore >= 80 ? 'success' : seoScore >= 50 ? 'warning' : 'danger'}`}>
                            <span className="score-value">{seoScore}</span>
                            <span className="score-label">Skor SEO</span>
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: seoScore >= 80 ? '#10b981' : '#f59e0b' }}>
                            {seoScore >= 80 ? "Sangat Baik (SEO-Ready)" : "Butuh Optimasi Tambahan"}
                          </span>
                        </div>

                        {/* Input Focus Keywords */}
                        <div className="input-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                          <label className="input-label">Kata Kunci Fokus (Tekan Enter)</label>
                          <input 
                            type="text" 
                            placeholder="Tambah kata kunci..." 
                            className="text-input"
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                            value={newKeywordInput}
                            onChange={(e) => setNewKeywordInput(e.target.value)}
                            onKeyDown={handleAddKeyword}
                          />
                          <div className="keywords-container" style={{ marginTop: '0.5rem' }}>
                            {focusKeywords.map((keyword, index) => (
                              <span key={index} className="keyword-chip">
                                {keyword}
                                <span 
                                  style={{ cursor: 'pointer', marginLeft: '0.25rem', fontWeight: 'bold' }} 
                                  onClick={() => handleRemoveKeyword(index)}
                                >
                                  ×
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Checklist Optimasi SEO */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <h4 style={{ fontSize: '0.85rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.25rem', margin: 0 }}>
                              <FileText size={14} /> Checklist SEO
                            </h4>
                            {/* Tombol Muat Ulang jika ada isu/warning/danger */}
                            {seoTips.some(tip => tip.status === 'warning' || tip.status === 'danger') && (
                              <button
                                className="refresh-btn"
                                style={{ 
                                  fontSize: '0.75rem', 
                                  padding: '0.25rem 0.5rem', 
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  border: '1px solid rgba(245, 158, 11, 0.3)',
                                  background: 'rgba(245, 158, 11, 0.1)',
                                  color: '#f59e0b',
                                  cursor: 'pointer',
                                  height: '24px'
                                }}
                                onClick={handleRewrite}
                                disabled={isRewriting}
                                title="Jalankan ulang rewrite untuk memperbaiki isu SEO"
                              >
                                <RefreshCw size={10} className={isRewriting ? "spin-icon" : ""} />
                                {isRewriting ? "Memproses..." : "Muat Ulang AI"}
                              </button>
                            )}
                          </div>
                          <div className="seo-tips-list">
                            {seoTips.map((tip, index) => (
                              <div key={index} className={`seo-tip-item ${tip.status}`}>
                                {tip.status === 'success' && <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
                                {tip.status === 'warning' && <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
                                {tip.status === 'danger' && <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
                                <span>{tip.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tombol Aksi Ekspor */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                          <button 
                            className="btn btn-primary"
                            style={{ justifyContent: 'center', width: '100%' }}
                            onClick={() => handleCopy(
                              `Judul: ${rewrittenTitle}\n\nSlug: ${slug}\nMeta Desc: ${metaDescription}\nKeywords: ${focusKeywords.join(', ')}\n\nKonten:\n${rewrittenContent}`,
                              "Seluruh data berita disalin!"
                            )}
                          >
                            <Copy size={16} /> Salin Semua Draf Berita
                          </button>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* RIWAYAT PUBLIKASI (HISTORI) */}
          {publishedArticles.length > 0 && (
            <div className="editor-card" style={{ background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={20} style={{ color: '#10b981' }} />
                Berita Terpublikasi di radarcikarang.com (Simulasi)
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                {publishedArticles.map(art => (
                  <div 
                    key={art.id}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      background: 'rgba(0,0,0,0.2)', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)' 
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{art.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        URL: radarcikarang.com/{art.slug} • Kategori: {art.category} • Tanggal: {art.date}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="category-tag" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                        SEO: {art.score}
                      </span>
                      <button 
                        className="refresh-btn"
                        onClick={() => handleCopy(`https://radarcikarang.com/${art.slug}`, "Link URL disalin!")}
                        title="Salin Link URL"
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

      </main>

      {/* TOAST POPUP NOTIFICATION */}
      {toastMessage && (
        <div className="toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
