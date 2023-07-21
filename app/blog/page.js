import Link from 'next/link'
import fs from "fs"       
import path from "path" 
import matter from "gray-matter"

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

    const orderedBlogs = blogs.sort((a, b) => {
        return b.frontmatter.id - a.frontmatter.id
    })

    return{
        blogs: orderedBlogs
    }
}

const Blog = async() => {
    const { blogs } = await getAllBlogs() 
    return (
        <>
        <div>
            <div>   
                <h1>Blog</h1>
                <p>エンジニアの日常生活をお届けします</p>
                {blogs.map((blog, index) => 
                <div key={index} > 
                    <div>
                        <h2>{blog.frontmatter.title}</h2>
                        <p>{blog.frontmatter.excerpt}</p>
                        <p>{blog.frontmatter.date}</p>
                        <Link href={`/blog/${blog.slug}`}>Read More</Link>
                    </div>
                    <div className="blogImg"></div>
                </div>
                )}  
            </div>  
        </div>
    </> 
    )
}

export default Blog