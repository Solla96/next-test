import fs from "fs"       
import path from "path" 
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"

async function getSingleBlog(context) {
    const { slug } = context.params
    const data = await import (`../../../data/${slug}.md`)
    const singleDocument = matter(data.default)

    return {
        singleDocument: singleDocument
    }
}

const SingleBlog = async (props) => {
    const { singleDocument } = await getSingleBlog(props)
    return (
        <>
            <h1>{singleDocument.data.title}</h1>
            <p>{singleDocument.data.date}</p>
            <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
        </>
    )
}

export default SingleBlog

export async function generateStatixParams() {
    async function getAllBlogs() {  
        const files = fs.readdirSync(path.join("data"))
        const blogs = files.map((fileName) => {
            const slug = fileName.replace(".md", "")
            const fileData = fs.readFileSync(
                path.join("data", fileName),
                "utf-8"
            )
            const { data } = matter(fileData) 
            return {
                frontmatter: data,
                slug: slug, 
            }
        })
        return{
            blogs: blogs
        }
    }
    const { blogs } = await getAllBlogs() 
    const paths = blogs.map((blog) => `/${blog.slug}`)
    return paths
}