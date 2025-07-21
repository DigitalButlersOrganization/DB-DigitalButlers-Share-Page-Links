import './style.scss';
import { SharePageCallbacks } from './interfaces';

const CLASSES = {
	UNACTIVE: 'js--unactive',
	ACTIVE: 'js--active',
};

const DEFAULT_PARAMETERS = {
	messageForShareViaEmail: 'I think it will be interesting for you to read this article',
	pageName: 'We recommend it for reading',
	on: {},
};

export class SharePageLinks {
	linkSelector: string;
	copyButtonSelector: string;
	tooltipSelector: string;
	href: string;
	arrayOfMainTagNames: string[];
	arrayOfMainTags: HTMLElement[];
	arrayOfSharePageLinks: HTMLElement[];
	arrayOfCopyButtons: HTMLElement[];
	messageForShareViaEmail: string;
	pageName: string;
	on: SharePageCallbacks = {};

	constructor(customParameters: {}) {
		const parameters = { ...DEFAULT_PARAMETERS, ...customParameters };
		this.linkSelector = 'a[data-network-name]';
		this.copyButtonSelector = '[data-copy-button]';
		this.tooltipSelector = '[data-copy-button-tooltip]';
		this.href = window.location.href;
		this.arrayOfMainTagNames = ['title', 'h1', '[role="heading"][aria-level="1"]'];
		this.arrayOfMainTags = [];
		this.arrayOfSharePageLinks = Array.from(document.querySelectorAll(this.linkSelector));
		this.arrayOfCopyButtons = Array.from(document.querySelectorAll(this.copyButtonSelector));
		this.messageForShareViaEmail = parameters.messageForShareViaEmail;
		this.pageName = parameters.pageName;
		this.on = parameters.on;
	}

	init = () => {
		this.initShareButtons();
		this.initCopyButtons();

		if (this.on.afterInit) {
			this.on.afterInit(this);
		}
	};

	initCopyButtons = () => {
		this.arrayOfCopyButtons.forEach((button) => {
			button.addEventListener('click', this.copyUrlToClipboard);
		});
	};

	copyUrlToClipboard = (event: Event) => {
		const button = event.currentTarget as HTMLElement;
		const textToCopy = button.dataset.copyValue || window.location.href;
		event.preventDefault();
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				this.showTooltip(button, 'Copied!');
				if (this.on.copy) {
					this.on.copy(this, button);
				}
			})
			.catch(() => {
				this.showTooltip(button, 'Unknown error');
			});
	};

	showTooltip = (button: HTMLElement, text: string) => {
		const tooltip = button.querySelector(this.tooltipSelector);
		if (tooltip) {
			button.classList.add(CLASSES.UNACTIVE);
			tooltip.textContent = text;
			tooltip.classList.add(CLASSES.ACTIVE);
			setTimeout(() => {
				button.classList.remove(CLASSES.UNACTIVE);
				button.addEventListener('click', this.copyUrlToClipboard);
				tooltip.classList.remove(CLASSES.ACTIVE);
			}, 1000);
		}
	};

	initShareButtons = () => {
		this.arrayOfMainTagNames.forEach((tagName) => {
			const element = document.querySelector(tagName);
			if (element) this.arrayOfMainTags.push(element as HTMLElement);
		});
		this.pageName = this.arrayOfMainTags[0].textContent || this.pageName;

		this.arrayOfSharePageLinks.forEach((link) => {
			const network = link.dataset.networkName;
			switch (network) {
				case 'whats-app': {
					(link as HTMLAnchorElement).href = `https://api.whatsapp.com/send?text=${this.href}`;
					break;
				}
				case 'facebook': {
					(link as HTMLAnchorElement).href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.href)}`;
					(link as HTMLAnchorElement).target = '_blank';
					break;
				}
				case 'twitter': {
					(link as HTMLAnchorElement).href = `http://twitter.com/share?text=${this.pageName}&url=${this.href}`;
					(link as HTMLAnchorElement).target = '_blank';
					break;
				}
				case 'x': {
					(link as HTMLAnchorElement).href = `http://twitter.com/share?text=${this.pageName}&url=${this.href}`;
					(link as HTMLAnchorElement).target = '_blank';
					break;
				}
				case 'linkedin': {
					(link as HTMLAnchorElement).href = `https://www.linkedin.com/shareArticle?mini=true&url=${this.href}&title=${this.pageName}`;
					(link as HTMLAnchorElement).target = '_blank';
					break;
				}
				case 'email': {
					(link as HTMLAnchorElement).href =
						`mailto:someone@example.com?subject=${this.pageName}&body=${this.messageForShareViaEmail}%20${this.href}`;
					(link as HTMLAnchorElement).target = '_blank';
					break;
				}
				case 'telegram': {
					(link as HTMLAnchorElement).href = `https://telegram.me/share/url?url=${this.href}&text=${this.pageName}`;
					(link as HTMLAnchorElement).target = '_blank';
					break;
				}
				default: {
					break;
				}
			}
		});
	};
}
