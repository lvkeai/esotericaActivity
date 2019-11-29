import { post, get, upload, down } from './config'
//短信验证码
export const sendRandCumSMSForWebXKWByUnlockNoLogin = params => 
post('manager/YunActivityoperateAction/sendRandCumSMSForWebXKWNoLogin.do',params)
//用户注册
export const registForH5 = params => 
post('manager/YunActivityoperateAction/registForH5NoLogin.do',params)
//登录
export const login = params => post('tiku/user/login.do', params)
//短信验证登录
export const userSMSloginNoLogin = params => post('tiku/user/userSMSloginNoLogin.do', params)
//查询活动详情
export const getActivityoperateByPage = params => 
post('manager/YunActivityoperateAction/getActivityoperateByPage.do',params)
//参与活动
export const participate = params => 
post('manager/YunActivityoperateAction/participate.do',params)
//选择目标秘籍
export const chooseTargetEsotericaId = params => 
post('manager/YunActivityoperateAction/chooseTargetEsotericaId.do',params)
//兑换指定残页
export const exchangeEsoterica = params => 
post('manager/YunActivityoperateAction/exchangeEsoterica.do',params)
//合成秘籍
export const getEsoterica = params => 
post('manager/YunActivityoperateAction/getEsoterica.do',params)
//获得分享码的奖励
export const enterShareCode = params => 
post('manager/YunActivityoperateAction/enterShareCode.do',params)
//查询所有参加活动的秘籍
export const getAllEsoterica = params => 
post('manager/YunActivityoperateAction/getAllEsoterica.do',params)
//获得目标秘籍详情
export const getEsotericaByTargetId = params => 
post('manager/YunActivityoperateAction/getEsotericaByTargetId.do',params)
//当前用户收集的所有残页
export const getAllEsotericaPage = params => 
post('manager/YunActivityoperateAction/getAllEsotericaPage.do',params)
//查询当前启用的活动
export const getNowActivityOperate = params => 
post('manager/YunActivityoperateAction/getNowActivityOperate.do',params)
//查询当前用户参与活动信息
export const getUserActivity = params => 
post('manager/YunActivityoperateAction/getUserActivity.do',params)
//查询所有题目
export const getAllTopic = params => 
post('manager/YunActivityoperateAction/getAllTopic.do',params)
//查询题目的答案
export const selectAnswerByTopicId = params => 
post('manager/YunActivityoperateAction/selectAnswerByTopicId.do',params)