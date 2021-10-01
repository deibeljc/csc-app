import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { navigate, routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import CreatePlayerModal from 'src/components/CreatePlayerModal/CreatePlayerModal'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  const location = useLocation()

  const showPlayerCreationModal =
    isAuthenticated && currentUser && !currentUser.playerId

  const navigation = [
    {
      name: 'Home',
      onClick: () => navigate(routes.home()),
      current: location.pathname === '/home' || location.pathname === '/',
    },
    {
      name: 'Players',
      onClick: () => navigate(routes.players()),
      current: location.pathname === '/players',
    },
    {
      name: 'Teams',
      onClick: () => navigate(routes.teams()),
      current: location.pathname === '/teams',
    },
  ]

  const userNavigation = [
    { name: 'Your Profile', onClick: () => {} },
    { name: 'Settings', onClick: () => {} },
    {
      name: isAuthenticated ? 'Sign out' : 'Sign in',
      onClick: async () => {
        if (isAuthenticated) {
          logOut()
        } else {
          await logIn({ provider: 'discord' })
        }
      },
    },
  ]

  return (
    <div>
      {showPlayerCreationModal && <CreatePlayerModal />}
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => routes.home()}
                          className="flex flex-row items-center"
                        >
                          <span className="sr-only">
                            Counterstrike Confederation
                          </span>
                          <img
                            className="h-8 w-auto"
                            src="https://csconfederation.com/static/csc/img/csc50x50.png"
                            alt="CSC"
                          />
                        </button>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <button
                              key={item.name}
                              onClick={item.onClick}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {isAuthenticated && (
                          <button
                            type="button"
                            className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        )}

                        {/* Profile dropdown */}
                        {isAuthenticated ? (
                          UserProfile(userNavigation)
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-purple-800 shadow-sm text-xs font-medium rounded text-gray-200 bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={async () =>
                              await logIn({ provider: 'discord' })
                            }
                          >
                            Sign In With Discord
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="px-2 py-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={item.onClick}
                        className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">
              {navigation.find((n) => n.current)?.name}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow">{children}</div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}

function UserProfile(userNavigation: { name: string; onClick: () => void }[]) {
  const { currentUser } = useAuth()

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="p-1 max-w-xs bg-gray-800 hover:bg-gray-700 rounded-md flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={currentUser?.user_metadata?.avatar_url}
            alt=""
          />
          <span className="pl-2 text-white">
            {currentUser?.user_metadata?.full_name}
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block w-full text-left px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DefaultLayout
