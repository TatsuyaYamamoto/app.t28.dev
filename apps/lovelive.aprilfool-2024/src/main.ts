import Tres from "@tresjs/core";
import { createApp } from "vue";
import { createVuetify } from "vuetify";

import "vuetify/styles";
import App from "./App.vue";

createApp(App).use(Tres).use(createVuetify()).mount("#app");
