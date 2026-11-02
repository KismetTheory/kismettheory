
document.addEventListener('DOMContentLoaded', function() {
  // Initialize local UI state
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
      themeButton.appendChild(createIcon(iconName));
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
      themeButton.appendChild(createIcon(iconName));
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
        menuToggle.appendChild(createIcon('x'));
      } else {
        const text = document.createElement('span');
        text.className = 'menu-text';
        text.textContent = 'MENU';
        menuToggle.appendChild(text);
        
        menuToggle.appendChild(createIcon('menu'));
      }
}
    
    // Update mobile menu toggle icon
    if (mobileMenuToggle) {
      mobileMenuToggle.innerHTML = '';
      mobileMenuToggle.appendChild(createIcon(isMenuOpen ? 'x' : 'menu'));
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
  
  // The standalone preview does not process bookings, so show a local status instead.
  const bookingCalendar = document.getElementById('booking-calendar');
  if (bookingCalendar) {
    bookingCalendar.textContent = 'Online scheduling is coming soon.';
  }
});
