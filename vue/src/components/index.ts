import NfCard from './NfCard/index.vue'
import NfCheckbox from './NfCheckbox/index.vue'
import nfImgPreview from './nfImgPreview/index.vue'
import nfMasonry from './nfMasonry/index.vue'

const components = [
  NfCard,
  NfCheckbox,
  nfImgPreview,
  nfMasonry,
]

function install(Vue: any) {
  // if (install.installed) return

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
}
