import ImageG from '@/components/ImageG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const Bikes = () => {
    const Bikes = [
        {
            id: 0,
            image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/nightster-special-hc-3-up.jpg?impolicy=myresize&rw=400',
            title: 'Nightster Special',
            description:
                'An escape into the night for two. The 2023 Nightster Special is a thrilling new ride in a classic Sportster silhouette.',
            link: '/bikes/0',
            price: 17999,
        },
        {
            id: 1,
            image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/breakout-homepage-hc-3-up.jpg?impolicy=myresize&rw=400',
            title: 'Breakout',
            description:
                'Make every night bike night with the 2023 Breakout 117-raked out cruiser dripping in chrome.',
            link: '/bikes/1',
            price: 17999,
        },
        {
            id: 2,
            image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/freewheeler-hc-3-up.jpg?impolicy=myresize&rw=400',
            title: 'Freewheeler',
            description:
                'Hot-rod attitude on three wheels, the 2023 Freewheeler delivers aggressive style, confidence and performance.',
            link: '/bikes/2',
            price: 17999,
        },
    ];

    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);

    const [bikes, setBikes] = useState(Bikes);

    const FetchAllBikes = async () => {
        setLoading(true);
        try {
            const API = `${process.env.BASE_URL}/api/bikes?username=admin`;
            const response = await axios.get(API);
            if (response.status === 200) {
                if (response.data.result.length) {
                    setMessage({
                        type: true,
                        message: 'Bike data fetch successful!',
                    });
                    setBikes(response.data.result);
                } else {
                    setMessage({
                        type: false,
                        message: 'No bike data found!',
                    });
                }
            }
        } catch (error) {
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        FetchAllBikes();
    }, []);

    return (
        <div className='section container'>
            <h1 className='text-center text-xl font-bold lg:text-2xl xl:text-4xl'>
                Set out on something new
            </h1>
            <div className='grid grid-cols-1 gap-10 py-10 md:grid-cols-2 lg:grid-cols-3'>
                {bikes.length
                    ? bikes.map((item) => {
                          const { id, thumbnail, title, description, price } =
                              item;
                          return (
                              <div key={id} className='grid grid-cols-1 gap-4'>
                                  <div className='h-[340px] w-full'>
                                      <ImageG src={thumbnail} />
                                  </div>
                                  <div>
                                      <h3 className='text-lg font-bold uppercase lg:text-xl'>
                                          {title}
                                      </h3>
                                      <p className='text-gray-400'>
                                          {description}
                                      </p>
                                      <p className='text-3xl font-bold lg:text-5xl'>
                                          ${price}
                                      </p>
                                  </div>
                                  <Link href={`/bikes/${id}`}>
                                      Check details
                                  </Link>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Bikes;
