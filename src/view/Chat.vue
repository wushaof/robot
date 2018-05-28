<template>
  <div id="chat">
      <section class='chatroom'>
        <header class='header'>
          <i @click='goBack' class='iconfont icon-fanhui'></i>
          <span>{{title}}</span>
        </header>
        <div class="Coverlayer" v-if='popupShow' @click='close'>
        </div>
        <div :class='["texbox",popupShow?"text_fixed":""]'>
          <i class='iconfont icon-chahao' @click='close'></i>
          <textarea class='texbox_text' v-model='textvalue' placeholder="请用一句话描述您的问题">
          </textarea>
          <div>
            <div class="emit_" :class="{'btncolor':colorTrue}" @click='emitMes'>
              发送
            </div>
          </div>
        </div>
        <div id="scroll" class='ipnonexpb4'>

          <div class="child ipnonexpb200">
            <div class="" v-for='(item,index) in chatList'>
              <section class="chatleft" v-if='item.role==1||item.role ==3'>
                <!-- <img :src="item.user_head"> -->
                <div class="chatwith" :ref="['q'+'_'+index]">
                  <!-- <span>{{item.user_name}}</span> -->
                  <p :class="['chatcon',{'dataonehidden':item.ifUnfold}]">
                    <span v-html='item.content'></span>
                    <i class='' v-if='item.Unfold' @click='clickEmUnfold(item)'>
                      <i class='i bgi' v-if='item.ifUnfold'>展开</i>
                      <i v-else class='i emUnfold'>收起</i>
                    </i>
                  </p>
                </div>
              </section>
              <section class="chatright" v-else-if='item.role==0'>
                <!-- <img :src="item.user_head"> -->
                <div class="chatwith">
                  <!-- <span>{{item.user_name}}</span> -->
                  <p class="chatcon"><span v-html='item.content'></span></p>
                </div>
              </section>

              <article class='hiLawyer' v-if='item.data_type==2'>
                <section v-for='(list,idx) in item.content'>
                  <div @click='clickUnfold(list,index)'>
                    <i class='iconfont icon-jinlingyingcaiwangtubiao36'></i>
                    <span v-html='list.title' :class='["ellipsis"+index]'></span>
                    <b v-show='list.wrap'>
                      <em v-if='list.isUnfold'>收起</em>
                      <em v-else>展开</em>
                    </b>
                  </div>
                  <article class='article'>
                    <p :class='[{"lineClamp":list.isUnfold}]'
                      :ref="['q'+'_'+index+'_'+idx]"
                      v-html='list.substance'
                      >
                    </p>
                  </article>
                </section>
              </article>
            </div>

            <section class="chatleft" v-if='dotShow'>
              <!-- <img :src="item.user_head"> -->
              <div class="chatwith">
                <!-- <span>{{item.user_name}}</span> -->
                <p class="chatcon"><span class='dot'></span></p>
              </div>
            </section>

          </div>

        </div>

        <article v-if='readonly' id='clickdiv' class="article_chat" @click="openKeyboard">
          <div class="">
            <input type="text" @blur='blur' class='text'
              placeholder="请用一句话描述您的问题"
               v-model='textvalue'>
          </div>
          <span :class="{'btncolor':colorTrue}" @click='emitMes'>发送</span>
        </article>
        <article v-else id='clickdiv' class="article_chat xfooter ipnone_box_shadow" @click="openPopup">
          <div class="">
            <input type="text" readonly='readonly' class='text'
              placeholder="请用一句话描述您的问题">
          </div>
          <span>发送</span>
        </article>
      </section>

  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default{
    data(){
      return{
        HomeSC:null,
        coverShow:false,
        textvalue:'',
        colorTrue:false,
        topTrue:false,
        timer:null,
        idObj:{},
        title:'',
        loadMore:false,
        noData:false,
        num:0,
        readonly:false,
        popupShow:false,
        dotShow:false,
        chatList:[]  //聊天信息列表
      }
    },
    watch:{
      $route(to){
        var path=to.path.split('/')[1];
        if(path == 'chat'){
          document.title='智能咨询';
          this.loadMore=false
          this.noData=false
          this.num=0
          this.chatList=[]
          this.getData()
        };
      },
      textvalue(res){
        var len=res.length;
        if(len!=0&&res[0]!=' '){
          this.colorTrue=true;
        }else{
          this.colorTrue=false
        }
      }
    },
    mounted(){
      document.title='智能咨询';
      var HomeScroll = this.Scroll,that=this;
			this.Ios.isIos.isMobile(this);
      this.isAndroid?this.readonly=true:this.readonly=false;
			this.HomeSC = new HomeScroll('#scroll', {
				mouseWheel: true, click: this.isAndroid, tap: this.isIos,
				scrollX: false,
				fadeScrollbars: false
			});
      this.HomeSC.on('scrollStart', function () {
        var text=document.querySelector('.text');
        if(text){
          text.blur()
        }
      });
      this.idObj.uid=localStorage.getItem('uid_company');
      this.idObj.compid=localStorage.getItem('compid_');
      this.getData();
      this.changeWindow();
      this.HomeSC.on('scrollEnd',function(){
        if(that.noData){
          return;
        }
        if(this.y>=-50){
          that.loadMore=true;
          that.getData();
        }
      });
    },
    methods:{
      close(){
        this.popupShow=false;
      },
      clickUnfold(item,index){
        item.isUnfold=!item.isUnfold;
        setTimeout(() => {
            this.HomeSC.refresh()
        }, 0);
      },
      openPopup(){
        var text=document.querySelector('.texbox_text');
        console.log(text);
        this.popupShow=true;
        text.focus();
      },
      textFocus(){
        if(this.isIos){
          this.timer=setInterval(()=>{  //兼容ios
            document.body.scrollTop=document.body.scrollHeight;
          },100);
        }
      },
      clickEmUnfold(item){
        item.ifUnfold=!item.ifUnfold;
        setTimeout(() => {
            this.HomeSC.refresh()
        }, 0);
      },
      getData(){
        var that=this;
        var data={
          uid:this.idObj.uid,
          compid:this.idObj.compid,
          num:this.num
        }
        this.ajax({
            url: `${this.api}/company/wxmp/messagerecord`,
            type: "POST",
            data: data,
            dataType: "json",
            success: function (res) {
                if (res.code == 0) {
                  var arr=res.msg.record;
                  if(arr.length==0){
                    that.noData=true;
                    return;
                  }
                  that.title=res.msg.name;
                  that.num=res.msg.num;

                  if(that.loadMore){  //加载更多
                    that.chatList=arr.concat(that.chatList);
                    that.loadMore=false;
                    setTimeout(() => {
                        that.HomeSC.refresh()
                    }, 0);
                  }else{
                    var contTrue=true;
                    arr.forEach((rpt)=>{
                      if(rpt.data_type==2){
                        rpt.content.forEach((cont)=>{
                          if(typeof cont.isUnfold=='undefined'){
                            if(contTrue){
                              that.$set(cont,'isUnfold',true);
                              contTrue=false;
                            }else{
                              that.$set(cont,'isUnfold',false);
                            }
                          };
                        })
                      };
                    })
                    that.chatList=arr;
                    setTimeout(() => {
                        that.HomeSC.scrollTo(0, -2000000000);
                        that.HomeSC.refresh()
                    }, 0);
                  }
                  that.nextTick();
                }
            },
            fail: function (status) {

            }
        })
      },
      nextTick(){
        this.$nextTick(()=>{
          this.chatList.forEach((res,index)=>{
            if(res.role==1 || res.role == 3){
              var q='q'+'_'+index;
              var q1=this.$refs[q][0].offsetHeight;
              if(typeof res.ifUnfold=='undefined'){
                if(q1>170){
                  this.$set(res,'ifUnfold',true);
                  this.$set(res,'Unfold',true);
                }else{
                  this.$set(res,'ifUnfold',false)
                }
              }
            }else if(res.data_type==2){
              res.content.forEach((rpt,idx)=>{
                var q='q'+'_'+index+'_'+idx;
                var q1=this.$refs[q][0].scrollHeight;
                if(typeof rpt.wrap=='undefined'){
                  if(q1>57){
                    this.$set(rpt,'wrap',true)
                  }else{
                    this.$set(rpt,'wrap',false)
                  }
                }
              })
            }
          })
        })
      },
      blur(){
        clearInterval(this.timer)
      },
      changeWindow(){   //兼容安卓
        var h = document.documentElement.clientHeight;
        var that = this;
        window.onresize = function () {
          if (window.innerHeight != h) {  //先执行
            that.HomeSC.scrollTo(0, -200000);
          }
        }
      },
      emitMes(){  //发送
        if(this.textvalue==''){
          return;
        }
        if(this.textvalue[0]==' '){
          Toast('抱歉，第一个字符不能为空')
        }
        if(this.textvalue.length==0 || this.textvalue[0]==' '){
          return;
        }

        this.chatList.push({
          role:0,
          content:this.textvalue
        })
        this.dotShow=true;
        setTimeout(()=>{
          that.HomeSC.scrollTo(0, -200000000);
          this.HomeSC.refresh()
        },0)
        this.popupShow=false;
        var text=document.querySelector('.text');
        var that=this;
        var data={
          uid:this.idObj.uid,
          compid:this.idObj.compid,
          type:2,
          content:this.textvalue
        }
        that.textvalue='';
        this.ajax({
            url: `${this.api}/company/wxmp/smartConv`,
            type: "POST",
            data: data,
            dataType: "json",
            success: function (res) {
                if (res.code == 0) {
                  var arr=res.msg.record;
                  that.dotShow=false;
                  arr.forEach((rpt,idx)=>{
                    if(typeof rpt.wrap=='undefined'){
                      that.$set(rpt,'wrap',true);
                    };
                    if(rpt.role==0){
                      arr.splice(idx,1)
                    }
                    if(rpt.data_type==2){
                      rpt.content.forEach((cont)=>{
                        if(typeof cont.isUnfold=='undefined'){
                          that.$set(cont,'isUnfold',true);
                        };
                      })
                    };
                  })
                  that.num++;
                  that.chatList=that.chatList.concat(arr);
                  setTimeout(() => {
                    that.HomeSC.scrollTo(0, -200000000);
                    that.HomeSC.refresh()
                  }, 0);
                  // setTimeout(()=>{
                  //   that.nextTick();
                  //   that.HomeSC.scrollTo(0, -200000000);
                  // },2000);
                  setTimeout(()=>{
                    that.HomeSC.refresh()
                  },2000)
                }
            },
            fail: function (status) {

            }
        })
      },
      getMsg(msg){

      },
      goBack(){
        window.history.go(-1);
      },
      openKeyboard(){
      }
    }
  }
