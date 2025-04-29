<template>
  <view class="new">
    <u-navbar
      v-if="changeSkin"
      leftText="个性换肤"
      @leftClick="enter"
    ></u-navbar>
    <view class="color" v-if="changeSkin && !custom">
      <view class="top">
        <view class="left">推荐色板</view>
        <view class="right">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/调色板.png"
            mode="scaleToFill"
            style="width: 16px; height: 16px"
          />
          <text @click="custom = true">自定义</text>
        </view>
      </view>

      <u-scroll-list :indicator="false">
        <view class="color-info">
          <view
            class="item"
            v-for="(item, index) in colorList"
            :key="index"
            :style="{ background: item }"
            @click="selectColor = item"
          >
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/勾.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px"
              v-if="selectColor == item"
            />
          </view>
        </view>
      </u-scroll-list>
    </view>

    <view class="costom-color" v-if="changeSkin && custom">
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/x.png"
        mode="scaleToFill"
        style="width: 24px; height: 24px"
        @click="custom = false"
      />
      <!-- 自定义颜色滑动条 -->
      <view
        class="slider-track"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="stopDrag"
      >
        <view
          class="slider-thumb"
          :style="{ left: sliderPosition + '%' }"
        ></view>
      </view>
    </view>
    <view :class="['box', changeSkin ? 'scaled' : '']">
      <u-navbar :bgColor="navBgColor" autoBack leftIconColor="black"></u-navbar>
      <view class="upload">
        <view class="top">
          <image
            :src="mainFile"
            mode="aspectFill"
            v-if="mainFile"
            style="width: 100%; height: 350px"
          />
          <view class="img" v-else>
            <view class="info">
              <u-icon name="photo" size="54" color="#ffffff"></u-icon>
              <view class="value" @click="uploadMainFile"
                >上传主图
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/上传.png"
                  mode="scaleToFill"
                  style="width: 16px; height: 16px"
                />
              </view>
              <view class="notice">最佳图片比例1:1</view>
            </view>
          </view>
        </view>

        <view
          class="next-u"
          :style="{
            background: `linear-gradient(180deg,rgba(255,255,255,0.1) 0%,${selectColor} 30%)`,
          }"
        ></view>

        <view class="cup">
          <view class="top">
            <view class="left">
              <view class="first">{{ name_copy || "这里是赛事名称" }}</view>
              <view class="second">{{
                fuTitle_copy || "这里是赛事副标题"
              }}</view>
            </view>
          </view>

          <view class="next">
            <view class="plus"></view>
            <view class="button" @click="changeSkin = true">个性换肤</view>
          </view>
        </view>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/match/cup.png"
          mode="scaleToFill"
          style="
            width: 96px;
            height: 107px;
            position: absolute;
            top: 56%;
            right: 20px;
            z-index: 9;
          "
        />
        <view class="change" @click="uploadMainFile" v-if="mainFile"
          >更换图片</view
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
          <view class="value-active" v-if="activeTab == index">{{ tab }}</view>
          <view class="value" v-else>{{ tab }}</view>

          <!-- <view class="value" v-if="activeTab != index">{{ tab.name }}</view> -->
          <!-- <image
            :src="tab.img"
            mode="scaleToFill"
            style="width: 52px; height: 12px"
            v-else
          /> -->
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/基础信息设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="o-text">
            <view class="item">
              <view class="left"
                ><text>加入非凡泡泡积分赛系列</text>
                <view class="wh">?</view></view
              >
              <view class="right">
                <u-checkbox-group v-model="joinList" @change="checkboxChange">
                  <u-checkbox
                    activeColor="#EC384A"
                    name="1"
                    shape="square"
                  ></u-checkbox>
                </u-checkbox-group>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事项目 <view class="icon">*</view></view>
              <view class="right" @click="toSaiShiProject"
                ><text :style="{ color: typeName ? 'black' : '' }">{{
                  typeName || "请选择赛事项目"
                }}</text>
                <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事模版<view class="icon">*</view></view>
              <view
                class="right"
                @click="toTemplete"
                :style="{ width: templateName ? '50%' : '' }"
                ><text :style="{ color: templateName ? 'black' : '' }">{{
                  templateName || "请选择赛事模版"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item">
              <view class="left">赛事名称 <view class="icon">*</view></view>
              <view class="right" style="width: 50%">
                <textarea
                  style="text-align: right"
                  maxlength="11"
                  placeholder="请填写赛事名称"
                  placeholder-class="pl-class1"
                  auto-height
                  v-model="name"
                  @input="blur1"
                >
                </textarea>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事副标题<view class="icon">*</view></view>
              <view class="right" style="width: 50%">
                <textarea
                  style="text-align: right"
                  maxlength="15"
                  placeholder="请填写赛事副标题"
                  placeholder-class="pl-class1"
                  auto-height
                  v-model="fuTitle"
                  @input="blur2"
                >
                </textarea>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事类型 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group
                  v-model="type"
                  placement="row"
                  @change="groupChange"
                >
                  <u-radio
                    activeColor="#EC384A"
                    label="公开赛"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="#EC384A"
                    label="邀请赛"
                    name="2"
                    shape="circle"
                    customStyle="margin-left: 20px"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事形势 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group
                  v-model="form"
                  placement="row"
                  @change="groupChange1"
                >
                  <u-radio
                    activeColor="#EC384A"
                    label="线上赛"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="#EC384A"
                    label="线下赛"
                    shape="circle"
                    name="2"
                    customStyle="margin-left: 20px"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事地点 <view class="icon">*</view></view>
              <view
                class="right"
                @click="toPlace"
                :style="fullAddress ? 'width:50%' : ''"
                ><text :style="{ color: fullAddress ? 'black' : '' }">{{
                  fullAddress || "请选择赛事地点"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <!-- <view class="item">
              <view class="left">详细地址<view class="icon">*</view></view>
              <view class="right">
                <view style="width: 60px">
                  <u-input
                    v-model="fuName"
                    placeholder="详细地址"
                    border="none"
                  ></u-input> </view
              ></view>
            </view> -->
            <view class="item-o">
              <view class="left">赛事时间 <view class="icon">*</view></view>
              <view class="right-y">
                <view
                  class="time"
                  @click="show1 = true"
                  :style="{ color: startTime ? 'black' : '' }"
                >
                  {{ startTime || "开始时间" }}</view
                >
                <text>至</text>
                <view
                  class="time"
                  @click="show2 = true"
                  :style="{ color: endTime ? 'black' : '' }"
                >
                  {{ endTime || "结束时间" }}</view
                >
              </view>
            </view>
            <view class="item">
              <view class="left">赛事裁判 <view class="icon">*</view></view>
              <view class="right">
                <u-avatar :src="userAvatar"></u-avatar>
                <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item">
              <view class="left">赛事赞助 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group
                  v-model="sponsor"
                  placement="row"
                  @change="groupChange2"
                >
                  <u-radio
                    activeColor="#EC384A"
                    label="接受"
                    shape="circle"
                    name="0"
                  ></u-radio>
                  <u-radio
                    activeColor="#EC384A"
                    label="不接受"
                    shape="circle"
                    customStyle="margin-left: 20px"
                    name="1"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="content"
        v-if="activeTab == 0"
        :style="{ background: selectColor }"
      >
        <view class="main">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事报名设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px"
          />

          <view class="o-text">
            <view class="item">
              <view class="left">报名方式 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group
                  v-model="way"
                  placement="row"
                  @change="groupChange3"
                >
                  <u-radio
                    activeColor="#EC384A"
                    label="单人"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="#EC384A"
                    label="小队"
                    shape="circle"
                    customStyle="margin-left: 20px"
                    name="2"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
            <view class="item" v-if="way == 1">
              <view class="left">报名人数 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="number"
                    placeholder="请输入报名人数"
                    input-align="right"
                    border="none"
                    type="number"
                    @change="blur3"
                    placeholderClass="pl-class"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item" v-if="way == 2">
              <view class="left">参赛组数限制 <view class="icon">*</view></view>
              <view class="right" @click="show19 = true"
                ><text :style="{ color: groupNumName ? 'black' : '' }">{{
                  groupNumName || "请选择参赛组数限制"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item" v-if="way == 2">
              <view class="left">单组人数限制 <view class="icon">*</view></view>
              <view class="right" @click="show20 = true"
                ><text :style="{ color: groupPerNumName ? 'black' : '' }">{{
                  groupPerNumName || "请选择单组人数限制"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item">
              <view class="left">性别限制 <view class="icon">*</view></view>
              <view class="right" @click="show3 = true"
                ><text style="color: black">{{
                  genderLimitName || "无限制"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item-o">
              <view class="top">
                <view class="left"> 年龄限制 <view class="icon">*</view> </view>
                <view class="right">以比赛当天计算</view>
              </view>
              <view class="bt">
                <view class="left-l">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show4 = true"
                    >{{ ageLimitMinName || 0 }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>

                <view class="right-l">
                  <view class="r1">最高</view>
                  <view class="r2" @click="show5 = true"
                    >{{ ageLimitMaxName || 99 }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>
              </view>
            </view>
            <view class="item-o">
              <view class="top">
                <view class="left">
                  徽章等级要求 <view class="icon">*</view>
                </view>
                <view class="right">
                  <u-checkbox-group
                    v-model="badge"
                    placement="row"
                    iconPlacement="right"
                  >
                    <u-checkbox
                      activeColor="#EC384A"
                      shape="circle"
                      label="需要认证徽章"
                      customStyle="gap:10px"
                      name="0"
                    ></u-checkbox>
                  </u-checkbox-group>
                </view>
              </view>
              <view class="bt">
                <view class="left-l">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show6 = true"
                    >{{ badgeLevelMinName ? badgeLevelMinName : "无限制" }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>

                <view class="right-l">
                  <view class="r1">最高</view>
                  <view class="r2" @click="show7 = true"
                    >{{ badgeLevelMaxName ? badgeLevelMaxName : "无限制" }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>
              </view>
            </view>
            <view class="item-o">
              <view class="top">
                <view class="left">
                  赛事等级要求 <view class="icon">*</view>
                </view>
              </view>
              <view class="bt">
                <view class="left-l">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show14 = true"
                    >{{ matchLevelMinName || "无限制" }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>

                <view class="right-l">
                  <view class="r1">最高</view>
                  <view class="r2" @click="show15 = true"
                    >{{ matchLevelMaxName || "无限制" }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">参赛费用设置<view class="icon">*</view></view>
              <view class="right">
                <view class="input">
                  <u-input
                    v-model="entryFee"
                    placeholder="请填写参赛费用"
                    input-align="right"
                    border="none"
                    @change="blur4"
                    placeholderClass="pl-class"
                    type="number"
                  ></u-input>
                  ￥</view
                ></view
              >
            </view>
            <view class="item">
              <view class="left">退款政策 <view class="icon">*</view></view>
              <view class="right" @click="show16 = true"
                ><text :style="{ color: refundDaysName ? 'black' : '' }">{{
                  refundDaysName || "请选择退款政策"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item">
              <view class="left">保险保障 <view class="icon">*</view></view>
              <view class="right" @click="show17 = true"
                ><text :style="{ color: insuranceName ? 'black' : '' }">{{
                  insuranceName || "无保障"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
          </view>
          <view class="save" @click="save1">
            <text>保存</text>
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
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事地点设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />
          <view class="text">
            <view class="item">
              <view class="left">赛事地点 <view class="icon">*</view></view>
              <view class="right" :style="fullAddress ? 'width:50%' : ''"
                ><text :style="{ color: fullAddress ? 'black' : '' }">{{
                  fullAddress || "请选择赛事地点"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
          </view>
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事环节设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="text">
            <view class="item">
              <view class="left"
                ><text>报名截止时间</text> <view class="icon">*</view></view
              >
              <view class="right" @click="show8 = true"
                ><text :style="{ color: registrationEndTime ? 'black' : '' }">{{
                  registrationEndTime || "请选择报名截止时间"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view class="item">
              <view class="left">赛事名单公布 <view class="icon">*</view></view>
              <view class="right" @click="show9 = true"
                ><text :style="{ color: publicationTime ? 'black' : '' }">{{
                  publicationTime || "请选择名单公布日期"
                }}</text
                ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
              ></view>
            </view>
            <view v-for="(item, index) in items" :key="index" class="item">
              <view class="left" style="width: 40%">
                <u-input
                  placeholder="请输入添加内容"
                  border="none"
                  v-model="item.scheTypeName"
                  placeholder-class="pl-class"
                ></u-input>
              </view>
              <view class="right-r" @click="showTimePicker(index)">
                <text :style="{ color: item.scheTime ? 'black' : '' }">{{
                  item.scheTime || "请选择开赛时间"
                }}</text>
                <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                  @click.stop="deleteA(index)"
                />
              </view>
            </view>
          </view>

          <view class="add" @click="addNext">
            <u-icon name="plus-circle" size="24" color="#EC384A"></u-icon>
            添加环节
          </view>

          <view class="end">
            <view class="save" @click="save2">保存</view>
          </view>
        </view>
      </view>

      <view
        class="content"
        v-if="activeTab == 2"
        :style="{ background: selectColor }"
      >
        <view class="main">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赛事奖励设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view
            class="o-text"
            v-for="(reward, rIndex) in rewards"
            :key="rIndex"
          >
            <view class="item">
              <view class="left">奖励者名称 <view class="icon">*</view></view>
              <view class="right" @click="showPicker10(rIndex)"
                ><text
                  :style="{ color: reward.rewardTypeName ? 'black' : '' }"
                  >{{ reward.rewardTypeName || "请选择奖励者名称" }}</text
                >
                <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
              </view>
            </view>
            <view class="item">
              <view class="left">奖金金额 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 50px">
                  <u-input
                    v-model="reward.rewardAmount"
                    placeholder="￥0.00"
                    border="none"
                    @change="(n) => blur5(n, rIndex)"
                    type="number"
                    placeholderClass="pl-class"
                    input-align="right"
                  ></u-input>
                </view>
              </view>
            </view>
            <view
              v-for="(item, index) in reward.prizes"
              :key="index"
              class="reward-item"
            >
              <view style="background-color: #f7f7f7">
                <view class="del">
                  奖品
                  <u-icon
                    name="minus-circle"
                    size="24"
                    @click="delPrize(rIndex, index)"
                  ></u-icon>
                </view>
              </view>

              <view class="item">
                <view class="left">奖励类型 <view class="icon">*</view></view>
                <view class="right">
                  <u-radio-group v-model="item.sponsorType" placement="row">
                    <u-radio
                      activeColor="#EC384A"
                      label="实物"
                      shape="circle"
                      name="实物"
                    ></u-radio>
                    <u-radio
                      activeColor="#EC384A"
                      label="服务"
                      name="服务"
                      shape="circle"
                      customStyle="margin-left: 20px"
                    ></u-radio>
                  </u-radio-group>
                </view>
              </view>
              <view class="item-o">
                <view class="left">领取方式 <view class="icon">*</view></view>
                <view class="right">
                  <u-radio-group v-model="item.receiveMethod" placement="row">
                    <u-radio
                      activeColor="#EC384A"
                      label="比赛现场发放"
                      name="比赛现场发放"
                      shape="circle"
                    ></u-radio>
                    <u-radio
                      activeColor="#EC384A"
                      label="到店领取"
                      name="到店领取"
                      shape="circle"
                      customStyle="margin-left: 5px"
                    ></u-radio>
                    <u-radio
                      activeColor="#EC384A"
                      label="两者都支持"
                      name="两者都支持"
                      shape="circle"
                      customStyle="margin-left: 5px"
                    ></u-radio>
                  </u-radio-group>
                </view>
              </view>
              <view class="item-o">
                <view class="top">
                  <view class="left">
                    奖品名称 <view class="icon">*</view>
                  </view>
                  <view class="right">
                    <view style="width: 110px">
                      <u-input
                        v-model="item.rewardName"
                        placeholder="请填写奖品名称"
                        border="none"
                        @change="(n) => blur7(n, index)"
                        input-align="right"
                        placeholderClass="pl-class"
                      ></u-input>
                    </view>
                  </view>
                </view>
                <view class="bt">
                  <view class="left" style="width: 45%">
                    <view class="l1">数量</view>
                    <view style="width: 50%">
                      <u-input
                        v-model="item.rewardNum"
                        placeholder="请输入"
                        border="none"
                        @change="(n) => blur8(n, index)"
                        input-align="right"
                        placeholderClass="pl-class"
                        type="number"
                      ></u-input>
                    </view>
                  </view>

                  <view class="right" style="width: 45%">
                    <view class="r1">单位</view>
                    <view style="width: 50%">
                      <u-input
                        v-model="item.rewardUnit"
                        placeholder="请输入"
                        border="none"
                        @change="(n) => blur9(n, index)"
                        input-align="right"
                        placeholderClass="pl-class"
                      ></u-input>
                    </view>
                  </view>
                </view>
              </view>
              <view class="item">
                <view class="left"
                  >到店领取地址 <view class="icon">*</view></view
                >
                <view
                  class="right"
                  @click="chooseAddress(rIndex, index)"
                  :style="item.pickupAddress ? 'width: 60%;' : ''"
                  ><text
                    :style="{ color: item.pickupAddress ? 'black' : '' }"
                    >{{ item.pickupAddress || "请选择" }}</text
                  ><image
                    src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                    mode="scaleToFill"
                    style="width: 12px; height: 12px"
                /></view>
              </view>
              <view class="item">
                <view class="left">联系方式 <view class="icon">*</view></view>
                <view class="right">
                  <u-input
                    v-model="item.contactInfo"
                    placeholder="请填写联系方式"
                    border="none"
                    @change="(n) => blur6(n, index)"
                    type="number"
                    input-align="right"
                    placeholderClass="pl-class"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left" @click="addReward(rIndex)">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/添加.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
                新增奖品
              </view>
              <view class="right" @click="delReward(rIndex)">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/删除.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
              </view>
            </view>
          </view>

          <view class="add" @click="addRewardMember">
            <u-icon name="plus-circle" size="24" color="#EC384A"></u-icon>
            添加奖励者
          </view>

          <view class="end">
            <view class="save" @click="save3">保存</view>
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

          <view class="jdsz"
            >阶段设置
            <u-icon name="arrow-up-fill" color="#fff" size="10"></u-icon
          ></view>

          <view class="o-text">
            <view class="item">
              <view class="left">本阶段 <view class="icon">*</view></view>

              <view class="right">
                <view class="select" @click="show21 = true"
                  ><text :style="{ color: zzName ? 'black' : '' }">
                    {{ zzName || "请选择赛制" }} </text
                  ><u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
                ></view>
                <input
                  type="text"
                  v-model="stageUserNum"
                  class="stageExplains"
                  placeholder="请输入"
                  placeholder-class="pl-class1"
                  @input="blur10"
                />人
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
                  <view
                    class="l2"
                    @click="show11 = true"
                    style="margin-left: 20px"
                    :style="group_num ? 'color: black;' : ''"
                    >{{ group_num || "请选择" }}
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
                  </view>
                </view>

                <view class="right">
                  <view class="r1">匹配方式</view>
                  <!-- <view class="r2" @click="show12 = true"
                    >{{ matchingMannerName ? matchingMannerName : "请选择" }}
  <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
                  </view> -->
                  <view class="r2" style="margin-left: 20px"
                    >随机
                    <u-icon
                      name="arrow-right"
                      size="12"
                      color="#CCCCCC"
                    ></u-icon>
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
                <view class="left">
                  分组裁判设置 <view class="icon">*</view>
                </view>
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
                <view class="left">
                  选择计分方式 <view class="icon">*</view>
                </view>
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
                <!-- <view class="item-radio">
                  <u-radio-group v-model="scoringMethod">
                    <u-radio
                      activeColor="#EC384A"
                      label="胜负"
                      name="6"
                      shape="circle"
                    ></u-radio> </u-radio-group
                ></view> -->
              </view>
            </view>
          </view>

          <view class="pp-yl" @click="yl">生成直击预览</view>

          <view
            class="pp-content"
            v-show="preview == 1"
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
              <view
                class="item"
                v-for="(user, UIndex) in item.list"
                :key="UIndex"
              >
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">参赛号</view>
                </view>

                <view class="name">选手名称</view>
                <view class="select" v-if="scoringMethod == 1">
                  积分
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
            v-show="preview == 2"
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

            <view class="fourth">
              <view class="item">参赛号</view>
              <view class="item">参赛选手</view>
              <view class="item">成绩（环）</view>
              <view class="item">排名</view>
            </view>

            <view class="fifth">
              <view
                class="item"
                v-for="(user, UIndex) in item.list"
                :key="UIndex"
              >
                <view class="num">参赛号</view>
                <view class="avatar">
                  <u-avatar :src="src"></u-avatar>
                </view>
                <view class="grade"></view>
                <view class="rank">_</view>
              </view>
            </view>
          </view>

          <view
            class="pp-content"
            v-show="preview == 3"
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
            <view class="member">
              <view
                class="item"
                v-for="(user, UIndex) in item.list"
                :key="UIndex"
              >
                <view class="avatar">
                  <u-avatar :src="src" size="40"></u-avatar>
                  <view class="rank">参赛号</view>
                </view>
                <view class="name">选手名称</view>

                <view class="select" v-if="scoringMethod == 1">
                  积分
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
                  <u-icon
                    name="arrow-down-fill"
                    color="black"
                    size="8"
                  ></u-icon>
                </view>
              </view>
            </view>

            <u-divider text="对战详情"></u-divider>
            <view
              class="item-list"
              v-for="(war, WIndex) in item.warList"
              :key="index"
            >
              <view class="detail">
                <view class="item">
                  <view class="avatar">
                    <u-avatar :src="src" size="40"></u-avatar>
                    <view class="rank">参赛号</view>
                  </view>
                  <view class="grade">积分0</view>
                </view>
                VS
                <view class="item">
                  <view class="avatar">
                    <u-avatar :src="src" size="40"></u-avatar>
                    <view class="rank">参赛号</view>
                  </view>
                  <view class="grade">积分0</view>
                </view>
                <view class="chang">第{{ WIndex + 1 }}场</view>
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
            </view>

            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片展开.png"
              mode="scaleToFill"
              style="width: 80px; height: 16px; margin: auto; display: block"
              @click="getMatchHitWar(item)"
              v-if="!item.expand"
            />
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片收起.png"
              mode="scaleToFill"
              style="width: 80px; height: 16px; margin: auto; display: block"
              @click="closeWar(item)"
              v-else
            />
          </view>

          <view
            class="pp-content"
            v-show="preview == 5"
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
                    <u-avatar
                      :src="item.list[0].avatarUrl"
                      size="40"
                    ></u-avatar>
                    <view class="rank">{{
                      item.list[0].userNumber || "参赛号"
                    }}</view>
                  </view>
                  <view class="name">{{
                    item.list[0].username || "选手名称"
                  }}</view>
                  <view class="select" v-if="scoringMethod == 1">
                    {{ item.list[0].userScore || "积分" }}
                    <view class="icon"></view>
                  </view>

                  <view class="time" v-if="scoringMethod == 2">
                    3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
                  </view>
                  <view class="time" v-if="scoringMethod == 3">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.list[0].userScore"
                      style="width: 15px"
                    />
                    <text>米</text>
                  </view>
                  <view class="time" v-if="scoringMethod == 4">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.list[0].userScore"
                      style="width: 15px"
                    />
                    <text>分</text>
                  </view>
                  <view class="time" v-if="scoringMethod == 5">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.list[0].userScore"
                      style="width: 15px"
                    />
                    <text>千克</text>
                  </view>
                  <!-- <view
                class="select"
                v-if="scoringMethod == 6"
                @click="showResult(item.list[0], item)"
              >
                设置
                <view class="icon"></view>
              </view> -->
                </view>
                VS
                <view class="item">
                  <view class="avatar">
                    <u-avatar
                      :src="item.list[1].avatarUrl"
                      size="40"
                    ></u-avatar>
                    <view class="rank">{{
                      item.list[1].userNumber || "参赛号"
                    }}</view>
                  </view>
                  <view class="name">{{
                    item.list[1].username || "选手名称"
                  }}</view>
                  <view class="select" v-if="scoringMethod == 1">
                    {{ item.list[1].userScore || "积分" }}
                    <view class="icon"></view>
                  </view>
                  <view class="time" v-if="scoringMethod == 2">
                    3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
                  </view>
                  <view class="time" v-if="scoringMethod == 3">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.list[1].userScore"
                      style="width: 10px"
                    />
                    <text>米</text>
                  </view>
                  <view class="time" v-if="scoringMethod == 4">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.list[1].userScore"
                      style="width: 10px"
                    />
                    <text>分</text>
                  </view>
                  <view class="time" v-if="scoringMethod == 5">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.list[1].userScore"
                      style="width: 15px"
                    />
                    <text>千克</text>
                  </view>
                  <!-- <view class="select" v-if="scoringMethod == 6">
                设置
                <view class="icon"></view>
              </view> -->
                </view>
              </view>
            </view>
          </view>

          <view
            class="pp-content"
            v-show="preview == 4"
            v-for="(item, index) in groups"
            :key="index"
          >
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
              <view class="item-list">
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
                    <view class="name">{{
                      war.homeUserName || "选手名称"
                    }}</view>
                    <view
                      class="select"
                      v-if="scoringMethod == 1"
                      @click="showZk('homeUserScore', war)"
                    >
                      {{ war.homeUserScore || "积分" }}
                      <view class="icon"></view>
                    </view>

                    <view class="time" v-if="scoringMethod == 2">
                      3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
                    </view>
                    <view class="time" v-if="scoringMethod == 3">
                      <input
                        type="number"
                        placeholder="0"
                        v-model="war.homeUserScore"
                        style="width: 15px"
                        @confirm="updateHomeUserScore(war)"
                      />
                      <text>米</text>
                    </view>
                    <view class="time" v-if="scoringMethod == 4">
                      <input
                        type="number"
                        placeholder="0"
                        v-model="war.homeUserScore"
                        style="width: 15px"
                        @confirm="updateHomeUserScore(war)"
                      />
                      <text>分</text>
                    </view>
                    <view class="time" v-if="scoringMethod == 5">
                      <input
                        type="number"
                        placeholder="0"
                        v-model="war.homeUserScore"
                        style="width: 15px"
                        @confirm="updateHomeUserScore(war)"
                      />
                      <text>千克</text>
                    </view>
                    <!-- <view class="select" v-if="scoringMethod == 6">
                  设置
                  <view class="icon"></view>
                </view> -->
                  </view>
                  VS
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
                    <view class="name">{{
                      war.awayUserName || "选手名称"
                    }}</view>
                    <!-- <view class="grade">{{ item.list[1].userScore || "积分0" }}</view> -->
                    <view
                      class="select"
                      v-if="scoringMethod == 1"
                      @click="showZk('awayUserScore', war)"
                    >
                      {{ war.awayUserScore || "积分" }}
                      <view class="icon"></view>
                    </view>

                    <view class="time" v-if="scoringMethod == 2">
                      3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
                    </view>
                    <view class="time" v-if="scoringMethod == 3">
                      <input
                        type="number"
                        placeholder="0"
                        v-model="war.awayUserScore"
                        style="width: 15px"
                        @confirm="updateAwayUserScore(war)"
                      />
                      <text>米</text>
                    </view>
                    <view class="time" v-if="scoringMethod == 4">
                      <input
                        type="number"
                        placeholder="0"
                        v-model="war.awayUserScore"
                        style="width: 15px"
                        @confirm="updateAwayUserScore(war)"
                      />
                      <text>分</text>
                    </view>
                    <view class="time" v-if="scoringMethod == 5">
                      <input
                        type="number"
                        placeholder="0"
                        v-model="war.awayUserScore"
                        style="width: 15px"
                        @confirm="updateAwayUserScore(war)"
                      />
                      <text>千克</text>
                    </view>
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
                  }}<u-icon
                    name="arrow-right"
                    color="#CCCCCC"
                    size="12"
                  ></u-icon
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

          <view
            class="pp-content"
            v-show="preview == 6"
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

          <view class="pp" @click="save4">保存</view>
        </view>
      </view>

      <view
        class="content"
        v-if="activeTab == 4"
        :style="{ background: selectColor }"
        style="padding-bottom: 102px"
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
              placeholder-class="placeholder-class"
              auto-height
              @input="saveTextareaContent"
              v-model="textareaContent[op]"
            >
            </textarea>
            <view class="count">
              <view class="count-i"
                >{{
                  (textareaContent[op] && textareaContent[op].length) || 0
                }}/<text>500</text></view
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
                  <view class="down" @click="moveUp(index)">上移</view>
                  <view class="down" @click="moveDown(index)">下移</view>
                  <view class="delete" @click="deleteItem(index)">删除</view>
                </view>
              </view>
              <textarea
                class="t1"
                maxlength="20000"
                placeholder="请编辑赛事说明"
                v-if="item.descriType == 1"
                v-model="item.content"
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
                  <view class="down" @click="moveUp(index)">上移</view>
                  <view class="down" @click="moveDown(index)">下移</view>
                  <view class="delete" @click="deleteItem(index)">删除</view>
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
            <view class="end-i" @click="back">
              <u-icon name="file-text" color="#ffffff" size="24"></u-icon>
              存草稿
            </view>

            <view class="end-i">
              <u-icon name="eye" color="#ffffff" size="24"></u-icon>
              预览
            </view>

            <view class="save" style="margin: 0" @click="save5">发布赛事</view>
          </view>
        </view>
      </view>

      <u-datetime-picker
        :show="show1"
        v-model="date"
        mode="datetime"
        @cancel="show1 = false"
        @confirm="confirm1"
      ></u-datetime-picker>
      <u-datetime-picker
        :show="show2"
        v-model="date"
        mode="datetime"
        @cancel="show2 = false"
        @confirm="confirm2"
      ></u-datetime-picker>
      <u-picker
        :show="show3"
        :columns="columns3"
        @cancel="show3 = false"
        @confirm="confirm3"
      ></u-picker>
      <u-picker
        :show="show4"
        :columns="columns4"
        @cancel="show4 = false"
        @confirm="confirm4"
      ></u-picker>
      <u-picker
        :show="show5"
        :columns="columns4"
        @cancel="show5 = false"
        @confirm="confirm5"
      ></u-picker>
      <u-picker
        :show="show6"
        :columns="columns6"
        @cancel="show6 = false"
        @confirm="confirm6"
      ></u-picker>
      <u-picker
        :show="show7"
        :columns="columns6"
        @cancel="show7 = false"
        @confirm="confirm7"
      ></u-picker>
      <u-datetime-picker
        :show="show8"
        v-model="date"
        mode="datetime"
        @cancel="show8 = false"
        @confirm="confirm8"
      ></u-datetime-picker>
      <u-datetime-picker
        :show="show9"
        v-model="date"
        mode="datetime"
        @cancel="show9 = false"
        @confirm="confirm9"
      ></u-datetime-picker>
      <u-picker
        :show="show10"
        :columns="columns10"
        @cancel="show10 = false"
        @confirm="confirm10"
      ></u-picker>
      <u-picker
        :show="show11"
        :columns="columns11"
        @cancel="show11 = false"
        @confirm="confirm11"
      ></u-picker>
      <u-picker
        :show="show12"
        :columns="columns12"
        @cancel="show12 = false"
        @confirm="confirm12"
      ></u-picker>
      <u-datetime-picker
        :show="show13"
        v-model="date"
        mode="datetime"
        @cancel="show13 = false"
        @confirm="confirm13"
      ></u-datetime-picker>
      <u-picker
        :show="show14"
        :columns="columns14"
        @cancel="show14 = false"
        @confirm="confirm14"
      ></u-picker>
      <u-picker
        :show="show15"
        :columns="columns14"
        @cancel="show15 = false"
        @confirm="confirm15"
      ></u-picker>
      <u-picker
        :show="show19"
        :columns="columns19"
        @cancel="show19 = false"
        @confirm="confirm19"
      ></u-picker>
      <u-picker
        :show="show20"
        :columns="columns20"
        @cancel="show20 = false"
        @confirm="confirm20"
      ></u-picker>
      <u-popup :show="show16" mode="bottom" @close="show16 = false" :round="10">
        <view class="refund">
          <view class="title">请选择退款政策（报名费）</view>

          <view class="content">
            <view
              :class="refundDays == 1 ? 'left-active' : 'left'"
              @click="chooseThis(1)"
            >
              <view class="title">赛前退<text>100%</text> </view>
              <view class="text"
                >赛前随时申请，全额退款 比赛开始不支持退款</view
              >
              <u-radio-group v-model="refundDays">
                <u-radio
                  shape="circle"
                  name="1"
                  activeColor="#EC384A"
                ></u-radio>
              </u-radio-group>
            </view>
            <view
              :class="refundDays == 2 ? 'left-active' : 'left'"
              @click="chooseThis(2)"
            >
              <view
                class="title"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  padding-bottom: 8px;
                "
              >
                <view>赛前<text>7</text>天退<text>100%</text> </view>
                <view>赛前退<text>50%</text></view>
              </view>
              <view class="text" style="padding-bottom: 6px"
                ><view style="padding-bottom: 12px"
                  >比赛开始前7天, 全额退款</view
                >
                <view style="padding-bottom: 12px"
                  >比赛开始前7天~比赛开始, 退款50%</view
                >
                <view>比赛开始后不支持退款</view></view
              >
              <u-radio-group v-model="refundDays">
                <u-radio
                  shape="circle"
                  name="2"
                  activeColor="#EC384A"
                ></u-radio>
              </u-radio-group>
            </view>
          </view>

          <view class="enter" @click="confirmRefundPolicy">确认选择</view>
        </view>
      </u-popup>
      <u-popup :show="show17" mode="bottom" @close="show17 = false" :round="10">
        <view class="insurance">
          <view class="first">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/safe.svg"
              mode="scaleToFill"
              style="width: 18px; height: 18px"
            />
            保险保障</view
          >
          <view class="second">
            <view class="left">
              <view class="top">无保障</view>
              <view class="bottom">
                <u-icon name="close" color="#CCCCCC"></u-icon>
                <u-icon name="close" color="#CCCCCC"></u-icon>
                <u-icon name="close" color="#CCCCCC"></u-icon>
              </view>
              <view style="margin-left: 12px">
                <u-radio-group v-model="insuranceId">
                  <u-radio
                    shape="circle"
                    name="0"
                    activeColor="#EC384A"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
            <view class="right">
              <view class="top">参与者意外保险 ￥2/人</view>
              <view class="bottom">
                <view class="item">意外伤害身故、残疾 <text>￥10万</text></view>
                <view class="item">意外伤害医疗 <text>￥1万</text></view>
                <view class="item">意外伤害住院津贴 <text>￥100/天</text></view>
                <view>（绝对免赔3天，单次最高90天，累计不超过180天）</view>
              </view>
              <view class="tk">
                <u-radio-group v-model="insuranceId">
                  <u-radio
                    shape="circle"
                    name="1"
                    activeColor="#EC384A"
                  ></u-radio>
                </u-radio-group>
                保险条款
              </view>
            </view>
          </view>

          <view class="notice">
            <u-icon name="checkmark-circle-fill" color="#EC384A"></u-icon>
            选择即同意广州极热玩家运动科技有限公司作为投保人进行投保
          </view>

          <view class="enter" @click="insuranceEnter">确认选择</view>
        </view>
      </u-popup>
      <u-picker
        :show="show21"
        :columns="szList"
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show5: false,
      show6: false,
      show7: false,
      show9: false,
      show13: false,
      activeTab: uni.getStorageSync("activeTab") || 0,
      checked: true,
      show: false,
      changeSkin: false,
      colorList: [
        "#1B4CA7",
        "#B23642",
        "#0170A8",
        "#3D47A8",
        "#229A5C",
        "#9D825F",
      ],
      color: [
        "#991515",
        "#992F15",
        "#994A15",
        "#996415",
        "#997F15",
        "#999915",
        "#7F9915",
        "#649915",
        "#4A9915",
        "#2F9915",
        "#159915",
        "#15992F",
        "#15994A",
        "#159964",
        "#15997F",
        "#159999",
        "#157F99",
        "#156499",
        "#154A99",
        "#152F99",
        "#151599",
        "#2F1599",
        "#4A1599",
        "#641599",
        "#7F1599",
        "#991599",
        "#99157F",
        "#991564",
        "#99154A",
        "#991517",
      ],
      selectColor: uni.getStorageSync("theme") || "#1B4CA7",
      custom: false,
      sliderValue: 0,
      isDragging: false, // 是否正在拖动
      tabs: ["报名设置", "信息设置", "奖励设置", "直击设置", "规则设置"],
      bmType: [],
      serialNum: uni.getStorageSync("serialNum") || "",
      fileList: [],
      joinList: uni.getStorageSync("joinList") || ["1"],
      joinPointsRace: uni.getStorageSync("joinPointsRace") || 1,
      type: uni.getStorageSync("type") || "1",
      form: uni.getStorageSync("form") || "1",
      sponsor: uni.getStorageSync("sponsor") || "0",
      name: uni.getStorageSync("name") || "",
      fuTitle: uni.getStorageSync("fuTitle") || "",
      labelId: "",
      typeName: "",
      startTime: uni.getStorageSync("startTime") ?? 0,
      date: Number(new Date()),
      endTime: uni.getStorageSync("endTime") ?? 0,
      way: uni.getStorageSync("way") || "1",
      fullAddress: "",
      show3: false,
      columns3: [["无限制", "男", "女"]],
      columns4: [],
      number: uni.getStorageSync("number") ?? "",
      genderLimit: uni.getStorageSync("genderLimit") || 0,
      show4: false,
      badge: [],
      entryFee: uni.getStorageSync("entryFee") ?? "",
      templateId: "",
      templateName: uni.getStorageSync("templateName") ?? "",
      umpireId: uni.getStorageSync("user").id || 0,
      ageLimitMin: uni.getStorageSync("ageLimitMin") || 0,
      ageLimitMax: uni.getStorageSync("ageLimitMax") || 99,
      genderLimitName: uni.getStorageSync("genderLimitName") ?? "",
      columns6: [],
      badgeLevelMin: uni.getStorageSync("badgeLevelMin") ?? "",
      badgeLevelMinName: uni.getStorageSync("badgeLevelMinName") ?? "",
      badgeLevelMax: uni.getStorageSync("badgeLevelMax") ?? "",
      badgeLevelMaxName: uni.getStorageSync("badgeLevelMaxName") ?? "",
      matchLevelMin: uni.getStorageSync("matchLevelMin") ?? "",
      matchLevelMinName: uni.getStorageSync("matchLevelMinName") ?? "",
      matchLevelMax: uni.getStorageSync("matchLevelMax") ?? "",
      matchLevelMaxName: uni.getStorageSync("matchLevelMaxName") ?? "",
      matchId: uni.getStorageSync("matchId") ?? "",
      show8: false,
      registrationEndTime: uni.getStorageSync("registrationEndTime") || "",
      publicationTime: uni.getStorageSync("publicationTime") ?? null,
      show10: false,
      columns10: [["冠军", "亚军", "季军", "第四名", "第五名", "第六名"]],
      sponsorType: "实物",
      receiveMethod: "到店领取",
      scoringMethod: "1",
      groupUmpireType: "1",
      groupVenueType: "1",
      show11: false,
      groupNum: uni.getStorageSync("groupNum") ?? null,
      group_num: uni.getStorageSync("group_num") ?? null,
      show12: false,
      columns12: [],
      columns11: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]],
      matchingMannerName: uni.getStorageSync("matchingMannerName") ?? null,
      matchingManner: uni.getStorageSync("matchingManner") ?? null,
      op: 0,
      stageUserNum: uni.getStorageSync("stageUserNum") || "",
      gameList: uni.getStorageSync("gameList") || [],
      items: uni.getStorageSync("items") || [],
      currentIndex: "",
      counter: "",
      textareaContent: uni.getStorageSync("textareaContent") || [],
      contentList: uni.getStorageSync("contentList") || [],
      mainFile: uni.getStorageSync("mainFile") || "",
      count: 0,
      show14: false,
      show15: false,
      columns14: [],
      labelCode: "",
      show19: false,
      show20: false,
      groupNumName: uni.getStorageSync("groupNumName") ?? "",
      groupPerNum: uni.getStorageSync("groupPerNum") ?? "",
      groupPerNumName: uni.getStorageSync("groupPerNumName") ?? "",
      columns19: [],
      columns20: [],
      show16: false,
      refundDays: uni.getStorageSync("refundDays") || "1",
      refundDaysName: uni.getStorageSync("refundDaysName") || "",
      show17: false,
      insuranceId: uni.getStorageSync("insuranceId") || "1",
      insuranceName: uni.getStorageSync("insuranceName") || "",
      ageLimitMaxName: uni.getStorageSync("ageLimitMaxName") || "",
      ageLimitMinName: uni.getStorageSync("ageLimitMinName") || "",
      name_copy: uni.getStorageSync("name") || "",
      fuTitle_copy: uni.getStorageSync("fuTitle") || "",
      rewards: uni.getStorageSync("rewards") || [
        {
          rewardType: "",
          rewardTypeName: "",
          rewardAmount: "",
          prizes: [
            {
              sponsorType: "实物",
              receiveMethod: "到店领取",
              rewardName: "",
              rewardNum: "",
              rewardUnit: "",
              pickupAddress: "",
              contactInfo: "",
            },
          ],
        },
      ],
      show21: false,
      zz: uni.getStorageSync("zz") || "",
      zzName: uni.getStorageSync("zzName") || "",
      preview: false,
      navBgColor: "rgba(255, 255, 255, 0)",
      groups: uni.getStorageSync("groups") || [],
      timeShow: false,
      currentTime: "",
      timeShow1: false,
      szList: [],
      userAvatar: null,
    };
  },
  onPageScroll(e) {
    const scrollTop = e.scrollTop; // 获取滚动距离
    let opacity = 0;

    if (scrollTop > 0 && scrollTop <= 100) {
      opacity = scrollTop / 250; // 计算透明度（0 到 1）
    } else if (scrollTop > 100) {
      opacity = 1; //
    }

    // 动态更新导航栏背景颜色
    this.navBgColor = `rgba(255, 255, 255, ${opacity})`;
  },
  onLoad() {
    this.getSerialNum();

    this.getMatchRank();
    this.getAge();
    this.getGroupNum();
    this.getGroupPerNum();
    this.getPP();
    if (this.templateId && !this.items) {
      this.addItem();
    }
    this.getSzList();
    this.getUserAvatar();
  },
  onShow() {
    this.labelId = uni.getStorageSync("labelId") || "";
    this.labelCode = uni.getStorageSync("labelCode") || "";
    if (this.labelCode) {
      this.getMatchLevel();
    }
    this.typeName = uni.getStorageSync("typeName") || "";
    this.fullAddress = uni.getStorageSync("fullAddress") || "";
    this.templateId = uni.getStorageSync("templateId") || "";
    this.templateName = uni.getStorageSync("templateName") || "";
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
      uni.setStorageSync("activeTab", index);
      if (index == 3) {
        this.getMatchTemplateHit();
      }
      if (index == 1 && this.templateId && !this.items) {
        this.addItem();
      }
    },
    getUserAvatar() {
      this.userAvatar = uni.getStorageSync("user").avatarUrl || "";
    },
    skin() {
      this.changeSkin = !this.changeSkin;
    },
    async getSerialNum() {
      if (this.serialNum) return;
      const result = await uni.$u.http.get("/match/getSerialNum");
      if (result.status == 200) {
        this.serialNum = result.data.serialNum;
        uni.setStorageSync("serialNum", this.serialNum);
      }
    },
    onSliderChange(value) {
      const index = Math.floor((value / 100) * (this.colorList.length - 1)); // 计算对应的颜色索引
      this.selectColor = this.colorList[index]; // 更新选中颜色
    },
    startDrag(event) {
      this.isDragging = true;
      this.updateSliderPosition(event);
    },
    stopDrag() {
      this.isDragging = false;
    },
    onDrag(event) {
      if (this.isDragging) {
        this.updateSliderPosition(event);
      }
    },
    updateSliderPosition(event) {
      const query = wx.createSelectorQuery();
      query
        .select(".slider-track")
        .boundingClientRect((rect) => {
          if (!rect) {
            console.error("Failed to get boundingClientRect for .slider-track");
            return;
          }

          // 获取触摸点的 X 坐标
          const clientX = event.touches
            ? event.touches[0].clientX
            : event.clientX;
          let position = ((clientX - rect.left) / rect.width) * 100;

          // 限制滑块位置在 0% 到 100% 之间
          position = Math.max(0, Math.min(100, position));

          // 更新滑块值
          this.sliderValue = Math.round(position);

          // 根据滑块值更新选中颜色
          const index = Math.floor((position / 100) * (this.color.length - 1));
          this.selectColor = this.color[index];
        })
        .exec();
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    },
    enter() {
      this.changeSkin = false;
      uni.setStorageSync("theme", this.selectColor);
    },
    deletePic(event) {
      this.fileList.splice(event.index, 1); // 删除指定索引的图片
    },
    checkboxChange(n) {
      if (n.length === 0) {
        this.joinPointsRace = 0;
        uni.setStorageSync("joinPointsRace", 0);
        uni.setStorageSync("joinList", ["0"]);
      } else {
        this.joinPointsRace = 1;
        uni.setStorageSync("joinPointsRace", 1);
        uni.setStorageSync("joinList", ["1"]);
      }
    },
    toSaiShiProject() {
      uni.navigateTo({
        url: "/competition/publish/project",
      });
    },
    toTemplete() {
      uni.navigateTo({
        url: `/competition/publish/templete`,
      });
    },
    toPlace() {
      uni.navigateTo({
        url: "/competition/publish/place",
      });
    },
    confirm1(n) {
      this.show1 = false;
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // 格式化为 "YYYY-MM-DD HH:mm"
      this.startTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      uni.setStorageSync("startTime", this.startTime);
    },
    confirm2(n) {
      this.show2 = false;
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // 格式化为 "YYYY-MM-DD HH:mm"
      this.endTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      uni.setStorageSync("endTime", this.endTime);
    },
    confirm3(n) {
      this.show3 = false;
      this.genderLimit = n.indexs[0];
      this.genderLimitName = n.value[0];
      uni.setStorageSync("genderLimitName", this.genderLimitName);
      uni.setStorageSync("genderLimit", this.genderLimit);
    },
    async getMatchRank() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "match_rank",
        },
      });
      if (result.status == 200) {
        const arr = [];
        result.data.map((item, index) => {
          arr.push(item.label);
        });
        this.columns14 = [arr];
        this.matchLevelMin = 1;
        this.matchLevelMax = arr.length;
      }
    },
    async save1() {
      if (!this.mainFile) {
        this.$refs.notice.show({
          type: "default",
          message: "请上传比赛主图",
        });
        return;
      }
      try {
        var result = await uni.$u.http.post("/match/saveMatchBaseInfo", {
          serialNum: this.serialNum,
          joinPointsRace: this.joinPointsRace,
          labelId: this.labelId,
          templateId: this.templateId,
          name: this.name,
          fuTitle: this.fuTitle,
          type: this.type,
          form: this.form,
          fullAddress: this.fullAddress,
          startTime: this.startTime,
          endTime: this.endTime,
          umpireId: this.umpireId,
          sponsor: this.sponsor,
          matchState: "1",
          color: this.selectColor,
          locationLat: uni.getStorageSync("bmLocal").latitude,
          locationLng: uni.getStorageSync("bmLocal").longitude,
        });
        if (result.status == 200) {
          this.matchId = result.data.matchId;
          uni.setStorageSync("matchId", this.matchId);
          let params = {
            matchId: this.matchId,
            serialNum: this.serialNum,
            way: this.way,
            number: this.number,
            genderLimit: this.genderLimit,
            ageLimitMin: this.ageLimitMin,
            ageLimitMax: this.ageLimitMax,
            badgeLevelMin: this.badgeLevelMin,
            badgeLevelMax: this.badgeLevelMax,
            matchLevelMax: this.matchLevelMax,
            matchLevelMin: this.matchLevelMin,
            entryFee: this.entryFee,
            refundDays: this.refundDays,
            insuranceId: this.insuranceId,
          };

          if (this.way == "2") {
            params.groupNum = this.groupNum;
            params.groupPerNum = this.groupPerNum;
          }

          var res = await uni.$u.http.post(
            "/match/saveMatchRegisterInfo",
            params
          );
          if (res.status == 200) {
            this.$refs.notice.show({
              type: "default",
              message: res.message,
              complete: () => {
                this.activeTab++;
              },
            });
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    blur1(n) {
      this.name_copy = n.detail.value;
      uni.setStorageSync("name", n.detail.value);
    },
    blur2(n) {
      this.fuTitle_copy = n.detail.value;
      uni.setStorageSync("fuTitle", n.detail.value);
    },
    blur3(n) {
      uni.setStorageSync("number", n);
    },
    async getAge() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "age_limit",
        },
      });
      var arr = [];
      result.data.map((item, index) => {
        arr.push(item.value);
      });
      this.columns4 = [arr];
    },
    confirm4(n) {
      this.show4 = false;
      this.ageLimitMin = n.indexs[0];
      this.ageLimitMinName = n.value[0];
      uni.setStorageSync("ageLimitMin", this.ageLimitMin);
      uni.setStorageSync("ageLimitMinName", this.ageLimitMinName);
    },
    confirm5(n) {
      this.show5 = false;
      this.ageLimitMax = n.indexs[0];
      this.ageLimitMaxName = n.value[0];
      uni.setStorageSync("ageLimitMax", this.ageLimitMax);
      uni.setStorageSync("ageLimitMaxName", this.ageLimitMaxName);
    },
    blur4(n) {
      uni.setStorageSync("entryFee", n);
    },
    confirm6(n) {
      this.show6 = false;
      this.badgeLevelMin = n.indexs[0];
      this.badgeLevelMinName = n.value[0];
      uni.setStorageSync("badgeLevelMin", this.badgeLevelMin);
      uni.setStorageSync("badgeLevelMinName", this.badgeLevelMinName);
    },
    confirm7(n) {
      this.show7 = false;
      this.badgeLevelMax = n.indexs[0];
      this.badgeLevelMaxName = n.value[0];
      uni.setStorageSync("badgeLevelMax", this.badgeLevelMax);
      uni.setStorageSync("badgeLevelMaxName", this.badgeLevelMaxName);
    },
    confirm8(n) {
      this.show8 = false;
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // 格式化为 "YYYY-MM-DD HH:mm"
      this.registrationEndTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      uni.setStorageSync("registrationEndTime", this.registrationEndTime);
    },
    confirm9(n) {
      this.show9 = false;
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // 格式化为 "YYYY-MM-DD HH:mm"
      this.publicationTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      uni.setStorageSync("publicationTime", this.publicationTime);
    },
    confirm10(n) {
      this.show10 = false;
      const selectedIndex = n.indexs[0];
      const selectedName = n.value[0];
      this.rewards[this.counter].rewardType = selectedIndex + 1;
      this.rewards[this.counter].rewardTypeName = selectedName;
      uni.setStorageSync("rewards", this.rewards);
    },
    blur5(n, index) {
      this.rewards[index].rewardAmount = n;
      uni.setStorageSync("rewards", this.rewards);
    },
    chooseAddress(a, b) {
      uni.chooseLocation({
        success: (res) => {
          this.rewards[a].prizes[b].pickupAddress = res.address;
          uni.setStorageSync("rewards", this.rewards);
        },
        fail: function () {},
        complete: function () {},
      });
    },
    blur6(n, index) {
      this.rewards[index].contactInfo = n;
      uni.setStorageSync("rewards", this.rewards);
    },
    confirm11(n) {
      this.show11 = false;
      this.group_num = n.value[0];
      uni.setStorageSync("group_num", this.group_num);
    },
    confirm12(n) {
      this.show12 = false;
      this.matchingManner = n.indexs[0] + 1;
      this.matchingMannerName = n.value[0];
      uni.setStorageSync("matchingManner", this.matchingManner);
      uni.setStorageSync("matchingMannerName", this.matchingMannerName);
    },
    async save2() {
      try {
        this.items.forEach((item, index) => {
          item.scheTypeSort = index;
          item.scheTypeCode = index;
        });
        const date = new Date(new Date());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        var result = await uni.$u.http.post("/match/saveMatchScheInfo", {
          matchId: this.matchId,
          serialNum: this.serialNum,
          registrationEndTime: this.registrationEndTime,
          registrationStartTime: `${year}-${month}-${day} ${hours}:${minutes}`,
          publicationTime: this.publicationTime,
          scheDetails: this.items,
        });
        if (result.status == 200) {
          this.$refs.notice.show({
            type: "default",
            message: result.message,
            complete: () => {
              this.activeTab++;
              this.getGame();
            },
          });
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
        return;
      }
    },
    async save3() {
      try {
        const data = this.rewards.map((reward) => ({
          rewardType: reward.rewardType,
          rewardAmount: reward.rewardAmount,
          sponsorType: reward.prizes[0].sponsorType,
          receiveMethod: reward.prizes[0].receiveMethod,
          pickupAddress: reward.prizes[0].pickupAddress,
          contactInfo: reward.prizes[0].contactInfo,
          prizes: reward.prizes.map((prize) => ({
            rewardName: prize.rewardName,
            rewardNum: prize.rewardNum,
            rewardUnit: prize.rewardUnit,
            rewardSort: prize.rewardSort,
          })),
        }));
        const result = await uni.$u.http.post("/match/saveMatchRewardInfo", {
          matchId: this.matchId,
          serialNum: this.serialNum,
          rewards: data,
        });
        if (result.status === 200) {
          this.$refs.notice.show({
            type: "default",
            message: result.message,
            complete: () => {
              this.activeTab++;
            },
          });
        }
      } catch (error) {
        this.$refs.notice.show({
          type: "default",
          message: error.data.message,
        });
      }
    },
    blur7(n, index) {
      this.rewards[index].rewardName = n;
      uni.setStorageSync("rewards", this.rewards);
    },
    blur8(n, index) {
      this.rewards[index].rewardNum = n;
      uni.setStorageSync("rewards", this.rewards);
    },
    blur9(n, index) {
      this.rewards[index].rewardUnit = n;
      uni.setStorageSync("rewards", this.rewards);
    },
    async save4() {
      try {
        var data = {
          matchId: this.matchId,
          serialNum: this.serialNum,
          hitConfigList: [
            {
              scheId: this.gameList[this.op].scheId,
              lastHitId: "",
              hitTypeCode: this.gameList[this.op].scheId,
              hitTypeName: this.gameList[this.op].scheTypeName,
              stageUserNum: this.stageUserNum,
              stageExplains: "",
              groupNum: this.group_num,
              stageUserNum: this.stageUserNum,
              matchingManner: this.zz,
              groupVenueType: this.groupVenueType,
              groupUmpireType: this.groupUmpireType,
              scoringMethod: this.scoringMethod,
              isPreview: true,
            },
          ],
        };
        var result = await uni.$u.http.post("/match/saveMatchHitConfig", data);
        if (result.status == 400) {
          this.$refs.notice.show({
            type: "default",
            message: result.message,
          });
          return;
        }
        if (this.zz != 3) {
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
                throw new Error(
                  `第 ${index + 1} 组更新失败: ${result.message}`
                );
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
          const failureMessages = results
            .filter((res) => !res.success)
            .map((res) => res.message);

          // 显示提示信息
          if (successCount === this.groups.length) {
            this.$refs.notice.show({
              type: "default",
              message: "保存成功",
            });
          } else {
            this.$refs.notice.show({
              type: "default",
              message: `部分组保存失败: ${failureMessages.join(", ")}`,
            });
          }
        } else {
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
          const failureMessages = results
            .filter((res) => !res.success)
            .map((res) => res.message);

          // 显示提示信息
          if (successCount === updatePromises.length) {
            this.$refs.notice.show({
              type: "default",
              message: "所有对战已成功保存",
            });
          } else {
            this.$refs.notice.show({
              type: "default",
              message: `部分对战保存失败: ${failureMessages.join(", ")}`,
            });
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "保存失败，请稍后重试",
        });
      }
    },
    async yl() {
      try {
        const remainder = this.stageUserNum % this.group_num;
        if (remainder) {
          this.$refs.notice.show({
            type: "default",
            message: "每组人数必须满编",
          });
          return;
        }
        if (
          (this.zz == 4 || this.zz == 6) &&
          this.group_num != this.stageUserNum / 2
        ) {
          this.$refs.notice.show({
            type: "default",
            message: "对战1v1赛总人数必须是组数的两倍",
          });
          return;
        }
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
              isPreview: true,
            },
          ],
        };
        var result = await uni.$u.http.post(
          "/match/saveMatchHitConfig",
          params
        );
        if (result.status == 200) {
          this.groups = [];
          this.getMatchHitGroup();

          this.preview = this.zz;
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "生成预览失败，请稍后重试",
        });
      }
    },
    async getMatchHitGroup() {
      var result = await uni.$u.http.post("/match/getMatchHitGroup", {
        matchId: this.matchId,
        hitTypeName: this.gameList[this.op].scheTypeName,
      });

      this.groups = result.data.map((item) => {
        item.expand = false;
        return item;
      });

      uni.setStorageSync("groups", this.groups);
      if (this.zz == 3 || this.zz == 4) {
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
    async getMatchHitWar(item) {
      try {
        var result = await uni.$u.http.get("/match/getMatchHitWar", {
          params: {
            hitGroupId: item.id,
          },
        });
        if (result.status == 200) {
          item.warList = result.data;
          item.expand = true;
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "获取失败，请稍后重试",
        });
      }
    },
    groupChange(n) {
      uni.setStorageSync("type", n);
    },
    groupChange1(n) {
      uni.setStorageSync("form", n);
    },
    groupChange2(n) {
      uni.setStorageSync("sponsor", n);
    },
    groupChange3(n) {
      uni.setStorageSync("way", n);
    },
    async getGame() {
      var result = await uni.$u.http.get("/match/getMatchScheTypeInfo", {
        params: {
          matchId: this.matchId,
        },
      });
      if (result.status == 200) {
        this.gameList = result.data;
        uni.setStorageSync("gameList", this.gameList);
      }
    },
    addNext() {
      const newItem = {
        scheTypeName: "",
        scheTime: "",
      };
      this.items.push(newItem);
    },
    async addItem() {
      try {
        var result = await uni.$u.http.get("/match/getMatchTemplateSche", {
          params: { templateId: this.templateId },
        });
        if (result.status == 200) {
          this.items = result.data;
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.message,
        });
      }
    },
    showTimePicker(index) {
      this.currentIndex = index; // 记录当前选中的索引
      this.show13 = true; // 打开时间选择器
    },
    confirm13(n) {
      this.show13 = false;
      const date = new Date(n.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // 格式化时间并更新对应环节的时间
      this.items[
        this.currentIndex
      ].scheTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      uni.setStorageSync("items", this.items);
    },

    deleteA(index) {
      this.items.splice(index, 1);
    },
    checkThis(index) {
      this.op = index;
      this.queryMatchHitConfig();
    },
    async getSzList() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "matching_manner",
        },
      });
      if (result.status == 200) {
        this.szList = [
          result.data.map((item) => {
            return item.label;
          }),
        ];
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
        this.zzName = this.szList[0][this.zz - 1];
        this.group_num = result.data[0].groupNum;
        this.groupVenueType = result.data[0].groupVenueType;
        this.groupUmpireType = result.data[0].groupUmpireType;
        this.scoringMethod = result.data[0].scoringMethod;
      }
    },
    async save5() {
      try {
        if (this.gameList.length > 0) {
          let arr = this.textareaContent.map((item, index) => {
            return {
              rulesType: index + 1,
              badgeLevel: "A",
              matchLevel: "1",
              matchRules: item,
            };
          });

          var result = await uni.$u.http.post("/match/saveMatchRulesInfo", {
            matchId: this.matchId,
            serialNum: this.serialNum,
            list: arr,
            saveState: "1",
          });
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }

      try {
        var res = await uni.$u.http.post("/match/saveMatchRulesDescri", {
          matchId: this.matchId,
          serialNum: this.serialNum,
          rulesType: 1,
          list: this.contentList,
        });

        if (res.status == 200) {
          this.$refs.notice.show({
            type: "default",
            message: "保存成功",
          });
          this.back();
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    saveTextareaContent(event) {
      const { value } = event.detail;
      this.$set(this.textareaContent, this.op, value);
      uni.setStorageSync("textareaContent", this.textareaContent);
    },
    addText() {
      this.contentList.push({
        content: "",
        descriType: 1,
        sort: this.contentList.length + 1, // 递增的序号
      });
      uni.setStorageSync("contentList", this.contentList);
    },
    addImage() {
      const token = uni.getStorageSync("token");
      // 选择图片
      uni.chooseImage({
        count: 1, // 最多选择1张图片
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机
        success: (chooseResult) => {
          const tempFilePath = chooseResult.tempFilePaths[0]; // 获取选中的图片路径
          const fileSize = chooseResult.tempFiles[0].size; // 文件大小，单位为字节
          // 检查文件大小是否超过2MB
          const maxSize = 20 * 1024 * 1024; // 2MB
          if (fileSize > maxSize) {
            this.$refs.notice.show({
              type: "default",
              message: "文件大小不能超过20MB，请重新选择。",
            });
            return;
          }
          const params = {
            serialNum: this.serialNum,
            file: tempFilePath,
            fileTypeCode: "10",
            fileTypeName: "规则设置",
          };

          // 上传图片
          uni.uploadFile({
            url: `https://testfeifanpaopao.jireplayer.com/wjapi/file/upload`, // 替换为你的上传接口地址
            filePath: tempFilePath,
            name: "file", // 文件对应的 key
            formData: params,
            header: {
              Authorization: "Bearer " + token, // 示例：添加认证信息
            },
            success: (uploadResult) => {
              const data = JSON.parse(uploadResult.data); // 解析返回结果
              if (data.status === 200) {
                // 将图片内容添加到列表
                this.contentList.push({
                  content: data.data, // 假设返回的图片 URL 在 data.url 中
                  descriType: 2, // 赛事说明类型：2-图片
                  sort: this.contentList.length + 1, // 递增的序号
                });
                uni.setStorageSync("contentList", this.contentList);
              } else {
                // 上传失败的提示
                this.$refs.notice.show({
                  type: "default",
                  message: "图片上传失败：" + data.message,
                });
              }
            },
            fail: (err) => {
              // 上传失败的提示
              this.$refs.notice.show({
                type: "default",
                message: "图片上传失败，请检查网络或稍后重试",
              });
              console.error("图片上传失败", err);
            },
          });
        },
        fail: (err) => {
          console.error("选择图片失败", err);
        },
      });
    },
    uploadMainFile() {
      // 选择图片
      uni.chooseImage({
        count: 1, // 最多选择1张图片
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机
        success: (chooseResult) => {
          const tempFilePath = chooseResult.tempFilePaths[0]; // 获取选中的图片路径
          const fileSize = chooseResult.tempFiles[0].size; // 文件大小，单位为字节

          // 检查文件大小是否超过2MB
          const maxSize = 20 * 1024 * 1024; // 2MB
          if (fileSize > maxSize) {
            this.$refs.notice.show({
              type: "default",
              message: "文件大小不能超过20MB，请重新选择。",
            });
            return;
          }
          const params = {
            serialNum: this.serialNum,
            file: tempFilePath,
            fileTypeCode: "10",
            fileTypeName: "赛事主图",
          };
          const token = uni.getStorageSync("token");
          // 上传图片
          uni.uploadFile({
            // url: `${config.url}/file/upload`, // 替换为你的上传接口地址
            url: `https://testfeifanpaopao.jireplayer.com/wjapi/file/upload`, // 替换为你的上传接口地址
            filePath: tempFilePath,
            name: "file", // 文件对应的 key
            formData: params,
            header: {
              Authorization: "Bearer " + token, // 示例：添加认证信息
            },
            success: (uploadResult) => {
              const data = JSON.parse(uploadResult.data); // 解析返回结果
              if (data.status === 200) {
                this.mainFile = data.data;
                uni.setStorageSync("mainFile", this.mainFile);
              } else {
                // 上传失败的提示
                this.$refs.notice.show({
                  type: "default",
                  message: "图片上传失败：" + data.message,
                });
              }
            },
            fail: (err) => {
              // 上传失败的提示
              this.$refs.notice.show({
                type: "default",
                message: "图片上传失败，请检查网络或稍后重试",
              });
              console.error("图片上传失败", err);
            },
          });
        },
        fail: (err) => {
          console.error("选择图片失败", err);
        },
      });
    },
    back() {
      // uni.switchTab({ url: "/pages/add/add" });
      uni.removeStorageSync("joinPointsRace");
      uni.removeStorageSync("joinList");
      uni.removeStorageSync("labelId");
      uni.removeStorageSync("typeName");
      uni.removeStorageSync("labelCode");
      uni.removeStorageSync("templateName");
      uni.removeStorageSync("templateId");
      uni.removeStorageSync("way");
      uni.removeStorageSync("number");
      uni.removeStorageSync("genderLimitName");
      uni.removeStorageSync("genderLimit");
      uni.removeStorageSync("entryFee");
      uni.removeStorageSync("fullAddress");
      uni.removeStorageSync("bmLocal");
      uni.removeStorageSync("startTime");
      uni.removeStorageSync("endTime");
      uni.removeStorageSync("sponsor");
      uni.removeStorageSync("ageLimitMin");
      uni.removeStorageSync("ageLimitMax");
      uni.removeStorageSync("ageLimitMinName");
      uni.removeStorageSync("ageLimitMaxName");
      uni.removeStorageSync("badgeLevelMin");
      uni.removeStorageSync("badgeLevelMinName");
      uni.removeStorageSync("badgeLevelMax");
      uni.removeStorageSync("badgeLevelMaxName");
      uni.removeStorageSync("matchLevelMin");
      uni.removeStorageSync("matchLevelMinName");
      uni.removeStorageSync("matchLevelMax");
      uni.removeStorageSync("matchLevelMaxName");
      uni.removeStorageSync("type");
      uni.removeStorageSync("form");
      uni.removeStorageSync("umpireId");
      uni.removeStorageSync("registrationEndTime");
      uni.removeStorageSync("publicationTime");
      uni.removeStorageSync("items");
      uni.removeStorageSync("rewards");
      uni.removeStorageSync("groupNum");
      uni.removeStorageSync("matchingManner");
      uni.removeStorageSync("matchingMannerName");
      uni.removeStorageSync("contentList");
      uni.removeStorageSync("textareaContent");
      uni.removeStorageSync("mainFile");
      uni.removeStorageSync("serialNum");
      uni.removeStorageSync("templateId");
      uni.removeStorageSync("theme");
      uni.removeStorageSync("groupNumName");
      uni.removeStorageSync("groupPerNum");
      uni.removeStorageSync("groupPerNumName");
      uni.removeStorageSync("matchId");
      uni.removeStorageSync("name");
      uni.removeStorageSync("fuTitle");
      uni.removeStorageSync("group_num");
      uni.removeStorageSync("activeTab");
      uni.removeStorageSync("refundDays");
      uni.removeStorageSync("refundDaysName");
      uni.removeStorageSync("insuranceId");
      uni.removeStorageSync("insuranceName");
      uni.removeStorageSync("stageUserNum");
      uni.removeStorageSync("zz");
      uni.removeStorageSync("gameList");
      uni.removeStorageSync("zzName");
      uni.removeStorageSync("groups");
    },
    async getMatchTemplateHit() {
      const hitTypeCode = this.gameList[this.op].scheTypeCode;
      var result = await uni.$u.http.get("/match/getMatchTemplateHit", {
        params: {
          templateId: this.templateId,
          hitTypeCode,
        },
      });

      if (result.status == 200) {
        uni.setStorageSync("groupNum", result.data.groupNum);
        this.groupNum = result.data.groupNum;
        uni.setStorageSync("stageUserNum", result.data.stageUserNum);
        this.stageUserNum = result.data.stageUserNum;
        uni.setStorageSync("groupUmpireType", result.data.groupUmpireType);
        this.groupUmpireType = result.data.groupUmpireType;
        uni.setStorageSync("groupVenueType", result.data.groupVenueType);
        this.groupVenueType = result.data.groupVenueType;
        uni.setStorageSync("matchingManner", result.data.matchingManner);
        this.matchingManner = result.data.matchingManner;
        // if (result.data.matchingManner == 1) {
        //   this.matchingMannerName = "淘汰赛制";
        // }
        // if (result.data.matchingManner == 2) {
        //   this.matchingMannerName = "循环赛制";
        // }
        // if (result.data.matchingManner == 3) {
        //   this.matchingMannerName = "1v1赛制";
        // }
        // if (result.data.matchingManner == 4) {
        //   this.matchingMannerName = "主客场赛制";
        // }
        // if (result.data.matchingManner == 5) {
        //   this.matchingMannerName = "双败赛制";
        // }
        // uni.setStorageSync("matchingMannerName", this.matchingMannerName);
        uni.setStorageSync("scoringMethod", result.data.scoringMethod);
        this.scoringMethod = result.data.scoringMethod;
      }
    },
    async getMatchLevel() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: this.labelCode,
        },
      });
      var arr = [];
      result.data.map((item, index) => {
        arr.push(item.label);
      });
      this.columns6 = [arr];
      this.badgeLevelMin = 1;
      this.badgeLevelMax = arr.length;
    },
    confirm14(n) {
      this.show14 = false;
      this.matchLevelMin = n.indexs[0] + 1;
      this.matchLevelMinName = n.value[0];
      uni.setStorageSync("matchLevelMin", this.matchLevelMin);
      uni.setStorageSync("matchLevelMinName", this.matchLevelMinName);
    },
    confirm15(n) {
      this.show15 = false;
      this.matchLevelMax = n.indexs[0] + 1;
      this.matchLevelMaxName = n.value[0];
      uni.setStorageSync("matchLevelMax", this.matchLevelMax);
      uni.setStorageSync("matchLevelMaxName", this.matchLevelMaxName);
    },
    async getGroupNum() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "group_num",
        },
      });
      var arr = [];
      result.data.map((item, index) => {
        arr.push(item.label);
      });
      this.columns19 = [arr];
    },
    confirm19(n) {
      this.show19 = false;
      this.groupNum = n.indexs[0] + 1;
      this.groupNumName = n.value[0];
      uni.setStorageSync("groupNum", this.groupNum);
      uni.setStorageSync("groupNumName", this.groupNumName);
    },
    async getGroupPerNum() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "group_per_num",
        },
      });
      var arr = [];
      result.data.map((item, index) => {
        arr.push(item.label);
      });
      this.columns20 = [arr];
    },
    confirm20(n) {
      this.show20 = false;
      this.groupPerNum = n.indexs[0] + 2;
      this.groupPerNumName = n.value[0];
      uni.setStorageSync("groupPerNum", this.groupPerNum);
      uni.setStorageSync("groupPerNumName", this.groupPerNumName);
    },
    chooseThis(n) {
      this.refundDays = String(n);
    },
    confirmRefundPolicy() {
      if (!this.refundDays) {
        this.$refs.notice.show({
          type: "default",
          message: "请选择退款政策",
        });
        return;
      }
      if (this.refundDays == 1) {
        this.refundDaysName = "赛前退100%";
      } else {
        this.refundDaysName = "赛前7天退100%，赛前退50%";
      }
      uni.setStorageSync("refundDays", this.refundDays);
      uni.setStorageSync("refundDaysName", this.refundDaysName);
      this.show16 = false;
    },
    insuranceEnter() {
      this.show17 = false;
      if (this.insuranceId == 1) {
        this.insuranceName = "参与者意外保险";
      } else {
        this.insuranceName = "无保障";
      }
      uni.setStorageSync("insuranceId", this.insuranceId);
      uni.setStorageSync("insuranceName", this.insuranceName);
    },
    addReward(a) {
      this.rewards[a].prizes.push({
        sponsorType: "实物",
        receiveMethod: "到店领取",
        rewardName: "",
        rewardNum: "",
        rewardUnit: "",
        pickupAddress: "",
        contactInfo: "",
      });

      uni.setStorageSync("rewards", this.rewards);
    },
    delReward(a) {
      this.rewards.splice(a, 1);
      uni.setStorageSync("rewards", this.rewards);
    },
    addRewardMember() {
      this.rewards.push({
        rewardType: "",
        rewardTypeName: "",
        rewardAmount: "",
        prizes: [
          {
            sponsorType: "实物",
            receiveMethod: "到店领取",
            rewardName: "",
            rewardNum: "",
            rewardUnit: "",
            pickupAddress: "",
            contactInfo: "",
          },
        ],
      });
      uni.setStorageSync("rewards", this.rewards);
    },
    showPicker10(index) {
      this.show10 = true;
      this.counter = index;
    },
    blur10() {
      uni.setStorageSync("stageUserNum", this.stageUserNum);
    },
    delPrize(a, b) {
      this.rewards[a].prizes.splice(b, 1);
      uni.setStorageSync("rewards", this.rewards);
    },
    moveUp(index) {
      if (index > 0) {
        const temp = this.contentList[index];
        this.contentList.splice(index, 1);
        this.contentList.splice(index - 1, 0, temp);
      }
    },
    moveDown(index) {
      const temp = this.contentList[index];
      this.contentList.splice(index, 1);
      this.contentList.splice(index + 1, 1, temp);
    },
    deleteItem(index) {
      if (this.contentList.length > 1) {
        this.contentList.splice(index, 1);
      }
    },
    async getPP() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "matching_manner",
        },
      });
      var arr = [];
      result.data.map((item) => {
        arr.push(item.label);
      });
      this.columns12 = [arr];
    },
    confirm21(n) {
      this.show21 = false;
      this.zz = n.indexs[0] + 1;
      this.zzName = n.value[0];
      uni.setStorageSync("zz", this.zz);
      uni.setStorageSync("zzName", this.zzName);
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
    closeWar(item) {
      item.warList = [];
      item.expand = false;
    },
  },
  computed: {
    sliderPosition() {
      return this.sliderValue; // 将滑块值映射为百分比
    },
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
.new {
  width: 100vw;
  height: auto;
  background-color: #f7f7f7;
  z-index: 1;

  .costom-color {
    background-color: #fff;
    height: 160px;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    z-index: 3;
    align-items: center;
    justify-content: space-evenly;

    .slider-track {
      position: relative;
      width: 70%; // 滑动条宽度
      height: 10px; // 滑动条高度
      background: linear-gradient(
        to right,
        #991515 0%,
        #992f15 3%,
        #994a15 6%,
        #997f15 12%,
        #996415 9%,
        #999915 15%,
        #7f9915 18%,
        #649915 21%,
        #4a9915 24%,
        #2f9915 27%,
        #159915 30%,
        #15992f 33%,
        #15994a 36%,
        #159964 39%,
        #15997f 42%,
        #159999 45%,
        #157f99 48%,
        #156499 51%,
        #154a99 54%,
        #152f99 57%,
        #151599 60%,
        #2f1599 63%,
        #4a1599 66%,
        #641599 69%,
        #7f1599 72%,
        #991599 75%,
        #99157f 78%,
        #991564 81%,
        #99154a 84%,
        #991517 100%
      ); // 渐变背景
      border-radius: 5px; // 圆角效果
      cursor: pointer;

      .slider-thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 20px; // 滑块直径
        height: 20px;
        background-color: #ffffff;
        border: 2px solid #cccccc;
        border-radius: 50%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }
  }

  .color {
    background-color: #fff;
    height: 160px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 3;
    .top {
      display: flex;
      width: 90%;
      margin: 16px auto;
      justify-content: space-between;
      .left {
        font-weight: 600;
        font-size: 16px;
        color: #1d2326;
      }
      .right {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 16px;
        color: rgba(29, 35, 38, 0.5);
        gap: 10px;
      }
    }

    .color-info {
      display: flex;
      margin-left: 5%;
      gap: 10px;
      padding: 5px;
      .item {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 6px solid #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1),
          -2px -2px 10px rgba(0, 0, 0, 0.01);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
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
      height: 80%;
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
          .notice {
            font-weight: 400;
            font-size: 10px;
            color: #ffffff;
            margin-top: 8px;
          }
        }
      }
    }

    .next-u {
      width: 100%;
      height: 30%;
      position: absolute;
      bottom: 0;
    }

    .cup {
      margin-top: 20px;
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
        backdrop-filter: blur(30px);
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
            font-style: normal;
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
        backdrop-filter: blur(20px);
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
      }
    }
    .change {
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
  }

  .type {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2),
      0px -5px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    z-index: 10;
    height: 52px;

    .item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      height: 52px;
      box-sizing: border-box;
      justify-content: center;

      .value {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        white-space: nowrap;
      }
    }
    .item-active {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 15px;
      // background-color: #1e54ba;
      position: relative;
      z-index: 11;
      box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.2),
        -5px 0px 10px rgba(0, 0, 0, 0.2);
      height: 52px;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;

      &::after {
        content: "";
        position: absolute;
        top: -5px; // 完全移动到父元素上方
        left: 50%; // 水平居中
        transform: translateX(-50%);
        width: 100%; // 固定宽度
        height: 5px; // 保持高度不变
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
        border-top: 10px solid var(--active-color); // 动态绑定颜色
      }

      .value-active {
        font-family: "youshe";
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        white-space: nowrap;
      }
    }
  }

  .content {
    background-color: #1b4aa2;
    // height: 100%;
    flex: 1;
    padding-bottom: 50px;

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
          width: 95%;
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

      .jdsz {
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 5px;
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
        justify-content: center;
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
        width: 80%;
        height: 44px;
        background-color: black;
        border-radius: 22px;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px auto 0;
      }

      .pp-yl {
        width: 80%;
        height: 44px;
        background-color: white;
        border-radius: 22px;
        font-weight: 400;
        font-size: 16px;
        color: #1d2326;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px auto 0;
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
      }

      .rules {
        border-radius: 10px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
          -5px -5px 10px rgba(0, 0, 0, 0.2);
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
          padding: 12px;
          box-sizing: border-box;
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

.pl-class {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
}

.pl-class1 {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.3);
  text-align: right;
}

.pl-class2 {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.3);
  text-align: right;
}

