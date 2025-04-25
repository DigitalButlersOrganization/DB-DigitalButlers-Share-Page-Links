import './style.scss';
import { SharePageCallbacks } from './interfaces';
export declare class SharePageLinks {
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
    on: SharePageCallbacks;
    constructor(customParameters: {});
    init: () => void;
    initCopyButtons: () => void;
    copyUrlToClipboard: (event: Event) => void;
    showTooltip: (button: HTMLElement, text: string) => void;
    initShareButtons: () => void;
}
