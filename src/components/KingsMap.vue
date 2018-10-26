<template>
  <div>
    <ul class="tab">
      <li><router-link to="/hello">hello</router-link></li>
      <li><router-link to="/video">video</router-link></li>
      <li><router-link to="/kings">kings</router-link></li>
    </ul>
    <div id="body">
      <div id="container"></div>
        <div class="show_info" style="display:none;">
          <a id="kings-closer" class="kings-closer">
          </a>
          <div class="info_my">
              <img class="avatar" />
              <div class="info_mem">
                  <div class="nickname"></div>
                  <div class="id"></div>
                  <div class="vote"></div>
              </div>
          </div>
          <div class="intro"></div>
      </div>
      <div id="KingsMap3D">
        <!-- 地图区域选择按钮 -->
        <!-- <div class="map_bk" :show='hide'>
            <el-select @change="changed" v-model="optionsTowvalue" placeholder="请选择栋別">
                <el-option v-for="item in optionsTow" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="optionsTowvalue2" placeholder="请选择楼层">
                <el-option v-for="item2 in mapoptionsTow2" :key="item2.id" :label="item2.name" :value="item2.id">
                </el-option>
            </el-select>
            <el-button type="danger" @click="goMap" class="leave_For" style="color:white;">前往</el-button>
        </div> -->
        <!-- <form id="search-panel" class="form-inline">
            <div class="form-group">
                <label for="exampleInput">搜索</label>
                <input type="text" class="form-control" id="exampleInput" placeholder="例如:诊室">
            </div>
            <button id="search-btn" type="submit" class="btn btn-primary">搜索</button>
            <button id="search-clear-btn" type="submit" class="btn btn-primary">清空</button>
        </form>
        <div class="search">
            <input type="text" value="" placeholder="搜索" id="seachText">
            <ul id="hotwords" class="hotwords">
            </ul>
        </div>
        <div id="cardInfo">
            <span id="re_close" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            <div class="title"></div>
            <div class="roomInfor"></div>
        </div>
        <div></div>
        <div class="nav-info">正在为您规划导航路径...</div>
        <div class="nav-info2">开始为您导航...</div>
        <div class="nav-info3">导航结束</div>
        <div class="camera-info">点击摄像头 可调出电视面板</div>
        <button id="btn-rm-tv" type="button" class="btn btn-primary" style="display: none;z-index:9999;position: absolute;top:80px;left: 200px;">移除电视板</button>
        <div class="navigation-panel">
            <p>总路程 : <span id="distance-all"></span></p>
            <p>距终点 : <span id="distance"></span></p>
            <p>路线提示 : <span id="path-info"></span></p>
        </div> -->
      </div>
    </div>

    <!-- 视频弹窗 -->
    <div class="dialogWrap" v-show="dialogVisible">
        <span id="dialog-closer" class="kings-popup-closer" @click="dialogCloser"></span>
        <d-player ref="player" autoplay="autoplay" @play="play" :lang="lang" :video="video" :contextmenu="contextmenu"></d-player>
    </div>
    
  </div>
</template>

<script >
import '../assets/styles/myMap.scss'
import VueDPlayer from './VueDPlayerHls';

var map = null;

