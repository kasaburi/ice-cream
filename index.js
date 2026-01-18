
document.addEventListener("DOMContentLoaded", () => {

  localStorage.removeItem("userToken");

  const popup = document.getElementById("authPopup");
  const authContent = document.getElementById("authContent");
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnClose = document.getElementById("btnClose");
  const seeHotelsBtn = document.querySelector(".button1");


  function openPopup(innerHtml) {
    authContent.innerHTML = innerHtml;
    popup.style.display = "flex";
  }


  function closePopup() {
    popup.style.display = "none";
    authContent.innerHTML = "";
  }

  function redirectToHotels() {
    console.log("➡️ გადამისამართება hotel.html–ზე...");
    window.location.href = "./hotel.html";
  }


  function handleProtectedNavigation(source) {
    console.log(" handleProtectedNavigation გამოიძახეს (" + source + ")");
    const token = localStorage.getItem("userToken");
    console.log(" userToken =", token);

    if (token) {
      console.log(" ავტორიზებულია → გადამისამართება მოხდება 2 წამში...");
      setTimeout(() => {
        redirectToHotels();
      }, 2000);
    } else {
      console.log(" არ არის ავტორიზებული → ვაჩვენებ popup-ს");
      openPopup("<p style='font-size:18px; color:red;'>გთხოვთ გაიაროთ ავტორიზაცია hotels გვერდზე გადასასვლელად.</p>");
    }
  }

  
  if (seeHotelsBtn) {
    seeHotelsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(" 'See Hotels' ღილაკზე ჰენდლერი მიებმულა");
      handleProtectedNavigation("See Hotels ღილაკი");
    });
  }

  const navHotelsLink = document.querySelector("a[href='./hotel.html']");
  if (navHotelsLink) {
    navHotelsLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("ნავბარის 'Hotels' ლინკზე ჰენდლერი მიებმულა");
      handleProtectedNavigation("Navbar Hotels link");
    });
  }


  



    
  btnLogin.addEventListener("click", () => {
    authContent.innerHTML = '<iframe src="singin.html" style="width:100%; height:400px; border:none;"></iframe>';
    popup.style.display = "flex";
});

    btnRegister.addEventListener("click", () => {
        authContent.innerHTML = '<iframe src="registre.html" style="width:100%; height:400px; border:none;"></iframe>';
        popup.style.display = "flex";
    });












  btnClose.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => { if (e.target === popup) closePopup(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopup(); });

  window.addEventListener("message", (event) => {
    if (event.data.type === "loginSuccess") {
      localStorage.setItem("userToken", event.data.token);
      if (event.data.userEmail) localStorage.setItem("userEmail", event.data.userEmail);
      closePopup();
      redirectToHotels();
    }
  });
});
