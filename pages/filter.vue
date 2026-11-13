<script setup>
const activeTab = ref(0)

// 一级分类
const tabs = ['全部', '手机数码', '电脑办公', '家用电器', '服饰鞋包', '美妆护肤', '食品生鲜']

// 每个 tab 对应的右侧选项
const panels = [
  {
    title: '排序方式',
    type: 'single',
    options: ['综合推荐', '销量优先', '价格从低到高', '价格从高到低', '上新时间']
  },
  {
    title: '品牌',
    type: 'multi',
    options: ['Apple', '华为', '小米', '三星', 'OPPO', 'vivo', '一加', '魅族']
  },
  {
    title: '价格区间',
    type: 'single',
    options: ['0-1000', '1000-3000', '3000-5000', '5000-8000', '8000以上']
  },
  {
    title: '规格',
    type: 'multi',
    options: ['128GB', '256GB', '512GB', '1TB', '黑色', '白色', '蓝色', '金色']
  },
  {
    title: '适用场景',
    type: 'multi',
    options: ['办公', '游戏', '拍照', '续航', '轻薄', '大屏']
  }
]

const selected = ref({})  // { tabIndex: Set of option indexes }

function toggle(tabIdx, optIdx) {
  if (!selected.value[tabIdx]) selected.value[tabIdx] = new Set()
  const set = selected.value[tabIdx]
  if (panels[tabIdx].type === 'single') {
    set.clear()
    set.add(optIdx)
  } else {
    if (set.has(optIdx)) set.delete(optIdx)
    else set.add(optIdx)
  }
}

function isSelected(tabIdx, optIdx) {
  return selected.value[tabIdx]?.has(optIdx)
}

function reset() {
  selected.value = {}
}

function selectedCount() {
  return Object.values(selected.value).reduce((s, set) => s + set.size, 0)
}
</script>

<template>
  <div class="page">
    <!-- 手机外壳 -->
    <div class="phone">
      <!-- 顶部导航 -->
      <div class="navbar">
        <div class="back">‹</div>
        <div class="search">搜索商品</div>
        <div class="more">⋯</div>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <span class="f-item">综合推荐 ▾</span>
        <span class="f-item">销量 ▾</span>
        <span class="f-item active">筛选 ⚙</span>
      </div>

      <!-- 主体：左侧 tab + 右侧选项 -->
      <div class="body">
        <div class="left">
          <div
            v-for="(t, i) in tabs"
            :key="i"
            class="left-item"
            :class="{ active: activeTab === i }"
            @click="activeTab = i"
          >{{ t }}</div>
        </div>
        <div class="right">
          <div v-if="panels[activeTab]" class="panel">
            <div class="panel-title">{{ panels[activeTab].title }}</div>
            <div class="options">
              <div
                v-for="(opt, j) in panels[activeTab].options"
                :key="j"
                class="opt"
                :class="{ selected: isSelected(activeTab, j) }"
                @click="toggle(activeTab, j)"
              >{{ opt }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="action-bar">
        <div class="reset" @click="reset">重置</div>
        <div class="confirm">确定 ({{ selectedCount() }})</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page{
  min-height:100vh;background:#f0f2f5;display:flex;align-items:center;justify-content:center;padding:20px;
}
.phone{
  width:375px;background:#fff;border-radius:24px;overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,.15);
  display:flex;flex-direction:column;height:720px;
}

/* 顶部导航 */
.navbar{
  height:48px;background:#fff;display:flex;align-items:center;gap:12px;
  padding:0 16px;border-bottom:1px solid #f0f0f0;flex-shrink:0;
}
.back{font-size:24px;color:#333;width:24px}
.search{
  flex:1;height:32px;background:#f5f5f5;border-radius:16px;
  display:flex;align-items:center;padding:0 12px;font-size:13px;color:#999;
}
.more{font-size:20px;color:#333}

/* 筛选栏 */
.filter-bar{
  height:44px;display:flex;align-items:center;gap:24px;padding:0 16px;
  border-bottom:1px solid #f0f0f0;flex-shrink:0;background:#fff;
}
.f-item{font-size:14px;color:#333}
.f-item.active{color:#ff2442;font-weight:500}

/* 主体 */
.body{flex:1;display:flex;overflow:hidden}

/* 左侧 tab */
.left{
  width:90px;background:#f7f7f7;overflow-y:auto;flex-shrink:0;
}
.left-item{
  padding:14px 8px;font-size:13px;color:#666;text-align:center;
  cursor:pointer;position:relative;
}
.left-item.active{
  background:#fff;color:#ff2442;font-weight:500;
}
.left-item.active::before{
  content:"";position:absolute;left:0;top:12px;bottom:12px;width:3px;
  background:#ff2442;border-radius:0 2px 2px 0;
}

/* 右侧选项 */
.right{flex:1;padding:16px;background:#fff;overflow-y:auto}
.panel-title{font-size:13px;color:#999;margin-bottom:12px}
.options{display:flex;flex-wrap:wrap;gap:8px}
.opt{
  padding:6px 14px;background:#f7f7f7;border-radius:4px;
  font-size:13px;color:#333;cursor:pointer;transition:all .15s;
}
.opt.selected{
  background:#ff244210;color:#ff2442;border:1px solid #ff2442;
  padding:5px 13px;
}

/* 底部操作栏 */
.action-bar{
  height:56px;border-top:1px solid #f0f0f0;display:flex;flex-shrink:0;
}
.reset{
  flex:1;display:flex;align-items:center;justify-content:center;
  font-size:15px;color:#666;cursor:pointer;
}
.confirm{
  flex:2;display:flex;align-items:center;justify-content:center;
  background:#ff2442;color:#fff;font-size:15px;font-weight:500;cursor:pointer;
}
</style>
