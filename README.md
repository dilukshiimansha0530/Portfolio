# Dilukshi Imansha — personal portfolio

A responsive portfolio for K.W. Dilukshi Imansha Thilakarathne, B.Com (Hons) undergraduate in Business Technology Management at the University of Jaffna. Built with HTML, CSS and JavaScript. No backend, paid hosting or runtime package installation is required.

## Open or publish

Open `dist/index.html` in a browser, or publish the **contents of `dist`** to a static host. Keep `index.html` and `assets` together. All file URLs are relative and work under a GitHub project URL such as `https://YOUR-USERNAME.github.io/portfolio/`.

The separate **dilukshi-github-pages.zip** contains only the finished website and hosting instructions. It excludes development dependencies and Sites metadata. The website is prepared locally; no GitHub repository has been created or published in this update.

See [GITHUB-PAGES.md](GITHUB-PAGES.md) for complete upload, publishing, video and update instructions.

## Included

- Profile, GPA, eight certificates and two first-place awards.
- About, six education entries, four skill groups and contact information.
- Three academic projects with filters and case-study details; ongoing AI chatbot research.
- Three competitions and achievements.
- STING advertisement embedded from the supplied Google Drive link, with an external fallback.
- “Just a Message” with the supplied Facebook watch link; a Drive link can be added through the editor for inline playback.
- Eight original certificate images with thumbnails, detail dialogs and full-size links.
- The supplied original PDF, copied unchanged to `assets/Dilukshi-Imansha-CV.pdf`.
- Dark mode, mobile navigation, keyboard-accessible dialogs and reduced-motion support.
- Local editing of profile photo, CV, projects, certificates, education, skills, achievements and creative work.

No profile photo was supplied or found in the CV. The portrait uses **DI** initials until you upload a photo.

## Customize without coding

1. Click **Customize portfolio** in the footer.
2. Edit content and add or remove items. Upload a profile photo, certificate image, film poster or replacement CV as needed.
3. **Save changes** applies changes only in your current browser.
4. **Export website** downloads an updated `index.html`. Replace that file in GitHub and commit it. Keep the existing `assets` folder.
5. **Backup data** exports JSON, including uploaded files, for restoration on another device.

Original bundled files remain relative links in `assets`; new uploads are embedded in the exported HTML as data URLs. Other visitors can edit only their own browser copies. The editor cannot write to GitHub or change your public website.

## Developer workflow

Node.js 22 or newer is suitable. The only development dependency is `linkedom`; visitors do not download it.

```sh
npm ci
npm run build
npm test
npm start
```

Update `content.json`, then run `npm run build` to embed its data and prepare the HTML in `dist/index.html`. The delivered `dist` is already built. Content is present before JavaScript runs. `npm start` serves http://localhost:4173 and http://localhost:4173/portfolio/ for testing root and project paths.

If you edited through the browser, the exported `index.html` is ready to upload without a build. To resume editing `content.json`, use a **Backup data** export as its new contents. For a new source-content release, update `contentVersion` so old saved browser drafts cannot override it.

## Contact and video behavior

The contact form opens an email draft; it does not automatically send or store messages. Visitors review and send the draft in their mail application. Email, phone and LinkedIn links use the supplied contact details.

Videos remain on Google Drive or Facebook. Their availability and playback depend on their owners' sharing settings and the platform. The website includes external watch links as fallbacks. No new Drive upload was performed: the attachments contained the CV and eight images, not original video files. The existing STING Drive link is embedded, and the second film retains its Facebook link until a Drive link is added.

## Uploads

Images: PNG/JPG/WebP/GIF, up to 8 MB each, resized to a maximum dimension of 1400 px and stored as JPEG. Animated GIFs become still images; transparency becomes white. CV: PDF up to 2 MB. If browser storage is full or unavailable, export can still preserve the current changes.

## Verification

Automated DOM checks cover the supplied content, all nine local asset files, GitHub-relative paths, filters, editing and persistence, ongoing status, CV download, certificate previews, Drive URL validation, creative-work editing, unsafe links, unavailable storage and HTML export/reload. Real-browser layout and actual Google/Facebook playback require a browser review.
