export default class Post {
    constructor(node) {
        const { id, html, frontmatter, fields } = node
        const { slug } = fields
        const { title, description, date } = frontmatter

        this.id = id
        this.html = html
        this.slug = slug
        this.title = title
        this.date = date
        this.description = description
    }
}
