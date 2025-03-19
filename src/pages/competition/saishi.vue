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
            src="/static/images/调色板.png"
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
              src="/static/images/勾.png"
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
        src="/static/images/x.png"
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
        autoBack
        leftIconColor="#ffffff"
      ></u-navbar>

      <view
        class="upload"
        :style="{
          background: `linear-gradient(180deg, #cccccc 0%, #cccccc 70%, ${selectColor} 75%, ${selectColor} 100%)`,
        }"
      >
        <view class="img">
          <u-upload
            width="80"
            height="80"
            accept="image"
            maxCount="1"
            @afterRead="afterRead"
            :fileList="fileList"
            @delete="deletePic"
            :multiple="false"
          >
            <view class="info">
              <u-icon name="photo" size="54px" color="#ffffff"></u-icon>
              <view class="value"
                >上传主图
                <image
                  src="/static/images/上传.png"
                  mode="scaleToFill"
                  style="width: 16px; height: 16px"
                />
              </view>
            </view>
          </u-upload>
        </view>

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
          src="/static/images/cup.png"
          mode="scaleToFill"
          style="
            width: 96px;
            height: 107px;
            position: absolute;
            top: 166px;
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
          <view class="value">{{ tab }}</view>
          <image
            src="/static/images/biao.png"
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
            src="/static/images/基础信息设置.png"
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
                <u-checkbox-group v-model="joinList" @change="a">
                  <u-checkbox activeColor="red" name="1"></u-checkbox>
                </u-checkbox-group>
              </view>
            </view>
            <view class="item">
              <view class="left">赛事项目 <view class="icon">*</view></view>
              <view class="right" @click="toSaiShiProject"
                ><text>{{ typeName ? typeName : "请选择赛事项目" }}</text
                ><image
                  src="/static/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">赛事模版<view class="icon">*</view></view>
              <view class="right" @click="toTemplete" style="width: 60%"
                ><text>{{
                  templateName ? templateName : "请选择赛事模版"
                }}</text
                ><image
                  src="/static/images/right.png"
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
                    @blur="blur1"
                    input-align="right"
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
                    @blur="blur2"
                    input-align="right"
                  ></u-input> </view
              ></view>
            </view>
            <view class="item">
              <view class="left">赛事类型 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group v-model="type" placement="row">
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
                <u-radio-group v-model="form" placement="row">
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
              <view class="right" @click="toPlace" style="width: 60%"
                ><text>{{ fullAddress ? fullAddress : "请选择赛事地点" }}</text
                ><image
                  src="/static/images/right.png"
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
              <view class="right">
                <view class="time" @click="show1 = true">
                  {{ startTime ? startTime : "开始时间" }}</view
                >
                <text>至</text>
                <view class="time" @click="show2 = true">
                  {{ endTime ? endTime : "结束时间" }}</view
                >
              </view>
            </view>
            <view class="item">
              <view class="left">赛事裁判 <view class="icon">*</view></view>
              <view class="right">
                <u-avatar src="/static/images/boy.jpg"></u-avatar>
                <image
                  src="/static/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">赛事赞助 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group v-model="sponsor" placement="row">
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
            src="/static/images/赛事报名设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px"
          />

          <view class="o-text">
            <view class="item">
              <view class="left">报名方式 <view class="icon">*</view></view>
              <view class="right">
                <u-radio-group v-model="way" placement="row">
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
            <view class="item">
              <view class="left">报名人数 <view class="icon">*</view></view>
              <view class="right">
                <view style="width: 110px">
                  <u-input
                    v-model="number"
                    placeholder="请输入报名人数"
                    input-align="right"
                    border="none"
                    type="number"
                    @blur="blur3"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">性别限制 <view class="icon">*</view></view>
              <view class="right" @click="show3 = true"
                ><text>{{ genderLimitName ? genderLimitName : "无限制" }}</text
                ><image
                  src="/static/images/right.png"
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
                      src="/static/images/right.png"
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
                      src="/static/images/right.png"
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
                <view class="right">
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
                </view>
              </view>
              <view class="bt">
                <view class="left">
                  <view class="l1">最低</view>
                  <view class="l2" @click="show6 = true"
                    >{{ badgeLevelMinName ? badgeLevelMinName : "无限制" }}
                    <image
                      src="/static/images/right.png"
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
                      src="/static/images/right.png"
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
                    @blur="blur4"
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
      >
        <view class="main">
          <image
            src="/static/images/richeng.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="text">
            <view class="item">
              <view class="left"
                ><text>报名截止时间</text> <view class="icon">*</view></view
              >
              <view class="right" @click="show8 = true"
                ><text>{{
                  registrationEndTime
                    ? registrationEndTime
                    : "请选择报名截止时间"
                }}</text
                ><image
                  src="/static/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">赛事名单公布 <view class="icon">*</view></view>
              <view class="right" @click="show9 = true"
                ><text>{{
                  publicationTime ? publicationTime : "请选择名单公布日期"
                }}</text
                ><image
                  src="/static/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <!-- <view class="item">
              <view class="left">小组赛淘汰赛</view>
              <view class="right-r"
                ><text>请选择开赛时间</text
                ><image
                  src="/static/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view>
            <view class="item">
              <view class="left">八强赛(8进4)</view>
              <view class="right-r"
                ><text>请选择开赛时间</text
                ><image
                  src="/static/images/right.png"
                  mode="scaleToFill"
                  style="width: 12px; height: 12px"
              /></view>
            </view> -->
          </view>

          <view class="add">
            <image
              src="/static/images/add-red.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px"
            />
            添加环节
          </view>

          <view class="end">
            <view class="end-i">
              <image
                src="/static/images/edit.png"
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
            src="/static/images/基础信息设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="o-text">
            <view class="item">
              <view class="left">奖励者名称 <view class="icon">*</view></view>
              <view class="right" @click="show10 = true"
                ><text>{{
                  rewardTypeName ? rewardTypeName : "请选择奖励者名称"
                }}</text
                ><image
                  src="/static/images/right.png"
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
                    @blur="blur5"
                    type="number"
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
                      @blur="blur7"
                      input-align="right"
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
                      @blur="blur8"
                      input-align="right"
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
                      @blur="blur9"
                      input-align="right"
                    ></u-input>
                  </view>
                </view>
              </view>
            </view>
            <view class="item">
              <view class="left">到店领取地址 <view class="icon">*</view></view>
              <view class="right" @click="chooseAddress" style="width: 60%"
                ><text>{{ pickupAddress ? pickupAddress : "请选择" }}</text
                ><image
                  src="/static/images/right.png"
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
                  @blur="blur6"
                  type="number"
                  input-align="right"
                ></u-input>
              </view>
            </view>
            <view class="item">
              <view class="left">
                <image
                  src="/static/images/添加.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
                新增奖品
              </view>
              <view class="right">
                <image
                  src="/static/images/删除.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
              </view>
            </view>
          </view>

          <view class="add">
            <image
              src="/static/images/add-red.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px"
            />
            添加奖励者
          </view>

          <view class="end">
            <view class="end-i">
              <image
                src="/static/images/edit.png"
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
            src="/static/images/赛事直击设置.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <u-scroll-list :indicator="false">
            <view class="tick">
              <view class="item-a"> 淘汰赛制 </view>
              <view class="item"> 循环赛制 </view>
              <view class="item"> 1V1赛制 </view>
              <view class="item"> 主客场赛制 </view>
              <view class="item"> 双败赛制 </view>
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
                  @blur="blur10"
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
                      src="/static/images/right.png"
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
                      src="/static/images/right.png"
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
            src="/static/images/报名条件.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="rules">
            <view class="top">玩家参赛需要满足以下条件</view>
            <view class="rule">
              <view class="item">
                <image
                  src="/static/images/羽毛球.png"
                  mode="scaleToFill"
                  style="width: 65px; height: 65px"
                />
                徽章等级：羽毛球L3
              </view>
              <view class="item">
                <image
                  src="/static/images/赛事等级大师.png"
                  mode="scaleToFill"
                  style="width: 65px; height: 65px"
                />
                赛事等级：大师IV
              </view>
            </view>
          </view>

          <image
            src="/static/images/赛事规则.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <u-scroll-list :indicator="false">
            <view class="tick">
              <view class="item-a"> 小组淘汰赛 </view>
              <view class="item"> 八强赛8进4 </view>
              <view class="item"> 1/4决赛 </view>
              <view class="item"> 季军赛 </view>
              <view class="item"> 季军赛 </view>
            </view>
          </u-scroll-list>

          <view class="tx-container">
            <textarea
              class="t1"
              maxlength="500"
              placeholder="请输入内容"
              placeholder-class="placeholder-class"
              auto-height
              v-model="tx"
            >
            </textarea>
            <view class="count">
              <view class="count-i">{{ tx.length }}/<text>500</text></view>
            </view>
          </view>

          <image
            src="/static/images/赛事说明.png"
            mode="scaleToFill"
            style="width: 100%; height: 22px; margin-top: 15px"
          />

          <view class="sm">
            <view class="title">赛事说明</view>
            <view class="gn">
              <view class="left">
                <image
                  src="/static/images/文字.png"
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
              placeholder="请编辑比赛注意事项..."
              placeholder-class="placeholder-class"
              v-model="tx1"
            >
            </textarea>

            <view class="gn">
              <view class="left">
                <image
                  src="/static/images/图片.png"
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
            <image mode="scaleToFill" style="width: 318px; height: 206px" />

            <view class="add">
              <view class="item">
                <image
                  src="/static/images/文字.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
                文字
              </view>
              <view class="item">
                <image
                  src="/static/images/图片.png"
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

            <view class="save" style="margin: 0">保存</view>
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
      activeTab: 0,
      checked: true,
      show: false,
      tx: "本阶段赛制为小组单循环淘汰赛。参赛玩家按照系统随机分配成8个小组，每位玩家都要与本小组的其他玩家逐一进行比赛，以单局制，先取得21分者获胜，不加分。根据最终胜负场次来计算积分排名，积分最高者进入下-轮，若出现两名同分时，双方加赛一局，胜者进入下一轮，败者淘汰。",
      tx1: "",
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
      tabs: ["报名设置", "环节设置", "奖励设置", "直击设置", "规则设置"],
      bmType: [],
      serialNum: uni.getStorageSync("serialNum") ?? "",
      fileList: [],
      joinList: ["1"],
      joinPointsRace: 0,
      type: "1",
      form: "1",
      sponsor: "0",
      name: uni.getStorageSync("name") ?? "",
      fuTitle: uni.getStorageSync("fuTitle") ?? "",
      labelId: uni.getStorageSync("labelId") ?? 0,
      typeName: uni.getStorageSync("typeName") ?? "",
      startTime: uni.getStorageSync("startTime") ?? 0,
      date: Number(new Date()),
      endTime: uni.getStorageSync("endTime") ?? 0,
      way: "1",
      fullAddress: uni.getStorageSync("fullAddress") ?? "",
      show3: false,
      columns3: [["无限制", "男", "女"]],
      columns4: [],
      number: uni.getStorageSync("number") ?? "",
      genderLimit: 0,
      show4: false,
      badge: [],
      entryFee: uni.getStorageSync("entryFee") ?? "",
      templateId: uni.getStorageSync("templateId") ?? "",
      templateName: uni.getStorageSync("templateName") ?? "",
      umpireId: 101112,
      ageLimitMin: 0,
      ageLimitMax: 99,
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
      stageExplains: uni.getStorageSync("stageExplains") ?? "",
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
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
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
    async afterRead(event) {
      // 清空之前的文件列表，确保只保留最新上传的图片
      this.fileList = [];

      let lists = [].concat(event.file);
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });

      for (let i = 0; i < lists.length; i++) {
        try {
          const result = await this.uploadFilePromise(lists[i].url);
          let item = this.fileList[i];
          this.fileList.splice(
            i,
            1,
            Object.assign(item, {
              status: "success",
              message: "",
              url: result,
            })
          );
        } catch (error) {
          this.$refs.notice.show({
            type: "error",
            message: "图片上传失败，请重试",
          });
        }
      }
    },
    uploadFilePromise(url) {
      console.log(url);
      // const token = uni.getStorageSync("token");
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiJlNGUwM2MwMmE2NTk0NjJkOTQ5MjJiYmQwMzk2ZGM2ZCIsInVuaW9uaWQiOiJvcEZ2ZTZFNUREWFNkcmdmLWhnYm5DbzFhU1FZIiwib3BlbmlkIjoib0RXYVA3ZEluczZxaHd3NXpVbG00WHJwbzE0MCIsInNlc3Npb25fa2V5IjoiMGNqS1E5NE13dm1YTWhrMHRtTUtydz09IiwiaWQiOjMzMDMxNzgzMiwiaWF0IjoxNzQxOTE0NzQ1fQ.LAgk1VxIjXOBMiMhSPzUiPOKLWkeXNsXIHiGAwuQrT36Zk3lVdrHW8b7KF1eDqtfj95pcPVT9_A7vaggIwR4Bg";
      const params = {
        serialNum: this.serialNum,
        file: url,
        fileTypeCode: "10",
        fileTypeName: "赛事主图",
      };
      return new Promise((resolve, reject) => {
        var result = uni.uploadFile({
          url: "http://192.168.3.36:8001/file/upload",
          filePath: url,
          name: "file",
          formData: params,
          header: {
            Authorization: "Bearer " + token,
          },
          success: (res) => {
            setTimeout(() => {
              resolve(res.data.data);
            }, 1000);
          },
        });
        if (result.status == 200) {
          this.$refs.notice.show({
            type: "success",
            message: result.message,
          });
        }
      });
    },
    a(n) {
      //判断数组是否为空
      if (n.length === 0) {
        this.joinPointsRace = 0;
      } else {
        this.joinPointsRace = 1;
      }
      // console.log(this.joinPointsRace);
    },
    toSaiShiProject() {
      uni.navigateTo({
        url: "/pages/competition/project",
      });
    },
    toTemplete() {
      uni.navigateTo({
        url: `/pages/competition/templete?labelId=${this.labelId}`,
      });
    },
    toPlace() {
      uni.navigateTo({
        url: "/pages/competition/place",
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
        url: "/pages/competition/judge",
      });
    },
    confirm3(n) {
      this.show3 = false;
      this.genderLimit = n.indexs[0];
      this.genderLimitName = n.value[0];
      uni.setStorageSync("genderLimitName", this.genderLimitName);
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
          }
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
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
        });
        if (result.status == 200) {
          this.$refs.notice.show({
            type: "success",
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
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "error",
          message: err.data.message,
        });
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
    height: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 9;

    .img {
      margin-top: 80px;
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
          // margin-top: 10px;
        }
      }
    }

    .cup {
      margin-top: 20px;
      height: 40%;
      width: 90%;
      border-radius: 5px;
      position: relative;
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
          background: url("/static/images/cup-bg1.png") no-repeat;
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

        .plus {
          // border: 1px dashed #ffffff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

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

        .item:nth-child(2) {
          border-top: 1px solid #f0f0f0;
        }

        .item:nth-child(3) {
          border-top: 1px solid #f0f0f0;

          // 插入一张图片
        }

        .item:nth-child(4) {
          border-top: 1px solid #f0f0f0;
        }
        .item {
          width: 90%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0px;

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

            &::after {
              content: "";
              display: block;
              width: 24px;
              height: 24px;
              background: url("/static/images/tysj.png") no-repeat;
              transform: translateX(10px);
            }
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

            &::after {
              content: "";
              display: block;
              width: 24px;
              height: 24px;
              background: url("/static/images/tysj.png") no-repeat;
              transform: translateX(10px);
            }
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

            &::after {
              content: "";
              display: block;
              width: 24px;
              height: 24px;
              background: url("/static/images/tysj.png") no-repeat;
              transform: translateX(10px);
            }
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
        border-radius: 20px;
        margin-top: 10px;
        padding: 10px;
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
</style>
