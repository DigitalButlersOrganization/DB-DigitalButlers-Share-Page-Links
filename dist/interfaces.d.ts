import { SharePageLinks } from './index';
export type SharePageCallback = (self: SharePageLinks) => void;
export interface SharePageCallbacks {
    afterInit?: SharePageCallback;
}
