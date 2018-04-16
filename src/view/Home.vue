<template>
  <section id='home'>
    <img src="../img/xiaohai.png" alt="" />

    <p class='name'>小嗨</p>

    <span class='robot'>智能法律机器人</span>

    <section class='start' @click='start'>开始</section>
  </section>
</template>

<script>
export default {
  mounted(){
    this.checkOpenid();
  },
  methods:{
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
                }
                console.log(res);
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
      // var openid=localStorage.getItem('openid') || 'oSZ8cw6V8pkU4pwAl8WJoTKgi4G8';
      var openid=localStorage.getItem('openid');
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
#home{
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
</style>
