export default function SSRPage({ name }: { name: string }) {
  return <div>ssr: {name}</div>
}

export async function getServerSideProps() {
  const name = 'Jim'

  return {
    props: {
      name
    } // will be passed to the page component as props
  }
}
