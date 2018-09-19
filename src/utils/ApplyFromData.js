//获取报名对象
/**
* @param    {[string]}   Type [类型：Set/Get]
* @param    {[string]}   ItemType [模块]
* @param    {[string]}   ItemName  [健名]
* @param    {[val]}   Val  [值]
* @return   {[obj]}     obj [description]
*/
const ApplyFromData = (Type = 'Get', ItemType, ItemName, Val) => {
  let applyFrom
  if (localStorage.ApplyFrom) {
    applyFrom = JSON.parse(localStorage.ApplyFrom)
  } else {
    applyFrom = {
      user: {
        gender: 1,
        name: '',
        birthday: '2017-01-01',
        type: '',
        pic: '',
        mobile: '',
        email: ''
      },
      works: [],
      profile: {
        device: '', //东昌电影院材料
        gardens: '', //电影院室外园林设计方案
        tag: '', //整体标识系统设计方案
        project: '' //跨学科或跨媒体
      }
    }
  }
  if (Type === 'Get') { // 获取信息
    return applyFrom
  } else { //存入信息
    applyFrom[ItemType][ItemName] = Val
    localStorage.ApplyFrom = JSON.stringify(applyFrom)
  }
}

export { ApplyFromData }
