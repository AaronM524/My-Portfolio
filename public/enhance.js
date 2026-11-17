// Page interactions: hero letter wave, signal line, menu, nav highlight, copy email,
// plus the visual effects: reveals, scroll progress, panel spotlight, screenshot tilt, magnetic buttons.
// Loaded by next/script after React hydrates, so it never conflicts with the server HTML.
(function(){
  var d=document, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero name: one weight wave on load, then letters respond to the pointer
  var name=d.querySelector('[data-name]');
  if(name){
    var letters=[].slice.call(name.querySelectorAll('.ltr'));
    if(reduce){ name.classList.add('ready') }
    else {
      name.classList.add('waving');
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ name.classList.add('ready') }) });
      setTimeout(function(){
        name.classList.remove('waving');
        if(matchMedia('(hover: hover)').matches){
          var hero=name.closest('section'), raf=0, px=0, py=0;
          function paint(){
            raf=0;
            letters.forEach(function(l){
              var r=l.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
              var dist=Math.hypot(px-cx,(py-cy)*0.6), t=Math.max(0,1-dist/320);
              l.style.setProperty('--w',(800-560*t).toFixed(0));
              l.style.setProperty('--x',(75+25*t).toFixed(1));
            });
          }
          hero.addEventListener('pointermove',function(e){ px=e.clientX; py=e.clientY; if(!raf) raf=requestAnimationFrame(paint) });
          hero.addEventListener('pointerleave',function(){ letters.forEach(function(l){ l.style.removeProperty('--w'); l.style.removeProperty('--x') }) });
        }
      }, 1700);
    }
  }

  // ── The signal line: a price-like path down the rail, drawn by scrolling ──
  // The SVG is appended to <body> (outside React's tree) and laid over the .rail slot.
  var track=d.querySelector('[data-track]'), slot=d.querySelector('[data-rail]');
  if(track && slot){
    var NS='http://www.w3.org/2000/svg';
    function el(tag,cls){ var e=d.createElementNS(NS,tag); if(cls) e.setAttribute('class',cls); return e }
    var rail=el('svg','rail-svg'); rail.setAttribute('aria-hidden','true');
    var ghost=el('path','rail-ghost'), line=el('path','rail-line'), nodeG=el('g','rail-nodes'), head=el('circle','rail-head');
    head.setAttribute('r','6');
    rail.appendChild(ghost); rail.appendChild(line); rail.appendChild(nodeG); rail.appendChild(head);
    d.body.appendChild(rail);
    var pts=[], cum=[], total=0, nodes=[], trackTop=0;

    function docTop(e){ var y=0; while(e){ y+=e.offsetTop; e=e.offsetParent } return y }

    function rng(seed){ return function(){ seed=(seed*16807)%2147483647; return (seed-1)/2147483646 } }

    function build(){
      if(!slot.offsetWidth){ pts=[]; nodes=[]; nodeG.textContent=''; return } // hidden on phones
      var sr=slot.getBoundingClientRect(), W=sr.width, H=track.offsetHeight, r=rng(7);
      trackTop=track.getBoundingClientRect().top+scrollY;
      rail.style.top=trackTop+'px'; rail.style.left=(sr.left+scrollX)+'px';
      rail.style.width=W+'px'; rail.style.height=H+'px';
      rail.setAttribute('viewBox','0 0 '+W+' '+H);
      // Each node lines up with the first line of its section's headline ([data-anchor]).
      // offsetTop is used so reveal transforms (still mid-animation) don't shift the measurement.
      var trackDocTop=docTop(track);
      var anchors=[].slice.call(track.querySelectorAll('[data-node]')).map(function(el){
        var a=el.querySelector('[data-anchor]'), y;
        if(a){ var lh=parseFloat(getComputedStyle(a).lineHeight)||a.offsetHeight; y=docTop(a)-trackDocTop+Math.min(lh, a.offsetHeight)/2 }
        else { y=docTop(el)-trackDocTop+Math.min(56, el.offsetHeight*0.2) }
        return { y: y, el: el };
      });
      pts=[]; nodes=[]; nodeG.textContent='';
      var x=W*0.3, y=7, step=W<40?12:18, ai=0, home=W*0.3, v=0;
      pts.push([x,7]);
      while(y<H){
        y+=step;
        var nx=anchors[ai];
        if(nx && y>=nx.y){
          // breakout: spike hard to the right edge, then fall back
          pts.push([x+(W-6-x)*0.35, nx.y-step*0.6]);
          pts.push([W-5, nx.y]);
          nodes.push({x:W-5, y:nx.y, el:nx.el});
          x=W*0.42; v=-W*0.05; pts.push([x, nx.y+step*1.4]); y=nx.y+step*1.4; ai++;
          continue;
        }
        // drift up (right) into the next breakout, otherwise chop around home
        var pull=nx? Math.max(0, 1-(nx.y-y)/360) : 0;
        var target=home+(W*0.62-home)*pull;
        v = v*0.62 + (target-x)*0.06 + (r()-0.5)*W*(0.16+0.1*pull);
        x+=v;
        x=Math.max(3, Math.min(W*0.78, x));
        pts.push([x, Math.min(y,H)]);
      }
      var dstr='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('L');
      ghost.setAttribute('d',dstr); line.setAttribute('d',dstr);
      cum=[0]; total=0;
      for(var i=1;i<pts.length;i++){ total+=Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]); cum.push(total) }
      line.style.strokeDasharray=total+' '+total;
      nodes.forEach(function(n){
        var t=el('line','rail-tick');
        t.setAttribute('x1',n.x); t.setAttribute('x2',W+40); t.setAttribute('y1',n.y); t.setAttribute('y2',n.y);
        var c=el('circle','rail-node'); c.setAttribute('cx',n.x); c.setAttribute('cy',n.y); c.setAttribute('r',5);
        var g=el('circle','rail-ring'); g.setAttribute('cx',n.x); g.setAttribute('cy',n.y); g.setAttribute('r',7);
        nodeG.appendChild(t); nodeG.appendChild(c); nodeG.appendChild(g); n.c=c;
      });
      draw();
    }

    function draw(){
      if(!pts.length) return;
      var tipY = reduce ? Infinity : scrollY+innerHeight*0.6-trackTop;
      // The tip follows 60% down the viewport, which can't reach the end of the track once the
      // page runs out of scroll. Over the last screen of scrolling, ease in the missing distance
      // so the line finishes exactly at the bottom of the page.
      if(!reduce){
        var H=pts[pts.length-1][1], maxScroll=Math.max(0, d.documentElement.scrollHeight-innerHeight);
        var short=H-(maxScroll+innerHeight*0.6-trackTop);
        if(short>0){
          var t=Math.min(1, Math.max(0, (scrollY-(maxScroll-innerHeight))/innerHeight));
          tipY+=short*t*t*(3-2*t);
          if(scrollY>=maxScroll-1) tipY=Infinity;
        }
      }
      // find the segment containing tipY (y is non-decreasing along the path)
      var lo=0, hi=pts.length-1;
      if(tipY<=0){ hi=0 } else if(tipY>=pts[hi][1]){ lo=hi }
      else { while(hi-lo>1){ var m=(lo+hi)>>1; if(pts[m][1]<=tipY) lo=m; else hi=m } }
      var len, hx, hy;
      if(lo===hi){ len=cum[lo]; hx=pts[lo][0]; hy=pts[lo][1] }
      else {
        var a=pts[lo], b=pts[hi], f=(b[1]-a[1])? (tipY-a[1])/(b[1]-a[1]) : 1;
        hx=a[0]+(b[0]-a[0])*f; hy=a[1]+(b[1]-a[1])*f; len=cum[lo]+(cum[hi]-cum[lo])*f;
      }
      line.style.strokeDashoffset=(total-len);
      head.setAttribute('cx',hx); head.setAttribute('cy',hy);
      nodes.forEach(function(n){
        var hit=tipY>=n.y;
        if(hit!==n.hit){ n.hit=hit; n.c.classList.toggle('hit',hit); if(hit) n.el.classList.add('seen') }
      });
    }

    // iOS fires resize whenever the address bar shrinks or grows; only rebuild when the layout really changed
    var lastW=innerWidth, lastH=track.offsetHeight, rt;
    function rebuild(){
      clearTimeout(rt);
      rt=setTimeout(function(){
        if(innerWidth===lastW && Math.abs(track.offsetHeight-lastH)<2) return;
        lastW=innerWidth; lastH=track.offsetHeight; build();
      },150);
    }
    build();
    if(d.fonts && d.fonts.ready) d.fonts.ready.then(build);
    addEventListener('load',build);
    addEventListener('resize',rebuild);
    var ticking=false;
    addEventListener('scroll',function(){ if(!ticking){ ticking=true; requestAnimationFrame(function(){ ticking=false; draw() }) } },{passive:true});
  }

  // On small screens the chart scrolls sideways: start at the newest candles
  d.querySelectorAll('.panel-wide .panel-visual').forEach(function(v){ if(v.scrollWidth>v.clientWidth) v.scrollLeft=v.scrollWidth });

  // Mobile menu
  var mb=d.querySelector('[data-menu-toggle]'), nav=d.querySelector('[data-nav]');
  function closeMenu(){ nav.classList.remove('open'); mb&&mb.setAttribute('aria-expanded','false') }
  if(mb) mb.addEventListener('click',function(){ var o=nav.classList.toggle('open'); mb.setAttribute('aria-expanded',o?'true':'false') });
  d.querySelectorAll('.nav-links a').forEach(function(a){ a.addEventListener('click',closeMenu) });
  d.addEventListener('keydown',function(e){ if(e.key==='Escape') closeMenu() });

  // Nav background once scrolled, plus the progress line under it
  function onScroll(){
    nav.classList.toggle('scrolled', scrollY>10);
    var max=d.documentElement.scrollHeight-innerHeight;
    nav.style.setProperty('--progress', max>0 ? Math.min(1, scrollY/max).toFixed(4) : 0);
  }
  onScroll(); addEventListener('scroll',onScroll,{passive:true});

  // Project visuals animate once, when their panel comes into view
  var panels=d.querySelectorAll('[data-watch]');
  if(reduce || !('IntersectionObserver' in window)){ panels.forEach(function(p){p.classList.add('seen')}) }
  else {
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('seen'); io.unobserve(e.target) } }) },{threshold:0.25});
    panels.forEach(function(p){ io.observe(p) });
  }

  // Highlight the current section in the nav
  var links={}; d.querySelectorAll('[data-navlink]').forEach(function(a){ links[a.dataset.navlink]=a });
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){
      es.forEach(function(e){
        var a=links[e.target.id]; if(!a) return;
        if(e.isIntersecting){ for(var k in links){ links[k].classList.remove('active'); links[k].removeAttribute('aria-current') } a.classList.add('active'); a.setAttribute('aria-current','true') }
        else if(a.classList.contains('active')){ a.classList.remove('active'); a.removeAttribute('aria-current') }
      })
    },{rootMargin:'-40% 0px -55% 0px'});
    Object.keys(links).forEach(function(id){ var s=d.getElementById(id); s&&so.observe(s) });
  }

  // Copy email
  d.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var label=b.querySelector('[data-copy-label]');
      function done(t){ label.textContent=t; setTimeout(function(){ label.textContent='Copy email' },2000) }
      try{ navigator.clipboard.writeText(b.dataset.copy).then(function(){ done('Copied') },function(){ done('Select and copy above') }) }
      catch(e){ done('Select and copy above') }
    });
  });
  // ── Visual effects ──
  // Fade-up reveals for headings and paragraphs
  var reveals=d.querySelectorAll('[data-reveal]');
  if(reduce || !('IntersectionObserver' in window)){ reveals.forEach(function(r){ r.classList.add('is-in') }) }
  else {
    var ro=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); ro.unobserve(e.target) } }) },{rootMargin:'0px 0px -12% 0px', threshold:0.1});
    reveals.forEach(function(r){ ro.observe(r) });
  }

  // Pointer effects only where there's a real mouse
  if(!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches){
    // Spotlight follows the pointer across each project panel
    d.querySelectorAll('.panel').forEach(function(p){
      p.addEventListener('pointermove',function(e){
        var r=p.getBoundingClientRect();
        p.style.setProperty('--mx',(e.clientX-r.left)+'px');
        p.style.setProperty('--my',(e.clientY-r.top)+'px');
      });
    });

    // Screenshots tilt toward the pointer, with a moving glare
    d.querySelectorAll('.shot-link').forEach(function(a){
      a.addEventListener('pointermove',function(e){
        var r=a.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
        a.classList.add('tilting');
        a.style.setProperty('--ry',((x-0.5)*7).toFixed(2)+'deg');
        a.style.setProperty('--rx',((0.5-y)*5).toFixed(2)+'deg');
        a.style.setProperty('--gx',(x*100).toFixed(1)+'%');
        a.style.setProperty('--gy',(y*100).toFixed(1)+'%');
      });
      a.addEventListener('pointerleave',function(){
        a.classList.remove('tilting');
        a.style.setProperty('--rx','0deg'); a.style.setProperty('--ry','0deg');
      });
    });

    // Magnetic buttons lean toward the pointer
    d.querySelectorAll('[data-magnet], .contact-actions .btn').forEach(function(b){
      b.addEventListener('pointermove',function(e){
        var r=b.getBoundingClientRect();
        b.style.setProperty('--bx',((e.clientX-r.left-r.width/2)*0.25).toFixed(1)+'px');
        b.style.setProperty('--by',((e.clientY-r.top-r.height/2)*0.35).toFixed(1)+'px');
      });
      b.addEventListener('pointerleave',function(){ b.style.setProperty('--bx','0px'); b.style.setProperty('--by','0px') });
    });
  }
})();
