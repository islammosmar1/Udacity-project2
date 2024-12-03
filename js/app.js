document.addEventListener("DOMContentLoaded", () => {
    let sections = document.querySelectorAll("section");
    const navList = document.getElementById("navbar__list");
  
    // Build the navigation menu
    const buildNav = () => {
      navList.innerHTML = ""; // Clear existing nav items
      sections.forEach((section) => {
        const navItem = document.createElement("li");
        const navLink = document.createElement("a");
        navLink.classList.add("menu__link");
        navLink.href = `#${section.id}`;
        navLink.textContent = section.dataset.nav;
        navLink.dataset.nav = section.id; // Add data attribute
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
      });
    };
  
    // Add class 'active' to section and corresponding nav link when near top of viewport
    const setActiveSection = (entries, observer) => {
      entries.forEach((entry) => {
        const navLink = document.querySelector(
          `a[data-nav="${entry.target.id}"]`
        );
        if (entry.isIntersecting) {
          entry.target.classList.add("your-active-class");
          navLink.classList.add("active"); // Add active class to nav link
          navLink.style.backgroundColor = "#333";
          navLink.style.color = "#fff"; // Change text color to white for contrast
        } else {
          entry.target.classList.remove("your-active-class");
          navLink.classList.remove("active"); // Remove active class from nav link
          navLink.style.backgroundColor = "";
          navLink.style.color = ""; // Reset text color
        }
      });
    };
  
    // Scroll to anchor ID using scrollTO event
    const scrollToSection = (event) => {
      if (event.target.nodeName === "A") {
        event.preventDefault();
        const targetId = event.target.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    // Build menu
    buildNav();
  
    // Scroll to section on link click
    navList.addEventListener("click", scrollToSection);
  
    // Set up Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust threshold as needed
    };
  
    const observer = new IntersectionObserver(setActiveSection, observerOptions);
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    // Create and add Section 4
    const createSection4 = () => {
      const section4 = document.createElement("section");
      section4.id = "section4";
      section4.dataset.nav = "Section 4";
      section4.innerHTML = `
        <div class="landing__container">
          <h2>Section 4</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti.</p>
          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.</p>
        </div>
      `;
      document.querySelector("main").appendChild(section4);
      sections = document.querySelectorAll("section");
      buildNav(); // Rebuild the navigation to include the new section
      sections.forEach((section) => {
        observer.observe(section); // Observe new section
      });
    };
  
    createSection4();
  
    // Create and add scroll to top arrow
    const createScrollToTopArrow = () => {
      const scrollToTopArrow = document.createElement("div");
      scrollToTopArrow.id = "scrollToTopArrow";
      scrollToTopArrow.style.position = "fixed";
      scrollToTopArrow.style.bottom = "20px";
      scrollToTopArrow.style.right = "20px";
      scrollToTopArrow.style.width = "50px";
      scrollToTopArrow.style.height = "50px";
      scrollToTopArrow.style.background = "#000";
      scrollToTopArrow.style.color = "#fff";
      scrollToTopArrow.style.display = "flex";
      scrollToTopArrow.style.alignItems = "center";
      scrollToTopArrow.style.justifyContent = "center";
      scrollToTopArrow.style.borderRadius = "50%";
      scrollToTopArrow.style.cursor = "pointer";
      scrollToTopArrow.innerHTML = "&uarr;";
  
      scrollToTopArrow.addEventListener("mouseover", () => {
        scrollToTopArrow.style.background = "#333";
      });
  
      scrollToTopArrow.addEventListener("mouseout", () => {
        scrollToTopArrow.style.background = "#000";
      });
  
      scrollToTopArrow.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
  
      document.body.appendChild(scrollToTopArrow);
    };
  
    createScrollToTopArrow();
  });
