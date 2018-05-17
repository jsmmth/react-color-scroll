import React, { Children, PureComponent } from 'react'

class ColorScroll extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      spaces: false,
      background: this.props.colors[0]
    }
    
    this.scrollContainer = null
    this.onScroll = this.onScroll.bind(this)
    this.calculateSpaces = this.calculateSpaces.bind(this)
    this.blendColors = this.blendColors.bind(this)
  }

  componentDidMount () {
    const spaces = this.calculateSpaces()
    if (!spaces) {
      console.warn('Does\'t look like you have any colors setup.')
    } else {
      this.setState({ spaces })
    }
  }

  /**
   * Converting a number to hex
   * @param {number} num Number you want to convert
   */
  intToHex(num) {
    let hex = Math.round(num).toString(16)
    if (hex.length == 1)
        hex = '0' + hex
    return hex
  }

  /**
   * Blend two colors together by percentage
   * @param {string} color1 Hex value for color one
   * @param {string} color2 Hex value for color two
   * @param {float} percentage Percentage (max: 1, min: 0) of blend
   */
  blendColors (color1, color2, percentage) {
    color1 = color1 || '#000000'
    color2 = color2 || '#ffffff'

    if (color1.length != 4 && color1.length != 7)
        throw new error('colors must be provided as hexes')

    if (color2.length != 4 && color2.length != 7)
        throw new error('colors must be provided as hexes')  

    if (percentage > 1 || percentage < 0)
        throw new error('percentage must be between 0 and 1')

    if (color1.length == 4)
        color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3]
    else
        color1 = color1.substring(1)
    if (color2.length == 4)
        color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3]
    else
        color2 = color2.substring(1)   

    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)]
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)]

    let color3 = [ 
        (1 - percentage) * color1[0] + percentage * color2[0], 
        (1 - percentage) * color1[1] + percentage * color2[1], 
        (1 - percentage) * color1[2] + percentage * color2[2]
    ]
    color3 = '#' + this.intToHex(color3[0]) + this.intToHex(color3[1]) + this.intToHex(color3[2])
    return color3
  }

  /**
   * Calculate the spaces between each colour
   */
  calculateSpaces () {
    const scrollHeight = this.scrollContainer.scrollHeight
    const amountOfColors = this.props.colors ? this.props.colors.length : 0
    if (amountOfColors > 0) {
      const percentage = (100 / amountOfColors)
      const spaces = scrollHeight * (percentage / 100)
      return spaces
    }

    return false
  }

  /**
   * onScroll function which triggers the blending of colors
   * @param {object} e The event object
   */
  onScroll (e) {
    if (this.state.spaces) {
      const scrollPos = this.scrollContainer.scrollTop
      const index = Math.floor(scrollPos / this.state.spaces)
      const percentage = Math.round((((scrollPos - (this.state.spaces * index))) / this.state.spaces) * 100) / 100

      if (this.props.colors[index + 1]) {
        const background = this.blendColors(this.props.colors[index], this.props.colors[index + 1], percentage)
        this.setState({ background })
      }
    }
  }

  render () {
    return (
      <div
        className={this.props.className || 'color-scroll'}
        ref={(el) => this.scrollContainer = el}
        onScroll={this.onScroll}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '100%',
          overflow: 'auto',
          backgroundColor: this.state.background
        }}
      >
        {Children.toArray(this.props.children)}
      </div>
    )
  }

}

export default ColorScroll
