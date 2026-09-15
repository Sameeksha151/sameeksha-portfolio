/* =====================================================
   SAMEEKSHA PORTFOLIO - JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");


    if (menuBtn && navMenu) {

        menuBtn.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle("show");

            }
        );


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navMenu.classList.remove(
                            "show"
                        );

                    }
                );

            }
        );

    }



    /* =================================================
       LIGHT / DARK MODE
    ================================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");


    if (themeToggle && themeIcon) {


        /* ---------------------------------------------
           CHECK SAVED THEME
        --------------------------------------------- */

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

            themeIcon.textContent = "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            document.body.classList.remove(
                "dark-mode"
            );

            themeIcon.textContent = "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }



        /* ---------------------------------------------
           TOGGLE THEME
        --------------------------------------------- */

        themeToggle.addEventListener(
            "click",
            function () {


                document.body.classList.toggle(
                    "dark-mode"
                );


                const isDarkMode =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                if (isDarkMode) {

                    /* DARK MODE */

                    themeIcon.textContent = "☀";


                    themeToggle.setAttribute(
                        "aria-label",
                        "Switch to light mode"
                    );


                    themeToggle.setAttribute(
                        "title",
                        "Switch to light mode"
                    );


                    localStorage.setItem(
                        "portfolio-theme",
                        "dark"
                    );

                } else {

                    /* LIGHT MODE */

                    themeIcon.textContent = "☾";


                    themeToggle.setAttribute(
                        "aria-label",
                        "Switch to dark mode"
                    );


                    themeToggle.setAttribute(
                        "title",
                        "Switch to dark mode"
                    );


                    localStorage.setItem(
                        "portfolio-theme",
                        "light"
                    );

                }

            }
        );

    }



    /* =================================================
       CERTIFICATE VIEW MORE / SHOW LESS
    ================================================= */

    const viewMoreButton =
        document.getElementById(
            "viewMoreCertificates"
        );


    const extraCertificates =
        document.querySelectorAll(
            ".extra-certificate"
        );


    if (
        viewMoreButton &&
        extraCertificates.length > 0
    ) {


        let certificatesVisible =
            false;


        viewMoreButton.addEventListener(
            "click",
            function () {


                certificatesVisible =
                    !certificatesVisible;


                extraCertificates.forEach(
                    function (certificate) {


                        if (
                            certificatesVisible
                        ) {

                            certificate.classList.add(
                                "show-certificate"
                            );

                        } else {

                            certificate.classList.remove(
                                "show-certificate"
                            );

                        }

                    }
                );


                if (
                    certificatesVisible
                ) {

                    viewMoreButton.innerHTML =
                        'Show Less <span>↑</span>';

                } else {

                    viewMoreButton.innerHTML =
                        'View More <span>→</span>';

                }

            }
        );

    }



    /* =================================================
       CERTIFICATE VIEWER
    ================================================= */

    const certificateLinks =
        document.querySelectorAll(
            ".certificate-link"
        );


    if (
        certificateLinks.length > 0
    ) {


        /* ---------------------------------------------
           CREATE MODAL
        --------------------------------------------- */

        const modal =
            document.createElement("div");


        modal.id =
            "certificateModal";


        modal.innerHTML = `

            <div class="certificate-modal-box">

                <button
                    id="closeCertificate"
                    class="certificate-close"
                    type="button"
                    aria-label="Close certificate"
                >
                    ×
                </button>

                <iframe
                    id="certificateFrame"
                    title="Certificate"
                ></iframe>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const certificateFrame =
            document.getElementById(
                "certificateFrame"
            );


        const closeCertificate =
            document.getElementById(
                "closeCertificate"
            );



        /* ---------------------------------------------
           OPEN CERTIFICATE
        --------------------------------------------- */

        certificateLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function (event) {


                        event.preventDefault();


                        const certificateURL =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !certificateURL
                        ) {
                            return;
                        }


                        certificateFrame.src =
                            certificateURL;


                        modal.classList.add(
                            "active"
                        );


                        document.body.style.overflow =
                            "hidden";

                    }
                );

            }
        );



        /* ---------------------------------------------
           CLOSE MODAL
        --------------------------------------------- */

        function closeModal() {


            modal.classList.remove(
                "active"
            );


            certificateFrame.src =
                "";


            document.body.style.overflow =
                "";

        }



        /* ---------------------------------------------
           CLOSE BUTTON
        --------------------------------------------- */

        closeCertificate.addEventListener(
            "click",
            closeModal
        );



        /* ---------------------------------------------
           CLICK OUTSIDE
        --------------------------------------------- */

        modal.addEventListener(
            "click",
            function (event) {


                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );



        /* ---------------------------------------------
           ESC KEY
        --------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {


                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal();

                }

            }
        );

    }

});

/* =====================================================
   WELCOME CHARACTER + MOUSE FOLLOW
===================================================== */

(function () {

    const overlay = document.getElementById("welcomeOverlay");
    const enterButton = document.getElementById("enterPortfolio");
    const closeButton = document.getElementById("welcomeClose");
    const mascot = document.getElementById("portfolioMascot");
    const mascotMessage = document.getElementById("mascotMessage");

    if (!overlay || !mascot) return;

    let entered = false;
    let targetX = window.innerWidth - 110;
    let targetY = window.innerHeight - 125;
    let currentX = targetX;
    let currentY = targetY;
    let mouseX = targetX;
    let mouseY = targetY;

    function enterPortfolio() {
        if (entered) return;
        entered = true;

        overlay.classList.add("hide-welcome");
        mascot.classList.add("mascot-visible");
        document.body.classList.remove("welcome-locked");

        setTimeout(function () {
            overlay.style.display = "none";
        }, 700);
    }

    if (enterButton) {
        enterButton.addEventListener("click", enterPortfolio);
    }

    if (closeButton) {
        closeButton.addEventListener("click", enterPortfolio);
    }

    /* Mouse tracking with a gentle lag */
    document.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (!entered) return;

        const offsetX = Math.max(-95, Math.min(95, (mouseX - window.innerWidth / 2) * 0.10));
        const offsetY = Math.max(-65, Math.min(65, (mouseY - window.innerHeight / 2) * 0.08));

        targetX = window.innerWidth - 110 + offsetX;
        targetY = window.innerHeight - 125 + offsetY;
    });

    function animateMascot() {
        if (entered) {
            currentX += (targetX - currentX) * 0.075;
            currentY += (targetY - currentY) * 0.075;

            mascot.style.left = currentX + "px";
            mascot.style.top = currentY + "px";
        }

        requestAnimationFrame(animateMascot);
    }

    animateMascot();

    /* Context-aware little messages */
    const sectionMessages = [
        ["about", "Want to know me better? 💜"],
        ["projects", "Let's see what I've built! 🚀"],
        ["group-projects", "Teamwork makes ideas happen! 🤝"],
        ["certificates", "A little proof of my learning! 📜"],
        ["stickers", "My fun digital badges! ✨"],
        ["experience", "Here's my journey so far! 🌟"],
        ["contact", "Let's connect! 💬"]
    ];

    let lastMessage = "";

    function showMascotMessage(message) {
        if (!mascotMessage || message === lastMessage) return;

        lastMessage = message;
        mascotMessage.textContent = message;
        mascotMessage.classList.remove("message-pop");

        void mascotMessage.offsetWidth;
        mascotMessage.classList.add("message-pop");
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const match = sectionMessages.find(function (item) {
                    return item[0] === entry.target.id;
                });

                if (match) {
                    showMascotMessage(match[1]);
                }
            }
        });
    }, {
        threshold: 0.35
    });

    sectionMessages.forEach(function (item) {
        const section = document.getElementById(item[0]);
        if (section) observer.observe(section);
    });

    window.addEventListener("resize", function () {
        if (!entered) return;

        targetX = window.innerWidth - 110;
        targetY = window.innerHeight - 125;
    });

    /* Don't run the follow interaction on touch-only devices. */
    if (window.matchMedia("(pointer: coarse)").matches) {
        mascot.classList.add("touch-device");
    }

})();


/* =====================================================
   FINAL PORTFOLIO SAFETY BEHAVIOUR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const extra = document.querySelectorAll(".certificate-grid .extra-certificate");
    const button = document.getElementById("viewMoreCertificates");
    if (button && extra.length) {
        extra.forEach(card => card.classList.remove("show-certificate"));
    }
});

/* =====================================================
   ACTIVE NAVIGATION LINK WHILE SCROLLING
===================================================== */
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const navLinks = Array.from(document.querySelectorAll('#navMenu a[href^="#"]'));
        const sections = navLinks
            .map(function (link) {
                return document.getElementById(link.getAttribute("href").substring(1));
            })
            .filter(Boolean);

        if (!navLinks.length || !sections.length) return;

        function updateActiveNav() {
            const marker = window.scrollY + window.innerHeight * 0.32;
            let currentSection = sections[0];

            sections.forEach(function (section) {
                if (section.offsetTop <= marker) {
                    currentSection = section;
                }
            });

            navLinks.forEach(function (link) {
                const isActive = link.getAttribute("href") === "#" + currentSection.id;
                link.classList.toggle("active", isActive);
            });
        }

        window.addEventListener("scroll", updateActiveNav, { passive: true });
        window.addEventListener("resize", updateActiveNav);
        updateActiveNav();
    });
})();
