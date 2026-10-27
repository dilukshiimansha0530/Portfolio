# Upload and host Dilukshi's portfolio on GitHub

Upload the finished website directly from `D:\PROJECTS\dilu portfolio\portfolio\dist`. No ZIP, Node.js, database or server setup is needed.

## 1. Open the finished website folder

In Windows File Explorer, open `D:\PROJECTS\dilu portfolio\portfolio\dist`. It contains:

```text
index.html
.nojekyll
assets/
  Dilukshi-Imansha-CV.pdf
  certificates/
    digital-marketing.jpg
    agile-project-management.jpg
    cybersecurity-foundations.jpg
    foundations-project-management.jpg
    microsoft-365-copilot.jpg
    case-study-first-place.jpg
    yarl-advertising-fiesta.jpg
    introduction-ai.jpg
```

Open `index.html` to preview. Keep `assets` beside it. Videos and optional Google Fonts need an internet connection.

## 2. Create a repository

1. Sign in at [GitHub](https://github.com).
2. Click **+ → New repository**.
3. Choose a name, for example `portfolio`.
4. Select **Public**. GitHub Free supports Pages for public repositories.
5. Enable **Add README**, then click **Create repository**.

For a repository called `portfolio`, the site URL will be:

```text
https://YOUR-USERNAME.github.io/portfolio/
```

Replace `YOUR-USERNAME` with your GitHub username. This is an example URL, not a website already published by this update. To use a URL without `/portfolio/`, instead name the repository exactly `YOUR-USERNAME.github.io`.

## 3. Upload the website files

1. Open the repository and select **Add file → Upload files**.
2. Drag **index.html**, the **assets** folder and **.nojekyll** from `dist` into GitHub.
3. Preserve the `assets/certificates` subfolder and all filenames.
4. Enter a commit message, such as `Add Dilukshi portfolio`.
5. Commit directly to **main** and click **Commit changes**.

**Upload the contents of `dist`, not the enclosing `dist` or `portfolio` folder.** The repository's root should show `index.html` immediately. Do not upload `.git`, `.openai`, `node_modules` or temporary development files.

If the uploader omits `.nojekyll`, use **Add file → Create new file**, name it `.nojekyll`, enter a blank line, and commit it. This keeps Pages from processing the site with Jekyll.

## 4. Turn on GitHub Pages

1. Open the repository's **Settings**.
2. Select **Pages** in the sidebar.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Choose branch **main** and folder **/(root)**.
5. Click **Save**.
6. Wait for deployment to finish. The **Actions** tab shows progress and any errors.
7. Return to **Settings → Pages** and select **Visit site**.

GitHub says publishing changes can take up to 10 minutes. The entry file must be at the top of your selected publishing folder. References: [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 5. Check the live website

- Use the navigation and project filters.
- Download the CV and enlarge certificate images.
- Confirm your email, phone and LinkedIn links.
- Open the STING player; if it cannot play, select **Open in Google Drive**.
- Use **Watch on Facebook** for “Just a Message.”
- Check the layout on your phone and try dark mode.

## 6. Upload a film to Drive and show it in the portfolio

The STING video already uses the Drive link you supplied. “Just a Message” currently uses your Facebook watch link because no original film file or Drive link was supplied for it.

To display that film directly inside the website:

1. Open [Google Drive](https://drive.google.com).
2. Select **New → File upload** and choose your original film, preferably MP4.
3. Wait for upload and video processing to finish.
4. Right-click the video and choose **Share**.
5. Set **General access → Anyone with the link**, with role **Viewer**. Save and copy the link.
6. Open the portfolio, click **Customize portfolio** in the footer, and scroll to **Advertising & short films → Just a Message**.
7. Paste the link into **Google Drive video URL**. The website converts it to an embedded player automatically. You can keep Facebook as the **Watch URL**, or replace it with Drive too.
8. Click **Save changes**, reopen the editor and click **Export website**.
9. Upload the new `index.html` to GitHub, replacing the old file, and commit it. Keep `assets` unchanged.
10. After deployment, test from a private/incognito window to confirm visitors can access it without your account.

The editor does not upload files to Drive for you; it embeds a video already uploaded to your account. Work/school accounts may restrict public sharing. If Google limits playback, the external watch link remains available.

References: [Upload files to Drive](https://support.google.com/drive/answer/2424368?hl=en), [Share files with a link](https://support.google.com/drive/answer/7166529?hl=en).

## 7. Update your portfolio later

1. Open the website and select **Customize portfolio**.
2. Edit your details, add qualifications or projects, upload images or a replacement CV, or add new films.
3. Click **Save changes** to preview in your current browser.
4. Click **Export website** to download the updated `index.html`.
5. In GitHub, choose **Add file → Upload files**, upload the new HTML and commit to **main**.
6. Wait for Pages to publish the update.

**Save changes affects only your browser. Exporting and uploading makes the update visible to everyone.** Other visitors can edit their own browser copies but cannot change your public website or access your GitHub account.

Keep a JSON copy using **Backup data**. Restore it through the editor on another device, save it, and export the website again. New uploads are embedded in exported HTML; original bundled files continue to use `assets`.

You may also replace a PDF or certificate directly in `assets`, keeping the exact filename, and commit. GitHub Pages paths are case-sensitive.

## Troubleshooting

**404 page:** Confirm Pages uses `main` and `/(root)`, the deployment succeeded, and the root contains exactly `index.html`, not `Index.html` or an extra folder.

**Missing images or CV:** Upload the entire `assets` folder and preserve capitalization. Do not use Windows file paths or change the relative URLs to paths starting with `/assets/`.

**Drive requests access:** The owner must share the file with anyone with the link. Confirm that the file still exists and school/work restrictions allow access. Use the external Drive watch link if the player is unavailable.

**Second film opens Facebook:** This is the supplied destination. To play inline, add a Drive video URL as described above.

**Edits only appear for you:** Export and upload the new HTML, then commit and wait for deployment. If editing the developer source, change `contentVersion` in `content.json` for new content releases so older browser drafts do not override them.

**Contact form does not send immediately:** It opens an email draft. Review and send it using a configured mail application, or copy the displayed address into your email service.
