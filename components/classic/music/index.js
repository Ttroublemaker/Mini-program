import {
  classicBeh
} from '../classic-beh.js'
// 获取音乐管理对象
let mMgr = wx.getBackgroundAudioManager()

Component({
  // 让组件继承classicBeh！！！
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    // img: String,
    // content: String
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png',
  },
  // 在组件实例进入页面节点树时执行
	attached: function() {
		console.log("attached")
		this._recoverStatus()
		this._monitorSwitch()
  },
  // hidden不会触发detached，连续两个type都是music的话也不会触发
  detached: function(event) {
		// console.log("销毁")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      // 图片切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        // 注意在安卓设备上必须有title
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

		// 控制播放暂停按钮
    _recoverStatus: function() {
			// console.log(mMgr, mMgr.paused)
			if (mMgr.paused) {
        this.setData({
          playing: false
        })
				return 
      }
			// console.log('1',mMgr.src)
			// console.log('2', this.properties.src)
			if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

		// 总控开关控制音频播放
		_monitorSwitch:function(){
			mMgr.onPlay(()=>{
				this._recoverStatus()
			})
			mMgr.onPause(() => {
				this._recoverStatus()
			})
			mMgr.onStop(() => {
				this._recoverStatus()
			})
			mMgr.onEnded(() => {
				this._recoverStatus()
			})
		}
  }
})