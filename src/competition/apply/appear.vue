<template>
  <view class="box">
    <u-navbar
      bgColor="rgba(0,0,0,0)"
      @leftClick="back"
      leftIconColor="#ffffff"
    ></u-navbar>

    <view class="upload">
      <view class="top"> </view>

      <view
        class="next"
        :style="{
          background: `linear-gradient(180deg,#cccccc 0%,${selectColor} 30%)`,
        }"
      >
        <view class="message">
          <u-icon name="volume" color="#ffffff"></u-icon>
          腾讯体育赞助现金1000元，恭祝赛事顺利举办
        </view>
      </view>

      <view class="cup">
        <view class="top">
          <view class="left">
            <view class="first">这里是赛事名称</view>
            <view class="second">这里是赛事副标题</view>
          </view>
        </view>

        <view class="next">
          <view class="plus">
            <u-avatar :src="src" size="24"></u-avatar>
            <u-avatar :src="src" size="24"></u-avatar>
            <u-avatar :src="src" size="24"></u-avatar>
            <u-avatar :src="src" size="24"></u-avatar>
            <u-avatar :src="src" size="24"></u-avatar>
            <view class="more" @click="toMore">
              更多
              <u-icon name="play-right-fill" color="#fff" size="8"></u-icon>
            </view>
          </view>
          <view class="button" @click="toSponsor">我要赞助</view>
        </view>
      </view>
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/cup.png"
        mode="scaleToFill"
        style="
          width: 96px;
          height: 107px;
          position: absolute;
          top: 50%;
          right: 20px;
          z-index: 9;
        "
      />
      <view class="know" @click="openModal">赛事须知</view>
      <view class="share">
        <u-icon name="share-square" color="#fff" @click="toShare"></u-icon
        >分享</view
      >
    </view>

    <view class="type" :style="{ background: selectColor }">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        :class="activeTab == index ? 'item-active' : 'item'"
        @click="setActiveTab(index)"
        :style="{
          background: activeTab == index ? activeTabColor : '',
          '--active-color': activeTab == index ? activeTabColor : '#1e54ba',
        }"
      >
        <view class="value">{{ tab }}</view>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/biao.png"
          mode="scaleToFill"
          style="width: 100%; height: 1px"
          v-show="activeTab == index"
        />
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 0 && !isFinish && !isOver"
      :style="{ background: selectColor }"
    >
      <view class="main">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/参赛小队信息.png"
          mode="scaleToFill"
          style="
            width: 213px;
            height: 25px;
            margin: 30px auto 0px;
            display: block;
          "
          v-if="applyStatus != 1"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/基础信息.svg"
          mode="scaleToFill"
          style="
            width: 213px;
            height: 25px;
            margin: 30px auto 0px;
            display: block;
          "
          v-else
        />
        <view class="o-text" v-if="applyStatus != 1">
          <view class="item">
            <view class="left">小队类型 <view class="icon">*</view></view>
            <view class="right">
              <u-radio-group
                v-model="type"
                placement="row"
                @change="groupChange"
              >
                <u-radio
                  activeColor="red"
                  label="正式小队"
                  shape="circle"
                  name="1"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="临时组队"
                  name="2"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-radio>
              </u-radio-group>
            </view>
          </view>
          <view class="item">
            <view class="item-p">请选择参赛小队</view>
            <view class="right">
              <u-icon name="arrow-down" color="#BBBDBE" size="12"></u-icon>
            </view>
          </view>
        </view>
        <view class="al">
          <view class="al-top" v-if="applyStatus != 1">
            <view
              class="item"
              :class="{ 'item-active': activeIndex === 0 }"
              @tap="switchTeam(0)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>小青爱健身</text>
              <view class="arrow-indicator" v-if="activeIndex === 0"></view>
            </view>

            <view
              class="item"
              :class="{ 'item-active': activeIndex === 1 }"
              @tap="switchTeam(1)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>龙猫</text>
              <view class="arrow-indicator" v-if="activeIndex === 1"></view>
            </view>

            <view
              class="item"
              :class="{ 'item-active': activeIndex === 2 }"
              @tap="switchTeam(2)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>聪明小龙</text>
              <view class="arrow-indicator" v-if="activeIndex === 2"></view>
            </view>

            <view
              class="item"
              :class="{ 'item-active': activeIndex === 3 }"
              @tap="switchTeam(3)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>小胖喵喵</text>
              <view class="arrow-indicator" v-if="activeIndex === 3"></view>
            </view>

            <view
              class="item"
              :class="{ 'item-active': activeIndex === 4 }"
              @tap="switchTeam(4)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>姐姐</text>

              <view class="arrow-indicator" v-if="activeIndex === 4"></view>
            </view>
          </view>
          <view class="o-text" style="margin: 0">
            <view class="item" v-if="applyStatus != 1">
              <view class="left">真实姓名</view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="name"
                    placeholder="请填写真实姓名"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="placeholderClass"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item" v-if="applyStatus != 1">
              <view class="left">证件类型</view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="name"
                    placeholder="身份证"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="placeholderClass"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item" style="border: none" v-if="applyStatus != 1">
              <view class="left">证件号码</view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="name"
                    placeholder="请填写证件号码"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="placeholderClass"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="autonym" v-if="applyStatus != 1"
              >授权实名信息给主办方</view
            >
            <view class="rz" v-else>
              <view class="left">
                <view class="title">报名参赛需要实名认证</view>
                <text>您还未完成实名认证</text>
              </view>
              <view class="right"> 立即认证 </view>
            </view>
            <view class="item">
              <view class="left">手机号 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="mobile"
                    placeholder="请填写手机号"
                    border="none"
                    @change="change1"
                    placeholderClass="placeholderClass"
                    input-align="right"
                    type="number"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">性别 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group
                  v-model="gender"
                  placement="row"
                  @change="genderChange"
                >
                  <u-radio
                    activeColor="red"
                    label="男"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
                    label="女"
                    name="2"
                    shape="circle"
                    customStyle="margin-left: 20px"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
            <view class="item">
              <view class="left">年龄 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="age"
                    placeholder="请填写年龄"
                    placeholderClass="placeholderClass"
                    border="none"
                    @change="change2"
                    input-align="right"
                    type="number"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left" style="width: 35%"
                >紧急联系人手机号 <view class="icon">*</view></view
              >
              <view class="right">
                <view style="width: 170px">
                  <u-input
                    v-model="contact"
                    placeholder="请填写紧急联系人手机号"
                    border="none"
                    @change="change3"
                    input-align="right"
                    placeholderClass="placeholderClass"
                    type="number"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">血型<view class="icon">*</view></view>
              <view class="right" @click="show1 = true"
                ><text :style="{ color: blood_type ? 'black' : '' }">{{
                  blood_type || "请选择血型"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">基础疾病<view class="icon">*</view></view>
              <view class="right" @click="show2 = true"
                ><text :style="{ color: disease ? 'black' : '' }">{{
                  disease || "请选择基础疾病"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">保险保障<view class="icon">*</view></view>
              <view class="right" @click="show3 = true"
                ><text :style="{ color: insurance ? 'black' : '' }">{{
                  insurance || "参与者意外保险"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 0 && !isFinish && !isOver"
      :style="{ background: selectColor }"
      style="padding-bottom: 102px"
    >
      <view class="main">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/报名参赛.svg"
          mode="scaleToFill"
          style="
            width: 228px;
            height: 22px;
            margin: 36px auto 20px;
            display: block;
          "
        />

        <view class="apply-first">
          <view class="top">
            报名费用
            <u-avatar-group :urls="urls" size="24" gap="0.2"></u-avatar-group>
          </view>
          <view class="bt">
            <view class="total">
              <view class="zfy">总费用</view>
              <view class="price">￥508</view>
            </view>
            <view class="dy">=</view>
            <view class="detail">
              <view class="item">
                <view class="left">
                  <u-icon name="account"></u-icon>
                  报名人数
                </view>
                <view class="right"> 4人 </view>
              </view>
              <view class="item">
                <view class="left">
                  <u-icon name="red-packet"></u-icon>
                  小队报名费
                </view>
                <view class="right-r"> ￥500 </view>
              </view>
              <view class="item">
                <view class="left">
                  <image
                    src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/保险.svg"
                    mode="scaleToFill"
                    style="width: 16px; height: 16px"
                  />
                  保险费
                </view>
                <view class="right-r"> ￥2*4=8 </view>
              </view>
            </view>
          </view>
        </view>

        <view class="apply-second">
          <view class="top">
            <view class="left">
              已报名<text>{{ registerNumber.registerNum }}</text
              >个
              <u-avatar-group :urls="urls" size="24" gap="0.3"></u-avatar-group>
            </view>

            <view class="right">
              {{ registerNumber.registerNum }}/{{ registerNumber.number }}
            </view>
          </view>
          <view class="progress">
            <u-line-progress
              :percentage="scale"
              height="8"
              activeColor="#EC384A"
              :showText="false"
            ></u-line-progress>
          </view>
          <view class="botton" @click="apply"> ￥504报名参赛 </view>
        </view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 0 && isFinish"
      :style="{ background: selectColor }"
      style="padding-bottom: 102px"
    >
      <view class="main">
        <view class="finish">
          <u-avatar :src="src" size="60"></u-avatar>
          <view class="title"
            >您已完成赛事报名<u-icon
              name="checkmark-circle-fill"
              color="#06B66C"
              size="16"
            ></u-icon
          ></view>
          <view class="gray">请等待赛事名单公布及选手对战表</view>
          <view class="gray">公布时间：{{ publicationTime }}</view>
          <view class="time">
            <view class="item">{{ timeDifference.days }}</view
            ><text>:</text> <view class="item">{{ timeDifference.hours }}</view
            ><text>:</text>
            <view class="item">{{ timeDifference.minutes }}</view>
          </view>
          <view class="bt">取消参赛</view>
        </view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 0 && isOver"
      :style="{ background: selectColor }"
      style="padding-bottom: 102px"
    >
      <view class="main">
        <view class="finish">
          <u-icon name="clock-fill" color="#17A7EF" size="44"></u-icon>
          <view class="title">赛事报名已结束</view>
          <view class="gray">敬请期待下一场赛事</view>
        </view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 1"
      :style="{ background: selectColor }"
      style="padding-bottom: 155px"
    >
      <view class="main">
        <view class="time-line">
          <view class="name">
            <view
              :class="itemIndex == index ? 'item-active' : 'item'"
              v-for="(item, index) in scheTimeList"
              :key="index"
            >
              <view class="title">{{ item.scheTypeName }}</view>
              <view class="time">{{ item.scheTime }}</view>
              <view class="line">
                <view class="dian">····················</view>
              </view>
            </view>
          </view>
        </view>

        <view class="sshj">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事环节.svg"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin: 24px 0 16px"
          />

          <view class="schedule-table">
            <!-- 左侧竖向文字 -->
            <view class="side-text">
              <text>COMPETITION TIMES</text>
            </view>

            <!-- 右侧表格 -->
            <view class="table-content">
              <!-- 表格行 -->
              <view
                class="table-row"
                v-for="(item, index) in scheTimeList"
                :key="index"
              >
                <view class="table-cell stage">{{ item.scheTypeName }}</view>
                <view class="table-cell time">{{ item.scheTime }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 2"
      :style="{ background: selectColor }"
      style="padding-bottom: 96px; position: relative"
    >
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/左滑.svg"
        mode="scaleToFill"
        style="
          position: absolute;
          left: 10px;
          width: 24px;
          height: 54px;
          top: 185px;
        "
      />
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/右滑.svg"
        mode="scaleToFill"
        style="
          position: absolute;
          right: 10px;
          width: 24px;
          height: 54px;
          top: 185px;
        "
      />
      <view class="look">
        <view class="main">
          <view class="rank">1st</view>
          <view class="avatar" style="position: relative">
            <u-avatar :src="src" size="90"></u-avatar>
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/奖励边框.svg"
              mode="scaleToFill"
              style="
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                width: 142px;
                height: 151px;
              "
            />
          </view>

          <view class="nickname">无名之辈</view>
          <view class="xian"></view>
          <view class="zbf">主办方奖励</view>
          <view class="money">
            <text>5000</text>
            RMB奖金
            <u-icon name="checkmark-circle" color="green"></u-icon>
            <view class="wen">?</view>
          </view>
          <view class="food">尤尼克斯球拍×2</view>
          <view class="zzs">赞助商奖励</view>
          <view class="money">
            <text>2000</text>
            RMB奖金
          </view>
          <view class="lesson">
            <view class="left">康复拉伸课×1</view>
            <view class="right"><u-icon name="level"></u-icon>康复工作室</view>
          </view>
        </view>
      </view>

      <view class="rank-list">
        <view class="item">
          <view class="title">4th</view>
          <view class="avatar">
            <u-avatar :src="src" size="30"></u-avatar>
          </view>
          龙猫
        </view>
        <view class="item">
          <view class="title">4th</view>
          <view class="avatar">
            <u-avatar :src="src" size="30"></u-avatar>
          </view>
          龙猫
        </view>
        <view class="item">
          <view class="title">4th</view>
          <view class="avatar">
            <u-avatar :src="src" size="30"></u-avatar>
          </view>
          龙猫
        </view>
        <view class="item">
          <view class="title">4th</view>
          <view class="avatar">
            <u-avatar :src="src" size="30"></u-avatar>
          </view>
          龙猫
        </view>
        <view class="item">
          <view class="title">4th</view>
          <view class="avatar">
            <u-avatar :src="src" size="30"></u-avatar>
          </view>
          龙猫
        </view>
      </view>

      <view class="thank">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/特别鸣谢.svg"
          mode="scaleToFill"
          style="width: 274px; height: 25px"
        />
        <view class="thank-list">
          <view class="item">
            <view class="first">
              <u-avatar :src="src" size="20"></u-avatar>
              腾讯体育
            </view>
            <text>赞助现金</text>
            <text>3000RMB</text>
          </view>
          <view class="item">
            <view class="first">
              <u-avatar :src="src" size="20"></u-avatar>
              腾讯体育
            </view>
            <text>赞助现金</text>
            <text>3000RMB</text>
          </view>

          <view class="item">
            <view class="first">
              <u-avatar :src="src" size="20"></u-avatar>
              腾讯体育
            </view>
            <text>赞助现金</text>
            <text>3000RMB</text>
          </view>
          <view class="item">
            <view class="first">
              <u-avatar :src="src" size="20"></u-avatar>
              腾讯体育
            </view>
            <text>赞助现金</text>
            <text>3000RMB</text>
          </view>
          <view class="item">
            <view class="first">
              <u-avatar :src="src" size="20"></u-avatar>
              腾讯体育
            </view>
            <text>赞助现金</text>
            <text>3000RMB</text>
          </view>
          <view class="item">
            <view class="first">
              <u-avatar :src="src" size="20"></u-avatar>
              腾讯体育
            </view>
            <text>赞助现金</text>
            <text>3000RMB</text>
          </view>
        </view>
      </view>

      <view class="award">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事奖励.svg"
          mode="scaleToFill"
          style="
            width: 150px;
            height: 22px;
            margin: 52px auto 16px;
            display: block;
          "
        />

        <view class="table">
          <view class="item" v-for="(item, index) in list" :key="index">
            <view class="rank">冠军奖励</view>
            <view class="some">
              <view class="zbf">主办方奖励</view>
              <view class="money">
                <text>{{ item.rewardAmount }}</text>
                RMB奖金
                <u-icon name="checkmark-circle" color="green"></u-icon>
                <view class="wen">?</view>
              </view>
              <view class="food">{{ item.rewardName }}×2</view>
              <view class="zzs">赞助商奖励</view>
              <view class="money">
                <text>{{ item.sponsorAmount }}</text>
                RMB奖金
              </view>
              <view class="lesson">
                <view class="left">{{ item.spReward }}</view>
                <view class="right"
                  ><u-icon name="level"></u-icon
                  >{{ item.sponsorsUsername }}</view
                >
              </view>
              <view class="lesson">
                <view class="left">{{ item.serveContent }}</view>
                <view class="right"
                  ><u-icon name="level"></u-icon>{{ item.serveName }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 3"
      :style="{ background: selectColor }"
    >
      <view class="main">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事直击设置.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

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

        <view class="jdsz">阶段设置</view>

        <view class="o-text">
          <view class="item">
            <view class="left">本阶段 <view class="icon">*</view></view>
            <view class="right">
              <u-input
                v-model="stageExplains"
                placeholder="32人/队"
                border="none"
                @change="blur10"
                type="number"
                input-align="right"
              ></u-input>
            </view>
          </view>
          <view class="item-o">
            <view class="top">
              <view class="left">
                玩家分组设置 <view class="icon">*</view>
              </view>
            </view>
            <view class="bt">
              <view class="left">
                <view class="l1">组数</view>
                <view class="l2" @click="show11 = true"
                  >{{ groupNum ? groupNum : "请选择" }}
                  <image
                    src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                    mode="scaleToFill"
                    style="width: 12px; height: 12px"
                  />
                </view>
              </view>

              <view class="right">
                <view class="r1">匹配方式</view>
                <view class="r2" @click="show12 = true"
                  >{{ matchingMannerName ? matchingMannerName : "请选择" }}
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
              <view class="left">
                分组场地设置 <view class="icon">*</view>
              </view>
            </view>
            <view class="bt">
              <u-radio-group v-model="groupVenueType" placement="row">
                <u-radio
                  activeColor="red"
                  label="系统订单匹配"
                  name="1"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
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
              <view class="left">
                分组裁判设置 <view class="icon">*</view>
              </view>
            </view>
            <view class="bt">
              <u-radio-group v-model="groupUmpireType" placement="row">
                <u-radio
                  activeColor="red"
                  label="系统随机匹配"
                  name="1"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
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
              <view class="left">
                选择计分方式 <view class="icon">*</view>
              </view>
            </view>
            <view class="bt">
              <u-radio-group v-model="scoringMethod">
                <u-radio
                  activeColor="red"
                  label="积分"
                  name="1"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="时间"
                  name="2"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="距离"
                  name="3"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="分数"
                  name="4"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="重量"
                  name="5"
                  shape="circle"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="胜负"
                  name="6"
                  shape="circle"
                ></u-radio>
              </u-radio-group>
            </view>
          </view>
        </view>

        <view class="pp" @click="save4">赛事报名完成后可进行匹配</view>
      </view>
    </view>

    <view
      class="content"
      v-if="activeTab == 4"
      :style="{ background: selectColor }"
    >
      <view class="main">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/报名条件.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <view class="rules">
          <view class="top">玩家参赛需要满足以下条件</view>
          <view class="rule">
            <view class="item">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/羽毛球.png"
                mode="scaleToFill"
                style="width: 65px; height: 65px"
              />
              徽章等级：羽毛球L3
            </view>
            <view class="item">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事等级大师.png"
                mode="scaleToFill"
                style="width: 65px; height: 65px"
              />
              赛事等级：大师IV
            </view>
          </view>
        </view>

        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事规则.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
          v-if="gameList.length > 0"
        />

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

        <view class="tx-container" v-if="gameList.length > 0">
          <textarea
            class="t1"
            maxlength="500"
            placeholder="请输入内容"
            placeholderClass="placeholderClass"
            auto-height
            @input="saveTextareaContent"
            v-model="textareaContent[op]"
          >
          </textarea>
          <view class="count">
            <view class="count-i"
              >{{ textareaContent[op].length || 0 }}/<text>500</text></view
            >
          </view>
        </view>

        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事说明.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <view class="sm">
          <view class="title">赛事说明</view>
          <view v-for="(item, index) in contentList" :key="index">
            <view class="gn" v-if="item.descriType == 1">
              <view class="left">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/文字.png"
                  mode="scaleToFill"
                  style="width: 16px; height: 16px"
                />
                文字
              </view>
              <view class="right">
                <view class="up">上移</view>
                <view class="down">下移</view>
                <view class="delete">删除</view>
              </view>
            </view>
            <textarea
              class="t1"
              maxlength="20000"
              placeholder="请编辑赛事说明"
              v-if="item.descriType == 1"
              v-model="item.content"
              @input="saveThis"
            >
            </textarea>
            <view class="gn" v-if="item.descriType == 2">
              <view class="left">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/图片.png"
                  mode="scaleToFill"
                  style="width: 16px; height: 16px"
                />
                图片
              </view>
              <view class="right">
                <view class="down">上移</view>
                <view class="up">下移</view>
                <view class="delete">删除</view>
              </view>
            </view>

            <image
              mode="aspectFit"
              style="width: 100%; height: 206px; margin-top: 12px"
              v-if="item.descriType == 2"
              :src="item.content"
            />
          </view>

          <view class="add">
            <view class="item" @click="addText">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/文字1.png"
                mode="scaleToFill"
                style="width: 24px; height: 24px"
              />
              文字
            </view>
            <view class="item" @click="addImage">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/图片1.png"
                mode="scaleToFill"
                style="width: 24px; height: 24px"
              />
              图片
            </view>
          </view>
        </view>

        <view class="end" style="justify-content: space-between">
          <view class="end-i">
            <u-icon name="file-text" color="#ffffff" size="24"></u-icon>
            存草稿
          </view>

          <view class="end-i">
            <u-icon name="eye" color="#ffffff" size="24"></u-icon>
            预览
          </view>

          <view class="save" style="margin: 0" @click="save5">保存</view>
        </view>
      </view>
    </view>

    <u-toast ref="notice"></u-toast>
    <u-modal :show="know" @confirm="closeModal">
      <view class="modal-content">
        <view class="x" @click="closeModal1"
          ><u-icon name="close"></u-icon
        ></view>
        <view class="section-title">赛事须知</view>
        <view class="section-content">
          {{ matchNotice }}
        </view>

        <view class="section-title">保险须知</view>
        <view class="section-content">
          {{ insuranceNotice }}
        </view>
      </view>
      <view slot="confirmButton" class="modal-footer" @click="closeModal">
        我知道了 {{ interval ? countdown + "s" : "" }}
      </view>
    </u-modal>
    <u-picker
      :show="show1"
      :columns="columns1"
      @cancel="show1 = false"
      @confirm="confirm1"
    ></u-picker>
    <u-picker
      :show="show2"
      :columns="columns2"
      @cancel="show2 = false"
      @confirm="confirm2"
    ></u-picker>
    <u-picker
      :show="show3"
      :columns="columns3"
      @cancel="show3 = false"
      @confirm="confirm3"
    ></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: uni.getStorageSync("activeTab") || 0,
      activeIndex: 0,
      selectColor: uni.getStorageSync("theme") || "#1B4CA7",
      tabs: ["报名比赛", "赛事环节", "赛事奖励", "赛事直击", "赛事规则"],
      applyStatus: 1, //1——单人报名 2——团队报名
      isFinish: uni.getStorageSync("isFinish") || false,
      isOver: false,
      know: false,
      countdown: 25,
      interval: null,
      applyData: [],
      mobile: "",
      gender: "1",
      age: "",
      contact: "",
      disease: "",
      show1: false,
      columns1: [],
      blood_type: "",
      show2: false,
      columns2: [],
      insurance: "",
      show3: false,
      columns3: [],
      disclaimer: "",
      insuranceNotice: "",
      matchNotice: "",
      matchLink: [],
      publicationTime: "",
      scheTimeList: [],
      itemIndex: 0,
      timeDifference: { days: 0, hours: 0, minutes: 0 }, // 初始化时间差
      list: [],
      MatchReward: [],
      MatchRewardInfo: [],
      MatchSponsorRequest: [],
      MatchSponsorPrize: [],
      MatchSponsorServe: [],
      registerNumber: {},
    };
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
      uni.setStorageSync("activeTab", index);
      if (index == 0 && this.isFinish) {
        this.getMatchRegisterSuc();
      }
      if (index == 0) {
        this.getMatchRegisterUserNum();
      }
      if (index == 1) {
        this.getMatchSche();
      }
      if (index == 2) {
        this.getMatchReward();
        this.getMatchRewardInfo();
        this.getMatchSponsorRequest();
        this.getMatchSponsorPrize();
        this.getMatchSponsorServe();
      }
    },
    switchTeam(index) {
      this.activeIndex = index;
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    },
    toMore() {
      uni.navigateTo({
        url: "/competition/apply/more",
      });
    },
    toSponsor() {
      uni.navigateTo({
        url: "/competition/apply/sponsor",
      });
    },
    openModal() {
      this.startCountdown();
      this.countdown = 25;
      this.getMatchTemplateNotice();
    },
    startCountdown() {
      this.interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
      }, 1000);
    },
    closeModal() {
      if (this.interval > 0) {
        return;
      }
      this.know = false;
      if (this.interval) {
        clearInterval(this.interval); // 清除定时器
        this.interval = null; // 确保置空
      }
    },
    closeModal1() {
      this.know = false;
      if (this.interval) {
        clearInterval(this.interval); // 清除定时器
        this.interval = null; // 确保置空
      }
    },
    async apply() {
      try {
        const arr = this.applyData;
        arr[0].value = this.mobile;
        arr[3].value = this.gender;
        arr[2].value = this.age;
        arr[7].value = this.contact;
        arr[12].value = this.blood_type;
        arr[13].value = this.disease;
        arr[14].value = this.insurance;
        var result = await uni.$u.http.post("/match/saveMatchRegister", {
          matchId: 11,
          serialNum: 202503000001,
          templateId: 15,
          way: 1,
          userId: uni.getStorageSync("user").id,
          requestJson: this.applyData,
          responseJson: arr,
          amount: 500,
        });
        if (result.status == 200) {
          this.$refs.notice.show({
            type: "success",
            message: result.message,
          });
          // 清空缓存
          uni.removeStorageSync("mobile");
          uni.removeStorageSync("gender");
          uni.removeStorageSync("age");
          uni.removeStorageSync("contact");
          uni.removeStorageSync("blood_type");
          uni.removeStorageSync("disease");
          uni.removeStorageSync("insurance");
          this.mobile = "";
          this.gender = "1";
          this.age = "";
          this.contact = "";
          this.blood_type = "";
          this.disease = "";
          this.insurance = "";
          uni.navigateTo({
            url: "/competition/apply/pay",
          });
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
      }
    },
    async getMatchTemplateRegister() {
      try {
        var result = await uni.$u.http.get("/match/getMatchTemplateRegister", {
          params: {
            templateId: 15,
          },
        });
        if (result.status == 200) {
          this.applyData = result.data;
          this.age = uni.getStorageSync("age") || this.applyData[2].applyValue;
          const blood = this.applyData[12].applyValue;
          this.columns1 = [blood.split(",")];
          const disease = this.applyData[13].applyValue;
          this.columns2 = [disease.split(",")];
          const insurance = this.applyData[14].applyValue;
          this.columns3 = [insurance.split(",")];
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
      }
    },
    change1(n) {
      uni.setStorageSync("mobile", n);
    },
    change2(n) {
      uni.setStorageSync("age", n);
    },
    change3(n) {
      uni.setStorageSync("contact", n);
    },
    confirm1(n) {
      this.show1 = false;
      this.blood_type = n.value[0];
      uni.setStorageSync("blood_type", n.value[0]);
    },
    confirm2(n) {
      this.show2 = false;
      this.disease = n.value[0];
      uni.setStorageSync("disease", n.value[0]);
    },
    confirm3(n) {
      this.show3 = false;
      this.insurance = n.value[0];
      uni.setStorageSync("insurance", n.value[0]);
    },
    genderChange(n) {
      console.log(n);
    },
    async getMatchTemplateNotice() {
      var result = await uni.$u.http.get("/match/getMatchTemplateNotice", {
        params: {
          templateId: 15,
        },
      });
      if (result.status == 200) {
        console.log(result.data.disclaimer);
        uni.setStorageSync("disclaimer", result.data.disclaimer);
        this.insuranceNotice = result.data.insuranceNotice;
        this.matchNotice = result.data.matchNotice;
        this.know = true;
      }
    },
    toShare() {
      uni.navigateTo({
        url: "/competition/apply/share",
      });
    },
    async getMatchRegisterSuc() {
      var result = await uni.$u.http.get("/match/getMatchRegisterSuc", {
        params: {
          matchId: 11,
        },
      });
      this.publicationTime = result.data.publicationTime;
      this.updateTimeDifference();
    },
    async getMatchSche() {
      var result = await uni.$u.http.get("/match/getMatchSche", {
        params: {
          matchId: 11,
        },
      });
      this.scheTimeList = result.data;
    },
    calculateTimeDifference() {
      const now = new Date(); // 当前时间
      const publicationDate = new Date(this.publicationTime); // 目标时间
      const diffMs = publicationDate - now; // 时间差（毫秒）

      if (diffMs <= 0) {
        return { days: 0, hours: 0, minutes: 0 }; // 如果时间已过期，返回 0
      }

      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 计算天数
      const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ); // 计算小时数
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // 计算分钟数

      return { days: diffDays, hours: diffHours, minutes: diffMinutes };
    },
    updateTimeDifference() {
      this.timeDifference = this.calculateTimeDifference();
    },
    async aggregateMatchReward() {
      // 根据 MatchReward 的数量初始化 list
      this.list = this.MatchReward.map((reward) => ({
        rewardAmount: reward.rewardAmount,
      }));
      // 合并其他数据到 list 中
      this.MatchRewardInfo.forEach((info, index) => {
        if (this.list[index]) {
          Object.assign(this.list[index], { rewardName: info.rewardName });
        }
      });

      this.MatchSponsorRequest.forEach((request, index) => {
        if (this.list[index]) {
          Object.assign(this.list[index], {
            sponsorAmount: request.sponsorAmount,
          });
        }
      });

      this.MatchSponsorPrize.forEach((prize, index) => {
        if (this.list[index]) {
          Object.assign(this.list[index], {
            spReward: prize.rewardName,
            sponsorsUsername: prize.sponsorsUsername,
          });
        }
      });

      this.MatchSponsorServe.forEach((serve, index) => {
        if (this.list[index]) {
          Object.assign(this.list[index], {
            serveContent: serve.serveContent,
            serveName: serve.sponsorsUsername,
          });
        }
      });
    },
    async getMatchReward() {
      var result = await uni.$u.http.get("/match/getMatchReward", {
        params: { matchId: 11 },
      });
      if (result.status == 200) {
        this.MatchReward = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchRewardInfo() {
      var result = await uni.$u.http.get("/match/getMatchRewardInfo", {
        params: { matchId: 11 },
      });
      if (result.status == 200) {
        this.MatchRewardInfo = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchSponsorRequest() {
      var result = await uni.$u.http.get("/match/getMatchSponsorRequest", {
        params: { matchId: 11 },
      });
      if (result.status == 200) {
        this.MatchSponsorRequest = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchSponsorPrize() {
      var result = await uni.$u.http.get("/match/getMatchSponsorPrize", {
        params: { matchId: 11 },
      });
      if (result.status == 200) {
        this.MatchSponsorPrize = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchSponsorServe() {
      var result = await uni.$u.http.get("/match/getMatchSponsorServe", {
        params: { matchId: 11 },
      });
      if (result.status == 200) {
        this.MatchSponsorServe = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchRegisterUserNum() {
      var result = await uni.$u.http.get("/match/getMatchRegisterUserNum", {
        params: { matchId: 11 },
      });
      this.registerNumber = result.data;
      console.log(this.registerNumber);
    },
    back() {
      uni.switchTab({ url: "/pages/play/play" });
    },
  },
  onLoad() {
    this.getMatchTemplateRegister();
  },
  onShow() {
    if (this.isFinish) {
      this.getMatchRegisterSuc();
      this.updateTimeDifference();
      setInterval(() => {
        this.updateTimeDifference();
      }, 60000); // 每分钟更新一次
    }
    if (this.activeTab === 0) {
      this.getMatchRegisterUserNum();
    }
    if (this.activeTab === 0) {
      this.getMatchRegisterUserNum();
    }
    if (this.activeTab == 1) {
      this.getMatchSche();
    }
    if (this.activeTab == 2) {
      this.getMatchReward();
      this.getMatchRewardInfo();
      this.getMatchSponsorRequest();
      this.getMatchSponsorPrize();
      this.getMatchSponsorServe();
    }
  },
  computed: {
    activeTabColor() {
      const color = this.selectColor;
      // 将颜色转换为 RGB 格式并调整亮度
      const rgb = this.hexToRgb(color);
      const adjustedR = Math.min(255, rgb.r + 15); // 确保不超过 255
      const adjustedG = Math.min(255, rgb.g + 15);
      const adjustedB = Math.min(255, rgb.b + 15);

      return `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
    },
    scale() {
      return (
        (this.registerNumber.registerNum / this.registerNumber.number) * 100
      );
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  z-index: 2;

  &.scaled {
    transform: scale(0.7);
    border-radius: 30px;
    overflow: hidden;
  }

  .upload {
    position: relative;
    z-index: 0;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 9;

    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70%;
      width: 100%;
      background-color: #cccccc;

      .img {
        display: flex;
        align-items: center;
        justify-content: center;

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .value {
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 5px;
            border: 1px solid #ffffff;
            border-radius: 20px;
            padding: 5px 10px;
          }
        }
      }
    }

    .next {
      width: 100%;
      height: 30%;

      .message {
        display: flex;
        position: relative;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
        margin: 75px auto;
        z-index: 66666666666;
        width: 90%;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4),
          -4px -4px 10px rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        height: 32px;
        padding: 10px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.1);
        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 6.5%;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid rgba(255, 255, 255, 0.1);
        }
      }
    }

    .cup {
      height: 130px;
      width: 90%;
      border-radius: 5px;
      position: absolute;
      top: 55%;
      overflow: hidden;

      // 添加六边形裁剪
      clip-path: polygon(
        0% 0%,
        // 左上角
        60% 0%,
        // 右上角
        65% 15%,
        // 右中角
        100% 15%,
        // 右下角
        100% 100%,
        // 左下角
        0% 100% // 左中角
      );

      .top {
        display: flex;
        justify-content: space-between;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.2);
        height: 65%;
        &::after {
          content: "";
          position: absolute;
          top: 1px;
          left: 60%;
          width: 100%; // 确保背景覆盖整个容器
          height: 100%;
          background: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/cup-bg1.png")
            no-repeat;
        }

        .left {
          margin-top: 10px;
          margin-left: 15px;

          .first {
            font-weight: 400;
            font-size: 20px;
            color: #ffffff;
          }
          .second {
            margin-top: 10px;
            font-weight: 400;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }

      .next {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 35%;
        padding: 0 15px;
        backdrop-filter: blur(10px);
        width: 92%;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 12;

        .button {
          background-color: black;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 15px;
        }
        .plus {
          width: 70%;
          display: flex;
          align-items: center;
          gap: 10px;
          .more {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }

    .know {
      position: absolute;
      right: 0;
      top: 30%;
      font-weight: 400;
      font-size: 12px;
      color: #fffcf6;
      background-color: #333b4b;
      padding: 3px 10px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .share {
      position: absolute;
      right: 0;
      top: 40%;
      font-weight: 400;
      font-size: 12px;
      color: #fffcf6;
      background-color: #333b4b;
      padding: 3px 10px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .type {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2),
      0px -5px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    z-index: 10;

    .item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px;

      .value {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .item-active {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 15px;
      // background-color: #1e54ba;
      position: relative;
      z-index: 11;
      box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.2),
        -5px 0px 10px rgba(0, 0, 0, 0.2);

      &::after {
        content: "";
        position: absolute;
        top: -5px; // 完全移动到父元素上方
        left: 50%; // 水平居中
        transform: translateX(-50%);
        width: 100%; // 固定宽度
        height: 5px; // 保持高度不变
        // background-color: #1e54ba;
        background-color: var(--active-color); // 动态绑定颜色
      }
      &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        // border-top: 10px solid #1e54ba;
        border-top: 10px solid var(--active-color); // 动态绑定颜色
      }

      .value {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .content {
    background-color: #1b4aa2;
    flex: 1;

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
        width: 84px;
        height: 32px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 12px;
        color: #ffffff;
      }
      .item {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 84px;
        height: 32px;
        border-radius: 20px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
      }
    }
    .main {
      width: 90%;
      margin: auto;

      .text {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 10px;
        padding-left: 16px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
          -5px -5px 10px rgba(0, 0, 0, 0.1);

        .item {
          width: 90%;
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

            .icon {
              color: red;
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

      .al {
        background-color: rgba(255, 255, 255, 0.2);
        margin-top: 18px;
        border-radius: 10px;
        .al-top {
          height: 85px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;

          .item-active {
            display: flex;
            align-items: center;
            flex-direction: column;
            font-weight: 600;
            font-size: 12px;
            color: #ffffff;
            gap: 3px;
            position: relative;
            padding-bottom: 5px;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              border: 2px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .arrow-indicator {
              position: absolute;
              bottom: -10px; /* 控制箭头与文字的距离 */
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid white; /* 白色的向上箭头 */
              transition: all 0.3s linear;
            }
          }
          .item {
            display: flex;
            align-items: center;
            flex-direction: column;
            font-weight: 400;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            gap: 3px;
            position: relative;
            padding-bottom: 5px;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              border: 2px solid rgba(255, 255, 255, 0.2);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .arrow-indicator {
              position: absolute;
              bottom: -10px; /* 控制箭头与文字的距离 */
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid white; /* 白色的向上箭头 */
              transition: all 0.3s linear;
            }
          }
        }
      }

      .jdsz {
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: 20%;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #ffffff;
          top: 50%;
          transform: translateY(-50%);
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

          .item-p {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

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
              color: red;
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
              color: red;
            }
          }

          .many {
          }
          .bt {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 2px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
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
              color: red;
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

        .autonym {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: #2a8aba;
          border-radius: 10px;
          border: 1px solid #f0f0f0;
          width: 90%;
          margin: auto;
        }

        .rz {
          height: 70px;
          background-color: #f3f3f3;
          display: flex;
          align-items: center;
          padding: 14px 12px;
          width: 90%;
          margin: auto;
          box-sizing: border-box;
          margin-top: 12px;
          justify-content: space-between;
          border-radius: 5px;
          .left {
            display: flex;
            flex-direction: column;
            gap: 5px;
            .title {
              font-weight: 600;
              font-size: 14px;
              color: #1d2326;
            }
            text {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
          .right {
            padding: 7px 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            color: #1d2326;
            border-radius: 5px;
          }
        }
      }

      .add {
        background-color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 10px 0;
        margin-top: 10px;
        font-weight: 600;
        font-size: 16px;
        color: #ec384a;
      }

      .end {
        display: flex;
        align-items: center;
        margin-top: 38px;

        .end-i {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
        }

        .save {
          width: 216px;
          height: 44px;
          background-color: black;
          color: white;
          border-radius: 20px;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 0;
          margin-left: 30px;
        }
      }

      .save {
        margin: auto;
        width: 216px;
        height: 44px;
        background-color: black;
        margin-top: 30px;
        border-radius: 20px;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pp {
        width: 262px;
        height: 44px;
        background-color: #cccccc;
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

      .rules {
        border-radius: 10px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.2);
        .top {
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
        }
        .rule {
          background-color: white;
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          border-radius: 10px;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #f0f0f0;
            border-radius: 10px;
            font-weight: 400;
            font-size: 12px;
            color: #1d2326;
            padding: 20px;
          }
        }
      }

      .sm {
        background: white;
        border-radius: 10px;
        margin-top: 10px;
        padding: 16px 12px;
        overflow: hidden;
        .title {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
        }
        .gn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 15px;
          .left {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .right {
            display: flex;
            align-items: center;
            gap: 5px;
            .up {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.3);
              width: 52px;
              height: 24px;
              border-radius: 20px;
              border: 1px solid #f0f0f0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .down {
              font-weight: 400;
              font-size: 12px;
              color: #1d2326;
              width: 52px;
              height: 24px;
              border-radius: 20px;
              border: 1px solid #f0f0f0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .delete {
              font-weight: 400;
              font-size: 12px;
              color: #1d2326;
              width: 52px;
              height: 24px;
              border-radius: 20px;
              border: 1px solid #f0f0f0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        .t1 {
          border: 1px solid #f0f0f0;
          border-radius: 5px;
          width: 318px;
          height: 160px;
          margin-top: 10px;
        }
        .add {
          display: flex;
          gap: 24px;
          justify-content: flex-start;
          padding: 0;
          .item {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
            gap: 5px;
          }
        }
      }

      .tx {
        background-color: blue;
      }

      .apply-first {
        border-radius: 10px;
        padding: 12px;
        background-color: #fff;
        // box-shadow: inset 0px 13px 15px #fff1dc;
        background: linear-gradient(180deg, #fff0dc, #fff 20%);
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
        }
        .bt {
          display: flex;
          align-items: center;
          margin-top: 12px;
          justify-content: space-between;
          .total {
            width: 74px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            height: 95px;
            background: linear-gradient(180deg, #fffaf3, #fff);
            .zfy {
              font-weight: 400;
              font-size: 12px;
              color: #1d2326;
            }
            .price {
              font-weight: 800;
              font-size: 16px;
              color: #ec384a;
            }
          }
          .dy {
            font-weight: 600;
            font-size: 32px;
            color: #1d2326;
          }
          .detail {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 60%;
            .item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .left {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: 400;
                font-size: 14px;
                color: #1d2326;
              }
              .right {
                font-weight: 400;
                font-size: 14px;
                color: #1d2326;
              }
              .right-r {
                font-weight: 400;
                font-size: 14px;
                color: #ec384a;
              }
            }
          }
        }
      }

      .apply-second {
        padding: 12px;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 18px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            display: flex;
            font-weight: 600;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.5);
            align-items: center;
            gap: 5px;
            text {
              font-weight: 800;
              font-size: 16px;
              color: #ec384a;
            }
          }

          .right {
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
        .progress {
          margin: 10px 0px 24px;
        }
        .botton {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
          background-color: #ec384a;
          height: 44px;
          border-radius: 20px;
        }
      }

      .time-line {
        display: flex;
        flex-direction: column;
        padding-bottom: 24px;
        border-radius: 10px;
        padding-top: 24px;
        padding-left: 15px;
        background: rgba(255, 255, 255, 0.1);
        margin-top: 30px;
        overflow-x: scroll;
        .name {
          display: flex;
          align-items: center;
          gap: 30px;
          .item-active {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;

            .title {
              font-weight: 400;
              font-size: 10px;
              color: #ffffff;
              white-space: nowrap;
              text-align: center;
            }

            .time {
              padding: 6px 12px;
              font-weight: 600;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              color: #15181a;
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;
              background: linear-gradient(
                94deg,
                #ffffff 0%,
                #ffdfe8 47%,
                #71d0ff 100%
              );
            }
            .line {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: 2px solid #fff;
              background-color: #17a7ef;
              position: relative;
              .dian {
                position: absolute;
                left: 180%;
                top: 50%;
                transform: translateY(-55%);
                color: white;
              }
            }
          }
          .item {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;

            .title {
              font-weight: 400;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.5);
              white-space: nowrap;
              text-align: center;
            }

            .time {
              font-weight: 600;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.5);
              white-space: nowrap;
            }

            .line {
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: 2px solid rgba(255, 255, 255, 0.3);
              margin-top: 10px;
              position: relative;
              .dian {
                position: absolute;
                left: 180%;
                top: 50%;
                transform: translateY(-55%);
                color: rgba(255, 255, 255, 0.3);
              }
            }
          }
        }
      }

      .sshj {
        .schedule-table {
          border: 1px solid #849ed0;
          border-radius: 10px;
          display: flex;
          height: 350px;
          overflow: hidden;
          box-sizing: border-box;
          .side-text {
            width: 10%;
            //让字体竖着排列
            writing-mode: vertical-rl;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          }
          .table-content {
            width: 90%;
            flex-direction: column;
            display: flex;
            .table-row {
              display: flex;
              flex: 1;
              .table-cell {
                border: 1px solid #849ed0;
                box-sizing: border-box;
                font-weight: 400;
                font-size: 12px;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                border-right: none;
              }
              .stage {
                width: 40%;
              }
              .time {
                width: 60%;
              }
            }
          }
        }
      }
    }

    .look {
      .main {
        width: 80%;
        margin: 15px auto;
        height: 414px;
        background: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/奖励一览_切图.svg")
          no-repeat center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .nickname {
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
        }
        .rank {
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin-top: 25px;
        }

        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 143px;
          height: 143px;
        }
        .xian {
          width: 80%;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0)
          );
          margin-top: 12px;
        }

        .zbf {
          font-weight: 600;
          font-size: 12px;
          color: #15181a;
          margin-top: 9px;
        }

        .money {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
          display: flex;
          align-items: center;
          margin-top: 9px;
          gap: 5px;
          text {
            font-weight: 600;
            font-size: 12px;
            color: #1d2326;
          }
          .wen {
            color: white;
            border-radius: 50%;
            border: 1px solid #fff;
            width: 12px;
            height: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .food {
          margin-top: 4px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
        }
        .zzs {
          font-weight: 600;
          font-size: 12px;
          color: #15181a;
          margin-top: 12px;
        }
        .lesson {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          .left {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
          }
          .right {
            font-weight: 400;
            font-size: 10px;
            color: #2a8aba;
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .rank-list {
      width: 90%;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 10px 0px;
      margin-top: 23px;
      .item {
        text-align: center;
        font-weight: 400;
        font-size: 10px;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 5px;
        .title {
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .thank {
      width: 90%;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 43px;

      .thank-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        background-color: rgba(255, 255, 255, 0.1);
        height: 130px;
        overflow-y: scroll;
        border-radius: 10px;
        gap: 20px;
        padding-top: 40px;

        box-sizing: border-box;

        .item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-weight: 400;
          font-size: 13px;
          color: #ffffff;
          .first {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }
        }
      }
    }

    .award {
      width: 90%;
      margin: auto;
      .table {
        display: flex;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.1);
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .rank {
            width: 20%;
            height: 206px;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .some {
            width: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            box-sizing: border-box;
            height: 206px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            .zbf {
              font-weight: 600;
              font-size: 12px;
              color: #fff;
            }

            .money {
              font-weight: 400;
              font-size: 12px;
              color: #fff;
              display: flex;
              align-items: center;
              margin-top: 9px;
              gap: 5px;
              text {
                font-weight: 600;
                font-size: 12px;
                color: #fff;
              }
              .wen {
                color: white;
                border-radius: 50%;
                border: 1px solid #fff;
                width: 12px;
                height: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .food {
              margin-top: 4px;
              font-weight: 400;
              font-size: 12px;
              color: #fff;
            }
            .zzs {
              font-weight: 600;
              font-size: 12px;
              color: #fff;
              margin-top: 12px;
            }
            .lesson {
              display: flex;
              align-items: center;
              gap: 5px;
              margin-top: 6px;
              .left {
                font-weight: 400;
                font-size: 12px;
                color: #fff;
              }
              .right {
                font-weight: 400;
                font-size: 10px;
                color: #fff;
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }

    .finish {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      background-color: #fff;
      border-radius: 10px;
      padding: 36px 0;
      .title {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 600;
        font-size: 16px;
        color: #1d2326;
        margin-top: 14px;
      }
      .gray {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
        margin-top: 8px;
      }
      .time {
        display: flex;
        align-items: center;
        gap: 5px;
        text {
          margin-top: 10px;
        }
        .item {
          background-color: black;
          width: 40px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          color: #ffffff;
          margin-top: 19px;
        }
      }

      .bt {
        width: 216px;
        height: 44px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #f0f0f0;
        border-radius: 20px;
        margin-top: 50px;
        font-weight: 400;
        font-size: 16px;
        color: #1d2326;
      }
    }
  }
}

.u-icon {
  display: flex;
  justify-content: center;
}

.tx-container {
  position: relative;
  width: 100%;
  .t1 {
    width: 100%;
    padding: 12px 12px 25px 12px; // 增加内边距
    border-radius: 8px; // 圆角边框
    line-height: 22px; // 增加行高
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.2); // 柔和的背景色
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
      -5px -5px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin-top: 15px;
  }

  .count {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
    text {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.placeholderClass {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.modal-content {
  position: relative;
  .x {
    position: absolute;
    right: 0;
    top: 0;
  }
  .section-title {
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
    margin-bottom: 10px;
    text-align: center;
  }
  .section-content {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #1d2326;
  }
}

.modal-footer {
  text-align: center;
  width: 152px;
  height: 44px;
  margin: auto;
  background-color: #b9baba;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
</style>
