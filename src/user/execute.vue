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
      <u-scroll-list :indicator="false">
        <view class="tick">
          <view
            v-for="(item, index) in gameList"
            :key="index"
            @click="op = index"
            :class="op == index ? 'item-a' : 'item'"
          >
            {{ item.scheTypeName }}
          </view>
        </view>
      </u-scroll-list>
    </view>

    <view class="main">
      <view class="jdsz"
        >阶段设置
        <u-icon
          name="arrow-down-fill"
          color="#fff"
          size="10"
          v-if="status == 2"
        ></u-icon>
        <u-icon
          name="arrow-up-fill"
          color="#fff"
          size="10"
          v-if="status == 1"
        ></u-icon>
      </view>
      <view class="o-text" v-if="status == 1">
        <view class="item">
          <view class="left">本阶段 <view class="icon">*</view></view>
          <view class="right" @click="show21 = true"
            ><text :style="{ color: zzName ? 'black' : '' }">
              {{ zzName || "请选择赛事直击项目" }} </text
            ><image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
              mode="scaleToFill"
              style="width: 12px; height: 12px"
          /></view>
          <view class="right">
            <view style="width: 70px">
              <u-input
                v-model="stageExplains"
                placeholder="人数"
                input-align="right"
                border="none"
                type="number"
                placeholderClass="pl-class"
              ></u-input> </view
            >人
          </view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left"> 玩家分组设置 <view class="icon">*</view> </view>
          </view>
          <view class="bt">
            <view class="left">
              <view class="l1">组数</view>
              <view class="l2" @click="show11 = true" style="margin-left: 20px"
                >{{ group_num_name ? group_num_name : "请选择" }}
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
                />
              </view>
            </view>

            <view class="right">
              <view class="r1">匹配方式</view>
              <!-- <view class="r2" @click="show12 = true"
                    >{{ matchingMannerName ? matchingMannerName : "请选择" }}
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
                  </view> -->
              <view class="r2" style="margin-left: 20px"
                >随机
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
                />
              </view>
            </view>
          </view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left"> 分组场地设置 <view class="icon">*</view> </view>
          </view>
          <view class="bt">
            <u-radio-group v-model="groupVenueType" placement="row">
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
            <u-radio-group v-model="groupUmpireType" placement="row">
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
              <u-radio-group v-model="scoringMethod">
                <u-radio
                  activeColor="#EC384A"
                  label="积分"
                  name="1"
                  shape="circle"
                ></u-radio>
              </u-radio-group>
            </view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod">
                <u-radio
                  activeColor="#EC384A"
                  label="时间"
                  name="2"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod">
                <u-radio
                  activeColor="#EC384A"
                  label="距离"
                  name="3"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod">
                <u-radio
                  activeColor="#EC384A"
                  label="分数"
                  name="4"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod">
                <u-radio
                  activeColor="#EC384A"
                  label="重量"
                  name="5"
                  shape="circle"
                ></u-radio> </u-radio-group
            ></view>
            <view class="item-radio">
              <u-radio-group v-model="scoringMethod">
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

      <view class="pp" @click="view = zz" v-if="status == 1">开始匹配</view>

      <view class="pp-content" v-show="view == 1">
        <view class="first">
          <view class="left">
            组名
            <view class="h">A组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right"
            >请选择比赛场地<u-icon
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
        <view class="member">
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">A01</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">A02</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">A03</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">A04</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
      </view>

      <view class="pp-content" v-show="view == 2">
        <view class="first">
          <view class="left">
            组名
            <view class="h">B组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right"
            >请选择比赛场地<u-icon
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
        <view class="member">
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B01</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B02</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B03</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B04</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
      </view>

      <view class="pp-content" v-show="view == 3">
        <view class="first">
          <view class="left">
            组名
            <view class="h">B组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right"
            >请选择比赛场地<u-icon
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

        <view class="fourth">
          <view class="item">参赛号</view>
          <view class="item">参赛选手</view>
          <view class="item">成绩（环）</view>
          <view class="item">排名</view>
        </view>

        <view class="fifth">
          <view class="item">
            <view class="num">A01</view>
            <view class="avatar">
              <u-avatar :src="src"></u-avatar>
            </view>
            <view class="grade"></view>
            <view class="rank">_</view>
          </view>
          <view class="item">
            <view class="num">A02</view>
            <view class="avatar">
              <u-avatar :src="src"></u-avatar>
            </view>
            <view class="grade"></view>
            <view class="rank">_</view>
          </view>
          <view class="item">
            <view class="num">A03</view>
            <view class="avatar">
              <u-avatar :src="src"></u-avatar>
            </view>
            <view class="grade"></view>
            <view class="rank">_</view>
          </view>
          <view class="item">
            <view class="num">A04</view>
            <view class="avatar">
              <u-avatar :src="src"></u-avatar>
            </view>
            <view class="grade"></view>
            <view class="rank">_</view>
          </view>
          <view class="item">
            <view class="num">A05</view>
            <view class="avatar">
              <u-avatar :src="src"></u-avatar>
            </view>
            <view class="grade"></view>
            <view class="rank">_</view>
          </view>
        </view>
      </view>

      <view class="pp-content" v-show="view == 4" style="padding-bottom: 0">
        <view class="first">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
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
        <view class="member">
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B01</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B02</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B03</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
          <view class="item">
            <view class="avatar">
              <u-avatar :src="src" size="40"></u-avatar>
              <view class="rank">B04</view>
            </view>
            <view class="time" v-if="scoringMethod == 1">
              积分 <text>0</text>
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
        <view class="item-list" v-show="expand">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>
        <view class="item-list" v-show="expand">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>
        <view class="item-list" v-show="expand">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>
        <view class="item-list" v-show="expand">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>
        <view class="item-list" v-show="expand">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>
        <view class="item-list" v-show="expand">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
          </view>
          <view class="next">
            <view class="left">比赛时间 <view class="icon">*</view></view>
            <view class="right"
              >10月12日 14:00-17:00
              <u-icon name="arrow-right" size="10"></u-icon
            ></view>
          </view>
        </view>

        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片展开.png"
          mode="scaleToFill"
          style="width: 80px; height: 16px; margin: auto; display: block"
          @click="expand = true"
          v-if="!expand"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片收起.png"
          mode="scaleToFill"
          style="width: 80px; height: 16px; margin: auto; display: block"
          @click="expand = false"
          v-else
        />
      </view>

      <view class="pp-content" v-show="view == 5">
        <view class="first">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
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
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
          </view>
        </view>
      </view>

      <view class="pp-content" v-show="view == 6">
        <view class="first">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
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

        <view class="first" style="margin-top: 30px">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            <view class="chang">第1场</view>
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

      <view class="pp-content" v-show="view == 7">
        <view class="first">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
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
        <view class="item-list">
          <view class="detail">
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
            VS
            <view class="item">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="rank">A01</view>
              </view>
              <view class="grade">积分0</view>
            </view>
          </view>
        </view>
      </view>

      <view class="pp" @click="save4" v-if="status == 1">保存</view>

      <view class="pp-content" v-if="status == 2">
        <view class="first">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
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
        <view class="member">
          <view
            v-for="(item, index) in memberList"
            :key="index"
            class="item"
            @click="toggleTooltip(index)"
          >
            <view class="avatar">
              <u-avatar :src="item.avatar" size="40"></u-avatar>
              <view class="rank">{{ item.rank }}</view>
            </view>
            <view class="grade" v-if="way == 2">积分0</view>
            <view class="select" v-if="way == 1">
              {{ item.score }}
              <u-icon name="arrow-down-fill" color="black" size="8"></u-icon>
            </view>

            <view v-if="showTooltipIndex === index" class="custom-tooltip">
              <view class="tooltip-title">标题</view>
              <view class="tooltip-options">
                <view
                  v-for="(option, idx) in tooltipOptions"
                  :key="idx"
                  class="tooltip-option"
                  @click.stop="handleOptionClick(option)"
                >
                  {{ option }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="bt" v-if="way == 1"> 确认比赛结果 </view>
        <view v-if="way == 2">
          <u-divider text="对战详情"></u-divider>
          <view class="item-list" v-show="expand">
            <view class="detail">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              VS
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              <view class="chang">第1场</view>
            </view>
            <view class="next">
              <view class="left">比赛时间 <view class="icon">*</view></view>
              <view class="right"
                >10月12日 14:00-17:00
                <u-icon name="arrow-right" size="10"></u-icon
              ></view>
            </view>
          </view>
          <view class="item-list" v-show="expand">
            <view class="detail">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              VS
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              <view class="chang">第1场</view>
            </view>
            <view class="next">
              <view class="left">比赛时间 <view class="icon">*</view></view>
              <view class="right"
                >10月12日 14:00-17:00
                <u-icon name="arrow-right" size="10"></u-icon
              ></view>
            </view>
          </view>
          <view class="item-list" v-show="expand">
            <view class="detail">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              VS
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              <view class="chang">第1场</view>
            </view>
            <view class="next">
              <view class="left">比赛时间 <view class="icon">*</view></view>
              <view class="right"
                >10月12日 14:00-17:00
                <u-icon name="arrow-right" size="10"></u-icon
              ></view>
            </view>
          </view>

          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片展开.png"
            mode="scaleToFill"
            style="width: 80px; height: 16px; margin: auto; display: block"
            @click="expand = true"
            v-if="!expand"
          />
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片收起.png"
            mode="scaleToFill"
            style="width: 80px; height: 16px; margin: auto; display: block"
            @click="expand = false"
            v-else
          />
        </view>
      </view>

      <view class="next" v-if="status == 2">
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
    <u-picker
      :show="show11"
      :columns="columns11"
      @cancel="show11 = false"
      @confirm="confirm11"
    ></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      op: 0,
      gameList: [
        {
          scheTypeName: "赛制设置",
        },
        {
          scheTypeName: "赛制模板",
        },
        {
          scheTypeName: "赛制分组",
        },
        {
          scheTypeName: "赛制分组",
        },
        {
          scheTypeName: "赛制分组",
        },
      ],
      showTooltipIndex: null, // 当前显示 tooltip 的索引
      tooltipOptions: ["选项1", "选项2", "选项3"], // tooltip 的选项内容
      memberList: [
        { avatar: "https://example.com/avatar1.jpg", rank: "A01", score: "3" },
        { avatar: "https://example.com/avatar2.jpg", rank: "A02", score: "3" },
        { avatar: "https://example.com/avatar3.jpg", rank: "A03", score: "3" },
        { avatar: "https://example.com/avatar4.jpg", rank: "A04", score: "3" },
      ],
      way: 1, //，1-未开始  2-执行中
      expand: false,
      show21: false,
      columns21: [
        [
          "非对战淘汰赛",
          "非对战排行赛",
          "对战单循环赛",
          "对战1V1赛",
          "对战主客场赛",
          "对战双败赛",
        ],
      ],
      zz: "",
      zzName: "",
      stageExplains: "",
      groupVenueType: "1",
      groupUmpireType: "1",
      scoringMethod: "1",
      columns11: [],
      group_num: null,
      group_num_name: null,
      show11: false,
      view: null,
      status: 1,
    };
  },
  onLoad() {
    this.getGroupNum();
  },
  methods: {
    toggleTooltip(index) {
      // 切换 tooltip 显示状态
      this.showTooltipIndex = index;
    },
    handleOptionClick(option) {
      this.showTooltipIndex = null; // 隐藏 tooltip
    },
    confirm21(n) {
      this.show21 = false;
      this.zz = n.indexs[0] + 1;
      this.zzName = n.value[0];
    },
    confirm11(n) {
      this.show11 = false;
      this.group_num = n.indexs[0];
      this.group_num_name = n.value[0];
    },
    async getGroupNum() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "age_limit",
        },
      });
      var arr = [];
      result.data.map((item, index) => {
        arr.push(item.value);
      });
      this.columns11 = [arr];
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
            width: 50%;
            height: 32px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
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
      }
      .member {
        display: flex;
        align-items: center;
        height: 83px;
        background-color: #f7f7f7;
        margin-top: 5px;
        justify-content: space-around;
        .item:nth-child(4) {
          border: none;
        }
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid #e6e6e6;
          flex: 1;
          position: relative;
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
          .custom-tooltip {
            position: absolute;
            top: 70%; // 向下显示
            left: 50%;
            transform: translateX(-50%);
            background-color: black;
            color: white;
            border-radius: 5px;
            padding: 16px 16px 0 16px;
            width: 72px;
            z-index: 999;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            text-align: center;

            .tooltip-title {
              font-weight: 600;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.49);
              position: relative;
              &::after {
                position: absolute;
                content: "";
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid black;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
              }
            }

            .tooltip-options {
              display: flex;
              flex-direction: column;
              gap: 6px;
              white-space: nowrap;
              .tooltip-option:nth-last-child(1) {
                border-bottom: none;
              }
              .tooltip-option {
                font-weight: 600;
                font-size: 10px;
                color: #ffffff;
                cursor: pointer;
                padding: 12px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.5);

                &:hover {
                  background-color: #333;
                }
              }
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
          height: 90px;
          position: relative;
          padding: 0px 20px;
          box-sizing: border-box;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            position: relative;
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
            .grade {
              font-weight: 400;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
              margin-top: 10px;
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
      .bt {
        font-weight: 400;
        font-size: 14px;
        color: #15181a;
        border: 1px solid #e6e6e6;
        border-radius: 22px;
        margin: auto;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        margin-top: 11px;
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
          .right {
            display: flex;
            justify-content: flex-end;
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
</style>
