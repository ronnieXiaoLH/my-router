export default {
  props: {
    to: {}
  },
  render () {
    const handleClick = () => {
      this.$router.push(this.to)
    }
    return <a onClick={handleClick}>{this.$slots.default}</a>
  }
}

// export default {
//   functional: true,
//   render (h, { props, slots }) {
//     const handleClick = () => {
//       console.log(props.to)
//     }
//     return <a onClick={handleClick}>{slots().default}</a>
//   }
// }
