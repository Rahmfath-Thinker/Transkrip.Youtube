const getBtn = document.getElementById("getTranscript");
const copyBtn = document.getElementById("copyBtn");
const result = document.getElementById("result");

 const translations = {

    id: {
        title: "Transkrip Youtube",
        subtitle: "Tempel link YouTube dan ambil transkrip",
        getBtn: "Ambil Transkrip",
        copyBtn: "Salin Teks",
        input: "https://youtube.com/watch?v=...",
        result: "Transkrip akan muncul di sini..."
    },

    en: {
        title: "YouTube Transcript",
        subtitle: "Paste a YouTube link and get transcript",
        getBtn: "Get Transcript",
        copyBtn: "Copy Text",
        input: "https://youtube.com/watch?v=...",
        result: "Transcript will appear here..."
    }, 
    ar: {
    title: "نص YouTube",
    subtitle: "ألصق رابط YouTube واحصل على النص",
    getBtn: "الحصول على النص",
    copyBtn: "نسخ النص",
    input: "https://youtube.com/watch?v=...",
    result: "سيظهر النص هنا..."
    },

    ja: {
    title: "YouTube文字起こし",
    subtitle: "YouTubeリンクを貼り付けて文字起こしを取得",
    getBtn: "文字起こしを取得",
    copyBtn: "テキストをコピー",
    input: "https://youtube.com/watch?v=...",
    result: "文字起こしがここに表示されます..."
    }, 
    
    ms: {
    title: "Transkrip YouTube",
    subtitle: "Tampal pautan YouTube dan dapatkan transkrip",
    getBtn: "Dapatkan Transkrip",
    copyBtn: "Salin Teks",
    input: "https://youtube.com/watch?v=...",
    result: "Transkrip akan dipaparkan di sini..."
},

es: {
    title: "Transcripción de YouTube",
    subtitle: "Pega un enlace de YouTube y obtén la transcripción",
    getBtn: "Obtener transcripción",
    copyBtn: "Copiar texto",
    input: "https://youtube.com/watch?v=...",
    result: "La transcripción aparecerá aquí..."
},

pt: {
    title: "Transcrição do YouTube",
    subtitle: "Cole um link do YouTube e obtenha a transcrição",
    getBtn: "Obter transcrição",
    copyBtn: "Copiar texto",
    input: "https://youtube.com/watch?v=...",
    result: "A transcrição aparecerá aqui..."
},

fr: {
    title: "Transcription YouTube",
    subtitle: "Collez un lien YouTube et obtenez la transcription",
    getBtn: "Obtenir la transcription",
    copyBtn: "Copier le texte",
    input: "https://youtube.com/watch?v=...",
    result: "La transcription apparaîtra ici..."
},

de: {
    title: "YouTube-Transkript",
    subtitle: "Füge einen YouTube-Link ein und erhalte das Transkript",
    getBtn: "Transkript abrufen",
    copyBtn: "Text kopieren",
    input: "https://youtube.com/watch?v=...",
    result: "Das Transkript wird hier angezeigt..."
},

ko: {
    title: "YouTube 자막",
    subtitle: "YouTube 링크를 붙여넣고 자막을 가져오세요",
    getBtn: "자막 가져오기",
    copyBtn: "텍스트 복사",
    input: "https://youtube.com/watch?v=...",
    result: "자막이 여기에 표시됩니다..."
},

zh: {
    title: "YouTube 转录文本",
    subtitle: "粘贴 YouTube 链接并获取转录文本",
    getBtn: "获取转录",
    copyBtn: "复制文本",
    input: "https://youtube.com/watch?v=...",
    result: "转录文本将显示在这里..."
},

ru: {
    title: "Транскрипция YouTube",
    subtitle: "Вставьте ссылку YouTube и получите транскрипцию",
    getBtn: "Получить транскрипцию",
    copyBtn: "Копировать текст",
    input: "https://youtube.com/watch?v=...",
    result: "Транскрипция появится здесь..."
}

};

 function updateLanguage(lang){

    const t = translations[lang];

    document.getElementById("title").textContent =
        t.title;

    document.getElementById("subtitle").textContent =
        t.subtitle;

    document.getElementById("getTranscript").textContent =
        t.getBtn;

    document.getElementById("copyBtn").textContent =
        t.copyBtn;

    document.getElementById("youtubeUrl").placeholder =
        t.input;

    document.getElementById("result").placeholder =
        t.result;

}

let selectedLang = "id";

document.querySelectorAll(".chip").forEach(chip => {
    
    chip.addEventListener("click", () => {
        
        document
            .querySelector(".chip.active")
            ?.classList.remove("active");
        
        chip.classList.add("active");
        
        selectedLang = chip.dataset.lang;
        updateLanguage(selectedLang);
    });
    
});

getBtn.addEventListener("click", async () => {

    const url = document.getElementById("youtubeUrl").value;
    const lang = selectedLang;

    if (!url) {
        alert("Masukkan link YouTube dulu.");
        return;
    }

    result.value = "Mengambil transkrip...";

    try {

        // Ganti URL ini nanti dengan Cloudflare Worker milikmu
        const response = await fetch(
            `https://transkripyoutube.rifki91827.workers.dev?url=${encodeURIComponent(url)}&lang=${lang}`
        );

        const data = await response.json();

        result.value = 
         data?.data?.full_text|| 
         "Transkrip tidak ditemukan.";

    } catch (err) {
        result.value = "Gagal mengambil transkrip.";
        console.error(err);
    }
});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(result.value);

    copyBtn.textContent = "Tersalin ✓";

    setTimeout(() => {
        copyBtn.textContent = "Salin Teks";
    }, 2000);

});
