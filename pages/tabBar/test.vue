
    <template v-if="tabList.length">
        <view class="open-card" v-for="(item, index) in tabList" :key="index">
            <view class="award-wrap">
                <view class="award-log-item">
                    <view class="award-log-left">
                        <view class="award-log-time">
                            {{ item.data[0].created_at }}
                        </view>
                        <view class="award-log-info">
                            {{ item.data[0].nickName }} 获得 <text class="award-name">{{ item.data[0].title }}</text>
                        </view>
                    </view>
                    <view class="award-log-right">
                        <image class="award-log-img" :src="item.data[0].thumb" mode="widthFix" lazy-load="false"
                            binderror="" bindload="" />
                    </view>
                </view>
                <view @click="getTablist(item.mark_id)">点击显示更多</view>
            </view>
        </view>

        <!-- <mescroll-body ref="mescrollRef" height="400" @init="mescrollInit" @down="downCallback" @up="getList"
            :down="downOption" :up="upOption">
            <view class="award-wrap">
              <view class="award-log-item" v-for="(item, index) in boxLogList" :key="index">
                <view class="award-log-left">
                  <view class="award-log-time">
                    {{ item.created_at }}
                  </view>
                  <view class="award-log-info">
                    {{ item.nickName }} 获得 <text class="award-name">{{ item.title }}</text>
                  </view>
                </view>
                <view class="award-log-right">
                  <image class="award-log-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror=""
                    bindload="" />
                </view>
              </view>
            </view>
          </mescroll-body> -->
    </template>
    <template v-else>
        <view class="empty-list">
            <u-empty text="暂无中赏记录~" mode="list"></u-empty>
        </view>
    </template>

<script>
export default {
    data() {
        return {
            tabList: []
        }
    },
    onload(options) {
        
    },
    onShow() {
        this.getTabs({ num: 1, size: 20 })
     },
    methods: {
        getTabs(
            num,
            size
        ) {
            this.req({
                url: '/v1/box/boxLogList88',
                data: {
                    id: this.optionsData.id,
                    setNo: this.currentIndex + 1,
                    mark_id: this.btnLists.length ? this.btnLists[this.currentItems].id : 0,
                    page: num,
                    per_page: size,
                    sort_by: this.sortType, // 新增：排序字段
                    sort_order: this.sortOrder // 新增：排序方向
                }, Loading: true,
                success: res => {
                    if (res.code == 200) {


                        if (num == 1) {
                            this.tabList = []
                        }
                        if (res.data.length) {
                            console.log(111);
                            this.tabList = [...this.tabList, ...res.data]
                            console.log(this.tabList, '111');

                            // this.boxLogList = [...this.boxLogList, ...res.data.data]
                        }
                    } else {
                        this.mescroll.endBySize(0, 0)
                    }
                }
            })
        },
    }
}
</script>