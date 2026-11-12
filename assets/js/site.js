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
/* Kolačići: traka za pristanak + Google Consent Mode v2 */
(function(){
  var KEY='ii_consent';
  function get(){try{var c=JSON.parse(localStorage.getItem(KEY));if(c&&Date.now()-c.t<31536000000)return c}catch(e){}return null}
  function apply(c){if(typeof gtag!=='function')return;var m=c.m?'granted':'denied';gtag('consent','update',{analytics_storage:c.a?'granted':'denied',ad_storage:m,ad_user_data:m,ad_personalization:m})}
  function save(a,m){var c={a:a?1:0,m:m?1:0,t:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}apply(c);close()}
  var box;
  function build(){
    box=document.createElement('div');box.className='ck';box.setAttribute('role','dialog');box.setAttribute('aria-label','Postavke kolačića');
    box.innerHTML='<div class="ck-in">'+
      '<p class="ck-txt"><strong>Kolačići</strong>Koristimo kolačiće za praćenje posjeta i mjerenje oglasa. Nužni kolačići su uvijek uključeni, ostale možete odbiti.</p>'+
      '<div class="ck-set" hidden>'+
        '<label><input type="checkbox" checked disabled> <span><b>Nužni</b>Pamte vaš izbor o kolačićima. Uvijek uključeni.</span></label>'+
        '<label><input type="checkbox" id="ck-a"> <span><b>Analitički</b>Google Analytics: broj posjeta i pregledane stranice.</span></label>'+
        '<label><input type="checkbox" id="ck-m"> <span><b>Marketinški</b>Google Ads: mjerenje upita koji dolaze preko oglasa.</span></label>'+
        '<p class="ck-more"><a href="/kolacici/">Više o kolačićima</a></p>'+
      '</div>'+
      '<div class="ck-btns">'+
        '<button type="button" class="btn btn-primary" data-ck="all">Prihvati sve</button>'+
        '<button type="button" class="btn btn-ghost" data-ck="nec">Samo nužni</button>'+
        '<button type="button" class="ck-link" data-ck="set">Postavke</button>'+
        '<button type="button" class="btn btn-ghost" data-ck="save" hidden>Spremi odabir</button>'+
      '</div></div>';
    document.body.appendChild(box);
    box.addEventListener('click',function(e){var b=e.target.closest('[data-ck]');if(!b)return;var k=b.getAttribute('data-ck');
      if(k==='all')save(1,1);else if(k==='nec')save(0,0);else if(k==='set')settings();else if(k==='save')save(box.querySelector('#ck-a').checked,box.querySelector('#ck-m').checked)});
  }
  function settings(){var c=get()||{a:0,m:0};box.querySelector('.ck-set').hidden=false;box.querySelector('[data-ck=set]').hidden=true;box.querySelector('[data-ck=save]').hidden=false;box.querySelector('#ck-a').checked=!!c.a;box.querySelector('#ck-m').checked=!!c.m}
  function open(withSettings){if(!box)build();box.hidden=false;if(withSettings)settings()}
  function close(){if(box)box.hidden=true}
  document.addEventListener('click',function(e){var a=e.target.closest('[data-ck-open]');if(a){e.preventDefault();open(true)}});
  if(!get())open(false);
})();
