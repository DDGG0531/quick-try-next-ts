import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'

const Dropdown = () => {
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    document.documentElement.style['scroll-behavior'] = 'smooth'

    return () => {
      document.documentElement.style['scroll-behavior'] = 'initial'
    }
  }, [])
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return (
    <div ref={parent} className="w-32 border p-5">
      <strong className="dropdown-label">Click me to open!</strong>
      {show && (
        <p className="mt-3" onClick={reveal}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          repudiandae odio nostrum quos officiis mollitia, doloremque quas. Eius
          ullam voluptatem quasi nemo quae totam facere? Necessitatibus magnam
          magni excepturi ipsum! Deleniti laudantium, quam eligendi ad
          reprehenderit atque in culpa, voluptatum amet voluptatibus laborum
          porro rem earum tenetur facere obcaecati quae expedita! Repellat
          obcaecati sequi corporis tempora consectetur suscipit dolor
          exercitationem quidem quod ad et reprehenderit nihil maiores minima,
          dolorum autem deleniti nam expedita accusamus iure hic. Saepe
          reprehenderit sapiente adipisci animi, eum vitae inventore voluptate
          reiciendis, dolore possimus quos magni non, ad repellendus doloremque
          dolores earum sunt molestias. Quos, doloremque.
        </p>
      )}

      {!show && (
        <p className="mt-3" onClick={reveal}>
          ～～～休息
        </p>
      )}
    </div>
  )
}

export default Dropdown
