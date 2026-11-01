// Apple / Outlook calendar file for the wedding weekend
const icsBtn = document.getElementById('ics-btn');
if (icsBtn) {
  icsBtn.addEventListener('click', function () {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      'DTSTART;VALUE=DATE:20270220',
      'DTEND;VALUE=DATE:20270222',
      'SUMMARY:Daksha & Mukul\'s Wedding',
      'DESCRIPTION:Sachdeva & Dixit families invite you to the wedding. Schedule at dakmuk.in',
      'LOCATION:Amar Mahal\\, Orchha\\, Madhya Pradesh',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'daksha-mukul-wedding.ics';
    a.click();
  });
}

// Tap the couple → hearts float up
const couple = document.getElementById('couple');
if (couple) {
  const heartChars = ['🧡', '🤍', '💛'];
  couple.addEventListener('click', function (e) {
    const rect = couple.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 3; i++) {
      const h = document.createElement('span');
      h.className = 'heart';
      h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      h.style.left = (x - 10 + (i - 1) * 22) + 'px';
      h.style.top = (y - 10 - i * 6) + 'px';
      h.style.animationDelay = (i * 0.1) + 's';
      couple.appendChild(h);
      setTimeout(() => h.remove(), 1500 + i * 100);
    }
  });
}
