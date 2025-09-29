// Custom Cursor
class CustomCursor {
  constructor() {
    this.el = document.createElement("div");
    this.el.classList.add("custom-cursor");
    document.body.appendChild(this.el);
    this.init();
  }
  init() {
    let last = 0;
    document.addEventListener("mousemove", (e) => {
      if (Date.now() - last < 50) return;
      last = Date.now();
      gsap.to(this.el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    });
    document.querySelectorAll(".card, .btn, nav a").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.el.classList.add("hover-state");
        gsap.to(el, { scale: 1.02, duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        this.el.classList.remove("hover-state");
        gsap.to(el, { scale: 1, duration: 0.3 });
      });
    });
  }
}

// Particles
function initParticles() {
  if (!document.getElementById("particles-js")) return;
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--particle")
    .trim();
  const count = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--particle-count"
    ) || "40"
  );
  particlesJS("particles-js", {
    particles: {
      number: { value: count, density: { enable: true, value_area: 800 } },
      color: { value: color },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1 },
      },
      size: {
        value: 6,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5 },
      },
      line_linked: {
        enable: true,
        color: color,
        distance: 150,
        opacity: 0.6,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        random: true,
        out_mode: "out",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
}

function initParticles_light() {
  if (!document.getElementById("particles-js")) return;
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--particle-light")
    .trim();
  const count = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--particle-count"
    ) || "40"
  );
  particlesJS("particles-js", {
    particles: {
      number: { value: count, density: { enable: true, value_area: 800 } },
      color: { value: color },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1 },
      },
      size: {
        value: 6,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5 },
      },
      line_linked: {
        enable: true,
        color: color,
        distance: 150,
        opacity: 0.6,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        random: true,
        out_mode: "out",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
}

// Liquid Loader
function showLoadingScreen() {
  const loader = document.createElement("div");
  loader.classList.add("liquid-loader");
  document.body.appendChild(loader);
  setTimeout(() => {
    gsap.to(loader, {
      duration: 0.5,
      scale: 0,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => loader.remove(),
    });
  }, 2000);
}



// Advanced Animations
function initAdvancedAnimations() {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero and buttons animate in once on page load
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero-title",       { duration: 1, y: 100, opacity: 0 })
    .from(".hero-subtitle",    { duration: .8, y:  50, opacity: 0 }, "-=0.5")
    .from(".hero .btn",        { duration: .6, y:  30, opacity: 0, stagger: .2, ease: "back.out(1.7)" }, "-=0.3");

  // Timeline items animate up into view once and stay
  ScrollTrigger.batch(".timeline-item", {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: .8, stagger: .1 }),
    start: "top 85%",
    once: true    // <-- play only once
  });

  // Skill bars fill once on scroll
  gsap.utils.toArray(".skill-bar-fill").forEach(bar => {
    const finalW = bar.style.width;
    gsap.fromTo(bar, { width: "0%" }, {
      width: finalW,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: bar, start: "top 80%", once: true }
    });
  });

  // Counters count up once on scroll
gsap.utils.toArray(".stat-number").forEach(num => {
   if (num.hasAttribute("data-ignore")) return;
  const raw = num.textContent.trim();
  const hasPlus = raw.includes("+");
  const hasPercent = raw.includes("%");
  const isDecimal = raw.includes(".");

  
  // Extract numeric part
  const numericValue = parseFloat(raw.replace(/[^\d.]/g, "")) || 0;

  gsap.fromTo(num, { textContent: 0 }, {
    textContent: numericValue,
    duration: 2.5,
    ease: "power2.out",
    snap: { textContent: isDecimal ? 0.01 : 1 },
    scrollTrigger: { trigger: num, start: "top 80%", once: true },
    onUpdate() {
      let current = this.targets()[0].textContent;
      let value = isDecimal ? parseFloat(current).toFixed(2) : Math.ceil(current);
      // Add comma formatting for thousands
      value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // Append symbol if needed
      num.textContent = value + (hasPercent ? "%" : hasPlus ? "+" : "");
    }
  });
});
}
// Parallax Scroll Variable for hero layers
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', window.scrollY);
});


