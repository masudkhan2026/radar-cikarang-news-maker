/**
 * AI Rewriter & SEO Optimizer Engine for Radar Cikarang
 */

// Kumpulan kata hubung dan frasa khas Radar Cikarang
const localPhrases = [
  "Bagi masyarakat Cikarang dan sekitarnya, perkembangan ini tentunya menjadi perhatian penting.",
  "Dampak dari kebijakan ini diperkirakan akan dirasakan juga oleh sektor industri di kawasan Cikarang.",
  "Sebagai pusat ekonomi baru di Bekasi, informasi ini sangat relevan bagi pelaku usaha lokal.",
  "Warga Cikarang diharapkan dapat mengantisipasi perkembangan situasi ini.",
  "Radar Cikarang merangkum informasi ini untuk membantu Anda tetap terhubung dengan berita terkini."
];

// Kosakata sinonim untuk memvariasikan penulisan ulang (Rule-based rewrite fallback)
const synonyms = {
  "mengatakan": ["menyatakan", "mengungkapkan", "menjelaskan", "memaparkan", "menyampaikan"],
  "pemerintah": ["pihak berwenang", "pembuat kebijakan", "aparatur negara"],
  "terjadi": ["berlangsung", "tercipta", "terwujud"],
  "sangat": ["amat", "begitu", "luar biasa"],
  "banyak": ["beragam", "sejumlah besar", "berbagai"],
  "masyarakat": ["publik", "warga", "penduduk"],
  "membantu": ["menyokong", "mempermudah", "mendukung"],
  "penting": ["krusial", "signifikan", "vital"],
  "segera": ["cepat atau lambat", "dalam waktu dekat", "tanpa penundaan"],
  "polisi": ["aparat kepolisian", "pihak kepolisian", "petugas keamanan"],
  "inflasi": ["kenaikan harga", "laju inflasi"],
  "rupiah": ["mata uang Garuda", "nilai tukar rupiah"],
  "jakarta": ["ibu kota", "DKI Jakarta"]
};

// Fungsi helper untuk rephrase sederhana jika tidak menggunakan API
function ruleBasedRephrase(text, localTarget = "Cikarang") {
  let paragraphs = text.split('\n').filter(p => p.trim().length > 0);
  let rewrittenParagraphs = [];

  paragraphs.forEach((para, index) => {
    let rewritten = para;
    
    // Ganti sinonim secara acak untuk keunikan
    Object.keys(synonyms).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (Math.random() > 0.4) {
        const replacement = synonyms[word][Math.floor(Math.random() * synonyms[word].length)];
        rewritten = rewritten.replace(regex, replacement);
      }
    });

    // Modifikasi struktur kalimat di awal atau akhir paragraf
    if (index === 0) {
      rewritten = `**RADAR CIKARANG** - ${rewritten}`;
    } else if (index === paragraphs.length - 1) {
      const phrase = localPhrases[Math.floor(Math.random() * localPhrases.length)];
      rewritten = `${rewritten} ${phrase}`;
    } else if (index === Math.floor(paragraphs.length / 2)) {
      rewritten = `Terkait hal tersebut, ${rewritten.charAt(0).toLowerCase() + rewritten.slice(1)}`;
    }

    rewrittenParagraphs.push(rewritten);
  });

  return rewrittenParagraphs.join('\n\n');
}

/**
 * Melakukan penulisan ulang berita & optimasi SEO
 * @param {string} title Judul asli berita
 * @param {string} content Konten asli berita
 * @param {string} category Kategori berita
 * @param {string} apiKey (Opsional) API Key Gemini untuk rewrite sesungguhnya
 * @returns {Promise<object>} Objek berita teroptimasi SEO
 */
/**
 * Melakukan penulisan ulang berita & optimasi SEO
 * @param {string} title Judul asli berita
 * @param {string} content Konten asli berita
 * @param {string} category Kategori berita
 * @param {string} apiKey (Opsional) API Key Gemini untuk rewrite sesungguhnya
 * @param {string} source Nama sumber berita asli (misal: Republika, Detik Finance)
 * @returns {Promise<object>} Objek berita teroptimasi SEO
 */