export default {
  name: 'KingsMap',
  data () {
    return {
      cameraList: [],
      dialogVisible: false,
      video: {
        quality: [
          {
            name: "240P",
            url: "http://192.168.1.198:6713/mag/hls/47750f8c863642b8a6c2689e9892fcc7/1/live.m3u8"
          },
          {
            name: "360P",
            url: "http://192.168.1.198:6713/mag/hls/47750f8c863642b8a6c2689e9892fcc7/1/live.m3u8"
          },
          {
            name: "720P",
            url: "http://192.168.1.198:6713/mag/hls/47750f8c863642b8a6c2689e9892fcc7/1/live.m3u8"
          }
        ],
        pic: "http://192.168.1.198:6713/mag/hls/47750f8c863642b8a6c2689e9892fcc7/1/live.m3u8",
        defaultQuality: 1,
        //  thumbnails: logoImg,
        type: "hls"
      },
      lang: "zh-cn",
      aspectRatio: "16:9",
      autoplay: true,
      player: null,
      contextmenu: []
    }
  },
  components: {
    "d-player": VueDPlayer
  },
  methods: {
    // 初始化地图
    mapInit_() {
      let that = this;
      map = KingsMap.KMInit({
        //地图容器ID
        container: "KingsMap3D",
        //地图的形式
        defaultMapType: KingsMap.KMView.MODE_3D,
        //显示一层 与显示楼层一起使用
        defalutFloorMode: KingsMap.KMView.MODE_ONE,
        //显示楼层
        defaultFloorID: "-2018",
        //是否显示名称label
        defaultShowName: true,
        //是否显示POI
        defaultShowPoi: true,
        //是否选中物体
        modelSelectedEffect: true,
        //地图的缩放等级
        defaultMapScaleLevel: 14,
        //指北针
        compass: true,
        //指北针位置
        compassOffset: KingsMap.KMControl.MODE_RIGHT_TOP,
        //2D 3D 切換控件
        viewMode: true,
        //2D 3D 切換控件位置
        viewModeOffset: [-15, -170],
        //是否显示多层控件
        floorsMode: true,
        //多层控件的位置
        floorsModeOffset: [-15, -220],
        //是否显示放大缩小控件
        zoomMode: true,
        //放大缩小空间的位置
        zoomModeOffset: [-15, -60],
        //是否显示楼层列表
        listMode: true,
        //楼层列表控件的位置
        listModeOffset: [15, 100],
        //是否显示加载动画
        loadingViewMode: true,
        //默认加载加载动画样式: 
        loadingViewStyle: KingsMap.KMLoadingView.MODE_LOADER_1,
        //默认开启Flash快门动画
        flashViewMode: true,
      });

      // 禁止鼠标的滚轮事件导致页面滚动
      map.noScrollPageById("body");

      map.load('../../static/map/data/lingang.json', function() {
        // map.removeLoadingView();
        var floorIds;
        var floors;
        var obj;


        // 移除加载动画
        map.removeLoadingView();
        // 获取所有楼层的 ID
        floorIds = map.getAllFloorIDs();
        floors = floorIds[0];
        // 获取楼层对象
        obj = map.getFloorLayer(floors);

        that.cameraList = [
          [84.92151291714507, 27.06011092241971],
          [97.89786583341403, 122.3842099234456],
          [24.54346329807786, 163.23085298135786],
          [42.82243394672968, 221.4659014769968],
          [43.18282984577359, 229.75499189780876],
          [102.6287884498835, 280.3810545531913]
        ];

        for (let i = 0; i < that.cameraList.length; i++) {
          var name = "Cam" + Math.random() * 80;
          var imgLayer = new KingsMap.KMCameraMarker({
            image: "../../static/map/img/camera.png",
            size: 25,
            point: [that.cameraList[i][0], that.cameraList[i][1]],
            // 是否开启弹窗 (可选)
            popup: true,
            // 弹窗信息 (可选)
            popupOptions: {
              // 弹窗的大小
              size: [220, 80],
              // 弹窗的内容
              data: {
                "name": "点击查看视频",
              },
              container: '<div style="width:auto;height:30px;"><p>' + name + '</p></div><button class="camera btn btn-primary btn-xs" data-name="' + name + '">打开</button>',
              callback: function() {
                var lists = document.querySelectorAll('.camera');
                for (var j = 0; j < lists.length; j++) {
                  var list = lists[j];
                  list.addEventListener('click', function() {
                    document.querySelector('#infoWindow').style.display = 'none';
                    that.dialogVisible = true;
                    that.$refs.player.initVideo();
                  }, false);
                }
              }

            }
          });
          map.addImgMarker(obj, imgLayer);
        }

        // 为 KingsMap 提供放置对象的功能,获取点击位置坐标
        // var oc = new KingsMap.KMObjectController();
        // oc.enablePlaceObject(true, function(data) {
        //   console.log(data);
        // });

      });
    },
    
    // 关闭视频弹框
    dialogCloser() {
      this.dialogVisible = false;
      this.$refs.player.dp.destroy();
    },

    // 视频播放事件
    play() {
      // console.log('开始播放...')
    },
  },
  mounted() {
    this.mapInit_();
  },
  beforeDestroy() {
    map.removeMap();
  }
}
</script>

