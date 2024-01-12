import { computed, ref } from "vue";

export const usePageHandler = <Pages extends string[]>(pages: Pages) => {
  const currentPage = ref(pages[0]);

  const changePage = (page: Pages[number]) => {
    console.log(`change to "${page}"`);
    currentPage.value = page;
  };

  return {
    currentPage: computed(() => currentPage.value as Pages[number]),
    changePage,
  };
};
