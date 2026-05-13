<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import AddressParse from 'zh-address-parse'
import { useLayoutStore } from '@/stores'
import { useColPickerData } from '@/composables/useColPickerData'
import { addressAdd, addressEdit, getAddressDetail } from '@/api/address'
import { getArea, getParentCode } from '@/api/common'

const { findChildrenByCode } = useColPickerData()

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const route = useRoute()
const select = computed(() => {
  return route.params?.select
})
const { success: showSuccess } = useToast()
const type = ref<string>('add')
const editId = ref<string | number>()

const dizhistring = ref<string>('')
const errProps = ref<string[]>([])
const province = ref<any[]>([])
const city = ref<any[]>([])
const area = ref<any[]>([])
const model = reactive<{
  name: string
  phone: string
  areaCode: string[]
  detail: string
  isDefault: string
}>({
  name: '',
  phone: '',
  areaCode: [],
  detail: '',
  isDefault: '1',
})
onLoad((options) => {
  type.value = options?.type || 'add'
  if (type.value === 'edit') {
    getDetail(options?.id)
  }
  else {
    getSysList()
  }
})
function getDetail(id: number) {
  getAddressDetail({ id }).then((res) => {
    if (res.code === 0) {
      editId.value = res.data.id
      model.name = res.data.name
      model.phone = res.data.phone
      model.areaCode = [res.data.areaCodeLevel1, res.data.areaCodeLevel2, res.data.areaCodeLevel3]
      model.detail = res.data.detail
      model.isDefault = res.data.isDefault
      getSysList()
    }
  })
}

async function getSysList() {
  const provinceRes = await getArea({ pCode: 0 })
  if (provinceRes.code === 0) {
    province.value = provinceRes.data
    const code1 = model.areaCode[0] || provinceRes.data[0].code
    const cityRes = await findChildrenByCode(code1)
    if (cityRes.code === 0) {
      city.value = cityRes.data
      const code2 = model.areaCode[1] || cityRes.data[0].code
      const areaRes = await findChildrenByCode(code2)
      if (areaRes.code === 0) {
        area.value = areaRes.data
      }
    }
  }
}
const columns = computed(() => {
  return [province.value, city.value, area.value]
})

const form = ref()

function handleSubmit() {
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      const data = {
        ...model,
        areaCode: model.areaCode[2],
      }
      if (type.value === 'add') { // 新增
        addressAdd({ ...data }).then((res) => {
          if (res.code === 0) {
            if (select.value) {
              uni.navigateBack()
              return
            }
            showSuccess({
              msg: res.msg,
            })
            uni.navigateTo({
              url: '/pageRank/addressSuccess/index',
              events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                backEvent() {
                  model.name = ''
                  model.phone = ''
                  model.areaCode = []
                  model.detail = ''
                  model.isDefault = '1'
                  nextTick(() => {
                    form.value.reset()
                  })
                },
              },
            })
          }
        })
      }
      else { // 修改
        addressEdit({ ...data, id: editId.value }).then((res) => {
          if (res.code === 0) {
            showSuccess({
              msg: res.msg,
              duration: 1000,
              cover: true,
              closed: () => {
                uni.navigateBack()
              },
            })
          }
        })
      }
    }
    else {
      console.log(errors, 'errors')
      errProps.value = errors.map((item: any) => {
        return item.prop
      })
    }
  }).catch((error: any) => {
    console.log(error, 'error')
  })
}
function handleClickLeft() {
  uni.navigateBack()
}
async function onChangeDistrict(pickerView: any, value: any, columnIndex: any, resolve: any) {
  const item = value[columnIndex]
  if (columnIndex === 0) {
    const cityRes = await findChildrenByCode(item.code)
    if (cityRes.code === 0) {
      pickerView.setColumnData(1, cityRes.data)
      const areaRes = await findChildrenByCode(cityRes.data[0].code)
      if (areaRes.code === 0) {
        pickerView.setColumnData(2, areaRes.data)
      }
    }
  }
  else if (columnIndex === 1) {
    const areaRes = await findChildrenByCode(item.code)
    if (areaRes.code === 0) {
      pickerView.setColumnData(2, areaRes.data)
    }
  }
  resolve()
}

function displayFormat(items: any) {
  const str = items.map((item: any) => {
    return item.name
  }).join('-')
  return str
}

function zhantie() {
  uni.getClipboardData({
    success(res) {
      dizhistring.value = res.data
      selectAddress(res.data)
    },
  })
}

function selectAddress(text: string) {
  const options: any = {
    type: 1, // 哪种方式解析，0：正则，1：树查找
    textFilter: [], // 预清洗的字段
    nameMaxLength: 4, // 查找最大的中文名字长度
  }
  const parseResult: any = AddressParse(text, options)
  model.name = parseResult.name
  model.phone = parseResult.phone
  model.detail = parseResult.detail
  getParentCode({ sCode: parseResult.areaCode }).then((res) => {
    if (res.code === 0) {
      const arr: any[] = res.data || []
      model.areaCode = arr.map(item => item.code)
      getSysList()
    }
  })
}
function chongzhi() {
  dizhistring.value = ''
}
</script>

