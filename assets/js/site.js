(function(){
  var btn=document.getElementById('menuBtn'),nav=document.getElementById('nav');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}});

  var form=document.getElementById('waForm'),link=document.getElementById('waLink'),mail=document.getElementById('mailLink');
  if(!form){track();return;}
  function v(id){var el=document.getElementById(id);return el?el.value.trim():''}
  function build(){
    var need=[].slice.call(form.querySelectorAll('.chips input:checked')).map(function(c){return c.value});
    var lines=['Pozdrav, šaljem upit preko web stranice.',''];
    if(v('f-firma'))lines.push('Firma: '+v('f-firma'));
    if(v('f-mjesto'))lines.push('Mjesto: '+v('f-mjesto'));
    if(v('f-djel'))lines.push('Djelatnost: '+v('f-djel'));
    if(v('f-radnici'))lines.push('Broj radnih mjesta: '+v('f-radnici'));
    if(v('f-email'))lines.push('E-mail: '+v('f-email'));
    if(need.length)lines.push('Treba mi: '+need.join(', '));
    if(v('f-poruka')){lines.push('');lines.push(v('f-poruka'))}
    link.href='https://wa.me/385994089624?text='+encodeURIComponent(lines.join('\n'));
    if(mail){var subj='Upit s web stranice'+(v('f-firma')?' – '+v('f-firma'):'');mail.href='mailto:info@istrainspekt.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join('\n'));}
  }
  form.addEventListener('input',build);form.addEventListener('change',build);
  form.addEventListener('submit',function(e){e.preventDefault()});
  build();

  track();
  function track(){/* GTM događaji za Ads konverzije: klik na telefon, mail i WhatsApp */
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-track]');if(!a)return;
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:'kontakt_klik',kanal:a.getAttribute('data-track')});
  });}
})();