export async function rewriteNews(title, content, category = "Nasional", apiKey = "", source = "Radar Cikarang") {
  // Simulasi waktu pemrosesan AI (1.5 detik)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const currentDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const currentYear = new Date().getFullYear();

  let rewrittenTitle = "";
  let rewrittenContent = "";
  let focusKeywords = [];

  // 1. Tentukan Focus Keywords secara otomatis dari judul asli
  const cleanTitle = title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  const words = cleanTitle.split(' ').filter(w => w.length > 4);
  
  // Ambil 3-4 kata kunci utama
  const uniqueWords = [...new Set(words)];
  focusKeywords = uniqueWords.slice(0, 3).map(w => w.toLowerCase());
  if (category) focusKeywords.push(category.toLowerCase());
  
  // Tambahkan keyword lokal
  focusKeywords.push("radar cikarang");
  focusKeywords.push("berita cikarang");

  if (apiKey) {
    try {
      // Panggil Gemini API untuk penulisan ulang profesional dan SEO
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Anda adalah editor berita profesional dan pakar SEO untuk portal berita lokal radarcikarang.com. 
Hari ini adalah tanggal ${currentDate}. Tulis ulang berita berikut agar unik, bebas plagiarisme, menarik dibaca, dan dioptimalkan secara SEO. 

Aturan penulisan wajib:
1. Berikan judul berita baru yang menarik perhatian (click-worthy). Panjang judul HARUS kurang dari 70 karakter (huruf/spasi, bukan kata).
2. Tulis ulang konten berita secara mendalam agar memiliki panjang antara 300 sampai 600 kata. Anda harus memperluas pembahasan berita dengan menambahkan detail latar belakang, implikasi bagi publik, atau sudut pandang lokal yang relevan untuk mencapai panjang tersebut (jangan diisi pengulangan kalimat kosong). Asumsikan kejadian berita berlangsung baru-baru ini atau pada tahun berjalan (${currentYear}). Jangan menggunakan tahun lampau seperti 2023 atau 2024 dalam badan berita kecuali jika merujuk pada sejarah masa lalu.
3. Selipkan 1-2 kalimat lokal yang relevan dengan pembaca di Cikarang/Bekasi atau dunia industri (karena Cikarang adalah kawasan industri terbesar di Asia Tenggara) di dalam tubuh artikel.
4. Di bagian paling akhir isi berita (paragraf terakhir), Anda WAJIB menambahkan baris sumber dengan format: "Sumber: ${source}" (tanpa tanda kutip). Contoh: "Sumber: ${source}".
5. Tentukan 1 Meta Description yang menarik (panjang antara 120-160 karakter).
6. Buat slug URL yang ramah SEO (hanya huruf kecil, angka, dan tanda hubung).

Format output harus dalam bentuk JSON valid dengan kunci berikut:
{
  "title": "judul baru di sini (kurang dari 70 karakter)",
  "content": "konten berita lengkap hasil rewrite di sini (300-600 kata, diakhiri baris sumber. gunakan pemisah paragraf berupa \\n\\n)",
  "metaDescription": "meta deskripsi di sini",
  "slug": "slug-url-di-sini"
}

Berita asli yang harus ditulis ulang:
Sumber Asli: ${source}
Kategori: ${category}
Judul Asli: ${title}
Konten Asli: ${content}

Kembalikan HANYA JSON tersebut tanpa markdown backticks.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan Gemini API. Menggunakan Engine Lokal.");
      }

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Bersihkan kemungkinan format markdown ```json ... ```
      const cleanedJsonText = textResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedData = JSON.parse(cleanedJsonText);
      
      return {
        success: true,
        title: parsedData.title,
        content: parsedData.content,
        metaDescription: parsedData.metaDescription,
        slug: parsedData.slug,
        focusKeywords: focusKeywords,
        seoTips: generateSeoTips(parsedData.title, parsedData.content, parsedData.metaDescription, focusKeywords)
      };

    } catch (error) {
      console.warn("Gagal menggunakan API, beralih ke engine lokal:", error);
    }
  }

  // FALLBACK: Generator Penulisan Ulang Lokal (Smart Rule-based)
  // Membuat Judul Baru berbasis Template (kurang dari 70 karakter)
  let rawTitle = title;
  if (rawTitle.length > 50) {
    rawTitle = rawTitle.substring(0, 47) + "...";
  }
  const titleTemplates = [
    `Terbaru: ${rawTitle}`,
    `Info Terkini: ${rawTitle}`,
    `Sorotan: ${rawTitle}`,
    `${rawTitle}`
  ];
  rewrittenTitle = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  if (rewrittenTitle.length > 69) {
    rewrittenTitle = rewrittenTitle.substring(0, 66) + "...";
  }

  // Rewrite konten asli secara rule-based
  let baseContent = ruleBasedRephrase(content);

  // Perluas konten agar berukuran 300 - 600 kata dengan menyisipkan detail lokal Cikarang/Bekasi
  const paddingParagraphs = [
    "Sebagai wilayah administrasi yang menaungi kawasan industri terbesar di Asia Tenggara, Kabupaten Bekasi dan khususnya area Cikarang terus memantau dinamika perkembangan nasional ini secara berkala. Pemerintah daerah setempat bersama jajaran dinas terkait berkomitmen untuk menindaklanjuti serta mengintegrasikan setiap kebijakan pusat agar dapat diaplikasikan secara optimal di tingkat lokal demi mendukung kenyamanan iklim investasi, kelancaran distribusi logistik, dan produktivitas masyarakat di kawasan industri.",
    "Para pelaku usaha dan komunitas lokal di Cikarang menyambut baik perkembangan berita ini dengan antusiasme tinggi, namun tetap dibarengi dengan sikap waspada terhadap potensi tantangan administratif maupun penyesuaian regulasi baru ke depan. Diharapkan koordinasi lintas sektor antara jajaran pemerintah daerah, pihak pengelola kawasan industri, akademisi, dan perwakilan warga dapat terus terjalin erat untuk merumuskan kebijakan turunan yang seimbang dan bermanfaat jangka panjang.",
    category === "Bisnis" || category === "Ekonomi" 
      ? "Perubahan iklim ekonomi makro dan fluktuasi pasar finansial ini tentu memberikan pengaruh langsung terhadap neraca keuangan dan strategi operasional perusahaan-perusahaan manufaktur di kawasan industri Jababeka, MM2100, EJIP, maupun Delta Silicon Cikarang. Jajaran manajemen perusahaan diimbau untuk segera menyusun rencana kontinjensi jangka pendek guna memitigasi dampak risiko operasional, sekaligus menjaga stabilitas serapan tenaga kerja lokal yang menjadi roda penggerak ekonomi utama daerah Bekasi."
      : "Langkah-langkah strategis di tingkat regional juga disiapkan untuk mensinergikan program kerja lokal dengan target pencapaian pembangunan nasional secara berkelanjutan. Hal ini mencakup peningkatan kapasitas sumber daya manusia lokal melalui berbagai pelatihan vokasi terarah di Balai Latihan Kerja (BLK), penyediaan akses permodalan bagi usaha mikro, serta efisiensi regulasi perizinan usaha guna memperkuat daya saing wilayah Cikarang."
  ];

  rewrittenContent = baseContent + "\n\n" + paddingParagraphs.join("\n\n") + `\n\nSumber: ${source}`;

  // Buat Meta Description (maks 155 char)
  let rawMeta = `Baca ulasan lengkap mengenai ${title}. Radar Cikarang menyajikan analisis mendalam dan berita terpercaya untuk Anda hari ini.`;
  if (rawMeta.length > 155) {
    rawMeta = rawMeta.substring(0, 152) + "...";
  }

  // Buat Slug URL
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  return {
    success: true,
    title: rewrittenTitle,
    content: rewrittenContent,
    metaDescription: rawMeta,
    slug: slug,
    focusKeywords: focusKeywords,
    seoTips: generateSeoTips(rewrittenTitle, rewrittenContent, rawMeta, focusKeywords)
  };
}

