<template>
  <div class="homebg">
    <div class="Coverlayer" @click='coverShowClick' v-show='coverShow'>
    </div>
    <div class="msgEmitBox" :class="{msgEmitBoxTop:topTrue}" v-show='true'>
      <i class='iconfont icon-close' @click='coverShowClick'></i>
      <textarea name="inputArea" id='textareaBox' v-model='textvalue' placeholder='输入文字描述事件'></textarea>
      <span @click='emitMes' :class="{'btncolor':colorTrue}">发送</span>
    </div>

    <section class='home' v-show='startShow'>
        <img src="../img/xiaohai.png" alt="" />

        <p class='name'>小嗨</p>

        <span class='robot'>智能法律机器人</span>

        <section class='start' @click='start'>开始</section>
      </section>

      <section class='chatroom' v-show='chatShow'>
        <header class='header'>
          <i @click='goBack'>&lt;</i>
          <span>小嗨智能法律机器人</span>
        </header>
        <div id="scroll">

          <div class="child">
            <section class="chatright">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatleft">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatright">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatleft">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatright">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatleft">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatright">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatleft">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatright">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatleft">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatright">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>

            <section class="chatleft">
                <img src="../img/xiaohai.png">
                <div class="chatwith">
                    <span>王蓝宝石</span>
                    <p class="chatcon"><span>你好，请问你想咨询什么</span></p>
                </div>
            </section>
          </div>

        </div>
        <div class="btm">

          <input type="text" @focus='focus' @blur='blur' class='text'
          style='height:.88rem;border:1px solid red;width:80%'>
        </div>
        <!-- <article id='clickdiv' class="article" @click="openKeyboard">
          <div>
          </div>
          <span>发送</span>
      </article> -->
      </section>

  </div>
</template>
<script>
  export default{
    data(){
      return{
        HomeSC:null,
        chatShow:true,
        startShow:false,
        coverShow:false,
        textvalue:'',
        windowHeight:'',
        colorTrue:false,
        topTrue:false,
        bfscrolltop:'',
        sougou:false
      }
    },
    watch:{
      textvalue(res){
        var len=res.length;
        if(len!=0){
          this.colorTrue=true;
        }else{
          this.colorTrue=false
        }
      }
    },
    mounted(){
      this.windowHeight=document.body.scrollHeight;
      this.bfscrolltop = document.body.scrollTop;
      var HomeScroll = this.Scroll;
			this.Ios.isIos.isMobile(this);
			this.HomeSC = new HomeScroll('#scroll', {
				mouseWheel: false, click: this.isAndroid, tap: this.isIos,
				scrollX: false,
				fadeScrollbars: false
			});
      setTimeout(()=>{
        this.HomeSC.refresh()
      },0);
      this.HomeSC.on('scrollStart', function () {
        var text=document.querySelector('.text');
        if(text){
          text.blur()
        }
      });
      setTimeout(()=>{

        // alert(document.body.clientHeight)   //浏览器高 603
        // alert(document.body.offsetHeight)   //浏览器高 603
        // alert(document.body.scrollHeight)   //正文高   603
        // alert( document.body.scrollTop )    //0
        // alert( window.screen.availHeight )   //可用工作区高度  667

      },200)
    },
    methods:{
      focus(){
        var text=document.querySelector('.btm');
        if(this.sougou){
          setTimeout(()=>{
            text.style.bottom=1.3+'rem';
            return;
          },300)
        }
        setTimeout(()=>{
          if(!this.sougou){
            if(document.body.scrollTop==260){
              // text.style.bottom=1+'rem';
              text.style.bottom=1.3+'rem';
              this.sougou=true;
            }
          }
          // alert(document.body.clientHeight)   //浏览器高 603
          // alert(document.body.offsetHeight)   //浏览器高 603
          // alert(document.body.scrollHeight)   //正文高   603
          // alert( document.body.scrollTop )    //搜狗:260   系统：302
          // alert( window.screen.availHeight )   //可用工作区高度  667
          // document.body.scrollTop=document.body.scrollHeight;
          // window.scrollTo(0,3000)
        },400);

      },
      blur(){
        var text=document.querySelector('.btm');
        text.style.bottom=0;
      },
      emitMes(){

      },
      start(){
        this.startShow=false;
        this.chatShow=true;
      },
      goBack(){
        this.startShow=true;
        this.chatShow=false;
      },
      coverShowClick(){
        this.coverShow=false;
        this.topTrue=false;
      },
      openKeyboard(){
        var text=document.querySelector('.text');
        // text.focus()
        // this.HomeSC.scrollTo(0, -200000);
        // this.coverShow = true;
        // this.topTrue=true;
        // document.getElementById('textareaBox').focus();
      }
    }
  }
