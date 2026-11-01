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

// Days to go, on the schedule page
const countdown = document.getElementById('countdown');
if (countdown) {
  const days = Math.ceil((new Date('2027-02-20T00:00:00+05:30') - new Date()) / 86400000);
  if (days > 0) {
    countdown.textContent = document.documentElement.lang === 'hi' ? days + ' दिन बाकी' : days + (days === 1 ? ' day to go' : ' days to go');
  }
}