/**
 * Menganalisis konten dan menghasilkan panduan optimasi SEO
 */
function generateSeoTips(title, content, metaDesc, keywords) {
  const tips = [];
  
  // Cek panjang judul
  if (title.length < 40) {
    tips.push({
      status: "warning",
      text: "Judul terlalu pendek. Coba tambahkan variasi keyword agar lebih menarik (idealnya 50-60 karakter)."
    });
  } else if (title.length > 70) {
    tips.push({
      status: "danger",
      text: "Judul terlalu panjang! Sesuai aturan Radar Cikarang, batasi judul maksimal 70 karakter agar tidak terpotong di Google."
    });
  } else {
    tips.push({
      status: "success",
      text: "Panjang judul sudah optimal (di bawah 70 karakter)."
    });
  }

  // Cek panjang Meta Deskripsi
  if (metaDesc.length < 110) {
    tips.push({
      status: "warning",
      text: "Meta deskripsi terlalu pendek (idealnya 120-160 karakter untuk performa pencarian terbaik)."
    });
  } else if (metaDesc.length > 165) {
    tips.push({
      status: "warning",
      text: "Meta deskripsi terlalu panjang (di atas 160 karakter akan terpotong oleh Google)."
    });
  } else {
    tips.push({
      status: "success",
      text: "Meta deskripsi sudah ideal (120-160 karakter)."
    });
  }

  // Cek Keberadaan Keyword di Judul
  const firstKeyword = keywords[0];
  if (firstKeyword && title.toLowerCase().includes(firstKeyword)) {
    tips.push({
      status: "success",
      text: `Kata kunci utama ("${firstKeyword}") ditemukan di judul!`
    });
  } else {
    tips.push({
      status: "danger",
      text: `Kata kunci utama ("${firstKeyword || 'utama'}") tidak terdeteksi di judul. Selipkan kata kunci ini di dekat awal judul.`
    });
  }

  // Cek Kepadatan Kata Kunci (Keyword Density)
  let count = 0;
  if (firstKeyword) {
    const words = content.toLowerCase().split(/\s+/);
    words.forEach(w => {
      if (w.includes(firstKeyword)) count++;
    });
    const density = (count / words.length) * 100;
    if (density < 0.5) {
      tips.push({
        status: "warning",
        text: `Kepadatan kata kunci "${firstKeyword}" rendah (${density.toFixed(2)}%). Coba selipkan keyword ini beberapa kali lagi di badan teks.`
      });
    } else if (density > 2.5) {
      tips.push({
        status: "danger",
        text: `Kepadatan kata kunci "${firstKeyword}" terlalu tinggi (${density.toFixed(2)}%). Hindari keyword stuffing agar tidak dinilai spam oleh Google.`
      });
    } else {
      tips.push({
        status: "success",
        text: `Kepadatan kata kunci "${firstKeyword}" sangat baik (${density.toFixed(2)}%).`
      });
    }
  }

  // Cek panjang artikel
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount < 300) {
    tips.push({
      status: "danger",
      text: `Artikel terlalu pendek (${wordCount} kata). Sesuai aturan Radar Cikarang, panjang artikel harus antara 300 sampai 600 kata.`
    });
  } else if (wordCount > 600) {
    tips.push({
      status: "danger",
      text: `Artikel terlalu panjang (${wordCount} kata). Sesuai aturan Radar Cikarang, batasi panjang artikel maksimal 600 kata.`
    });
  } else {
    tips.push({
      status: "success",
      text: `Panjang artikel sudah ideal untuk Radar Cikarang (${wordCount} kata).`
    });
  }

  return tips;
}