<style lang="scss" scoped>
.tab {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
  li {
      a {
          color: #166AF8;
      }
  }
}
#body {
    // width: 100vw;
    // height: 100vh;
    overflow: hidden;
}
#container {
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 10;
    display: none;
}

#KingsMap3D {
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    position: absolute;
}

#control-panel {
    position: absolute;
    width: 80%;
    height: 150px;
    bottom: -150px;
    background: #D8C8DF;
    z-index: 18;
}

#control-btn {
    position: absolute;
    background: #D8C8DF;
    width: 80px;
    height: 25px;
    bottom: 0px;
    text-align: center;
    font-size: 13px;
    left: 30%;
    color: #212121;
    cursor: pointer;
    border-radius: 2px;
    z-index: 11;
}

#control-btn p {
    padding: 4px 0px;
}

#search-panel {
    z-index: 9999;
    width: 100%;
    position: absolute;
    top: 10px;
    text-align: center;
    display: none;
}

.search {
    z-index: 9999;
    width: 100%;
    position: absolute;
    top: 10px;
    text-align: center;
    display: none;
}

#hotwords {
    background: #fff;
    position: absolute;
    top: 28px;
    left: calc(50% - 100px);
    margin: 0 auto;
    max-height: 250px;
    overflow: auto;
    overflow-x: hidden;
    border-top: 0;
    width: 200px;
    padding: 0;
    display: none;
}

#hotwords li {
    list-style: none;
    text-align: left;
    margin-left: 10px;
    border-bottom: #ccc 1px solid;
    cursor: pointer;
}

#hotwords li:hover {
    color: #92d7ff;
}

#seachText {
    width: 200px;
    position: absolute;
    left: calc(50% - 100px);
}

.nav-info,
.nav-info2,
.nav-info3 {
    z-index: 9999;
    width: 100%;
    position: absolute;
    top: 50%;
    display: none;
    font-size: 20px;
    color: #BC2121;
    text-align: center;
}

.camera-info {
    z-index: 9999;
    width: 100%;
    position: absolute;
    top: 50px;
    display: none;
    font-size: 20px;
    color: #BC2121;
    text-align: center;
}

#cardInfo {
    z-index: 9999;
    position: absolute;
    left: calc(50% - 100px);
    top: 40%;
    width: 200px;
    height: auto;
    padding: 6px 20px;
    background: #FFC965;
    display: none;
    border-radius: 4px;
}

#cardInfo .glyphicon {
    float: right;
    right: -15px;
    top: -5px;
    font-weight: 100;
    font-size: 12px;
    cursor: pointer;
}

#cardInfo p {
    line-height: 18px;
    margin: 0;
}

.history-search {
    position: absolute;
    z-index: 888;
    left: 100px;
    top: -70px;
}

.navigation-panel {
    z-index: 9999;
    position: absolute;
    background: #FFC965;
    width: 200px;
    height: auto;
    left: 15px;
    top: 0;
    display: none;
}

.navigation-panel p span {
    color: #bc2121;
}

.button {
    position: absolute;
    z-index: 9998;
}

.show_info {
    position: fixed;
    background-color: rgba(0, 0, 0, .6);
    padding: 10px;
    width: 300px;
    margin: 0 auto;
    left: 0;
    right: 0;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #fff;
    top: 30%;
    z-index: 10000;
}

.show_info img {
    display: block;
    margin: auto;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #888;
}

.show_info .intro {
    color: #fff;
    text-indent: 20px;
    margin-top: 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.show_info .info_my>* {
    vertical-align: middle;
}

.show_info .info_my .info_mem {
    margin-top: 10px;
    text-indent: 20px;
    color: #fff;
    max-width: 120px;
}

.show_info .info_my .info_mem>div.nickname {
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.show_info .info_my .avatar {
    width: 100px;
    height: 140px;
}

.kings-closer {
    color: #fff;
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.kings-closer:after {
    content: "✖";
}

.dialogWrap {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  padding: 30px 0 0;
  width: 750px;
  height: 500px;
  z-index: 999;
  background: #ccc;
}
@media only screen and (max-width: 640px) {
  .dialogWrap {
    width: 100%;
  }
}
</style>