.refund {
  height: 380px;
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #15181a;
    height: 56px;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    text-indent: 10%;
    white-space: nowrap;
  }
  .content {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    margin: auto;
    margin-top: 18px;
    padding-bottom: 40px;
    .left {
      background-color: #f7f7f7;
      padding: 12px;
      box-sizing: border-box;
      width: 47%;
      border-radius: 5px;
      .title {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
        height: auto;
        padding-bottom: 28px;
        text-indent: 0;
        text {
          font-weight: 600;
          font-size: 14px;
          color: #ed5060;
        }
      }
      .text {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        margin-top: 12px;
        padding-bottom: 58px;
      }
    }
    .left-active {
      background: linear-gradient(#faebeb 0%, rgba(255, 255, 255, 0) 100%);
      padding: 12px;
      box-sizing: border-box;
      width: 47%;
      border-radius: 5px;
      border: 1px solid red;
      .title {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
        height: auto;
        padding-bottom: 28px;
        text-indent: 0;
        text {
          font-weight: 600;
          font-size: 14px;
          color: #ed5060;
        }
      }
      .text {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        margin-top: 12px;
        padding-bottom: 58px;
      }
    }
  }
  .enter {
    width: 80%;
    height: 44px;
    margin: auto;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    border-radius: 22px;
  }
}

