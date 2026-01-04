
// scroll function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// download buttons
document.querySelectorAll('.app-card .btn').forEach(button => {
  button.addEventListener('click', function() {
    const appName = this.closest('.app-card').querySelector('h3').textContent;
    alert(`Downloading ${appName}... (This is a demo - in a real app, this would start the download)`);
  });
});

// Logo hover
const logo3d = document.querySelector('.logo-3d');
const logoContainer = document.querySelector('.logo-container');

if (logoContainer) {
  logoContainer.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = logoContainer.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    logo3d.style.transform = `translateY(-20px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  });
  
  logoContainer.addEventListener('mouseleave', () => {
    logo3d.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
    logo3d.style.animation = 'float 6s ease-in-out infinite';
  });
}

// Copy email functionality
document.getElementById('copyEmailBtn').addEventListener('click', function() {
  const email = 'applabvlogs@gmail.com';
  const button = this;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(function() {
      showCopySuccess(button);
    }).catch(function(err) {
      console.error('Clipboard API failed: ', err);
      fallbackCopyToClipboard(email, button);
    });
  } else {
    fallbackCopyToClipboard(email, button);
  }
});

function fallbackCopyToClipboard(text, button) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess(button);
    } else {
      showCopyError(button, text);
    }
  } catch (err) {
    showCopyError(button, text);
  }
  
  document.body.removeChild(textArea);
}

function showCopySuccess(button) {
  const originalHTML = button.innerHTML;
  const originalBackground = button.style.background;
  
  button.innerHTML = '<i class="fas fa-check"></i> Copied!';
  button.style.background = '#10B981';
  
  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.style.background = originalBackground;
  }, 2000);
}

function showCopyError(button, email) {
  const originalHTML = button.innerHTML;
  const originalBackground = button.style.background;
  
  button.innerHTML = '<i class="fas fa-exclamation"></i> Click to copy';
  button.style.background = '#EF4444'; 
  
  button.onclick = function() {
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showCopySuccess(button);
    
    setTimeout(() => {
      button.onclick = function() {
        const email = 'applabvlogs@gmail.com';
        const button = this;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function() {
            showCopySuccess(button);
          }).catch(function(err) {
            console.error('Clipboard API failed: ', err);
            fallbackCopyToClipboard(email, button);
          });
        } else {
          fallbackCopyToClipboard(email, button);
        }
      };
    }, 100);
  };
  
  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.style.background = originalBackground;
  }, 3000);
}
