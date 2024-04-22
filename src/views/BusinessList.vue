<!--script setup>
import { useRouter } from 'vue-router';
import Footer from '../components/Footer.vue';

const router = useRouter();
let user = $getSessionStorage('user');
console.log(user)
let businessArr;
let orderTypeId = 1;

const toBusinessInfo = (businessId) => {
  router.push({ path: '/businessInfo', query: { businessId: businessId } });
}

const listCart = () => {
  $axios.post('CartController/listCart', $qs.stringify({
    userId: user.userId
  })).then(response => {
    let cartArr = response.data;
    for (let businessItem of businessArr) {
      businessItem.quantity = 0;
      for (let cartItem of cartArr) {
        if (cartItem.businessId == businessItem.businessId) {
          businessItem.quantity += cartItem.quantity;
        }
      }
    }
    businessArr.sort();
  }).catch(error => {
    console.error(error);
  });
}

$axios.post('BusinessController/listBusinessByOrderTypeId', $qs.stringify({
  orderTypeId: orderTypeId
})).then(response => {
  businessArr = response.data;
  if (user != null) {
    listCart();
  }
}).catch(error => {
  console.error(error);
});
</script-->
<script setup>
import Footer from '@/components/Footer.vue';
import {onMounted, ref} from "vue";
import {getSessionStorage} from "@/Common.js";
import router from "@/router/index.js";
import axios from "axios";
import qs from "qs";
import {useRoute} from "vue-router";

let user = getSessionStorage('user');
let businessArr = ref();
let otypeId = useRoute().query.orderTypeId;
//console.log(otypeId)
const toBusinessInfo = (businessId)=>{
  router.push({path:'/businessInfo',query:{businessId:businessId}});
}
const listCart = (businessArr)=>{
  axios.get('CartController/listCart',qs.stringify({
    userId:user.userId
  })).then(response=>{
    let cartArr = response.data;
    console.log(cartArr);
    //遍历所有食品列表
    for(let businessItem in businessArr){
      businessItem.quantity = 0;
      for(let cartItem in cartArr){
        if(cartItem.businessId==businessItem.businessId){
          businessItem.quantity += cartItem.quantity;
        }
      }
    }
    businessArr.sort();
  }).catch(error=>{
    console.error(error);
  });
}
    //根据orderTypeId查询商家信息
onMounted(() => {
  axios.get('BusinessController/listBusinessByOrderTypeId', {
    params: {
      orderTypeId: otypeId
    }
  }).then(response => {
    businessArr.value = response.data;
    // console.log(businessArr.value)
    // console.log(response)
    // 判断是否登录
    if (user != null) {
      //listCart(businessArr);
    }
    else {
      router.push({path:'/Login'})
    }
  }).catch(error => {
    console.error(error);
  });
})
</script>

<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>商家列表</p>
    </header>
    <!-- 商家列表部分 -->
    <ul class="business">
      <li v-for="item in businessArr" @click="toBusinessInfo(item.businessId)">
        <div class="business-img">
          <img :src="item.businessImg" alt="a...">
          <div class="business-img-quantity" v-show="item.quantity>0">
            {{item.quantity}}</div>
        </div>
        <div class="business-info">
          <h3>{{item.businessName}}</h3>
          <p>&#165;{{item.starPrice}}起送 | &#165;{{item.deliveryPrice}}配送</p>
          <p>{{item.businessExplain}}</p>
        </div>
      </li>
    </ul>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>

<!--script>
import Footer from '../components/Footer.vue';

