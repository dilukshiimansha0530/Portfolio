import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const mime={'.html':'text/html; charset=utf-8','.pdf':'application/pdf','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.json':'application/json'};
const server = http.createServer(async(req,res)=>{
  try {
    let urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Also exercise deployment under a GitHub project repository path.
    if(urlPath.startsWith('/portfolio/'))urlPath=urlPath.slice('/portfolio'.length);
    if(urlPath==='/')urlPath='/index.html';
    const file=path.resolve(root,'.'+urlPath);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
    const body=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://localhost:4173'));
