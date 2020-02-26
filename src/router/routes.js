const HomePage = () => import(/* webpackChunkName: "home-page" */ '../views/HomePage.vue')
const DetailPage = () => import(/* webpackChunkName: "detail-page" */ '../views/DetailPage.vue')

export default [
  {
    path: '/:id',
    component: DetailPage,
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
]
