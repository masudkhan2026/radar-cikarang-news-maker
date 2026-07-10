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
// Bersihkan judul untuk mengambil topik utama berita
function getCleanTopic(title) {
  let clean = title;
  
  // Hapus portal berita di bagian belakang (contoh: " - Kompas.com" atau " - Detik Finance")
  clean = clean.replace(/\s*[-|•]\s*[A-Za-z0-9.]+(?:\s+[A-Za-z0-9.]+)*$/i, "");
  
  // Hapus prefix template lokal jika ada
  clean = clean.replace(/^(?:Terbaru|Info Terkini|Sorotan|Terpopuler|Terhangat|Kabar Terbaru|Terbaru: |Info Terkini: |Sorotan: )\s*:\s*/i, "");
  
  return clean.trim();
}

/**
 * Melakukan penulisan ulang berita & optimasi SEO
 * @param {string} title Judul asli berita
 * @param {string} content Konten asli berita
 * @param {string} category Kategori berita
 * @param {string} apiKey (Opsional) API Key Gemini untuk rewrite sesungguhnya
 * @param {string} source Nama sumber berita asli
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
              text: `Anda adalah Jurnalis Senior Media Nasional dan pakar SEO berpengalaman yang bertindak sebagai Redaktur Senior radarcikarang.com. 
Hari ini adalah tanggal ${currentDate}. Tulis ulang berita berikut agar unik, mendalam, bernilai berita tinggi (newsworthy), bebas plagiarisme, dan dioptimalkan secara SEO. 

Aturan penulisan wajib (Gaya Jurnalisme Senior):
1. Tulis berita dengan struktur Piramida Terbalik (Inverted Pyramid) yang diawali dengan Dateline khas (contoh: "JAKARTA - " atau "BEKASI - ") dan lead paragraf (5W+1H) yang kuat dan menarik perhatian.
2. Panjang konten berita harus berkisar antara 300 sampai 600 kata. Anda wajib mengelaborasi tulisan secara mendalam dengan menambahkan detail kronologi, latar belakang konteks, implikasi sosial/ekonomi bagi publik, serta selipkan kutipan langsung (quotes) atau pernyataan dari tokoh/otoritas yang relevan secara realistis (misal: pernyataan Humas KCI, Kepolisian, atau pengamat).
3. Berikan judul berita baru yang menarik, lugas, dan bernilai berita tinggi (click-worthy namun tidak clickbait murahan). Panjang judul HARUS kurang dari 70 karakter (huruf/spasi).
4. Selipkan 1-2 kalimat lokal yang relevan dengan pembaca di Cikarang/Bekasi atau dunia industri (karena Cikarang adalah kawasan industri terbesar di Asia Tenggara) di dalam tubuh artikel.
5. Di bagian paling akhir isi berita (paragraf terakhir), Anda WAJIB menambahkan baris sumber dengan format: "Sumber: ${source}" (tanpa tanda kutip). Contoh: "Sumber: ${source}".
6. Tentukan 1 Meta Description yang memikat (panjang antara 120-160 karakter).
7. Buat slug URL yang ramah SEO (hanya huruf kecil, angka, dan tanda hubung).

Format output harus dalam bentuk JSON valid dengan kunci berikut:
{
  "title": "judul baru di sini (kurang dari 70 karakter)",
  "content": "konten berita lengkap hasil rewrite di sini (300-600 kata, diawali dateline lokasi, diakhiri baris sumber. gunakan pemisah paragraf berupa \\n\\n)",
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

  // FALLBACK: Generator Penulisan Ulang Lokal (Smart Rule-based - Gaya Jurnalis Senior)
  // Bersihkan judul untuk mengambil topik berita
  const topic = getCleanTopic(title);

  // Membuat Judul Baru berbasis Template (kurang dari 70 karakter)
  let rawTitle = getCleanTopic(title);
  if (rawTitle.length > 50) {
    rawTitle = rawTitle.substring(0, 47) + "...";
  }
  const titleTemplates = [
    `Kabar Terbaru: ${rawTitle}`,
    `Dampak Peristiwa ${rawTitle}`,
    `Sorotan Publik: ${rawTitle}`,
    `Terkait Kasus ${rawTitle}`
  ];
  rewrittenTitle = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  if (rewrittenTitle.length > 69) {
    rewrittenTitle = rewrittenTitle.substring(0, 66) + "...";
  }

  // Rewrite konten asli secara rule-based
  let baseContent = ruleBasedRephrase(content);

  // Tentukan Dateline Lokasi berdasarkan kategori
  const locationPrefix = category === "Cikarang" ? "**CIKARANG**" : category === "Bekasi" ? "**BEKASI**" : "**JAKARTA**";

  // Perluas konten secara dinamis menggunakan gaya jurnalis senior (dateline, quote, kronologi)
  const paddingParagraphs = [
    `Insiden mengenai ${topic} saat ini tengah menyedot perhatian publik secara luas di tingkat daerah maupun nasional. Berdasarkan penelusuran lebih lanjut di lapangan, rentetan peristiwa ini telah memicu respon yang cepat serta investigasi dari pihak berwenang guna menemukan jalan keluar terbaik bagi seluruh pihak yang terdampak.`,
    `Pihak otoritas terkait saat dikonfirmasi menyatakan komitmen penuhnya untuk menindaklanjuti serta mengusut tuntas insiden tersebut. "Kami sedang melakukan investigasi mendalam terkait kronologi kejadian ${topic} ini. Jajaran petugas di lapangan berupaya mengumpulkan bukti-bukti pendukung dan akan mengambil tindakan tegas yang presisi sesuai regulasi serta aturan hukum yang berlaku," ujar salah satu perwakilan instansi berwenang saat konferensi pers.`,
    category === "Bisnis" || category === "Ekonomi" 
      ? `Bagi kawasan industri Cikarang yang menjadi basis operasional berbagai korporasi, fluktuasi yang dipicu oleh kasus ${topic} ini diperkirakan dapat mempengaruhi stabilitas dunia usaha lokal. Asosiasi pengusaha setempat menghimbau agar pelaku industri tetap tenang serta bersiap melakukan mitigasi operasional jangka pendek guna mengamankan aktivitas produksi daerah.`
      : `Bagi Kabupaten Bekasi dan area Cikarang yang dihuni ratusan ribu warga dari luar daerah, polemik perihal ${topic} ini menjadi alarm pentingnya sosialisasi aturan publik yang masif. Pengamat sosial menilai bahwa edukasi tata tertib secara persisten menjadi instrumen utama dalam merawat kerukunan dan menciptakan ketertiban lingkungan kemasyarakatan.`,
    `Hingga berita ini diturunkan, jajaran dinas terkait dilaporkan masih terus berkoordinasi secara intensif dengan berbagai elemen kunci di lapangan. Publik menaruh harapan besar agar penyelesaian masalah ${topic} dapat diselesaikan dengan adil, transparan, serta mengedepankan asas musyawarah demi kebaikan bersama.`
  ];

  rewrittenContent = `${locationPrefix} - ` + baseContent + "\n\n" + paddingParagraphs.join("\n\n") + `\n\nSumber: ${source}`;

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