/**
 * Menghitung skor SEO total (0 - 100)
 */
export function calculateSeoScore(title, content, metaDesc, keywords) {
  let score = 0;
  
  if (!title || !content || !metaDesc) return 0;

  // 1. Skor Panjang Judul (Max 20 poin)
  if (title.length >= 40 && title.length <= 70) score += 20;
  else if (title.length > 0 && title.length < 40) score += 10;

  // 2. Skor Panjang Meta Deskripsi (Max 20 poin)
  if (metaDesc.length >= 120 && metaDesc.length <= 165) score += 20;
  else if (metaDesc.length > 0) score += 10;

  // 3. Skor Keyword dalam Judul (Max 20 poin)
  const firstKeyword = keywords[0];
  if (firstKeyword && title.toLowerCase().includes(firstKeyword.toLowerCase())) {
    score += 20;
  }

  // 4. Skor Keyword dalam Meta Deskripsi (Max 15 poin)
  if (firstKeyword && metaDesc.toLowerCase().includes(firstKeyword.toLowerCase())) {
    score += 15;
  }

  // 5. Skor Panjang Artikel (Max 15 poin)
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount >= 300 && wordCount <= 600) score += 15;
  else if (wordCount >= 100) score += 5;

  // 6. Skor Keyword Density (Max 10 poin)
  if (firstKeyword) {
    const words = content.toLowerCase().split(/\s+/);
    let count = 0;
    words.forEach(w => {
      if (w.includes(firstKeyword)) count++;
    });
    const density = (count / words.length) * 100;
    if (density >= 0.5 && density <= 2.5) score += 10;
    else if (density > 0) score += 5;
  }

  return score;
}
