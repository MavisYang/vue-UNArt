import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

if (!localStorage.language) localStorage.language = 'cn'

const i18n = new VueI18n({
  locale: localStorage.language, // 语言标识
  messages: {
    cn: require('./lang/cn'), // 中文语言包
    en: require('./lang/en') // 英文语言包
  }
})

export default i18n
