<template>
  <view class="box">
    <u-navbar
      bgColor="rgba(0,0,0,0)"
      autoBack
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
            <view class="more"
              >更多
              <u-icon name="play-right-fill" color="#fff" size="8"></u-icon>
            </view>
          </view>
          <view class="button" @click="changeSkin = true">我要赞助</view>
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
      <view class="know">赛事须知</view>
      <view class="share">
        <u-icon name="share-square" color="#fff"></u-icon>分享</view
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
      v-if="activeTab == 0"
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
          src="/static/images/基础信息.svg"
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
                    v-model="name"
                    placeholder="请填写手机号"
                    border="none"
                    @change="blur1"
                    input-align="right"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">性别 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group
                  v-model="type"
                  placement="row"
                  @change="groupChange"
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
                    v-model="name"
                    placeholder="请填写年龄"
                    border="none"
                    @change="blur1"
                    input-align="right"
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
                    v-model="name"
                    placeholder="请填写紧急联系人手机号"
                    border="none"
                    @change="blur1"
                    input-align="right"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">血型<view class="icon">*</view></view>
              <view
                class="right"
                @click="toTemplete"
                :style="{ width: templateName ? '60%' : '' }"
                ><text :style="{ color: templateName ? 'black' : '' }">{{
                  templateName || "请选择血型"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">基础疾病<view class="icon">*</view></view>
              <view
                class="right"
                @click="toTemplete"
                :style="{ width: templateName ? '60%' : '' }"
                ><text :style="{ color: templateName ? 'black' : '' }">{{
                  templateName || "请选择基础疾病"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">保险保障<view class="icon">*</view></view>
              <view
                class="right"
                @click="toTemplete"
                :style="{ width: templateName ? '60%' : '' }"
                ><text :style="{ color: templateName ? 'black' : '' }">{{
                  templateName || "参与者意外保险"
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
      v-if="activeTab == 0"
      :style="{ background: selectColor }"
      style="padding-bottom: 102px"
    >
      <view class="main">
        <image
          src="/static/images/报名参赛.svg"
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
                    src="/static/images/保险.svg"
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
              已报名<text>16</text>个
              <u-avatar-group :urls="urls" size="24" gap="0.3"></u-avatar-group>
            </view>

            <view class="right"> 16/32 </view>
          </view>
          <view class="progress">
            <u-line-progress
              :percentage="30"
              height="8"
              activeColor="#EC384A"
              :showText="false"
            ></u-line-progress>
          </view>
          <view class="botton"> ￥504报名参赛 </view>
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
            <view class="item">
              <view class="title-active">参赛报名时间</view>
              <view class="time-active">10.7-10.11</view>
            </view>
            <view class="item">
              <view class="title">赛事名单公布</view>
              <view class="time">10.11 20:00</view>
            </view>
            <view class="item">
              <view class="title">八强赛</view>
              <view class="time">10.12 14:00</view>
            </view>
            <view class="item">
              <view class="title">小组淘汰赛</view>
              <view class="time">10.13 14:00</view>
            </view>
          </view>
          <view class="line">
            <view class="line-item">
              <view class="item-active"></view>
              <view class="dian-active">...................</view>
            </view>
            <view class="line-item">
              <view class="item"></view>
              <view class="dian">..................</view>
            </view>
            <view class="line-item">
              <view class="item"></view>
              <view class="dian">.................</view>
            </view>
            <view class="line-item">
              <view class="item"></view>
              <view class="dian">..................</view>
            </view>
          </view>
        </view>

        <view class="sshj">
          <image
            src="/static/images/赛事环节.svg"
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
                v-for="(item, index) in scheduleData"
                :key="index"
              >
                <view class="table-cell stage">{{ item.stage }}</view>
                <view class="table-cell time">{{ item.time }}</view>
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
      style="padding-bottom: 96px"
    >
      <view class="look">
        <view class="main">
          <view class="avatar" style="position: relative">
            <u-avatar :src="src" size="90"></u-avatar>
            <image
              src="/static/images/奖励边框.svg"
              mode="scaleToFill"
              style="
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
              "
            />
          </view>

          <view class="nickname">无名之辈</view>
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
            <text>5000</text>
            RMB奖金
            <u-icon name="checkmark-circle" color="green"></u-icon
          ></view>
          <view class="lesson">
            <view class="left">康复拉伸课×1</view>
            <view>康复工作室</view>
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
            placeholder-class="placeholder-class"
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: uni.getStorageSync("activeTab") || 0,
      activeIndex: 0, // 默认选中第一项 - 小青爱健身
      selectColor: uni.getStorageSync("theme") || "#1B4CA7",
      tabs: ["报名比赛", "赛事环节", "赛事奖励", "赛事直击", "赛事规则"],
      applyStatus: 1, //1——单人报名 2——团队报名
      scheduleData: [
        { stage: "参赛报名时间", time: "10月7日-10月11日" },
        { stage: "赛事名单公布", time: "10月11日 20:00" },
        { stage: "小组淘汰赛", time: "10月12日 14:00" },
        { stage: "8强赛", time: "10月13日 14:00" },
        { stage: "1/4决赛", time: "10月19日 18:00" },
        { stage: "季军赛", time: "10月20日 18:00" },
        { stage: "决赛", time: "10月20日 20:00" },
      ],
    };
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
      uni.setStorageSync("activeTab", index);
    },
    switchTeam(index) {
      this.activeIndex = index;
      // 可以在这里添加其他逻辑，如更新表单数据等
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    },
  },
  computed: {
    activeTabColor() {
      const color = this.selectColor;
      if (!color) return "#1e54ba"; // 默认颜色

      // 将颜色转换为 RGB 格式并调整亮度
      const rgb = this.hexToRgb(color);
      const adjustedR = Math.min(255, rgb.r + 15); // 确保不超过 255
      const adjustedG = Math.min(255, rgb.g + 15);
      const adjustedB = Math.min(255, rgb.b + 15);

      return `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
    },
  },
};
</script>

<style lang="scss">
:root {
  --active-color: v-bind(selectColor);
}

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
          .item {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .title-active {
              font-weight: 400;
              font-size: 10px;
              color: #ffffff;
              white-space: nowrap;
              text-align: center;
            }
            .title {
              font-weight: 400;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.5);
              white-space: nowrap;
              text-align: center;
            }
            .time-active {
              height: 20px;
              border-radius: 10px;
              background: linear-gradient(
                94deg,
                #ffffff 0%,
                #ffdfe8 47%,
                #71d0ff 100%
              );
              font-weight: 600;
              font-size: 10px;
              color: #15181a;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 70px;
            }
            .time {
              font-weight: 600;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.5);
              white-space: nowrap;
            }
          }
        }
        .line {
          display: flex;
          align-items: center;
          margin-top: 12px;
          gap: 5px;
          margin-left: 25px;
          .line-item {
            display: flex;
            align-items: center;

            .item {
              width: 10px;
              height: 10px;
              border: 2px solid rgba(255, 255, 255, 0.4);
              border-radius: 50%;
              position: relative;
            }
            .item-active {
              width: 10px;
              height: 10px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              position: relative;
              background-color: #17a7ef;
            }
            .dian {
              margin-top: -12px;
              margin-left: 5px;
              color: rgba(255, 255, 255, 0.2);
            }
            .dian-active {
              margin-top: -12px;
              margin-left: 5px;
              color: rgba(255, 255, 255, 0.8);
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

        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
        }

        .zbf {
          font-weight: 600;
          font-size: 12px;
          color: #15181a;
        }

        .money {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
          display: flex;
          align-items: center;
          text {
            font-weight: 600;
            font-size: 12px;
            color: #1d2326;
          }
          .wen{
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

.placeholder-class {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
