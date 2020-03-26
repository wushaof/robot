<template>
  <section id='home' :style='{backgroundImage:"url("+msgData.index_back_img+")"}'>
    <div id="homeScroll">
      <div class="child">
        <img class='titImg' :src="msgData.head_img" alt="">
        <section class='startdiv' :style='{background:"url("+msgData.welc_img+")"}'>
          <p class='p1' v-html='msgData.welc_word'></p>
          <div class="div" @click='start'>
            开始咨询
          </div>
          <!-- <p class='p2'>Powered by Fali.ai</p> -->
        </section>

        <div class="service">
          <div class="list" @click='serviceGo'>
            <img class='img1' src="../img/user.png" alt="">
            <span>已服务<em>{{msgData.userCount}}</em>名用户</span>
          </div>
          <div class="list list2" @click='serviceGo'>
            <img class='img2' src="../img/reply.png" alt="">
            <span class='span'><em>{{msgData.replyCount}}</em>次专业解答</span>
          </div>
        </div>

        <nav id='home-nav'>
          <section id='home-nav-scroll' ref='homeNavScroll'>
            <div class="" v-for='(item,index) in companytype' @click='goDetail(item,index)'>
              <img :src="item.sku_img" alt="">
              <span>{{item.name}}</span>
            </div>
          </section>
        </nav>

        <article class='btmtext xfooter'>
          <span>法里AI大脑提供技术支持</span>
          <p>Copyright 2016-2018 法里科技 allrights reserved</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      homeNavSC:null,
      companytype:[],
      msgData:{}
    }
  },
  mounted(){
    var homeNavScroll=this.Scroll;
    this.Ios.isIos.isMobile(this);
    // this.homeNavSC=new homeNavScroll('#home-nav',{
    //   mouseWheel: false, click: this.isAndroid,tap:this.isIos,
  	// 	scrollX: true,
  	// 	scrollY: false,
    //   disableMouse: true,
    //   disablePointer: true
    // });测试代码
    //test分支yy
    this.checkOpenid();
  },
  watch:{
    $route(to){
      var path=to.path.split('/')[1];
      if(path == 'home'){
        document.title='首页';
      };
    }
  },
  methods:{
    t_click(){
      alert(8)
    },
    goDetail(item,index){
      this.$router.push({path:`/companyde/${index}`})
    },
    serviceGo(){

    },
    goBack(){

    },
    getData(query){
      var that = this;
      var data={
        code:query
      };
      this.ajax({
          url: `${this.api}/company/wxmp/login`,
          type: "POST",
          data: data,
          dataType: "json",
          success: function (res) {
              if (res.code == 0) {
                localStorage.setItem('uid_company',res.msg.id);
                that.getDetail(res.msg.id)
              }
          },
          fail: function (status) {

          }
      });
    },
    getDetail(uid){  //公司详情
      var that=this;
      var data={
        uid:uid,
        compid:localStorage.getItem('compid_')
      };
      this.ajax({
          url: `${this.api}/company/wxmp/compmain`,
          type: "POST",
          data: data,
          dataType: "json",
          success: function (res) {
              if (res.code == 0) {
                that.companytype=res.msg.options;
                that.$refs.homeNavScroll.style.width=(3.1*that.companytype.length)+'rem';
                that.msgData=res.msg;
                sessionStorage.setItem('companydetail',JSON.stringify(res.msg.options));
                // setTimeout(()=>{
                //   that.homeNavSC.refresh()
                // },0)
              }
          },
          fail: function (status) {

          }
      });
    },
    checkOpenid(){
      //本地调试
      localStorage.setItem('uid_company',33940);
      var uid_company=33940;
      var compid='d4fc67adab134d9fab73cd285a4bf039';
      localStorage.setItem('compid_',compid);



      //发布环境
      // var uid_company=localStorage.getItem('uid_company');
      // var compid=location.href.split('compid=')[1];
      // if(compid && compid.search('#')!=-1){
      //   compid=compid.split('#')[0]
      //   localStorage.setItem('compid_',compid);
      // }



      if(uid_company!=null && uid_company!='undefined'){  //已授权获取用户信息
        this.getDetail(uid_company)
        return;
      };
      var query=location.href;
      var arr=query.split('code=');
      if(arr && arr.length>1){    //去获code
        query=arr[1];
        query=query.split('&')[0];
        this.getData(query);
        return;
      }
      this.getOpenid(compid);   //获取openid
    },
    getOpenid(compid){
        var that = this;
        this.ajax({
            url: `${this.api}/company/wxmp/getpath`,
            type: "GET",
            dataType: "json",
            success: function (res) {
                if (res.code == 0) {
                  localStorage.setItem('compid_',compid);
                  window.location.href=res.msg;
                }
            },
            fail: function (status) {

            }
        });
    },
    start(){
      this.$router.push({path:'/chat'})
    }
  }
}
</script>

<style lang="scss">
@import '../assets/unit.scss';
#home{
  text-align: center;
  position:absolute;
  height:100vh;
  width:100%;
  background-size: 100% 95%;
  background-repeat:no-repeat;
  background-position: 0 44px;
  #homeScroll{
    top: 0;
    .child{
      padding:0;
    }
  }
  .titImg{
    height: 2rem;
    width: 100%;
  }
  .service{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: .3rem;
    em{
      color: #ff0000;
    }
    .list{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        margin-top: .1rem;
        color: #333333;
        font-size: .24rem;
      }
      img{
        height: .68rem;width: .67rem;
      }
    }
  }
  .startdiv{
    width: 92%;
    position: relative;
    top: -.2rem;
    margin:0 4%;
    background-size: 100% 100%;
    padding:.4rem 0 .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 3px 8px #8f8f8f;
    font-size: .32rem;color: #333333;
    .p2{
      color: #666666;
      font-size: .26rem;
    }
    .div{
      color: #fff;
      background: $base;
      width: 3.36rem;
      height: .7rem;
      line-height: .7rem;
      border-radius: 5px;
      margin:.2rem auto;
      margin-bottom: 0;
    }
  }
  #home-nav{
    width: 100%;
    overflow: scroll;
    height: 2.5rem;
    z-index: 5;
    margin-top: .4rem;
    #home-nav-scroll{
      height: 100%;
      background: initial;
      padding-right: .4rem;
    }
    div{
      float: left;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: .3rem;
      width: 2.8rem;
      // border-radius: 5px;
      overflow: hidden;
      height: 2.3rem;
      position: relative;
      box-shadow: 0px 3px 8px #8f8f8f;
      span{
        position: absolute;
        bottom: 0;
        width: 100%;
        display: inline-block;
        height: .5rem;
        line-height: .5rem;
        color: #fff;
        font-size: .32rem;
        background: #323232;
        opacity: .7;
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  .btmtext{
    position: fixed;
    width: 100%;
    left: 0;bottom: .1rem;
    text-align: left;
    padding-left: .3rem;
    span{
      color: #5e5e5e;font-size: .28rem;
    }
    p{
      color: #666666;font-size: .22rem;
    }
  }
}
</style>