<template>
  <wd-navbar :title="type === 'add' ? '添加地址' : '编辑地址'" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="form-wrapper">
    <view class="dizhibox">
      <wd-textarea v-model="dizhistring" placeholder="请粘贴地址识别" />
      <view v-if="dizhistring" class="ztbox ztboxs">
        <wd-button size="small" type="info" custom-class="custom-btncz" @click="chongzhi">
          重置
        </wd-button>
        <wd-button size="small" custom-class="custom-btnsb" @click="selectAddress(dizhistring)">
          识别
        </wd-button>
      </view>
      <view v-else class="ztbox">
        <wd-button size="small" custom-class="custom-btntext" @click="zhantie">
          粘贴并识别
        </wd-button>
      </view>
    </view>
    <wd-form ref="form" :model="model" error-type="message">
      <wd-cell-group>
        <wd-input
          v-model="model.name"
          label="收件人名称"
          prop="name"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入收件人名称' }]"
        />
        <wd-input
          v-model="model.phone"
          label="收件电话"
          prop="phone"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入收件电话' },
                   { required: false, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的电话' },
          ]"
        />
        <wd-picker
          v-if="province.length && city.length && area.length"
          v-model="model.areaCode"
          :columns="columns"
          label="收件地区"
          placeholder="请选择"
          prop="areaCode"
          value-key="code"
          label-key="name"
          :column-change="onChangeDistrict"
          :display-format="displayFormat"
          :rules="[{ required: true, message: '请选择收件地区', validator: (value) => value && value.length > 0 }]"
        />
        <wd-input
          v-model="model.detail"
          label="详细地址"
          prop="detail"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        />
        <wd-gap bg-color="#F8F8F8" height="16rpx" />
        <wd-cell title="设为默认地址" prop="isDefault" center>
          <view class="mycell">
            <wd-switch v-model="model.isDefault" active-value="2" inactive-value="1" size="48rpx" active-color="#41C06E" />
          </view>
        </wd-cell>
      </wd-cell-group>
    </wd-form>
  </view>
  <FootButton label="保存地址" fixed @confirm="handleSubmit" />
</template>

<style scoped lang="scss">
.form-wrapper{
  .dizhibox{
    background-color: #fff;
    border: 1rpx solid #E6E6E6;
    border-radius: 16rpx;
    margin: 16rpx;
    overflow: hidden;
    .ztboxs{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12rpx;
      padding-bottom: 8rpx;
    }
    .ztbox{
      text-align: right;
      padding-right: 24rpx;
    }
    :deep(){
      .custom-btncz{
        font-family: PingFangSC, PingFang SC;
        border-radius: 20rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        line-height: 24rpx;
        font-style: normal;
      }
      .custom-btnsb{
        font-family: PingFangSC, PingFang SC;
        background: rgba(255, 0, 87, 0.2);
        border-radius: 20rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #FF0057;
        line-height: 24rpx;
        font-style: normal;
      }
      .custom-btntext{
        font-family: PingFangSC, PingFang SC;
        background: rgba(255, 0, 87, 0.2);
        border-radius: 10rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #FF0057;
        line-height: 24rpx;
        font-style: normal;
      }
      .wd-textarea{
        height: 148rpx;
        .wd-textarea__value{
          height: 100%;
        }
        .wd-textarea__inner{
          height: 100%;
        }
      }
      .wd-textarea::after {
        display: none !important;
      }
    }
  }
  .mycell{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .drcell{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  :deep(){
    .wd-form{
      margin-top: 16rpx;
    }
    .wd-picker{
      &__label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0,0,0,0.85);
        line-height: 28rpx;
        font-style: normal;
      }
      &__placeholder{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: rgba(0,0,0,0.25);
        line-height: 32rpx;
        font-style: normal;
      }
      &__cell{
        flex-direction: column;
        padding-bottom: 32rpx !important;
      }
      &__body{
        width: 100%;
        margin-top: 16rpx;
      }
      &__value-wraper{
        align-items: center;
      }
      &__value{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: 111111;
        line-height: 32rpx;
        font-style: normal;
      }
      &__label.is-required{
        padding-left: 0 !important;
        &::after{
          display: none;
        }
      }
      &__error-message{
        position: absolute;
        bottom: 6rpx;
        line-height: 1;
      }
    }
    .wd-input{
      flex-direction: column;
      padding-bottom: 32rpx !important;
      &__body{
        width: 100%;
        margin-top: 16rpx;
      }
      &__label-inner{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0,0,0,0.85);
        line-height: 28rpx;
        font-style: normal;
      }
      &__label.is-required{
        padding-left: 0 !important;
        &::after{
          display: none;
        }
      }
      &__error-message{
        position: absolute;
        bottom: 6rpx;
        line-height: 1;
      }
    }
    .myPlaceholder{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0,0,0,0.25);
      line-height: 32rpx;
      font-style: normal;
    }
    .myInput{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: 111111;
      line-height: 32rpx;
      font-style: normal;
    }
    .errorPlaceholder{
      color: rgba(255, 0, 87, 0.25);
    }
    .errorInput{
      color: rgba(255, 0, 87, 1);
    }
    .wd-cell{
      &__left.is-required{
        padding-left: 0px !important;
      }
      &__right{
        margin-top: 16rpx !important;
      }
      .is-required::after {
        display: none;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "addAddress",
  "style": {
    "navigationBarTitleText": "添加地址"
  }
}
</route>
