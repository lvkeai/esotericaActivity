import { post, get, upload, down } from './config'
//短信验证码
export const sendRandCumSMSForWebXKWByUnlockNoLogin = params => 
post('tiku/activityoperate/sendRandCumSMSForWebXKWNoLogin.do',params)
//用户注册
export const registForH5 = params => 
post('tiku/activityoperate/registForH5NoLogin.do',params)
//登录
export const login = params => post('tiku/user/login.do', params)
//短信验证登录
export const userSMSloginNoLogin = params => post('tiku/user/userSMSloginNoLogin.do', params)
//查询活动详情
export const getActivityoperateByPage = params => 
post('tiku/activityoperate/getActivityoperateByPage.do',params)
//参与活动
export const participate = params => 
post('tiku/activityoperate/participate.do',params)
//选择目标秘籍
export const chooseTargetEsotericaId = params => 
post('tiku/activityoperate/chooseTargetEsotericaId.do',params)
//兑换指定残页
export const exchangeEsoterica = params => 
post('tiku/activityoperate/exchangeEsoterica.do',params)
//合成秘籍
export const getEsoterica = params => 
post('tiku/activityoperate/getEsoterica.do',params)
//获得分享码的奖励
export const enterShareCode = params => 
post('tiku/activityoperate/enterShareCode.do',params)
//查询所有参加活动的秘籍
export const getAllEsoterica = params => 
post('tiku/activityoperate/getAllEsoterica.do',params)
//获得目标秘籍详情
export const getEsotericaByTargetId = params => 
post('tiku/activityoperate/getEsotericaByTargetId.do',params)
//当前用户收集的所有残页
export const getAllEsotericaPage = params => 
post('tiku/activityoperate/getAllEsotericaPage.do',params)
//查询当前启用的活动
export const getNowActivityOperate = params => 
post('tiku/activityoperate/getNowActivityOperate.do',params)
//查询当前用户参与活动信息
export const getUserActivity = params => 
post('tiku/activityoperate/getUserActivity.do',params)
//查询所有题目
export const getAllTopic = params => 
post('tiku/activityoperate/getAllTopic.do',params)
//查询题目的答案
export const selectAnswerByTopicId = params => 
post('tiku/activityoperate/selectAnswerByTopicId.do',params)