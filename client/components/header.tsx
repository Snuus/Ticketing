import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext.'

export default function Header() {
  const { user, logout } = useAuth()

  type Links = {
    label: string;
    href: string;
    onclick: any;
  }


  const links = [
    !user && { label: 'Sign Up', href: '/auth/signup', onclick: null },
    !user && { label: 'Sign In', href: '/auth/signin', onclick: null },
    user && { label: 'Sign Out', href: '', onclick: logout }
  ]
    .filter(links => links)
    .map(({ label, href, onclick }) => {
      return <li key={href} className="nav-item" >
        <Link href={href}>
          <a onClick={onclick} className='nav-link' href="">{label}</a>
        </Link>
      </li >
    })

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand' href="">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center" >
          {links}
        </ul>
      </div>
    </nav>
  )
}
