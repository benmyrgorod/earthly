const starfield = document.querySelector('.starfield');
const starCount = 90;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('span');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty('--duration', `${2.5 + Math.random() * 3}s`);
  star.style.opacity = `${0.4 + Math.random() * 0.6}`;
  star.style.transform = `scale(${0.7 + Math.random() * 1.2})`;
  starfield.appendChild(star);
}
