import {readFile,writeFile} from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import vm from 'node:vm';

// Populate the published HTML so its content is visible before JavaScript runs.
const page=new URL('../dist/index.html',import.meta.url);
const data=JSON.parse(await readFile(new URL('../content.json',import.meta.url),'utf8'));
let html=await readFile(page,'utf8');
html=html.replace(/(<script id="portfolio-data" type="application\/json">)[\s\S]*?(<\/script>)/,(_,open,close)=>open+'\n'+JSON.stringify(data,null,2).replace(/</g,'\\u003c')+'\n'+close);
const {document,window}=parseHTML(html);
Object.defineProperty(window,'localStorage',{value:null,configurable:true});
const script=document.querySelector('#application-script').textContent;
vm.runInNewContext(script,{document,window,structuredClone,URL,Blob,setTimeout:()=>0,clearTimeout:()=>{},console});
await writeFile(page,'<!DOCTYPE html>\n'+document.documentElement.outerHTML+'\n');
console.log('Prepared static HTML with profile, education, skills, projects, achievements, videos and certificates.');
