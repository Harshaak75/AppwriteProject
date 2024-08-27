import {configureStore} from "@reduxjs/toolkit"
import slice from "./slice"

const store = configureStore({
    reducer:{
        auth: slice,
    }
})

export default store