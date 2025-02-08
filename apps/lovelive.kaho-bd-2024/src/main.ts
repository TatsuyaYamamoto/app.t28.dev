import Tres from "@tresjs/core";
import { createApp } from "vue";
import { createVuetify } from "vuetify";

import App from "./App.vue";

import "vuetify/styles";

createApp(App).use(Tres).use(createVuetify()).mount("#app");
