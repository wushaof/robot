<template>
  <section id='home'>
    <header class='header'>
      <i @click='goBack' class='iconfont icon-fanhui'></i>
      <span>小嗨智能法律机器人</span>
    </header>
    <img class='titImg' src="../img/xiaohai.png" alt="">
    <section class='startdiv'>
      <span class='span1'>法里智能法律引擎支持</span>
      <p class='p1'>全国160家律所 数千律师实时在线</p>
      <span>随时随地 即时回复</span>
      <div class="div" @click='start'>
        开始咨询
      </div>
    </section>

    <div class="service">
      <div class="list" @click='serviceGo'>
        <i class='iconfont icon-svg08'></i>
        <span>已服务<em>1531</em>名用户</span>
      </div>
      <div class="list" @click='serviceGo'>
        <i class='iconfont icon-svg08'></i>
        <span><em>4513</em>次专业服务</span>
      </div>
    </div>

    <nav id='home-nav'>
      <section id='home-nav-scroll' ref='homeNavScroll'>
        <div class="" v-for='item in companytype'>
          <img :src="item.img" alt="">
          <span>{{item.text}}</span>
        </div>
      </section>
    </nav>
  </section>
</template>

<script>
export default {
  data(){
    return{
      homeNavSC:null,
      companytype:[
        {img:require('../img/xiaohai.png'),text:'关于迎合'},
        {img:require('../img/xiaohai.png'),text:'关于迎合'},
        {img:require('../img/xiaohai.png'),text:'关于迎合'},

      ]
    }
  },
  mounted(){
    console.log(this.$refs.homeNavScroll.style.width='15rem');
    var homeNavScroll=this.Scroll;
    this.homeNavSC=new homeNavScroll('#home-nav',{
        mouseWheel: false, click: this.isAndroid,tap:this.isIos,
    		scrollX: true,
    		scrollY: false,
        disableMouse: true,
        disablePointer: true
      });
      setTimeout(()=>{
        this.homeNavSC.refresh()
      },0)
    this.checkOpenid();
  },
  methods:{
    serviceGo(){

    },
    goBack(){

    },
    getData(query,compid){
      var compid_=sessionStorage.getItem('compid');
      var that = this;
      var _compid=compid || compid_;
      var data={
        openid:query,
        compid:_compid
      };
      this.ajax({
          url: `${this.api}/company/wxmp/login`,
          type: "POST",
          data: data,
          dataType: "json",
          success: function (res) {
              if (res.code == 0) {
                if(compid_!=null && compid_!='undefined'){
                  sessionStorage.remove('compid')
                };
                that.getCompany()
              }
          },
          fail: function (status) {

          }
      });
    },
    getCompany(){
      var that=this;
      var data={
        // uid:,
        // compid:
      }
      this.ajax({
          url: `${this.api}/company/wxmp/compmain`,
          type: "POST",
          data: data,
          dataType: "json",
          success: function (res) {
              if (res.code == 0) {

              }
          },
          fail: function (status) {

          }
      });
    },
    checkOpenid(){
      var qid=location.href.split('qid=')[1];
      if(qid && qid.search('#')!=-1){
        qid=qid.split('#')[0]
      }
      var openid=localStorage.getItem('openid') || 'oSZ8cw6V8pkU4pwAl8WJoTKgi4G8';
      // var openid=localStorage.getItem('openid');
      if(openid!=null && openid!='undefined'){
        this.getData(openid,qid);
        return;
      }
      var query=location.href;
      var arr=query.split('openid=');
      if(arr.length>1){
        query=arr[1];
        query=query.split('#')[0];
        localStorage.setItem('openid',query);
        this.getData(query,null);
        return;
      }
      this.getOpenid(qid);
    },
    getOpenid(compid){
        var that = this;
        this.ajax({
            url: `${this.api}/company/wxmp/getpath`,
            type: "GET",
            dataType: "json",
            success: function (res) {
                if (res.code == 0) {
                  sessionStorage.setItem('compid',compid);
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
  .titImg{
    height: 2rem;
    width: 100%;
  }
  .service{
    display: flex;
    align-items: center;
    justify-content: space-around;
    em{
      color: $base;
    }
    .list{
      display: flex;
      flex-direction: column;
    }
  }
  .startdiv{
    width: 96%;
    margin:0 2%;
    background: url('../img/xiaohai.png');
    background-size: 100% 100%;
    .div{
      color: #fff;
      background: $base;
      width: 1.5rem;
      margin:auto;
    }
  }
  #home-nav{
    width: 100%;
    overflow: scroll;
    height: 1.5rem;
    z-index: 5;
    #home-nav-scroll{
      width: 12rem;
      height: 100%;
    }
    div{
      width: 2rem;
      float: left;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img{
      width: 1rem;
    }
  }
}
</style>
