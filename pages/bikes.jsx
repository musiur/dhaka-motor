import Link from 'next/link';

const Bikes = () => {
    const Bikes = [
        {
            id: 0,
            image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/nightster-special-hc-3-up.jpg?impolicy=myresize&rw=400',
            title: 'Nightster Special',
            description:
                'An escape into the night for two. The 2023 Nightster Special is a thrilling new ride in a classic Sportster silhouette.',
            link: '#',
        },
        {
            id: 1,
            image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/breakout-homepage-hc-3-up.jpg?impolicy=myresize&rw=400',
            title: 'Breakout',
            description:
                'Make every night bike night with the 2023 Breakout 117-raked out cruiser dripping in chrome.',
            link: '#',
        },
        {
            id: 2,
            image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/freewheeler-hc-3-up.jpg?impolicy=myresize&rw=400',
            title: 'Freewheeler',
            description:
                'Hot-rod attitude on three wheels, the 2023 Freewheeler delivers aggressive style, confidence and performance.',
            link: '#',
        },
    ];
    return (
        <div className='section container'>
            <h1 className='text-center text-xl font-bold lg:text-2xl xl:text-4xl'>
                Set out on something new
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
                {Bikes.map((item) => {
                    const { id, image, title, description, link } = item;
                    return (
                        <div key={id} className="grid grid-cols-1 gap-4">
                            <img src={image} alt='image' className="rounded-t-xl w-full h-[350px]"/>
                            <div>
                                <h3 className="text-lg lg:text-xl font-bold uppercase">{title}</h3>
                                <p className="text-gray-400">{description}</p>
                            </div>
                            <Link href={link}>Check details</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bikes;