// Tech Ticker
function initTechTicker() {
  const logos = [
    {
      name: "Java",
      svg: '<svg viewBox="0 0 24 24" fill="#f89820"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg>',
    },
    {
      name: "Python",
      svg: '<svg viewBox="0 0 24 24" fill="#3776ab"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>',
    },
    {
      name: "JavaScript",
      svg: '<svg viewBox="0 0 24 24" fill="#f7df1e"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
    },
    {
      name: "React",
      svg: '<svg viewBox="0 0 24 24" fill="#61dafb"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.405-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.99-1.36-1.56z"/></svg>',
    },
    {
      name: "Node.js",
      svg: '<svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>',
    },
    {
      name: "Spring",
      svg: '<svg viewBox="0 0 24 24" fill="#6db33f"><path d="M21.8537 1.4158a10.4504 10.4504 0 0 1-1.284 2.2471A11.9666 11.9666 0 1 0 3.8518 20.7757l.4445-.3951a19.9687 19.9687 0 0 1-1.8515-2.7708 11.965 11.965 0 0 0 18.7907-15.8196l-.007-.0135.0135-.0094-.4445.3951A11.9666 11.9666 0 0 0 20.5692 1.4158zm-9.8537 19.4518a.7699.7699 0 0 1-.7699-.7699V2.308a.7699.7699 0 0 1 1.5398 0v17.7777a.7699.7699 0 0 1-.7699.7699zm5.5435-2.334a.7699.7699 0 0 1-.6669-.3827l-8.9331-15.477a.7699.7699 0 0 1 1.3338-.7699l8.9331 15.477a.7699.7699 0 0 1-.6669 1.1526z"/></svg>',
    },
    {
      name: "MongoDB",
      svg: '<svg viewBox="0 0 24 24" fill="#47a248"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-3.032.284-6.017.51-9.5-.425.876-.946 1.643-1.464 2.406-.657 1.245-1.238 2.368-1.238 3.434 0 .558.116.895.116.895.592-2.075 1.238-4.082 1.926-5.976.688-1.894 1.418-3.676 2.152-5.304.734-1.628 1.47-3.1 2.207-4.4z"/></svg>',
    },
    {
      name: "Docker",
      svg: '<svg viewBox="0 0 24 24" fill="#2496ed"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M11.06 11.078h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H11.06a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M8.137 11.078h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186H8.137a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M5.214 11.078h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.214a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M2.291 11.078h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.291A.185.185 0 002.106 9v1.893c0 .102.082.185.185.185M13.983 7.576h2.119a.186.186 0 00.186-.186V5.503a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M11.06 7.576h2.119a.186.186 0 00.185-.186V5.503a.185.185 0 00-.185-.186H11.06a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M8.137 7.576h2.119a.185.185 0 00.185-.186V5.503a.185.185 0 00-.184-.186H8.137a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M5.214 7.576h2.119a.185.185 0 00.185-.186V5.503a.185.185 0 00-.185-.186H5.214a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M13.983 4.074h2.119a.186.186 0 00.186-.185V2.001a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M11.06 4.074h2.119a.186.186 0 00.185-.185V2.001a.185.185 0 00-.185-.186H11.06a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M24 10.204c0-.4-.325-.725-.726-.725h-2.363c-1.797-4.363-6.405-7.437-11.697-7.437C4.214 2.042 0 6.256 0 11.256S4.214 20.469 9.214 20.469c.4 0 .725-.324.725-.725s-.324-.725-.725-.725c-4.599 0-8.339-3.74-8.339-8.339s3.74-8.339 8.339-8.339c4.599 0 8.339 3.74 8.339 8.339 0 .4.325.725.726.725H23.274c.4 0 .726.324.726.725z"/></svg>',
    },
    {
      name: "Git",
      svg: '<svg viewBox="0 0 24 24" fill="#f05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.428 1.9l2.658 2.66c.645-.23 1.387-.87 1.9-.428.717.717.717 1.88 0 2.596-.717.717-1.88.717-2.596 0-.539-.539-.674-1.33-.404-1.996L12.86 8.955v6.525c.176.086.337.203.488.348.713.717.713 1.88 0 2.596-.717.717-1.88.717-2.596 0-.717-.717-.717-1.88 0-2.596.177-.177.384-.293.6-.367V8.99c-.216-.074-.423-.19-.6-.367-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>',
    },
    {
      name: "Kafka",
      svg: '<svg viewBox="0 0 24 24" fill="#231f20"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="7" r="2"/><circle cx="5" cy="7" r="2"/><circle cx="19" cy="17" r="2"/><circle cx="5" cy="17" r="2"/><path d="M12 14l-5 3-2-3.5L12 10l7 3.5L17 17l-5-3z"/></svg>',
    },
    {
      name: "Spring Boot",
      svg: '<svg viewBox="0 0 24 24" fill="#6db33f"><path d="M20.205 16.392c-2.469 3.289-7.741 2.179-11.122 2.338 0 0-.599.034-1.201.133 0 0 .228-.097.519-.198 2.374-.821 3.496-.986 4.939-1.727 2.71-1.388 5.408-4.413 5.957-7.555-1.032 3.022-4.17 5.623-7.027 6.679-1.4.515-3.99 1.002-3.99 1.002l-.109-.056c-1.646-.793-1.712-4.297.302-5.393 1.166-.632 2.324-.777 3.757-1.394 1.718-.739 3.627-2.221 4.921-3.799.815-1.22 1.302-2.52 1.397-3.897-4.65 6.778-19.624 6.834-19.624 14.618 0 5.395 7.634 9.795 17.061 6.683 3.708-1.225 6.621-4.035 6.621-7.851 0-1.062-.324-2.198-1.4-2.581z"/></svg>',
    },
    {
      name: "HTML5",
      svg: '<svg viewBox="0 0 24 24" fill="#e34f26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
    },
    {
      name: "CSS3",
      svg: '<svg viewBox="0 0 24 24" fill="#1572b6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>',
    },
    {
      name: "TypeScript",
      svg: '<svg viewBox="0 0 24 24" fill="#3178c6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>',
    },
  ];
  const track = document.querySelector(".tech-ticker-track");
  if (!track) return;
  const doubled = [...logos, ...logos];
  track.innerHTML = doubled
    .map((l) => `<div class="tech-logo" title="${l.name}">${l.svg}</div>`)
    .join("");
}

