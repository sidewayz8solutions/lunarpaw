const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const walletBtn = document.getElementById('walletBtn');
const walletModal = document.getElementById('walletModal');
const closeWalletModal = document.getElementById('closeWalletModal');
const copyBtn = document.getElementById('copyBtn');
const contractAddress = document.getElementById('contractAddress');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

if (walletBtn && walletModal) {
  walletBtn.addEventListener('click', () => {
    walletModal.classList.remove('hidden');
    walletModal.classList.add('flex');
  });
}

if (closeWalletModal && walletModal) {
  closeWalletModal.addEventListener('click', () => {
    walletModal.classList.add('hidden');
    walletModal.classList.remove('flex');
  });
}

if (walletModal) {
  walletModal.addEventListener('click', (e) => {
    if (e.target === walletModal) {
      walletModal.classList.add('hidden');
      walletModal.classList.remove('flex');
    }
  });
}

if (copyBtn && contractAddress) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(contractAddress.textContent.trim());
      copyBtn.classList.add('bg-lunar-purple/30');
      copyBtn.setAttribute('title', 'Copied!');
      setTimeout(() => {
        copyBtn.classList.remove('bg-lunar-purple/30');
        copyBtn.setAttribute('title', 'Copy Address');
      }, 1500);
    } catch (err) {
      alert('Copy failed.');
    }
  });
}

const counters = document.querySelectorAll('.counter');
const animateCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const duration = 1500;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });
});

if (counters.length) {
  observer.observe(counters[0]);
}

const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const highlightNav = () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section, idx) => {
    const link = navLinks[idx];
    if (!section || !link) return;
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);
