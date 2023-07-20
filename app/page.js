import Link from 'next/link'

const Index = () => {
  return (
    <div>
    <h1>Hello</h1>
    <Link href="/contact">Go to Contact page</Link><br></br>
    <Link href="/blog">Go to Blog page</Link>
    </div>
  )
}

export default Index
