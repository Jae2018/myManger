// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'TabsPage';

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = 'WorkListPage';
export const Tab2Root = 'StorePage';
export const Tab3Root = 'DeviceInfoPage';
export const Tab4Root = 'InspectPage';
export const Tab5Root = 'MinePage';

//IP地址
export const BaseUrl = 'https://www.goodb2b.cn/test/sale_inte';//基址https://www.goodb2b.cn/test/sale_inte    ； https://www.goodb2b.cn/sale_inte
//无
export const checkCodeUrl = '/system/checkcode.action';//验证码，OK
//username，password
export const loginUrl = '/system/logon.action';//登录,OK
//无
export const homeOrderinfo = '/repair/personalorderinfo.action';//主页工单条数信息，ok
//type：0 1 2 3 四种
export const homeOrderList = '/repair/personalorderlist.action';//主页工单列表参数：ok
//storeId ，  测试：11 12 13
export const storeDeviceList = '/repair/devicelist.action';//店铺所有设备列表，
// deviceId	    是	string	设备ID
// happenTime	  是	string	发生时间
// bugLevel	    否	string	故障级别
// reportId	    否	string	维修人员ID
// bugType	    否	string	故障类型
// bugReason	  否	string	故障原因
// deviceAdd	  否	string	设备位置
// deviceState	是	int	    设备状态; 0: 停机维修; 1: 带病运行; 2: 其他
// decription	  否	string	问题描述
// img	        否	bytes	  图片
// voice	      否	bytes	  语音
export const storeReport = '/repair/report.action';//店铺故障报修
//无参  或者 pinpaiID
export const storeList = '/repair/storelist.action';//店铺列表，ok
//maiId
export const personOrderDetail = '/repair/getOrderInfo.action';//个人工单详情，提示：程序有问题
//deviceId
export const deviceDetail = '/repair/deviceinfo.action';//设备详情
//无
export const inspect = '/repair/inspectList.action';//巡检
//type，1 未提交 ；2 已提交
export const mineReport = '/repair/personalReport.action';//我的上报历史，OK，测试号有一单
//无
export const mineRepair = '/repair/personalRepairHistory.action';//我的修理历史，OK
//pinpaiID
export const parstList = '/repair/replaceList.action';//备件
// maiId	  	  string	维修单ID
// bugReason		string	故障原因	处理意见
// repairLevel	string	维修级别
// descrption		string	工作描述
export const uploadOrder = '/repair/uploadOrder.action';//提交工单接口，OK。测试号无订单
//maiId，维修单ID
export const cancelOrder = '/repair/cancleRepair.action';//取消订单，OK。
//maiId
export const qiangOrder = '/repair/robbingIt.action';//抢单，提示：程序有问题
//维修人员
export const workerList = '';
//配件列表
export const partsArr = '';
//维修单状态变更
export const OrderStateChange = '';

//5504  token过期
export const token: string = '';
