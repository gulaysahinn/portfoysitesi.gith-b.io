// === GÜVENLİK NOTU: Lütfen FirebaseConfig bilgilerinizi buradan silip,
// === Google Cloud'dan YENİDEN OLUŞTURDUĞUNUZ anahtarlarla değiştirin!
// === Anahtarınızı kısıtlamayı (HTTP Referrer) unutmayın!

// === TEMA DEĞİŞTİRME KODU ===
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const themeIcon = document.querySelector(".theme-toggle i");
  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

// === KAYDIRMA ANİMASYONU KODU ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("Scroll animasyonu JS yüklendi!");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Görünüyor:", entry.target);
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.2, // %20 görünür olunca tetikle
      rootMargin: "0px 0px -50px 0px", // biraz erken başlat
    }
  );

  const hiddenElements = document.querySelectorAll(".hidden");
  console.log("Gizli eleman sayısı:", hiddenElements.length);
  hiddenElements.forEach((el) => observer.observe(el));
});

// === MOBİL MENÜ KODU ===
const menu = document.getElementById("navbar-menu");
const menuToggle = document.getElementById("mobile-menu");

// Hata ayıklama: Sadece element varsa çalış
if (menu && menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("is-active");
  });
}

// === FIREBASE FORM KAYDETME ===

// 1. Firebase Proje Bilgilerinizi (YENİ OLUŞTURDUKLARINIZI) Buraya Yapıştırın
const firebaseConfig = {
  apiKey: "AIzaSyDr7ERrvYWbhOnLekz47FIrDLtJJ9QlCBI",
  authDomain: "gulay-sahin-portfolio.firebaseapp.com",
  projectId: "gulay-sahin-portfolio",
  storageBucket: "gulay-sahin-portfolio.firebasestorage.app",
  messagingSenderId: "237841325617",
  appId: "1:237841325617:web:20317d7081ccc7b487ff10",
};

// 2. Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Formu yakala
const contactForm = document.getElementById("contact-form");

// Hata ayıklama: Sadece form varsa çalış
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Formun sayfayı yenilemesini engelle

    // 4. Formdaki verileri al
    const name = contactForm.querySelector("#name").value;
    const email = contactForm.querySelector("#email").value;
    const message = contactForm.querySelector("#message").value;
    const timestamp = new Date();

    // 5. Veriyi "mesajlar" koleksiyonuna gönder
    db.collection("mesajlar")
      .add({
        ad: name,
        email: email,
        mesaj: message,
        tarih: timestamp,
      })
      .then(() => {
        const successMsg = document.getElementById("form-success");
        successMsg.style.display = "block"; // Mesajı göster
        contactForm.reset(); // Formu temizle

        // 2 saniye sonra mesajı tekrar gizle
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 2000);
      })
      .catch((error) => {
        console.error("Hata:", error);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  });
}
