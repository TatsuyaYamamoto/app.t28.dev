import { createApp } from "vue";
import Tres from "@tresjs/core";
import { createVuetify } from "vuetify";

import App from "./App.vue";

import "vuetify/styles";

createApp(App).use(Tres).use(createVuetify()).mount("#app");
