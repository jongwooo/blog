export default class Post {
    constructor(node) {
        const { id, html, excerpt, frontmatter, fields } = node
        const { slug } = fields
        const { title, date, description } = frontmatter

        this.id = id
        this.html = html
        this.excerpt = excerpt
        this.slug = slug
        this.title = title
        this.date = date
        this.description = description
    }
}
