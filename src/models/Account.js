export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.comments = data.comments
    this.tickets = data.tickets
    this.bio = data.bio
    this.linkedin = data.linkedin
    this.class = data.class
    this.graduated = data.graduated || "not graduated"
    this.coverImg = data.coverImg
    this.github = data.github
    this.resume = data.resume
  }
}

