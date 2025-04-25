var i = Object.defineProperty;
var h = (r, t, e) => t in r ? i(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => (h(r, typeof t != "symbol" ? t + "" : t, e), e);
const s = {
  UNACTIVE: "js--unactive",
  ACTIVE: "js--active"
}, n = {
  messageForShareViaEmail: "I think it will be interesting for you to read this article",
  pageName: "We recommend it for reading",
  on: {}
};
class l {
  constructor(t) {
    a(this, "linkSelector");
    a(this, "copyButtonSelector");
    a(this, "tooltipSelector");
    a(this, "href");
    a(this, "arrayOfMainTagNames");
    a(this, "arrayOfMainTags");
    a(this, "arrayOfSharePageLinks");
    a(this, "arrayOfCopyButtons");
    a(this, "messageForShareViaEmail");
    a(this, "pageName");
    a(this, "on", {});
    a(this, "init", () => {
      this.initShareButtons(), this.initCopyButtons(), this.on.afterInit && this.on.afterInit(this);
    });
    a(this, "initCopyButtons", () => {
      this.arrayOfCopyButtons.forEach((t) => {
        t.addEventListener("click", this.copyUrlToClipboard);
      });
    });
    a(this, "copyUrlToClipboard", (t) => {
      const e = t.currentTarget, o = e.dataset.copyValue || window.location.href;
      t.preventDefault(), navigator.clipboard.writeText(o).then(() => {
        this.showTooltip(e, "Copied!");
      }).catch(() => {
        this.showTooltip(e, "Unknown error");
      });
    });
    a(this, "showTooltip", (t, e) => {
      const o = t.querySelector(this.tooltipSelector);
      o && (t.classList.add(s.UNACTIVE), o.textContent = e, o.classList.add(s.ACTIVE), setTimeout(() => {
        t.classList.remove(s.UNACTIVE), t.addEventListener("click", this.copyUrlToClipboard), o.classList.remove(s.ACTIVE);
      }, 1e3));
    });
    a(this, "initShareButtons", () => {
      this.arrayOfMainTagNames.forEach((t) => {
        const e = document.querySelector(t);
        e && this.arrayOfMainTags.push(e);
      }), this.pageName = this.arrayOfMainTags[0].textContent || this.pageName, this.arrayOfSharePageLinks.forEach((t) => {
        switch (t.dataset.networkName) {
          case "whats-app": {
            t.href = `https://api.whatsapp.com/send?text=${this.href}`;
            break;
          }
          case "facebook": {
            t.href = `https://www.facebook.com/sharer.php?s=100&u=${this.href}&p[title]=${this.pageName}&p[summary]=${this.pageName}`, t.target = "_blank";
            break;
          }
          case "twitter": {
            t.href = `http://twitter.com/share?text=${this.pageName}&url=${this.href}`, t.target = "_blank";
            break;
          }
          case "linkedin": {
            t.href = `https://www.linkedin.com/shareArticle?mini=true&url=${this.href}&title=${this.pageName}`, t.target = "_blank";
            break;
          }
          case "email": {
            t.href = `mailto:someone@example.com?subject=${this.pageName}&body=${this.messageForShareViaEmail}%20${this.href}`, t.target = "_blank";
            break;
          }
          case "telegram": {
            t.href = `https://telegram.me/share/url?url=${this.href}&text=${this.pageName}`, t.target = "_blank";
            break;
          }
        }
      });
    });
    const e = { ...n, ...t };
    this.linkSelector = "a[data-network-name]", this.copyButtonSelector = "[data-copy-button]", this.tooltipSelector = "[data-copy-button-tooltip]", this.href = window.location.href, this.arrayOfMainTagNames = ["title", "h1", '[role="heading"][aria-level="1"]'], this.arrayOfMainTags = [], this.arrayOfSharePageLinks = Array.from(document.querySelectorAll(this.linkSelector)), this.arrayOfCopyButtons = Array.from(document.querySelectorAll(this.copyButtonSelector)), this.messageForShareViaEmail = e.messageForShareViaEmail, this.pageName = e.pageName, this.on = e.on;
  }
}
export {
  l as SharePageLinks
};