export default{
  name:'BusinessList',
  data(){
    return {
      orderTypeId: this.$route.query.orderTypeId,
      businessArr:[],
      user:{}
    }
  },
  created() {
    this.user = this.$getSessionStorage('user');

    //根据orderTypeId查询商家信息
    this.$axios.post('BusinessController/listBusinessByOrderTypeId',this.$qs.stringify({
      orderTypeId:this.orderTypeId
    })).then(response=>{
      this.businessArr = response.data;
      //判断是否登录
      if(this.user!=null){
        this.listCart();
      }
    }).catch(error=>{
      console.error(error);
    });
  },
  components:{
    Footer
  },
  methods:{
    listCart(){
      this.$axios.post('CartController/listCart',this.$qs.stringify({
        userId:this.user.userId
      })).then(response=>{
        let cartArr = response.data;
        //遍历所有食品列表
        for(let businessItem of this.businessArr){
          businessItem.quantity = 0;
          for(let cartItem of cartArr){
            if(cartItem.businessId==businessItem.businessId){
              businessItem.quantity += cartItem.quantity;
            }
          }
        }
        this.businessArr.sort();
      }).catch(error=>{
        console.error(error);
      });
    },
    toBusinessInfo(businessId){
      this.$router.push({path:'/businessInfo',query:{businessId:businessId}});
    }
  }
}
</script-->

<style scoped>
/****************** 总容器******************/
.wrapper {
  width: 100%;
  height: 100%;
}
/****************** header部分 ******************/
.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #0097FF;
  color: #fff;
  font-size: 4.8vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
/****************** 商家列表部分 ******************/
.wrapper .business {
  width: 100%;
  margin-top: 12vw;
  margin-bottom: 14vw;
}
.wrapper .business li {
  width: 100%;
  box-sizing: border-box;
  padding: 2.5vw;
  border-bottom: solid 1px #DDD;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.wrapper .business li .business-img {
  /*这里设置为相当定位，成为business-img-quantity元素的父元素*/
  position: relative;
}
.wrapper .business li .business-img img {
  width: 20vw;
  height: 20vw;
}
.wrapper .business li .business-img .business-img-quantity {
  width: 5vw;
  height: 5vw;
  background-color: red;
  color: #fff;
  font-size: 3.6vw;
  border-radius: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /*设置成绝对定位，不占文档流空间*/
  position: absolute;
  right: -1.5vw;
  top: -1.5vw;
}
.wrapper .business li .business-info {
  margin-left: 3vw;
}
.wrapper .business li .business-info h3 {
  font-size: 3.8vw;
  color: #555;
}
.wrapper .business li .business-info p {
  font-size: 3vw;
  color: #888;
  margin-top: 2vw;
}
</style>

<!--script>
import Footer from "@/components/Footer.vue";
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import qs from 'qs';
import {
  getSessionStorage,
} from '@/Common';
import { useRouter } from 'vue-router';

export default {
  name: 'BusinessList',
  components: {Footer},
  setup() {
    let orderTypeId = 1; // 默认的orderTypeId
    let businessArr = reactive([]);
    const user = getSessionStorage('user');
    const listCart = () => {
      axios.get('CartController/listCart', qs.stringify({
        userId:user.userId
      })).then(response => {
        let cartArr = response.data;
        //遍历所有食品列表
        for (let businessItem of businessArr) {
          businessItem.quantity = 0;
          for (let cartItem of cartArr) {
            if (cartItem.businessId === businessItem.businessId) {
              businessItem.quantity += cartItem.quantity;
            }
          }
        }
        this.businessArr.sort();
      }).catch(error => {
        console.error(error);
      });
    };
    const toBusinessInfo = (businessId) => {
      const router = useRouter();
      router.push({ path: '/businessInfo', query: { businessId: businessId } });
      // 实现 toBusinessInfo 函数的逻辑
    };

    onMounted(() => {
      // 根据orderTypeId查询商家信息
      //console.log(qs.stringify({orderTypeId}))
      axios.get('BusinessController/listBusinessByOrderTypeId',{params:{orderTypeId:1}})
          .then(response => {
            console.log(qs.stringify({orderTypeId}))
            businessArr = response.data;
            console.log(response)
            if (user != null) {
              listCart();
            }
          })
          .catch(error => {
            console.error(error);
          });
    });
    return { orderTypeId, businessArr, user, listCart, toBusinessInfo };
  }
};
</script-->