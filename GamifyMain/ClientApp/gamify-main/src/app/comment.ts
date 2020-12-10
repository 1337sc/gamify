export class Comment {
  constructor(
    public id: number,
    public authorId: number,
    public text: string,
    public rating: number
  ) {}
}
