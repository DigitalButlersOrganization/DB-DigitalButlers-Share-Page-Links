var s = Object.defineProperty;
var i = (r, e, a) => e in r ? s(r, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : r[e] = a;
var t = (r, e, a) => (i(r, typeof e != "symbol" ? e + "" : e, a), a);
const h = {
  messageForShareViaEmail: "I think it will be interesting for you to read this article",
  pageName: "We recommend it for reading",
  on: {}
};
class m {
  constructor(e) {
    t(this, "linkSelector");
    t(this, "href");
    t(this, "arrayOfMainTagNames");
    t(this, "arrayOfMainTags");
    t(this, "arrayOfSharePageLinks");
    t(this, "messageForShareViaEmail");
    t(this, "pageName");
    t(this, "on", {});
    t(this, "init", () => {
      this.arrayOfMainTagNames.forEach((e) => {
        const a = document.querySelector(e);
        a && this.arrayOfMainTags.push(a);
      }), this.pageName = this.arrayOfMainTags[0].textContent || this.pageName, this.arrayOfSharePageLinks.forEach((e) => {
        switch (e.dataset.networkName) {
          case "whats-app": {
            e.href = `https://api.whatsapp.com/send?text=${this.href}`;
            break;
          }
          case "facebook": {
            e.href = `https://www.facebook.com/sharer.php?s=100&u=${this.href}&p[title]=${this.pageName}&p[summary]=${this.pageName}`, e.target = "_blank";
            break;
          }
          case "twitter": {
            e.href = `http://twitter.com/share?text=${this.pageName}&url=${this.href}`, e.target = "_blank";
            break;
          }
          case "linkedin": {
            e.href = `https://www.linkedin.com/shareArticle?mini=true&url=${this.href}&title=${this.pageName}`, e.target = "_blank";
            break;
          }
          case "email": {
            e.href = `mailto:someone@example.com?subject=${this.pageName}&body=${this.messageForShareViaEmail}%20${this.href}`, e.target = "_blank";
            break;
          }
          case "telegram": {
            e.href = `https://telegram.me/share/url?url=${this.href}&text=${this.pageName}`, e.target = "_blank";
            break;
          }
        }
      }), this.on.afterInit && this.on.afterInit(this);
    });
    const a = { ...h, ...e };
    this.linkSelector = "a[data-network-name]", this.href = window.location.href, this.arrayOfMainTagNames = ["title", "h1", '[role="heading"][aria-level="1"]'], this.arrayOfMainTags = [], this.arrayOfSharePageLinks = Array.from(document.querySelectorAll(this.linkSelector)), this.messageForShareViaEmail = a.messageForShareViaEmail, this.pageName = a.pageName, this.on = a.on;
  }
}
export {
  m as SharePageLinks
};