</script>
<style lang='scss'>
@import '../assets/common';
@import '../assets/unit';
@import '../assets/znsc';
.Coverlayer{
  z-index: 99;position:fixed;
  height:100vh;width:100vw;
  background-color: rgba(0, 0, 0, 0.2);
}
.iosPopup{
  z-index: 1000;
  background: #fff;
  position: fixed;
  top: .5rem;
  width: 96%;
  left: 2%;
  height: 5rem;
  border-radius: 5px;
}
#chat{
  top:0!important;
  .dot{
    top:15px;
    margin: 0 6px;
    display: inline-block; width: 10px;
    min-height: 2px;
    padding-right: 2px;
    padding-left:2px;
    border-left: 2px solid currentColor;
    border-right: 2px solid currentColor;
    background-color: currentColor;
    background-clip: content-box;
    box-sizing: border-box;
    animation: dot 1s infinite step-start both;
    *zoom: expression(this.innerHTML = '...');  /* IE7 */
  }
  .dot:after { content: '...'; } /* IE8 */
  .dot::after { content: ''; }
  @keyframes dot {
      25% { border-color: transparent; background-color: transparent; }          /* 0个点 */
      50% { border-right-color: transparent; background-color: transparent; }    /* 1个点 */
      75% { border-right-color: transparent; }                                   /* 2个点 */
  }
  .hiLawyer{
    padding: 0rem .3rem 0;
    margin-bottom: 2px;
    section{
      margin-bottom: .2rem;
    }
    b{
      font-weight: normal;
    }
    div{
      background: rgb(226,226,226);
      font-size: .24rem;color: #333;
      border-top-left-radius: 16px;
      padding: .15rem .3rem;
      border-top-right-radius: 16px;
      padding-left: .6rem;position: relative;
      i{
        color: #fd6e3f;font-size: .4rem;
        margin-top: -.1rem;float: left;
        margin-left: -.4rem;
      }
      em{
        position: absolute;color: #fd6e3f;
        right: .2rem;top: .15rem;
      }
      span{
        overflow: hidden;
        width: 89%;
        margin-left: .1rem;
        display: -webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient:vertical;
      }
      .ellipsisSpan{
        -webkit-line-clamp: initial;
      }
    }
    .article{
      padding: .2rem;
      box-shadow: 0 1px 2px rgb(221,221,221);
      font-size: 13px;
      background: rgb(245,245,245);
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      .answespan,.quizspan{
        font-size: .3rem;
        color: #fd6e3f;
        margin-left: -.1rem;
      }
      .quizp{
        margin-bottom: .1rem;
      }
    }
    p{
      overflow:hidden;
      display: -webkit-box;
      -webkit-line-clamp:3;
      -webkit-box-orient:vertical;
    }
    .lineClamp{
      -webkit-line-clamp:initial;
    }
  }
  .emit_{
    box-sizing: border-box;
    font-size: .3rem;
    line-height: 36px;
    height: 36px;
    background: #DDDDDD;
    color: #ffffff;
    width: 17%;
    border-radius: 5px;
    text-align: center;
    float: right;
    margin-right: 10px;
    margin-top: 6px;
  }
  .btncolor {
    background: $base!important;
    color:#fff!important;
  }
  .texbox{
    background: #fff;
    border-radius: 5px;
    height: 225px;
    box-sizing: border-box;
    width: 96%;
    text-align: center;
    margin-left: 2%;
    position: fixed;
    z-index: 1000;
    margin-top: -20px;
    top: -230px;
  }
  .text_fixed{
    top:40px;
  }
  .texbox_text{
    resize: none;
    width: 93%;
    height: 150px;
    margin-top: 15px;
    border: 0;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
  }
  .icon-chahao{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 14px;
  }
  .emit{
    position: absolute;
    right: 20px;
    bottom: 0;
  }
}
.child{
  padding-top:.2rem;
  padding-bottom:1.5rem
}

