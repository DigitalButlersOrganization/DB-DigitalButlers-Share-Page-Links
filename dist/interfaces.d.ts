import { SharePageLinks } from './index';
export type SharePageCallback = (self: SharePageLinks) => void;
export type SharePageCopyCallback = (self: SharePageLinks, button: HTMLElement) => void;
export interface SharePageCallbacks {
    afterInit?: SharePageCallback;
    copy?: SharePageCopyCallback;
}
