<script setup lang="ts">
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<MyProps>(), {
  placeholder: '输入名称/ID',
  customFocus: false,
})

const emit = defineEmits(['search', 'clear'])

interface MyProps {
  placeholder?: string
  customFocus?: boolean
}

const modelValue = defineModel<string>({
  required: true,
})
function search() {
  emit('search')
}

function clear() {
  emit('clear')
}

defineExpose({
  onShow,
})
</script>

<template>
  <view class="mysearch">
    <wd-search
      key="search2"
      v-model="modelValue"
      custom-input-class="inputClass"
      placeholder-class="placeholderClass"
      placeholder-left
      :focus="customFocus"
      :placeholder="props.placeholder"
      @search="search"
      @clear="clear"
    >
      <template #suffix>
        <div class="sousuo">
          <wd-button size="small" @click="search">
            搜索
          </wd-button>
        </div>
      </template>
    </wd-search>
  </view>
</template>

<style lang="scss" scoped>
.mysearch{
  width: 100%;
  box-sizing: border-box;
  :deep(.wd-search){
    background: rgba(255,255,255,1);
    padding: 0px !important;
    border-radius: 44rpx;
    border: 4rpx solid #000000;
    overflow: hidden;
    .inputClass{
      background: rgba(255,255,255,0);
    }
    .wd-search__block{
      background: rgba(255,255,255,1);
      height: 80rpx;
      .wd-search__field,.wd-search__cover{
        background: transparent;
      }
    }
    .wd-icon-search{
      position: absolute;
      left: 20rpx;
      color: #000000;
      font-weight: 400;
      font-size: 28rpx;
    }
    .placeholderClass{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
      font-style: normal;
    }
    .sousuo{
      display: flex;
      align-items: center;
      .wd-button{
        background-color: #FF0056;
        color: #fff;
        font-size: 28rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        margin-right: 14rpx;
      }
    }
  }
}
</style>
