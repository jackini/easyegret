/**
 * Copyright (c) 2014,www.easyegret.com
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EASYEGRET.COM AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
module easy {
    /**
     * 这里记录全局公用的一些数据和设置
     */
    export class GlobalSetting {
        /**
         * 在显示view的时候,按照设计的尺寸显示,不做view宽高的改变,采用egret自带的scale策略
         */
        public static DISPLAY_VIEW_FIX:string = "fix";
        /**
         * 在显示view的时候会自动把view页面设置成当前最大显示宽高
         */
        public static DISPLAY_VIEW_FULL:string = "full";
        /**
         * 显示模式设置
         * @type {string}
         */
        public static DISPLAY_MODEL:string = GlobalSetting.DISPLAY_VIEW_FIX;
        /**
         * 开发模式开关
         * 打开开发模式,logger会记录打印信息到debug窗口
         * @type {boolean}
         */
        public static DEV_MODEL:Boolean = true;//开发模式
        /**
         * 游戏系统的时间校对
         * 一般登录完成后,服务器会通知一个当前的服务器时间
         * 以此时间为基准,客户端可以随时校对自己的时间
         * @type {number}
         */
        public static SYSTEM_DATE:number = 0;
        /**
         * 声音总开关
         * @type {boolean}
         */
        public static VOLUME_OPEN:boolean = true;//音量开关
        /**
         * 帧频设置
         * @type {number}
         */
        public static FRAME_RATE:number = 60;//帧频
        /**
         * 舞台
         * @type {null}
         */
        public static STAGE:egret.Stage = null;//舞台
        //public static IOS:Boolean = false;//是否ios设备
        /**
         * 舞台的宽
         * @type {number}
         */
        public static STAGE_WIDTH:number = 480;//实际舞台宽
        /**
         * 舞台的高
         * @type {number}
         */
        public static STAGE_HEIGHT:number = 800;//实际舞台高
        /**
         * 最小view的宽
         * @type {number}
         */
        public static VIEW_MINI_WIDTH:number = 300;//最小view宽
        /**
         * 最小view的高
         * @type {number}
         */
        public static VIEW_MINI_HEIGHT:number = 300;//最小view高
        /**
         * 开关
         * 进行报表统计
         * @type {null}
         */
        public static REPORT:boolean = false;
        /**
         * 开关
         * 对UI的可点击对象进行报表统计
         * @type {null}
         */
        public static REPORT_UI:boolean = false;
        //报表URL地址
        public static REPORT_URL:string = "";
        //产品名
        public static APP_NAME:string = "";
        //产品id
        public static APP_PRODUCT_ID:string = "";
        /**
         * 设备信息, 报表使用
         */
        public static APP_DEVICE:string = "";
        public static APP_DataEyeId:string = "";
        public static APP_Rate:number = 0;
        public static APP_RateName:number = 0;
        /**
         * 渠道信息, 报表使用
         */
        public static APP_CHANNEL:string = "";
        /**
         * 版本信息, 报表使用
         */
        public static APP_VERSION:string = "";
        /**
         * 使用的渠道, 报表使用
         */
        public static APP_PROVIDE:number = 0;
        /**
         * app存取数据的方式
         */
        public static APP_STORAGE:string = "local";//local:本地, net:网络, local_net:混合模式
        //存储方式的常量设定
        public static STORAGE_LOCAL:string = "local";//本地存储方式
        public static STORAGE_NET:string = "net";//网络存储方式
        public static STORAGE_LOCAL_NET:string = "local_net";//本地和网络混合存储方式
        /**
         * 初始化全局的数据
         */
        public static initData():void{
            GlobalSetting.STAGE = egret.MainContext.instance.stage;
            GlobalSetting.STAGE_WIDTH = GlobalSetting.STAGE.stageWidth;
            GlobalSetting.STAGE_HEIGHT = GlobalSetting.STAGE.stageHeight;
            //uuid标识
            if(easy.StringUtil.isUsage(easy.DaoUtil.read("main_app", "device_id"))){
                GlobalSetting.APP_DEVICE = easy.DaoUtil.read("main_app", "device_id");
            }else{
                //生成唯一uuid标识
                GlobalSetting.APP_DEVICE = UUID.newUUID();
                DaoUtil.write("main_app", "device_id", GlobalSetting.APP_DEVICE);
            }
            //console.log("uuid=" + GlobalSetting.APP_DEVICE);
            if (GlobalSetting.DEV_MODEL) {
                Debug.log = "---- GlobalSetting init!----";
                Debug.log = "STAGE_WIDTH=" + GlobalSetting.STAGE_WIDTH + ", STAGE_HEIGHT=" + GlobalSetting.STAGE_HEIGHT;
            }
        }

        /**
         * 判断是不是微信
         * @returns {boolean}
         */
        public isWeiXin():boolean {
            var ua:string = navigator.userAgent.toString();
            var str:any = ua.match(/MicroMessenger/i);
            if (str == "MicroMessenger") {
                return true;
            } else {
                return false;
            }
            //var bet = 1;//iphone系列比较特殊，尺寸需要翻倍
            //switch (wid) {
            //    case 320://iphone4\5
            //        bet = 2;
            //        break;
            //    case 375://iphone 6
            //        bet = 2;
            //        break;
            //    case 414://iphone 6+
            //        bet = 3;
            //        break;
            //    default:
            //        bet = 1;
            //        break;
            //}
            //wid *= bet; hei *= bet;
        }
    }
}