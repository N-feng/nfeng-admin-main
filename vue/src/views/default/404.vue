<template>
  <div class="nf-404">
    <h2>Oops! Page not found.</h2>
    <div ref="element"></div>
    <p>We can't find the page you're looking for.</p>
    <router-link to="/">
      <a-button type="primary" size="large">Go back home</a-button>
    </router-link>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import * as animationData from '../../assets/image/3146-404page.json'

export default {
  mounted() {
    const { element } = this.$refs
    lottie.loadAnimation({
      container: element, // the dom element
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData.default, // the animation data
      rendererSettings: {
        // context: canvasContext, // the canvas context
        // preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
        // clearCanvas: false,
        // progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        // hideOnTransparent: true, // Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        // className: 'some-css-class-name',
        // id: 'some-id',
      },
    })
  },
}
</script>
