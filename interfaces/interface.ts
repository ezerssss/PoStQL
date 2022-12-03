export interface NewPost{
  text: string,
  type: string
}

export interface Post extends NewPost {
  date: Date
}