# SharePageLinks

## Usage

### Create an HTML markup

```html
<section>
	<a href="" data-network-name="whats-app">WhatsApp</a>
	<a href="" data-network-name="facebook">Facebook</a>
	<a href="" data-network-name="twitter">Twitter</a>
	<a href="" data-network-name="linkedin">Linkedin</a>
	<a href="" data-network-name="telegram">Telegram</a>
	<a href="" data-network-name="email">Email</a>
</section>
```

### Create SharePageLinks instance

```javascript
import { SharePageLinks } from '@digital-butlers/components/share-page-links';

const shareLinks = new SharePageLinks({
	messageForShareViaEmail: "This is really important! Don't miss it", // the text to insert in the "body of the message" field (if we share a link to the page in the email)
	pageName: 'Custom page name', // if there is no 'title', 'h1', '[role="heading"][aria-level="1"]' on the page, this text will be used instead
});

shareLinks.init();
```

### Create a copy button

Will copy the current page URL to the clipboard

```html
<button>Copy link</button>
```

Will copy custom value from 'data-copy-value' attribute

```html
<button data-copy-value="Hello world!">Copy link</button>
```

## API

### Config Properties


### `messageForShareViaEmail`

_Type:_ `string`
_Default:_ `'I think it will be interesting for you to read this article'`
_Description:_ The text to insert in the "subject of the message" field (if we share a link to the page in the email)

### `pageName`

_Type:_ `string`
_Default:_ `'We recommend it for reading'`
_Description:_ If there is no 'title', 'h1', '[role="heading"][aria-level="1"]' on the page, this text will be used instead

### `on`

_Type:_ `object`
_Default:_ `{}`
_Description:_ Object with callbacks

### `copyButtonSelector`

_Type:_ `string`
_Default:_ `'[data-copy-button]'`
_Description:_ Selector for the copy button

### `tooltipSelector`

_Type:_ `string`
_Default:_ `'[data-copy-button-tooltip]'`
_Description:_ Selector for the tooltip

### Events callback config object

### `afterInit`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after SharePageLinks initialization

## License

MIT
