# React color scroll

> React color scroll is a simple component which allows you to blend between colors as you're scrolling down the page. You can use it to fill an entire page, or within a wrapped container. ✨

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i -S react-color-scroll
```

## Usage

```jsx
import React from 'react'
import ColorScroll from 'react-color-scroll'

class HomePage extends React.PureComponent {
  render () {
    return (
      <ColorScroll
        colors={['#FFFCF9', '#FFF9F9', '#FCF9FF']}
        className='my-color-scroll' // Defaults to 'color-scroll'
      >
        {/* Your site content in here */}
      </ColorScroll>
    )
  }
}

export default HomePage
```

It works by splitting up the container's scroll height and calculating the correct time to blend between colors for each color to have an equal percentage of your content.

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/react-color-scroll.svg
[npm-url]: https://npmjs.org/package/react-color-scroll
