# file-stylez

Simple specs from Figma files.

## Development

* Create a [Figma app](https://www.figma.com/developers/apps).
* Use [`micro-figma`](https://github.com/jongold/micro-figma) to spin up a auth proxy on port 3000.
* `yarn dev -p 4000`

## Deployment

Deploy [`micro-figma`](https://github.com/jongold/micro-figma).

```
now -e AUTH_URL=https://your-auth-url
```
