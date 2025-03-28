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
            @click="changeColor(item)"
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
      <u-navbar
        bgColor="rgba(0,0,0,0)"
        @leftClick="back"
        leftIconColor="#ffffff"
      ></u-navbar>
      <view class="upload">
        <view class="top">
          <image
            :src="mainFile"
            mode="scaleToFill"
            v-if="mainFile"
            style="width: 100%; height: 100%"
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
            </view>
          </view>
        </view>

        <view
          class="next-u"
          :style="{
            background: `linear-gradient(180deg,#cccccc 0%,${selectColor} 30%)`,
          }"
        ></view>

        <view class="cup">
          <view class="top">
            <view class="left">
              <view class="first">这里是赛事名称</view>
              <view class="second">这里是赛事副标题</view>
            </view>
          </view>

          <view class="next">
            <view class="plus"></view>
            <view class="button" @click="changeSkin = true">个性换肤</view>
          </view>
        </view>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/cup.png"
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
          <view class="value" v-if="activeTab != index">{{ tab.name }}</view>
          <image
            :src="tab.img"
            mode="scaleToFill"
            style="width: 52px; height: 22px"
            v-else
          />
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/biao.png"
            mode="scaleToFill"
            style="width: 100%; height: 2px"
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
                    activeColor="red"
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
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">赛事模版<view class="icon">*</view></view>
              <view
                class="right"
                @click="toTemplete"
                :style="{ width: templateName ? '60%' : '' }"
                ><text :style="{ color: templateName ? 'black' : '' }">{{
                  templateName || "请选择赛事模版"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">赛事名称 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="name"
                    placeholder="请填写赛事名称"
                    border="none"
                    @change="blur1"
                    input-align="right"
                    placeholderClass="pl-class"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事副标题<view class="icon">*</view></view>
              <view class="right">
                <view class="input">
                  <u-input
                    v-model="fuTitle"
                    placeholder="请填写赛事副标题"
                    border="none"
                    @change="blur2"
                    input-align="right"
                    placeholderClass="pl-class"
                  ></u-input> </view
              ></view>
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
                    activeColor="red"
                    label="公开赛"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
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
                    activeColor="red"
                    label="线上赛"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
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
                :style="fullAddress ? 'width:60%' : ''"
                ><text :style="{ color: fullAddress ? 'black' : '' }">{{
                  fullAddress || "请选择赛事地点"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
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
                <u-avatar></u-avatar>
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
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
                    activeColor="red"
                    label="接受"
                    shape="circle"
                    name="0"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
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
                    activeColor="red"
                    label="单人"
                    shape="circle"
                    name="1"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
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
              <view class="right" @click="show3 = true"
                ><text style="color: black">{{
                  genderLimitName || "请选择参赛组数限制"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item" v-if="way == 2">
              <view class="left">单组人数限制 <view class="icon">*</view></view>
              <view class="right" @click="show3 = true"
                ><text style="color: black">{{
                  genderLimitName || "请选择单组人数限制"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">性别限制 <view class="icon">*</view></view>
              <view class="right" @click="show3 = true"
                ><text style="color: black">{{
                  genderLimitName || "无限制"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item-o">
              <view class="top">
                <view class="left"> 年龄限制 <view class="icon">*</view> </view>
                <view class="right">以比赛当天计算</view>
              </view>
              <view class="bt">
                <view class="left">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show4 = true"
                    >{{ ageLimitMin ? ageLimitMin : 0 }}
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
                  </view>
                </view>

                <view class="right">
                  <view class="r1">最高</view>
                  <view class="r2" @click="show5 = true"
                    >{{ ageLimitMax ? ageLimitMax : 99 }}
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
                  徽章等级要求 <view class="icon">*</view>
                </view>
                <!-- <view class="right">
                  <u-checkbox-group
                    v-model="badge"
                    placement="row"
                    iconPlacement="right"
                  >
                    <u-checkbox
                      activeColor="red"
                      shape="circle"
                      label="需要认证徽章"
                      customStyle="gap:10px"
                      name="0"
                    ></u-checkbox>
                  </u-checkbox-group>
                </view> -->
              </view>
              <view class="bt">
                <view class="left">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show6 = true"
                    >{{ badgeLevelMinName ? badgeLevelMinName : "无限制" }}
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
                  </view>
                </view>

                <view class="right">
                  <view class="r1">最高</view>
                  <view class="r2" @click="show7 = true"
                    >{{ badgeLevelMaxName ? badgeLevelMaxName : "无限制" }}
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
                  </view>
                </view>
              </view>
            </view>
            <view class="item-o" v-if="way == 2">
              <view class="top">
                <view class="left">
                  赛事等级要求 <view class="icon">*</view>
                </view>
                <!-- <view class="right">
                  <u-checkbox-group
                    v-model="badge"
                    placement="row"
                    iconPlacement="right"
                  >
                    <u-checkbox
                      activeColor="red"
                      shape="circle"
                      label="需要认证徽章"
                      customStyle="gap:10px"
                      name="0"
                    ></u-checkbox>
                  </u-checkbox-group>
                </view> -->
              </view>
              <view class="bt">
                <view class="left">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show6 = true"
                    >{{ badgeLevelMinName ? badgeLevelMinName : "无限制" }}
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
                  </view>
                </view>

                <view class="right">
                  <view class="r1">最高</view>
                  <view class="r2" @click="show7 = true"
                    >{{ badgeLevelMaxName ? badgeLevelMaxName : "无限制" }}
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                      mode="scaleToFill"
                      style="width: 12px; height: 12px"
                    />
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
                  ></u-input>
                  ￥</view
                ></view
              >
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/richeng.png"
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
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">赛事名单公布 <view class="icon">*</view></view>
              <view class="right" @click="show9 = true"
                ><text :style="{ color: publicationTime ? 'black' : '' }">{{
                  publicationTime || "请选择名单公布日期"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
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
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
                />
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                  @click.stop="deleteItem(index)"
                />
              </view>
            </view>
          </view>

          <view class="add" @click="addItem">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/add-red.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px"
            />
            添加环节
          </view>

          <view class="end">
            <view class="end-i">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/edit.png"
                mode="scaleToFill"
                style="width: 24px; height: 24px"
              />
              退出编辑
            </view>

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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/基础信息设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="o-text">
            <view class="item">
              <view class="left">奖励者名称 <view class="icon">*</view></view>
              <view class="right" @click="show10 = true"
                ><text :style="{ color: rewardTypeName ? 'black' : '' }">{{
                  rewardTypeName || "请选择奖励者名称"
                }}</text
                ><image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">奖金金额 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 50px">
                  <u-input
                    v-model="rewardAmount"
                    placeholder="￥0.00"
                    border="none"
                    @change="blur5"
                    type="number"
                    placeholderClass="pl-class"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">赞助类型 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group v-model="sponsorType" placement="row">
                  <u-radio
                    activeColor="red"
                    label="实物赞助"
                    shape="circle"
                    name="实物赞助"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
                    label="服务赞助"
                    name="服务赞助"
                    shape="circle"
                    customStyle="margin-left: 20px"
                  ></u-radio>
                </u-radio-group>
              </view>
            </view>
            <view class="item-o">
              <view class="left">领取方式 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group v-model="receiveMethod" placement="row">
                  <u-radio
                    activeColor="red"
                    label="比赛现场发放"
                    name="比赛现场发放"
                    shape="circle"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
                    label="到店领取"
                    name="到店领取"
                    shape="circle"
                    customStyle="margin-left: 5px"
                  ></u-radio>
                  <u-radio
                    activeColor="red"
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
                <view class="left"> 奖品名称 <view class="icon">*</view> </view>
                <view class="right">
                  <view style="width: 110px">
                    <u-input
                      v-model="rewardName"
                      placeholder="请填写奖品名称"
                      border="none"
                      @change="blur7"
                      input-align="right"
                      placeholderClass="pl-class"
                    ></u-input>
                  </view>
                </view>
              </view>
              <view class="bt">
                <view class="left" style="width: 49%">
                  <view class="l1">数量</view>
                  <view style="width: 50%">
                    <u-input
                      v-model="rewardNum"
                      placeholder="请输入"
                      border="none"
                      @change="blur8"
                      input-align="right"
                      placeholderClass="pl-class"
                    ></u-input>
                  </view>
                </view>

                <view class="right" style="width: 49%">
                  <view class="r1">单位</view>
                  <view>
                    <u-input
                      v-model="rewardUnit"
                      placeholder="请输入"
                      border="none"
                      @change="blur9"
                      input-align="right"
                      placeholderClass="pl-class"
                    ></u-input>
                  </view>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">到店领取地址 <view class="icon">*</view></view>
              <view
                class="right"
                @click="chooseAddress"
                :style="pickupAddress ? 'width: 60%;' : ''"
                ><text :style="{ color: pickupAddress ? 'black' : '' }">{{
                  pickupAddress || "请选择"
                }}</text
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
                  v-model="contactInfo"
                  placeholder="请填写联系方式"
                  border="none"
                  @change="blur6"
                  type="number"
                  input-align="right"
                  placeholderClass="pl-class"
                ></u-input>
              </view>
            </view>
            <view class="item">
              <view class="left">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/添加.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
                新增奖品
              </view>
              <view class="right">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删除.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
              </view>
            </view>
          </view>

          <view class="add">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/add-red.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px"
            />
            添加奖励者
          </view>

          <view class="end">
            <view class="end-i">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/edit.png"
                mode="scaleToFill"
                style="width: 24px; height: 24px"
              />
              退出编辑
            </view>

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

          <view class="jdsz">阶段设置</view>

          <view class="o-text">
            <view class="item">
              <view class="left">本阶段 <view class="icon">*</view></view>
              <view class="right">
                {{ stageExplains }}
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
        :columns="columns4"
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
      selectColor: uni.getStorageSync("theme") || "#1B4CA7",
      custom: false,
      sliderValue: 0,
      isDragging: false, // 是否正在拖动
      tabs: [
        {
          img: "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/报名设置.svg",
          name: "报名设置",
        },
        {
          img: "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/环节设置.svg",
          name: "环节设置",
        },
        {
          img: "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/奖励设置.svg",
          name: "奖励设置",
        },
        {
          img: "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/直击设置.svg",
          name: "直击设置",
        },
        {
          img: "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/规则设置.svg",
          name: "规则设置",
        },
      ],
      bmType: [],
      serialNum: uni.getStorageSync("serialNum") ?? "",
      fileList: [],
      joinList: uni.getStorageSync("joinList") || ["1"],
      joinPointsRace: uni.getStorageSync("joinPointsRace") || 1,
      type: uni.getStorageSync("type") || "1",
      form: uni.getStorageSync("form") || "1",
      sponsor: uni.getStorageSync("sponsor") || "0",
      name: uni.getStorageSync("name") ?? "",
      fuTitle: uni.getStorageSync("fuTitle") ?? "",
      labelId: uni.getStorageSync("labelId") ?? 0,
      typeName: uni.getStorageSync("typeName") ?? "",
      startTime: uni.getStorageSync("startTime") ?? 0,
      date: Number(new Date()),
      endTime: uni.getStorageSync("endTime") ?? 0,
      way: uni.getStorageSync("way") || "1",
      fullAddress: uni.getStorageSync("fullAddress") ?? "",
      show3: false,
      columns3: [["无限制", "男", "女"]],
      columns4: [],
      number: uni.getStorageSync("number") ?? "",
      genderLimit: uni.getStorageSync("genderLimit") || 0,
      show4: false,
      badge: [],
      entryFee: uni.getStorageSync("entryFee") ?? "",
      templateId: uni.getStorageSync("templateId") ?? "",
      templateName: uni.getStorageSync("templateName") ?? "",
      umpireId: 101112,
      ageLimitMin: uni.getStorageSync("ageLimitMin") || 0,
      ageLimitMax: uni.getStorageSync("ageLimitMax") || 99,
      genderLimitName: uni.getStorageSync("genderLimitName") ?? "",
      columns6: [["网球水平1.0", "网球水平2.0", "网球水平3.0", "网球水平4.0"]],
      badgeLevelMin: uni.getStorageSync("badgeLevelMin") ?? "",
      badgeLevelMinName: uni.getStorageSync("badgeLevelMinName") ?? "",
      badgeLevelMax: uni.getStorageSync("badgeLevelMax") ?? "",
      badgeLevelMaxName: uni.getStorageSync("badgeLevelMaxName") ?? "",
      matchId: uni.getStorageSync("matchId") ?? "",
      show8: false,
      registrationEndTime: uni.getStorageSync("registrationEndTime") ?? 0,
      publicationTime: uni.getStorageSync("publicationTime") ?? null,
      show10: false,
      rewardType: uni.getStorageSync("rewardType") ?? "",
      rewardTypeName: uni.getStorageSync("rewardTypeName") ?? "",
      columns10: [["冠军", "亚军", "季军", "第四名", "第五名", "第六名"]],
      rewardAmount: uni.getStorageSync("rewardAmount") ?? "",
      sponsorType: "实物赞助",
      receiveMethod: "到店领取",
      pickupAddress: uni.getStorageSync("pickupAddress") ?? "",
      contactInfo: uni.getStorageSync("contactInfo") ?? "",
      scoringMethod: "积分",
      scoringMethod: "1",
      groupUmpireType: "1",
      groupVenueType: "1",
      show11: false,
      groupNum: uni.getStorageSync("groupNum") ?? null,
      show12: false,
      columns12: [
        ["淘汰赛制", "循环赛制", "1V1赛制", "主客场赛制", "双败赛制"],
      ],
      matchingMannerName: uni.getStorageSync("matchingMannerName") ?? null,
      matchingManner: uni.getStorageSync("matchingManner") ?? null,
      rewardName: uni.getStorageSync("rewardName") ?? "",
      rewardNum: uni.getStorageSync("rewardNum") ?? "",
      rewardUnit: uni.getStorageSync("rewardUnit") ?? "",
      op: 0,
      stageExplains: uni.getStorageSync("stageExplains") || "32人/队",
      gameList: uni.getStorageSync("gameList") || [],
      scheTypeName: uni.getStorageSync("stageExplains") ?? "",
      items: [],
      currentIndex: "",
      counter: 1,
      textareaContent: uni.getStorageSync("textareaContent") || [],
      contentList: uni.getStorageSync("contentList") || [],
      mainFile: "",
      count: 0,
    };
  },
  async mounted() {
    if (!this.serialNum) {
      const result = await uni.$u.http.get("/match/getSerialNum");
      if (result.status == 200) {
        this.serialNum = result.data.serialNum;
        uni.setStorageSync("serialNum", result.data.serialNum);
      }
    }

    this.getAge();
    // this.getGame();
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
      uni.setStorageSync("activeTab", index);
      console.log(index);
      if (index == 3) {
        this.getMatchTemplateHit();
      }
    },
    skin() {
      if (this.changeSkin) {
        this.changeSkin = false;
      } else {
        this.changeSkin = true;
      }
    },
    changeColor(color) {
      this.selectColor = color;
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
          const index = Math.floor(
            (position / 100) * (this.colorList.length - 1)
          );
          this.selectColor = this.colorList[index];
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
    toJudge() {
      uni.navigateTo({
        url: "/competition/publish/judge",
      });
    },
    confirm3(n) {
      this.show3 = false;
      this.genderLimit = n.indexs[0];
      this.genderLimitName = n.value[0];
      uni.setStorageSync("genderLimitName", this.genderLimitName);
      uni.setStorageSync("genderLimit", this.genderLimit);
    },
    async save1() {
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
        });
        if (result.status == 200) {
          this.matchId = result.data.matchId;
          uni.setStorageSync("matchId", this.matchId);
          var res = await uni.$u.http.post("/match/saveMatchRegisterInfo", {
            matchId: this.matchId,
            serialNum: this.serialNum,
            way: this.way,
            number: this.number,
            genderLimit: this.genderLimit,
            ageLimitMin: this.ageLimitMin,
            ageLimitMax: this.ageLimitMax,
            entryFee: this.entryFee,
          });
          if (res.status == 200) {
            this.$refs.notice.show({
              type: "success",
              message: res.message,
            });
            // 删除本地存储
            uni.removeStorageSync("joinPointsRace");
            uni.removeStorageSync("joinList");
            uni.removeStorageSync("labelId");
            uni.removeStorageSync("typeName");
            // uni.removeStorageSync("templateId");
            uni.removeStorageSync("templateName");
            uni.removeStorageSync("startTime");
            uni.removeStorageSync("endTime");
            uni.removeStorageSync("genderLimitName");
            uni.removeStorageSync("ageLimitMin");
            uni.removeStorageSync("ageLimitMax");
            uni.removeStorageSync("entryFee");
            uni.removeStorageSync("way");
            uni.removeStorageSync("number");
            uni.removeStorageSync("badgeLevelMin");
            uni.removeStorageSync("badgeLevelMinName");
            uni.removeStorageSync("badgeLevelMax");
            uni.removeStorageSync("badgeLevelMaxName");
            uni.removeStorageSync("name");
            uni.removeStorageSync("fuTitle");
            uni.removeStorageSync("fuTitleName");
            uni.removeStorageSync("type");
            uni.removeStorageSync("form");
            uni.removeStorageSync("fullAddress");
            uni.removeStorageSync("umpireId");
            uni.removeStorageSync("sponsor");
            uni.removeStorageSync("genderLimit");

            this.joinList = ["1"];
            this.joinPointsRace = 1;
            this.typeName = "";
            this.templateName = "";
            this.name = "";
            this.fuTitle = "";
            this.type = "1";
            this.form = "1";
            this.fullAddress = "";
            this.startTime = "";
            this.endTime = "";
            this.sponsor = "1";
            this.way = "1";
            this.number = "";
            this.genderLimitName = "无限制";
            this.genderLimit = 0;
            this.ageLimitMin = 0;
            this.ageLimitMax = 99;
            this.badgeLevelMin = "";
            this.badgeLevelMax = "";
            this.badgeLevelMinName = "无限制";
            this.badgeLevelMaxName = "无限制";
            this.entryFee = "";

            this.activeTab++;
            // this.serialNum=''
            // uni.removeStorageSync("serialNum");
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
        uni.removeStorageSync("serialNum");
      }
    },
    blur1(n) {
      uni.setStorageSync("name", n);
    },
    blur2(n) {
      uni.setStorageSync("fuTitle", n);
    },
    blur3(n) {
      uni.setStorageSync("number", n);
    },
    getAge() {
      var arr = [];
      for (let i = 0; i <= 100; i++) {
        arr.push(i);
      }
      this.columns4.push(arr);
    },
    confirm4(n) {
      this.show4 = false;
      this.ageLimitMin = n.indexs[0];
      uni.setStorageSync("ageLimitMin", this.ageLimitMin);
    },
    confirm5(n) {
      this.show5 = false;
      this.ageLimitMax = n.indexs[0];
      uni.setStorageSync("ageLimitMax", this.ageLimitMax);
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
      this.rewardType = n.indexs[0] + 1;
      this.rewardTypeName = n.value[0];
      uni.setStorageSync("rewardType", this.rewardType);
      uni.setStorageSync("rewardTypeName", this.rewardTypeName);
    },
    blur5(n) {
      uni.setStorageSync("rewardAmount", n);
    },
    chooseAddress() {
      uni.chooseLocation({
        success: (res) => {
          this.pickupAddress = res.address;
          uni.setStorageSync("pickupAddress", res.address);
        },
        fail: function () {},
        complete: function () {},
      });
    },
    blur6(n) {
      uni.setStorageSync("contactInfo", n);
    },
    confirm11(n) {
      this.show11 = false;
      this.groupNum = n.indexs[0];
      uni.setStorageSync("groupNum", this.groupNum);
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
        const date = new Date(new Date());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        // 格式化为 "YYYY-MM-DD HH:mm"
        this.publicationTime = `${year}-${month}-${day} ${hours}:${minutes}`;
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
            type: "success",
            message: result.message,
          });
          // 删除本地存储
          uni.removeStorageSync("registrationEndTime");
          uni.removeStorageSync("publicationTime");
          this.registrationEndTime = "";
          this.publicationTime = "";
          this.items = [];
          this.activeTab++;
          this.getGame();
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
      }
    },
    async save3() {
      try {
        const result = await uni.$u.http.post("/match/saveMatchRewardInfo", {
          matchId: this.matchId,
          serialNum: this.serialNum,
          rewards: [
            {
              rewardType: this.rewardType,
              rewardAmount: this.rewardAmount,
              sponsorType: this.sponsorType,
              receiveMethod: this.receiveMethod,
              pickupAddress: this.pickupAddress,
              contactInfo: this.contactInfo,
              prizes: [
                {
                  rewardName: this.rewardName,
                  rewardNum: this.rewardNum,
                  rewardUnit: this.rewardUnit,
                  rewardSort: this.rewardSort,
                },
              ],
            },
          ],
        });
        if (result.status === 200) {
          this.$refs.notice.show({
            type: "success",
            message: result.message,
          });
          uni.removeStorageSync("rewardType");
          uni.removeStorageSync("rewardTypeName");
          uni.removeStorageSync("rewardAmount");
          uni.removeStorageSync("rewardName");
          uni.removeStorageSync("rewardNum");
          uni.removeStorageSync("rewardUnit");
          uni.removeStorageSync("pickupAddress");
          uni.removeStorageSync("contactInfo");

          this.rewardType = "";
          this.rewardTypeName = "";
          this.rewardAmount = "";
          this.rewardName = "";
          this.rewardNum = "";
          this.rewardUnit = "";
          this.pickupAddress = "";
          this.contactInfo = "";

          this.activeTab++;
        }
      } catch (error) {
        this.$refs.notice.show({
          type: "error",
          message: error.data.message,
        });
      }
    },
    blur7(n) {
      uni.setStorageSync("rewardName", n);
    },
    blur8(n) {
      uni.setStorageSync("rewardNum", n);
    },
    blur9(n) {
      uni.setStorageSync("rewardUnit", n);
    },
    blur10(n) {
      uni.setStorageSync("stageExplains", n);
    },
    async save4() {
      try {
        var result = await uni.$u.http.post("/match/saveMatchHitConfig", {
          matchId: this.matchId,
          serialNum: this.serialNum,
          hitConfigList: [
            {
              hitTypeCode: 1,
              hitTypeName: "淘汰赛制",
              stageExplains: this.stageExplains,
              groupNum: this.groupNum,
              matchingManner: this.matchingManner,
              groupVenueType: this.groupVenueType,
              groupUmpireType: this.groupUmpireType,
              scoringMethod: this.scoringMethod,
            },
          ],
        });
        if (result.code == 200) {
          this.$refs.notice.show({
            type: "success",
            message: result.message,
          });

          this.activeTab++;
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
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
      var result = await uni.$u.http.get("/match/getMatchTemplateSche", {
        params: {
          templateId: this.templateId,
        },
      });
      if (result.status == 200) {
        this.gameList = result.data;
        uni.setStorageSync("gameList", this.gameList);
      }
    },
    change(n) {
      uni.setStorageSync("scheTypeName", n);
    },
    async addItem() {
      try {
        var result = await uni.$u.http.get("/match/getMatchTemplateSche", {
          params: { templateId: this.templateId },
        });
        if (result.status == 200) {
          this.items.push({
            scheTypeCode: result.data[this.count]?.scheTypeCode || this.counter,
            scheTypeName: result.data[this.count]?.scheTypeName || "",
            scheTypeSort: result.data[this.count]?.scheTypeSort || this.counter,
            scheTime: result.data[this.count]?.scheTypeSort || "",
          });
          this.counter++;
          this.count++;
        }
      } catch (err) {
        console.log(err);
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
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
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    checkThis(index) {
      this.op = index;
      // // 如果当前环节没有内容，则初始化为空字符串
      if (!this.textareaContent[index]) {
        this.$set(this.textareaContent, index, "");
      }
    },
    saveThis() {
      uni.setStorageSync("contentList", this.contentList);
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
          if (!result || result.status !== 200) {
            throw new Error(result?.message || "保存规则信息失败");
          }
        }

        var res = await uni.$u.http.post("/match/saveMatchRulesDescri", {
          matchId: this.matchId,
          serialNum: this.serialNum,
          rulesType: 1,
          list: this.contentList,
        });
        if (!res || res.status !== 200) {
          throw new Error(res?.message || "保存规则描述失败");
        }

        // 删除本地缓存
        uni.removeStorageSync("gameList");
        uni.removeStorageSync("textareaContent");
        uni.removeStorageSync("contentList");

        // 重置状态
        this.gameList = [];
        this.textareaContent = [];
        this.contentList = [];

        this.$refs.notice.show({
          type: "success",
          message: "保存成功",
        });
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.message || "保存失败，请稍后重试",
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
      if (!token) {
        this.$refs.notice.show({
          type: "success",
          message: "请登录",
        });
        return;
      }
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
              type: "error",
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
            url: `${config.url}/file/upload`, // 替换为你的上传接口地址
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
                  type: "error",
                  message: "图片上传失败：" + data.message,
                });
              }
            },
            fail: (err) => {
              // 上传失败的提示
              this.$refs.notice.show({
                type: "error",
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
      const token = uni.getStorageSync("token");
      if (!token) {
        this.$refs.notice.show({
          type: "success",
          message: "请登录",
        });
        return;
      }
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
              type: "error",
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
              } else {
                // 上传失败的提示
                this.$refs.notice.show({
                  type: "error",
                  message: "图片上传失败：" + data.message,
                });
              }
            },
            fail: (err) => {
              // 上传失败的提示
              this.$refs.notice.show({
                type: "error",
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
      uni.switchTab({ url: "/pages/add/add" });
    },
    async getMatchTemplateHit() {
      const hitTypeCode = uni.getStorageSync("gameList")[this.op].scheTypeCode;
      console.log(hitTypeCode);
      var result = await uni.$u.http.get("/match/getMatchTemplateHit", {
        params: {
          templateId: this.templateId,
          hitTypeCode,
        },
      });
      if (result.status == 200) {
        uni.setStorageSync("groupNum", result.data.groupNum);
        this.groupNum = result.data.groupNum;
        uni.setStorageSync("stageExplains", result.data.stageExplains);
        this.stageExplains = result.data.stageExplains;
        uni.setStorageSync("groupUmpireType", result.data.groupUmpireType);
        this.groupUmpireType = result.data.groupUmpireType;
        uni.setStorageSync("groupVenueType", result.data.groupVenueType);
        this.groupVenueType = result.data.groupVenueType;
        uni.setStorageSync("matchingManner", result.data.matchingManner);
        this.matchingManner = result.data.matchingManner;
        if (result.data.matchingManner == 1) {
          this.matchingMannerName = "淘汰赛制";
        }
        if (result.data.matchingManner == 2) {
          this.matchingMannerName = "循环赛制";
        }
        if (result.data.matchingManner == 3) {
          this.matchingMannerName = "1v1赛制";
        }
        if (result.data.matchingManner == 4) {
          this.matchingMannerName = "主客场赛制";
        }
        if (result.data.matchingManner == 5) {
          this.matchingMannerName = "双败赛制";
        }
        uni.setStorageSync("matchingMannerName", this.matchingMannerName);
        uni.setStorageSync("scoringMethod", result.data.scoringMethod);
        this.scoringMethod = result.data.scoringMethod;
      }
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
:root {
  --active-color: v-bind(selectColor);
}
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
        #1b4ca7 0%,
        #b23642 20%,
        #0170a8 40%,
        #3d47a8 60%,
        #229a5c 80%,
        #9d825f 100%
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
      height: 75%;
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
      }
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

      .value {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
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
</style>
