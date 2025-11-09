
// mobile menu toggle
document.addEventListener('DOMContentLoaded', function(){
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  hb && hb.addEventListener('click', function(){
    mm.classList.toggle('open');
    if(mm.classList.contains('open')) mm.style.display='flex';
    else mm.style.display='none';
  });

  // Contact form submission: tries to POST to FORM_ACTION if set, else opens mailto fallback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const FORM_ACTION = form.getAttribute('action');
      const data = new FormData(form);
      // If FORM_ACTION contains "formspree.io" and not placeholder, try fetch
      if(FORM_ACTION && FORM_ACTION.indexOf('formspree.io')!==-1 && FORM_ACTION.indexOf('your_form_id')===-1){
        fetch(FORM_ACTION, {method:'POST', body: data, headers:{'Accept':'application/json'}})
          .then(resp => {
            if(resp.ok) alert('Message sent — we will contact you soon.');
            else alert('There was a problem sending your message.');
            form.reset();
          }).catch(err=>{
            alert('Unable to send message. Please try emailing directly.');
          });
      } else {
        // mailto fallback
        const name = data.get('name')||'';
        const email = data.get('email')||'';
        const msg = data.get('message')||'';
        const subject = encodeURIComponent('Website enquiry from '+name);
        const body = encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+msg);
        window.location.href = 'mailto:omveersingharya.adv@gmail.com?subject='+subject+'&body='+body;
      }
    });
  }
});
