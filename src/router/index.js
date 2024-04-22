import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import BusinessList from '../views/BusinessList.vue'
import BusinessInfo from '../views/BusinessInfo.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import UserAddress from '../views/UserAddress.vue'
import Payment from '../views/Payment.vue'
import OrderList from '../views/OrderList.vue'
import AddUserAddress from '../views/AddUserAddress.vue'
import EditUserAddress from '../views/EditUserAddress.vue'
import Register from '../views/Register.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Index
}, {
    path: '/index',
    name: 'Index',
    component: Index
},{
    path: '/businessList',
    name: 'BusinessList',
    component: BusinessList
}, {
    path: '/businessInfo',
    name: 'BusinessInfo',
    component: BusinessInfo
},
{
    path: '/login',
    name: 'Login',
    component: Login
}, {
    path: '/orders',
    name: 'Orders',
    component: Orders
}, {
    path: '/userAddress',
    name: 'UserAddress',
    component: UserAddress
}, {
    path: '/payment',
    name: 'Payment',
    component: Payment
}, {
    path: '/orderList',
        name: 'OrderList',
        component: OrderList
}, {
    path: '/addUserAddress',
        name: 'AddUserAddress',
        component: AddUserAddress
}, {
    path: '/editUserAddress',
        name: 'EditUserAddress',
        component: EditUserAddress
}, {
    path: '/register',
        name: 'Register',
        component: Register
}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})
export default router


/*
import {createRouter, createWebHistory} from "vue-router";

const  router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[{
    path: '/',
    name: 'Home',
    component: () => import('@/views/Index.vue')
  }, {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },{
    path: '/businessList',
    name: 'BusinessList',
    component: ()=>import('@/views/BusinessList.vue')

  }, {
    path: '/businessInfo',
    name: 'BusinessInfo',
    component: ()=>import('@/views/BusinessInfo.vue')

  }, {
    path: '/login',
    name: 'Login',
    component: ()=>import('@/views/Login.vue')

  }, {
    path: '/orders',
    name: 'Orders',
    component: ()=>import('@/views/Orders.vue')

  }, {
    path: '/userAddress',
    name: 'UserAddress',
    component: ()=>import('@/views/UserAddress.vue')
  }, {
    path: '/payment',
    name: 'Payment',
    component: ()=>import('@/views/Payment.vue')
  }, {
    path: '/orderList',
    name: 'OrderList',
    component: ()=>import('@/views/OrderList.vue')
  }, {
    path: '/addUserAddress',
    name: 'AddUserAddress',
    component: () => import('@/views/AddUserAddress.vue')
  }, {
    path: '/editUserAddress',
    name: 'EditUserAddress',
    component: ()=>import('@/views/EditUserAddress.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: ()=>import('@/views/Register.vue')
  }

  ]
})

export default router
 */