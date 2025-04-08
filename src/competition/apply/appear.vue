<template>
  <view class="box">
    <u-navbar
      bgColor="rgba(0,0,0,0)"
      @leftClick="back"
      leftIconColor="#ffffff"
    ></u-navbar>

    <view class="upload">
      <view class="top">
        <image
          :src="mainFile"
          mode="aspectFill"
          style="width: 100%; height: 350px"
        />
      </view>

      <view
        class="next"
        :style="{
          background: `linear-gradient(180deg,rgba(255,255,255,0.1) 0%,${selectColor} 30%)`,
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
            <view class="first">{{ fuTitle }}</view>
            <view class="second">{{ fuName }}</view>
          </view>
        </view>

        <view class="next">
          <view class="plus">
            <u-avatar
              :src="item.sponsorAvatarUrl"
              size="24"
              v-for="(item, index) in sponsorList"
              :key="index"
            ></u-avatar>
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
      <view class="share" @click="toShare">
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
          v-if="way != 1"
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
        <view class="o-text" v-if="way != 1">
          <view class="item">
            <view class="left">小队类型 <view class="icon">*</view></view>
            <view class="right">
              <u-radio-group v-model="teamType" placement="row">
                <u-radio
                  activeColor="red"
                  label="正式小队"
                  shape="circle"
                  name="2"
                ></u-radio>
                <u-radio
                  activeColor="red"
                  label="临时组队"
                  name="3"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-radio>
              </u-radio-group>
            </view>
          </view>
          <view class="item" v-if="teamType == 2">
            <view class="item-p">请选择参赛小队</view>
            <view class="right">
              <u-icon name="arrow-down" color="#BBBDBE" size="12"></u-icon>
            </view>
          </view>
        </view>
        <view class="al">
          <view class="al-top" v-if="way != 1">
            <view
              :class="activeIndex === 0 ? 'item-active' : 'item'"
              @tap="switchTeam(0)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>小青爱健身</text>
              <view class="arrow-indicator" v-if="activeIndex === 0"></view>
            </view>

            <view
              :class="activeIndex === 1 ? 'item-active' : 'item'"
              @tap="switchTeam(1)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>龙猫</text>
              <view class="arrow-indicator" v-if="activeIndex === 1"></view>
            </view>

            <view
              :class="activeIndex === 2 ? 'item-active' : 'item'"
              @tap="switchTeam(2)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>聪明小龙</text>
              <view class="arrow-indicator" v-if="activeIndex === 2"></view>
            </view>

            <view
              :class="activeIndex === 3 ? 'item-active' : 'item'"
              @tap="switchTeam(3)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>小胖喵喵</text>
              <view class="arrow-indicator" v-if="activeIndex === 3"></view>
            </view>

            <view
              :class="activeIndex === 4 ? 'item-active' : 'item'"
              @tap="switchTeam(4)"
            >
              <view class="avatar">
                <u-avatar :src="src" size="30"></u-avatar>
              </view>
              <text>姐姐</text>

              <view class="arrow-indicator" v-if="activeIndex === 4"></view>
            </view>

            <image
              src="/static/images/加号.png"
              mode="scaleToFill"
              style="width: 38px; height: 38px"
              v-if="teamType == 3"
            />
          </view>
          <view class="o-text" style="margin: 0">
            <view class="item" v-if="way != 1">
              <view class="left">真实姓名</view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="realName"
                    placeholder="请填写真实姓名"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="placeholderClass"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item" v-if="way != 1">
              <view class="left">证件类型</view>
              <view class="right">
                身份证
                <!-- <view style="width: 110px">
                  
                  <u-input
                    v-model="identificationType"
                    placeholder="身份证"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="placeholderClass"
                  ></u-input>
                </view> -->
              </view>
            </view>
            <view class="item" style="border: none" v-if="way != 1">
              <view class="left">证件号码</view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="identification"
                    placeholder="请填写证件号码"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="placeholderClass"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="autonym" v-if="way != 1" @click="autonym"
              >授权实名信息给主办方</view
            >
            <view class="rz" v-else>
              <view class="left">
                <view class="title">报名参赛需要实名认证</view>
                <text>您还未完成实名认证</text>
              </view>
              <view class="right"> 立即认证 </view>
            </view>
            <view class="form" v-for="(item, index) in applyData" :key="index">
              <view :class="item.applyType == 'checkbox' ? 'item-o' : 'item'">
                <view class="left"
                  >{{ item.applyName }}
                  <view class="icon" v-if="item.applyMust == 1">*</view></view
                >
                <view class="right">
                  <u-input
                    v-if="
                      item.applyType == 'input' || item.applyType == 'number'
                    "
                    v-model="item.value"
                    :placeholder="'请填写' + item.applyName"
                    border="none"
                    placeholderClass="placeholderClass"
                    input-align="right"
                    :type="item.applyType == 'number' ? 'number' : ''"
                  ></u-input>
                  <u-radio-group
                    v-model="gender"
                    placement="row"
                    @change="genderChange"
                    v-if="item.applyType == 'radio'"
                  >
                    <u-radio
                      activeColor="red"
                      :label="gender"
                      shape="circle"
                      :name="genderIndex + 1"
                      v-for="(gender, genderIndex) in item.applyValue.split(
                        ','
                      )"
                      :key="genderIndex"
                      customStyle="margin-left: 20px"
                    ></u-radio>
                  </u-radio-group>
                  <u-checkbox-group
                    v-model="item.value"
                    v-if="item.applyType == 'checkbox'"
                  >
                    <u-checkbox
                      v-for="(option, optionIndex) in item.applyValue.split(
                        ','
                      )"
                      :key="optionIndex"
                      :label="option"
                      :name="optionIndex + 1"
                      customStyle="margin-right: 5px"
                      activeColor="red"
                      shape="circle"
                    ></u-checkbox>
                  </u-checkbox-group>

                  <view
                    v-if="item.applyType === 'select'"
                    @click="openPicker(item)"
                  >
                    <text :style="{ color: item.value ? 'black' : '' }">
                      {{ item.name || `请选择${item.applyName}` }}
                    </text>
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
                  </view>
                </view>
              </view>
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
              <view class="price">￥{{ total }}</view>
            </view>
            <view class="dy">=</view>
            <view class="detail">
              <view class="item">
                <view class="left">
                  <u-icon name="account"></u-icon>
                  报名人数
                </view>
                <view class="right"> {{ number }}人 </view>
              </view>
              <view class="item">
                <view class="left">
                  <u-icon name="red-packet"></u-icon>
                  小队报名费
                </view>
                <view class="right-r"> ￥{{ entry_Fee }} </view>
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
                <view class="right-r"> ￥2*{{ number }}={{ 2 * number }} </view>
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
          <view class="botton" @click="apply"> ￥{{ total }}报名参赛 </view>
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
      style="padding-bottom: 100px"
    >
      <view class="main">
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

        <view class="group">
          <view class="top"> 小组淘汰赛A组 </view>
          <view class="bottom">
            <view class="place">
              <view class="item">
                <u-icon name="map"></u-icon>天河体育中心羽毛球馆
              </view>

              <view class="judge">
                <u-avatar :src="src" size="60"></u-avatar>
                <view class="name">裁判员</view>
              </view>
            </view>
            <view class="time">
              <u-icon name="clock"></u-icon>
              11月19日 14:00
            </view>

            <view class="link">
              直播地址
              <view class="lj">https://v.douyin.com/iA23Phvv/7@7.com :9pm</view
              ><text>复制</text>
            </view>

            <view class="member">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A02</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A03</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A04</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
            </view>
          </view>
        </view>
        <view class="group">
          <view class="top"> 小组淘汰赛A组 </view>
          <view class="bottom">
            <view class="place">
              <view class="item">
                <u-icon name="map"></u-icon>天河体育中心羽毛球馆
              </view>

              <view class="judge">
                <u-avatar :src="src" size="60"></u-avatar>
                <view class="name">裁判员</view>
              </view>
            </view>
            <view class="time">
              <u-icon name="clock"></u-icon>
              11月19日 14:00
            </view>

            <view class="link">
              直播地址
              <view class="lj">https://v.douyin.com/iA23Phvv/7@7.com :9pm</view
              ><text>复制</text>
            </view>

            <view class="member">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A02</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A03</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A04</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
            </view>
          </view>
        </view>
        <view class="group">
          <view class="top"> 小组淘汰赛A组 </view>
          <view class="bottom">
            <view class="place">
              <view class="item">
                <u-icon name="map"></u-icon>天河体育中心羽毛球馆
              </view>

              <view class="judge">
                <u-avatar :src="src" size="60"></u-avatar>
                <view class="name">裁判员</view>
              </view>
            </view>
            <view class="time">
              <u-icon name="clock"></u-icon>
              11月19日 14:00
            </view>

            <view class="link">
              直播地址
              <view class="lj">https://v.douyin.com/iA23Phvv/7@7.com :9pm</view
              ><text>复制</text>
            </view>

            <view class="member">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A02</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A03</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A04</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
            </view>
          </view>
        </view>
        <view class="group">
          <view class="top"> 小组淘汰赛A组 </view>
          <view class="bottom">
            <view class="place">
              <view class="item">
                <u-icon name="map"></u-icon>天河体育中心羽毛球馆
              </view>

              <view class="judge">
                <u-avatar :src="src" size="60"></u-avatar>
                <view class="name">裁判员</view>
              </view>
            </view>
            <view class="time">
              <u-icon name="clock"></u-icon>
              11月19日 14:00
            </view>

            <view class="link">
              直播地址
              <view class="lj">https://v.douyin.com/iA23Phvv/7@7.com :9pm</view
              ><text>复制</text>
            </view>

            <view class="member">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A02</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A03</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">A04</view>
                </view>
                <view class="grade">积分 0</view>
              </view>
            </view>
          </view>
        </view>
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
              @click="op = index"
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

    <u-picker
      :show="pickerShow"
      :columns="columns"
      @cancel="pickerShow = false"
      @confirm="confirmPicker"
    ></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: uni.getStorageSync("activeTab") || 0,
      activeIndex: 0,
      selectColor: "",
      tabs: ["报名比赛", "赛事环节", "赛事奖励", "赛事直击", "赛事规则"],
      isFinish: false,
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
      blood_type: "",
      insurance: "",
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
      currentField: null, // 当前正在操作的字段
      pickerShow: false, // 控制 picker 的显示状态
      columns: [],
      oldApplyData: [],
      serialNum: null,
      matchId: null,
      way: null,
      number: null,
      entry_Fee: null,
      templateId: null,
      teamType: "3",
      sponsorList: [],
      fuTitle: "",
      mainFile: "",
      fuName: "",
      gameList: [],
      op: 0,
      realName: "",
      identificationType: "1",
      identification: "",
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
      if (index == 3) {
        this.getGame();
      }
    },
    switchTeam(index) {
      this.activeIndex = index;
    },
    async getGame() {
      var result = await uni.$u.http.get("/match/getMatchSche", {
        params: {
          matchId: this.matchId,
        },
      });
      if (result.status == 200) {
        this.gameList = result.data;
        this.gameList = this.gameList.filter(
          (item, index) =>
            item.scheTypeCode !== "registrationTime" &&
            item.scheTypeCode !== "publicationTime"
        );
        uni.setStorageSync("gameList", this.gameList);
      }
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
        url: `/competition/apply/more?matchId=${this.matchId}`,
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
      this.know = true;
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
      const validate = this.applyData.some((item) => {
        return item.applyMust === "1" && !item.value;
      });
      if (validate) {
        this.$refs.notice.show({
          type: "error",
          message: "请填写必填项",
        });
        return;
      }
      uni.setStorageSync("requestJson", this.oldApplyData);
      uni.setStorageSync("responseJson", this.applyData);
      uni.navigateTo({
        url: `/competition/apply/pay?matchId=${this.matchId}&&way=${this.way}&&serialNum=${this.serialNum}&&templateId=${this.templateId}&&teamType=${this.teamType}&&amount=${this.total}`,
      });
    },
    async getMatchTemplateRegister() {
      try {
        var result = await uni.$u.http.get("/match/getMatchTemplateRegister", {
          params: {
            templateId: this.templateId,
          },
        });
        if (result.status == 200) {
          this.applyData = result.data;
          this.oldApplyData = result.data;
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
      }
    },
    genderChange(n) {
      console.log(n);
    },
    async getMatchTemplateNotice() {
      var result = await uni.$u.http.get("/match/getMatchTemplateNotice", {
        params: {
          templateId: this.templateId,
        },
      });
      if (result.status == 200) {
        uni.setStorageSync("disclaimer", result.data.disclaimer);
        this.insuranceNotice = result.data.insuranceNotice;
        this.matchNotice = result.data.matchNotice;
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
          matchId: this.matchId,
        },
      });
      this.publicationTime = result.data.publicationTime;
      this.updateTimeDifference();
    },
    async getMatchSche() {
      var result = await uni.$u.http.get("/match/getMatchSche", {
        params: {
          matchId: this.matchId,
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
        params: { matchId: this.matchId },
      });
      if (result.status == 200) {
        this.MatchReward = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchRewardInfo() {
      var result = await uni.$u.http.get("/match/getMatchRewardInfo", {
        params: { matchId: this.matchId },
      });
      if (result.status == 200) {
        this.MatchRewardInfo = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchSponsorRequest() {
      var result = await uni.$u.http.get("/match/getMatchSponsorRequest", {
        params: { matchId: this.matchId },
      });
      if (result.status == 200) {
        this.MatchSponsorRequest = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchSponsorPrize() {
      var result = await uni.$u.http.get("/match/getMatchSponsorPrize", {
        params: { matchId: this.matchId },
      });
      if (result.status == 200) {
        this.MatchSponsorPrize = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchSponsorServe() {
      var result = await uni.$u.http.get("/match/getMatchSponsorServe", {
        params: { matchId: this.matchId },
      });
      if (result.status == 200) {
        this.MatchSponsorServe = result.data;
        this.aggregateMatchReward();
      }
    },
    async getMatchRegisterUserNum() {
      var result = await uni.$u.http.get("/match/getMatchRegisterUserNum", {
        params: { matchId: this.matchId },
      });
      this.registerNumber = result.data;
    },
    back() {
      uni.switchTab({ url: "/pages/play/play" });
    },
    openPicker(item) {
      this.currentField = item;
      const b = this.applyData.find(
        (a) => a.applyCode === item.applyCode
      ).applyValue;
      this.columns = [b.split(",")];
      this.pickerShow = true;
    },
    confirmPicker(n) {
      this.currentField.value = n.indexs[0] + 1;
      this.currentField.name = n.value[0];
      this.pickerShow = false;
    },
    async getMatchRegisterInfo() {
      var result = await uni.$u.http.get("/match/getMatchRegisterInfo", {
        params: {
          matchId: this.matchId,
        },
      });
      this.way = result.data.way;
      this.templateId = result.data.templateId;
      this.getMatchTemplateRegister();
      this.getMatchTemplateNotice();
      if (this.way == 1) {
        this.number = 1;
        this.entry_Fee = result.data.entryFee;
      }
      if (this.way == 2) {
        this.number = result.data.groupPerNum;
        this.entry_Fee = result.data.entryFee * result.data.groupPerNum;
      }
    },
    async getMatchSponsorUser() {
      var result = await uni.$u.http.get("/match/getMatchSponsorUser", {
        params: {
          matchId: this.matchId,
        },
      });
      if (result.status == 200) {
        this.sponsorList = result.data.sponsors;
      }
    },
    async autonym() {
      try {
        var result = await uni.$u.http.post("/saveWjRealName", {
          realName: this.realName,
          identificationType: this.identificationType,
          identification: this.identification,
        });
        if (result.status == 200) {
          this.$refs.notice.show({
            type: "success",
            message: result.message,
          });
        }
        if (result.status == 400) {
          this.$refs.notice.show({
            type: "error",
            message: result.message,
          });
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
      }
    },
    async getMatchBasicInfo() {
      var result = await uni.$u.http.get("/match/getMatchBasicInfo", {
        params: {
          matchId: this.matchId,
        },
      });
      this.fuTitle = result.data.fuTitle;
      this.mainFile = result.data.mainImageUrl;
      this.fuName = result.data.name;
      this.serialNum = result.data.serialNum;
      this.selectColor = result.data.color || "#1B4CA7";
    },
  },
  onLoad(options) {
    if (options && options.matchId) {
      this.matchId = options.matchId;
    }

    if (options && options.isFinish) {
      this.isFinish = options.isFinish;
    }
    this.getMatchRegisterInfo();
    this.getMatchSponsorUser();
    this.getMatchBasicInfo();
    this.getGame();
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
    total() {
      return this.entry_Fee + 2 * this.number;
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
            font-family: youshe;
          }
          .second {
            margin-top: 10px;
            font-weight: 400;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
            font-family: youshe;
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
      font-family: youshe;

      .value {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .item-active {
      font-family: youshe;
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
        font-size: 14px;
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

      .group {
        border-radius: 12px;
        height: 220px;
        box-sizing: border-box;
        overflow: hidden;
        margin-top: 22px;
        background-color: rgba(255, 255, 255, 0.2);
        .top {
          height: 15%;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
          line-height: 36px;
          padding-left: 12px;
        }
        .bottom {
          height: 85%;
          background-color: #fff;
          border-radius: 12px;
          padding: 12px;
          box-sizing: border-box;
          position: relative;
          .place {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.6);
              display: flex;
              align-items: center;
              gap: 5px;
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
          .time {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            margin-top: 11px;
          }

          .link {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 10px;
            color: rgba(29, 35, 38, 0.6);
            gap: 10px;
            margin-top: 14px;
            .lj {
              font-weight: 400;
              font-size: 10px;
              color: #1d2326;
            }
            text {
              font-weight: 400;
              font-size: 12px;
              color: #2a8aba;
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
              .avatar {
                position: relative;
                .rank {
                  position: absolute;
                  bottom: 0;
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
                margin-top: 5px;
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
