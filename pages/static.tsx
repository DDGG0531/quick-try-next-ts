export default function StaticPage({ name }: { name: string }) {
  return <div>static: {name}</div>
}

export async function getStaticProps() {
  const name = 'Dennis'

  return {
    props: {
      name
    } // will be passed to the page component as props
  }
}
