import './style.scss';
import { SharePageCallbacks } from './interfaces';
export declare class SharePageLinks {
    linkSelector: string;
    href: string;
    arrayOfMainTagNames: string[];
    arrayOfMainTags: HTMLElement[];
    arrayOfSharePageLinks: HTMLElement[];
    messageForShareViaEmail: string;
    pageName: string;
    on: SharePageCallbacks;
    constructor(customParameters: {});
    init: () => void;
}
