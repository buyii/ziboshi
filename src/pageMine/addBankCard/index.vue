<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { useLayoutStore } from '@/stores'
import { addBankCard, editBankCard } from '@/api/bank'
import { getDictList } from '@/api/common'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const { success: showSuccess } = useToast()

const route = useRoute()
const editData = computed(() => {
  return route.params?.data
})
const errProps = ref<string[]>([])
const selectList = ref<any>([])
const editId = ref<string>('')
const model = reactive<{
  cardHolder: string
  cardNumber: string
  bank: string
  branch: string
  identityCard: string
  phone: string
}>({
  cardHolder: '',
  cardNumber: '',
  bank: '',
  branch: '',
  identityCard: '',
  phone: '',
})

const form = ref()

function onSubmit() {
  const params = {
    ...model,
  }
  addBankCard(params).then((res) => {
    if (res.code === 0) {
      showSuccess({
        msg: '添加成功',
      })
      uni.navigateBack()
    }
  })
}
function onEditSubmit() {
  const params = {
    id: editId.value,
    ...model,
  }
  editBankCard(params).then((res) => {
    if (res.code === 0) {
      showSuccess({
        msg: res.msg,
      })
      uni.navigateBack()
    }
  })
}
function handleSubmit() {
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      if (editData.value) {
        onEditSubmit()
        return
      }
      onSubmit()
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

onLoad((options) => {
  const data = options?.data
  if (data) {
    editId.value = JSON.parse(data).id
    model.cardHolder = JSON.parse(data).cardHolder
    model.cardNumber = JSON.parse(data).cardNumber
    model.bank = JSON.parse(data).bank
    model.branch = JSON.parse(data).branch
    model.identityCard = JSON.parse(data).identityCard
    model.phone = JSON.parse(data).phone
  }
})

onLoad(() => {
  getDictList({
    dictType: 'bank',
  }).then((res) => {
    if (res.code === 0) {
      selectList.value = res.data
    }
  })
})
</script>

<template>
  <wd-navbar :title="editData ? '编辑银行卡' : '添加银行卡'" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="form-wrapper">
    <wd-form ref="form" :model="model" error-type="message">
      <wd-cell-group>
        <wd-input
          v-model="model.cardHolder"
          label="持卡人"
          :cursor-spacing="100"
          prop="cardHolder"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入持卡人' }]"
        />
        <wd-input
          v-model="model.cardNumber"
          label="卡号"
          :cursor-spacing="100"
          prop="cardNumber"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入卡号' },
                   { required: false, pattern: /^([1-9]{1})(\d{14,18})$/, message: '请输入正确的卡号' },
          ]"
        />
        <wd-picker
          v-model="model.bank"
          label="开户行"
          placeholder="请选择开户行"
          value-key="dictValue"
          label-key="dictLabel"
          prop="bank"
          :columns="selectList"
          :rules="[{ required: true, message: '请选择开户行' }]"
        />
        <wd-input
          v-model="model.branch"
          label="所属支行"
          prop="branch"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入所属支行' }]"
        />
        <wd-input
          v-model="model.identityCard"
          label="身份证号"
          prop="identityCard"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入身份证号' },
                   { required: false, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' },
          ]"
        />
        <wd-input
          v-model="model.phone"
          label="预留手机号"
          prop="phone"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入手机号' },
                   { required: false, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的联系方式' },
          ]"
        />
      </wd-cell-group>
    </wd-form>
  </view>
  <FootButton label="确 认" fixed @confirm="handleSubmit" />
</template>

<style scoped lang="scss">
.form-wrapper{
  :deep(){
    .wd-form{
      margin-top: 16rpx;
    }
    .wd-input{
      flex-direction: column;
      // padding-top: 0 !important;
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
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "addBankCard",
  "style": {
    "navigationBarTitleText": "添加银行卡"
  }
}
</route>
