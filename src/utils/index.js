import getOssSigure from '@/api/oss'
import md5 from 'js-md5'
import Vue from 'vue'
import { Toast } from 'vux'

Vue.use(Toast)
/**
 * [description]
 * @Author   xiao
 * @DateTime 2017-10-11
 * @param    {[obj]}   fileObj [文件对象]
 * @param    {[obj]}   context [上下文]
 * @param    {[string]}   key  [vue中data对应的键名]
 * @return   {[type]}          [description]
 */
const uploadSingleImg = (fileObj, context, key, con, vName, typeVal) => {
  let obj = {}
  if (typeVal) {
    obj.params = { type: typeVal }
  } else {
    // obj.data = {
    //   success_action_status: 201
    // }
  }
  getOssSigure(obj).then(response => {
    if (!response.code) {
      const client = new OSS.Wrapper({
        region: 'oss-cn-shanghai',
        accessKeyId: response.data.data.AccessKeyId,
        accessKeySecret: response.data.data.AccessKeySecret,
        stsToken: response.data.data.SecurityToken,
        bucket: response.data.data.bucket,
        key: response.data.data.dir,
        'Content-Type': 'vedio/mp4'
      })
      let inde = fileObj.name.indexOf('.')
      let suffix = fileObj.name.substring(inde)

      client
        .multipartUpload(response.data.data.dir + '/' + md5(fileObj.name + Date.parse(new Date())) + suffix, fileObj, {
          progress: function*(p = 0) {
            if (con) {
              if (p === 1) { con.upNum++ }
              con.$vux.loading.show({
                text: '上传中' + parseInt((p - 0.01) * 100) + '% (' + con.upNum + '/' + con.imgArr.length + ')'
              })
            }
          }
        })
        .then(result => {
          let targeturl
          if (result.res.requestUrls[0].indexOf('?') === -1) {
            targeturl = result.res.requestUrls[0]
          } else {
            targeturl = result.res.requestUrls[0].substr(0, result.res.requestUrls[0].indexOf('?'))
          }
          context[key] = targeturl
          //传视频时获取名字
          let ind = result.name.indexOf('.')
          let lastind = result.name.indexOf('/')
          let resName = result.name.substring(0, ind)
          con && (con[vName] = resName.substring(lastind + 1))
          return Promise.resolve(result)
        })
        .catch((err) => {
          // console.log(err)
          Vue.$vux.toast.text(err)
          // return false
        })
    } else {
      Vue.$vux.toast.text(response.msg)
    }
  })
}

export { uploadSingleImg }
