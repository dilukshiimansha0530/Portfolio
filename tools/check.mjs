import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,stat} from 'node:fs/promises';
import {parseHTML} from 'linkedom';

const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
const source=html.match(/<script id="application-script">([\s\S]*?)<\/script>/)[1];
new vm.Script(source);
const fixture=JSON.parse(html.match(/<script id="portfolio-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
let passed=0;
const KEY='dilukshi-portfolio-2026-10-27-v1';
const check=(name,fn)=>{fn();console.log('PASS '+name);passed++;};
function setup({storage='normal',saved=null,content=html}={}){
  const {window,document}=parseHTML(content);
  const values=new Map(saved?[[KEY,JSON.stringify(saved)]]:[]);
  const downloads=[],opened=[],queue=[];
  if(!Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'checked'))Object.defineProperty(window.HTMLInputElement.prototype,'checked',{get(){return this.hasAttribute('checked');},set(v){if(v)this.setAttribute('checked','');else this.removeAttribute('checked');},configurable:true});
  for(const dialog of document.querySelectorAll('dialog')){
    dialog.showModal=()=>dialog.setAttribute('open','');
    dialog.close=()=>{dialog.removeAttribute('open');dialog.dispatchEvent(new window.Event('close'));};
  }
  const storageObject=storage==='null'?null:{getItem:key=>{if(storage==='throw-read')throw Error('Denied');return values.get(key)??null;},setItem:(key,val)=>{if(storage==='full')throw Error('Quota exceeded');values.set(key,val);}};
  Object.defineProperty(window,'localStorage',{value:storageObject,configurable:true});
  window.open=(...args)=>opened.push(args);
  window.location={href:'http://localhost/'};
  document.querySelector('#editor-form').reportValidity=()=>true;
  for(const node of document.querySelectorAll('*'))node.focus=()=>{};
  const nativeCreate=document.createElement.bind(document);
  document.createElement=name=>{const el=nativeCreate(name);if(name==='a')el.click=()=>downloads.push({name:el.download,href:el.href});return el;};
  const mockURL=class extends URL{};
  const blobs=new Map();
  mockURL.createObjectURL=blob=>{const key='blob:test-'+blobs.size;blobs.set(key,blob);return key;};
  mockURL.revokeObjectURL=()=>{};
  const context={window,document,structuredClone,URL:mockURL,Blob,console,setTimeout:fn=>{queue.push(fn);return queue.length;},clearTimeout:()=>{},FormData:class{constructor(){this.map={name:'Test visitor',email:'visitor@example.com',subject:'A project & an idea',message:'Hello from the contact form.'};}get(key){return this.map[key];}}};
  vm.runInNewContext(source,context);
  const click=selector=>{const el=document.querySelector(selector);assert.ok(el,'Missing '+selector);el.dispatchEvent(new window.Event('click',{bubbles:true}));};
  const submit=selector=>{document.querySelector(selector).dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));if(selector==='#editor-form'&&!values.has(KEY)&&storage==='normal')throw Error(document.querySelector('#toast').textContent);};
  const input=(path,value)=>{const el=document.querySelector(`[data-path="${path}"]`);assert.ok(el,'Missing field '+path);if(el.type==='checkbox')el.checked=value;else el.value=value;};
  return {document,window,values,downloads,blobs,opened,click,submit,input};
}
check('Document has unique IDs and every section link has a target',()=>{
 const {document}=parseHTML(html);const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length);
 for(const a of document.querySelectorAll('a[href^="#"]'))assert.ok(document.getElementById(a.getAttribute('href').slice(1)));
 assert.equal(document.querySelector('html').lang,'en');assert.ok(html.includes('prefers-reduced-motion'));assert.ok(html.includes('@media(max-width:580px)'));
});
check('Real profile, all eight certificates and ongoing research render without invented percentages',()=>{
 const t=setup();assert.equal(t.document.querySelectorAll('.project-card').length,3);assert.equal(t.document.querySelectorAll('.cert-card').length,8);assert.equal(t.document.querySelector('[role=progressbar]'),null);assert.equal(t.document.querySelector('.example-label'),null);assert.match(t.document.querySelector('#hero-stats').textContent,/3.56\/4Current GPA8Certificates21st Place Awards/);assert.equal(t.document.querySelector('#year').textContent,String(new Date().getFullYear()));assert.equal(t.document.querySelector('#template-notice').hidden,true);
});
check('Project filters update visible cards and pressed state',()=>{
 const t=setup();t.click('[data-filter="Group Research"]');assert.equal(t.document.querySelectorAll('.project-card').length,1);assert.equal(t.document.querySelector('.project-card h3').textContent,'Cyber Security Awareness');assert.equal(t.document.querySelector('[data-filter="Group Research"]').getAttribute('aria-pressed'),'true');
});
check('Project and certificate dialogs show their content',()=>{
 const t=setup();t.click('[data-project="0"]');assert.ok(t.document.querySelector('#detail-dialog').hasAttribute('open'));assert.match(t.document.querySelector('#detail-content').textContent,/Sri Lanka/);t.click('[data-close="detail-dialog"]');assert.ok(!t.document.querySelector('#detail-dialog').hasAttribute('open'));t.click('[data-certificate="0"]');assert.match(t.document.querySelector('.certificate-image').getAttribute('src'),/digital-marketing.jpg/);assert.match(t.document.querySelector('#detail-content').textContent,/Open full-size certificate/);
});
check('Theme and mobile navigation controls toggle correctly',()=>{
 const t=setup();t.click('#theme-toggle');assert.equal(t.document.documentElement.dataset.theme,'dark');assert.equal(t.values.get(KEY+'-theme'),'dark');t.click('#menu-toggle');assert.equal(t.document.querySelector('#menu-toggle').getAttribute('aria-expanded'),'true');t.click('#navigation a');assert.equal(t.document.querySelector('#menu-toggle').getAttribute('aria-expanded'),'false');
});
check('Saving edited content persists and renders safely',()=>{
 const t=setup();t.click('[data-edit]');t.input('name','Dilu <script>alert(1)</script>');t.input('email','dilu@example.com');t.submit('#editor-form');assert.equal(JSON.parse(t.values.get(KEY)).name,'Dilu <script>alert(1)</script>');assert.equal(t.document.querySelector('#portrait-name').textContent,'Dilu <script>alert(1)</script>');assert.equal(t.document.querySelector('#portrait-name script'),null);
});
check('Missing, disabled, and full storage do not break rendering or export',()=>{
 for(const storage of ['null','throw-read','full']){const t=setup({storage});assert.equal(t.document.querySelectorAll('.project-card').length,3);t.click('[data-edit]');t.input('name','Edited');t.submit('#editor-form');assert.equal(t.document.querySelector('#portrait-name').textContent,'Edited');t.click('[data-edit]');t.click('#export-site');assert.equal(t.downloads[0].name,'index.html');}
});
check('Invalid saved data falls back to a working starter',()=>{
 const t=setup({saved:{...fixture,projects:[{title:'Broken',tags:'not an array'}]}});assert.equal(t.document.querySelectorAll('.project-card').length,3);
});
check('Imported link schemes cannot execute scripts',()=>{
 const bad=structuredClone(fixture);bad.github='javascript:alert(1)';bad.projects[0].live='javascript:alert(2)';bad.projects[0].image='data:image/svg+xml,<svg onload="alert(3)"></svg>';const t=setup({saved:bad});t.click('[data-project="0"]');assert.equal(t.document.querySelectorAll('a[href^="javascript:"]').length,0);assert.equal(t.document.querySelectorAll('img[src^="data:image/svg"]').length,0);
});
check('Empty project and certificate collections have useful states',()=>{
 const t=setup({saved:{...fixture,projects:[],certificates:[]}});assert.match(t.document.querySelector('#project-grid').textContent,/No projects/);assert.match(t.document.querySelector('#ongoing-projects').textContent,/next big idea/);assert.match(t.document.querySelector('#certificate-grid').textContent,/Add certifications/);
});
check('Contact opens an encoded email draft and does not claim delivery',()=>{
 const t=setup({saved:{...fixture,email:'dilu@example.com'}});t.submit('#contact-form');assert.match(t.window.location.href,/^mailto:dilu%40example.com\?subject=A%20project%20%26%20an%20idea/);assert.match(t.document.querySelector('#contact-note').textContent,/Review and send/);
 const missing=setup({saved:{...fixture,email:''}});missing.submit('#contact-form');assert.equal(missing.window.location.href,'http://localhost/');assert.match(missing.document.querySelector('#toast').textContent,/Add your contact email/);
});
check('Export downloads a single HTML document and keeps editor data out of the UI',()=>{
 const t=setup();t.click('[data-edit]');t.input('name','My exported name');t.click('#export-site');assert.equal(t.downloads.length,1);assert.equal(t.downloads[0].name,'index.html');assert.equal(t.blobs.size,1);
});
const exported=setup();exported.click('[data-edit]');exported.input('name','Exported </script><script>alert(1)</script>');exported.click('#export-site');
const exportHTML=await [...exported.blobs.values()][0].text();
check('Exported website reloads independently with edited content and escaped script data',()=>{
 const {document}=parseHTML(exportHTML);const state=JSON.parse(document.querySelector('#portfolio-data').textContent);assert.equal(state.name,'Exported </script><script>alert(1)</script>');assert.equal(document.querySelector('#editor-fields').innerHTML,'');assert.equal(document.querySelectorAll('dialog[open]').length,0);const t=setup({content:exportHTML});assert.equal(t.document.querySelector('#hello-name').textContent,state.name);
});
check('All education, skill groups, achievements and creative projects are populated',()=>{
 const t=setup();assert.equal(t.document.querySelectorAll('.education-card').length,6);assert.equal(t.document.querySelectorAll('.skill-card').length,4);assert.equal(t.document.querySelectorAll('.achievement').length,3);assert.equal(t.document.querySelectorAll('.creative-card').length,2);assert.match(t.document.querySelector('#about-facts').textContent,/Sinhala · English/);assert.match(t.document.querySelector('#contact-info').textContent,/dilukshiimansha0530@gmail.com/);
});
check('Editor preserves ongoing status and unknown research completion on save',()=>{
 const t=setup();t.click('[data-edit]');assert.equal(t.document.querySelector('[data-path="projects.0.status"]').value,'In progress');t.submit('#editor-form');const value=JSON.parse(t.values.get(KEY));assert.equal(value.projects[0].status,'In progress');assert.equal(value.projects[0].progress,null);assert.equal(value.projects[0].example,false);assert.equal(value.isTemplate,false);
});
check('Drive embeds are restricted to Drive and Facebook retains a watch link',()=>{
 const t=setup();assert.equal(t.document.querySelector('#creative iframe').getAttribute('src'),'https://drive.google.com/file/d/1CyUK_6E7Q5TSAAIv93bAKxiSdeKp7rUc/preview');assert.ok(t.document.querySelector('a[href="https://www.facebook.com/share/v/1CQAVAsyhv/"]'));
 const bad=structuredClone(fixture);bad.creative[0].drive='https://evil.example/file/d/1CyUK_6E7Q5TSAAIv93bAKxiSdeKp7rUc/preview';assert.equal(setup({saved:bad}).document.querySelectorAll('#creative iframe').length,0);
 const share=structuredClone(fixture);share.creative[1].drive='https://drive.google.com/open?id=1CyUK_6E7Q5TSAAIv93bAKxiSdeKp7rUc';assert.equal(setup({saved:share}).document.querySelectorAll('#creative iframe').length,2);
});
check('CV downloads the bundled PDF with the correct file name',()=>{
 const t=setup();t.click('#resume-button');assert.equal(t.downloads[0].name,'Dilukshi-Imansha-CV.pdf');assert.equal(t.downloads[0].href,'assets/Dilukshi-Imansha-CV.pdf');
});
check('Adding, editing and removing a creative project works',()=>{
 const t=setup();t.click('[data-edit]');t.click('[data-add="creative"]');t.input('creative.2.title','New short film');t.input('creative.2.drive','https://drive.google.com/file/d/1CyUK_6E7Q5TSAAIv93bAKxiSdeKp7rUc/view');t.submit('#editor-form');assert.equal(t.document.querySelectorAll('.creative-card').length,3);t.click('[data-edit]');t.click('[data-remove="creative.2"]');t.submit('#editor-form');assert.equal(t.document.querySelectorAll('.creative-card').length,2);
});
for(const asset of [fixture.resume,...fixture.certificates.map(c=>c.image)]){
 assert.ok(asset.startsWith('assets/')&&!asset.includes('..'));const file=new URL('../dist/'+asset,import.meta.url);assert.ok((await stat(file)).size>0);
 const resolved=new URL(asset,'https://example.github.io/portfolio/');assert.ok(resolved.pathname.startsWith('/portfolio/assets/'));
}
passed++;console.log('PASS All eight certificate files and the original PDF exist and resolve under a GitHub project path');
console.log(`\n${passed} checks passed. These are DOM-level checks; real-browser layout and video playback are not covered.`);
