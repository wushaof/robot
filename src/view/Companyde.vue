<template lang="html">
  <div id="companydetail">
    <header class='header'>
      <i @click='goBack' class='iconfont icon-fanhui'></i>
      <span>{{msgData.name}}</span>
    </header>

    <div id="companySc">
      <div class="ipnonexpb">
        <img class='deImg' :src="msgData.back_img" alt="">
        <section class='para' v-html='msgData.text'></section>
        <article class='btmtext'>
          <span>法里AI大脑提供技术支持</span>
          <p>Copyright 2016-2018 法里科技 allrights reserved</p>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      msgData:{},
      comSc:null,
      obj:{}
    }
  },
  mounted(){
    document.title='关于';
    var Comsc=this.Scroll;
    this.obj=JSON.parse(sessionStorage.getItem('companydetail'));
    var id=this.$route.params.id;
    this.msgData=this.obj[id];
    this.Ios.isIos.isMobile(this);
    this.comSc=new Comsc('#companySc',{
      mouseWheel: true, click: this.isAndroid, tap: this.isIos,
      scrollX: false,
      fadeScrollbars: false
    });
    setTimeout(()=>{
      this.comSc.refresh()
    },400)
  },
  watch:{
    $route(to){
      var path=to.path.split('/')[1];
      if(path == 'companyde'){
        document.title='关于';
        var id=this.$route.params.id;
        this.msgData=this.obj[id];
        setTimeout(()=>{
          this.comSc.scrollTo(0,0);
          this.comSc.refresh()
        },400)
      };
    }
  },
  methods:{
    goBack(){
      window.history.go(-1);
    }
  }
}
</script>

<style lang="scss">
@import '../assets/common';
@import '../assets/unit';
@import '../assets/znsc';
  #companydetail{
    #companySc{
      div{
        padding-bottom: .2rem;
      }
    }
    .btmtext{
      // position: fixed;
      // width: 100%;
      // left: 0;bottom: .1rem;
      text-align: left;
      padding-left: .3rem;
      span{
        color: #999999;font-size: .28rem;
      }
      p{
        color: #999999;font-size: .22rem;
      }
    }
    .deImg{
      width: 100%;
    }
    .para{
      padding: .3rem .3rem .5rem;
      color: #4c4c4c;font-size: .32rem;
      p{
        text-indent: 2em;
        margin-bottom: .4rem;
      }
    }
  }
</style>
