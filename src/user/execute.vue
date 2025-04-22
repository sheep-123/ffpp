<template>
  <view class="box">
    <u-navbar
      autoBack
      leftText="赛事执行"
      :fixed="false"
      bgColor="#1b4ca7"
      leftIconColor="#fff"
    >
    </u-navbar>
    <view style="margin-left: 5%">
      <u-scroll-list :indicator="false" v-if="gameList.length > 0">
        <view class="tick">
          <view
            v-for="(item, index) in gameList"
            :key="index"
            :class="op == index ? 'item-a' : 'item'"
            @click="checkThis(index)"
          >
            {{ item.scheTypeName }}
          </view>
        </view>
      </u-scroll-list>
    </view>

    <view class="main">
      <view class="jdsz" @click="gameList[op].isSave = !gameList[op].isSave"
        >阶段设置
        <u-icon
          name="arrow-up-fill"
          color="#fff"
          size="10"
          v-if="gameList[op].isSave"
        ></u-icon>
        <u-icon name="arrow-down-fill" color="#fff" size="10" v-else></u-icon>
      </view>

      <view class="o-text" v-if="!gameList[op].isSave">
        <view class="item">
          <view class="left">本阶段 <view class="icon">*</view></view>

          <view class="right">
            <view class="select"
              ><text :style="{ color: zzName ? 'black' : '' }">
                {{ zzName }} </text
              ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
            ></view>
            <view class="stageExplains">{{ stageUserNum }}</view>
          </view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left"> 玩家分组设置 <view class="icon">*</view> </view>
          </view>
          <view class="bt">
            <view class="left">
              <view class="l1">组数</view>
              <view
                class="l2"
                style="margin-left: 20px"
                :style="group_num ? 'color: black;' : ''"
                >{{ group_num }}
                <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
              </view>
            </view>

            <view class="right">
              <view class="r1">匹配方式</view>

              <view class="r2" style="margin-left: 20px"
                >随机
                <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
              </view>
            </view>
          </view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left"> 分组场地设置 <view class="icon">*</view> </view>
          </view>
          <view class="bt">
            <u-radio-group v-model="groupVenueType" placement="row" disabled>
              <u-radio
                activeColor="#EC384A"
                label="系统订单匹配"
                name="1"
                shape="circle"
              ></u-radio>
              <u-radio
                activeColor="#EC384A"
                label="人工添加"
                name="2"
                shape="circle"
                customStyle="margin-left: 100px"
              ></u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left"> 分组裁判设置 <view class="icon">*</view> </view>
          </view>
          <view class="bt">
            <u-radio-group v-model="groupUmpireType" placement="row" disabled>
              <u-radio
                activeColor="#EC384A"
                label="系统随机匹配"
                name="1"
                shape="circle"
              ></u-radio>
              <u-radio
                activeColor="#EC384A"
                label="根据场地1对1匹配"
                shape="circle"
                name="2"
                customStyle="margin-left: 40px"
              ></u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left"> 选择计分方式 <view class="icon">*</view> </view>
          </view>
          <view class="bt-radio">
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod" disabled>
                <u-radio
                  activeColor="#EC384A"
                  label="积分"
                  name="1"
                  shape="circle"
                ></u-radio>
              </u-radio-group>
            </view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod" disabled>
                <u-radio
                  activeColor="#EC384A"
                  label="时间"
                  name="2"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod" disabled>
                <u-radio
                  activeColor="#EC384A"
                  label="距离"
                  name="3"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod" disabled>
                <u-radio
                  activeColor="#EC384A"
                  label="分数"
                  name="4"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod" disabled>
                <u-radio
                  activeColor="#EC384A"
                  label="重量"
                  name="5"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod" disabled>
                <u-radio
                  activeColor="#EC384A"
                  label="胜负"
                  name="6"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
          </view>
        </view>
      </view>

      <view
        class="pp"
        @click="pp"
        v-if="!groups[0].list[0].userId && !gameList[op].isSave"
        >开始匹配</view
      >

      <view
        class="pp-content"
        v-if="preview == 1 && lookStatus"
        v-for="(item, index) in groups"
        :key="index"
      >
        <view class="first">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="item.umpireAvatarUrl" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right" @click="chooseAddress1(item)">
            {{ item.address
            }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
          ></view>
        </view>
        <view class="sixth">
          <view class="top">比赛时间 <view class="icon">*</view></view>
          <view class="next">
            <view class="time" @click="chooseTime1(item)">{{
              item.startTime
            }}</view
            >至
            <view class="time" @click="chooseTime2(item)">{{
              item.endTime
            }}</view>
          </view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <input
            type="text"
            placeholder="请输入直播地址"
            placeholder-class="pl-class2"
            class="input"
            v-model="item.liveUrl"
          />
        </view>
        <view class="member">
          <view class="item" v-for="(user, UIndex) in item.list" :key="UIndex">
            <view class="avatar" @click="toggleTooltip(`${index}-${UIndex}`)">
              <u-avatar :src="user.avatarUrl" size="40"></u-avatar>
              <view class="rank">{{ user.userNumber || "参赛号" }}</view>
              <view
                class="tooltip"
                v-if="activeTooltipIndex === `${index}-${UIndex}`"
              >
                <view class="title">设置排名 <view class="icon"></view></view>
                <view class="item"> 8强 </view>
                <view class="item"> 第4名 </view>
                <view class="item"> 季军 </view>
                <view class="item"> 亚军 </view>
                <view class="item"> 无 </view>
              </view>
            </view>

            <view class="name">{{ user.username || "选手名称" }}</view>
            <view class="select" v-if="scoringMethod == 1">
              {{ user.userScore || "积分" }}
              <view class="icon"></view>
            </view>
            <view class="time" v-if="scoringMethod == 2">
              3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
            </view>
            <view class="time" v-if="scoringMethod == 3">
              12 <text>米</text>
            </view>
            <view class="time" v-if="scoringMethod == 4">
              89 <text>分</text>
            </view>
            <view class="time" v-if="scoringMethod == 5">
              3 <text>千克</text>
            </view>
            <view class="select" v-if="scoringMethod == 6">
              设置
              <view class="icon"></view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="pp-content"
        v-show="preview == 2 && lookStatus"
        v-for="(item, index) in groups"
        :key="index"
      >
        <view class="first">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="item.umpireAvatarUrl" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right" @click="chooseAddress1(item)"
            >{{ item.address
            }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
          ></view>
        </view>
        <view class="sixth">
          <view class="top">比赛时间 <view class="icon">*</view></view>
          <view class="next">
            <view class="time" @click="chooseTime1(item)">{{
              item.startTime
            }}</view
            >至
            <view class="time" @click="chooseTime2(item)">{{
              item.endTime
            }}</view>
          </view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <input
            type="text"
            placeholder="请输入直播地址"
            placeholder-class="pl-class2"
            class="input"
            v-model="item.liveUrl"
          />
        </view>

        <view class="fourth">
          <view class="item">参赛号</view>
          <view class="item">参赛选手</view>
          <view class="item">成绩（环）</view>
          <view class="item">排名</view>
        </view>

        <view class="fifth">
          <view class="item" v-for="(user, UIndex) in item.list" :key="UIndex">
            <view class="num">{{ user.userNumber || "参赛号" }}</view>
            <view class="avatar">
              <u-avatar :src="user.avatarUrl"></u-avatar>
            </view>
            <view class="grade"></view>
            <view class="rank">_</view>
          </view>
        </view>
      </view>

      <view
        class="pp-content"
        v-show="preview == 3 && lookStatus"
        style="padding-bottom: 0"
        v-for="(item, index) in groups"
        :key="index"
      >
        <view class="first">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="item.umpireAvatarUrl" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right" @click="chooseAddress1(item)"
            >{{ item.address
            }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
          ></view>
        </view>
        <view class="sixth">
          <view class="top">比赛时间 <view class="icon">*</view></view>
          <view class="next">
            <view class="time" @click="chooseTime1(item)">{{
              item.startTime
            }}</view
            >至
            <view class="time" @click="chooseTime2(item)">{{
              item.endTime
            }}</view>
          </view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <input
            type="text"
            placeholder="请输入直播地址"
            placeholder-class="pl-class2"
            class="input"
            v-model="item.liveUrl"
          />
        </view>
        <view class="member">
          <view class="item" v-for="(user, UIndex) in item.list" :key="UIndex">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">{{ item.userNumber || "参赛号" }}</view>
            </view>
            <view class="name">{{ user.username || "选手名称" }}</view>

            <view class="select" v-if="scoringMethod == 1">
              {{ user.userScore || "积分" }}
              <view class="icon"></view>
            </view>
            <view class="time" v-if="scoringMethod == 2">
              3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
            </view>
            <view class="time" v-if="scoringMethod == 3">
              12 <text>米</text>
            </view>
            <view class="time" v-if="scoringMethod == 4">
              89 <text>分</text>
            </view>
            <view class="time" v-if="scoringMethod == 5">
              3 <text>千克</text>
            </view>
            <view class="select" v-if="scoringMethod == 6">
              设置
              <u-icon name="arrow-down-fill" color="black" size="8"></u-icon>
            </view>
          </view>
        </view>

        <u-divider text="对战详情"></u-divider>
        <view
          class="item-list"
          v-for="(war, WIndex) in item.warList"
          :key="warIndex"
          v-if="item.expand"
        >
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">{{ user.username || "选手名称" }}</view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">{{ user.username || "选手名称" }}</view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第{{ WIndex + 1 }}场</view>
          </view>
          <view class="sixth">
            <view class="top">比赛时间 <view class="icon">*</view></view>
            <view class="next" style="margin: 0">
              <view class="time" @click="chooseTime1(item.warList[0])">{{
                war.startTime
              }}</view
              >至
              <view class="time" @click="chooseTime2(item.warList[0])">{{
                war.endTime
              }}</view>
            </view>
          </view>
        </view>

        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片展开.png"
          mode="scaleToFill"
          style="width: 80px; height: 16px; margin: auto; display: block"
          @click="changeExpand(item)"
          v-if="!item.expand"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片收起.png"
          mode="scaleToFill"
          style="width: 80px; height: 16px; margin: auto; display: block"
          @click="changeExpand(item)"
          v-else
        />
      </view>

      <view
        class="pp-content"
        v-show="preview == 4 && lookStatus"
        v-for="(item, index) in groups"
        :key="index"
      >
        <view class="first">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right" @click="chooseAddress1(item)"
            >{{ item.address
            }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
          ></view>
        </view>
        <view class="sixth">
          <view class="top">比赛时间 <view class="icon">*</view></view>
          <view class="next">
            <view class="time" @click="chooseTime1(item)">{{
              item.startTime
            }}</view
            >至
            <view class="time" @click="chooseTime2(item)">{{
              item.endTime
            }}</view>
          </view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <input
            type="text"
            placeholder="请输入直播地址"
            placeholder-class="pl-class2"
            class="input"
            v-model="item.liveUrl"
          />
        </view>
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="pp-content"
        v-show="preview == 5 && lookStatus"
        v-for="(item, index) in groups"
        :key="index"
      >
        <view class="first">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="zc">主场</view>
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="kc">客场</view>
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right" @click="chooseAddress1(item)"
            >{{ item.address
            }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
          ></view>
        </view>
        <view class="sixth">
          <view class="top">比赛时间 <view class="icon">*</view></view>
          <view class="next">
            <view class="time" @click="chooseTime1(item)">{{
              item.startTime
            }}</view
            >至
            <view class="time" @click="chooseTime2(item)">{{
              item.endTime
            }}</view>
          </view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <input
            type="text"
            placeholder="请输入直播地址"
            placeholder-class="pl-class2"
            class="input"
            v-model="item.liveUrl"
          />
        </view>

        <view class="first" style="margin-top: 30px">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="zc1">主场</view>
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="kc1">客场</view>
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第2场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right"
            >天河体育中心羽毛球馆<u-icon
              name="arrow-right"
              color="#CCCCCC"
              size="12"
            ></u-icon
          ></view>
        </view>
        <view class="second">
          <view class="left">比赛时间 <view class="icon">*</view></view>
          <view class="right"
            >10月12日 14:00<u-icon
              name="arrow-right"
              color="#CCCCCC"
              size="12"
            ></u-icon
          ></view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <view class="right">https://v.douyin.com/iA23Phvv/7@7.com :9pm</view>
        </view>
      </view>

      <view
        class="pp-content"
        v-show="preview == 6 && lookStatus"
        v-for="(item, index) in groups"
        :key="index"
      >
        <view class="first">
          <view class="left">
            组名
            <view class="h">{{ item.groupName }}</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right" @click="chooseAddress1(item)"
            >{{ item.address
            }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
          ></view>
        </view>
        <view class="sixth">
          <view class="top">比赛时间 <view class="icon">*</view></view>
          <view class="next">
            <view class="time" @click="chooseTime1(item)">{{
              item.startTime
            }}</view
            >至
            <view class="time" @click="chooseTime2(item)">{{
              item.endTime
            }}</view>
          </view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <input
            type="text"
            placeholder="请输入直播地址"
            placeholder-class="pl-class2"
            class="input"
            v-model="item.liveUrl"
          />
        </view>
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">参赛号</view>
              </view>
              <view class="name">选手昵称</view>
              <view class="grade">积分0</view>
            </view>
          </view>
        </view>
      </view>

      <view class="pp" @click="save4" v-if="!groups[0].list[0].userId"
        >保存</view
      >

      <view class="next" v-if="groups[0].list[0].userId">
        <view class="item">保存</view>
        <view class="item">执行下一轮</view>
      </view>
    </view>
    <u-picker
      :show="show21"
      :columns="columns21"
      @cancel="show21 = false"
      @confirm="confirm21"
    ></u-picker>
    <u-datetime-picker
      :show="timeShow"
      v-model="date"
      mode="datetime"
      @cancel="timeShow = false"
      @confirm="confirm25"
    ></u-datetime-picker>
    <u-datetime-picker
      :show="timeShow1"
      v-model="date"
      mode="datetime"
      @cancel="timeShow1 = false"
      @confirm="confirm26"
    ></u-datetime-picker>
    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      columns21: [],
      op: 0,
      gameList: [],
      way: 1, //，1-未开始  2-执行中
      expand: false,
      show21: false,
      zz: "",
      zzName: "",
      stageExplains: "",
      groupVenueType: "1",
      groupUmpireType: "1",
      scoringMethod: "1",
      columns11: [],
      group_num: null,
      group_num_name: null,
      view: null,
      gameList: [],
      matchId: "",
      stageUserNum: "",
      groups: [],
      preview: "",
      serialNum: "",
      szList: [],
      timeShow: false,
      timeShow1: false,
      currentTime: null,
      activeTooltipIndex: null,
      date: Date.now(),
      lookStatus: false,
    };
  },
  onLoad(options) {
    if (options.matchId) {
      this.matchId = options.matchId;
    }
    if (options.serialNum) {
      this.serialNum = options.serialNum;
    }
    this.getSzList();
    this.getGroupNum();
    this.getGame();
  },
  methods: {
    async getGroupNum() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "group_num",
        },
      });
      var arr = [];
      result.data.map((item, index) => {
        arr.push(item.value);
      });
      this.columns11 = [arr];
    },
    async getGame() {
      var result = await uni.$u.http.get("/match/getMatchScheTypeInfo", {
        params: {
          matchId: this.matchId,
        },
      });
      if (result.status == 200) {
        this.gameList = result.data.map((item) => {
          item.isSave = false;
          return item;
        });
        this.queryMatchHitConfig();
        this.getMatchHitGroup();
      }
    },
    async getSzList() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "matching_manner",
        },
      });
      if (result.status == 200) {
        this.szList = result.data.map((item) => {
          return item.label;
        });
        this.columns21 = [this.szList];
      }
    },
    async queryMatchHitConfig() {
      this.zz = "";
      this.stageUserNum = "";
      this.zzName = "";
      this.group_num = "";
      this.groupVenueType = "1";
      this.groupUmpireType = "1";
      this.scoringMethod = "1";
      var result = await uni.$u.http.get("/match/queryMatchHitConfig", {
        params: {
          matchId: this.matchId,
          scheTypeId: this.gameList[this.op].scheId,
        },
      });
      if (result.status == 200) {
        this.zz = result.data[0].matchingManner;
        this.stageUserNum = result.data[0].stageUserNum;
        this.zzName = this.szList[this.zz - 1];
        this.group_num = result.data[0].groupNum;
        this.groupVenueType = result.data[0].groupVenueType;
        this.groupUmpireType = result.data[0].groupUmpireType;
        this.scoringMethod = result.data[0].scoringMethod;
      }
    },
    chooseAddress1(item) {
      uni.chooseLocation({
        success: function (res) {
          item.address = res.address;
        },
        fail: function () {},
        complete: function () {},
      });
    },
    chooseTime1(item) {
      this.timeShow = true;
      this.currentTime = item;
    },
    chooseTime2(item) {
      this.timeShow1 = true;
      this.currentTime = item;
    },
    confirm25(n) {
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      this.currentTime.startTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      this.timeShow = false;
    },
    confirm26(n) {
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      this.currentTime.endTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      this.timeShow1 = false;
    },

    async save4() {
      try {
        // 构造数据的辅助函数
        const buildGroupData = (group) => ({
          id: group.id,
          matchId: this.matchId,
          serialNum: this.serialNum,
          hitId: group.hitId,
          groupNum: group.groupNum,
          groupName: group.groupName,
          warType: group.warType,
          address: group.address,
          startTime: group.startTime,
          endTime: group.endTime,
          liveUrl: group.liveUrl,
          scoringMethod: this.scoringMethod,
          umpireId: group.umpireId,
          list: group.list,
        });

        // 使用 Promise.all 并发处理所有组的更新请求
        const updatePromises = this.groups.map(async (group, index) => {
          try {
            const data = buildGroupData(group);
            const result = await uni.$u.http.put(
              "/match/updateMatchHitGroup",
              data
            );
            if (result.status !== 200) {
              throw new Error(`第 ${index + 1} 组更新失败: ${result.message}`);
            }
            return { success: true, message: result.message };
          } catch (error) {
            return { success: false, message: error.message || "未知错误" };
          }
        });

        // 等待所有请求完成
        const results = await Promise.all(updatePromises);

        // 统计成功和失败的数量
        const successCount = results.filter((res) => res.success).length;

        // 显示提示信息
        if (successCount === this.groups.length) {
          this.$refs.notice.show({
            type: "default",
            message: "保存成功",
          });
          this.gameList[this.op].isSave = true;
        }

        if (this.zz == 3) {
          // 构造数据的辅助函数
          const buildWarData = (group, war) => ({
            id: war.id,
            matchId: war.matchId,
            serialNum: war.serialNum,
            hitId: war.hitId,
            hitGroupId: war.hitGroupId,
            matchesNum: war.matchesNum,
            matchesName: war.matchesName,
            address: group.address,
            startTime: group.startTime,
            endTime: group.endTime,
            liveUrl: group.liveUrl,
            homeUserScore: war.homeUserScore,
            homeUserId: war.homeUserId,
            awayUserId: war.awayUserId,
            awayUserScore: war.awayUserScore,
            unit: war.unit,
            umpireId: war.umpireId,
          });

          // 收集所有需要更新的 war 数据
          const updatePromises = (this.groups || []).flatMap((group) => {
            // 确保 group.warList 是一个数组
            const warList = group.warList || [];
            return warList.map(async (war, j) => {
              try {
                const data = buildWarData(group, war);
                const result = await uni.$u.http.put(
                  "/match/updateMatchHitWar",
                  data
                );
                if (result.status !== 200) {
                  throw new Error(
                    `第 ${j + 1} 场对战更新失败: ${result.message}`
                  );
                }
                return { success: true, message: result.message };
              } catch (error) {
                return { success: false, message: error.message || "未知错误" };
              }
            });
          });

          // 等待所有请求完成
          const results = await Promise.all(updatePromises);

          // 统计成功和失败的数量
          const successCount = results.filter((res) => res.success).length;

          // 显示提示信息
          if (successCount === updatePromises.length) {
            this.$refs.notice.show({
              type: "default",
              message: "保存成功",
            });
            this.gameList[this.op].isSave = true;
          }
        }
      } catch (err) {
        // 全局错误处理
        this.$refs.notice.show({
          type: "default",
          message: err.message || "保存失败，请稍后重试",
        });
      }
    },
    changeExpand(item) {
      item.expand = !item.expand;
    },
    checkThis(index) {
      this.op = index;
      this.queryMatchHitConfig();
      this.lookStatus = false;
      this.getMatchHitGroup();
    },
    pp() {
      this.preview = this.zz;
      this.lookStatus = true;
    },
    toggleTooltip(key) {
      // 如果当前 tooltip 已经显示，则隐藏；否则显示对应索引的 tooltip
      this.activeTooltipIndex = this.activeTooltipIndex === key ? null : key;
    },
    async getMatchHitGroup() {
      this.groups = [];
      var result = await uni.$u.http.post("/match/getMatchHitGroup", {
        matchId: this.matchId,
        hitTypeName: this.gameList[this.op].scheTypeName,
      });
      if (result.status == 200) {
        this.groups = result.data.map((item) => {
          item.expand = false;
          return item;
        });
        if (!this.groups[0].list[0].userId) {
          this.gameList[this.op].isSave = false;
        } else {
          this.gameList[this.op].isSave = true;
        }
        if (this.zz == 3) {
          this.groups.forEach(async (item) => {
            var result = await uni.$u.http.get("/match/getMatchHitWar", {
              params: {
                hitGroupId: item.id,
              },
            });
            item.warList = result.data;
            return item;
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #1b4ca7;
}
.box {
  width: 100vw;
  padding-bottom: 50px;
  background-color: #1b4ca7;
  .tick {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    .item-a {
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 12px;
      color: #ffffff;
      white-space: nowrap;
      box-sizing: border-box;
    }
    .item {
      white-space: nowrap;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: 400;
      font-size: 12px;
      color: rgba(29, 35, 38, 0.5);
      box-sizing: border-box;
    }
  }
  .main {
    width: 90%;
    margin: auto;
    .jdsz {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
    }
    .pp-content {
      background-color: #fff;
      padding: 12px;
      box-sizing: border-box;
      border-radius: 10px;
      margin-top: 28px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px rgba(0, 0, 0, 0.1);
      .first {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;
          width: 50%;
          justify-content: space-between;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 11px;
          .h {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f5f5;
            white-space: nowrap;
            border-radius: 2px;

            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
            padding: 5px 8px;
          }
        }
        .judge {
          margin-top: -40px;
          position: relative;
          .name {
            position: absolute;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
            left: 50%;
            transform: translateX(-50%);
            background-color: black;
            white-space: nowrap;
            padding: 3px 5px;
            clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
            bottom: -10px;
          }
        }
      }
      .second {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #f0f0f0;
        .left {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          .icon {
            color: #ec384a;
          }
        }
        .right {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          width: 60%;
          justify-content: flex-end;
        }
      }
      .third {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        box-sizing: border-box;
        .left {
          white-space: nowrap;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
        }
        .right {
          font-weight: 400;
          font-size: 10px;
          color: #1d2326;
        }
        .input {
          text-align: right;
        }
      }
      .sixth {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f5f5f5;
        padding: 16px 0;
        gap: 12px;
        .top {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
          font-size: 14px;
          color: #000000;
          .icon {
            color: #f05b51;
          }
        }
        .next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 400;
          font-size: 14px;
          color: #959595;
          .time {
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
      }
      .member {
        display: flex;
        align-items: center;
        background-color: #f7f7f7;
        margin-top: 5px;
        justify-content: flex-start;
        flex-wrap: wrap;
        border-radius: 4px;

        .item {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          // border-right: 1px solid #e6e6e6;
          padding: 10px 0;
          box-sizing: border-box;
          .select {
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #fff;
            padding: 4px 8px;
            box-sizing: border-box;
            font-weight: 600;
            font-size: 12px;
            color: #000000;
            margin-top: 8px;
            .icon {
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              border-top: 4px solid black;
            }
          }
          .avatar {
            position: relative;
            .rank {
              position: absolute;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%);
              background-color: white;
              width: 40px;
              height: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 400;
              font-size: 12px;
              color: #ec384a;
            }
            .tooltip {
              position: absolute;
              top: 125%;
              left: 50%;
              transform: translateX(-50%);
              background-color: #232323;
              border-radius: 4px;
              padding: 12px 26px;
              .title {
                font-weight: 600;
                font-size: 10px;
                color: rgba(255, 255, 255, 0.49);
                white-space: nowrap;
                position: relative;
                .icon {
                  content: "";
                  position: absolute;
                  border-left: 4px solid transparent;
                  border-right: 4px solid transparent;
                  border-bottom: 4px solid #232323;
                  top: -16px;
                  left: 16px;
                }
              }
              .item:nth-last-child(1) {
                border: none;
              }
              .item {
                width: 100%;
                font-weight: 600;
                font-size: 10px;
                color: #ffffff;
                border-bottom: 1px solid #fff;
                white-space: nowrap;
              }
            }
          }
          .name {
            font-weight: 400;
            font-size: 10px;
            color: #1d2326;
            margin-top: 15px;
          }
          .time {
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 12px;
            color: #1d2326;
            background-color: white;
            margin-top: 10px;
            gap: 3px;
            padding: 4px 8px;
            box-sizing: border-box;
            text {
              font-weight: 600;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.3);
            }
          }
          .grade {
            font-weight: 400;
            font-size: 10px;
            color: rgba(29, 35, 38, 0.5);
            margin-top: 5px;
          }
        }
      }
      .fourth {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .item {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          flex: 1;
          text-align: center;
        }
      }
      .fifth {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .item {
          display: flex;
          align-items: center;
          height: 60px;
          background-color: #f5f5f5;
          .num {
            flex: 1;
            text-align: center;
          }
          .avatar {
            flex: 1;
            display: flex;
            justify-content: center;
          }
          .grade {
            flex: 1;
            text-align: center;
          }
          .rank {
            flex: 1;
            text-align: center;
          }
          // padding: 0px 20px 0px 10px;
          // justify-content: space-between;
        }
      }
      .item-list {
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 18px;
        .detail {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background-color: #f7f7f7;
          position: relative;
          padding: 0px 20px;
          box-sizing: border-box;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            position: relative;
            padding: 10px 0;

            .zc {
              position: absolute;
              left: 0;
              top: 25%;
              font-weight: 400;
              font-size: 14px;
              color: #148aea;
            }
            .kc {
              position: absolute;
              right: 0;
              top: 25%;
              font-weight: 400;
              font-size: 14px;
              color: #f33b57;
            }
            .zc1 {
              position: absolute;
              left: 0;
              top: 25%;
              font-weight: 400;
              font-size: 14px;
              color: #f33b57;
            }
            .kc1 {
              position: absolute;
              right: 0;
              top: 25%;
              font-weight: 400;
              font-size: 14px;
              color: #148aea;
            }
            .avatar {
              position: relative;
              .rank {
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                background-color: white;
                width: 40px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 400;
                font-size: 12px;
                color: #ec384a;
              }
            }
            .name {
              font-weight: 400;
              font-size: 10px;
              color: #1d2326;
              margin-top: 10px;
            }
            .grade {
              font-weight: 400;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
              margin-top: 5px;
            }
          }
          .chang {
            position: absolute;
            top: 0;
            left: 0;
            background-color: red;
            font-weight: 600;
            font-size: 12px;
            color: #ffffff;
            padding: 2px 6px;
          }
        }
        .next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          .left {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 600;
            font-size: 14px;
            color: #1d2326;
            .icon {
              color: #ec384a;
            }
          }
          .right {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
      }
    }
    .o-text {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 10px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px rgba(0, 0, 0, 0.1);
      .item {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0px;
        border-bottom: 1px solid #f0f0f0;

        .left {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          gap: 5px;

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .right {
          display: flex;
          align-items: center;
          gap: 2px;

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

          .input {
            width: 120px;
            display: flex;
            align-items: center;
          }
          .select {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-right: 12px;
            text {
              font-weight: 400;
              font-size: 14px;
              color: rgba(29, 35, 38, 0.3);
            }
          }
          .stageExplains {
            background-color: #f7f7f7;
            border-radius: 4px;
            box-sizing: border-box;
            width: 50px;
            text-align: center;
          }
        }
        .right-r {
          display: flex;
          align-items: center;
          gap: 2px;

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }
        }
      }

      .item-o {
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 16px 0px;
        border-bottom: 1px solid #f0f0f0;
        gap: 10px;

        .right-y {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.3);
        }

        .top {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .bt {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          .left {
            .l1 {
              font-weight: 400;
              font-size: 14px;
              color: #1d2326;
            }
            .l2 {
              display: flex;
              align-items: center;
              gap: 5px;
              font-weight: 400;
              font-size: 14px;
              color: rgba(29, 35, 38, 0.3);
            }
          }
          .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .r2 {
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
        }

        .bt-radio {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          justify-content: flex-start;
          .item-radio {
            width: 25%;
            border: none;
            padding-bottom: 10px;
          }
          .right {
            display: flex;
            justify-content: flex-end;
          }
        }

        .left {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          gap: 5px;
          //不换行
          white-space: nowrap;

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .left-l {
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          gap: 5px;
          //不换行
          white-space: nowrap;
          width: 40%;
          justify-content: space-between;
          .l2 {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .right {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 2px;

          .r1 {
            white-space: nowrap;
          }

          .time {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
            width: 49%;
          }

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

          .input {
            width: 120px;
          }
        }
        .right-l {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 40%;

          .r1 {
            white-space: nowrap;
          }
          .r2 {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .time {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
            width: 49%;
          }

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

          .input {
            width: 120px;
          }
        }
        .right-r {
          display: flex;
          align-items: center;
          gap: 2px;

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }
        }
      }
    }
    .pp {
      width: 262px;
      height: 44px;
      background-color: black;
      margin: auto;
      margin-top: 30px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .next {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .item {
        width: 45%;
        background-color: black;
        border-radius: 22px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }
  }
}

.pl-class2 {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.3);
  text-align: right;
}
</style>