.insurance {
  height: 380px;
  .first {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 12px;
    height: 56px;
    gap: 5px;
    font-weight: 600;
    font-size: 18px;
    color: #09aa95;
    background-color: #f2fbf8;
    border-radius: 10px;
  }
  .second {
    display: flex;
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 18px;
    gap: 12px;
    position: relative;

    .left {
      height: 196px;
      background-color: #f7f7f7;
      box-sizing: border-box;
      .top {
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
        padding: 18px 55px 8px 12px;
        border-bottom: 1px solid #f0f0f0;
        white-space: nowrap;
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 12px;
        margin-top: 17px;
        gap: 12px;
        padding-bottom: 29px;
      }
    }
    .right {
      width: 65%;
      height: 196px;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        #e6faf7 100%
      );
      .top {
        height: 48px;
        border-bottom: 1px solid #f0f0f0;
        padding-top: 20px;
        padding-left: 16px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
      }
      .bottom {
        box-sizing: border-box;
        padding-top: 8px;
        padding-left: 16px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        text-indent: 0;
        gap: 6px;
        display: flex;
        flex-direction: column;

        .item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
          text {
            color: #18af9b;
          }
        }
      }
      .tk {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 19px;
        font-weight: 400;
        font-size: 12px;
        color: #2a8aba;
      }
    }
  }
  .notice {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 400;
    font-size: 10px;
    color: rgba(29, 35, 38, 0.6);
    width: 90%;
    margin: auto;
    padding-top: 10px;
  }
  .enter {
    width: 70%;
    height: 44px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    background-color: black;
    margin: 12px auto;
  }
}

.reward-item {
  .del {
    height: 40px;
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 14px;
    color: #1d2326;
  }
}
</style>
