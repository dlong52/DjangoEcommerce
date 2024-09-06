import ProfileLayout from "../components/layouts/ProfileLayout"
import {
    CartPage,
    ChangeAddressPage,
    HomePage,
    NotFoundPage,
    NotifyPage,
    OrderPage,
    ProductDetail,
    ProfilePage,
    ShopPage,
    SignInPage,
    SignUpPage
} from "../pages"

const publicRoutes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/shop",
        component: ShopPage
    },
    {
        path: "/shop/:p-name",
        component: ProductDetail
    },
    {
        path: "/cart",
        component: CartPage
    },
    {
        path: "/profile",
        component: ProfilePage,
        layout: ProfileLayout
    },
    {
        path: "/profile/address",
        component: ChangeAddressPage,
        layout: ProfileLayout
    },
    {
        path: "/profile/order",
        component: OrderPage,
        layout: ProfileLayout
    },
    {
        path: "/profile/notify",
        component: NotifyPage,
        layout: ProfileLayout
    },{
        path: "/profile/order",
        component: OrderPage,
        layout: ProfileLayout
    },
    {
        path: "/signin",
        component: SignInPage,
        layout: null
    },
    {
        path: "/signup",
        component: SignUpPage,
        layout: null
    },
    {
        path: "*",
        component: NotFoundPage,
        layout: null
    }
]
const privateRoutes = [

]
const headerRoutes = [
    {
        path: "",
        name: "Tất cả sản phẩm",
    },
    {
        path: "",
        name: "Áo thun",
    },
    {
        path: "",
        name: "Áo sơ mi",
    },
    {
        path: "",
        name: "Áo Polo",
    },
    {
        path: "",
        name: "Áo khoác",
    },
    {
        path: "",
        name: "Quần",
    },
    {
        path: "",
        name: "Phụ kiện",
    },
]
export { publicRoutes, privateRoutes, headerRoutes }