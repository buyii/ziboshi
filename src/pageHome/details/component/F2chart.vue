<script>
import uCharts from '@qiun/ucharts'

const uChartsInstance = {}
export default {
  data() {
    return {
      cWidth: 686,
      cHeight: 450,
      tabActive: 1,
    }
  },
  // onReady() {
  //   // 这里的 686 对应 css .charts 的 width
  //   this.cWidth = uni.rpx2px(686)
  //   // 这里的 450 对应 css .charts 的 height
  //   this.cHeight = uni.rpx2px(450)
  //   this.getServerData()
  // },
  methods: {
    getServerData() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        const res = {
          categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
          series: [
            {
              name: '成交量A',
              data: [35, 16, 25, 37, 11, 20],
            },
          ],
        }
        this.drawCharts('my-charts', res)
      }, 500)
    },
    drawCharts(id, data) {
      // 这里的 686 对应 css .charts 的 width
      this.cWidth = uni.rpx2px(686)
      // 这里的 450 对应 css .charts 的 height
      this.cHeight = uni.rpx2px(450)
      console.log('this.cWidth', this.cWidth)
      console.log('this.cHeight', this.cHeight)
      const ctx = uni.createCanvasContext(id, this)
      ctx.width = this.cWidth
      ctx.height = this.cHeight
      // eslint-disable-next-line new-cap
      uChartsInstance[id] = new uCharts({
        type: 'area',
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        categories: data.categories,
        series: data.series,
        animation: true,
        color: ['#FF4080'],
        padding: [15, 15, 0, 5],
        disableGrid: true,
        enableScroll: false,
        dataPointShape: false,
        dataLabel: false,
        legend: {
          show: false,
          background: '#FFFFFF',
          backgroundColor: '#FFFFFF',
        },
        xAxis: {
          disableGrid: true,
          boundaryGap: 'justify',
        },
        yAxis: {
          gridColor: '#E6E6E6',
        },
        extra: {
          tooltip: {
            showBox: false,
          },
          area: {
            type: 'curve',
            opacity: 0.5,
            addLine: true,
            width: 1,
            gradient: true,
            activeType: 'hollow',
          },
        },
      })
    },
    tap(e) {
      uChartsInstance[e.target.id].touchLegend(e)
      uChartsInstance[e.target.id].showToolTip(e)
    },
    tabClick(num) {
      this.tabActive = num
    },
  },
}
</script>

<template>
  <view class="charts-title">
    近30天推广数据
  </view>
  <view class="charts-box">
    <view class="charts-tabs">
      <view :class="tabActive === 1 ? 'active-tab' : ''" @click="tabClick(1)">
        <view class="charts-tab-title">
          日销量
        </view>
        <view class="charts-num">
          100 - 500
        </view>
      </view>
      <view :class="tabActive === 2 ? 'active-tab' : ''" @click="tabClick(2)">
        <view class="charts-tab-title">
          浏览量
        </view>
        <view class="charts-num">
          5000 - 10w
        </view>
      </view>
      <view :class="tabActive === 3 ? 'active-tab' : ''" @click="tabClick(3)">
        <view class="charts-tab-title">
          推广达人
        </view>
        <view class="charts-num">
          50 - 200
        </view>
      </view>
    </view>
    <canvas id="my-charts" canvas-id="my-charts" class="charts" @touchend="tap" />
  </view>
</template>

<style scoped lang="scss">
.charts-title{
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #000000;
  line-height: 28rpx;
  font-style: normal;
  margin: 32rpx 0 24rpx 0;
}
.charts-tabs{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48rpx 16rpx 48rpx;
  .charts-tab-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20rpx;
    color: #999999;
    line-height: 20rpx;
    text-align: left;
    font-style: normal;
    margin-bottom: 10rpx;
  }
  .charts-num{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #444444;
    line-height: 28rpx;
    text-align: left;
    font-style: normal;
  }
  .active-tab{
    .charts-tab-title{
      color: #FF0057;
    }
    .charts-num{
      color: #FF0057;
    }
  }
}
.charts-box{
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx 0;
}
.charts{
  width: 100%;
  height: 450rpx;
}
</style>
