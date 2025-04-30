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
      <view class="jdsz" @click="lookStatus = !lookStatus"
        >阶段设置
        <u-icon
          name="arrow-up-fill"
          color="#fff"
          size="10"
          v-if="lookStatus"
        ></u-icon>
        <u-icon name="arrow-down-fill" color="#fff" size="10" v-else></u-icon>
      </view>
      <view class="o-text" v-if="!lookStatus">
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
      <view class="pp" @click="pp" v-if="!lookStatus">开始匹配</view>
      <view
        class="pp-content"
        v-if="lookStatus && zz == 1"
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
        <view class="fourth">
          <view class="item">参赛号</view>
          <view class="item">参赛选手</view>
          <view class="item">成绩（环）</view>
          <view class="item">排名</view>
        </view>
        <!-- <view class="member">
          <view
            class="item"
            v-for="(user, UIndex) in item.list"
            :key="UIndex"
            :style="scoringMethod == 2 ? 'width: 50%' : ''"
          >
            <view class="avatar" @click="toggleTooltip(user)">
              <u-avatar :src="user.avatarUrl" size="40"></u-avatar>
              <view
                class="jj"
                v-if="
                  user.isPromotion !== '淘汰' && user.isPromotion !== 'null'
                "
                >{{ user.isPromotion }}</view
              >
              <view class="jj" v-if="user.rank != 0">{{ user.rank }}</view>
              <view
                class="tt"
                v-if="user.isPromotion == '淘汰' && user.isPromotion !== 'null'"
                >淘汰</view
              >
              <Tooltip
                v-if="activeTooltipIndex === user.userId"
                :user="user"
                :item="item"
                :tooltipState="tooltipState"
                :nextStageOptions="nextStageOptions"
                @removeUserPromotion="removeUserPromotion"
                @update-tooltip-state="updateTooltipState"
                @updateUserPromotion="updateUserPromotion"
                @updateUserRank="updateUserRank"
              ></Tooltip>
              <view class="rank">{{ user.userNumber || "参赛号" }}</view>
            </view>
            <view class="name">{{ user.username || "选手名称" }}</view>
            <Score
              :scoringMethod="scoringMethod"
              :user="user"
              :item="item"
              @showSc="showSc(user, item)"
              @input="handleUpdateUserScore"
              @updateUserTime="handleUpdateUserScore"
              @updateUserScore="updateUserScore(user, item)"
            ></Score>
          </view>
        </view> -->
        <view class="fifth">
          <view class="item" v-for="(user, UIndex) in item.list" :key="UIndex">
            <view class="num">{{ user.userNumber || "参赛号" }}</view>
            <view class="avatar" @click="toggleTooltip(user)">
              <u-avatar :src="user.avatarUrl" size="28"></u-avatar>
              <view class="name">{{ user.username }}</view>
              <view
                class="jj"
                v-if="
                  user.isPromotion !== '淘汰' && user.isPromotion !== 'null'
                "
                >{{ user.isPromotion }}</view
              >
              <view class="jj" v-if="user.rank != 0">{{ user.rank }}</view>
              <view
                class="tt"
                v-if="user.isPromotion == '淘汰' && user.isPromotion !== 'null'"
                >淘汰</view
              >
              <Tooltip
                :zz="zz"
                v-if="activeTooltipIndex === user.userId"
                :user="user"
                :item="item"
                :tooltipState="tooltipState"
                :nextStageOptions="nextStageOptions"
                @removeUserPromotion="removeUserPromotion"
                @update-tooltip-state="updateTooltipState"
                @updateUserPromotion="updateUserPromotion"
                @updateUserRank="updateUserRank"
              ></Tooltip>
            </view>
            <view class="grade"
              ><view class="text"
                ><input
                  type="text"
                  v-model="user.userScore"
                  @input="(n) => inputChange(user, n)"
                  @confirm="updateUserScore(user, item)" /></view
            ></view>
            <view class="rank">{{ user.rank || _ }}</view>
          </view>
        </view>
        <view class="confirm" style="margin-top: 20rpx"> 确认比赛结果 </view>
      </view>
      <view
        class="pp-content"
        v-show="lookStatus && zz == 2"
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
            <view class="avatar" @click="toggleTooltip(user)">
              <u-avatar :src="user.avatarUrl" size="28"></u-avatar>
              <view class="name">{{ user.username }}</view>
              <view
                class="jj"
                v-if="
                  user.isPromotion !== '淘汰' && user.isPromotion !== 'null'
                "
                >{{ user.isPromotion }}</view
              >
              <view class="jj" v-if="user.rank != 0">{{ user.rank }}</view>
              <view
                class="tt"
                v-if="user.isPromotion == '淘汰' && user.isPromotion !== 'null'"
                >淘汰</view
              >
              <Tooltip
                :zz="zz"
                v-if="activeTooltipIndex === user.userId"
                :user="user"
                :item="item"
                :tooltipState="tooltipState"
                :nextStageOptions="nextStageOptions"
                @removeUserPromotion="removeUserPromotion"
                @update-tooltip-state="updateTooltipState"
                @updateUserPromotion="updateUserPromotion"
                @updateUserRank="updateUserRank"
              ></Tooltip>
            </view>
            <view class="grade"
              ><view class="text"
                ><input
                  type="text"
                  v-model="user.userScore"
                  @input="(n) => inputChange(user, n)"
                  @confirm="updateUserScore(user, item)" /></view
            ></view>
            <view class="rank">{{ user.rank || _ }}</view>
          </view>
        </view>
      </view>

      <view
        class="pp-content"
        v-show="lookStatus && zz == 3"
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
            <view class="avatar" @click="toggleTooltip(user)">
              <u-avatar :src="user.avatarUrl" size="40"></u-avatar>
              <view class="rank">{{ user.userNumber || "参赛号" }}</view>
              <view
                class="jj"
                v-if="
                  user.isPromotion !== '淘汰' && user.isPromotion !== 'null'
                "
                >{{ user.isPromotion }}</view
              >
              <view class="jj" v-if="user.rank != 0">{{ user.rank }}</view>
              <view
                class="tt"
                v-if="user.isPromotion == '淘汰' && user.isPromotion !== 'null'"
                >淘汰</view
              >
              <Tooltip
                :zz="zz"
                v-if="activeTooltipIndex === user.userId"
                :user="user"
                :item="item"
                :tooltipState="tooltipState"
                :nextStageOptions="nextStageOptions"
                @removeUserPromotion="removeUserPromotion"
                @update-tooltip-state="updateTooltipState"
                @updateUserPromotion="updateUserPromotion"
                @updateUserRank="updateUserRank"
              ></Tooltip>
            </view>
            <view class="name">{{ user.username || "选手名称" }}</view>
            <view class="select" @click="showSc(user, item)">
              {{ user.userScore || "积分" }}
              <view class="icon"></view>
            </view>
          </view>
        </view>

        <u-divider text="对战详情"></u-divider>
        <view
          class="item-list"
          v-for="(war, WIndex) in item.warList"
          :key="WIndex"
          v-if="item.expand"
        >
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="war.homeAvatarUrl" size="40"></u-avatar>
                <view class="rank">{{ war.homeUserNumber || "参赛号" }}</view>
              </view>
              <view class="name">{{ war.homeUserName || "选手名称" }}</view>
              <!-- <view class="grade">{{ war.homeUserScore }}</view> -->
              <Score
                :war="war"
                :item="item"
                :scoringMethod="scoringMethod"
                @showZk="showZk"
                @updateHomeUserScore="updateHomeUserScore(war, userInfo)"
                value="homeUserScore"
                @inputHome="(n) => (userInfo = n.homeUserScore)"
              >
              </Score>
            </view>
            <view class="vs">VS</view>
            <view class="item">
              <view class="avatar">
                <u-avatar :src="war.awayAvatarUrl" size="40"></u-avatar>
                <view class="rank">{{ war.awayUserNumber || "参赛号" }}</view>
              </view>
              <view class="name">{{ war.awayUserName || "选手名称" }}</view>
              <Score
                :war="war"
                :item="item"
                :scoringMethod="scoringMethod"
                @showZk="showZk"
                @updateAwayUserScore="updateAwayUserScore(war, userInfo)"
                value="awayUserScore"
                @inputHome="(n) => (userInfo = n.awayUserScore)"
              >
              </Score>
            </view>
            <view class="chang">第{{ WIndex + 1 }}场</view>
          </view>
          <view class="sixth">
            <view class="top">比赛时间 <view class="icon">*</view></view>
            <view class="next" style="margin: 0">
              <view class="time" @click="chooseTime1(war)">{{
                war.startTime
              }}</view
              >至
              <view class="time" @click="chooseTime2(war)">{{
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
        v-for="(item, index) in groups"
        :key="index"
        v-show="lookStatus && zz == 4"
      >
        <view class="pp-content">
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
            <view
              class="item"
              v-for="(user, UIndex) in item.list"
              :key="UIndex"
            >
              <view class="avatar" @click="toggleTooltip(user)">
                <u-avatar :src="user.avatarUrl" size="40"></u-avatar>
                <view class="rank">{{ user.userNumber || "参赛号" }}</view>
                <view
                  class="jj"
                  v-if="
                    user.isPromotion !== '淘汰' && user.isPromotion !== 'null'
                  "
                  >{{ user.isPromotion }}</view
                >
                <view class="jj" v-if="user.rank != 0">{{ user.rank }}</view>
                <view
                  class="tt"
                  v-if="
                    user.isPromotion == '淘汰' && user.isPromotion !== 'null'
                  "
                  >淘汰</view
                >
                <Tooltip
                  :zz="zz"
                  v-if="activeTooltipIndex === user.userId"
                  :user="user"
                  :item="item"
                  :tooltipState="tooltipState"
                  :nextStageOptions="nextStageOptions"
                  @removeUserPromotion="removeUserPromotion"
                  @update-tooltip-state="updateTooltipState"
                  @updateUserPromotion="updateUserPromotion"
                  @updateUserRank="updateUserRank"
                ></Tooltip>
              </view>
              <view class="name">{{ user.username || "选手名称" }}</view>
              <view class="select" @click="showSc(user, item)">
                {{ user.userScore || "积分" }}
                <view class="icon"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="pp-content">
          <view
            v-for="(war, wIndex) in item.warList"
            :key="wIndex"
            :style="wIndex == 1 ? 'margin-top: 30px;' : ''"
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
            <view class="item-list" style="margin: 0">
              <view class="detail">
                <view class="item">
                  <view
                    class="zc"
                    :style="wIndex == 0 ? 'color:#148aea' : 'color:#f33b57'"
                    >主场</view
                  >
                  <view class="avatar">
                    <u-avatar :src="war.homeAvatarUrl" size="40"></u-avatar>
                    <view class="rank">{{
                      war.homeUserNumber || "参赛号"
                    }}</view>
                  </view>
                  <view class="name">{{ war.homeUserName || "选手名称" }}</view>

                  <Score
                    :war="war"
                    :item="item"
                    :scoringMethod="scoringMethod"
                    @showZk="showZk"
                    @updateHomeUserScore="updateHomeUserScore(war, userInfo)"
                    value="homeUserScore"
                    @inputHome="(n) => (userInfo = n.homeUserScore)"
                    @showTimePicker="showTimePicker"
                  >
                  </Score>
                </view>
                <view class="vs">VS</view>
                <view class="item">
                  <view
                    class="kc"
                    :style="wIndex == 0 ? 'color:#f33b57' : 'color:#148aea'"
                    >客场</view
                  >
                  <view class="avatar">
                    <u-avatar :src="war.awayAvatarUrl" size="40"></u-avatar>
                    <view class="rank">{{
                      war.awayUserNumber || "参赛号"
                    }}</view>
                  </view>
                  <view class="name">{{ war.awayUserName || "选手名称" }}</view>
                  <Score
                    :war="war"
                    :item="item"
                    :scoringMethod="scoringMethod"
                    @showZk="showZk"
                    @updateAwayUserScore="updateAwayUserScore(war, userInfo)"
                    value="awayUserScore"
                    @inputHome="(n) => (userInfo = n.awayUserScore)"
                    @showTimePicker="showTimePicker"
                  >
                  </Score>
                  <!-- <view class="select" v-if="scoringMethod == 6">
                  设置
                  <view class="icon"></view>
                </view> -->
                </view>
                <view class="chang">第{{ wIndex + 1 }}场</view>
              </view>
            </view>
            <view class="second">
              <view class="left">比赛场地 <view class="icon">*</view></view>
              <view class="right" @click="chooseAddress1(war)"
                >{{ war.address || "请选择"
                }}<u-icon name="arrow-right" color="#CCCCCC" size="12"></u-icon
              ></view>
            </view>
            <view class="sixth">
              <view class="top">比赛时间 <view class="icon">*</view></view>
              <view class="next">
                <view class="time" @click="chooseTime1(war)">{{
                  war.startTime
                }}</view
                >至
                <view class="time" @click="chooseTime2(war)">{{
                  war.endTime
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
                v-model="war.liveUrl"
              />
            </view>
          </view>
        </view>
      </view>
      <view
        class="pp-content"
        v-show="lookStatus && zz == 5"
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
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar" @click="toggleTooltip(item.list[0])">
                <u-avatar :src="item.list[0].avatarUrl" size="40"></u-avatar>
                <view class="rank">{{
                  item.list[0].userNumber || "参赛号"
                }}</view>
                <view
                  class="jj"
                  v-if="
                    item.list[0].isPromotion !== '淘汰' &&
                    item.list[0].isPromotion !== 'null'
                  "
                  >{{ item.list[0].isPromotion }}</view
                >
                <view class="jj" v-if="item.list[0].rank != 0">{{
                  item.list[0].rank
                }}</view>
                <view
                  class="tt"
                  v-if="
                    item.list[0].isPromotion == '淘汰' &&
                    item.list[0].isPromotion !== 'null'
                  "
                  >{{ item.list[0].isPromotion }}</view
                >

                <Tooltip
                  :zz="zz"
                  v-if="activeTooltipIndex === item.list[0].userId"
                  :user="item.list[0]"
                  :item="item"
                  :tooltipState="tooltipState"
                  :nextStageOptions="nextStageOptions"
                  @removeUserPromotion="removeUserPromotion"
                  @update-tooltip-state="updateTooltipState"
                  @updateUserPromotion="updateUserPromotion"
                  @updateUserRank="updateUserRank"
                ></Tooltip>
              </view>
              <view class="name">{{
                item.list[0].username || "选手名称"
              }}</view>
              <Score
                v-if="item.warList[0]"
                :war="item.warList[0]"
                :item="item"
                :scoringMethod="scoringMethod"
                @showZk="showZk"
                @updateHomeUserScore="
                  updateHomeUserScore(item.warList[0], userInfo)
                "
                value="homeUserScore"
                @inputHome="(n) => (userInfo = n.homeUserScore)"
                @showTimePicker="showTimePicker"
              >
              </Score>
            </view>
            <view class="vs">VS</view>
            <view class="item">
              <view class="avatar" @click="toggleTooltip(item.list[1])">
                <u-avatar :src="item.list[1].avatarUrl" size="40"></u-avatar>
                <view class="rank">{{
                  item.list[1].userNumber || "参赛号"
                }}</view>
                <view
                  class="jj"
                  v-if="
                    item.list[1].isPromotion !== '淘汰' &&
                    item.list[1].isPromotion !== 'null'
                  "
                  >{{ item.list[1].isPromotion }}</view
                >
                <view class="jj" v-if="item.list[1].rank != 0">{{
                  item.list[1].rank
                }}</view>
                <view
                  class="tt"
                  v-if="
                    item.list[1].isPromotion == '淘汰' &&
                    item.list[1].isPromotion !== 'null'
                  "
                  >{{ item.list[1].isPromotion }}</view
                >

                <Tooltip
                  :zz="zz"
                  v-if="activeTooltipIndex === item.list[1].userId"
                  :user="item.list[1]"
                  :item="item"
                  :tooltipState="tooltipState"
                  :nextStageOptions="nextStageOptions"
                  @removeUserPromotion="removeUserPromotion"
                  @update-tooltip-state="updateTooltipState"
                  @updateUserPromotion="updateUserPromotion"
                  @updateUserRank="updateUserRank"
                ></Tooltip>
              </view>
              <view class="name">{{
                item.list[1].username || "选手名称"
              }}</view>
              <Score
                v-if="item.warList[0]"
                :war="item.warList[0]"
                :item="item"
                :scoringMethod="scoringMethod"
                @showZk="showZk"
                @updateAwayUserScore="
                  updateAwayUserScore(item.warList[0], userInfo)
                "
                value="awayUserScore"
                @inputHome="(n) => (userInfo = n.awayUserScore)"
                @showTimePicker="showTimePicker"
              >
              </Score>
            </view>
          </view>
        </view>
        <view class="confirm"> 确认比赛结果 </view>
      </view>

      <view
        class="pp-content"
        v-show="lookStatus && zz == 6"
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
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar" @click="toggleTooltip(item.list[0])">
                <u-avatar :src="item.list[0].avatarUrl" size="40"></u-avatar>
                <view
                  class="jj"
                  v-if="
                    item.list[0].isPromotion !== '淘汰' &&
                    item.list[0].isPromotion !== 'null'
                  "
                  >{{ item.list[0].isPromotion }}</view
                >
                <view class="jj" v-if="item.list[0].rank != 0">{{
                  item.list[0].rank
                }}</view>
                <view
                  class="tt"
                  v-if="
                    item.list[0].isPromotion == '淘汰' &&
                    item.list[0].isPromotion !== 'null'
                  "
                  >{{ item.list[0].isPromotion }}</view
                >
                <Tooltip
                  :zz="zz"
                  v-if="activeTooltipIndex === item.list[0].userId"
                  :user="item.list[0]"
                  :item="item"
                  :tooltipState="tooltipState"
                  :nextStageOptions="nextStageOptions"
                  @removeUserPromotion="removeUserPromotion"
                  @update-tooltip-state="updateTooltipState"
                  @updateUserPromotion="updateUserPromotion"
                  @updateUserRank="updateUserRank"
                ></Tooltip>
                <view class="rank">{{
                  item.list[0].userNumber || "参赛号"
                }}</view>
              </view>
              <view class="name">{{
                item.list[0].username || "选手名称"
              }}</view>
              <Score
                v-if="item.warList[0]"
                :war="item.warList[0]"
                :item="item"
                :scoringMethod="scoringMethod"
                @showZk="showZk"
                @updateHomeUserScore="
                  updateHomeUserScore(item.warList[0], userInfo)
                "
                value="homeUserScore"
                @inputHome="(n) => (userInfo = n.homeUserScore)"
                @showTimePicker="showTimePicker"
              >
              </Score>
            </view>
            <view class="vs">VS</view>
            <view class="item">
              <view class="avatar" @click="toggleTooltip(item.list[1])">
                <u-avatar :src="item.list[1].avatarUrl" size="40"></u-avatar>
                <view
                  class="jj"
                  v-if="
                    item.list[1].isPromotion !== '淘汰' &&
                    item.list[1].isPromotion !== 'null'
                  "
                  >{{ item.list[1].isPromotion }}</view
                >
                <view class="jj" v-if="item.list[1].rank != 0">{{
                  item.list[1].rank
                }}</view>
                <view
                  class="tt"
                  v-if="
                    item.list[1].isPromotion == '淘汰' &&
                    item.list[1].isPromotion !== 'null'
                  "
                  >{{ item.list[1].isPromotion }}</view
                >
                <Tooltip
                  :zz="zz"
                  v-if="activeTooltipIndex === item.list[1].userId"
                  :user="item.list[1]"
                  :item="item"
                  :tooltipState="tooltipState"
                  :nextStageOptions="nextStageOptions"
                  @removeUserPromotion="removeUserPromotion"
                  @update-tooltip-state="updateTooltipState"
                  @updateUserPromotion="updateUserPromotion"
                  @updateUserRank="updateUserRank"
                ></Tooltip>
                <view class="rank">{{
                  item.list[1].userNumber || "参赛号"
                }}</view>
              </view>
              <view class="name">{{
                item.list[1].username || "选手名称"
              }}</view>
              <Score
                v-if="item.warList[0]"
                :war="item.warList[0]"
                :item="item"
                :scoringMethod="scoringMethod"
                @showZk="showZk"
                @updateAwayUserScore="
                  updateAwayUserScore(item.warList[0], userInfo)
                "
                value="awayUserScore"
                @inputHome="(n) => (userInfo = n.awayUserScore)"
                @showTimePicker="showTimePicker"
              >
              </Score>
            </view>
          </view>
        </view>
      </view>

      <view class="pp" @click="save4" v-if="!lookStatus">保存</view>

      <view class="next" v-if="lookStatus">
        <view class="item" @click="save4">保存</view>
        <view class="item" @click="excuteNext">执行下一轮</view>
      </view>
    </view>
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
    <u-picker
      :show="scShow"
      :columns="scList"
      @cancel="scShow = false"
      @confirm="scConfirm"
    ></u-picker>
    <u-picker
      :show="zkShow"
      :columns="scList"
      @cancel="zkShow = false"
      @confirm="zkConfirm"
    ></u-picker>
    <u-picker
      :show="reShow"
      :columns="reList"
      @cancel="reShow = false"
      @confirm="reConfirm"
    ></u-picker>
    <u-picker
      :show="show"
      :columns="timeList"
      @cancel="show = false"
      @confirm="confirmTime"
    ></u-picker>
    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
import Score from "@/components/execute/Score.vue";
import Tooltip from "@/components/execute/Tooltip.vue";
export default {
  components: {
    Score,
    Tooltip,
  },
  data() {
    return {
      columns21: [],
      op: 0,
      gameList: [],
      expand: false,
      zz: "",
      zzName: "",
      stageExplains: "",
      groupVenueType: "1",
      groupUmpireType: "1",
      columns11: [],
      group_num: null,
      group_num_name: null,
      view: null,
      gameList: [],
      matchId: "",
      stageUserNum: "",
      groups: [],
      serialNum: "",
      szList: [],
      timeShow: false,
      timeShow1: false,
      currentTime: null,
      activeTooltipIndex: null,
      date: Date.now(),
      lookStatus: false,
      activeTooltipIndex: null,
      tooltipState: null,
      nextStageOptions: [],
      rankList: ["8强", "第四名", "季军", "亚军", "冠军"],
      sc: null,
      scShow: false,
      zkShow: false,
      scList: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]],
      currentItem: null,
      ready: false,
      scoringMethod: "",
      userInfo: null,
      show: false,
      timeList: [["1"], ["2"], ["3"]],
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
    this.getTime();
    this.getGame();
  },
  methods: {
    getTime() {
      const arr1 = [];
      for (var i = 0; i < 60; i++) {
        arr1.push(i + "时");
      }
      const arr2 = [];
      for (var i = 0; i < 60; i++) {
        arr2.push(i + "分");
      }
      const arr3 = [];
      for (var i = 0; i < 60; i++) {
        arr3.push(i + "秒");
      }
      this.timeList = [arr1, arr2, arr3];
    },
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

        const arr = this.gameList.map((item) => {
          return item.scheTypeName;
        });

        const currentStage = this.gameList[this.op].scheTypeName;
        const currentIndex = arr.indexOf(currentStage);
        if (currentIndex !== 1 && currentIndex < arr.length - 1) {
          this.nextStageOptions = arr.slice(currentIndex + 1);
        } else {
          this.nextStageOptions = [];
        }
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

        const results = await Promise.all(updatePromises);
        const successCount = results.filter((res) => res.success).length;
        if (successCount === this.groups.length) {
          this.$refs.notice.show({
            type: "default",
            message: "保存成功",
          });
          this.gameList[this.op].isSave = true;
          this.lookStatus = true;
        }
        if (this.zz == 3) {
          const buildWarData = (group, war) => ({
            id: war.id,
            matchId: war.matchId,
            serialNum: war.serialNum,
            hitId: war.hitId,
            hitGroupId: war.hitGroupId,
            matchesNum: war.matchesNum,
            matchesName: war.matchesName,
            address: war.address,
            startTime: war.startTime,
            endTime: war.endTime,
            liveUrl: group.liveUrl,
            homeUserScore: war.homeUserScore,
            homeUserId: war.homeUserId,
            awayUserId: war.awayUserId,
            awayUserScore: war.awayUserScore,
            unit: war.unit,
            umpireId: war.umpireId,
          });

          const updatePromises = (this.groups || []).flatMap((group) => {
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

          const results = await Promise.all(updatePromises);
          const successCount = results.filter((res) => res.success).length;
          if (successCount === updatePromises.length) {
            this.$refs.notice.show({
              type: "default",
              message: "保存成功",
            });
            this.gameList[this.op].isSave = true;
            this.lookStatus = true;
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "保存失败，请稍后重试",
        });
      }
    },
    changeExpand(item) {
      item.expand = !item.expand;
    },
    handleUpdateUserScore(n) {
      this.userInfo = n;
    },
    async updateUserPromotion(n, item, option) {
      try {
        var result = await uni.$u.http.put("/match/updateUserPromotion", {
          ...item,
          list: [
            {
              ...n,
              isPromotion: option,
              scheId: this.gameList[this.op + 1].scheId,
            },
          ],
        });
        if (result.status == 200) {
          this.tooltipState = null;
          this.activeTooltipIndex = null;
          // 找到对应的 group 并更新
          const groupIndex = this.groups.findIndex((group) =>
            group.list.some((user) => user.userId === n.userId)
          );
          if (groupIndex !== -1) {
            const userIndex = this.groups[groupIndex].list.findIndex(
              (user) => user.userId === n.userId
            );
            if (userIndex !== -1) {
              this.$set(
                this.groups[groupIndex].list[userIndex],
                "isPromotion",
                option
              );
            }
          }
        }
      } catch (err) {
        n.isPromotion = "null";
        n.scheId = "";
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    checkThis(index) {
      this.op = index;
      this.queryMatchHitConfig();
      this.lookStatus = false;
      this.getMatchHitGroup();
    },
    updateTooltipState(newState) {
      this.tooltipState = newState;
    },
    excuteNext() {
      if (this.op > this.gameList.length) {
        return;
      }
      this.op++;
      this.queryMatchHitConfig();
      this.lookStatus = false;
      this.getMatchHitGroup();
    },
    async pp() {
      try {
        const params = {
          matchId: this.matchId,
          serialNum: this.serialNum,
          hitConfigList: [
            {
              scheId: this.gameList[this.op].scheId,
              hitId: "",
              hitTypeCode: String(this.gameList[this.op].scheId),
              hitTypeName: this.gameList[this.op].scheTypeName,
              stageUserNum: this.stageUserNum,
              stageExplains: "",
              groupNum: this.group_num,
              matchingManner: this.zz,
              groupVenueType: this.groupVenueType,
              groupUmpireType: this.groupUmpireType,
              scoringMethod: this.scoringMethod,
              isPreview: false,
            },
          ],
        };
        await uni.$u.http.post("/match/saveMatchHitConfig", params);
        this.getMatchHitGroup();
        this.lookStatus = true;
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    toggleTooltip(value) {
      if (this.activeTooltipIndex === value.userId) {
        this.activeTooltipIndex = null;
        this.tooltipState = null;
      } else {
        this.activeTooltipIndex = value.userId;
        if (value.isPromotion === "淘汰") {
          this.tooltipState = "fifth";
        } else if (value.isPromotion === "null") {
          this.tooltipState = "first";
        } else {
          this.tooltipState = "third";
        }
      }
    },
    inputChange(user, n) {
      this.userInfo = user;
      this.userInfo.userScore = n.detail.value;
    },
    async removeUserPromotion(n, item, action) {
      try {
        let data = {
          ...n,
          isPromotion: action,
          scheId: this.gameList[this.op].scheId,
        };

        var result = await uni.$u.http.put("/match/removeUserPromotion", {
          ...item,
          list: [data],
        });
        if (result.status == 200) {
          this.tooltipState = null;
          this.activeTooltipIndex = null;
          const groupIndex = this.groups.findIndex((group) => {
            return group.list.some((user) => {
              return user.userId == n.userId;
            });
          });
          if (groupIndex != -1) {
            const userIndex = this.groups[groupIndex].list.findIndex((user) => {
              return user.userId == n.userId;
            });
            if (userIndex != -1) {
              this.$set(
                this.groups[groupIndex].list[userIndex],
                "isPromotion",
                action
              );
            }
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    async updateUserRank(n, item, value) {
      try {
        var result = await uni.$u.http.put("/match/updateUserRank", {
          ...item,
          list: [
            {
              ...n,
              rank: value,
              scheId: this.gameList[this.op].scheId,
            },
          ],
        });
        if (result.status == 200) {
          this.tooltipState = null;
          this.activeTooltipIndex = null;
          const groupIndex = this.groups.findIndex((group) => {
            return group.list.some((user) => {
              return user.userId == n.userId;
            });
          });
          if (groupIndex != -1) {
            const userIndex = this.groups[groupIndex].list.findIndex((user) => {
              return user.userId == n.userId;
            });
            if (userIndex != -1) {
              this.$set(this.groups[groupIndex].list[userIndex], "rank", value);
            }
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    async updateUserScore(user, item) {
      try {
        var result = await uni.$u.http.put("/match/updateUserScore", {
          ...item,
          list: [
            {
              ...this.userInfo,
            },
          ],
        });
        if (result.status == 200) {
          user = this.userInfo;
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
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
          this.lookStatus = false;
        } else {
          this.lookStatus = true;
        }
        for (const group of this.groups) {
          const result = await uni.$u.http.get("/match/getMatchHitWar", {
            params: {
              hitGroupId: group.id,
            },
          });
          this.$set(group, "warList", result.data);
        }
        console.log(this.groups);
      }
    },
    showSc(list, item) {
      this.scShow = true;
      this.sc = list;
      this.currentItem = item;
    },
    showZk(list, item) {
      this.zkShow = true;
      this.sc = list;
      this.currentItem = item;
    },
    scConfirm(n) {
      this.sc.userScore = n.value[0];
      this.updateUserScore(this.currentItem);
      this.scShow = false;
    },
    zkConfirm(n) {
      if (this.sc == "homeUserScore") {
        this.updateHomeUserScore(this.currentItem, n.value[0]);
      } else if (this.sc == "awayUserScore") {
        this.updateAwayUserScore(this.currentItem, n.value[0]);
      }
      this.zkShow = false;
    },

    async updateHomeUserScore(item, value) {
      try {
        var result = await uni.$u.http.put("/match/updateHomeUserScore", {
          ...item,
          homeUserScore: value,
        });
        if (result.status == 200) {
          const groupIndex = this.groups.findIndex((group) => {
            return group.warList.some((user) => {
              return user.homeUserId == item.homeUserId;
            });
          });
          if (groupIndex != -1) {
            const userIndex = this.groups[groupIndex].warList.findIndex(
              (user) => {
                return user.homeUserId == item.homeUserId;
              }
            );
            if (userIndex != -1) {
              this.$set(
                this.groups[groupIndex].warList[userIndex],
                "homeUserScore",
                value
              );
            }
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || err.data.error,
        });
      }
    },
    async updateAwayUserScore(item, value) {
      try {
        var result = await uni.$u.http.put("/match/updateAwayUserScore", {
          ...item,
          awayUserScore: value,
        });
        if (result.status == 200) {
          const groupIndex = this.groups.findIndex((group) => {
            return group.warList.some((user) => {
              return user.awayUserId == item.awayUserId;
            });
          });
          if (groupIndex != -1) {
            const userIndex = this.groups[groupIndex].warList.findIndex(
              (user) => {
                return user.awayUserId == item.awayUserId;
              }
            );
            if (userIndex != -1) {
              this.$set(
                this.groups[groupIndex].warList[userIndex],
                "awayUserScore",
                value
              );
            }
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || err.data.error,
        });
      }
    },
    showTimePicker(value, war) {
      this.userInfo = war;
      this.userInfo.key = value;
      this.show = true;
    },
    confirmTime(n) {
      const value = n.value[0] + n.value[1] + n.value[2];
      this.show = false;
      if (this.userInfo.key == "homeUserScore") {
        this.updateHomeUserScore(this.userInfo, value);
      } else {
        this.updateAwayUserScore(this.userInfo, value);
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
          z-index: 999;
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
            bottom: -20px;
            font-family: "youshe";
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
          .avatar {
            position: relative;
            .jj {
              position: absolute;
              top: 0;
              left: 50%;
              font-weight: 600;
              font-size: 20rpx;
              color: #ffffff;
              background-color: #ec384a;
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 15px;
              padding: 4rpx 8rpx;
              white-space: nowrap;
            }
            .tt {
              position: absolute;
              top: 0;
              left: 50%;
              font-weight: 600;
              font-size: 20rpx;
              color: #ffffff;
              background-color: #2a8aba;
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 15px;
              padding: 4rpx 8rpx;
              white-space: nowrap;
            }
            .rank {
              position: absolute;
              bottom: -15px;
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
            margin-top: 15px;
          }
          .select {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 4px 8px;
            background-color: white;
            border-radius: 4px;
            font-weight: 600;
            font-size: 12px;
            color: #1d2326;
            margin-top: 8px;
            .icon {
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              border-top: 4px solid black;
            }
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
            font-weight: 400;
            font-size: 28rpx;
            color: rgba(29, 35, 38, 0.5);
          }
          .avatar {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            white-space: nowrap;
            .jj {
              position: absolute;
              top: 0;
              left: 50%;
              font-weight: 600;
              font-size: 20rpx;
              color: #ffffff;
              background-color: #ec384a;
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 15px;
              padding: 4rpx 8rpx;
              white-space: nowrap;
            }
            .tt {
              position: absolute;
              top: 0;
              left: 50%;
              font-weight: 600;
              font-size: 20rpx;
              color: #ffffff;
              background-color: #2a8aba;
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 15px;
              padding: 4rpx 8rpx;
              white-space: nowrap;
            }
            .rank {
              position: absolute;
              bottom: -15px;
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
          .grade {
            flex: 1;
            .text {
              width: 60%;
              background-color: #fff;
              border-radius: 8rpx;
              margin: auto;
              input {
                text-align: center;
              }
            }
          }
          .rank {
            flex: 1;
            text-align: center;
          }
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
              .jj {
                position: absolute;
                top: 0;
                left: 50%;
                font-weight: 600;
                font-size: 20rpx;
                color: #ffffff;
                background-color: #ec384a;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 15px;
                padding: 4rpx 8rpx;
                white-space: nowrap;
              }
              .tt {
                position: absolute;
                top: 0;
                left: 50%;
                font-weight: 600;
                font-size: 20rpx;
                color: #ffffff;
                background-color: #2a8aba;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 15px;
                padding: 4rpx 8rpx;
                white-space: nowrap;
              }
              .rank {
                position: absolute;
                bottom: -15px;
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
              margin-top: 22px;
            }
            .grade {
              font-weight: 400;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
              margin-top: 5px;
            }
            .time {
              display: flex;
              align-items: center;
              gap: 5px;
              padding: 4px 8px;
              background-color: white;
              font-weight: 600;
              font-size: 12px;
              color: #1d2326;
              border-radius: 4px;
              margin-top: 8px;
              text {
                font-weight: 600;
                font-size: 12px;
                color: rgba(29, 35, 38, 0.3);
              }
            }
            .select {
              display: flex;
              align-items: center;
              gap: 5px;
              padding: 4px 8px;
              background-color: white;
              border-radius: 4px;
              font-weight: 600;
              font-size: 12px;
              color: #1d2326;
              margin-top: 8px;
              .icon {
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 4px solid black;
              }
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
      .confirm {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 64rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #15181a;
        margin: auto;
        border: 1px solid #e6e6e6;
        border-radius: 32rpx;
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
.vs {
  font-family: "youshe";
}
.pl-class2 {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.3);
  text-align: right;
}
</style>
