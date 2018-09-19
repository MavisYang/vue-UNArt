import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import userInfoApi from '../API/my'
// import { SlipRight } from './SlipRight'

Vue.use(Router)

const my = () => import('@/views/my/my')
const home = () => import('@/views/home/home')
const search = () => import('@/views/production/search')
const production = () => import('@/views/production/production')
const details = () => import('@/views/production/details')
const detailAuthor = () => import('@/views/production/detailAuthor')
const detailJury = () => import('@/views/home/detailJury')
const listMessage = () => import('@/views/my/listMessage')
const uploadPro = () => import('@/views/my/uploadPro')
const detailMessage = () => import('@/views/my/detailMessage')
const login = () => import('@/views/login/login')
const passwordForget = () => import('@/views/login/passwordForget')
const register = () => import('@/views/login/register')
const personal = () => import('@/views/my/personal')
const personalModify = () => import('@/views/my/personalModify')
const IDcardAuthentication = () => import('@/views/my/IDcardAuthentication')
const MobileBind = () => import('@/views/my/MobileBind')
const MyProductiong = () => import('@/views/my/MyProductiong')
const changePro = () => import('@/views/my/changePro')
const previewPro = () => import('@/views/my/previewPro')
const previewLast = () => import('@/views/my/previewLast')
const EntryInformation = () => import('@/views/home/EntryInformation')
const ApplyForm = () => import('@/views/home/ApplyForm')
const ApplyModify = () => import('@/views/home/ApplyModify')
const ApplyPro = () => import('@/views/home/ApplyPro')
const ProMaterial = () => import('@/views/home/ProMaterial')
const Name = localStorage.language === 'en' ? ['UNArt', 'search', 'entries', 'Details entries', 'Author details', 'My', 'Upload entries', 'Judges details', 'MessageList', 'MessageDetails', 'login', 'Forgot password', 'register', 'Personal info', 'set information', 'ID authentication', 'Mobile bind', 'MyEntries', 'changeEntries', 'PreviewEntries', 'ChangePreviewEntries', 'Entry Information', 'Personal Information', 'Registration editor', 'historicalEntries', 'EntriesAnnex'] : ['UNArt', '搜索', '作品', '作品详情', '作者详情', '我的', '上传作品', '评委详情', '消息列表', '消息详情', '登录', '忘记密码', '注册', '个人信息', '设置信息', '实名认证', '手机绑定', '作品管理', '修改作品', '作品详情预览', '作品预览', '参赛须知', '信息填写', '报名编辑', '历史作品列表', '作品附件']

const router = new Router({
  routes: [
    {
      path: '/',
      name: Name[0],
      component: home
    },
    {
      path: '/search',
      name: Name[1],
      component: search,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/production',
      name: Name[2],
      component: production
    },
    {
      path: '/details',
      name: Name[3],
      component: details,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/detailAuthor',
      name: Name[4],
      component: detailAuthor,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/my',
      name: Name[5],
      component: my,
      meta: { notHeader: 'notHeader' }
    },
    {
      path: '/uploadPro',
      name: Name[6],
      component: uploadPro,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/detailJury',
      name: Name[7],
      component: detailJury,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/listMessage',
      name: Name[8],
      component: listMessage,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/detailMessage',
      name: Name[9],
      component: detailMessage,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/login',
      name: Name[10],
      component: login,
      meta: { notHeader: 'notHeader', notFooter: 'notFooter' }
    },
    {
      path: '/passwordForget',
      name: Name[11],
      component: passwordForget,
      meta: { notHeader: 'notHeader', notFooter: 'notFooter' }
    },
    {
      path: '/register',
      name: Name[12],
      component: register,
      meta: { notHeader: 'notHeader', notFooter: 'notFooter' }
    },
    {
      path: '/personal',
      name: Name[13],
      component: personal,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/personalModify',
      name: Name[14],
      component: personalModify,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/IDcardAuthentication',
      name: Name[15],
      component: IDcardAuthentication,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/MobileBind',
      name: Name[16],
      component: MobileBind,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/MyProductiong',
      name: Name[17],
      component: MyProductiong,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/changePro',
      name: Name[18],
      component: changePro,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/previewPro',
      name: Name[19],
      component: previewPro,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/previewLast',
      name: Name[20],
      component: previewLast,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/EntryInformation',
      name: Name[21],
      component: EntryInformation,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/ApplyForm',
      name: Name[22],
      component: ApplyForm,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/ApplyModify',
      name: Name[23],
      component: ApplyModify,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/ApplyPro',
      name: Name[24],
      component: ApplyPro,
      meta: { notFooter: 'notFooter' }
    },
    {
      path: '/ProMaterial',
      name: Name[25],
      component: ProMaterial,
      meta: { notFooter: 'notFooter' }
    }
  ]
})
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

const commit = store.commit || store.dispatch
router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  document.title = to.name
  //需要登录的页面检测code
  let pathArr = [
    '/my',
    '/personal',
    '/IDcardAuthentication',
    '/uploadPro',
    '/previewPro',
    '/MyProductiong',
    '/listMessage',
    '/detailMessage',
    '/changePro',
    '/previewLast',
    '/EntryInformation',
    '/ApplicationForm',
    '/ProMaterial',
    '/ApplyPro',
    '/ApplyModify',
    '/ApplyForm'
  ]
  if (pathArr.find(path => path === to.path)) {
    if (localStorage.HeadToken) {
      let localTime = JSON.parse(localStorage.HeadToken).expired_at
      let time = Date.parse(new Date()) / 1000
      if (time >= localTime) {
        localStorage.removeItem('HeadToken')
        sessionStorage.removeItem('userInfo')
        localStorage.removeItem('Token')
        // next('/login')
      } else {
        if (!sessionStorage.userInfo) {
          userInfoApi.userInfo({
            success(res) {
              let userInfo = res.data
              if (userInfo.avatar) userInfo.avatar += '?x-oss-process=image/resize,w_100'
              sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
              next()
            }
          })
        } else {
          next()
        }
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  this.a.app.$vux.loading.show({
    text: localStorage.language === 'en' ? 'loading...' : '加载中...'
  })
})

export default router
