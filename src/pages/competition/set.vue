<template>
  <view class="box">
    <u-navbar bgColor="rgba(0,0,0,0)" autoBack  leftIconColor="#ffffff"></u-navbar>
    <view class="upload">
      <view class="img">
        <u-upload width="80" height="80">
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
      <view class="bt"></view>

      <view class="cup">
        <view class="top">
          <view class="left">
            <view class="first">这里是赛事名称</view>
            <view class="second">这里是赛事副标题</view>
          </view>
          <image
            src="/static/images/cup.png"
            mode="scaleToFill"
            style="width: 96px; height: 107px; margin-top: -20px"
          />
        </view>

        <view class="next">
          <view class="plus"></view>
          <view class="button">个性换肤</view>
        </view>
      </view>
    </view>

    <view class="type">
      <view
        :class="activeTab == 0 ? 'item-active' : 'item'"
        @click="setActiveTab(0)"
      >
        <view class="value">报名设置</view>
        <image
          src="/static/images/biao.png"
          mode="scaleToFill"
          style="width: 100%; height: 1px"
        />
      </view>
      <view
        :class="activeTab == 1 ? 'item-active' : 'item'"
        @click="setActiveTab(1)"
      >
        <view class="value">环节设置</view>
        <image
          src="/static/images/biao.png"
          mode="scaleToFill"
          style="width: 100%; height: 1px"
        />
      </view>
      <view
        :class="activeTab == 2 ? 'item-active' : 'item'"
        @click="setActiveTab(2)"
      >
        <view class="value">奖励设置</view>
        <image
          src="/static/images/biao.png"
          mode="scaleToFill"
          style="width: 100%; height: 1px"
        />
      </view>
      <view
        :class="activeTab == 3 ? 'item-active' : 'item'"
        @click="setActiveTab(3)"
      >
        <view class="value">直击设置</view>
        <image
          src="/static/images/biao.png"
          mode="scaleToFill"
          style="width: 100%; height: 1px"
        />
      </view>
      <view
        :class="activeTab == 4 ? 'item-active' : 'item'"
        @click="setActiveTab(4)"
      >
        <view class="value">规则设置</view>
        <image
          src="/static/images/biao.png"
          mode="scaleToFill"
          style="width: 100%; height: 1px"
        />
      </view>
    </view>

    <view class="content" v-if="activeTab == 0">
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
              <u-checkbox-group v-model="checked">
                <u-checkbox activeColor="red" checked></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
          <view class="item">
            <view class="left">赛事项目 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择赛事项目</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">赛事模版<view class="icon">*</view></view>
            <view class="right"
              ><text>请选择赛事模版</text
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
                ></u-input>
              </view>
            </view>
          </view>
          <view class="item">
            <view class="left">赛事副标题<view class="icon">*</view></view>
            <view class="right">
              <view class="input">
                <u-input
                  v-model="fuName"
                  placeholder="请填写赛事副标题"
                  border="none"
                ></u-input> </view
            ></view>
          </view>
          <view class="item">
            <view class="left">赛事类型 <view class="icon">*</view></view>
            <view class="right">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="公开赛"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="邀请赛"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
          <view class="item">
            <view class="left">赛事形势 <view class="icon">*</view></view>
            <view class="right">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="线上赛"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="线下赛"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
          <view class="item">
            <view class="left">赛事地点 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择赛事地点</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">详细地址<view class="icon">*</view></view>
            <view class="right">
              <view style="width: 60px">
                <u-input
                  v-model="fuName"
                  placeholder="详细地址"
                  border="none"
                ></u-input> </view
            ></view>
          </view>
          <view class="item-o">
            <view class="left">赛事时间 <view class="icon">*</view></view>
            <view class="right">
              <view class="time" @click="show = true"> 开始时间 </view>
              <text>至</text>
              <view class="time" @click="show = true"> 结束时间 </view>
            </view>
          </view>
          <view class="item">
            <view class="left">赛事裁判 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择裁判</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">赛事赞助 <view class="icon">*</view></view>
            <view class="right">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="接受"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="不接受"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="content" v-if="activeTab == 0">
      <view class="main">
        <image
          src="/static/images/赛事报名设置.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <view class="o-text">
          <view class="item">
            <view class="left">报名方式 <view class="icon">*</view></view>
            <view class="right">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="单人"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="小队"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
          <view class="item">
            <view class="left">报名人数 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择报名人数</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">性别限制 <view class="icon">*</view></view>
            <view class="right"
              ><text>无限制</text
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
                <view class="l2"
                  >0
                  <image
                    src="/static/images/right.png"
                    mode="scaleToFill"
                    style="width: 12px; height: 12px"
                  />
                </view>
              </view>

              <view class="right">
                <view class="r1">最高</view>
                <view class="r2"
                  >99
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
                  v-model="checked"
                  placement="row"
                  iconPlacement="right"
                >
                  <u-checkbox
                    activeColor="red"
                    shape="circle"
                    label="需要认证徽章"
                    customStyle="gap:10px"
                  ></u-checkbox>
                </u-checkbox-group>
              </view>
            </view>
            <view class="bt">
              <view class="left">
                <view class="l1">最低</view>
                <view class="l2"
                  >无限制
                  <image
                    src="/static/images/right.png"
                    mode="scaleToFill"
                    style="width: 12px; height: 12px"
                  />
                </view>
              </view>

              <view class="right">
                <view class="r1">最高</view>
                <view class="r2"
                  >无限制
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
                  v-model="fuName"
                  placeholder="请填写参赛费用"
                  border="none"
                ></u-input>
                ￥</view
              ></view
            >
          </view>
        </view>

        <view class="save">
          <text>保存</text>
        </view>
      </view>
    </view>

    <view class="content" v-if="activeTab == 1">
      <view class="main">
        <image
          src="/static/images/richeng.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <view class="text">
          <view class="item">
            <view class="left"
              ><text>参赛报名时间</text> <view class="icon">*</view></view
            >
            <view class="right"
              ><text>请选择参赛报名时间</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">赛事名单公布 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择名单公布日期</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
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
          </view>
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

          <view class="save">保存</view>
        </view>
      </view>
    </view>

    <view class="content" v-if="activeTab == 2">
      <view class="main">
        <image
          src="/static/images/基础信息设置.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <view class="o-text">
          <view class="item">
            <view class="left">奖励者名称 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择奖励者名称</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">奖金金额 <view class="icon">*</view></view>
            <view class="right">
              <view style="width:50px">
                <u-input
                  v-model="name"
                  placeholder="￥0.00"
                  border="none"
                ></u-input>
              </view>
            </view>
          </view>
          <view class="item">
            <view class="left">赞助类型 <view class="icon">*</view></view>
            <view class="right">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="实物赞助"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="服务赞助"
                  shape="circle"
                  customStyle="margin-left: 20px"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
          <view class="item-o">
            <view class="left">领取方式 <view class="icon">*</view></view>
            <view class="right">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="比赛现场发放"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="到店领取"
                  shape="circle"
                  customStyle="margin-left: 5px"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="两者都支持"
                  shape="circle"
                  customStyle="margin-left: 5px"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
          <view class="item-o">
            <view class="top">
              <view class="left"> 奖品名称 <view class="icon">*</view> </view>
              <view class="right">
                <view style="width: 110px;">
                  <u-input
                    v-model="name"
                    placeholder="请填写奖品名称"
                    border="none"
                  ></u-input>
                </view>
              </view>
            </view>
            <view class="bt">
              <view class="left">
                <view class="l1">数量</view>
                <view style="width:60%;">
                  <u-input
                    v-model="name"
                    placeholder="请输入"
                    border="none"
                  ></u-input>
                </view>
              </view>

              <view class="right">
                <view class="r1">单位</view>
                <view style="width:60%;">
                  <u-input
                    v-model="name"
                    placeholder="请输入"
                    border="none"
                  ></u-input>
                </view>
              </view>
            </view>
          </view>
          <view class="item">
            <view class="left">到店领取地址 <view class="icon">*</view></view>
            <view class="right"
              ><text>请选择</text
              ><image
                src="/static/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
            /></view>
          </view>
          <view class="item">
            <view class="left">联系方式 <view class="icon">*</view></view>
            <view class="right">
              <view class="input">
                <u-input
                  v-model="name"
                  placeholder="请填写联系方式"
                  border="none"
                ></u-input>
              </view>
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

          <view class="save">保存</view>
        </view>
      </view>
    </view>

    <view class="content" v-if="activeTab == 3">
      <view class="main">
        <image
          src="/static/images/赛事直击设置.png"
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

        <view class="jdsz">阶段设置</view>

        <view class="o-text">
          <view class="item">
            <view class="left">本阶段 <view class="icon">*</view></view>
            <view class="right"><text>32人/队</text></view>
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
                <view class="l2"
                  >请选择
                  <image
                    src="/static/images/right.png"
                    mode="scaleToFill"
                    style="width: 12px; height: 12px"
                  />
                </view>
              </view>

              <view class="right">
                <view class="r1">匹配方式</view>
                <view class="r2"
                  >请选择
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
              <view class="left">
                <u-checkbox-group v-model="checked" placement="row">
                  <u-checkbox
                    activeColor="red"
                    label="系统订单匹配"
                    shape="circle"
                  ></u-checkbox>
                </u-checkbox-group>
              </view>

              <view class="right" style="width: 30%;">
                <u-checkbox-group v-model="checked" placement="row">
                  <u-checkbox
                    activeColor="red"
                    label="人工添加"
                    shape="circle"
                  ></u-checkbox>
                </u-checkbox-group>
              </view>
            </view>
          </view>
          <view class="item-o">
            <view class="top">
              <view class="left">
                分组裁判设置 <view class="icon">*</view>
              </view>
            </view>
            <view class="bt">
              <view class="left">
                <u-checkbox-group v-model="checked" placement="row">
                  <u-checkbox
                    activeColor="red"
                    label="系统随机匹配"
                    shape="circle"
                  ></u-checkbox>
                </u-checkbox-group>
              </view>

              <view class="right" style="width: 50%;">
                <u-checkbox-group v-model="checked" placement="row">
                  <u-checkbox
                    activeColor="red"
                    label="根据场地1对1匹配"
                    shape="circle"
                  ></u-checkbox>
                </u-checkbox-group>
              </view>
            </view>
          </view>
          <view class="item-o">
            <view class="top">
              <view class="left">
                选择计分方式 <view class="icon">*</view>
              </view>
            </view>
            <view class="bt">
              <u-checkbox-group v-model="checked" placement="row">
                <u-checkbox
                  activeColor="red"
                  label="积分"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="积分"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="积分"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="积分"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="积分"
                  shape="circle"
                ></u-checkbox>
                <u-checkbox
                  activeColor="red"
                  label="积分"
                  shape="circle"
                ></u-checkbox>
              </u-checkbox-group>
            </view>
          </view>
        </view>

        <view class="pp">赛事报名完成后可进行匹配</view>
      </view>
    </view>

    <view class="content" v-if="activeTab == 4">
      <view class="main">
        <image
          src="/static/images/报名条件.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <view class="rules">
          <view class="top">玩家参赛需要满足以下条件</view>
          <view class="rule">
            <view class="left"> </view>
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

        <u--textarea
          v-model="tx"
          placeholder="请输入内容"
          count
          maxlength="500"
          autoHeight
        ></u--textarea>

        <image
          src="/static/images/注意事项.png"
          mode="scaleToFill"
          style="width: 100%; height: 22px; margin-top: 15px"
        />

        <u--textarea
          v-model="tx1"
          placeholder="请编辑比赛注意事项"
          count
          maxlength="2000"
          autoHeight
        ></u--textarea>

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
      :show="show"
      v-model="value1"
      mode="datetime"
    ></u-datetime-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      checked: true,
      show: false,
      tx: "本阶段赛制为小组单循环淘汰赛。参赛玩家按照系统随机分配成8个小组，每位玩家都要与本小组的其他玩家逐一进行比赛，以单局制，先取得21分者获胜，不加分。根据最终胜负场次来计算积分排名，积分最高者进入下-轮，若出现两名同分时，双方加赛一局，胜者进入下一轮，败者淘汰。",
      tx1: "",
    };
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;

  .upload {
    background-color: #cccccc;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img {
      width: 100%;
      height: 70%;
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

    .bt {
      position: absolute;
      bottom: 0;
      height: 30%;
      width: 100%;
      background: linear-gradient(
        180deg,
        #cccccc 0%,
        #174090 20%,
        #174394 100%
      );
    }

    .cup {
      position: absolute;
      bottom: 7%;
      height: 35%;
      width: 90%;
      margin: auto;
      border-radius: 5px;
      box-shadow: 4px 4px 10px 0px #00000040, -4px -4px 10px 0px #00000040;

      .top {
        display: flex;
        justify-content: space-between;
        backdrop-filter: blur(10px);
        height: 70%;

        .left {
          margin-top: 10px;
          margin-left: 15px;

          .first {
            font-weight: 400;
            font-size: 20px;
            color: #ffffff;
          }
          .second {
            font-weight: 400;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }

      .next {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30%;
        background-color: #6686c1;
        padding: 0 15px;
        backdrop-filter: blur(4px);
        border-radius: 5px;
        width: 92%;

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
          background: linear-gradient(
            to right,
            black 0%,
            black 50%,
            purple 100%
          );
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
    background: linear-gradient(180deg, #245abb 0%, #09317d 100%);
    box-shadow: 0px 4px 24px 0px #0e2b62;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s linear;
    padding: 0px 10px;

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
      background-color: #1e54ba;
      box-shadow: 4px 4px 10px 0px #00000040, -4px -4px 10px 0px #00000040;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: -5px; // 完全移动到父元素上方
        left: 50%; // 水平居中
        transform: translateX(-50%);
        width: 100%; // 固定宽度
        height: 5px; // 保持高度不变
        background-color: #1e54ba;
      }
      &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        border-top: 10px solid #1e54ba;
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

          .many{

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

            .left {
              width: 40%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .right {
              width: 40%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
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
            justify-content: flex-start;
            align-items: center;
            gap: 2px;

            .time {
              font-weight: 400;
              font-size: 14px;
              color: rgba(29, 35, 38, 0.3);
              width: 45%;
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
        .top {
          height: 36px;
          background-color: #496fb5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
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
</style>