</script>
<style lang='scss'>
@import '../assets/common';
@import '../assets/unit';
@import '../assets/znsc';
#scroll1{
  position: absolute;
   left: 0;
   right: 0;
   bottom: 0;
   top:0;
   height:100vh;
   overflow: scroll;
}
#scroll{
  /*bottom:44px!important;*/
}
.text{
  box-sizing: border-box;
}
.btm{
  position:fixed;
  bottom:0;
  left:0;right:0;
  background: red;
  z-index: 99;
}
.child{
  padding-bottom:1rem
}
.msgEmitBox{
  height:4rem;
  z-index: 1000;
  width:96%;
  position:fixed;
  left:2%;
  top:-4.5rem;
  background:#fff;
  border-radius: 5px;
  box-sizing: border-box;
  padding:.3rem .32rem .32rem .2rem;
  textarea {
    resize: none;
    background: $backgroundw;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius:0;
    border-bottom-right-radius:0;
    border: 0;
    border-radius:5px;
    box-sizing: border-box;
    border-bottom:1px solid #eee;
    width: 100%;
    height: 2.5rem;
    line-height: 16px;
    font-size: .3rem;
  }
  i{
    position:absolute;
    right:.1rem;top:.1rem;
    font-size:.5rem;
  }
  span {
    box-sizing: border-box;
    font-size: .3rem;
    line-height: .7rem;
    height: .7rem;
    color: #ffffff;
    width: 20%;
    background:#bcc1cc;
    border-radius: 4px;
    text-align: center;
    float:right;
    margin-top:.2rem;
  }
  .btncolor {
    background: #27aff5;
    color:#fff;
  }
}
.msgEmitBoxTop{
  top:.5rem
}
.article {
      @extend %flexbox;
      @extend %flex-ali-ce;
     /* @extend %flex-ju-ce;*/
      z-index: 99;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
     /* width:7.1rem;*/
      height: 46px;
      padding: 0 .2rem .2rem;
      box-sizing: border-box;
      margin-bottom: 0 !important;
      background: #f1f1f1;
      textarea {
          resize: none;
          background: $backgroundw;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius:0;
          border-bottom-right-radius:0;
          border: 0;
          box-sizing: border-box;
          width: 83%;
          height: 36px;
          line-height: 16px;
          text-indent: .2rem;
          font-size: .3rem;
          padding: 10px 0;
      }
      div{
        background:#fff;
        width:83%;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        text-indent: .2rem;
        span{
          background:#fff;
          color:#888
        }
      }
      span {
          box-sizing: border-box;
          font-size: .3rem;
          line-height: 36px;
          height: 36px;
          /*margin-right: .1rem;*/
          background: #DDDDDD;
          color: #ffffff;
          width: 17%;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          text-align: center;
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
  color:#28AFF5;
  text-align: center;
  height:.88rem;
  line-height: .88rem;
  font-size:.32rem;
  box-sizing: border-box;
  border-bottom:1px solid #eee;
  i{
    float:left;
    margin-left:.2rem;
    font-weight:bold;
    font-size:.4rem;
  }
}
.chatleft {
    section {
        background: $backgroundw
    }
    font-size: .3rem;
    padding: .14rem .18rem .14rem;
    @extend %flexbox;
    @extend %flex-r;
    img {
        width: .8rem;
        height: .8rem;
        margin-top: 0;
    }
    .chatwith {
        max-width:75%;
        margin-top:-.1rem;
        background: #fff;
        > span {
            font-size: .22rem;
            color: #888;
            margin-left: .18rem;
        }
    }
    .chatcon {
        padding: .14rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: $backgroundw;
        position: relative;
        margin-left: .2rem;
    }

    .chatcon:before {
        content: '';
        border-color: transparent #ddd transparent transparent;
        border-width: 6px 7px 6px 5px;
        border-style: solid;
        position: absolute;
        top: 11px;
        left: -13px;
    }
    .chatcon:after {
        content: " ";
        border-width: 5px 7px 5px 4px;
        border-color: transparent #fff transparent transparent;
        border-style: solid;
        position: absolute;
        top: 12px;
        left: -11px;
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
          font-size: .3rem;
          padding: .14rem .18rem .14rem;
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
                  font-size: .22rem;
                  color: #888;
                  margin-right: .25rem;
              }
          }
          .chatcon {
              padding: .14rem;
              border: 1px solid #7fdb5e;
              border-radius: 5px;
              background: #9fe75a;
              position: relative;
              margin-right: .25rem;
          }
          .chatcon:before {
              content: '';
              border-color: transparent transparent transparent #7fdb5e;
              border-width: 6px 5px 6px 7px;
              border-style: solid;
              position: absolute;
              top: 11px;
              right: -13px;
          }
          .chatcon:after {
              content: " ";
              border-width: 5px 4px 5px 7px;
              border-color: transparent transparent transparent #9fe75a;
              border-style: solid;
              position: absolute;
              top: 12px;
              right: -11px;
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
