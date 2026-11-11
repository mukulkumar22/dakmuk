// Apple / Outlook calendar file for the wedding weekend
const icsBtn = document.getElementById('ics-btn');
if (icsBtn) {
  icsBtn.addEventListener('click', function () {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      'DTSTART;VALUE=DATE:20270220',
      'DTEND;VALUE=DATE:20270222',
      'SUMMARY:' + (document.documentElement.lang === 'hi' ? 'Mukul & Daksha' : 'Daksha & Mukul') + '\'s Wedding',
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

// Invite: the two names take turns to lead. Every few seconds they trade places,
// circling the "&" clockwise the way the couple circles the fire in the pheras.
// Tapping the names trades them straight away.
const turns = document.querySelector('.names[data-turns]');
if (turns && turns.animate) {
  const amp = turns.querySelector('.amp');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let busy = false;
  const trade = function () {
    if (busy || document.hidden || turns.getBoundingClientRect().bottom < 0) return;
    const pair = turns.querySelectorAll('.nm');
    const a = pair[0], b = pair[1];
    const from = [a.getBoundingClientRect(), b.getBoundingClientRect()];
    const afterA = a.nextSibling;
    turns.insertBefore(a, b.nextSibling);
    turns.insertBefore(b, afterA);
    const to = [a.getBoundingClientRect(), b.getBoundingClientRect()];
    busy = true;
    const ms = calm ? 700 : 1800;
    [a, b].forEach(function (el, i) {
      if (calm) { el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: 'ease-out' }); return; }
      // Start where the name used to be and travel to its new place along a clockwise arc
      const sx = from[i].left - to[i].left, sy = from[i].top - to[i].top;
      const dist = Math.hypot(sx, sy) || 1;
      const lift = Math.min(dist * 0.32, 44) * 2;
      const cx = sx / 2 + (-sy / dist) * lift, cy = sy / 2 + (sx / dist) * lift;
      const depth = i === 0 ? 0.07 : -0.09;
      const frames = [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1].map(function (t) {
        const u = 1 - t, swell = Math.sin(Math.PI * t);
        return {
          offset: t,
          transform: 'translate(' + (u * u * sx + 2 * u * t * cx).toFixed(1) + 'px,' + (u * u * sy + 2 * u * t * cy).toFixed(1) + 'px) scale(' + (1 + depth * swell).toFixed(3) + ')',
          opacity: i === 0 ? 1 : 1 - 0.3 * swell
        };
      });
      el.animate(frames, { duration: ms, easing: 'cubic-bezier(.5,0,.2,1)' });
    });
    if (amp && !calm) {
      amp.animate([
        { transform: 'scale(1)', textShadow: '0 0 0 rgba(255,205,150,0)' },
        { transform: 'scale(1.2)', textShadow: '0 0 22px rgba(255,205,150,.95)' },
        { transform: 'scale(1)', textShadow: '0 0 0 rgba(255,205,150,0)' }
      ], { duration: ms, easing: 'ease-in-out' });
    }
    setTimeout(function () { busy = false; }, ms + 60);
  };
  setTimeout(function () { trade(); setInterval(trade, 6500); }, 2600);
  turns.addEventListener('click', trade);
}