.article_chat {
      @extend %flexbox;
      @extend %flex-ali-ce;
      z-index: 99;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      padding: .2rem .2rem .2rem;
      box-sizing: border-box;
      margin-bottom: 0 !important;
      background: #f4f4f4;
      div{
        background:#fff;
        width:83%;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        margin-right: 8px;
        span{
          background:#fff;
          color:#888
        }
      }
      .text{
        box-sizing: border-box;
        width:100%;
        height:.72rem;
        font-size: .3rem;
        z-index: 999;
        padding-left: 5px;
        line-height: .72rem;
        border-radius: 5px;
      }
      span {
          box-sizing: border-box;
          font-size: .3rem;
          line-height: .72rem;
          height: .72rem;
          background: #DDDDDD;
          color: #ffffff;
          width: 17%;
          border-radius: 5px;
          text-align: center;
      }
      .btncolor {
        background: $base!important;
        color:#fff!important;
      }
  }
.home{
  text-align: center;
  position:absolute;
  height:100vh;
  width:100%;
  img{
    width:1.8rem;
    margin:0 auto;
    margin-top:1rem;
  }
  .name{
    color:#10afff;
    font-weight:bold;
    font-size:.42rem;
    margin-top:.5rem;
    margin-bottom:.5rem;
  }
  .robot{
    color:#28AFF5;
    font-size:.32rem;
  }
  .start{
    margin:0 auto;
    margin-top:3rem;
    height:.6rem;
    line-height: .6rem;
    font-size:.34rem;
    width:3rem;
    background:#28AFF5;
    color:#fff;
    border-radius:5px;
  }
}
.header{
  color:$base;
  text-align: center;
  height:.88rem;
  line-height: .88rem;
  font-size:.32rem;
  box-sizing: border-box;
  border-bottom:1px solid #eee;
  i{
    position:absolute;
    left:.2rem;
    font-size:.4rem;
  }
}
.chatleft {
    section {
        background: $backgroundw
    }
    .dataonehidden {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      padding-bottom: .08rem;
    }
    font-size: 13px;
    padding: 7px 9px 7px;
    @extend %flexbox;
    @extend %flex-r;
    img {
        width: .8rem;
        height: .8rem;
        margin-top: 0;
    }
    .chatwith {
        max-width:75%;
        margin-top:-5px;
        background: #fff;
        > span {
            font-size: 11px;
            color: #888;
            margin-left: 9px;
        }
    }
    .chatcon {
      padding: 9px 10px;
      // padding-bottom: 5px;
      border-bottom-right-radius: 18px;
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      color: #333;
      background: #f4f4f4;
      // box-shadow: 0 2px 3px #dddddd;
      margin-left: 10px;
      position: relative;
      .bgi{
        bottom: 0px;
        width: 9rem;
        text-align: right;
        padding-right: 15px;
        background: -webkit-linear-gradient(left, rgba(244, 244, 244, 0) 26%, rgba(244, 244, 244, 0.8), #f4f4f4 85%);
      }
      .i{
        color: #fd6e3f;
        position: absolute;
        right: -.01rem;
        display: inline-block;
      }
      .emUnfold{
        width: 40px;
      }
    }

    .chatconin {
        background: #f1f1f1;
        padding: 0;
        > p:nth-child(1) {
            padding: .14rem;
            background: $backgroundw;
            border-bottom: 1px solid #eee;
            font-size: .3rem;
            color: $colortwo;
            border-radius: 5px;
        }
    }
}
.chatright {
          font-size: 13px;
          padding: 7px 9px 7px;
          @extend %flexbox;
          @extend %flex-rr;
          img {
              width: .8rem;
              height: .8rem;
              margin-top: 4px;
          }
          .chatwith {
              @extend %flexbox;
              @extend %flex-ju-end;
              @extend %flex-c;
              @extend %flex-ali-end;
              max-width:75%;
              background: #fff;
              > span {
                  font-size: 11px;
                  color: #888;
                  margin-right: 12px;
              }
          }
          .chatcon {
            padding: 9px 10px;
            border-bottom-left-radius: 18px;
            border-top-left-radius: 18px;
            border-top-right-radius: 18px;
            color: #fff;
            background: #fd6e3f;
            // box-shadow: 0 1px 2px #f4d3c8;
            margin-right: 10px;
          }
      }
/*.home{
  text-align: center;
  position:absolute;
  display: none;
  width:100%;
}
.chatroom{
  width:100%;
}
.scroll section{
  background:#f1f1f1;
}
.chatleft{
  font-size: 16px;;
  padding: 7px 9px 7px;
}
.chatwith{
  max-width: 75%;
  margin-top: -5px;
  background: #f1f1f1;
}
.chatwith span{
  font-size:12px;
  color:#888;
  margin-left:10px;
}
.chatleft img{
  width:40px;
  height:40px;
  display: block;
}
.header{
  color:#28AFF5;
  text-align: center;
  height:44px;
  line-height: 44px;
  border-bottom:1px solid #eee
}
.header i{
  float:left;
  margin-left: 10px;
}
.name{
  color:#10afff;
  font-weight:bold;
}
.robot{
  color:#28AFF5
}
.start{
  background:#28AFF5;
  color:#fff;
  margin:0 auto;
  border-radius:5px;
}
@media screen and (max-width:1200px) {


}

@media screen and (max-width:992px) {
  img{
    width:180px;
    margin:0 auto;
    margin-top:100px;
  }
  .name{
    font-size:42px;
  }
  .robot{
    font-size:24px;
  }
  .start{
    margin-top:300px;
    height:60px;
    line-height: 60px;
    font-size:34px;
    width:300px;
  }
}
@media screen and (max-width:768px) {
  img{
    width:180px;
    margin:0 auto;
    margin-top:100px;
  }
  .name{
    font-size:42px;
  }
  .robot{
    font-size:24px;
  }
  .start{
    margin-top:300px;
    height:60px;
    line-height: 60px;
    font-size:34px;
    width:300px;
  }
}
@media screen and (max-width:600px) {
  img{
    width:100px;
    margin:0 auto;
    margin-top:100px;
  }
  .name{
    font-size:32px;
  }
  .robot{
    font-size:18px;
  }
  .start{
    margin-top:150px;
    height:44px;
    line-height: 44px;
    font-size:20px;
    width:200px;
  }
}*/
</style>