// Form Enhancements
function initForm() {
  const form = document.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Sent! ✓";
      btn.style.background = "var(--secondary)";
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = "var(--accent)";
        form.reset();
      }, 2000);
    }, 1000);
  });
}

// Navigation Highlight
function initNavObserver() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll('nav a[href^="#"]');
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle(
              "active",
              l.getAttribute("href") === `#${e.target.id}`
            )
          );
        }
      });
    },
    { threshold: 0.6 }
  );
  sections.forEach((s) => obs.observe(s));
}

async function loadMediumArticles() {
  const res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@gauravraisinghani1998"
  );
  const { items } = await res.json();
  const list = items
    .slice(0, 21)
    .map(
      (post) => `
    <div class="card">
      <h3><i class="fas fa-newspaper" style="color:var(--accent)"></i> ${
        post.title
      }</h3>
      <small>${new Date(post.pubDate).toLocaleDateString()}</small><br><br>
      <a href="${post.link}" target="_blank" class="btn">Read Article</a>
    </div>
  `
    )
    .join("");
  document.querySelector("#articles .grid").innerHTML = list;
}
document.addEventListener("DOMContentLoaded", loadMediumArticles);
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  if (splash) {
    document.body.classList.add('splash-active'); // Disable scroll

    setTimeout(() => {
      splash.style.opacity = '0';
      splash.addEventListener('transitionend', () => {
        splash.remove();
        document.body.classList.remove('splash-active'); // Re-enable scroll
      }, { once: true });
    }, 3000); // 3-second delay
  }
});

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {  // Show after scrolling 300px
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });  // Smooth scroll to top
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', initBackToTop);
// Optional: Add class on scroll for styling changes
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');  // e.g., add shadow or color change
    } else {
        nav.classList.remove('scrolled');
    }
});
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('floating');  // Add class for floating effects
    } else {
        nav.classList.remove('floating');
    }
});

// Initialize All
document.addEventListener("DOMContentLoaded", () => {
  showLoadingScreen();
  setTimeout(initParticles, 100);
//   new CustomCursor();
  setTimeout(initAdvancedAnimations, 500);
  initTechTicker();
  initForm();
  initNavObserver();
});
// Splash Transition with Scroll Disable
