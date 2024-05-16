import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { SortItem } from '@/type/SortItem.ts';

export const useSearchStore = defineStore('search', () => {
  const filters = reactive(new Map<string, string>());
  const keywords = new Map<string, string>();
  const pages = new Map<string, number>();
  const orders = new Map<string, SortItem>();
  const itemsPerPages = new Map<string, number>();

  function getFilter(key: string | null | undefined) {
    if (!key) {
      return null;
    }
    return filters.get(key) ?? null;
  }

  function setFilter(key: string, value: string | null) {
    if (value) {
      filters.set(key, value);
    } else {
      filters.delete(key);
    }
  }

  function getKeyword(key: string | null | undefined) {
    if (!key) {
      return null;
    }
    return keywords.get(key) ?? null;
  }

  function setKeyword(key: string, value: string | null) {
    if (value) {
      keywords.set(key, value);
    } else {
      keywords.delete(key);
    }
  }

  function getPage(key: string | null | undefined) {
    if (!key) {
      return null;
    }
    return pages.get(key) ?? null;
  }

  function setPage(key: string, value: number | null) {
    if (value) {
      pages.set(key, value);
    } else {
      pages.delete(key);
    }
  }

  function getOrder(key: string | null | undefined) {
    if (!key) {
      return null;
    }
    return orders.get(key) ?? null;
  }

  function setOrder(key: string, value: SortItem) {
    if (value) {
      orders.set(key, value);
    } else {
      orders.delete(key);
    }
  }

  function getItemsPerPage(key: string | null | undefined) {
    if (!key) {
      return null;
    }
    return itemsPerPages.get(key) ?? null;
  }

  function setItemsPerPage(key: string, value: number) {
    if (value) {
      itemsPerPages.set(key, value);
    } else {
      itemsPerPages.delete(key);
    }
  }

  return {
    filters,
    getFilter,
    setFilter,
    keywords,
    getKeyword,
    setKeyword,
    pages,
    getPage,
    setPage,
    orders,
    getOrder,
    setOrder,
    itemsPerPages,
    getItemsPerPage,
    setItemsPerPage
  };
}, {
  persist: {
    paths: ['filters'],
    storage: localStorage,
    serializer: {
      serialize: value => {
        return JSON.stringify(Object.fromEntries(value['filters']));
      },
      deserialize: JSON.parse,
    },
    afterRestore(context) {
      const item = localStorage.getItem('search');
      if (!item) {
        return;
      }
      const filters = context.store.filters as Map<string, string>;
      for (const entry of Object.entries(JSON.parse(item))) {
        filters.set(entry[0], entry[1] as string);
      }
    },
  },
});
