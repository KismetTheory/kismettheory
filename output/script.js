
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Get DOM elements
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const themeButton = document.getElementById('theme-button');
  const navMenu = document.getElementById('navigation-menu');
  const mainContent = document.getElementById('main-content');
  const panels = document.querySelectorAll('.panel');
  const defaultBackground = document.getElementById('default-background');
  const hoverBackground = document.getElementById('hover-background');
  
  // Theme toggle functionality
  let isDarkTheme = true;
  
  const toggleTheme = () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark', isDarkTheme);
    
    // Update theme icon
    if (themeButton) {
      themeButton.innerHTML = '';
      const iconName = isDarkTheme ? 'sun' : 'moon';
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', iconName);
      themeButton.appendChild(icon);
      lucide.createIcons();
    }
    
    // Store theme preference
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  };
  
  // Check for stored theme preference
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    isDarkTheme = storedTheme === 'dark';
    document.body.classList.toggle('dark', isDarkTheme);
    if (themeButton) {
      themeButton.innerHTML = '';
      const iconName = isDarkTheme ? 'sun' : 'moon';
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', iconName);
      themeButton.appendChild(icon);
      lucide.createIcons();
    }
  }
  
  // Menu toggle functionality
  let isMenuOpen = false;
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('open', isMenuOpen);
    mainContent.classList.toggle('menu-open', isMenuOpen);
    
    // Update menu toggle icon
    if (menuToggle) {
      menuToggle.innerHTML = '';
      if (isMenuOpen) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'x');
        menuToggle.appendChild(icon);
      } else {
        const text = document.createElement('span');
        text.className = 'menu-text';
        text.textContent = 'MENU';
        menuToggle.appendChild(text);
        
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'menu');
        menuToggle.appendChild(icon);
      }
      lucide.createIcons();
    }
    
    // Update mobile menu toggle icon
    if (mobileMenuToggle) {
      mobileMenuToggle.innerHTML = '';
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
      mobileMenuToggle.appendChild(icon);
      lucide.createIcons();
    }
  };
  
  // Event listeners for menu toggles
  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMenu);
  if (themeButton) themeButton.addEventListener('click', toggleTheme);
  
  // Background change on panel hover
  if (panels.length > 0 && hoverBackground) {
    panels.forEach(panel => {
      const imageUrl = panel.getAttribute('data-image');
      
      panel.addEventListener('mouseenter', () => {
        hoverBackground.style.backgroundImage = `url('${imageUrl}')`;
        hoverBackground.style.opacity = '1';
      });
      
      panel.addEventListener('mouseleave', () => {
        hoverBackground.style.opacity = '0';
      });
    });
  }
  
  // Initialize calendar for booking if available
  const bookingCalendar = document.getElementById('booking-calendar');
  if (bookingCalendar && typeof Datepicker !== 'undefined') {
    new Datepicker(bookingCalendar, {
      minDate: new Date(),
      format: 'mm/dd/yyyy'
    });
  }
});
