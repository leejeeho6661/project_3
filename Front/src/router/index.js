import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/search.vue'
import PageNotFound from '../views/PageNotFound.vue'

import Login from '../user/login.vue'
import Signup from '../user/signup.vue'
import Mypage from '../user/mypage.vue'
import Modify from '../user/modify.vue'
import pwdChange from '../user/pwdChange.vue'

import Board from '../board/board.vue'
import Write from '../board/write.vue'
import Detail from '../board/detail.vue'
import Update from '../board/update.vue'
import Myboard from '../board/myboard.vue'

import Itemlist from '../item/itemlist.vue'
import Itemdetail from '../item/detail.vue'
import Cart from '../item/cart.vue'
import OrderList from '../item/orderlist.vue'
import Order from '../item/order.vue'
import OrderSuccess from '../item/ordersuccess.vue'
import OrderFail from '../item/orderfail.vue'
import OrderDetail from '../item/orderdetail.vue'

import User from '../admin/user.vue'
import Item from '../admin/item.vue'
import OrderAdmin from '../admin/orderadmin.vue'

import { store } from '../store/store.js';

Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/search',
//     name: 'Search',
//     component: Search
//   },
//   {
//     path: '/user/login',
//     name: 'Login',
//     component: Login
//   },
//   {
//     path: '/user/signup',
//     name: 'Signup',
//     component: Signup
//   },
//   {
//     path: '/user/mypage',
//     name: 'Mypage',
//     component: Mypage
//   },
//   {
//     path: '/user/modify',
//     name: 'Modify',
//     component: Modify
//   },
//   {
//     path: '/user/pwdChange',
//     name: 'pwdChange',
//     component: pwdChange
//   },
//   {
//     path: '/board/board',
//     name: 'Board',
//     component: Board
//   },
//   {
//     path: '/board/write',
//     name: 'Write',
//     component: Write
//   },
//   {
//     path: '/board/detail/:bid',
//     name: 'Detail',
//     component: Detail
//   },
//   {
//     path: '/board/update/:bid',
//     name: 'Update',
//     component: Update
//   },
//   {
//     path: '/board/myboard',
//     name: 'Myboard',
//     component: Myboard
//   },
//   {
//     path: '/item/itemlist',
//     name: 'Itemlist',
//     component: Itemlist
//   },
//   {
//     path: '/item/detail/:pid',
//     name: 'Itemdetail',
//     component: Itemdetail
//   },
//   {
//     path: '/item/cart',
//     name: 'Cart',
//     component: Cart
//   },
//   {
//     path: '/item/orderlist',
//     name: 'OrderList',
//     component: OrderList
//   },
//   {
//     path: '/item/order/:pid/:pcount',
//     name: 'Order',
//     component: Order
//   },
//   {
//     path: '/item/ordersuccess',
//     name: 'OrderSuccess',
//     component: OrderSuccess
//   },
//   {
//     path: '/item/orderfail',
//     name: 'OrderFail',
//     component: OrderFail
//   },
//   {
//     path: '/item/orderdetail/:oid',
//     name: 'OrderDetail',
//     component: OrderDetail
//   },
//   {
//     path: '/admin/user',
//     name: 'User',
//     component: User
//   },
//   {
//     path: '/admin/item',
//     name: 'Item',
//     component: Item
//   },
//   {
//     path: '/admin/orderadmin',
//     name: 'OrderAdmin',
//     component: OrderAdmin
//   },
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      component: PageNotFound
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/user/mypage',
      name: 'Mypage',
      component: Mypage,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/user/modify',
      name: 'Modify',
      component: Modify,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/user/pwdChange',
      name: 'pwdChange',
      component: pwdChange,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/board/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/board/write',
      name: 'Write',
      component: Write,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/board/detail/:bid',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/board/update/:bid',
      name: 'Update',
      component: Update,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/board/myboard',
      name: 'Myboard',
      component: Myboard,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/item/itemlist',
      name: 'Itemlist',
      component: Itemlist
    },
    {
      path: '/item/detail/:pid',
      name: 'Itemdetail',
      component: Itemdetail
    },
    {
      path: '/item/cart',
      name: 'Cart',
      component: Cart,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/item/orderlist',
      name: 'OrderList',
      component: OrderList,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/item/order/:pid/:pcount',
      name: 'Order',
      component: Order,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/item/ordersuccess',
      name: 'OrderSuccess',
      component: OrderSuccess,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/item/orderfail',
      name: 'OrderFail',
      component: OrderFail,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/item/orderdetail/:oid',
      name: 'OrderDetail',
      component: OrderDetail,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level > 0){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/admin/user',
      name: 'User',
      component: User,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level >= 1000){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/admin/item',
      name: 'Item',
      component: Item,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level >= 1000){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
    {
      path: '/admin/orderadmin',
      name: 'OrderAdmin',
      component: OrderAdmin,
      beforeEnter: function(to, from, next) {
        if(store.getters.get_nickname != ''){
          if(store.getters.get_level >= 1000){
            next();
          }
          else{
            next('/404');
          }
        }
        else{
          next('/404');
        }
      }
    },
  ]
})

export default router;
