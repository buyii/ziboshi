<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { useLayoutStore } from '@/stores'
import { agentTeamApply } from '@/api/team'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const { success: showSuccess } = useToast()
const promotionlist = ref<any[]>([
  {
    value: '2',
    label: '企业',
  },
  {
    value: '1',
    label: '个人',
  },
])
const errProps = ref<string[]>([])
const loading = ref(false)
const model = reactive<{
  accountType: string
  monthGmv: string
  phone: string
  remark: string
}>({
  accountType: '',
  monthGmv: '',
  phone: '',
  remark: '',
})

const form = ref()

function handleSubmit() {
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      loading.value = true
      const data = {
        ...model,
      }
      agentTeamApply({ ...data }).then((res) => {
        loading.value = false
        if (res.code === 0) {
          showSuccess({
            msg: res.msg,
          })
          uni.navigateBack()
        }
      }).catch(() => [
        loading.value = false,
      ])
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
</script>

<template>
  <wd-navbar title="申请开通" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="form-wrapper">
    <wd-notice-bar :scrollable="false" text="开通此功能后，可享受团队总收益的10%补贴" custom-class="my-notice" color="#000000" background-color="#FFFFFF">
      <template #prefix>
        <img class="prefiximg" src="../../static/svg/home_notice.svg" alt="">
      </template>
    </wd-notice-bar>
    <wd-form ref="form" :model="model" error-type="message">
      <wd-cell-group>
        <wd-picker
          v-model="model.accountType"
          label="我的身份"
          placeholder="请选择我的身份"
          prop="accountType"
          :columns="promotionlist"
          :rules="[{ required: true, message: '请选择我的身份' }]"
        />
        <wd-input
          v-model="model.monthGmv"
          label="月GMV(万元)"
          prop="monthGmv"
          type="digit"
          :maxlength="6"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入月GMV' }]"
        />
        <wd-input
          v-model="model.phone"
          label="联系方式"
          prop="phone"
          :cursor-spacing="100"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入联系方式' },
                   { required: false, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的联系方式' },
          ]"
        />
        <wd-textarea
          v-model="model.remark"
          label="备注"
          prop="remark"
          :auto-height="true"
          :cursor-spacing="100"
          :show-confirm-bar="false"
          placeholder-class="myPlaceholder"
          custom-input-class="myInput"
          placeholder="请输入"
        />
      </wd-cell-group>
    </wd-form>
  </view>
  <FootButton label="提 交" :loading="loading" fixed @confirm="handleSubmit" />
</template>

<style scoped lang="scss">
.form-wrapper{
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
  .prefiximg{
    width: 58rpx;
    height: 42rpx;
    margin-right: 18rpx;
  }
  :deep(){
    .my-notice{
      .wd-notice-bar__content{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #000000;
        line-height: 28rpx;
        font-style: normal;
      }
    }
    .wd-form{
      margin-top: 24rpx;
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
    .wd-textarea{
      flex-direction: column;
      padding-bottom: 32rpx !important;
      &__value{
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
  "name": "myteamAdd",
  "style": {
    "navigationBarTitleText": "申请开通"
  }
}
</route>
