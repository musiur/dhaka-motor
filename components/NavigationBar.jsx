import {
    Navbar,
    Button,
    Link,
    Text,
    Avatar,
    Badge,
    Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import ButtonG from './ButtonG';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { MessageContext } from '@/contexts/MessageProvider';
import { CartContext } from '@/contexts/CartProvider';

export const AcmeLogo = () => (
    <svg
        className=''
        fill='none'
        height='36'
        viewBox='0 0 32 32'
        width='36'
        xmlns='http://www.w3.org/2000/svg'
    >
        <rect fill='var(--secondary)' height='100%' rx='16' width='100%' />
        <path
            clipRule='evenodd'
            d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
            fill='currentColor'
            fillRule='evenodd'
        />
    </svg>
);

const NavigationBar = () => {
    const { user, setUser } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);
    const { cart, setCart } = useContext(CartContext);
    const Router = useRouter();
    const collapseItems = [
        {
            id: 0,
            text: 'Bikes',
            link: '/bikes',
        },
        {
            id: 1,
            text: 'About',
            link: '/about',
        },
        {
            id: 2,
            text: 'Contact',
            link: '/contact',
        },
    ];

    const SignOut = () => {
        setUser(null);
        sessionStorage.clear();
        localStorage.clear();
        setMessage({
            type: false,
            message: 'Signed out!',
        });
        Router.push('/signin');
    };

    const OpenCart = () => {
        setCart({
            open: true,
            items: [...cart.items],
        });
    };
    return (
        <Navbar
            shouldHideOnScroll
            isCompact
            variant='sticky'
            // className='container'
        >
            <Navbar.Brand
                onClick={() => Router.push('/')}
                className='cursor-pointer'
            >
                <Navbar.Toggle
                    aria-label='toggle navigation'
                    className='block md:hidden'
                />
                <AcmeLogo />
                <Text b color='inherit' hideIn='xs'>
                    DhakaMotors
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                enableCursorHighlight
                hideIn='xs'
                variant='underline'
            >
                {collapseItems.map((item) => {
                    return (
                        <Navbar.Link
                            key={item.id}
                            isActive={Router.pathname.includes(item.link)}
                            href={item.link}
                        >
                            {item.text}
                        </Navbar.Link>
                    );
                })}
            </Navbar.Content>
            <Navbar.Content>
                <div onClick={OpenCart}>
                    <Tooltip
                        color='primary'
                        content='Checkout your cart'
                        placement='leftStart'
                    >
                        <Badge color='error' content={cart.items.length}>
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className='cursor-pointer text-xl'
                            />
                        </Badge>
                    </Tooltip>
                </div>

                {user ? (
                    <div className='flex items-center justify-center gap-5'>
                        <Tooltip
                            color='primary'
                            content='Profile'
                            placement='leftStart'
                        >
                            <Avatar
                                size='lg'
                                src={
                                    user
                                        ? user.image
                                        : 'https://i.pravatar.cc/150?u=a042581f4e25056704b'
                                }
                                color='gradient'
                                bordered
                                squared
                                onClick={() =>
                                    Router.push('/dashboard/profile')
                                }
                                className='cursor-pointer'
                            />
                        </Tooltip>

                        <Tooltip
                            color='error'
                            content='Logout'
                            placement='leftStart'
                        >
                            <FontAwesomeIcon
                                icon={faSignOut}
                                className='cursor-pointer text-xl text-pink-600'
                                onClick={SignOut}
                            />
                        </Tooltip>
                    </div>
                ) : (
                    <UserAccountActions />
                )}
            </Navbar.Content>

            <Navbar.Collapse>
                {collapseItems.map((item) => {
                    return (
                        <Navbar.CollapseItem key={item.id}>
                            <Link
                                color='inherit'
                                css={{
                                    minWidth: '100%',
                                }}
                                href={item.link}
                            >
                                {item.text}
                            </Link>
                        </Navbar.CollapseItem>
                    );
                })}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;

const UserAccountActions = () => {
    return (
        <Navbar.Content>
            <Navbar.Link color='inherit' href='/signin'>
                Signin
            </Navbar.Link>
            <Navbar.Link href='/signup'>
                <ButtonG color='primary' text='Signup' />
            </Navbar.Link>
        </Navbar.Content>
    );
};
