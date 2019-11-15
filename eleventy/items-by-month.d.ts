type Item = import('../types/eleventy').Item

export interface ItemsByMonth {
   month: {
      sort: string
      name: string
   }
   entries: Item[]
}
