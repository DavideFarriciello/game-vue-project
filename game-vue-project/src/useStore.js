import { reactive} from 'vue';

export const store = reactive({
  isLoggedIn: false,
});

export function logout() {
  store.isLoggedIn = false;
}

