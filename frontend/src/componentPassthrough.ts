

const createPaginatorPassthrough = (color: string) => {
  return {
    root: {
      class: `!bg-transparent text-${color}-500`,
    },
    rowPerPageDropdown: {
      root: {
        class: `!bg-transparent !border-${color}-500 !text-${color}-500 !px-0`,
      },
      input: {
        class: `!bg-transparent !text-${color}-500`,
      },
      trigger: {
        class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
      },
      panel: {
        class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
      },
      wrapper: {
        class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
      },
      list: {
        class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
      },
      item: {
        class: `!text-${color}-500 !hover:bg-${color}-500`,
      },
    },
    previousPageButton: {
      class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
    },
    firstPageButton: {
      class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
    },
    nextPageButton: {
      class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
    },
    lastPageButton: {
      class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
    },
    current: {
      class: `!bg-transparent !border-${color}-500 !text-${color}-500`,
    },
  }
}

export default {
  createPaginatorPassthrough,
}