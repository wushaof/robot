import Home from './view/Home.vue'
import Chat from './view/Chat.vue'
export default[
  {path:'/',redirect:'/home/'},
  {path:'*',redirect:'/home/'},
  {path:'/home/',component:Home},
  {path:'/chat',component:Chat}
]
