export class Place {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public coordLat?: number,
    public coordLon?: number,
    public ownerId?: number
  ) {}
}
